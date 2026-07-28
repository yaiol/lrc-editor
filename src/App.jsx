// ⚠ CLAUDE - NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - JSX text, title=, placeholder=, aria-label=,
//   confirm/alert/setMsg arguments - MUST go through t('keyName'). No exceptions.
//   Workflow: add keys to src/i18n.js EN, then translate, sort and audit every
//   language via the i18n key workflow. Full procedure: see CLAUDE-i18n.md.
//   Never paste translations by hand. The scripts ARE the work.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings, HelpCircle, Music, FolderOpen, Save, SavePlus, FilePlus, X, Play, Pause, Square, Moon, Sun, ScrollText, Upload, SkipBack, SkipForward, Volume1, Volume2, VolumeX, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useT, LANGUAGES } from './i18n';
import pkg from '../package.json';
import yaiolLogo from './assets/yaiol-logo.svg';
import { checkForUpdate } from './lib/update-check';
import { UpdateBanner } from './lib/ui-update-banner';
import { AppHeader } from './lib/ui-header';
import { GithubIcon } from './lib/ui-icons';
import { Splitter } from './lib/ui-ctl-splitter';
import { useToast } from './lib/ui-fx-toast';
import { NumberField } from './lib/ui-ctl-numberfield';
import { CollapseToggle } from './lib/ui-ctl-collapsetoggle';
import { useFileDrop } from './lib/ui-fx-filedrop';
// Storage namespace - single source: package.json `storagePrefix`. Never hardcode a prefix.
const STORAGE_PREFIX = pkg.storagePrefix;

// ─────────────────────────────────────────────────────────────────
// Electron local API
// ─────────────────────────────────────────────────────────────────

function getApiPort() {
  const params = new URLSearchParams(window.location.search);
  return params.get('apiPort') || '3003';
}
const API = `http://localhost:${getApiPort()}`;

// ─────────────────────────────────────────────────────────────────
// UI layout constants - single source of truth for all sizing
// ─────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────
// LRC pure functions
// ─────────────────────────────────────────────────────────────────

function convertToLRCTime(seconds) {
  const total = Math.max(0, seconds);
  const mins = Math.floor(total / 60);
  const secs = Math.floor(total % 60);
  const hundredths = Math.round((total * 100) % 100);
  return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}.${String(hundredths).padStart(2,'0')}`;
}

function convertFromLRCTime(str) {
  const m = /^(\d{1,5}):(\d{2})\.(\d{2})$/.exec(str);
  if (!m) return NaN;
  return parseInt(m[1],10) * 60 + parseInt(m[2],10) + parseInt(m[3],10) * 0.01;
}

function isValidLRCTime(str) {
  return /^\d{1,5}:\d{2}\.\d{2}$/.test(str);
}

function parseLRC(text) {
  const lrc = {
    artist: '', album: '', title: '', songwriter: '',
    length: '', lrcBy: '', offsetMs: 0, editor: '', editorVersion: '',
    lines: [],
  };
  const rawLines = text.replace(/\r/g, '').split('\n');
  for (const raw of rawLines) {
    const line = raw.trimStart();
    const endBracket = line.indexOf(']');
    if (line.startsWith('[') && endBracket > 0) {
      const inner = line.substring(1, endBracket);
      const rest = line.substring(endBracket + 1).trimStart();
      if (isValidLRCTime(inner)) {
        const t = convertFromLRCTime(inner);
        if (!isNaN(t)) lrc.lines.push({ time: t, text: rest });
      } else if (inner.includes(':') && lrc.lines.length === 0) {
        const idx = inner.indexOf(':');
        const key = inner.substring(0, idx).trim();
        const val = inner.substring(idx + 1);
        switch (key) {
          case 'ar': lrc.artist = val; break;
          case 'al': lrc.album = val; break;
          case 'ti': lrc.title = val; break;
          case 'au': lrc.songwriter = val; break;
          case 'length': lrc.length = val; break;
          case 'by': lrc.lrcBy = val; break;
          case 'offset': lrc.offsetMs = parseInt(val, 10) || 0; break;
          case 're': lrc.editor = val; break;
          case 've': lrc.editorVersion = val; break;
          default: break;
        }
      }
    }
  }
  return lrc;
}

function exportLRC(lrc) {
  const meta = [];
  if (lrc.artist)       meta.push(`[ar:${lrc.artist}]`);
  if (lrc.album)        meta.push(`[al:${lrc.album}]`);
  if (lrc.title)        meta.push(`[ti:${lrc.title}]`);
  if (lrc.songwriter)   meta.push(`[au:${lrc.songwriter}]`);
  if (lrc.length)       meta.push(`[length:${lrc.length}]`);
  if (lrc.lrcBy)        meta.push(`[by:${lrc.lrcBy}]`);
  if (lrc.offsetMs)     meta.push(`[offset:${lrc.offsetMs > 0 ? '+' : ''}${lrc.offsetMs}]`);
  if (lrc.editor)       meta.push(`[re:${lrc.editor}]`);
  if (lrc.editorVersion) meta.push(`[ve:${lrc.editorVersion}]`);
  const body = lrc.lines.map(l => `[${convertToLRCTime(l.time)}] ${l.text}`);
  return [...meta, ...(meta.length ? [''] : []), ...body].join('\n');
}


// ⚠ CLAUDE: line order NEVER changes - no sort here or anywhere in the app.
// When a timestamp is modified, adjacent lines are pushed by CASCADE_GAP to preserve ordering.
// Each violating neighbour is set to the changed line's new time ± CASCADE_GAP, then the check
// propagates outward until no more violations remain.
const CASCADE_GAP = 0.5; // 500 ms fixed gap enforced between cascaded lines

function applyLrcTimeChange(lines, index, newTime) {
  const clamped = Math.max(0, newTime);
  if (clamped === lines[index].time) return lines;
  const result = lines.map(l => ({ ...l }));
  result[index].time = clamped;
  if (clamped < lines[index].time) {
    // Decreased: cascade upward - each violating line is pulled to (nearest synced successor - CASCADE_GAP)
    // ⚠ CLAUDE: skip unsynced lines (time === 0) - cascading must never assign timestamps to them,
    // and the comparison must use the nearest SYNCED neighbour, never result[i+1] (an unsynced 0
    // there would drag a valid timestamp down to 0 and silently unsync the line).
    let next = clamped;
    for (let i = index - 1; i >= 0; i--) {
      if (result[i].time === 0) continue;
      if (result[i].time < next) break;
      if (next - CASCADE_GAP <= 0) break; // no room left before the start of the track
      result[i].time = next - CASCADE_GAP;
      next = result[i].time;
    }
  } else {
    // Increased: cascade downward - each violating line is pushed to (nearest synced predecessor + CASCADE_GAP)
    // ⚠ CLAUDE: same rule as above - skip unsynced lines and compare against the nearest synced neighbour.
    let prev = clamped;
    for (let i = index + 1; i < result.length; i++) {
      if (result[i].time === 0) continue;
      if (result[i].time > prev) break;
      result[i].time = prev + CASCADE_GAP;
      prev = result[i].time;
    }
  }
  return result;
}

// ⚠ CLAUDE: a loaded file can carry inverted timestamps (line i stamped AFTER line i+1) - written
// by another editor, or by a version of this app whose sync only cascaded forward. Order is repaired
// on load by pulling the EARLIER line back, never by moving the later one, so every stamp the user
// actually synced against the audio keeps its value.
function normalizeLrcTimes(lines) {
  const result = lines.map(l => ({ ...l }));
  let fixed = 0;
  let next = null; // nearest synced time below - unsynced lines (time 0) are skipped, never stamped
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i].time === 0) continue;
    if (next !== null && result[i].time >= next) {
      // halve instead of subtracting the gap when there is no room before the start of the track
      result[i].time = next - CASCADE_GAP > 0 ? next - CASCADE_GAP : next / 2;
      fixed++;
    }
    next = result[i].time;
  }
  return { lines: result, fixed };
}

function shiftLRCLine(lines, index, deltaSeconds) {
  if (index < 0 || index >= lines.length) return { lines, newIndex: index };
  return { lines: applyLrcTimeChange(lines, index, lines[index].time + deltaSeconds), newIndex: index };
}

function formatTime(seconds) {
  if (seconds < 0 || isNaN(seconds) || !isFinite(seconds)) return '--:--';
  const s = Math.floor(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function basename(filePath) {
  if (!filePath) return '';
  return filePath.replace(/.*[\\/]/, '');
}

// ─────────────────────────────────────────────────────────────────
// Fonts
// ─────────────────────────────────────────────────────────────────

// ─── App identity - single source of truth for the app name ──────────────────
const APP_NAME    = pkg.productName;
const APP_VERSION = pkg.version;

// Help page - opens at the user's setting language; the help site falls back to
// EN for languages it doesn't publish (no app-side fallback).
const HELP_URL = 'https://apps.yaiol.com/en/p/lrc-editor/help/';
// GitHub source - owner is constant (yaiol); repo name is the app id (pkg.name).
const GITHUB_URL = `https://github.com/yaiol/${pkg.name}`;

// ─────────────────────────────────────────────────────────────────
// Themes & CSS
// ─────────────────────────────────────────────────────────────────


// Colors come from the shared palette (src/assets/ui-colors.css) via var(--token).

function buildCss() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    /* Palette (--bg, --accent, --text, --border, --gradient, --shadow, …) comes from
       the shared ui-colors.css, keyed on data-theme. No token bridge here. */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; overflow: hidden; }
    body { background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; font-size: 13px; }
    button { cursor: pointer; border: none; background: none; color: inherit; font-family: inherit; font-size: inherit; }
    button:focus-visible { outline: 2px solid var(--accent) !important; outline-offset: 2px; border-radius: 4px; }
    input, textarea, select { font-family: inherit; font-size: inherit; color: var(--text); background: var(--bg-input); border: 1px solid var(--border); border-radius: 4px; outline: none; }
    input:focus, textarea:focus, select:focus { border-color: var(--accent); }
    textarea { resize: none; }
    /* .barh-app-version — shared, unscoped, in ui-app.css (bg = --bar-bgd). Not redefined here. */
    .lyric-line { padding: 5px 10px; cursor: pointer; border-bottom: 1px solid var(--border)20; display: flex; align-items: center; min-height: 28px; user-select: none; }
    .lyric-line.selected { background: var(--bg-hov); color: var(--accent); }
    .lyric-line:hover:not(.selected) { background: var(--bg-row); }
    .lyric-line input { width: 100%; background: transparent; border: none; color: var(--text); padding: 0; outline: none; }
    .lyric-line input:focus { outline: none; }
    .empty-state { padding: 32px 16px; text-align: center; color: var(--text-mute); font-size: 12px; }
input[type=range] { accent-color: var(--accent); cursor: pointer; }
    input[type=range]:disabled { opacity: 0.4; }
    .lrc-out-line { display: flex; align-items: center; padding: 4px 6px 4px 4px; min-height: 28px; cursor: pointer; border-bottom: 1px solid var(--border)20; font-family: 'Consolas', 'Courier New', monospace; font-size: 12px; user-select: none; }
    .lrc-out-line.active { background: #22ff8822; border-left: 3px solid #22ff8888; }
    .lrc-out-line.playing { background: var(--accent)22; border-left: 3px solid var(--accent)88; }
    .lrc-out-line.active.playing { background: var(--bg-hov); border-left: 3px solid var(--accent); }
    .lrc-out-line:hover:not(.active) { background: var(--bg-row); }
    .lrc-out-line .lrc-time { color: var(--accent); flex-shrink: 0; margin-right: 6px; opacity: 0.8; }
    .lrc-out-line.active .lrc-time { opacity: 1; }
    .lrc-out-line input { background: transparent; border: none; color: var(--text); font-family: inherit; font-size: inherit; padding: 0; outline: none; }
    .lrc-out-line input.lrc-text-input { flex: 1; min-width: 0; padding: 0 2px; }
    .lrc-out-line input.lrc-time-input { width: 9ch; color: var(--accent); flex-shrink: 0; padding: 0 2px; }
    .lrc-seek-btn { width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 3px; color: var(--text-mute); margin-right: 4px; opacity: 0; transition: opacity 0.15s; }
    .lrc-out-line.active .lrc-seek-btn { opacity: 1; color: var(--accent); }
    .lrc-out-line.playing .lrc-seek-btn { opacity: 1; color: var(--accent); }
    .lrc-nudge-btn { width: 18px; height: 18px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 3px; color: var(--text-mute); opacity: 0; transition: opacity 0.15s; background: none; border: none; cursor: pointer; padding: 0; }
    .lrc-out-line.active .lrc-nudge-btn { opacity: 1; color: var(--text-dim); }
    .lrc-nudge-btn:hover { background: var(--accent)20; color: var(--accent) !important; opacity: 1 !important; }
  `;
}

// ─────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────

export default function App() {
  const [langKey, setLangKey] = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-lang`) || navigator.language.split('-')[0] || 'en');
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-theme`) || 'light');
  const t = useT(langKey);

  const [updateInfo, setUpdateInfo]         = useState(null);
  useEffect(() => {
    checkForUpdate({ appId: pkg.name, alias: STORAGE_PREFIX, currentVersion: APP_VERSION })
      .then(u => { if (u) setUpdateInfo(u); });
  }, []);


  // LRC data model
  const EMPTY_LRC = () => ({
    artist: '', album: '', title: '', songwriter: '',
    length: '', lrcBy: '', offsetMs: 0, editor: 'LRC Editor', editorVersion: '1.0.0',
    lines: [],
  });
  const [lrcData, setLrcData] = useState(EMPTY_LRC);
  const [unsaved, setUnsaved] = useState(false);
  const [lrcFileName, setLrcFileName] = useState(null);


  // Audio / playback
  const [mediaFilePath, setMediaFilePath] = useState(null);
  const [mediaFileUrl, setMediaFileUrl] = useState(null);
  const [mediaTitle, setMediaTitle] = useState(null);
  const [playbackState, setPlaybackState] = useState('stopped');
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  // LRC output line editing
  const [lrcDraftTimes, setLrcDraftTimes] = useState({});

  // User-selected LRC line (for Earlier/Later/sync ops)
  const [activeLrcLine, setActiveLrcLine] = useState(-1);
  // Player cursor (auto-follows playback position)
  const [playingLine, setPlayingLine] = useState(-1);

  // UI
  const [notepadText, setNotepadText] = useState('');
  const [notepadWidth, setNotepadWidth] = useState(240);
  const [showNotepad, setShowNotepad] = useState(true);
  const [txtSettingsTimeReactionDelay, setTxtSettingsTimeReactionDelay]       = useState(() => parseInt(localStorage.getItem(`${STORAGE_PREFIX}-reaction-delay`), 10) || 500);
  const [reactionDelay, setReactionDelay]                     = useState(() => parseInt(localStorage.getItem(`${STORAGE_PREFIX}-reaction-delay`), 10) || 500);
  const [txtSettingsTimeVerificationDelay, setTxtSettingsTimeVerificationDelay] = useState(() => parseInt(localStorage.getItem(`${STORAGE_PREFIX}-verification-delay`), 10) || 3000);
  const [verificationDelay, setVerificationDelay]             = useState(() => parseInt(localStorage.getItem(`${STORAGE_PREFIX}-verification-delay`), 10) || 3000);
  const [isVerifyMode, setIsVerifyMode]             = useState(false);
  const [txtSettingsTimeSeekDelay, setTxtSettingsTimeSeekDelay]       = useState(() => parseFloat(localStorage.getItem(`${STORAGE_PREFIX}-seek-delay`)) || 10);
  const [seekDelay, setSeekDelay]                     = useState(() => parseFloat(localStorage.getItem(`${STORAGE_PREFIX}-seek-delay`)) || 10);
  const [txtSettingsTimeShiftDelay, setTxtSettingsTimeShiftDelay]       = useState(() => parseInt(localStorage.getItem(`${STORAGE_PREFIX}-shift-delay`), 10) || 200);
  const [txtSettingsMetaArtist, setTxtSettingsMetaArtist]         = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-default-artist`) || '');
  const [txtSettingsMetaSongwriter, setTxtSettingsMetaSongwriter] = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-default-songwriter`) || '');
  const [txtSettingsMetaLrcBy, setTxtSettingsMetaLrcBy]           = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-default-lrcby`) || '');
  const [endLyricsTime, setEndLyricsTime]           = useState(0);
  const [endLyricsTimeDraft, setEndLyricsTimeDraft] = useState(null);

  const [showMeta, setShowMeta] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tabSettingsActive, setTabSettingsActive] = useState('display');
  // Lifted clear of the player bar (42px .barh-footer + the toast's own 28px gap) so the pill
  // floats inside the content area instead of straddling the footer.
  const { showToast, toast } = useToast({ bottom: 70 });
  const [confirm, setConfirm] = useState(null);

  // Refs
  const audioRef = useRef(null);
  const confirmResolveRef = useRef(null);
  const lrcOutputListRef = useRef(null);
  const verifyTimeoutRef = useRef(null);
  const splitCursorRef = useRef({ idx: -1, pos: 0 });
  const pendingCaretRef = useRef(null);
  const undoStackRef = useRef([]);

  // ─── Helpers ───────────────────────────────────────────────────

  // ⚠ CLAUDE: Undo stack is capped at 50 entries (slice(-49) keeps 49, then adds 1). Do not raise without user request.
  function pushUndo() {
    undoStackRef.current = [...undoStackRef.current.slice(-49), lrcData];
  }

  function doUndo() {
    if (undoStackRef.current.length === 0) return;
    const prev = undoStackRef.current[undoStackRef.current.length - 1];
    undoStackRef.current = undoStackRef.current.slice(0, -1);
    setLrcData(prev);
    setUnsaved(true);
  }

  function showConfirmDialog(title, msg, noCancel = false) {
    return new Promise((resolve) => {
      confirmResolveRef.current = resolve;
      setConfirm({ title, msg, noCancel });
    });
  }

  function handleConfirmYes() {
    setConfirm(null);
    if (confirmResolveRef.current) { confirmResolveRef.current('yes'); confirmResolveRef.current = null; }
  }
  function handleConfirmNo() {
    setConfirm(null);
    if (confirmResolveRef.current) { confirmResolveRef.current('no'); confirmResolveRef.current = null; }
  }
  function handleConfirmCancel() {
    setConfirm(null);
    if (confirmResolveRef.current) { confirmResolveRef.current('cancel'); confirmResolveRef.current = null; }
  }

  // ─── LRC output line commit ──────────────────────────────────────

  function commitLrcTime(idx, draftStr) {
    const parsed = convertFromLRCTime(draftStr);
    if (!isNaN(parsed)) {
      pushUndo();
      setLrcData(prev => {
        const lines = applyLrcTimeChange(prev.lines, idx, parsed);
        return { ...prev, lines };
      });
      setUnsaved(true);
    }
    setLrcDraftTimes(prev => { const n = { ...prev }; delete n[idx]; return n; });
  }

  function updateLrcText(idx, text) {
    setLrcData(prev => ({ ...prev, lines: prev.lines.map((l, i) => i === idx ? { ...l, text } : l) }));
    setUnsaved(true);
  }

  // ─── Effects ───────────────────────────────────────────────────


  // Persist preferences
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-lang`, langKey); }, [langKey]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}-theme`, themeKey);
    document.documentElement.setAttribute('data-theme', themeKey); // resolves the shared :root[data-theme] palette (ui-*.css)
  }, [themeKey]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-reaction-delay`, txtSettingsTimeReactionDelay); }, [txtSettingsTimeReactionDelay]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-verification-delay`, txtSettingsTimeVerificationDelay); }, [txtSettingsTimeVerificationDelay]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-seek-delay`, txtSettingsTimeSeekDelay); }, [txtSettingsTimeSeekDelay]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-shift-delay`, txtSettingsTimeShiftDelay); }, [txtSettingsTimeShiftDelay]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-default-artist`, txtSettingsMetaArtist); }, [txtSettingsMetaArtist]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-default-songwriter`, txtSettingsMetaSongwriter); }, [txtSettingsMetaSongwriter]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-default-lrcby`, txtSettingsMetaLrcBy); }, [txtSettingsMetaLrcBy]);

  // Startup: check MPL handoff first, then fall back to .lrc file association
  useEffect(() => {
    async function init() {
      // Case 1: launched from MPL with a handoff file
      const handoff = await fetch(`${API}/handoff`).then(r => r.json());
      if (handoff) {
        if (handoff.mediaPath) {
          const mediaResult = await fetch(`${API}/open-music-path`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: handoff.mediaPath }),
          }).then(r => r.json());
          if (mediaResult) applyMediaResult(mediaResult);
        }
        if (handoff.lrcPath) {
          const lrcResult = await fetch(`${API}/open-lrc-path`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: handoff.lrcPath }),
          }).then(r => r.json());
          if (lrcResult) applyLrcResult(lrcResult);
        } else if (handoff.lyrics) {
          applyLrcResult({ text: handoff.lyrics, ext: 'txt' });
        }
        return;
      }
      // Case 2: .lrc file association double-click
      const { filePath } = await fetch(`${API}/launch-file`).then(r => r.json());
      if (!filePath) return;
      const result = await fetch(`${API}/open-lrc-path`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      }).then(r => r.json());
      if (!result) return;
      applyLrcResult(result);
      await tryAutoMedia(filePath);
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Audio src
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (mediaFileUrl) {
      audio.src = mediaFileUrl;
      audio.load();
    } else {
      audio.src = '';
      setPosition(0);
      setDuration(0);
      setPlaybackState('stopped');
    }
  }, [mediaFileUrl]);

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // Active LRC line tracking during playback
  useEffect(() => {
    if (playbackState !== 'playing') return;
    const id = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const pos = audio.currentTime;
      const offset = (lrcData.offsetMs || 0) * 0.001;
      const adjusted = pos - offset;
      let idx = -1;
      let bestTime = -1;
      for (let i = 0; i < lrcData.lines.length; i++) {
        const t = lrcData.lines[i].time;
        if (t <= adjusted && t > bestTime) { bestTime = t; idx = i; }
      }
      if (endLyricsTime > 0 && endLyricsTime <= adjusted && endLyricsTime > bestTime) {
        idx = lrcData.lines.length; // sentinel index = End of Lyrics row
      }
      setPlayingLine(idx);
    }, 100);
    return () => clearInterval(id);
  }, [playbackState, lrcData, endLyricsTime]);


  // Reset playingLine when stopped
  useEffect(() => {
    if (playbackState === 'stopped') setPlayingLine(-1);
  }, [playbackState]);

  // Verify mode: auto-advance to next line after verificationDelay ms
  useEffect(() => {
    if (!isVerifyMode || playbackState !== 'playing') return;
    clearTimeout(verifyTimeoutRef.current);
    // playingLine === -1 means we're before the first line - advance to lines[0]
    const nextLine = playingLine < 0 ? lrcData.lines[0] : lrcData.lines[playingLine + 1];
    if (!nextLine) return;
    verifyTimeoutRef.current = setTimeout(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.max(0, Math.min(audio.duration || 0, nextLine.time));
      setPosition(audio.currentTime);
    }, verificationDelay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingLine, isVerifyMode, playbackState, verificationDelay]);

  // Scroll playingLine into view during playback (+1 offset for phantom row)
  useEffect(() => {
    if (!lrcOutputListRef.current) return;
    const el = lrcOutputListRef.current.children[playingLine + 1];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [playingLine]);

  // Scroll user-selected line into view on manual click (+1 offset for phantom row)
  useEffect(() => {
    if (activeLrcLine < 0 || !lrcOutputListRef.current) return;
    const el = lrcOutputListRef.current.children[activeLrcLine + 1];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [activeLrcLine]);

  // Apply pending caret position after merge
  useEffect(() => {
    if (pendingCaretRef.current === null || activeLrcLine < 0 || !lrcOutputListRef.current) return;
    const pos = pendingCaretRef.current;
    pendingCaretRef.current = null;
    const row = lrcOutputListRef.current.children[activeLrcLine + 1];
    if (!row) return;
    const input = row.querySelector('input.lrc-text-input');
    if (!input) return;
    input.focus();
    input.setSelectionRange(pos, pos);
  }, [activeLrcLine]);

  // Global keyboard shortcuts
  const isInputFocused = useCallback(() => {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (isInputFocused()) return;
      if (showSettings || confirm) return;
      switch (e.key) {
        case ' ': e.preventDefault(); doPlayPause(); break;
        case 'Escape': doStop(); break;
        case 'Enter': e.preventDefault(); doSyncTime(); break;
        case 'z': case 'Z': if (e.ctrlKey || e.metaKey) { e.preventDefault(); doUndo(); } break;
        case 'ArrowLeft':
          e.preventDefault();
          doSeekBy(-seekDelay);
          break;
        case 'ArrowRight':
          e.preventDefault();
          doSeekBy(seekDelay);
          break;
        default: break;
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputFocused, showSettings, confirm, lrcData, activeLrcLine, mediaFilePath, position, reactionDelay, seekDelay]);

  // ─── Audio event handlers ─────────────────────────────────────

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || isSeeking) return;
    setPosition(audio.currentTime);
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
    setPosition(0);
  }

  function handleEnded() {
    setPlaybackState('stopped');
    setPosition(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  }

  function handleAudioError() {
    if (!mediaFilePath) return;
    const audio = audioRef.current;
    const code = audio?.error?.code;
    const msgs = { 1: 'Aborted', 2: 'Network error', 3: 'Decode error', 4: 'Format not supported' };
    showToast(`Audio error: ${msgs[code] || 'Unknown'} (code ${code})`);
    setPlaybackState('stopped');
  }

  // ─── Playback controls ────────────────────────────────────────

  function doPlayPause() {
    const audio = audioRef.current;
    if (!audio || !mediaFilePath) return;
    if (playbackState === 'playing') {
      if (isVerifyMode) {
        // switch from verify to standard without pausing
        setIsVerifyMode(false);
        clearTimeout(verifyTimeoutRef.current);
      } else {
        audio.pause();
        setPlaybackState('paused');
      }
    } else {
      audio.play().catch(() => {});
      setPlaybackState('playing');
      if (activeLrcLine < 0 && lrcData.lines.length > 0) setActiveLrcLine(0);
    }
  }

  function doStop() {
    const audio = audioRef.current;
    if (!audio || !mediaFilePath) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaybackState('stopped');
    setPosition(0);
    setIsVerifyMode(false);
    clearTimeout(verifyTimeoutRef.current);
  }

  function doVerifyPlay() {
    const audio = audioRef.current;
    if (!audio || !mediaFilePath) return;
    if (playbackState === 'playing') {
      if (!isVerifyMode) {
        // switch from standard to verify without pausing
        setIsVerifyMode(true);
      } else {
        audio.pause();
        setPlaybackState('paused');
        setIsVerifyMode(false);
        clearTimeout(verifyTimeoutRef.current);
      }
    } else {
      audio.play().catch(() => {});
      setPlaybackState('playing');
      setIsVerifyMode(true);
      if (activeLrcLine < 0 && lrcData.lines.length > 0) setActiveLrcLine(0);
    }
  }

  function doSeekBy(delta) {
    const audio = audioRef.current;
    if (!audio || !mediaFilePath) return;
    const newPos = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta));
    audio.currentTime = newPos;
    setPosition(newPos);
  }

  function doSeekTo(pos) {
    const audio = audioRef.current;
    if (!audio || !mediaFilePath) return;
    const clamped = Math.max(0, Math.min(audio.duration || 0, pos));
    audio.currentTime = clamped;
    setPosition(clamped);
  }

  function getPlayingLineIdx() {
    const cur = audioRef.current?.currentTime ?? 0;
    let idx = -1;
    for (let i = 0; i < lrcData.lines.length; i++) {
      if (lrcData.lines[i].time === 0) continue; // skip unsynced lines
      if (lrcData.lines[i].time != null && lrcData.lines[i].time <= cur) idx = i;
      else break;
    }
    return idx;
  }

  function doGoPrevStamp() {
    if (!mediaFilePath || !lrcData.lines.length) return;
    const cur = getPlayingLineIdx();
    let i = cur - 1;
    while (i >= 0 && lrcData.lines[i].time === 0) i--;
    if (i >= 0) { doSeekTo(lrcData.lines[i].time); setActiveLrcLine(i + 1); }
    else { doSeekTo(0); setActiveLrcLine(-1); } // mirror of doGoNextStamp's endLyricsTime fallback — step back past the first stamp to the start of music
  }

  function doGoNextStamp() {
    if (!mediaFilePath || !lrcData.lines.length) return;
    const cur = getPlayingLineIdx();
    let i = cur + 1;
    while (i < lrcData.lines.length && lrcData.lines[i].time === 0) i++;
    if (i < lrcData.lines.length) { doSeekTo(lrcData.lines[i].time); setActiveLrcLine(i + 1); }
    else if (endLyricsTime > 0) { doSeekTo(endLyricsTime); setActiveLrcLine(lrcData.lines.length); }
  }

  // ─── Sync operations ─────────────────────────────────────────

  // ⚠ CLAUDE: reactionDelay is in ms - divide by 1000 before subtracting from currentTime (which is in seconds).
  // Do NOT hardcode a fixed offset here - always use the live reactionDelay state value.
  function doSyncTime() {
    const audio = audioRef.current;
    if (!audio || !mediaFilePath || activeLrcLine < 0) return;
    const lineTime = Math.max(0, audio.currentTime - reactionDelay / 1000);
    // Sentinel: End of Lyrics row
    if (activeLrcLine === lrcData.lines.length) {
      setEndLyricsTime(lineTime);
      setUnsaved(true);
      return;
    }
    if (activeLrcLine >= lrcData.lines.length) return;
    pushUndo();
    // ⚠ CLAUDE: stamping a time goes through applyLrcTimeChange like every other time edit -
    // it cascades BOTH ways (earlier lines pulled back, later lines pushed forward), so a line
    // can never end up before its predecessor. Do not reintroduce a local one-directional push.
    setLrcData(prev => ({ ...prev, lines: applyLrcTimeChange(prev.lines, activeLrcLine, lineTime) }));
    setLrcDraftTimes({});
    setUnsaved(true);
    if (activeLrcLine < lrcData.lines.length) setActiveLrcLine(activeLrcLine + 1);
  }





  function doSplitLine() {
    pushUndo();
    const { idx, pos } = splitCursorRef.current;
    if (idx < 0 || idx >= lrcData.lines.length) return;
    const line = lrcData.lines[idx];
    const before = line.text.slice(0, pos);
    const after = line.text.slice(pos);
    const lines = [...lrcData.lines];
    lines[idx] = { ...line, text: before, time: pos === 0 ? 0 : line.time };
    lines.splice(idx + 1, 0, { time: pos === 0 ? line.time : 0, text: after });
    setLrcData(prev => ({ ...prev, lines }));
    setActiveLrcLine(idx + 1);
    setUnsaved(true);
  }

  function doMergeLine() {
    pushUndo();
    const idx = activeLrcLine;
    if (idx <= 0 || idx >= lrcData.lines.length) return;
    const lines = [...lrcData.lines];
    const merged = lines[idx - 1].text + lines[idx].text;
    const mergedTime = lines[idx - 1].text === '' ? lines[idx].time : lines[idx - 1].time;
    lines[idx - 1] = { ...lines[idx - 1], text: merged, time: mergedTime };
    lines.splice(idx, 1);
    setLrcData(prev => ({ ...prev, lines }));
    setActiveLrcLine(idx - 1);
    setUnsaved(true);
  }



  // ─── File operations ─────────────────────────────────────────

  async function allowUnsaved() {
    if (!unsaved) return true;
    const result = await showConfirmDialog(t('cfmAppUnsavedTitle'), t('cfmAppUnsavedMsg'));
    if (result === 'yes') return await doSave();
    if (result === 'no') return true;
    return false;
  }

  function doNewFile() {
    allowUnsaved().then(ok => {
      if (!ok) return;
      const empty = EMPTY_LRC();
      empty.editorVersion = APP_VERSION;
      setLrcData(empty);
      setUnsaved(false);
      setLrcFileName(null);
      setActiveLrcLine(-1);
    });
  }

  async function doOpenLyrics() {
    if (!(await allowUnsaved())) return;
    const result = await fetch(`${API}/open-lyrics`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t('ttlOsdOpenLyrics') }) }).then(r => r.json());
    if (!result) return;
    try {
      applyLrcResult(result);
      if (result.ext !== 'txt') await tryAutoMedia(result.filePath);
    } catch {
      showToast(t('tstAppFileError'));
    }
  }

  async function doSave() {
    const exportData = { ...lrcData, artist: lrcData.artist || txtSettingsMetaArtist, songwriter: lrcData.songwriter || txtSettingsMetaSongwriter, lrcBy: lrcData.lrcBy || txtSettingsMetaLrcBy, length: duration > 0 ? convertToLRCTime(duration) : lrcData.length, editor: APP_NAME, editorVersion: APP_VERSION };
    const text = exportLRC(exportData) + (endLyricsTime > 0 ? `\n[${convertToLRCTime(endLyricsTime)}] ` : '');
    if (lrcFileName) {
      const res = await fetch(`${API}/save-lrc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: lrcFileName, text }),
      }).then(r => r.json());
      if (res && res.ok) { setUnsaved(false); showToast(t('tstAppSaved')); return true; }
      showToast(t('tstAppSaveError')); return false;
    } else {
      return await doSaveAs();
    }
  }

  async function doSaveAs() {
    const exportData = { ...lrcData, artist: lrcData.artist || txtSettingsMetaArtist, songwriter: lrcData.songwriter || txtSettingsMetaSongwriter, lrcBy: lrcData.lrcBy || txtSettingsMetaLrcBy, length: duration > 0 ? convertToLRCTime(duration) : lrcData.length, editor: APP_NAME, editorVersion: APP_VERSION };
    const text = exportLRC(exportData) + (endLyricsTime > 0 ? `\n[${convertToLRCTime(endLyricsTime)}] ` : '');
    const res = await fetch(`${API}/save-lrc-as`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, title: t('ttlOsdSaveLrcAs'), mediaFilePath: mediaFilePath || null }),
    }).then(r => r.json());
    if (!res) return false;
    if (res.ok) { setLrcFileName(res.filePath); setUnsaved(false); showToast(t('tstAppSaved')); return true; }
    showToast(t('tstAppSaveError')); return false;
  }

  const AUDIO_EXTS = new Set(['mp3','wav','ogg','opus','flac','m4a','aac']);
  const LRC_EXTS   = new Set(['lrc','txt']);

  // ── Shared helpers ────────────────────────────────────────────

  function applyMediaResult(result) {
    doStop();
    setMediaFilePath(result.filePath);
    setMediaFileUrl(result.fileUrl);
    setPlaybackState('stopped');
    setPosition(0);
    setMediaTitle(null);
    fetch(`${API}/metadata?path=${encodeURIComponent(result.filePath)}`).then(r => r.json()).then(meta => {
      if (meta?.title) setMediaTitle(meta.title);
    });
  }

  function applyLrcResult(result) {
    if (result.ext === 'txt') {
      const lines = result.text.replace(/\r/g, '').split('\n').map(text => ({ time: 0, text }));
      setLrcData(prev => ({ ...prev, lines }));
      setActiveLrcLine(lines.length > 0 ? 0 : -1);
      setEndLyricsTime(0);
      setUnsaved(true);
    } else {
      const parsed = parseLRC(result.text);
      if (parsed.lines.length > 0 && parsed.lines[parsed.lines.length - 1].text === '') {
        setEndLyricsTime(parsed.lines[parsed.lines.length - 1].time);
        parsed.lines.pop();
      } else { setEndLyricsTime(0); }
      parsed.editor = parsed.editor || 'LRC Editor';
      parsed.editorVersion = parsed.editorVersion || APP_VERSION;
      const { lines: ordered, fixed } = normalizeLrcTimes(parsed.lines);
      parsed.lines = ordered;
      setLrcData(parsed);
      setLrcFileName(result.filePath);
      setUnsaved(fixed > 0);
      setActiveLrcLine(-1);
      if (fixed > 0) showToast(t('tstAppTimesFixed'));
      return fixed;
    }
    return 0;
  }

  async function tryAutoLrc(mediaFilePath) {
    const auto = await fetch(`${API}/auto-open-lrc`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: mediaFilePath }),
    }).then(r => r.json());
    if (!auto) return false;
    // the repair notice outranks "loaded automatically" - don't overwrite it
    if (!applyLrcResult(auto)) showToast(t('tstAppAutoLrcLoaded'));
    return true;
  }

  function resetLrc() {
    const empty = EMPTY_LRC();
    empty.editorVersion = APP_VERSION;
    setLrcData(empty);
    setLrcFileName(null);
    setEndLyricsTime(0);
    setUnsaved(false);
    setActiveLrcLine(-1);
  }

  async function tryAutoMedia(lrcFilePath) {
    const auto = await fetch(`${API}/auto-open-music`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: lrcFilePath }),
    }).then(r => r.json());
    if (!auto) return;
    applyMediaResult(auto);
  }

  // ── File operations ───────────────────────────────────────────

  async function doOpenMusic() {
    const result = await fetch(`${API}/open-music`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t('ttlOsdOpenMusic') }) }).then(r => r.json());
    if (!result) return;
    applyMediaResult(result);
    if (unsaved && !(await allowUnsaved())) return;
    const found = await tryAutoLrc(result.filePath);
    if (!found) resetLrc();
  }

  // Load a dropped audio or LRC file — routed by extension. The shared useFileDrop
  // hook handles the drag wiring + overlay; this only opens the resolved file, the
  // same path the header Open buttons use. Needs the OS path (to stream / read from
  // disk), so it goes through webUtils.getPathForFile (window.electronAPI).
  async function openDroppedFile(file) {
    const filePath = window.electronAPI?.getFilePath(file);
    if (!filePath) return;
    const ext = filePath.split('.').pop().toLowerCase();
    if (AUDIO_EXTS.has(ext)) {
      const result = await fetch(`${API}/open-music-path`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      }).then(r => r.json());
      if (!result) return;
      applyMediaResult(result);
      if (unsaved && !(await allowUnsaved())) return;
      const found = await tryAutoLrc(result.filePath);
      if (!found) resetLrc();
    } else if (LRC_EXTS.has(ext)) {
      if (!(await allowUnsaved())) return;
      const result = await fetch(`${API}/open-lrc-path`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      }).then(r => r.json());
      if (!result) return;
      applyLrcResult(result);
      await tryAutoMedia(filePath);
    }
  }

  // Shared drag-and-drop file loading (useFileDrop). dropProps + overlay are scoped
  // to the main content area (see render), so the blur covers the lyric view only —
  // the header and player bars stay sharp. Accepts the same audio + LRC extensions
  // the header Open dialogs allow.
  const { dropProps, overlay: dropOverlay } = useFileDrop({
    accept: [...AUDIO_EXTS, ...LRC_EXTS].map((e) => `.${e}`),
    onFile: (file) => openDroppedFile(file),
    label: t('empAppDropFile'),
  });

  async function doSaveTxt() {
    await fetch(`${API}/save-txt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lines: lrcData.lines.map(l => l.text), title: t('ttlOsdSaveTxt'), lrcFilePath: lrcFileName || null, mediaFilePath: mediaFilePath || null }),
    });
  }

  async function doAutoFillMeta() {
    if (!mediaFilePath) return;
    const meta = await fetch(`${API}/metadata?path=${encodeURIComponent(mediaFilePath)}`).then(r => r.json());
    if (!meta) return;
    setLrcData(prev => ({
      ...prev,
      title: meta.title || prev.title,
      artist: meta.artist || prev.artist,
      album: meta.album || prev.album,
      length: meta.duration || prev.length,
      editor: 'LRC Editor',
      editorVersion: APP_VERSION,
    }));
    setUnsaved(true);
  }

  function startNotepadResize(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = notepadWidth;
    function onMove(ev) {
      setNotepadWidth(Math.max(160, Math.min(520, startW + ev.clientX - startX)));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function copyNotepadToList() {
    if (notepadText.trim() === '') return;
    const lines = notepadText
      .replace(/\r/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\n +/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\n+/, '')
      .replace(/\n+$/, '')
      .split('\n');
    setLrcData(prev => ({ ...prev, lines: lines.map(text => ({ time: 0, text })) }));
    setActiveLrcLine(0);
    setUnsaved(true);
  }



  function closeSettings() {
    setShowSettings(false);
  }

  // ─── Metadata ────────────────────────────────────────────────

  function updateMeta(field, value) {
    setLrcData(prev => ({ ...prev, [field]: value }));
    setUnsaved(true);
  }

  // ─── LRC output cursor → activeLrcLine ───────────────────────

  // ─── Metadata modal ──────────────────────────────────────────

  function MetaModal() {
    return (
      <div className="dl-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowMeta(false); }}>
        <div className="dlg"
          onKeyDown={e => {
            if (e.key === 'Escape') setShowMeta(false);
            if (e.key !== 'Tab') return;
            const els = [...e.currentTarget.querySelectorAll('button, input')].filter(el => !el.disabled && el.offsetParent !== null);
            const first = els[0]; const last = els[els.length - 1];
            if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
            else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
          }}>
          <div className="dlg-head">
            <span className="dlg-title">{t('ttlDlgMeta')}</span>
            <button ref={el => { if (el && !el.dataset.didFocus) { el.dataset.didFocus = '1'; el.focus(); } }}
              onClick={() => setShowMeta(false)} className="dl-close">
              <X />
            </button>
          </div>
          <div className="dlg-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['lblDlgMetaArtist','plhDlgMetaArtist','artist', txtSettingsMetaArtist],
              ['lblDlgMetaAlbum','plhDlgMetaAlbum','album', ''],
              ['lblDlgMetaTitle','plhDlgMetaTitle','title', ''],
              ['lblDlgMetaSongwriter','plhDlgMetaSongwriter','songwriter', txtSettingsMetaSongwriter],
              ['lblDlgMetaLrcBy','plhDlgMetaLrcBy','lrcBy', txtSettingsMetaLrcBy],
            ].map(([lbl, plh, field, defVal]) => (
              <div key={field} className="dlg-field">
                <label className="dlg-field-label">{t(lbl)}</label>
                <input className="input" value={lrcData[field]} placeholder={defVal || t(plh)} onChange={e => updateMeta(field, e.target.value)} />
              </div>
            ))}
            <div className="dlg-field">
              <label className="dlg-field-label">{t('lblDlgMetaOffsetMs')}</label>
              <NumberField value={lrcData.offsetMs} onChange={v => updateMeta('offsetMs', v)} width={90} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn primary" onClick={doAutoFillMeta} title={t('tipDlgMetaAutoFill')} disabled={!hasMusic}>
                {t('btnDlgMetaAutoFill')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Settings modal ──────────────────────────────────────────

  function SettingsModal() {
    return (
      <div className="dl-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) closeSettings(); }}>
        <div className="dlg" onKeyDown={e => {
          if (e.key === 'Escape') closeSettings();
          if (e.key !== 'Tab') return;
          const els = [...e.currentTarget.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled && el.offsetParent !== null);
          const first = els[0]; const last = els[els.length - 1];
          if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
          else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
        }}>
          {/* Header */}
          <div className="dlg-head">
            <span className="dlg-title"><Settings />{t('ttlDlgSettings')}</span>
            <button ref={el => { if (el && !el.dataset.didFocus) { el.dataset.didFocus = '1'; el.focus(); } }}
              onClick={() => closeSettings()} className="dl-close">
              <X />
            </button>
          </div>
          {/* Tab bar */}
          <div className="tabs">
            {[{ key: 'display', label: t('tabDlgSettingsDisplay'), icon: Sun }, { key: 'time', label: t('tabDlgSettingsTime'), icon: Clock }, { key: 'meta', label: t('tabDlgSettingsMeta'), icon: Tag }, { key: 'about', label: t('tabDlgSettingsAbout'), icon: ScrollText }].map(({ key, label, icon: TabIcon }) => {
              const active = tabSettingsActive === key;
              return (
                <button key={key} onClick={() => setTabSettingsActive(key)} className={`tab ${active ? 'active' : ''}`}>
                  <TabIcon />{label}
                </button>
              );
            })}
          </div>
          {/* Content */}
          {/* Grid stacks all tabs in the same cell - height = tallest tab, no yoyo */}
          <div className="dlg-body" style={{ display: 'grid' }}>
            <div style={{ gridArea: '1/1', visibility: tabSettingsActive === 'display' ? 'visible' : 'hidden', zIndex: tabSettingsActive === 'display' ? 1 : 0, background: 'var(--dlg-bgd)', transition: 'none' }}>
              {/* Language */}
              <div className="dlg-field">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayLang')}</label>
                <select value={langKey} onChange={e => setLangKey(e.target.value)} className="select">
                  {LANGUAGES.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                </select>
              </div>
              {/* Theme */}
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayTheme')}</label>
                <div className="opt-btns">
                  {[{ key: 'dark', Icon: Moon }, { key: 'light', Icon: Sun }].map(({ key: tk, Icon }) => {
                    const active = themeKey === tk;
                    return (
                      <button key={tk} onClick={() => setThemeKey(tk)} className={`opt-btn ${active ? 'active' : ''}`}>
                        <Icon />
                        <span>{t(tk === 'dark' ? 'btnDlgSettingsDisplayThemeDark' : 'btnDlgSettingsDisplayThemeLight')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* time */}
            <div style={{ gridArea: '1/1', visibility: tabSettingsActive === 'time' ? 'visible' : 'hidden', zIndex: tabSettingsActive === 'time' ? 1 : 0, background: 'var(--dlg-bgd)', transition: 'none' }}>
              {/* Shift Delay */}
              <div className="dlg-field">
                <label className="dlg-field-label">{t('lblDlgSettingsTimeShiftDelay')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NumberField min={100} step={100} value={txtSettingsTimeShiftDelay} onChange={setTxtSettingsTimeShiftDelay} width={64} />
                  <span className="hint">ms</span>
                </div>
              </div>
              {/* Reaction Delay */}
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsTimeReactionDelay')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NumberField min={0} step={100} value={txtSettingsTimeReactionDelay} onChange={setTxtSettingsTimeReactionDelay} width={64} />
                  <span className="hint">ms</span>
                </div>
              </div>
              {/* Verification Delay */}
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsTimeVerificationDelay')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NumberField min={0} step={100} value={txtSettingsTimeVerificationDelay} onChange={setTxtSettingsTimeVerificationDelay} width={64} />
                  <span className="hint">ms</span>
                </div>
              </div>
              {/* Seek Back */}
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsTimeSeekDelay')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NumberField min={1} step={1} value={txtSettingsTimeSeekDelay} onChange={setTxtSettingsTimeSeekDelay} width={64} />
                  <span className="hint">s</span>
                </div>
              </div>
            </div>
            {/* meta */}
            <div style={{ gridArea: '1/1', visibility: tabSettingsActive === 'meta' ? 'visible' : 'hidden', zIndex: tabSettingsActive === 'meta' ? 1 : 0, background: 'var(--dlg-bgd)', transition: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['lblDlgSettingsMetaArtist', 'plhDlgSettingsMetaArtist', txtSettingsMetaArtist, setTxtSettingsMetaArtist],
                ['lblDlgSettingsMetaSongwriter', 'plhDlgSettingsMetaSongwriter', txtSettingsMetaSongwriter, setTxtSettingsMetaSongwriter],
                ['lblDlgSettingsMetaLrcBy', 'plhDlgSettingsMetaLrcBy', txtSettingsMetaLrcBy, setTxtSettingsMetaLrcBy],
              ].map(([lbl, plh, val, setter]) => (
                <div key={lbl} className="dlg-field">
                  <label className="dlg-field-label">{t(lbl)}</label>
                  <input className="input" value={val} placeholder={t(plh)} onChange={e => setter(e.target.value)} />
                </div>
              ))}
            </div>
            {/* about */}
            <div className="dlg-about" style={{ gridArea: '1/1', visibility: tabSettingsActive === 'about' ? 'visible' : 'hidden', zIndex: tabSettingsActive === 'about' ? 1 : 0, background: 'var(--dlg-bgd)', transition: 'none' }}>
              <img src={yaiolLogo} alt="Yaiol" style={{ width: 120, height: 'auto', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                <div className="dlg-about-id">
                  {APP_NAME} <b>v{APP_VERSION}</b> by yaiol
                </div>
                <div className="dlg-about-desc">{t('msgDlgSettingsAboutDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Confirm dialog ──────────────────────────────────────────

  function ConfirmDialog() {
    if (!confirm) return null;
    return (
      <div className="dl-backdrop" style={{ zIndex: 900 }}>
        <div className="dlp" onKeyDown={e => {
          if (e.key === 'Escape' && !confirm.noCancel) handleConfirmCancel();
          if (e.key !== 'Tab') return;
          const els = [...e.currentTarget.querySelectorAll('button')].filter(el => !el.disabled && el.offsetParent !== null);
          const first = els[0]; const last = els[els.length - 1];
          if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
          else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
        }}>
            <button className="dl-close" onClick={handleConfirmCancel}><X /></button>
            <div className="dlp-title">{confirm.title}</div>
            <div className="dlp-sub">{confirm.msg}</div>
            <div className="dlp-foot">
            {!confirm.noCancel && (
              <button
                ref={el => { if (el && !el.dataset.didFocus) { el.dataset.didFocus = '1'; el.focus(); } }}
                className="btn subtle"
                onClick={handleConfirmCancel}>
                {t('btnGlbCancel')}
              </button>
            )}
            <button
              ref={confirm.noCancel ? el => { if (el && !el.dataset.didFocus) { el.dataset.didFocus = '1'; el.focus(); } } : undefined}
              className="btn subtle"
              onClick={handleConfirmNo}>
              {t('btnGlbNo')}
            </button>
            <button onClick={handleConfirmYes} className="btn primary">
              {t('btnGlbYes')}
            </button>
            </div>
        </div>
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────

  const hasMusic = !!mediaFilePath;
  const isPlaying = playbackState === 'playing';
  const currentPos = isSeeking ? seekValue : position;

  return (
    <div className="app-root" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <style>{buildCss()}</style>

      {/* ── Update banner ── */}
      <UpdateBanner info={updateInfo} appId={pkg.name} lang={langKey} storagePrefix={STORAGE_PREFIX} t={t} onClose={() => setUpdateInfo(null)} />

      {/* ── Header ──────────────────────────────────────────── */}
      <AppHeader appName={APP_NAME} appVersion={APP_VERSION}>
        {/* File actions — one welded group: New · Open LRC · Open Music · Save · Save As.
            Open-Music keeps the Music-note icon (audio, distinct from the LRC open); it sits
            right after Open-LRC. Standard file icons per CLAUDE-ui-standards. */}
        <div className="barh-grp">
          <button className="btn icon" onClick={doNewFile} title={t('tipHdrNew')}><FilePlus /></button>
          <button className="btn icon" onClick={doOpenLyrics} title={t('tipHdrOpenLyrics')}><FolderOpen /></button>
          <button className="btn icon" onClick={doOpenMusic} title={t('tipHdrOpenMusic')}><Music /></button>
          <button className="btn icon" onClick={doSave} title={t('tipHdrSaveLrc')}><Save /></button>
          <button className="btn icon" onClick={doSaveAs} title={t('tipHdrSaveLrcAs')}><SavePlus /></button>
        </div>
        <button className="btn" onClick={() => setShowMeta(true)} title={t('tipHdrMeta')}>{t('btnHdrMeta')}</button>
        <button className="btn icon" onClick={doSaveTxt} title={t('tipHdrSaveTxt')}><Upload /></button>
        <div style={{ flex: 1 }} />
        <div className="barh-grp">
          <button className="btn icon" onClick={() => window.open(GITHUB_URL, '_blank')} title="GitHub"><GithubIcon /></button>
          <button className="btn icon" onClick={() => window.open(HELP_URL.replace('/en/p/', `/${langKey.replace(/_/g, '-')}/p/`), '_blank')} title={t('tipHdrHelp')}><HelpCircle /></button>
          <button className="btn icon" onClick={() => setShowSettings(true)} title={t('tipHdrSettings')}><Settings /></button>
        </div>
      </AppHeader>

      {/* ── .app-main content region = also the file-drop zone (overlay scoped
             here, so the blur covers content only, not the header / player bars).
             The row layout of panes lives INSIDE it (Rule 14). ──────────────── */}
      <div className="app-main" {...dropProps}>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Notepad panel */}
        {showNotepad && <div style={{ width: notepadWidth, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '4px 10px', borderBottom: `1px solid var(--border)`, fontSize: 11, color: 'var(--text-dim)', background: 'var(--bg-elev)', flexShrink: 0 }}>
            {t('lblNotepad')}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 8, gap: 8, overflow: 'hidden' }}>
            <textarea className="textarea" style={{ flex: 1, resize: 'none' }}
              value={notepadText} onChange={e => setNotepadText(e.target.value)}
              placeholder={t('plhNotepad')} spellCheck={false} />
            <div>
              <button className="btn primary" onClick={copyNotepadToList} title={t('tipNotepadSetLyrics')}>
                {t('btnNotepadSetLyrics')}
              </button>
            </div>
          </div>
        </div>}

        {/* Resize handle */}
        {showNotepad && <Splitter theme={themeKey} onResizeStart={startNotepadResize} />}

        {/* Notepad toggle tab */}
        <CollapseToggle open={showNotepad} onToggle={() => setShowNotepad(v => !v)} side="left" title={showNotepad ? t('tipNotepadHide') : t('tipNotepadShow')} />

        {/* LRC edit panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '4px 10px', borderBottom: `1px solid var(--border)`, fontSize: 11, color: 'var(--text-dim)', background: 'var(--bg-elev)', flexShrink: 0 }}>
            {lrcFileName ? basename(lrcFileName) : t('lblSyncNewFile')}{unsaved ? ' *' : ''} - {lrcData.lines.length} {t('lblSyncLines')}
          </div>
          <div ref={lrcOutputListRef} style={{ flex: 1, overflowY: 'auto' }}>
            {lrcData.lines.length === 0 && <div className="empty-state">{t('empSyncNoLrc')}</div>}
            {/* Phantom line - visual only, not saved */}
            <div className={`lrc-out-line${playingLine === -1 && playbackState !== 'stopped' ? ' playing' : ''}`}
              style={{ cursor: 'default', userSelect: 'none' }}>
              <button className="lrc-seek-btn" style={{ marginRight: 4, opacity: 1 }} title="Seek to 00:00.00"
                onClick={e => { e.stopPropagation(); doSeekTo(0); if (playbackState !== 'playing') doPlayPause(); }}>▶</button>
              <span style={{ width: '9ch', color: 'var(--accent)', fontFamily: 'monospace', flexShrink: 0, padding: '0 2px', fontSize: 12 }}>00:00.00</span>
              <span style={{ width: 18, flexShrink: 0 }} /><span style={{ width: 18, flexShrink: 0 }} />
              <span style={{ flex: 1, padding: '0 2px', fontSize: 12, color: 'var(--text-mute)', fontFamily: 'Consolas, monospace', fontStyle: 'italic' }}>{t('lblSyncStartOfMusic')}</span>
            </div>
            {lrcData.lines.map((line, idx) => (
              <div key={idx}
                className={`lrc-out-line${idx === activeLrcLine ? ' active' : ''}${idx === playingLine ? ' playing' : ''}`}
                onClick={() => setActiveLrcLine(idx)}>
                <button className="lrc-seek-btn" title={`Seek to ${convertToLRCTime(line.time)}`}
                  disabled={idx > 0 && line.time === 0}
                  onClick={e => { e.stopPropagation(); doSeekTo(line.time); if (playbackState !== 'playing') doPlayPause(); }}>
                  ▶
                </button>
                <input
                  value={lrcDraftTimes[idx] ?? convertToLRCTime(line.time)}
                  onChange={e => setLrcDraftTimes(prev => ({ ...prev, [idx]: e.target.value }))}
                  onFocus={() => setActiveLrcLine(idx)}
                  onBlur={e => commitLrcTime(idx, e.target.value)}
                  className="lrc-time-input" />
                <button className="lrc-nudge-btn" title={t('tipSyncEarlier')}
                  onClick={e => { e.stopPropagation(); setActiveLrcLine(idx); const { lines: nl } = shiftLRCLine(lrcData.lines, idx, -txtSettingsTimeShiftDelay / 1000); pushUndo(); setLrcData(prev => ({ ...prev, lines: nl })); setLrcDraftTimes({}); setUnsaved(true); }}>‹</button>
                <button className="lrc-nudge-btn" title={t('tipSyncLater')}
                  onClick={e => { e.stopPropagation(); setActiveLrcLine(idx); const { lines: nl } = shiftLRCLine(lrcData.lines, idx, txtSettingsTimeShiftDelay / 1000); pushUndo(); setLrcData(prev => ({ ...prev, lines: nl })); setLrcDraftTimes({}); setUnsaved(true); }}>›</button>
                <input
                  className="lrc-text-input"
                  value={line.text}
                  onFocus={() => setActiveLrcLine(idx)}
                  onChange={e => updateLrcText(idx, e.target.value)}
                  onSelect={e => { splitCursorRef.current = { idx, pos: e.target.selectionStart ?? 0 }; }}
                  onKeyDown={e => {
                    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); doUndo(); return; }
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || e.shiftKey)) { e.preventDefault(); splitCursorRef.current = { idx, pos: e.target.selectionStart ?? 0 }; pendingCaretRef.current = 0; doSplitLine(); }
                    else if (e.key === 'Enter') { e.preventDefault(); const inputs = document.querySelectorAll('.lrc-text-input'); if (idx + 1 < inputs.length) { setActiveLrcLine(idx + 1); inputs[idx + 1].focus(); } }
                    if (e.key === 'Backspace' && e.target.selectionStart === 0 && e.target.selectionEnd === 0) { e.preventDefault(); if (idx > 0) { pendingCaretRef.current = lrcData.lines[idx - 1].text.length; } doMergeLine(); }
                    if (e.key === 'Delete' && e.target.selectionStart === e.target.value.length && e.target.selectionEnd === e.target.value.length && idx + 1 < lrcData.lines.length) { e.preventDefault(); pushUndo(); pendingCaretRef.current = lrcData.lines[idx].text.length; const lines = [...lrcData.lines]; lines[idx] = { ...lines[idx], text: lines[idx].text + lines[idx + 1].text }; lines.splice(idx + 1, 1); setLrcData(prev => ({ ...prev, lines })); setActiveLrcLine(idx); setUnsaved(true); }
                  }}
                  onKeyUp={e => { splitCursorRef.current = { idx, pos: e.target.selectionStart ?? 0 }; }}
                  onBlur={e => { splitCursorRef.current = { idx, pos: e.target.selectionStart ?? 0 }; }}
                  placeholder="-"
                  style={{ color: line.text === '' ? 'var(--text-mute)' : 'var(--text)' }} />
              </div>
            ))}
            {/* End of Lyrics sentinel - timestamp editable, text fixed, saved as trailing empty line */}
            <div className={`lrc-out-line${activeLrcLine === lrcData.lines.length ? ' active' : ''}${playingLine === lrcData.lines.length ? ' playing' : ''}`} style={{ cursor: 'default', userSelect: 'none' }} onClick={() => setActiveLrcLine(lrcData.lines.length)}>
              <button className="lrc-seek-btn" title={`Seek to ${endLyricsTimeDraft ?? convertToLRCTime(endLyricsTime)}`}
                onClick={() => { doSeekTo(endLyricsTime); if (playbackState !== 'playing') doPlayPause(); }}>
                ▶
              </button>
              <input
                value={endLyricsTimeDraft ?? convertToLRCTime(endLyricsTime)}
                onChange={e => setEndLyricsTimeDraft(e.target.value)}
                onBlur={e => {
                  const parsed = convertFromLRCTime(e.target.value);
                  if (!isNaN(parsed)) { setEndLyricsTime(parsed); setUnsaved(true); }
                  setEndLyricsTimeDraft(null);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const parsed = convertFromLRCTime(e.target.value);
                    if (!isNaN(parsed)) { setEndLyricsTime(parsed); setUnsaved(true); }
                    setEndLyricsTimeDraft(null);
                    e.target.blur();
                  }
                  if (e.key === 'Escape') { setEndLyricsTimeDraft(null); e.target.blur(); }
                }}
                className="lrc-time-input" />
              <button className="lrc-nudge-btn" title={t('tipSyncEarlier')}
                onClick={() => { setEndLyricsTime(prev => Math.max(0, prev - txtSettingsTimeShiftDelay / 1000)); setUnsaved(true); }}>‹</button>
              <button className="lrc-nudge-btn" title={t('tipSyncLater')}
                onClick={() => { setEndLyricsTime(prev => prev + txtSettingsTimeShiftDelay / 1000); setUnsaved(true); }}>›</button>
              <span style={{ flex: 1, padding: '0 2px', fontSize: 12, color: 'var(--text-mute)', fontFamily: 'Consolas, monospace', fontStyle: 'italic' }}>{t('lblSyncEndOfLyrics')}</span>
            </div>
            {/* End of Music sentinel - fully non-editable, display-only, not saved */}
            <div className="lrc-out-line" style={{ cursor: 'default', userSelect: 'none' }}>
              <button className="lrc-seek-btn" title={duration > 0 ? `Seek to ${convertToLRCTime(duration)}` : '-'}
                onClick={() => { if (duration > 0) { doSeekTo(duration); if (playbackState !== 'playing') doPlayPause(); } }}>
                ▶
              </button>
              <span style={{ width: '9ch', color: 'var(--accent)', fontFamily: 'monospace', flexShrink: 0, padding: '0 2px', fontSize: 12 }}>
                {duration > 0 ? convertToLRCTime(duration) : '-'}
              </span>
              <span style={{ width: 18, flexShrink: 0 }} /><span style={{ width: 18, flexShrink: 0 }} />
              <span style={{ flex: 1, padding: '0 2px', fontSize: 12, color: 'var(--text-mute)', fontFamily: 'Consolas, monospace', fontStyle: 'italic' }}>{t('lblSyncEndOfMusic')}</span>
            </div>
          </div>
        </div>
      </div>

        {dropOverlay}
      </div>

      {/* ── Player bar ──────────────────────────────────────── */}
      <div className="barh-footer"> {/* shared canonical footer bar — ui-app.css */}
        <button className="btn primary" onClick={doSyncTime} title={t('tipFtrSyncTime')} disabled={!isPlaying || activeLrcLine < 0}>{t('btnFtrSyncTime')}</button>
        {/* ⚠ CLAUDE: These inline inputs are intentional - they let the user tune per-song without entering Settings. */}
        {/* Do NOT remove them even if Settings > Time has the same values. Rule C-1. */}
        {/* reactionDelay (ms) before play group, seekDelay (s) after seek-back button - matches original layout. */}
        <NumberField min={0} step={100} value={reactionDelay} onChange={setReactionDelay} title={t('lblFtrReactionDelay')} width={70} />
        <div className="barh-grp">
          <button className="btn icon" onClick={doPlayPause} title={t('tipFtrPlayPause')} disabled={!hasMusic}
            style={{ background: isPlaying && !isVerifyMode ? 'var(--accent)' : undefined, color: isPlaying && !isVerifyMode ? '#fff' : undefined }}>
            {isPlaying && !isVerifyMode ? <Pause /> : <Play />}
          </button>
          <button className="btn icon" onClick={doStop} title={t('tipFtrStop')} disabled={!hasMusic} style={{ color: 'var(--danger)' }}>
            <Square />
          </button>
        </div>
        <div className="barh-grp">
          <button className="btn icon" onClick={doVerifyPlay} title={t('tipFtrVerify')} disabled={!hasMusic}
            style={{ background: isVerifyMode && isPlaying ? 'var(--accent)' : undefined, color: isVerifyMode && isPlaying ? '#fff' : undefined }}>
            {isVerifyMode && isPlaying ? <Pause /> : <Play />}
          </button>
          <NumberField min={0} step={100} value={verificationDelay} onChange={setVerificationDelay} title={t('lblFtrVerificationDelay')} width={70} />
          <button className="btn icon" onClick={doGoPrevStamp} title={t('tipFtrPrevStamp')} disabled={!hasMusic}><SkipBack /></button>
          <button className="btn icon" onClick={doGoNextStamp} title={t('tipFtrNextStamp')} disabled={!hasMusic}><SkipForward /></button>
        </div>
        <div className="barh-grp">
          <NumberField min={0} step={1} value={seekDelay} onChange={setSeekDelay} title={t('lblFtrSeekDelay')} width={54} />
          <button className="btn icon" onClick={() => doSeekBy(-seekDelay)} title={t('tipFtrSeekBack')} disabled={!hasMusic}><ChevronLeft /></button>
          <button className="btn icon" onClick={() => doSeekBy(seekDelay)} title={t('tipFtrSeekNext')} disabled={!hasMusic}><ChevronRight /></button>
        </div>
        <span style={{ fontWeight: 600, color: 'var(--text)', flexShrink: 0, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          title={mediaFilePath || ''}>
          {mediaFilePath ? (mediaTitle || basename(mediaFilePath)) : '-'}
        </span>
        <input type="range" min={0} max={duration || 1} step={0.1}
          value={isSeeking ? seekValue : currentPos}
          onMouseDown={() => { setIsSeeking(true); setSeekValue(currentPos); }}
          onChange={e => setSeekValue(parseFloat(e.target.value))}
          onMouseUp={e => { doSeekTo(parseFloat(e.target.value)); setIsSeeking(false); }}
          disabled={!hasMusic}
          style={{ flex: 1, height: 4 }} />
        <span className="hint mono" style={{ minWidth: 88, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(currentPos)} / {formatTime(duration)}
        </span>
        <div className="barh-sep" />
        {(() => { const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2; return <VolumeIcon className="bar-glyph" style={{ color: 'var(--text-dim)' }} />; })()}
        <input type="range" min={0} max={100} value={volume}
          onChange={e => setVolume(parseInt(e.target.value, 10))}
          style={{ width: 65, height: 4 }} />
      </div>

      {/* ── Hidden audio element ─────────────────────────────── */}
      <audio ref={audioRef} style={{ display: 'none' }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleAudioError}
      />

      {/* ── Toast ───────────────────────────────────────────── */}
      {toast}

      {/* ── Modals ──────────────────────────────────────────── */}
      {ConfirmDialog()}
      {showMeta && MetaModal()}
      {showSettings && SettingsModal()}
    </div>
  );
}
