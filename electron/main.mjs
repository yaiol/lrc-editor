// data-icon="yaiol:lrc-editor"
import { app, BrowserWindow, Menu, dialog, shell } from "electron";
import path from "path";
import fs from "fs";
import net from "net";
import express from "express";
import { fileURLToPath } from "node:url";
import pkg from "../package.json" with { type: "json" };
import { mark, dumpStartupTiming } from "./startup-timing.mjs";
import { lastDir, rememberDir } from "./dialog-memory.mjs";
mark("electron boot + module imports");

// ESM has no __dirname - derive it from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = !app.isPackaged;

if (process.env.YAIOL_DEV) app.userAgentFallback = `${app.userAgentFallback} yaiol-dev`;

const DEV_PORT = pkg.devPort;
const APP_NAME = pkg.productName;
app.setPath('userData', path.join(app.getPath('appData'), 'yaiol', isDev ? `${pkg.productName} (Dev)` : pkg.productName));

// Manual FLAC metadata parser - fallback when music-metadata fails on non-standard FLAC files.
// Reads STREAMINFO (block type 0) for duration and VORBIS_COMMENT (block type 4) for tags.
function readFlacMetadataManual(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (buf.slice(0, 4).toString("ascii") !== "fLaC") return null;
    let offset = 4;
    let title = null, artist = null, album = null, duration = null;
    while (offset + 4 <= buf.length) {
      const b0       = buf[offset];
      const isLast   = (b0 >> 7) & 1;
      const blockType = b0 & 0x7F;
      const blockLen  = (buf[offset + 1] << 16) | (buf[offset + 2] << 8) | buf[offset + 3];
      offset += 4;
      if (offset + blockLen > buf.length) break;
      if (blockType === 0 && blockLen >= 18) {
        // STREAMINFO: extract sample rate (20 bits at byte 10) and total samples (36 bits at byte 13)
        const sr = (buf[offset + 10] << 12) | (buf[offset + 11] << 4) | (buf[offset + 12] >> 4);
        const tsHigh = buf[offset + 13] & 0x0F;
        const tsLow  = buf.readUInt32BE(offset + 14);
        if (sr > 0) {
          const secs = (tsHigh * 4294967296 + tsLow) / sr;
          const m = Math.floor(secs / 60), s = Math.floor(secs % 60);
          const h = Math.round((secs * 100) % 100);
          duration = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(h).padStart(2,"0")}`;
        }
      } else if (blockType === 4) {
        // VORBIS_COMMENT: vendor string then key=value pairs (all lengths little-endian uint32)
        let p = offset;
        const vendorLen = buf.readUInt32LE(p); p += 4 + vendorLen;
        if (p + 4 <= buf.length) {
          const count = buf.readUInt32LE(p); p += 4;
          for (let i = 0; i < count && p + 4 <= buf.length; i++) {
            const len = buf.readUInt32LE(p); p += 4;
            if (p + len > buf.length) break;
            const entry = buf.slice(p, p + len).toString("utf8"); p += len;
            const eq = entry.indexOf("=");
            if (eq !== -1) {
              const key = entry.slice(0, eq).toUpperCase();
              const val = entry.slice(eq + 1);
              if (key === "TITLE")  title  = val;
              else if (key === "ARTIST") artist = val;
              else if (key === "ALBUM")  album  = val;
            }
          }
        }
      }
      offset += blockLen;
      if (isLast) break;
    }
    return { title, artist, album, duration };
  } catch (e) {
    console.error("[metadata] manual FLAC parse error:", e.message);
    return null;
  }
}

// ⚠ CLAUDE: Always use this module-level mainWindow for all dialog calls.
// Never use BrowserWindow.fromWebContents(event.sender) - it silently breaks in packaged .exe.
// See root CLAUDE.md "Electron Dialog Windows".
let mainWindow = null;
let SERVER_PORT = 4000;

// File path passed by Windows when the app is launched via a .lrc file association.
// In packaged builds argv[1] is the file; in dev argv[2] (argv[1] is the script path).
const launchFilePath = (() => {
  const args = process.argv.slice(isDev ? 2 : 1);
  const lrc = args.find(a => /\.lrc$/i.test(a) && fs.existsSync(a));
  return lrc || null;
})();

// Handoff file path - passed by MPL via --handoff=PATH when opening LRC Editor for a song.
const handoffFilePath = (() => {
  const args = process.argv.slice(isDev ? 2 : 1);
  const arg = args.find(a => a.startsWith('--handoff='));
  return arg ? arg.slice('--handoff='.length) : null;
})();

function startServer(callback) {
  function findFreePort(port, cb) {
    const tester = net.createServer();
    tester.once("error", () => findFreePort(port + 1, cb));
    tester.once("listening", () => { tester.close(() => cb(port)); });
    tester.listen(port);
  }

  const api = express();
  api.use(express.json({ limit: "10mb" }));
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") { res.sendStatus(204); return; }
    next();
  });

  api.get("/version", (req, res) => {
    res.json({ version: app.getVersion() });
  });

  api.get("/launch-file", (req, res) => {
    res.json({ filePath: launchFilePath });
  });

  api.get("/handoff", (req, res) => {
    if (!handoffFilePath) { res.json(null); return; }
    try {
      const data = JSON.parse(fs.readFileSync(handoffFilePath, 'utf8'));
      fs.unlinkSync(handoffFilePath);
      res.json(data);
    } catch {
      res.json(null);
    }
  });

  // Stream local audio files with byte-range support for seeking
  api.get("/audio", (req, res) => {
    const filePath = Buffer.from(req.query.path || "", "base64").toString();
    let stat;
    try { stat = fs.statSync(filePath); } catch { return res.status(404).send("Not found"); }

    const ext  = path.extname(filePath).toLowerCase();
    const mime = { ".mp3":"audio/mpeg", ".wav":"audio/wav", ".ogg":"audio/ogg",
                   ".opus":"audio/ogg", ".flac":"audio/flac", ".m4a":"audio/mp4", ".aac":"audio/aac" }[ext] || "audio/mpeg";
    const total = stat.size;

    const range = req.headers.range;
    if (range) {
      const [, s, e] = /bytes=(\d+)-(\d*)/.exec(range) || [];
      const start = parseInt(s, 10);
      const end   = e ? parseInt(e, 10) : total - 1;
      res.writeHead(206, {
        "Content-Type": mime,
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { "Content-Type": mime, "Accept-Ranges": "bytes", "Content-Length": total });
      fs.createReadStream(filePath).pipe(res);
    }
  });

  api.post("/open-music", async (req, res) => {
    const { title } = req.body || {};
    const result = await dialog.showOpenDialog(mainWindow, {
      title,
      defaultPath: lastDir("open-music"),
      filters: [
        { name: "Audio Files", extensions: ["mp3","wav","ogg","opus","flac","m4a","aac"] },
        { name: "All Files", extensions: ["*"] }
      ],
      properties: ["openFile"]
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    const filePath = result.filePaths[0];
    rememberDir("open-music", filePath);
    const fileUrl = `http://localhost:${SERVER_PORT}/audio?path=${encodeURIComponent(Buffer.from(filePath).toString("base64"))}`;
    res.json({ filePath, fileUrl });
  });

  api.post("/close-music", (req, res) => {
    res.json(null);
  });

  api.post("/open-lyrics", async (req, res) => {
    const { title } = req.body || {};
    const result = await dialog.showOpenDialog(mainWindow, {
      title,
      defaultPath: lastDir("open-lyrics"),
      filters: [
        { name: "Lyrics Files", extensions: ["lrc", "txt"] },
        { name: "All Files", extensions: ["*"] }
      ],
      properties: ["openFile"]
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    const filePath = result.filePaths[0];
    rememberDir("open-lyrics", filePath);
    const ext = path.extname(filePath).toLowerCase().replace(".", "");
    try {
      const text = fs.readFileSync(filePath, "utf8");
      res.json({ filePath, text, ext });
    } catch (e) {
      res.json(null);
    }
  });

  api.post("/auto-open-lrc", (req, res) => {
    const { filePath } = req.body;
    const lrcPath = filePath.replace(/\.[^.]+$/, '.lrc');
    if (fs.existsSync(lrcPath)) {
      res.json({ filePath: lrcPath, text: fs.readFileSync(lrcPath, 'utf8') });
    } else {
      res.json(null);
    }
  });

  api.post("/auto-open-music", (req, res) => {
    const { filePath } = req.body;
    const base = filePath.replace(/\.[^.]+$/, '');
    const exts = ['mp3', 'wav', 'flac', 'm4a', 'ogg', 'opus', 'aac'];
    for (const ext of exts) {
      const candidate = `${base}.${ext}`;
      if (fs.existsSync(candidate)) {
        const fileUrl = `http://localhost:${SERVER_PORT}/audio?path=${encodeURIComponent(Buffer.from(candidate).toString('base64'))}`;
        return res.json({ filePath: candidate, fileUrl });
      }
    }
    res.json(null);
  });

  // Drag-and-drop: open audio by path (no dialog)
  api.post("/open-music-path", (req, res) => {
    const { filePath } = req.body;
    try { fs.statSync(filePath); } catch { return res.status(404).json(null); }
    const fileUrl = `http://localhost:${SERVER_PORT}/audio?path=${encodeURIComponent(Buffer.from(filePath).toString("base64"))}`;
    res.json({ filePath, fileUrl });
  });

  // Drag-and-drop: open lrc/txt by path (no dialog)
  api.post("/open-lrc-path", (req, res) => {
    const { filePath } = req.body;
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    try {
      const text = fs.readFileSync(filePath, 'utf8');
      res.json({ filePath, text, ext });
    } catch { res.json(null); }
  });

  api.post("/save-lrc", (req, res) => {
    const { filePath, text } = req.body;
    try {
      fs.writeFileSync(filePath, text, "utf8");
      res.json({ ok: true });
    } catch (e) {
      res.json({ ok: false, error: e.message });
    }
  });

  api.post("/save-lrc-as", async (req, res) => {
    const { text, title, mediaFilePath } = req.body;
    const defaultPath = mediaFilePath
      ? mediaFilePath.replace(/\.[^.]+$/, '.lrc')
      : "lyrics.lrc";
    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath,
      filters: [
        { name: "LRC Files", extensions: ["lrc"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }
    try {
      fs.writeFileSync(result.filePath, text, "utf8");
      res.json({ ok: true, filePath: result.filePath });
    } catch (e) {
      res.json({ ok: false, error: e.message });
    }
  });

  api.post("/open-txt", async (req, res) => {
    const { title } = req.body || {};
    const result = await dialog.showOpenDialog(mainWindow, {
      title,
      defaultPath: lastDir("open-txt"),
      filters: [
        { name: "Text Files", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] }
      ],
      properties: ["openFile"]
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    const filePath = result.filePaths[0];
    rememberDir("open-txt", filePath);
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const lines = raw.replace(/\r/g, "").split("\n");
      res.json({ filePath, lines });
    } catch (e) {
      res.json(null);
    }
  });

  api.post("/save-txt", async (req, res) => {
    const { lines, title, lrcFilePath, mediaFilePath } = req.body;
    const sourcePath = lrcFilePath || mediaFilePath;
    const defaultPath = sourcePath
      ? sourcePath.replace(/\.[^.]+$/, '.txt')
      : "lyrics.txt";
    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath,
      filters: [
        { name: "Text Files", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] }
      ]
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }
    try {
      fs.writeFileSync(result.filePath, lines.join("\n"), "utf8");
      res.json({ ok: true });
    } catch (e) {
      res.json(null);
    }
  });

  api.get("/metadata", async (req, res) => {
    const filePath = req.query.path;
    try {
      const mm = await import("music-metadata");
      let meta;
      try {
        meta = await mm.parseFile(filePath, { skipCovers: true });
      } catch (e) {
        if (e.message && e.message.includes("preamble")) {
          const manual = readFlacMetadataManual(filePath);
          if (manual) { res.json(manual); return; }
        }
        throw e;
      }
      const tags   = meta.common || {};
      const format = meta.format  || {};
      const duration = format.duration || null;
      let lengthStr = "";
      if (duration) {
        const m = Math.floor(duration / 60);
        const s = Math.floor(duration % 60);
        const h = Math.round((duration * 100) % 100);
        lengthStr = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(h).padStart(2,"0")}`;
      }
      res.json({
        title: tags.title || null,
        artist: tags.artist || null,
        album: tags.album || null,
        duration: lengthStr || null,
      });
    } catch (e) {
      console.error("[metadata] error:", e.message);
      res.json({ title: null, artist: null, album: null, duration: null });
    }
  });

  findFreePort(4000, (port) => {
    SERVER_PORT = port;
    api.listen(port, () => {
      mark("express listening");
      console.log(`${APP_NAME} API on http://localhost:${port}`);
      if (callback) callback(port);
    });
  });
}

function createWindow(port) {
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1100,
    height: 720,
    minWidth: 700,
    minHeight: 500,
    frame: true,
    icon: path.join(__dirname, isDev ? '../public/app.ico' : '../dist/app.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${DEV_PORT}?apiPort=${port}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"), { query: { apiPort: String(port) } });
  }
  mark("BrowserWindow created");
  mainWindow.webContents.once('did-finish-load', () => { mark("renderer did-finish-load"); dumpStartupTiming({ appName: APP_NAME, isDev, userDataPath: app.getPath("userData") }); });
  mainWindow.webContents.on('did-finish-load', () => mainWindow.setTitle(isDev ? `${APP_NAME} (Dev)` : APP_NAME));
  // ⚠ CLAUDE: external links (help button, update banner) must open in the system
  // browser - window.open('_blank') otherwise spawns a new Electron BrowserWindow.
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const appUrl = isDev ? `http://localhost:${DEV_PORT}` : `file://`;
    if (!url.startsWith(appUrl)) { event.preventDefault(); shell.openExternal(url); }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  // ⚠ CLAUDE: Ctrl+Shift+I is dead because Menu.setApplicationMenu(null) removes the default shortcut.
  // This restores it in dev only - do NOT remove.
  if (isDev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key === 'I') {
        mainWindow.webContents.toggleDevTools();
        event.preventDefault();
      }
    });
  }
}

app.whenReady().then(() => { mark("app.whenReady");
  Menu.setApplicationMenu(null);
  startServer((port) => createWindow(port));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow(SERVER_PORT);
});
