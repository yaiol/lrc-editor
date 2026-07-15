// ⚠ CLAUDE PRE-COMMIT GUARD - STOP before editing this file.
//   It holds every UI string, in every language. Do NOT hand-edit it: no empty
//   {} blocks, no copying values from another app, no pasting translations, no
//   "I'll fill the others later" - all of those are bugs. The only correct path
//   is the i18n key workflow: add keys in EN, then translate, sort and audit
//   across every language. Full procedure and exact commands: see CLAUDE-i18n.md.
// ██████████████████████████████████████████████████████████████████████████████
// ██                                                                        ██
// ██  TRANSLATION RULES - no exceptions:                                    ██
// ██    - NEVER copy an English value into a non-English language block.     ██
// ██    - Every language MUST have its OWN translation of every key.         ██
// ██    - Using replace_all to stamp English across all blocks is FORBIDDEN. ██
// ██    - Translate each language individually. There is no shortcut.        ██
// ██                                                                        ██
// ██████████████████████████████████████████████████████████████████████████████

import { useMemo } from 'react';

const TRANSLATIONS = {
  en: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "New version available:",
    lnkUpdateWhatsNew:                      "What's new",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Skip this version",
    tipUpdateDismiss:                       "Dismiss",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Open Music File",
    ttlOsdOpenLyrics:                       "Open Lyrics File",
    ttlOsdSaveLrcAs:                        "Save LRC File",
    ttlOsdSaveTxt:                          "Save Text File",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Help",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verify - plays and auto-advances through each line after the Verification Delay",
    lblFtrVerificationDelay:                "Verification Delay",
    tipFtrPrevStamp:                        "Previous timestamp",
    tipFtrNextStamp:                        "Next timestamp",
    lblFtrSeekDelay:                        "Seek Delay",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Seek forward by configured seconds (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Verification Delay",
    lblDlgSettingsTimeSeekDelay:            "Seek Delay",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Show Notepad",
    tipNotepadHide:                         "Hide Notepad",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "New File",
    lblSyncLines:                           "lines",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

    // ⚠ CLAUDE: do NOT add keys here - every key must belong to an existing Prefix block above. If no block fits, ask the user.
  },

  fr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Annuler",
    btnGlbYes:                              "Oui",
    btnGlbNo:                               "Non",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nouvelle version disponible :",
    lnkUpdateWhatsNew:                      "Nouveautés",
    btnUpdateDownload:                      "Télécharger",
    lnkUpdateSkip:                          "Ignorer cette version",
    tipUpdateDismiss:                       "Ignorer",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Déposez un fichier audio ou LRC ici",
    cfmAppUnsavedTitle:                     "Modifications non enregistrées",
    cfmAppUnsavedMsg:                       "Enregistrer avant de continuer ?",
    tstAppSaved:                            "Fichier enregistré.",
    tstAppAutoLrcLoaded:                    "Fichier de paroles chargé automatiquement.",
    tstAppFileError:                        "Impossible d'ouvrir le fichier.",
    tstAppSaveError:                        "Impossible d'enregistrer.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Ouvrir un fichier musical",
    ttlOsdOpenLyrics:                       "Ouvrir un fichier de paroles",
    ttlOsdSaveLrcAs:                        "Enregistrer le fichier LRC",
    ttlOsdSaveTxt:                          "Enregistrer le fichier texte",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nouveau fichier LRC",
    tipHdrOpenMusic:                        "Ouvrir un fichier audio",
    tipHdrOpenLyrics:                       "Ouvrir un fichier de paroles (.lrc avec horodatages ou .txt pour les paroles brutes)",
    tipHdrSaveLrc:                          "Enregistrer le fichier LRC",
    tipHdrSaveLrcAs:                        "Enregistrer sous…",
    tipHdrMeta:                             "Modifier les métadonnées du morceau",
    btnHdrMeta:                             "Métadonnées",
    tipHdrSaveTxt:                          "Exporter vers .txt",
    tipHdrSettings:                         "Ouvrir les paramètres",
    tipHdrHelp:                             "Aide",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Horodater la ligne actuelle et avancer (Entrée)",
    btnFtrSyncTime:                         "Sync. temps",
    lblFtrReactionDelay:                    "Délai de réaction",
    tipFtrPlayPause:                        "Lecture / Pause (Espace)",
    tipFtrStop:                             "Arrêt (Échap)",
    tipFtrVerify:                           "Vérifier - lecture et avance automatique après le Délai de vérification",
    lblFtrVerificationDelay:                "Délai de vérification",
    tipFtrPrevStamp:                        "Horodatage précédent",
    tipFtrNextStamp:                        "Horodatage suivant",
    lblFtrSeekDelay:                        "Délai de saut",
    tipFtrSeekBack:                         "Reculer du nombre de secondes configuré (←)",
    tipFtrSeekNext:                         "Avancer du nombre de secondes configuré (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Paramètres",
    tabDlgSettingsDisplay:                  "Affichage",
    tabDlgSettingsTime:                     "Temps",
    tabDlgSettingsMeta:                     "Métadonnées",
    tabDlgSettingsAbout:                    "À propos",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Langue",
    lblDlgSettingsDisplayTheme:             "Thème",
    btnDlgSettingsDisplayThemeDark:         "Sombre",
    btnDlgSettingsDisplayThemeLight:        "Clair",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Décalage édition",
    lblDlgSettingsTimeReactionDelay:        "Délai de réaction",
    lblDlgSettingsTimeVerificationDelay:    "Délai de vérification",
    lblDlgSettingsTimeSeekDelay:            "Délai de saut",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artiste",
    plhDlgSettingsMetaArtist:               "Nom de l'artiste",
    lblDlgSettingsMetaSongwriter:           "Auteur",
    plhDlgSettingsMetaSongwriter:           "Parolier / compositeur",
    lblDlgSettingsMetaLrcBy:                "LRC par",
    plhDlgSettingsMetaLrcBy:                "Créateur du LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "créez des fichiers de paroles synchronisées.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Métadonnées",
    lblDlgMetaArtist:                       "Artiste",
    plhDlgMetaArtist:                       "Nom de l'artiste",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Nom de l'album",
    lblDlgMetaTitle:                        "Titre",
    plhDlgMetaTitle:                        "Titre de la chanson",
    lblDlgMetaSongwriter:                   "Auteur",
    plhDlgMetaSongwriter:                   "Parolier / compositeur",
    lblDlgMetaLrcBy:                        "LRC par",
    plhDlgMetaLrcBy:                        "Créateur du LRC",
    lblDlgMetaOffsetMs:                     "Décalage global (ms)",
    tipDlgMetaAutoFill:                     "Remplir depuis les tags audio",
    btnDlgMetaAutoFill:                     "Remplir auto",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Bloc-notes",
    tipNotepadShow:                         "Afficher le bloc-notes",
    tipNotepadHide:                         "Masquer le bloc-notes",
    plhNotepad:                             "Collez les paroles non synchronisées ici…",
    btnNotepadSetLyrics:                    "Définir les paroles",
    tipNotepadSetLyrics:                    "Définir la liste de paroles depuis le bloc-notes",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nouveau fichier",
    lblSyncLines:                           "lignes",
    empSyncNoLrc:                           "Synchronisez les lignes avec la musique.",
    lblSyncStartOfMusic:                    "Début de la musique",
    tipSyncEarlier:                         "Décaler −50ms (D)",
    tipSyncLater:                           "Décaler +50ms (F)",
    lblSyncEndOfLyrics:                     "Fin des paroles",
    lblSyncEndOfMusic:                      "Fin de la musique",

  },

  de: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Abbrechen",
    btnGlbYes:                              "Ja",
    btnGlbNo:                               "Nein",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Neue Version verfügbar:",
    lnkUpdateWhatsNew:                      "Was ist neu",
    btnUpdateDownload:                      "Herunterladen",
    lnkUpdateSkip:                          "Diese Version überspringen",
    tipUpdateDismiss:                       "Schließen",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Audio- oder LRC-Datei hier ablegen",
    cfmAppUnsavedTitle:                     "Ungespeicherte Änderungen",
    cfmAppUnsavedMsg:                       "Vor dem Fortfahren speichern?",
    tstAppSaved:                            "Datei gespeichert.",
    tstAppAutoLrcLoaded:                    "Liedtextdatei automatisch geladen.",
    tstAppFileError:                        "Datei konnte nicht geöffnet werden.",
    tstAppSaveError:                        "Datei konnte nicht gespeichert werden.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Musikdatei öffnen",
    ttlOsdOpenLyrics:                       "Liedtextdatei öffnen",
    ttlOsdSaveLrcAs:                        "LRC-Datei speichern",
    ttlOsdSaveTxt:                          "Textdatei speichern",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Neue LRC-Datei",
    tipHdrOpenMusic:                        "Audiodatei öffnen",
    tipHdrOpenLyrics:                       "Liedtextdatei öffnen (.lrc mit Zeitstempeln oder .txt für einfachen Text)",
    tipHdrSaveLrc:                          "LRC-Datei speichern",
    tipHdrSaveLrcAs:                        "Als neue .lrc-Datei speichern",
    tipHdrMeta:                             "Songmetadaten bearbeiten",
    btnHdrMeta:                             "Metadaten",
    tipHdrSaveTxt:                          "Liedtextliste als .txt exportieren",
    tipHdrSettings:                         "Einstellungen öffnen",
    tipHdrHelp:                             "Hilfe",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Aktuelle Zeile mit Spielerzeit stempeln und vorrücken (Enter)",
    btnFtrSyncTime:                         "Zeit sync.",
    lblFtrReactionDelay:                    "Reaktionsverzögerung",
    tipFtrPlayPause:                        "Wiedergabe / Pause (Leertaste)",
    tipFtrStop:                             "Stopp (Esc)",
    tipFtrVerify:                           "Verifizieren - spielt und wechselt automatisch nach der Verifikationsverzögerung",
    lblFtrVerificationDelay:                "Verifikationsverzögerung",
    tipFtrPrevStamp:                        "Vorheriger Zeitstempel",
    tipFtrNextStamp:                        "Nächster Zeitstempel",
    lblFtrSeekDelay:                        "Sprungverzögerung",
    tipFtrSeekBack:                         "Eingestellte Sekunden zurück (←)",
    tipFtrSeekNext:                         "Eingestellte Sekunden vor (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Einstellungen",
    tabDlgSettingsDisplay:                  "Anzeige",
    tabDlgSettingsTime:                     "Zeiten",
    tabDlgSettingsMeta:                     "Metadaten",
    tabDlgSettingsAbout:                    "Über",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprache",
    lblDlgSettingsDisplayTheme:             "Design",
    btnDlgSettingsDisplayThemeDark:         "Dunkel",
    btnDlgSettingsDisplayThemeLight:        "Hell",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Zeilenversatz",
    lblDlgSettingsTimeReactionDelay:        "Reaktionsverzögerung",
    lblDlgSettingsTimeVerificationDelay:    "Verifikationsverzögerung",
    lblDlgSettingsTimeSeekDelay:            "Sprungverzögerung",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Künstler",
    plhDlgSettingsMetaArtist:               "Künstlername",
    lblDlgSettingsMetaSongwriter:           "Texter",
    plhDlgSettingsMetaSongwriter:           "Texter / Komponist",
    lblDlgSettingsMetaLrcBy:                "LRC von",
    plhDlgSettingsMetaLrcBy:                "LRC-Ersteller",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "synchronisierte Liedtextdateien erstellen.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadaten",
    lblDlgMetaArtist:                       "Künstler",
    plhDlgMetaArtist:                       "Künstlername",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Albumname",
    lblDlgMetaTitle:                        "Titel",
    plhDlgMetaTitle:                        "Songtitel",
    lblDlgMetaSongwriter:                   "Texter",
    plhDlgMetaSongwriter:                   "Texter / Komponist",
    lblDlgMetaLrcBy:                        "LRC von",
    plhDlgMetaLrcBy:                        "LRC-Ersteller",
    lblDlgMetaOffsetMs:                     "Globaler Versatz (ms)",
    tipDlgMetaAutoFill:                     "Metadaten aus Musik-Tags übernehmen",
    btnDlgMetaAutoFill:                     "Auto-Ausfüllen",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notizblock",
    tipNotepadShow:                         "Notizblock anzeigen",
    tipNotepadHide:                         "Notizblock ausblenden",
    plhNotepad:                             "Nicht synchronisierten Liedtext hier einfügen…",
    btnNotepadSetLyrics:                    "Lyrics setzen",
    tipNotepadSetLyrics:                    "Lyrics-Liste aus dem Notizblock setzen",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Neue Datei",
    lblSyncLines:                           "Zeilen",
    empSyncNoLrc:                           "Zeilen mit der Musik synchronisieren.",
    lblSyncStartOfMusic:                    "Musikbeginn",
    tipSyncEarlier:                         "Zeile −50ms verschieben (D)",
    tipSyncLater:                           "Zeile +50ms verschieben (F)",
    lblSyncEndOfLyrics:                     "Ende der Lyrics",
    lblSyncEndOfMusic:                      "Musikende",

  },

  es: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancelar",
    btnGlbYes:                              "Sí",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nueva versión disponible:",
    lnkUpdateWhatsNew:                      "Novedades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Suelta un archivo de audio o LRC aquí",
    cfmAppUnsavedTitle:                     "Cambios sin guardar",
    cfmAppUnsavedMsg:                       "¿Guardar antes de continuar?",
    tstAppSaved:                            "Archivo guardado.",
    tstAppAutoLrcLoaded:                    "Archivo de letras cargado automáticamente.",
    tstAppFileError:                        "Error al abrir el archivo.",
    tstAppSaveError:                        "Error al guardar el archivo.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Abrir archivo de música",
    ttlOsdOpenLyrics:                       "Abrir archivo de letras",
    ttlOsdSaveLrcAs:                        "Guardar archivo LRC",
    ttlOsdSaveTxt:                          "Guardar archivo de texto",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nuevo archivo LRC",
    tipHdrOpenMusic:                        "Abrir archivo de audio",
    tipHdrOpenLyrics:                       "Abrir archivo de letras (.lrc con marcas de tiempo o .txt para letras simples)",
    tipHdrSaveLrc:                          "Guardar archivo LRC",
    tipHdrSaveLrcAs:                        "Guardar como nuevo archivo .lrc",
    tipHdrMeta:                             "Editar metadatos de la canción",
    btnHdrMeta:                             "Metadatos",
    tipHdrSaveTxt:                          "Exportar lista como .txt",
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Ayuda",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Marcar la línea actual con el tiempo del reproductor y avanzar (Enter)",
    btnFtrSyncTime:                         "Sincronizar",
    lblFtrReactionDelay:                    "Retardo de reacción",
    tipFtrPlayPause:                        "Reproducir / Pausar (Espacio)",
    tipFtrStop:                             "Detener (Esc)",
    tipFtrVerify:                           "Verificar - reproduce y avanza automáticamente tras el Retraso de verificación",
    lblFtrVerificationDelay:                "Retraso de verificación",
    tipFtrPrevStamp:                        "Marca de tiempo anterior",
    tipFtrNextStamp:                        "Siguiente marca de tiempo",
    lblFtrSeekDelay:                        "Tiempo de salto",
    tipFtrSeekBack:                         "Retroceder los segundos configurados (←)",
    tipFtrSeekNext:                         "Avanzar los segundos configurados (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Pantalla",
    tabDlgSettingsTime:                     "Tiempo",
    tabDlgSettingsMeta:                     "Metadatos",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Oscuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Retardo de edición",
    lblDlgSettingsTimeReactionDelay:        "Retardo de reacción",
    lblDlgSettingsTimeVerificationDelay:    "Retraso de verificación",
    lblDlgSettingsTimeSeekDelay:            "Tiempo de salto",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artista",
    plhDlgSettingsMetaArtist:               "Nombre del artista",
    lblDlgSettingsMetaSongwriter:           "Compositor",
    plhDlgSettingsMetaSongwriter:           "Letrista / compositor",
    lblDlgSettingsMetaLrcBy:                "LRC por",
    plhDlgSettingsMetaLrcBy:                "Creador del LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "crea archivos de letras sincronizadas.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadatos",
    lblDlgMetaArtist:                       "Artista",
    plhDlgMetaArtist:                       "Nombre del artista",
    lblDlgMetaAlbum:                        "Álbum",
    plhDlgMetaAlbum:                        "Nombre del álbum",
    lblDlgMetaTitle:                        "Título",
    plhDlgMetaTitle:                        "Título de la canción",
    lblDlgMetaSongwriter:                   "Compositor",
    plhDlgMetaSongwriter:                   "Letrista / compositor",
    lblDlgMetaLrcBy:                        "LRC por",
    plhDlgMetaLrcBy:                        "Creador del LRC",
    lblDlgMetaOffsetMs:                     "Desfase global (ms)",
    tipDlgMetaAutoFill:                     "Completar metadatos desde etiquetas de audio",
    btnDlgMetaAutoFill:                     "Autocompletar",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Bloc de notas",
    tipNotepadShow:                         "Mostrar bloc de notas",
    tipNotepadHide:                         "Ocultar bloc de notas",
    plhNotepad:                             "Pega o escribe las letras no sincronizadas aquí…",
    btnNotepadSetLyrics:                    "Establecer letra",
    tipNotepadSetLyrics:                    "Establecer la lista de letras desde el bloc de notas",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nuevo archivo",
    lblSyncLines:                           "líneas",
    empSyncNoLrc:                           "Sincronice líneas con la música.",
    lblSyncStartOfMusic:                    "Inicio de la música",
    tipSyncEarlier:                         "Mover −50ms (D)",
    tipSyncLater:                           "Mover +50ms (F)",
    lblSyncEndOfLyrics:                     "Fin de la letra",
    lblSyncEndOfMusic:                      "Fin de la música",

  },

  pt_BR: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancelar",
    btnGlbYes:                              "Sim",
    btnGlbNo:                               "Não",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Baixar",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Solte um arquivo de áudio ou LRC aqui",
    cfmAppUnsavedTitle:                     "Alterações não guardadas",
    cfmAppUnsavedMsg:                       "Guardar antes de continuar?",
    tstAppSaved:                            "Ficheiro guardado.",
    tstAppAutoLrcLoaded:                    "Arquivo de letras carregado automaticamente.",
    tstAppFileError:                        "Erro ao abrir ficheiro.",
    tstAppSaveError:                        "Erro ao guardar ficheiro.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Abrir ficheiro de música",
    ttlOsdOpenLyrics:                       "Abrir ficheiro de letras",
    ttlOsdSaveLrcAs:                        "Guardar ficheiro LRC",
    ttlOsdSaveTxt:                          "Guardar ficheiro de texto",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novo arquivo LRC",
    tipHdrOpenMusic:                        "Abrir arquivo de áudio",
    tipHdrOpenLyrics:                       "Abrir ficheiro de letras (.lrc com marcas de tempo ou .txt para letras simples)",
    tipHdrSaveLrc:                          "Guardar arquivo LRC",
    tipHdrSaveLrcAs:                        "Guardar como novo .lrc",
    tipHdrMeta:                             "Editar metadados da música",
    btnHdrMeta:                             "Metadados",
    tipHdrSaveTxt:                          "Exportar lista para .txt",
    tipHdrSettings:                         "Abrir definições",
    tipHdrHelp:                             "Ajuda",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Marcar a linha atual com o tempo do reprodutor e avançar (Enter)",
    btnFtrSyncTime:                         "Sincronizar",
    lblFtrReactionDelay:                    "Atraso de reação",
    tipFtrPlayPause:                        "Reproduzir / Pausar (Espaço)",
    tipFtrStop:                             "Parar (Esc)",
    tipFtrVerify:                           "Verificar - toca e avança automaticamente após o Atraso de verificação",
    lblFtrVerificationDelay:                "Atraso de verificação",
    tipFtrPrevStamp:                        "Marca de tempo anterior",
    tipFtrNextStamp:                        "Próxima marca de tempo",
    lblFtrSeekDelay:                        "Tempo de salto",
    tipFtrSeekBack:                         "Recuar os segundos configurados (←)",
    tipFtrSeekNext:                         "Avançar os segundos configurados (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Definições",
    tabDlgSettingsDisplay:                  "Exibição",
    tabDlgSettingsTime:                     "Tempo",
    tabDlgSettingsMeta:                     "Metadados",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Atraso de edição",
    lblDlgSettingsTimeReactionDelay:        "Atraso de reação",
    lblDlgSettingsTimeVerificationDelay:    "Atraso de verificação",
    lblDlgSettingsTimeSeekDelay:            "Tempo de salto",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artista",
    plhDlgSettingsMetaArtist:               "Nome do artista",
    lblDlgSettingsMetaSongwriter:           "Compositor",
    plhDlgSettingsMetaSongwriter:           "Letrista / compositor",
    lblDlgSettingsMetaLrcBy:                "LRC por",
    plhDlgSettingsMetaLrcBy:                "Criador do LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "crie ficheiros de letras sincronizadas.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadados",
    lblDlgMetaArtist:                       "Artista",
    plhDlgMetaArtist:                       "Nome do artista",
    lblDlgMetaAlbum:                        "Álbum",
    plhDlgMetaAlbum:                        "Nome do álbum",
    lblDlgMetaTitle:                        "Título",
    plhDlgMetaTitle:                        "Título da música",
    lblDlgMetaSongwriter:                   "Compositor",
    plhDlgMetaSongwriter:                   "Letrista / compositor",
    lblDlgMetaLrcBy:                        "LRC por",
    plhDlgMetaLrcBy:                        "Criador do LRC",
    lblDlgMetaOffsetMs:                     "Desvio global (ms)",
    tipDlgMetaAutoFill:                     "Preencher metadados das tags do áudio",
    btnDlgMetaAutoFill:                     "Preenchimento auto.",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Bloco de notas",
    tipNotepadShow:                         "Mostrar bloco de notas",
    tipNotepadHide:                         "Ocultar bloco de notas",
    plhNotepad:                             "Cole ou escreva as letras não sincronizadas aqui…",
    btnNotepadSetLyrics:                    "Definir letra",
    tipNotepadSetLyrics:                    "Definir a lista de letras a partir do bloco de notas",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Novo arquivo",
    lblSyncLines:                           "linhas",
    empSyncNoLrc:                           "Sincronize linhas com a música.",
    lblSyncStartOfMusic:                    "Início da música",
    tipSyncEarlier:                         "Mover −50ms (D)",
    tipSyncLater:                           "Mover +50ms (F)",
    lblSyncEndOfLyrics:                     "Fim da letra",
    lblSyncEndOfMusic:                      "Fim da música",

  },

  pt_PT: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancelar",
    btnGlbYes:                              "Sim",
    btnGlbNo:                               "Não",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Transferir",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Solte um ficheiro de áudio ou LRC aqui",
    cfmAppUnsavedTitle:                     "Alterações não guardadas",
    cfmAppUnsavedMsg:                       "Guardar antes de continuar?",
    tstAppSaved:                            "Ficheiro guardado.",
    tstAppAutoLrcLoaded:                    "Ficheiro de letras carregado automaticamente.",
    tstAppFileError:                        "Erro ao abrir ficheiro.",
    tstAppSaveError:                        "Erro ao guardar ficheiro.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Abrir ficheiro de música",
    ttlOsdOpenLyrics:                       "Abrir ficheiro de letras",
    ttlOsdSaveLrcAs:                        "Guardar ficheiro LRC",
    ttlOsdSaveTxt:                          "Guardar ficheiro de texto",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novo ficheiro LRC",
    tipHdrOpenMusic:                        "Abrir ficheiro de áudio",
    tipHdrOpenLyrics:                       "Abrir ficheiro de letras (.lrc com marcas de tempo ou .txt para letras simples)",
    tipHdrSaveLrc:                          "Guardar ficheiro LRC",
    tipHdrSaveLrcAs:                        "Guardar como novo .lrc",
    tipHdrMeta:                             "Editar metadados da música",
    btnHdrMeta:                             "Metadados",
    tipHdrSaveTxt:                          "Exportar lista para .txt",
    tipHdrSettings:                         "Abrir definições",
    tipHdrHelp:                             "Ajuda",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Marcar a linha atual com o tempo do reprodutor e avançar (Enter)",
    btnFtrSyncTime:                         "Sincronizar",
    lblFtrReactionDelay:                    "Atraso de reação",
    tipFtrPlayPause:                        "Reproduzir / Pausar (Espaço)",
    tipFtrStop:                             "Parar (Esc)",
    tipFtrVerify:                           "Verificar - toca e avança automaticamente após o Atraso de verificação",
    lblFtrVerificationDelay:                "Atraso de verificação",
    tipFtrPrevStamp:                        "Marca de tempo anterior",
    tipFtrNextStamp:                        "Próxima marca de tempo",
    lblFtrSeekDelay:                        "Tempo de salto",
    tipFtrSeekBack:                         "Recuar os segundos configurados (←)",
    tipFtrSeekNext:                         "Avançar os segundos configurados (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Definições",
    tabDlgSettingsDisplay:                  "Visualização",
    tabDlgSettingsTime:                     "Tempo",
    tabDlgSettingsMeta:                     "Metadados",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Atraso de edição",
    lblDlgSettingsTimeReactionDelay:        "Atraso de reação",
    lblDlgSettingsTimeVerificationDelay:    "Atraso de verificação",
    lblDlgSettingsTimeSeekDelay:            "Tempo de salto",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artista",
    plhDlgSettingsMetaArtist:               "Nome do artista",
    lblDlgSettingsMetaSongwriter:           "Compositor",
    plhDlgSettingsMetaSongwriter:           "Letrista / compositor",
    lblDlgSettingsMetaLrcBy:                "LRC por",
    plhDlgSettingsMetaLrcBy:                "Criador do LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "crie ficheiros de letras sincronizadas.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadados",
    lblDlgMetaArtist:                       "Artista",
    plhDlgMetaArtist:                       "Nome do artista",
    lblDlgMetaAlbum:                        "Álbum",
    plhDlgMetaAlbum:                        "Nome do álbum",
    lblDlgMetaTitle:                        "Título",
    plhDlgMetaTitle:                        "Título da música",
    lblDlgMetaSongwriter:                   "Compositor",
    plhDlgMetaSongwriter:                   "Letrista / compositor",
    lblDlgMetaLrcBy:                        "LRC por",
    plhDlgMetaLrcBy:                        "Criador do LRC",
    lblDlgMetaOffsetMs:                     "Desvio global (ms)",
    tipDlgMetaAutoFill:                     "Preencher metadados das tags do áudio",
    btnDlgMetaAutoFill:                     "Preenchimento auto.",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Bloco de notas",
    tipNotepadShow:                         "Mostrar bloco de notas",
    tipNotepadHide:                         "Ocultar bloco de notas",
    plhNotepad:                             "Cole ou escreva as letras não sincronizadas aqui…",
    btnNotepadSetLyrics:                    "Definir letra",
    tipNotepadSetLyrics:                    "Definir a lista de letras a partir do bloco de notas",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Novo ficheiro",
    lblSyncLines:                           "linhas",
    empSyncNoLrc:                           "Sincronize linhas com a música.",
    lblSyncStartOfMusic:                    "Início da música",
    tipSyncEarlier:                         "Mover −50ms (D)",
    tipSyncLater:                           "Mover +50ms (F)",
    lblSyncEndOfLyrics:                     "Fim da letra",
    lblSyncEndOfMusic:                      "Fim da música",

  },

  it: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Annulla",
    btnGlbYes:                              "Sì",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nuova versione disponibile:",
    lnkUpdateWhatsNew:                      "Novità",
    btnUpdateDownload:                      "Scarica",
    lnkUpdateSkip:                          "Salta questa versione",
    tipUpdateDismiss:                       "Ignora",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Trascina qui un file audio o LRC",
    cfmAppUnsavedTitle:                     "Modifiche non salvate",
    cfmAppUnsavedMsg:                       "Salvare prima di continuare?",
    tstAppSaved:                            "File salvato.",
    tstAppAutoLrcLoaded:                    "File testo caricato automaticamente.",
    tstAppFileError:                        "Impossibile aprire il file.",
    tstAppSaveError:                        "Impossibile salvare il file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Apri file musicale",
    ttlOsdOpenLyrics:                       "Apri file testi",
    ttlOsdSaveLrcAs:                        "Salva file LRC",
    ttlOsdSaveTxt:                          "Salva file di testo",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nuovo file LRC",
    tipHdrOpenMusic:                        "Apri file audio",
    tipHdrOpenLyrics:                       "Apri file testi (.lrc con timestamp o .txt per testi semplici)",
    tipHdrSaveLrc:                          "Salva file LRC",
    tipHdrSaveLrcAs:                        "Salva come nuovo file .lrc",
    tipHdrMeta:                             "Modifica metadati del brano",
    btnHdrMeta:                             "Metadati",
    tipHdrSaveTxt:                          "Esporta lista come .txt",
    tipHdrSettings:                         "Apri impostazioni",
    tipHdrHelp:                             "Aiuto",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Registra la riga corrente con il tempo del player e avanza (Invio)",
    btnFtrSyncTime:                         "Sincronizza",
    lblFtrReactionDelay:                    "Ritardo di reazione",
    tipFtrPlayPause:                        "Riproduci / Pausa (Spazio)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verifica - riproduce e avanza automaticamente dopo il Ritardo di verifica",
    lblFtrVerificationDelay:                "Ritardo di verifica",
    tipFtrPrevStamp:                        "Indicatore precedente",
    tipFtrNextStamp:                        "Indicatore successivo",
    lblFtrSeekDelay:                        "Intervallo di ricerca",
    tipFtrSeekBack:                         "Indietro i secondi configurati (←)",
    tipFtrSeekNext:                         "Avanzare i secondi configurati (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Impostazioni",
    tabDlgSettingsDisplay:                  "Visualizzazione",
    tabDlgSettingsTime:                     "Tempi",
    tabDlgSettingsMeta:                     "Metadati",
    tabDlgSettingsAbout:                    "Informazioni",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lingua",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Scuro",
    btnDlgSettingsDisplayThemeLight:        "Chiaro",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Ritardo modifica",
    lblDlgSettingsTimeReactionDelay:        "Ritardo di reazione",
    lblDlgSettingsTimeVerificationDelay:    "Ritardo di verifica",
    lblDlgSettingsTimeSeekDelay:            "Intervallo di ricerca",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artista",
    plhDlgSettingsMetaArtist:               "Nome artista",
    lblDlgSettingsMetaSongwriter:           "Autore",
    plhDlgSettingsMetaSongwriter:           "Paroliere / compositore",
    lblDlgSettingsMetaLrcBy:                "LRC di",
    plhDlgSettingsMetaLrcBy:                "Creatore LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "crea file di testi sincronizzati.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadati",
    lblDlgMetaArtist:                       "Artista",
    plhDlgMetaArtist:                       "Nome artista",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Nome album",
    lblDlgMetaTitle:                        "Titolo",
    plhDlgMetaTitle:                        "Titolo canzone",
    lblDlgMetaSongwriter:                   "Autore",
    plhDlgMetaSongwriter:                   "Paroliere / compositore",
    lblDlgMetaLrcBy:                        "LRC di",
    plhDlgMetaLrcBy:                        "Creatore LRC",
    lblDlgMetaOffsetMs:                     "Offset globale (ms)",
    tipDlgMetaAutoFill:                     "Compila metadati dai tag audio",
    btnDlgMetaAutoFill:                     "Auto-compilazione",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Blocco note",
    tipNotepadShow:                         "Mostra blocco note",
    tipNotepadHide:                         "Nascondi blocco note",
    plhNotepad:                             "Incolla o scrivi i testi non sincronizzati qui…",
    btnNotepadSetLyrics:                    "Imposta testo",
    tipNotepadSetLyrics:                    "Imposta la lista dei testi dal blocco note",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nuovo file",
    lblSyncLines:                           "righe",
    empSyncNoLrc:                           "Sincronizza righe con la musica.",
    lblSyncStartOfMusic:                    "Inizio della musica",
    tipSyncEarlier:                         "Sposta −50ms (D)",
    tipSyncLater:                           "Sposta +50ms (F)",
    lblSyncEndOfLyrics:                     "Fine del testo",
    lblSyncEndOfMusic:                      "Fine della musica",

  },

  ja: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "キャンセル",
    btnGlbYes:                              "はい",
    btnGlbNo:                               "いいえ",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新しいバージョンが利用可能です:",
    lnkUpdateWhatsNew:                      "新機能",
    btnUpdateDownload:                      "ダウンロード",
    lnkUpdateSkip:                          "このバージョンをスキップ",
    tipUpdateDismiss:                       "閉じる",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "音声またはLRCファイルをここにドロップ",
    cfmAppUnsavedTitle:                     "未保存の変更",
    cfmAppUnsavedMsg:                       "続行する前に保存しますか？",
    tstAppSaved:                            "ファイルを保存しました。",
    tstAppAutoLrcLoaded:                    "歌詞ファイルを自動的に読み込みました。",
    tstAppFileError:                        "ファイルを開けませんでした。",
    tstAppSaveError:                        "ファイルを保存できませんでした。",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "音楽ファイルを開く",
    ttlOsdOpenLyrics:                       "歌詞ファイルを開く",
    ttlOsdSaveLrcAs:                        "LRCファイルを保存",
    ttlOsdSaveTxt:                          "テキストファイルを保存",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "新しいLRCファイル",
    tipHdrOpenMusic:                        "音楽ファイルを開く",
    tipHdrOpenLyrics:                       "歌詞ファイルを開く（タイムスタンプ付き.lrcまたは通常テキストの.txt）",
    tipHdrSaveLrc:                          "LRCファイルを保存",
    tipHdrSaveLrcAs:                        "新しい.lrcファイルとして保存",
    tipHdrMeta:                             "曲のメタデータを編集",
    btnHdrMeta:                             "メタデータ",
    tipHdrSaveTxt:                          "リストを.txtとしてエクスポート",
    tipHdrSettings:                         "設定を開く",
    tipHdrHelp:                             "ヘルプ",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "現在の行にプレーヤーの時刻を記録して次へ進む (Enter)",
    btnFtrSyncTime:                         "時刻同期",
    lblFtrReactionDelay:                    "反応ディレイ",
    tipFtrPlayPause:                        "再生 / 一時停止 (スペース)",
    tipFtrStop:                             "停止 (Esc)",
    tipFtrVerify:                           "確認再生 - 確認ディレイ後に次の行へ自動移動",
    lblFtrVerificationDelay:                "確認ディレイ",
    tipFtrPrevStamp:                        "前のタイムスタンプ",
    tipFtrNextStamp:                        "次のタイムスタンプ",
    lblFtrSeekDelay:                        "シーク時間",
    tipFtrSeekBack:                         "設定秒数戻る (←)",
    tipFtrSeekNext:                         "設定した秒数進む (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "表示",
    tabDlgSettingsTime:                     "タイミング",
    tabDlgSettingsMeta:                     "メタデータ",
    tabDlgSettingsAbout:                    "概要",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "言語",
    lblDlgSettingsDisplayTheme:             "テーマ",
    btnDlgSettingsDisplayThemeDark:         "ダーク",
    btnDlgSettingsDisplayThemeLight:        "ライト",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "編集ディレイ",
    lblDlgSettingsTimeReactionDelay:        "反応ディレイ",
    lblDlgSettingsTimeVerificationDelay:    "確認ディレイ",
    lblDlgSettingsTimeSeekDelay:            "シーク時間",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "アーティスト",
    plhDlgSettingsMetaArtist:               "アーティスト名",
    lblDlgSettingsMetaSongwriter:           "作詞家",
    plhDlgSettingsMetaSongwriter:           "作詞家 / 作曲家",
    lblDlgSettingsMetaLrcBy:                "LRC作成者",
    plhDlgSettingsMetaLrcBy:                "LRC作成者",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "同期歌詞ファイルを作成します。",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "メタデータ",
    lblDlgMetaArtist:                       "アーティスト",
    plhDlgMetaArtist:                       "アーティスト名",
    lblDlgMetaAlbum:                        "アルバム",
    plhDlgMetaAlbum:                        "アルバム名",
    lblDlgMetaTitle:                        "タイトル",
    plhDlgMetaTitle:                        "曲のタイトル",
    lblDlgMetaSongwriter:                   "作詞家",
    plhDlgMetaSongwriter:                   "作詞家 / 作曲家",
    lblDlgMetaLrcBy:                        "LRC作成者",
    plhDlgMetaLrcBy:                        "LRC作成者",
    lblDlgMetaOffsetMs:                     "グローバルオフセット (ms)",
    tipDlgMetaAutoFill:                     "音楽ファイルのタグからメタデータを入力",
    btnDlgMetaAutoFill:                     "自動入力",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "メモ帳",
    tipNotepadShow:                         "メモ帳を表示",
    tipNotepadHide:                         "メモ帳を非表示",
    plhNotepad:                             "未同期の歌詞をここに貼り付けるか入力してください…",
    btnNotepadSetLyrics:                    "歌詞を設定",
    tipNotepadSetLyrics:                    "メモ帳の行から歌詞リストを設定する",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "新しいファイル",
    lblSyncLines:                           "行",
    empSyncNoLrc:                           "音楽に合わせて行を同期してください。",
    lblSyncStartOfMusic:                    "音楽の開始",
    tipSyncEarlier:                         "行を−50msシフト (D)",
    tipSyncLater:                           "行を+50msシフト (F)",
    lblSyncEndOfLyrics:                     "歌詞の終わり",
    lblSyncEndOfMusic:                      "音楽の終わり",

  },

  ko: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "취소",
    btnGlbYes:                              "예",
    btnGlbNo:                               "아니요",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "새 버전 사용 가능:",
    lnkUpdateWhatsNew:                      "새로운 기능",
    btnUpdateDownload:                      "다운로드",
    lnkUpdateSkip:                          "이 버전 건너뛰기",
    tipUpdateDismiss:                       "닫기",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "오디오 또는 LRC 파일을 여기에 놓으세요",
    cfmAppUnsavedTitle:                     "저장되지 않은 변경 사항",
    cfmAppUnsavedMsg:                       "계속하기 전에 저장하시겠습니까?",
    tstAppSaved:                            "파일이 저장되었습니다.",
    tstAppAutoLrcLoaded:                    "가사 파일이 자동으로 로드되었습니다.",
    tstAppFileError:                        "파일을 열 수 없습니다.",
    tstAppSaveError:                        "파일을 저장할 수 없습니다.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "음악 파일 열기",
    ttlOsdOpenLyrics:                       "가사 파일 열기",
    ttlOsdSaveLrcAs:                        "LRC 파일 저장",
    ttlOsdSaveTxt:                          "텍스트 파일 저장",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "새 LRC 파일",
    tipHdrOpenMusic:                        "음악 파일 열기",
    tipHdrOpenLyrics:                       "가사 파일 열기 (타임스탬프가 있는 .lrc 또는 일반 텍스트 .txt)",
    tipHdrSaveLrc:                          "LRC 파일 저장",
    tipHdrSaveLrcAs:                        "새 .lrc 파일로 저장",
    tipHdrMeta:                             "곡 메타데이터 편집",
    btnHdrMeta:                             "메타데이터",
    tipHdrSaveTxt:                          "목록을 .txt로 내보내기",
    tipHdrSettings:                         "설정 열기",
    tipHdrHelp:                             "도움말",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "현재 줄에 플레이어 시간을 기록하고 다음으로 이동 (Enter)",
    btnFtrSyncTime:                         "시간 동기화",
    lblFtrReactionDelay:                    "반응 딜레이",
    tipFtrPlayPause:                        "재생 / 일시정지 (Space)",
    tipFtrStop:                             "정지 (Esc)",
    tipFtrVerify:                           "확인 - 확인 지연 후 자동으로 다음 행으로 이동",
    lblFtrVerificationDelay:                "확인 지연",
    tipFtrPrevStamp:                        "이전 타임스탬프",
    tipFtrNextStamp:                        "다음 타임스탬프",
    lblFtrSeekDelay:                        "이동 시간",
    tipFtrSeekBack:                         "설정 초만큼 뒤로 (←)",
    tipFtrSeekNext:                         "설정된 초만큼 앞으로 이동 (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "설정",
    tabDlgSettingsDisplay:                  "표시",
    tabDlgSettingsTime:                     "시간",
    tabDlgSettingsMeta:                     "메타데이터",
    tabDlgSettingsAbout:                    "정보",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "언어",
    lblDlgSettingsDisplayTheme:             "테마",
    btnDlgSettingsDisplayThemeDark:         "어둡게",
    btnDlgSettingsDisplayThemeLight:        "밝게",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "편집 딜레이",
    lblDlgSettingsTimeReactionDelay:        "반응 딜레이",
    lblDlgSettingsTimeVerificationDelay:    "확인 지연",
    lblDlgSettingsTimeSeekDelay:            "이동 시간",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "아티스트",
    plhDlgSettingsMetaArtist:               "아티스트 이름",
    lblDlgSettingsMetaSongwriter:           "작곡가",
    plhDlgSettingsMetaSongwriter:           "작사가 / 작곡가",
    lblDlgSettingsMetaLrcBy:                "LRC 작성자",
    plhDlgSettingsMetaLrcBy:                "LRC 작성자",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "동기화된 가사 파일을 만듭니다.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "메타데이터",
    lblDlgMetaArtist:                       "아티스트",
    plhDlgMetaArtist:                       "아티스트 이름",
    lblDlgMetaAlbum:                        "앨범",
    plhDlgMetaAlbum:                        "앨범 이름",
    lblDlgMetaTitle:                        "제목",
    plhDlgMetaTitle:                        "곡 제목",
    lblDlgMetaSongwriter:                   "작곡가",
    plhDlgMetaSongwriter:                   "작사가 / 작곡가",
    lblDlgMetaLrcBy:                        "LRC 작성자",
    plhDlgMetaLrcBy:                        "LRC 작성자",
    lblDlgMetaOffsetMs:                     "전역 오프셋 (ms)",
    tipDlgMetaAutoFill:                     "음악 파일 태그에서 메타데이터 채우기",
    btnDlgMetaAutoFill:                     "자동 입력",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "메모장",
    tipNotepadShow:                         "메모장 표시",
    tipNotepadHide:                         "메모장 숨기기",
    plhNotepad:                             "비동기 가사를 여기에 붙여넣거나 입력하세요…",
    btnNotepadSetLyrics:                    "가사 설정",
    tipNotepadSetLyrics:                    "메모장 줄로 가사 목록 설정",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "새 파일",
    lblSyncLines:                           "줄",
    empSyncNoLrc:                           "음악에 맞춰 줄을 동기화하세요.",
    lblSyncStartOfMusic:                    "음악 시작",
    tipSyncEarlier:                         "줄 −50ms 이동 (D)",
    tipSyncLater:                           "줄 +50ms 이동 (F)",
    lblSyncEndOfLyrics:                     "가사 끝",
    lblSyncEndOfMusic:                      "음악 끝",

  },

  zh_CN: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "取消",
    btnGlbYes:                              "是",
    btnGlbNo:                               "否",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下载",
    lnkUpdateSkip:                          "跳过此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "将音频或LRC文件拖放到此处",
    cfmAppUnsavedTitle:                     "未保存的更改",
    cfmAppUnsavedMsg:                       "继续之前是否保存？",
    tstAppSaved:                            "文件已保存。",
    tstAppAutoLrcLoaded:                    "歌词文件已自动加载。",
    tstAppFileError:                        "无法打开文件。",
    tstAppSaveError:                        "无法保存文件。",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "打开音乐文件",
    ttlOsdOpenLyrics:                       "打开歌词文件",
    ttlOsdSaveLrcAs:                        "保存 LRC 文件",
    ttlOsdSaveTxt:                          "保存文本文件",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "新建LRC文件",
    tipHdrOpenMusic:                        "打开音乐文件",
    tipHdrOpenLyrics:                       "打开歌词文件（带时间戳的.lrc或纯文本.txt）",
    tipHdrSaveLrc:                          "保存LRC文件",
    tipHdrSaveLrcAs:                        "另存为新.lrc文件",
    tipHdrMeta:                             "编辑歌曲元数据",
    btnHdrMeta:                             "元数据",
    tipHdrSaveTxt:                          "导出列表为.txt",
    tipHdrSettings:                         "打开设置",
    tipHdrHelp:                             "帮助",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "记录当前行时间并前进（Enter）",
    btnFtrSyncTime:                         "同步时间",
    lblFtrReactionDelay:                    "反应延迟",
    tipFtrPlayPause:                        "播放/暂停（空格）",
    tipFtrStop:                             "停止（Esc）",
    tipFtrVerify:                           "验证播放 - 经过验证延迟后自动前进到下一行",
    lblFtrVerificationDelay:                "验证延迟",
    tipFtrPrevStamp:                        "上一个时间戳",
    tipFtrNextStamp:                        "下一个时间戳",
    lblFtrSeekDelay:                        "跳转时间",
    tipFtrSeekBack:                         "后退配置秒数（←）",
    tipFtrSeekNext:                         "按设定秒数快进 (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "设置",
    tabDlgSettingsDisplay:                  "显示",
    tabDlgSettingsTime:                     "时间",
    tabDlgSettingsMeta:                     "元数据",
    tabDlgSettingsAbout:                    "关于",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "语言",
    lblDlgSettingsDisplayTheme:             "主题",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "浅色",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "编辑延迟",
    lblDlgSettingsTimeReactionDelay:        "反应延迟",
    lblDlgSettingsTimeVerificationDelay:    "验证延迟",
    lblDlgSettingsTimeSeekDelay:            "跳转时间",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "艺术家",
    plhDlgSettingsMetaArtist:               "艺术家名称",
    lblDlgSettingsMetaSongwriter:           "词曲作者",
    plhDlgSettingsMetaSongwriter:           "词作者/曲作者",
    lblDlgSettingsMetaLrcBy:                "LRC制作",
    plhDlgSettingsMetaLrcBy:                "LRC创建者",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "创建同步歌词文件。",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "元数据",
    lblDlgMetaArtist:                       "艺术家",
    plhDlgMetaArtist:                       "艺术家名称",
    lblDlgMetaAlbum:                        "专辑",
    plhDlgMetaAlbum:                        "专辑名称",
    lblDlgMetaTitle:                        "标题",
    plhDlgMetaTitle:                        "歌曲标题",
    lblDlgMetaSongwriter:                   "词曲作者",
    plhDlgMetaSongwriter:                   "词作者/曲作者",
    lblDlgMetaLrcBy:                        "LRC制作",
    plhDlgMetaLrcBy:                        "LRC创建者",
    lblDlgMetaOffsetMs:                     "全局偏移（ms）",
    tipDlgMetaAutoFill:                     "从音乐文件标签填充元数据",
    btnDlgMetaAutoFill:                     "自动填充",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "记事本",
    tipNotepadShow:                         "显示记事本",
    tipNotepadHide:                         "隐藏记事本",
    plhNotepad:                             "在此粘贴或输入未同步的歌词…",
    btnNotepadSetLyrics:                    "设置歌词",
    tipNotepadSetLyrics:                    "从记事本设置歌词列表",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "新文件",
    lblSyncLines:                           "行",
    empSyncNoLrc:                           "请与音乐同步行以构建LRC文件。",
    lblSyncStartOfMusic:                    "音乐开始",
    tipSyncEarlier:                         "行偏移−50ms（D）",
    tipSyncLater:                           "行偏移+50ms（F）",
    lblSyncEndOfLyrics:                     "歌词结束",
    lblSyncEndOfMusic:                      "音乐结束",

  },

  zh_TW: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "取消",
    btnGlbYes:                              "是",
    btnGlbNo:                               "否",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "有新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下載",
    lnkUpdateSkip:                          "跳過此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "將音訊或LRC檔案拖放到此處",
    cfmAppUnsavedTitle:                     "未儲存的變更",
    cfmAppUnsavedMsg:                       "繼續之前是否儲存？",
    tstAppSaved:                            "檔案已儲存。",
    tstAppAutoLrcLoaded:                    "歌詞檔案已自動載入。",
    tstAppFileError:                        "無法開啟檔案。",
    tstAppSaveError:                        "無法儲存檔案。",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "開啟音樂檔案",
    ttlOsdOpenLyrics:                       "開啟歌詞檔案",
    ttlOsdSaveLrcAs:                        "儲存 LRC 檔案",
    ttlOsdSaveTxt:                          "儲存文字檔案",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "新增 LRC 檔案",
    tipHdrOpenMusic:                        "開啟音樂檔案",
    tipHdrOpenLyrics:                       "開啟歌詞檔案（含時間戳記的 .lrc 或純文字 .txt）",
    tipHdrSaveLrc:                          "儲存 LRC 檔案",
    tipHdrSaveLrcAs:                        "另存為新 .lrc 檔案",
    tipHdrMeta:                             "編輯歌曲中繼資料",
    btnHdrMeta:                             "中繼資料",
    tipHdrSaveTxt:                          "匯出清單為 .txt",
    tipHdrSettings:                         "開啟設定",
    tipHdrHelp:                             "說明",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "記錄目前行時間並前進（Enter）",
    btnFtrSyncTime:                         "同步時間",
    lblFtrReactionDelay:                    "反應延遲",
    tipFtrPlayPause:                        "播放/暫停（空白鍵）",
    tipFtrStop:                             "停止（Esc）",
    tipFtrVerify:                           "驗證播放 - 經過驗證延遲後自動前進到下一行",
    lblFtrVerificationDelay:                "驗證延遲",
    tipFtrPrevStamp:                        "上一個時間戳記",
    tipFtrNextStamp:                        "下一個時間戳記",
    lblFtrSeekDelay:                        "跳轉時間",
    tipFtrSeekBack:                         "倒退設定秒數（←）",
    tipFtrSeekNext:                         "按設定秒數快轉 (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "顯示",
    tabDlgSettingsTime:                     "時間",
    tabDlgSettingsMeta:                     "詮釋資料",
    tabDlgSettingsAbout:                    "關於",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "語言",
    lblDlgSettingsDisplayTheme:             "主題",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "淺色",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "編輯延遲",
    lblDlgSettingsTimeReactionDelay:        "反應延遲",
    lblDlgSettingsTimeVerificationDelay:    "驗證延遲",
    lblDlgSettingsTimeSeekDelay:            "跳轉時間",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "藝術家",
    plhDlgSettingsMetaArtist:               "藝術家名稱",
    lblDlgSettingsMetaSongwriter:           "詞曲作者",
    plhDlgSettingsMetaSongwriter:           "詞作者/曲作者",
    lblDlgSettingsMetaLrcBy:                "LRC製作",
    plhDlgSettingsMetaLrcBy:                "LRC建立者",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "建立同步歌詞檔案。",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "詮釋資料",
    lblDlgMetaArtist:                       "藝術家",
    plhDlgMetaArtist:                       "藝術家名稱",
    lblDlgMetaAlbum:                        "專輯",
    plhDlgMetaAlbum:                        "專輯名稱",
    lblDlgMetaTitle:                        "標題",
    plhDlgMetaTitle:                        "歌曲標題",
    lblDlgMetaSongwriter:                   "詞曲作者",
    plhDlgMetaSongwriter:                   "詞作者/曲作者",
    lblDlgMetaLrcBy:                        "LRC製作",
    plhDlgMetaLrcBy:                        "LRC建立者",
    lblDlgMetaOffsetMs:                     "全域偏移（ms）",
    tipDlgMetaAutoFill:                     "從音樂檔案標籤填入詮釋資料",
    btnDlgMetaAutoFill:                     "自動填入",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "記事本",
    tipNotepadShow:                         "顯示記事本",
    tipNotepadHide:                         "隱藏記事本",
    plhNotepad:                             "在此貼上或輸入未同步的歌詞…",
    btnNotepadSetLyrics:                    "設定歌詞",
    tipNotepadSetLyrics:                    "從記事本設定歌詞列表",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "新檔案",
    lblSyncLines:                           "行",
    empSyncNoLrc:                           "請與音樂同步行以建構LRC檔案。",
    lblSyncStartOfMusic:                    "音樂開始",
    tipSyncEarlier:                         "行偏移−50ms（D）",
    tipSyncLater:                           "行偏移+50ms（F）",
    lblSyncEndOfLyrics:                     "歌詞結束",
    lblSyncEndOfMusic:                      "音樂結束",

  },

  ar: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "إصدار جديد متوفر:",
    lnkUpdateWhatsNew:                      "ما الجديد",
    btnUpdateDownload:                      "تنزيل",
    lnkUpdateSkip:                          "تخطي هذا الإصدار",
    tipUpdateDismiss:                       "تجاهل",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "فتح ملف موسيقي",
    ttlOsdOpenLyrics:                       "فتح ملف كلمات الأغنية",
    ttlOsdSaveLrcAs:                        "حفظ ملف LRC",
    ttlOsdSaveTxt:                          "حفظ ملف نصي",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "مساعدة",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "التحقق - يشغّل وينتقل تلقائياً إلى السطر التالي بعد تأخير التحقق",
    lblFtrVerificationDelay:                "تأخير التحقق",
    tipFtrPrevStamp:                        "الطابع الزمني السابق",
    tipFtrNextStamp:                        "الطابع الزمني التالي",
    lblFtrSeekDelay:                        "تأخير البحث",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "التقديم بالثواني المحددة (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "تأخير التحقق",
    lblDlgSettingsTimeSeekDelay:            "تأخير البحث",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "إظهار المفكرة",
    tipNotepadHide:                         "إخفاء المفكرة",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "ملف جديد",
    lblSyncLines:                           "سطور",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  ca: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versió disponible:",
    lnkUpdateWhatsNew:                      "Novetats",
    btnUpdateDownload:                      "Baixa",
    lnkUpdateSkip:                          "Omet aquesta versió",
    tipUpdateDismiss:                       "Descarta",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Obre un fitxer de música",
    ttlOsdOpenLyrics:                       "Obre un fitxer de lletres",
    ttlOsdSaveLrcAs:                        "Desa el fitxer LRC",
    ttlOsdSaveTxt:                          "Desa el fitxer de text",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Ajuda",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verificar - reprodueix i avança automàticament après el Retard de verificació",
    lblFtrVerificationDelay:                "Retard de verificació",
    tipFtrPrevStamp:                        "Marca de temps anterior",
    tipFtrNextStamp:                        "Marca de temps següent",
    lblFtrSeekDelay:                        "Retard de salt",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Avançar els segons configurats (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Retard de verificació",
    lblDlgSettingsTimeSeekDelay:            "Retard de salt",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Mostra el bloc de notes",
    tipNotepadHide:                         "Amaga el bloc de notes",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nou fitxer",
    lblSyncLines:                           "línies",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  cs: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nová verze je k dispozici:",
    lnkUpdateWhatsNew:                      "Co je nového",
    btnUpdateDownload:                      "Stáhnout",
    lnkUpdateSkip:                          "Přeskočit tuto verzi",
    tipUpdateDismiss:                       "Zavřít",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Otevřít hudební soubor",
    ttlOsdOpenLyrics:                       "Otevřít soubor s textem",
    ttlOsdSaveLrcAs:                        "Uložit soubor LRC",
    ttlOsdSaveTxt:                          "Uložit textový soubor",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Nápověda",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Ověřit - přehraje a automaticky přejde na další řádek po Prodlevě ověření",
    lblFtrVerificationDelay:                "Prodleva ověření",
    tipFtrPrevStamp:                        "Předchozí časová značka",
    tipFtrNextStamp:                        "Další časová značka",
    lblFtrSeekDelay:                        "Zpoždění skoku",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Posunout vpřed o nastavené sekundy (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Prodleva ověření",
    lblDlgSettingsTimeSeekDelay:            "Zpoždění skoku",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Zobrazit poznámkový blok",
    tipNotepadHide:                         "Skrýt poznámkový blok",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nový soubor",
    lblSyncLines:                           "řádků",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  da: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tilgængelig:",
    lnkUpdateWhatsNew:                      "Hvad er nyt",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Spring denne version over",
    tipUpdateDismiss:                       "Afvis",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Åbn musikfil",
    ttlOsdOpenLyrics:                       "Åbn lyrikfil",
    ttlOsdSaveLrcAs:                        "Gem LRC-fil",
    ttlOsdSaveTxt:                          "Gem tekstfil",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Hjælp",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verificer - afspiller og rykker automatisk til næste linje efter Verifikationsforsinkelsen",
    lblFtrVerificationDelay:                "Verifikationsforsinkelse",
    tipFtrPrevStamp:                        "Forrige tidsstempel",
    tipFtrNextStamp:                        "Næste tidsstempel",
    lblFtrSeekDelay:                        "Hopsekunder",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Gå fremad de konfigurerede sekunder (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Verifikationsforsinkelse",
    lblDlgSettingsTimeSeekDelay:            "Hopsekunder",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Vis noteblok",
    tipNotepadHide:                         "Skjul noteblok",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Ny fil",
    lblSyncLines:                           "linjer",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  nl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nieuwe versie beschikbaar:",
    lnkUpdateWhatsNew:                      "Wat is nieuw",
    btnUpdateDownload:                      "Downloaden",
    lnkUpdateSkip:                          "Deze versie overslaan",
    tipUpdateDismiss:                       "Sluiten",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Muziekbestand openen",
    ttlOsdOpenLyrics:                       "Liedtekstbestand openen",
    ttlOsdSaveLrcAs:                        "LRC-bestand opslaan",
    ttlOsdSaveTxt:                          "Tekstbestand opslaan",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Hulp",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verifiëren - speelt af en gaat automatisch naar de volgende regel na de Verificatievertraging",
    lblFtrVerificationDelay:                "Verificatievertraging",
    tipFtrPrevStamp:                        "Vorig tijdstempel",
    tipFtrNextStamp:                        "Volgend tijdstempel",
    lblFtrSeekDelay:                        "Sprongtijd",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Ga het ingestelde aantal seconden vooruit (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Verificatievertraging",
    lblDlgSettingsTimeSeekDelay:            "Sprongtijd",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Notitieblok tonen",
    tipNotepadHide:                         "Notitieblok verbergen",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nieuw bestand",
    lblSyncLines:                           "regels",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  fi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Uusi versio saatavilla:",
    lnkUpdateWhatsNew:                      "Mitä uutta",
    btnUpdateDownload:                      "Lataa",
    lnkUpdateSkip:                          "Ohita tämä versio",
    tipUpdateDismiss:                       "Hylkää",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Avaa musiikkitiedosto",
    ttlOsdOpenLyrics:                       "Avaa lyriikatiedosto",
    ttlOsdSaveLrcAs:                        "Tallenna LRC-tiedosto",
    ttlOsdSaveTxt:                          "Tallenna tekstitiedosto",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Ohje",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Tarkista - toistaa ja siirtyy automaattisesti seuraavalle riville Tarkistusviiveen jälkeen",
    lblFtrVerificationDelay:                "Tarkistusviive",
    tipFtrPrevStamp:                        "Edellinen aikaleima",
    tipFtrNextStamp:                        "Seuraava aikaleima",
    lblFtrSeekDelay:                        "Hyppyaika",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Siirry määritetyt sekunnit eteenpäin (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Tarkistusviive",
    lblDlgSettingsTimeSeekDelay:            "Hyppyaika",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Näytä muistio",
    tipNotepadHide:                         "Piilota muistio",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Uusi tiedosto",
    lblSyncLines:                           "riviä",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  el: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Νέα έκδοση διαθέσιμη:",
    lnkUpdateWhatsNew:                      "Τι νέο υπάρχει",
    btnUpdateDownload:                      "Λήψη",
    lnkUpdateSkip:                          "Παράλειψη αυτής της έκδοσης",
    tipUpdateDismiss:                       "Απόρριψη",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Άνοιγμα αρχείου μουσικής",
    ttlOsdOpenLyrics:                       "Άνοιγμα αρχείου στίχων",
    ttlOsdSaveLrcAs:                        "Αποθήκευση αρχείου LRC",
    ttlOsdSaveTxt:                          "Αποθήκευση αρχείου κειμένου",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Βοήθεια",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Επαλήθευση - αναπαράγει και προχωρά αυτόματα μετά την Καθυστέρηση επαλήθευσης",
    lblFtrVerificationDelay:                "Καθυστέρηση επαλήθευσης",
    tipFtrPrevStamp:                        "Προηγούμενη χρονοσφραγίδα",
    tipFtrNextStamp:                        "Επόμενη χρονοσφραγίδα",
    lblFtrSeekDelay:                        "Χρόνος μετάβασης",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Μετάβαση μπροστά κατά τα ρυθμισμένα δευτερόλεπτα (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Καθυστέρηση επαλήθευσης",
    lblDlgSettingsTimeSeekDelay:            "Χρόνος μετάβασης",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Εμφάνιση σημειωματάριου",
    tipNotepadHide:                         "Απόκρυψη σημειωματάριου",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Νέο αρχείο",
    lblSyncLines:                           "γραμμές",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  he: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "גרסה חדשה זמינה:",
    lnkUpdateWhatsNew:                      "מה חדש",
    btnUpdateDownload:                      "הורדה",
    lnkUpdateSkip:                          "דלג על גרסה זו",
    tipUpdateDismiss:                       "בטל",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "פתח קובץ מוזיקה",
    ttlOsdOpenLyrics:                       "פתח קובץ מילים",
    ttlOsdSaveLrcAs:                        "שמור קובץ LRC",
    ttlOsdSaveTxt:                          "שמור קובץ טקסט",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "עזרה",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "אימות - מנגן ועובר אוטומטית לשורה הבאה אחרי עיכוב האימות",
    lblFtrVerificationDelay:                "עיכוב אימות",
    tipFtrPrevStamp:                        "חותמת זמן קודמת",
    tipFtrNextStamp:                        "חותמת זמן הבאה",
    lblFtrSeekDelay:                        "זמן קפיצה",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "קפוץ קדימה לפי שניות מוגדרות (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "עיכוב אימות",
    lblDlgSettingsTimeSeekDelay:            "זמן קפיצה",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "הצג פנקס רשימות",
    tipNotepadHide:                         "הסתר פנקס רשימות",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "קובץ חדש",
    lblSyncLines:                           "שורות",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  hr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova verzija dostupna:",
    lnkUpdateWhatsNew:                      "Što je novo",
    btnUpdateDownload:                      "Preuzmi",
    lnkUpdateSkip:                          "Preskoči ovu verziju",
    tipUpdateDismiss:                       "Odbaci",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Otvori glazbenu datoteku",
    ttlOsdOpenLyrics:                       "Otvori datoteku s tekstom",
    ttlOsdSaveLrcAs:                        "Spremi LRC datoteku",
    ttlOsdSaveTxt:                          "Spremi tekstualnu datoteku",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Pomoć",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Provjeri - reproducira i automatski prelazi na sljedeći redak nakon Kašnjenja provjere",
    lblFtrVerificationDelay:                "Kašnjenje provjere",
    tipFtrPrevStamp:                        "Prethodna vremenska oznaka",
    tipFtrNextStamp:                        "Sljedeća vremenska oznaka",
    lblFtrSeekDelay:                        "Trajanje skoka",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Preskočiti postavljene sekunde naprijed (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Kašnjenje provjere",
    lblDlgSettingsTimeSeekDelay:            "Trajanje skoka",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Prikaži blok za bilješke",
    tipNotepadHide:                         "Sakrij blok za bilješke",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nova datoteka",
    lblSyncLines:                           "redaka",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  nb: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny versjon tilgjengelig:",
    lnkUpdateWhatsNew:                      "Hva er nytt",
    btnUpdateDownload:                      "Last ned",
    lnkUpdateSkip:                          "Hopp over denne versjonen",
    tipUpdateDismiss:                       "Avvis",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Åpne musikkfil",
    ttlOsdOpenLyrics:                       "Åpne lyrikkfil",
    ttlOsdSaveLrcAs:                        "Lagre LRC-fil",
    ttlOsdSaveTxt:                          "Lagre tekstfil",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Hjelp",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verifiser - spiller og går automatisk til neste linje etter Verifiseringsforsinkelsen",
    lblFtrVerificationDelay:                "Verifiseringsforsinkelse",
    tipFtrPrevStamp:                        "Forrige tidsstempel",
    tipFtrNextStamp:                        "Neste tidsstempel",
    lblFtrSeekDelay:                        "Hopptid",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Gå fremover de konfigurerte sekundene (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Verifiseringsforsinkelse",
    lblDlgSettingsTimeSeekDelay:            "Hopptid",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Vis notatblokk",
    tipNotepadHide:                         "Skjul notatblokk",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Ny fil",
    lblSyncLines:                           "linjer",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  fa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نسخه جدید موجود است:",
    lnkUpdateWhatsNew:                      "چه خبر",
    btnUpdateDownload:                      "دانلود",
    lnkUpdateSkip:                          "رد کردن این نسخه",
    tipUpdateDismiss:                       "رد کردن",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "باز کردن فایل موسیقی",
    ttlOsdOpenLyrics:                       "باز کردن فایل ترانه",
    ttlOsdSaveLrcAs:                        "ذخیره فایل LRC",
    ttlOsdSaveTxt:                          "ذخیره فایل متنی",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "راهنما",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "تأیید - پخش می‌کند و پس از تاخیر تأیید به‌طور خودکار به خط بعدی می‌رود",
    lblFtrVerificationDelay:                "تاخیر تأیید",
    tipFtrPrevStamp:                        "مهر زمانی قبلی",
    tipFtrNextStamp:                        "مهر زمانی بعدی",
    lblFtrSeekDelay:                        "زمان جهش",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "رفتن به جلو به اندازه ثانیه‌های تنظیم‌شده (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "تاخیر تأیید",
    lblDlgSettingsTimeSeekDelay:            "زمان جهش",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "نمایش یادداشت‌ها",
    tipNotepadHide:                         "پنهان کردن یادداشت‌ها",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "فایل جدید",
    lblSyncLines:                           "خط",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  pl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Dostępna nowa wersja:",
    lnkUpdateWhatsNew:                      "Co nowego",
    btnUpdateDownload:                      "Pobierz",
    lnkUpdateSkip:                          "Pomiń tę wersję",
    tipUpdateDismiss:                       "Zamknij",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Otwórz plik muzyczny",
    ttlOsdOpenLyrics:                       "Otwórz plik z tekstem",
    ttlOsdSaveLrcAs:                        "Zapisz plik LRC",
    ttlOsdSaveTxt:                          "Zapisz plik tekstowy",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Pomoc",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Weryfikuj - odtwarza i automatycznie przechodzi do następnej linii po Opóźnieniu weryfikacji",
    lblFtrVerificationDelay:                "Opóźnienie weryfikacji",
    tipFtrPrevStamp:                        "Poprzedni znacznik czasu",
    tipFtrNextStamp:                        "Następny znacznik czasu",
    lblFtrSeekDelay:                        "Czas skoku",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Przewiń do przodu o ustawione sekundy (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Opóźnienie weryfikacji",
    lblDlgSettingsTimeSeekDelay:            "Czas skoku",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Pokaż notatnik",
    tipNotepadHide:                         "Ukryj notatnik",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nowy plik",
    lblSyncLines:                           "wierszy",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  ro: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versiune nouă disponibilă:",
    lnkUpdateWhatsNew:                      "Ce e nou",
    btnUpdateDownload:                      "Descarcă",
    lnkUpdateSkip:                          "Omite această versiune",
    tipUpdateDismiss:                       "Ignoră",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Deschide fișier muzical",
    ttlOsdOpenLyrics:                       "Deschide fișier versuri",
    ttlOsdSaveLrcAs:                        "Salvează fișier LRC",
    ttlOsdSaveTxt:                          "Salvează fișier text",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Ajutor",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verifică - redă și avansează automat la linia următoare după Întârzierea verificării",
    lblFtrVerificationDelay:                "Întârziere verificare",
    tipFtrPrevStamp:                        "Marcaj de timp anterior",
    tipFtrNextStamp:                        "Marcaj de timp următor",
    lblFtrSeekDelay:                        "Timp de salt",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Avansați cu secundele configurate (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Întârziere verificare",
    lblDlgSettingsTimeSeekDelay:            "Timp de salt",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Afișează notesul",
    tipNotepadHide:                         "Ascunde notesul",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Fișier nou",
    lblSyncLines:                           "rânduri",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  sv: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tillgänglig:",
    lnkUpdateWhatsNew:                      "Vad är nytt",
    btnUpdateDownload:                      "Ladda ner",
    lnkUpdateSkip:                          "Hoppa över den här versionen",
    tipUpdateDismiss:                       "Avfärda",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Öppna musikfil",
    ttlOsdOpenLyrics:                       "Öppna lyrikfil",
    ttlOsdSaveLrcAs:                        "Spara LRC-fil",
    ttlOsdSaveTxt:                          "Spara textfil",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Hjälp",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Verifiera - spelar och avancerar automatiskt till nästa rad efter Verifieringsfördröjningen",
    lblFtrVerificationDelay:                "Verifieringsfördröjning",
    tipFtrPrevStamp:                        "Föregående tidsstämpel",
    tipFtrNextStamp:                        "Nästa tidsstämpel",
    lblFtrSeekDelay:                        "Hopptid",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Gå framåt de konfigurerade sekunderna (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Verifieringsfördröjning",
    lblDlgSettingsTimeSeekDelay:            "Hopptid",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Visa anteckningsblock",
    tipNotepadHide:                         "Dölj anteckningsblock",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Ny fil",
    lblSyncLines:                           "rader",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  vi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Phiên bản mới có sẵn:",
    lnkUpdateWhatsNew:                      "Có gì mới",
    btnUpdateDownload:                      "Tải xuống",
    lnkUpdateSkip:                          "Bỏ qua phiên bản này",
    tipUpdateDismiss:                       "Bỏ qua",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Mở tệp nhạc",
    ttlOsdOpenLyrics:                       "Mở tệp lời bài hát",
    ttlOsdSaveLrcAs:                        "Lưu tệp LRC",
    ttlOsdSaveTxt:                          "Lưu tệp văn bản",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Trợ giúp",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Xác nhận - phát và tự động chuyển sang dòng tiếp theo sau Độ trễ xác nhận",
    lblFtrVerificationDelay:                "Độ trễ xác nhận",
    tipFtrPrevStamp:                        "Dấu thời gian trước",
    tipFtrNextStamp:                        "Dấu thời gian tiếp theo",
    lblFtrSeekDelay:                        "Thời gian từa",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Tua đi theo số giây đã cấu hình (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Độ trễ xác nhận",
    lblDlgSettingsTimeSeekDelay:            "Thời gian từa",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Hiện ghi chú",
    tipNotepadHide:                         "Ẩn ghi chú",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Tệp mới",
    lblSyncLines:                           "dòng",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  tr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yeni sürüm mevcut:",
    lnkUpdateWhatsNew:                      "Yenilikler",
    btnUpdateDownload:                      "İndir",
    lnkUpdateSkip:                          "Bu sürümü atla",
    tipUpdateDismiss:                       "Kapat",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Müzik Dosyası Aç",
    ttlOsdOpenLyrics:                       "Şarkı Sözü Dosyası Aç",
    ttlOsdSaveLrcAs:                        "LRC Dosyası Kaydet",
    ttlOsdSaveTxt:                          "Metin Dosyası Kaydet",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Yardım",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Doğrula - oynatır ve Doğrulama Gecikmesinden sonra otomatik olarak sonraki satıra geçer",
    lblFtrVerificationDelay:                "Doğrulama Gecikmesi",
    tipFtrPrevStamp:                        "Önceki zaman damgası",
    tipFtrNextStamp:                        "Sonraki zaman damgası",
    lblFtrSeekDelay:                        "Atlama süresi",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Ayarlanan saniye kadar ileri git (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Doğrulama Gecikmesi",
    lblDlgSettingsTimeSeekDelay:            "Atlama süresi",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Not defterini göster",
    tipNotepadHide:                         "Not defterini gizle",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Yeni dosya",
    lblSyncLines:                           "satır",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  id: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Batal",
    btnGlbYes:                              "Ya",
    btnGlbNo:                               "Tidak",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baru tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baru",
    btnUpdateDownload:                      "Unduh",
    lnkUpdateSkip:                          "Lewati versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Perubahan Belum Tersimpan",
    cfmAppUnsavedMsg:                       "Simpan file saat ini sebelum melanjutkan?",
    tstAppSaved:                            "File tersimpan.",
    tstAppAutoLrcLoaded:                    "File lirik dimuat secara otomatis.",
    tstAppFileError:                        "Gagal membuka file.",
    tstAppSaveError:                        "Gagal menyimpan file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Buka file musik",
    ttlOsdOpenLyrics:                       "Buka file lirik",
    ttlOsdSaveLrcAs:                        "Simpan file LRC",
    ttlOsdSaveTxt:                          "Simpan file teks",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "File LRC baru",
    tipHdrOpenMusic:                        "Buka file musik untuk sinkronisasi",
    tipHdrOpenLyrics:                       "Buka file lirik (.lrc dengan timestamp atau .txt untuk lirik biasa)",
    tipHdrSaveLrc:                          "Simpan file LRC",
    tipHdrSaveLrcAs:                        "Simpan sebagai file .lrc baru",
    tipHdrMeta:                             "Edit metadata lagu",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Ekspor daftar lirik ke file .txt",
    tipHdrSettings:                         "Buka pengaturan",
    tipHdrHelp:                             "Bantuan",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Tandai baris saat ini dengan waktu player dan lanjutkan (Enter)",
    btnFtrSyncTime:                         "Sinkron Waktu",
    lblFtrReactionDelay:                    "Penundaan Reaksi",
    tipFtrPlayPause:                        "Putar / Jeda (Space)",
    tipFtrStop:                             "Hentikan (Esc)",
    tipFtrVerify:                           "Verifikasi - memutar dan otomatis maju ke baris berikutnya setelah Penundaan Verifikasi",
    lblFtrVerificationDelay:                "Penundaan Verifikasi",
    tipFtrPrevStamp:                        "Cap waktu sebelumnya",
    tipFtrNextStamp:                        "Cap waktu berikutnya",
    lblFtrSeekDelay:                        "Waktu lompat",
    tipFtrSeekBack:                         "Putar mundur beberapa detik (←)",
    tipFtrSeekNext:                         "Maju sesuai detik yang dikonfigurasi (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Pengaturan",
    tabDlgSettingsDisplay:                  "Tampilan",
    tabDlgSettingsTime:                     "Waktu",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "Tentang",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Terang",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Penundaan Edit Baris",
    lblDlgSettingsTimeReactionDelay:        "Penundaan Reaksi",
    lblDlgSettingsTimeVerificationDelay:    "Penundaan Verifikasi",
    lblDlgSettingsTimeSeekDelay:            "Waktu lompat",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artis",
    plhDlgSettingsMetaArtist:               "Nama artis",
    lblDlgSettingsMetaSongwriter:           "Penulis Lagu",
    plhDlgSettingsMetaSongwriter:           "Penyair / penulis lagu",
    lblDlgSettingsMetaLrcBy:                "LRC Oleh",
    plhDlgSettingsMetaLrcBy:                "Pembuat LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "buat file lirik yang tersinkronisasi.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artis",
    plhDlgMetaArtist:                       "Nama artis",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Nama album",
    lblDlgMetaTitle:                        "Judul",
    plhDlgMetaTitle:                        "Judul lagu",
    lblDlgMetaSongwriter:                   "Penulis Lagu",
    plhDlgMetaSongwriter:                   "Penyair / penulis lagu",
    lblDlgMetaLrcBy:                        "LRC Oleh",
    plhDlgMetaLrcBy:                        "Pembuat LRC",
    lblDlgMetaOffsetMs:                     "Offset Global (ms)",
    tipDlgMetaAutoFill:                     "Isi metadata dari tag file musik",
    btnDlgMetaAutoFill:                     "Isi Otomatis",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Tampilkan notepad",
    tipNotepadHide:                         "Sembunyikan notepad",
    plhNotepad:                             "Tempel atau ketik lirik yang tidak tersinkronisasi di sini…",
    btnNotepadSetLyrics:                    "Salin ke Daftar Lirik",
    tipNotepadSetLyrics:                    "Ganti daftar lirik dengan baris dari notepad ini",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "File baru",
    lblSyncLines:                           "baris",
    empSyncNoLrc:                           "Sinkronkan baris dengan musik untuk membuat file LRC.",
    lblSyncStartOfMusic:                    "Awal Musik",
    tipSyncEarlier:                         "Geser baris yang dipilih −50ms (D)",
    tipSyncLater:                           "Geser baris yang dipilih +50ms (F)",
    lblSyncEndOfLyrics:                     "Akhir Lirik",
    lblSyncEndOfMusic:                      "Akhir Musik",

  },

  ms: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Batal",
    btnGlbYes:                              "Ya",
    btnGlbNo:                               "Tidak",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baharu tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baharu",
    btnUpdateDownload:                      "Muat turun",
    lnkUpdateSkip:                          "Langkau versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Perubahan Belum Disimpan",
    cfmAppUnsavedMsg:                       "Simpan fail semasa sebelum meneruskan?",
    tstAppSaved:                            "Fail disimpan.",
    tstAppAutoLrcLoaded:                    "Fail lirik dimuatkan secara automatik.",
    tstAppFileError:                        "Gagal membuka fail.",
    tstAppSaveError:                        "Gagal menyimpan fail.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Buka fail muzik",
    ttlOsdOpenLyrics:                       "Buka fail lirik",
    ttlOsdSaveLrcAs:                        "Simpan fail LRC",
    ttlOsdSaveTxt:                          "Simpan fail teks",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Fail LRC baharu",
    tipHdrOpenMusic:                        "Buka fail muzik untuk disegerakkan",
    tipHdrOpenLyrics:                       "Buka fail lirik (.lrc dengan cap masa atau .txt untuk lirik biasa)",
    tipHdrSaveLrc:                          "Simpan fail LRC",
    tipHdrSaveLrcAs:                        "Simpan sebagai fail .lrc baharu",
    tipHdrMeta:                             "Edit metadata lagu",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Eksport senarai lirik ke fail .txt",
    tipHdrSettings:                         "Buka tetapan",
    tipHdrHelp:                             "Bantuan",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Cap baris semasa dengan masa pemain dan teruskan (Enter)",
    btnFtrSyncTime:                         "Segerak Masa",
    lblFtrReactionDelay:                    "Kelewatan Reaksi",
    tipFtrPlayPause:                        "Main / Jeda (Space)",
    tipFtrStop:                             "Henti (Esc)",
    tipFtrVerify:                           "Sahkan - memainkan dan maju secara automatik ke baris seterusnya selepas Kelewatan Pengesahan",
    lblFtrVerificationDelay:                "Kelewatan Pengesahan",
    tipFtrPrevStamp:                        "Setem masa sebelumnya",
    tipFtrNextStamp:                        "Setem masa berikutnya",
    lblFtrSeekDelay:                        "Masa lompat",
    tipFtrSeekBack:                         "Undur balik beberapa saat (←)",
    tipFtrSeekNext:                         "Ke hadapan mengikut saat yang dikonfigurasi (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Tetapan",
    tabDlgSettingsDisplay:                  "Paparan",
    tabDlgSettingsTime:                     "Masa",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "Tentang",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Cerah",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Kelewatan Edit Baris",
    lblDlgSettingsTimeReactionDelay:        "Kelewatan Reaksi",
    lblDlgSettingsTimeVerificationDelay:    "Kelewatan Pengesahan",
    lblDlgSettingsTimeSeekDelay:            "Masa lompat",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artis",
    plhDlgSettingsMetaArtist:               "Nama artis",
    lblDlgSettingsMetaSongwriter:           "Penulis Lagu",
    plhDlgSettingsMetaSongwriter:           "Penyajak / penulis lagu",
    lblDlgSettingsMetaLrcBy:                "LRC Oleh",
    plhDlgSettingsMetaLrcBy:                "Pencipta LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "cipta fail lirik yang disegerakkan.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artis",
    plhDlgMetaArtist:                       "Nama artis",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Nama album",
    lblDlgMetaTitle:                        "Tajuk",
    plhDlgMetaTitle:                        "Tajuk lagu",
    lblDlgMetaSongwriter:                   "Penulis Lagu",
    plhDlgMetaSongwriter:                   "Penyajak / penulis lagu",
    lblDlgMetaLrcBy:                        "LRC Oleh",
    plhDlgMetaLrcBy:                        "Pencipta LRC",
    lblDlgMetaOffsetMs:                     "Offset Global (ms)",
    tipDlgMetaAutoFill:                     "Isi metadata dari tag fail muzik",
    btnDlgMetaAutoFill:                     "Isi Auto",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Tunjukkan notepad",
    tipNotepadHide:                         "Sembunyikan notepad",
    plhNotepad:                             "Tampal atau taip lirik yang tidak disegerakkan di sini…",
    btnNotepadSetLyrics:                    "Salin ke Senarai Lirik",
    tipNotepadSetLyrics:                    "Gantikan senarai lirik dengan baris dari notepad ini",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Fail baru",
    lblSyncLines:                           "baris",
    empSyncNoLrc:                           "Segerakkan baris dengan muzik untuk membina fail LRC.",
    lblSyncStartOfMusic:                    "Awal Muzik",
    tipSyncEarlier:                         "Alihkan baris yang dipilih −50ms (D)",
    tipSyncLater:                           "Alihkan baris yang dipilih +50ms (F)",
    lblSyncEndOfLyrics:                     "Akhir Lirik",
    lblSyncEndOfMusic:                      "Akhir Muzik",

  },

  ru: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Отмена",
    btnGlbYes:                              "Да",
    btnGlbNo:                               "Нет",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна новая версия:",
    lnkUpdateWhatsNew:                      "Что нового",
    btnUpdateDownload:                      "Скачать",
    lnkUpdateSkip:                          "Пропустить эту версию",
    tipUpdateDismiss:                       "Закрыть",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Несохранённые изменения",
    cfmAppUnsavedMsg:                       "Сохранить текущий файл перед продолжением?",
    tstAppSaved:                            "Файл сохранён.",
    tstAppAutoLrcLoaded:                    "Файл текста загружен автоматически.",
    tstAppFileError:                        "Не удалось открыть файл.",
    tstAppSaveError:                        "Не удалось сохранить файл.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Открыть музыкальный файл",
    ttlOsdOpenLyrics:                       "Открыть файл текста песни",
    ttlOsdSaveLrcAs:                        "Сохранить файл LRC",
    ttlOsdSaveTxt:                          "Сохранить текстовый файл",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Новый LRC файл",
    tipHdrOpenMusic:                        "Открыть музыкальный файл для синхронизации",
    tipHdrOpenLyrics:                       "Открыть файл текста (.lrc с метками времени или .txt для обычного текста)",
    tipHdrSaveLrc:                          "Сохранить файл LRC",
    tipHdrSaveLrcAs:                        "Сохранить как новый файл .lrc",
    tipHdrMeta:                             "Редактировать метаданные",
    btnHdrMeta:                             "Метаданные",
    tipHdrSaveTxt:                          "Экспортировать список текста в файл .txt",
    tipHdrSettings:                         "Открыть настройки",
    tipHdrHelp:                             "Справка",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Отметить текущую строку временем плеера и перейти далее (Enter)",
    btnFtrSyncTime:                         "Синхр. время",
    lblFtrReactionDelay:                    "Задержка реакции",
    tipFtrPlayPause:                        "Воспроизвести / Пауза (Пробел)",
    tipFtrStop:                             "Стоп (Esc)",
    tipFtrVerify:                           "Верификация - воспроизводит и автоматически переходит к следующей строке после задержки верификации",
    lblFtrVerificationDelay:                "Задержка верификации",
    tipFtrPrevStamp:                        "Предыдущая метка",
    tipFtrNextStamp:                        "Следующая метка",
    lblFtrSeekDelay:                        "Время перемотки",
    tipFtrSeekBack:                         "Перемотать назад (←)",
    tipFtrSeekNext:                         "Перемотать вперёд на заданные секунды (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Отображение",
    tabDlgSettingsTime:                     "Время",
    tabDlgSettingsMeta:                     "Метаданные",
    tabDlgSettingsAbout:                    "О программе",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Язык",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тёмная",
    btnDlgSettingsDisplayThemeLight:        "Светлая",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Задержка редактирования",
    lblDlgSettingsTimeReactionDelay:        "Задержка реакции",
    lblDlgSettingsTimeVerificationDelay:    "Задержка верификации",
    lblDlgSettingsTimeSeekDelay:            "Время перемотки",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Исполнитель",
    plhDlgSettingsMetaArtist:               "Имя исполнителя",
    lblDlgSettingsMetaSongwriter:           "Автор песни",
    plhDlgSettingsMetaSongwriter:           "Поэт / автор песни",
    lblDlgSettingsMetaLrcBy:                "LRC автор",
    plhDlgSettingsMetaLrcBy:                "Создатель LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "создание синхронизированных текстов.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Метаданные",
    lblDlgMetaArtist:                       "Исполнитель",
    plhDlgMetaArtist:                       "Имя исполнителя",
    lblDlgMetaAlbum:                        "Альбом",
    plhDlgMetaAlbum:                        "Название альбома",
    lblDlgMetaTitle:                        "Название",
    plhDlgMetaTitle:                        "Название песни",
    lblDlgMetaSongwriter:                   "Автор песни",
    plhDlgMetaSongwriter:                   "Поэт / автор песни",
    lblDlgMetaLrcBy:                        "LRC автор",
    plhDlgMetaLrcBy:                        "Создатель LRC",
    lblDlgMetaOffsetMs:                     "Глобальное смещение (мс)",
    tipDlgMetaAutoFill:                     "Заполнить метаданные из тегов музыкального файла",
    btnDlgMetaAutoFill:                     "Авто-заполнить",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Блокнот",
    tipNotepadShow:                         "Показать блокнот",
    tipNotepadHide:                         "Скрыть блокнот",
    plhNotepad:                             "Вставьте или введите несинхронизированный текст здесь…",
    btnNotepadSetLyrics:                    "Скопировать в список",
    tipNotepadSetLyrics:                    "Заменить список текста строками из блокнота",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Новый файл",
    lblSyncLines:                           "строк",
    empSyncNoLrc:                           "Синхронизируйте строки с музыкой для создания LRC файла.",
    lblSyncStartOfMusic:                    "Начало музыки",
    tipSyncEarlier:                         "Сдвинуть выбранную строку на −50мс (D)",
    tipSyncLater:                           "Сдвинуть выбранную строку на +50мс (F)",
    lblSyncEndOfLyrics:                     "Конец текста",
    lblSyncEndOfMusic:                      "Конец музыки",

  },

  th: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "ยกเลิก",
    btnGlbYes:                              "ใช่",
    btnGlbNo:                               "ไม่",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "มีเวอร์ชันใหม่:",
    lnkUpdateWhatsNew:                      "มีอะไรใหม่",
    btnUpdateDownload:                      "ดาวน์โหลด",
    lnkUpdateSkip:                          "ข้ามเวอร์ชันนี้",
    tipUpdateDismiss:                       "ปิด",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "การเปลี่ยนแปลงที่ยังไม่บันทึก",
    cfmAppUnsavedMsg:                       "บันทึกไฟล์ปัจจุบันก่อนดำเนินการต่อ?",
    tstAppSaved:                            "บันทึกไฟล์แล้ว",
    tstAppAutoLrcLoaded:                    "โหลดไฟล์เนื้อเพลงอัตโนมัติแล้ว",
    tstAppFileError:                        "ไม่สามารถเปิดไฟล์ได้",
    tstAppSaveError:                        "ไม่สามารถบันทึกไฟล์ได้",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "เปิดไฟล์เพลง",
    ttlOsdOpenLyrics:                       "เปิดไฟล์เนื้อเพลง",
    ttlOsdSaveLrcAs:                        "บันทึกไฟล์ LRC",
    ttlOsdSaveTxt:                          "บันทึกไฟล์ข้อความ",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "ไฟล์ LRC ใหม่",
    tipHdrOpenMusic:                        "เปิดไฟล์เพลงเพื่อซิงค์",
    tipHdrOpenLyrics:                       "เปิดไฟล์เนื้อเพลง (.lrc พร้อมเวลา หรือ .txt สำหรับเนื้อเพลงธรรมดา)",
    tipHdrSaveLrc:                          "บันทึกไฟล์ LRC",
    tipHdrSaveLrcAs:                        "บันทึกเป็นไฟล์ .lrc ใหม่",
    tipHdrMeta:                             "แก้ไขข้อมูลเมตาของเพลง",
    btnHdrMeta:                             "ข้อมูลเมตา",
    tipHdrSaveTxt:                          "ส่งออกรายการเนื้อเพลงเป็นไฟล์ .txt",
    tipHdrSettings:                         "เปิดการตั้งค่า",
    tipHdrHelp:                             "วิธีใช้",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "ประทับเวลาบรรทัดปัจจุบันและเลื่อนไป (Enter)",
    btnFtrSyncTime:                         "ซิงค์เวลา",
    lblFtrReactionDelay:                    "หน่วงเวลาตอบสนอง",
    tipFtrPlayPause:                        "เล่น / หยุดชั่วคราว (Space)",
    tipFtrStop:                             "หยุด (Esc)",
    tipFtrVerify:                           "ตรวจสอบ - เล่นและข้ามไปบรรทัดถัดไปอัตโนมัติหลังจากความล่าช้าการตรวจสอบ",
    lblFtrVerificationDelay:                "ความล่าช้าการตรวจสอบ",
    tipFtrPrevStamp:                        "ตัวกำหนดเวลาก่อนหน้า",
    tipFtrNextStamp:                        "ตัวกำหนดเวลาถัดไป",
    lblFtrSeekDelay:                        "เวลากระโดด",
    tipFtrSeekBack:                         "ย้อนกลับหลายวินาที (←)",
    tipFtrSeekNext:                         "ข้ามไปข้างหน้าตามวินาที่กำหนด (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "การตั้งค่า",
    tabDlgSettingsDisplay:                  "แสดงผล",
    tabDlgSettingsTime:                     "เวลา",
    tabDlgSettingsMeta:                     "ข้อมูลเมตา",
    tabDlgSettingsAbout:                    "เกี่ยวกับ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ภาษา",
    lblDlgSettingsDisplayTheme:             "ธีม",
    btnDlgSettingsDisplayThemeDark:         "มืด",
    btnDlgSettingsDisplayThemeLight:        "สว่าง",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "หน่วงเวลาแก้ไขบรรทัด",
    lblDlgSettingsTimeReactionDelay:        "หน่วงเวลาตอบสนอง",
    lblDlgSettingsTimeVerificationDelay:    "ความล่าช้าการตรวจสอบ",
    lblDlgSettingsTimeSeekDelay:            "เวลากระโดด",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "ศิลปิน",
    plhDlgSettingsMetaArtist:               "ชื่อศิลปิน",
    lblDlgSettingsMetaSongwriter:           "นักแต่งเพลง",
    plhDlgSettingsMetaSongwriter:           "กวี / นักแต่งเพลง",
    lblDlgSettingsMetaLrcBy:                "LRC โดย",
    plhDlgSettingsMetaLrcBy:                "ผู้สร้าง LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "สร้างไฟล์เนื้อเพลงที่ซิงค์",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "ข้อมูลเมตา",
    lblDlgMetaArtist:                       "ศิลปิน",
    plhDlgMetaArtist:                       "ชื่อศิลปิน",
    lblDlgMetaAlbum:                        "อัลบั้ม",
    plhDlgMetaAlbum:                        "ชื่ออัลบั้ม",
    lblDlgMetaTitle:                        "ชื่อเพลง",
    plhDlgMetaTitle:                        "ชื่อเพลง",
    lblDlgMetaSongwriter:                   "นักแต่งเพลง",
    plhDlgMetaSongwriter:                   "กวี / นักแต่งเพลง",
    lblDlgMetaLrcBy:                        "LRC โดย",
    plhDlgMetaLrcBy:                        "ผู้สร้าง LRC",
    lblDlgMetaOffsetMs:                     "ออฟเซ็ตทั่วไป (ms)",
    tipDlgMetaAutoFill:                     "เติมข้อมูลเมตาจากแท็กไฟล์เพลง",
    btnDlgMetaAutoFill:                     "เติมอัตโนมัติ",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "โน้ตแพด",
    tipNotepadShow:                         "แสดงโน้ตแพด",
    tipNotepadHide:                         "ซ่อนโน้ตแพด",
    plhNotepad:                             "วางหรือพิมพ์เนื้อเพลงที่ยังไม่ซิงค์ที่นี่…",
    btnNotepadSetLyrics:                    "คัดลอกไปยังรายการเนื้อเพลง",
    tipNotepadSetLyrics:                    "แทนที่รายการเนื้อเพลงด้วยบรรทัดจากโน้ตแพดนี้",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "ไฟล์ใหม่",
    lblSyncLines:                           "บรรทัด",
    empSyncNoLrc:                           "ซิงค์บรรทัดกับเพลงเพื่อสร้างไฟล์ LRC",
    lblSyncStartOfMusic:                    "เริ่มเพลง",
    tipSyncEarlier:                         "เลื่อนบรรทัดที่เลือก −50ms (D)",
    tipSyncLater:                           "เลื่อนบรรทัดที่เลือก +50ms (F)",
    lblSyncEndOfLyrics:                     "จบเนื้อเพลง",
    lblSyncEndOfMusic:                      "จบเพลง",

  },

  uk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancel",
    btnGlbYes:                              "Yes",
    btnGlbNo:                               "No",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна нова версія:",
    lnkUpdateWhatsNew:                      "Що нового",
    btnUpdateDownload:                      "Завантажити",
    lnkUpdateSkip:                          "Пропустити цю версію",
    tipUpdateDismiss:                       "Закрити",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Drop an audio or LRC file here",
    cfmAppUnsavedTitle:                     "Unsaved Changes",
    cfmAppUnsavedMsg:                       "Save the current file before continuing?",
    tstAppSaved:                            "File saved.",
    tstAppAutoLrcLoaded:                    "Lyrics file loaded automatically.",
    tstAppFileError:                        "Failed to open file.",
    tstAppSaveError:                        "Failed to save file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Відкрити музичний файл",
    ttlOsdOpenLyrics:                       "Відкрити файл тексту пісні",
    ttlOsdSaveLrcAs:                        "Зберегти файл LRC",
    ttlOsdSaveTxt:                          "Зберегти текстовий файл",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New LRC file",
    tipHdrOpenMusic:                        "Open music file to sync against",
    tipHdrOpenLyrics:                       "Open lyrics file (.lrc with timestamps or .txt for plain lyrics)",
    tipHdrSaveLrc:                          "Save LRC file",
    tipHdrSaveLrcAs:                        "Save as new .lrc file",
    tipHdrMeta:                             "Edit song metadata",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Export lyric list to .txt file",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Довідка",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Stamp current line with player time and advance (Enter)",
    btnFtrSyncTime:                         "Sync Time",
    lblFtrReactionDelay:                    "Reaction Delay",
    tipFtrPlayPause:                        "Play / Pause (Space)",
    tipFtrStop:                             "Stop (Esc)",
    tipFtrVerify:                           "Верифікація - відтворює та автоматично переходить до наступного рядка після затримки верифікації",
    lblFtrVerificationDelay:                "Затримка верифікації",
    tipFtrPrevStamp:                        "Попередня мітка часу",
    tipFtrNextStamp:                        "Наступна мітка часу",
    lblFtrSeekDelay:                        "Час перемотування",
    tipFtrSeekBack:                         "Seek back by configured seconds (←)",
    tipFtrSeekNext:                         "Перемотати вперед на задані секунди (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Time",
    tabDlgSettingsMeta:                     "Meta Data",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Line Edit Delay",
    lblDlgSettingsTimeReactionDelay:        "Reaction Delay",
    lblDlgSettingsTimeVerificationDelay:    "Затримка верифікації",
    lblDlgSettingsTimeSeekDelay:            "Час перемотування",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artist",
    plhDlgSettingsMetaArtist:               "Artist name",
    lblDlgSettingsMetaSongwriter:           "Songwriter",
    plhDlgSettingsMetaSongwriter:           "Lyricist / songwriter",
    lblDlgSettingsMetaLrcBy:                "LRC By",
    plhDlgSettingsMetaLrcBy:                "LRC creator",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "create synchronized lyrics files.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artist",
    plhDlgMetaArtist:                       "Artist name",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album name",
    lblDlgMetaTitle:                        "Title",
    plhDlgMetaTitle:                        "Song title",
    lblDlgMetaSongwriter:                   "Songwriter",
    plhDlgMetaSongwriter:                   "Lyricist / songwriter",
    lblDlgMetaLrcBy:                        "LRC By",
    plhDlgMetaLrcBy:                        "LRC creator",
    lblDlgMetaOffsetMs:                     "Global Offset (ms)",
    tipDlgMetaAutoFill:                     "Fill metadata from music file tags",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Показати нотатник",
    tipNotepadHide:                         "Приховати нотатник",
    plhNotepad:                             "Paste or type unsynchronized lyrics here…",
    btnNotepadSetLyrics:                    "Set Lyrics",
    tipNotepadSetLyrics:                    "Set the lyric list from this notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Новий файл",
    lblSyncLines:                           "рядків",
    empSyncNoLrc:                           "Sync lines with the music to build the LRC file.",
    lblSyncStartOfMusic:                    "Start of Music",
    tipSyncEarlier:                         "Shift selected line −50ms (D)",
    tipSyncLater:                           "Shift selected line +50ms (F)",
    lblSyncEndOfLyrics:                     "End of Lyrics",
    lblSyncEndOfMusic:                      "End of Music",

  },

  hy: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Չեղարկել",
    btnGlbYes:                              "Այո",
    btnGlbNo:                               "Ոչ",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Նոր տարբերակ հասանելի է:",
    lnkUpdateWhatsNew:                      "Ինչ նորություն կա",
    btnUpdateDownload:                      "Ներբեռնել",
    lnkUpdateSkip:                          "Բաց թողնել այս տարբերակը",
    tipUpdateDismiss:                       "Մերժել",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Քաշեք ձայնային կամ LRC ֆայլ այստեղ",
    cfmAppUnsavedTitle:                     "Չպահված փոփոխություններ",
    cfmAppUnsavedMsg:                       "Պահե՞լ ֆայլը շարունակելուց առաջ:",
    tstAppSaved:                            "Ֆայլը պահված է:",
    tstAppAutoLrcLoaded:                    "Տեքստի ֆայլը ավտոմատ բեռնված է:",
    tstAppFileError:                        "Չհաջողվեց բացել ֆայլը:",
    tstAppSaveError:                        "Չհաջողվեց պահպանել ֆայլը:",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Բացել երաժշտական ֆայլ",
    ttlOsdOpenLyrics:                       "Բացել տեքստի ֆայլ",
    ttlOsdSaveLrcAs:                        "Պահել LRC ֆայլը որպես",
    ttlOsdSaveTxt:                          "Պահել տեքստային ֆայլ",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Նոր LRC ֆայլ",
    tipHdrOpenMusic:                        "Բացել երաժշտական ֆայլ",
    tipHdrOpenLyrics:                       "Բացել երգի տեքստի ֆայլ (.lrc ժամանականիշերով կամ .txt)",
    tipHdrSaveLrc:                          "Պահպանել LRC ֆայլը",
    tipHdrSaveLrcAs:                        "Պահել որպես նոր .lrc ֆայլ",
    tipHdrMeta:                             "Խմբագրել երգի մետատվյալը",
    btnHdrMeta:                             "Մետատվյալ",
    tipHdrSaveTxt:                          "Արտահանել տողերի ցուցակը .txt ֆայլ",
    tipHdrSettings:                         "Բացել կարգավորումները",
    tipHdrHelp:                             "Օգնություն",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Ժամանակ դնել ընթացիկ տողին և անցնել հաջորդին (Enter)",
    btnFtrSyncTime:                         "Համաժամ. ժամ.",
    lblFtrReactionDelay:                    "Արձագանքման հապաղում",
    tipFtrPlayPause:                        "Նվագարկել / Դադարեցնել (Բացատ)",
    tipFtrStop:                             "Կանգ (Esc)",
    tipFtrVerify:                           "Ստուգել - նվագարկել և ավտոմատ անցնել հաջորդ տողին",
    lblFtrVerificationDelay:                "Ստուգման հապաղում",
    tipFtrPrevStamp:                        "Նախորդ ժամանականիշ",
    tipFtrNextStamp:                        "Հաջորդ ժամանականիշ",
    lblFtrSeekDelay:                        "Անց ժամ",
    tipFtrSeekBack:                         "Հետ փնտրել կազմաձևված վայրկյաններով (←)",
    tipFtrSeekNext:                         "Առաջ կա噭ադլված վայրկյաններով (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Կարգավորումներ",
    tabDlgSettingsDisplay:                  "Ցուցադրում",
    tabDlgSettingsTime:                     "Ժամանակ",
    tabDlgSettingsMeta:                     "Մետատվյալ",
    tabDlgSettingsAbout:                    "Մասին",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Լեզու",
    lblDlgSettingsDisplayTheme:             "Թեմա",
    btnDlgSettingsDisplayThemeDark:         "Մութ",
    btnDlgSettingsDisplayThemeLight:        "Բաց",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Տողի խմբագրման հապաղում",
    lblDlgSettingsTimeReactionDelay:        "Արձագանքման հապաղում",
    lblDlgSettingsTimeVerificationDelay:    "Ստուգման հապաղում",
    lblDlgSettingsTimeSeekDelay:            "Անց ժամ",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Կատարող",
    plhDlgSettingsMetaArtist:               "Կատարողի անուն",
    lblDlgSettingsMetaSongwriter:           "Հեղինակ",
    plhDlgSettingsMetaSongwriter:           "Բառերի հեղինակ / կոմպոզիտոր",
    lblDlgSettingsMetaLrcBy:                "LRC-ը ստեղծել է",
    plhDlgSettingsMetaLrcBy:                "LRC-ի ստեղծող",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ստեղծել համաժամեցված երգի տեքստի ֆայլեր:",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Մետատվյալ",
    lblDlgMetaArtist:                       "Կատարող",
    plhDlgMetaArtist:                       "Կատարողի անուն",
    lblDlgMetaAlbum:                        "Ալբոմ",
    plhDlgMetaAlbum:                        "Ալբոմի անուն",
    lblDlgMetaTitle:                        "Վերնագիր",
    plhDlgMetaTitle:                        "Երգի վերնագիր",
    lblDlgMetaSongwriter:                   "Հեղինակ",
    plhDlgMetaSongwriter:                   "Բառերի հեղինակ / կոմպոզիտոր",
    lblDlgMetaLrcBy:                        "LRC-ը ստեղծել է",
    plhDlgMetaLrcBy:                        "LRC-ի ստեղծող",
    lblDlgMetaOffsetMs:                     "Ընդհանուր շեղում (ms)",
    tipDlgMetaAutoFill:                     "Լրացնել մետատվյալները երաժշտական ֆայլի թեգերից",
    btnDlgMetaAutoFill:                     "Ավտոլրացնել",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Գրառումներ",
    tipNotepadShow:                         "Ցուցադրել գրառումները",
    tipNotepadHide:                         "Թաքցնել գրառումները",
    plhNotepad:                             "Կպցրեք կամ մուտքագրեք չհամաժամեցված տեքստ այստեղ…",
    btnNotepadSetLyrics:                    "Սահմանել տեքստ",
    tipNotepadSetLyrics:                    "Սահմանել տողերի ցուցակը գրառումներից",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Նոր ֆայল",
    lblSyncLines:                           "տող",
    empSyncNoLrc:                           "Համաժամեցրեք տողերը երաժշտության հետ LRC ֆայլ կառուցելու համար:",
    lblSyncStartOfMusic:                    "Երաժշտության սկիզբ",
    tipSyncEarlier:                         "Տողը −50ms տեղաշարժել (D)",
    tipSyncLater:                           "Տողը +50ms տեղաշարժել (F)",
    lblSyncEndOfLyrics:                     "Տեքստի ավարտ",
    lblSyncEndOfMusic:                      "Երաժշտության ավարտ",

  },

  bg: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Отказ",
    btnGlbYes:                              "Да",
    btnGlbNo:                               "Не",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Налична е нова версия:",
    lnkUpdateWhatsNew:                      "Какво ново",
    btnUpdateDownload:                      "Изтегли",
    lnkUpdateSkip:                          "Пропусни тази версия",
    tipUpdateDismiss:                       "Отхвърли",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Пуснете аудио или LRC файл тук",
    cfmAppUnsavedTitle:                     "Незапазени промени",
    cfmAppUnsavedMsg:                       "Запази файла преди да продължиш?",
    tstAppSaved:                            "Файлът е запазен.",
    tstAppAutoLrcLoaded:                    "Файлът с текст е зареден автоматично.",
    tstAppFileError:                        "Неуспешно отваряне на файла.",
    tstAppSaveError:                        "Неуспешно запазване на файла.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Отвори музикален файл",
    ttlOsdOpenLyrics:                       "Отвори файл с текст",
    ttlOsdSaveLrcAs:                        "Запази LRC файла като",
    ttlOsdSaveTxt:                          "Запази текстов файл",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Нов LRC файл",
    tipHdrOpenMusic:                        "Отвори музикален файл",
    tipHdrOpenLyrics:                       "Отвори файл с текст (.lrc с времеви маркери или .txt)",
    tipHdrSaveLrc:                          "Запази LRC файла",
    tipHdrSaveLrcAs:                        "Запази като нов .lrc файл",
    tipHdrMeta:                             "Редактирай метаданните на песента",
    btnHdrMeta:                             "Метаданни",
    tipHdrSaveTxt:                          "Експортирай списъка с текст в .txt файл",
    tipHdrSettings:                         "Отвори настройките",
    tipHdrHelp:                             "Помощ",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Маркирай текущия ред с времето на плейъра и напредни (Enter)",
    btnFtrSyncTime:                         "Синхр. врем.",
    lblFtrReactionDelay:                    "Закъснение на реакцията",
    tipFtrPlayPause:                        "Възпроизвеждане / Пауза (Интервал)",
    tipFtrStop:                             "Стоп (Esc)",
    tipFtrVerify:                           "Провери - пусни и автоматично напредвай след закъснението за проверка",
    lblFtrVerificationDelay:                "Закъснение на проверката",
    tipFtrPrevStamp:                        "Предишен времеви маркер",
    tipFtrNextStamp:                        "Следващ времеви маркер",
    lblFtrSeekDelay:                        "Време на прескок",
    tipFtrSeekBack:                         "Назад с конфигурираните секунди (←)",
    tipFtrSeekNext:                         "Напредване с конфигурираните секунди (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Изглед",
    tabDlgSettingsTime:                     "Време",
    tabDlgSettingsMeta:                     "Метаданни",
    tabDlgSettingsAbout:                    "Относно",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Език",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тъмна",
    btnDlgSettingsDisplayThemeLight:        "Светла",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Закъснение при редактиране",
    lblDlgSettingsTimeReactionDelay:        "Закъснение на реакцията",
    lblDlgSettingsTimeVerificationDelay:    "Закъснение на проверката",
    lblDlgSettingsTimeSeekDelay:            "Време на прескок",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Изпълнител",
    plhDlgSettingsMetaArtist:               "Име на изпълнителя",
    lblDlgSettingsMetaSongwriter:           "Автор",
    plhDlgSettingsMetaSongwriter:           "Текстописец / автор",
    lblDlgSettingsMetaLrcBy:                "LRC от",
    plhDlgSettingsMetaLrcBy:                "Създател на LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "създавайте синхронизирани файлове с текст.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Метаданни",
    lblDlgMetaArtist:                       "Изпълнител",
    plhDlgMetaArtist:                       "Име на изпълнителя",
    lblDlgMetaAlbum:                        "Албум",
    plhDlgMetaAlbum:                        "Име на албума",
    lblDlgMetaTitle:                        "Заглавие",
    plhDlgMetaTitle:                        "Заглавие на песента",
    lblDlgMetaSongwriter:                   "Автор",
    plhDlgMetaSongwriter:                   "Текстописец / автор",
    lblDlgMetaLrcBy:                        "LRC от",
    plhDlgMetaLrcBy:                        "Създател на LRC",
    lblDlgMetaOffsetMs:                     "Общо отместване (ms)",
    tipDlgMetaAutoFill:                     "Попълни метаданните от таговете на музикалния файл",
    btnDlgMetaAutoFill:                     "Автопопълване",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Бележник",
    tipNotepadShow:                         "Покажи бележника",
    tipNotepadHide:                         "Скрий бележника",
    plhNotepad:                             "Поставете или напишете несинхронизирания текст тук…",
    btnNotepadSetLyrics:                    "Задай текст",
    tipNotepadSetLyrics:                    "Задай списъка с текст от бележника",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Нов файл",
    lblSyncLines:                           "реда",
    empSyncNoLrc:                           "Синхронизирайте редовете с музиката, за да изградите LRC файла.",
    lblSyncStartOfMusic:                    "Начало на музиката",
    tipSyncEarlier:                         "Премести ред −50ms (D)",
    tipSyncLater:                           "Премести ред +50ms (F)",
    lblSyncEndOfLyrics:                     "Край на текста",
    lblSyncEndOfMusic:                      "Край на музиката",

  },

  gl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Cancelar",
    btnGlbYes:                              "Si",
    btnGlbNo:                               "Non",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versión dispoñible:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Solta un ficheiro de audio ou LRC aquí",
    cfmAppUnsavedTitle:                     "Cambios non gardados",
    cfmAppUnsavedMsg:                       "Gardar o ficheiro antes de continuar?",
    tstAppSaved:                            "Ficheiro gardado.",
    tstAppAutoLrcLoaded:                    "Ficheiro de letra cargado automaticamente.",
    tstAppFileError:                        "Erro ao abrir o ficheiro.",
    tstAppSaveError:                        "Erro ao gardar o ficheiro.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Abrir ficheiro de música",
    ttlOsdOpenLyrics:                       "Abrir ficheiro de letra",
    ttlOsdSaveLrcAs:                        "Gardar ficheiro LRC como",
    ttlOsdSaveTxt:                          "Gardar ficheiro de texto",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novo ficheiro LRC",
    tipHdrOpenMusic:                        "Abrir ficheiro de música",
    tipHdrOpenLyrics:                       "Abrir ficheiro de letra (.lrc con marcas de tempo ou .txt)",
    tipHdrSaveLrc:                          "Gardar ficheiro LRC",
    tipHdrSaveLrcAs:                        "Gardar como novo ficheiro .lrc",
    tipHdrMeta:                             "Editar metadatos da canción",
    btnHdrMeta:                             "Metadatos",
    tipHdrSaveTxt:                          "Exportar lista de letras a ficheiro .txt",
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Axuda",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Marcar a liña actual co tempo do reprodutor e avanzar (Enter)",
    btnFtrSyncTime:                         "Sincronizar",
    lblFtrReactionDelay:                    "Retardo de reacción",
    tipFtrPlayPause:                        "Reproducir / Pausar (Espazo)",
    tipFtrStop:                             "Deter (Esc)",
    tipFtrVerify:                           "Verificar - reproduce e avanza automaticamente tras o retardo de verificación",
    lblFtrVerificationDelay:                "Retardo de verificación",
    tipFtrPrevStamp:                        "Marca de tempo anterior",
    tipFtrNextStamp:                        "Seguinte marca de tempo",
    lblFtrSeekDelay:                        "Tempo de salto",
    tipFtrSeekBack:                         "Retroceder os segundos configurados (←)",
    tipFtrSeekNext:                         "Avanzar os segundos configurados (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Visualización",
    tabDlgSettingsTime:                     "Tempo",
    tabDlgSettingsMeta:                     "Metadatos",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Retardo de edición",
    lblDlgSettingsTimeReactionDelay:        "Retardo de reacción",
    lblDlgSettingsTimeVerificationDelay:    "Retardo de verificación",
    lblDlgSettingsTimeSeekDelay:            "Tempo de salto",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artista",
    plhDlgSettingsMetaArtist:               "Nome do artista",
    lblDlgSettingsMetaSongwriter:           "Compositor",
    plhDlgSettingsMetaSongwriter:           "Letrista / compositor",
    lblDlgSettingsMetaLrcBy:                "LRC por",
    plhDlgSettingsMetaLrcBy:                "Creador do LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "crea ficheiros de letra sincronizada.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadatos",
    lblDlgMetaArtist:                       "Artista",
    plhDlgMetaArtist:                       "Nome do artista",
    lblDlgMetaAlbum:                        "Álbum",
    plhDlgMetaAlbum:                        "Nome do álbum",
    lblDlgMetaTitle:                        "Título",
    plhDlgMetaTitle:                        "Título da canción",
    lblDlgMetaSongwriter:                   "Compositor",
    plhDlgMetaSongwriter:                   "Letrista / compositor",
    lblDlgMetaLrcBy:                        "LRC por",
    plhDlgMetaLrcBy:                        "Creador do LRC",
    lblDlgMetaOffsetMs:                     "Desviación global (ms)",
    tipDlgMetaAutoFill:                     "Completar metadatos dende as etiquetas do ficheiro de música",
    btnDlgMetaAutoFill:                     "Autocompletar",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Bloc de notas",
    tipNotepadShow:                         "Mostrar bloc de notas",
    tipNotepadHide:                         "Ocultar bloc de notas",
    plhNotepad:                             "Pega ou escribe a letra non sincronizada aquí…",
    btnNotepadSetLyrics:                    "Establecer letra",
    tipNotepadSetLyrics:                    "Establecer a lista de letras dende o bloc de notas",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "New File",
    lblSyncLines:                           "lines",
    empSyncNoLrc:                           "Sincroniza as liñas coa música para construír o ficheiro LRC.",
    lblSyncStartOfMusic:                    "Inicio da música",
    tipSyncEarlier:                         "Mover −50ms (D)",
    tipSyncLater:                           "Mover +50ms (F)",
    lblSyncEndOfLyrics:                     "Fin da letra",
    lblSyncEndOfMusic:                      "Fin da música",

  },

  hu: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Mégse",
    btnGlbYes:                              "Igen",
    btnGlbNo:                               "Nem",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Új verzió elérhető:",
    lnkUpdateWhatsNew:                      "Újdonságok",
    btnUpdateDownload:                      "Letöltés",
    lnkUpdateSkip:                          "Verzió kihagyása",
    tipUpdateDismiss:                       "Elvetés",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Húzzon ide egy hang- vagy LRC fájlt",
    cfmAppUnsavedTitle:                     "Nem mentett változások",
    cfmAppUnsavedMsg:                       "Menti a fájlt a folytatás előtt?",
    tstAppSaved:                            "Fájl mentve.",
    tstAppAutoLrcLoaded:                    "Dalszöveg fájl automatikusan betöltve.",
    tstAppFileError:                        "Nem sikerült megnyitni a fájlt.",
    tstAppSaveError:                        "Nem sikerült menteni a fájlt.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Zenefájl megnyitása",
    ttlOsdOpenLyrics:                       "Dalszöveg fájl megnyitása",
    ttlOsdSaveLrcAs:                        "LRC fájl mentése másként",
    ttlOsdSaveTxt:                          "Szöveges fájl mentése",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Új LRC fájl",
    tipHdrOpenMusic:                        "Zenefájl megnyitása",
    tipHdrOpenLyrics:                       "Dalszöveg fájl megnyitása (.lrc időbélyegekkel vagy .txt)",
    tipHdrSaveLrc:                          "LRC fájl mentése",
    tipHdrSaveLrcAs:                        "Mentés új .lrc fájlként",
    tipHdrMeta:                             "Dal metaadatainak szerkesztése",
    btnHdrMeta:                             "Metaadatok",
    tipHdrSaveTxt:                          "Dalszöveglista exportálása .txt fájlba",
    tipHdrSettings:                         "Beállítások megnyitása",
    tipHdrHelp:                             "Súgó",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Aktuális sor időbélyegzése és továbblépés (Enter)",
    btnFtrSyncTime:                         "Idő szinkr.",
    lblFtrReactionDelay:                    "Reakciókésleltetés",
    tipFtrPlayPause:                        "Lejátszás / Szünet (Szóköz)",
    tipFtrStop:                             "Leállítás (Esc)",
    tipFtrVerify:                           "Ellenőrzés - lejátssza és automatikusan halad az ellenőrzési késleltetés után",
    lblFtrVerificationDelay:                "Ellenőrzési késleltetés",
    tipFtrPrevStamp:                        "Előző időbélyeg",
    tipFtrNextStamp:                        "Következő időbélyeg",
    lblFtrSeekDelay:                        "Ugrási idő",
    tipFtrSeekBack:                         "Visszatekerés a beállított másodpercekkel (←)",
    tipFtrSeekNext:                         "Ugorjon előre a beállított másodpercekkel (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Beállítások",
    tabDlgSettingsDisplay:                  "Megjelenítés",
    tabDlgSettingsTime:                     "Idő",
    tabDlgSettingsMeta:                     "Metaadatok",
    tabDlgSettingsAbout:                    "Névjegy",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Nyelv",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Sötét",
    btnDlgSettingsDisplayThemeLight:        "Világos",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Szerkesztési késleltetés",
    lblDlgSettingsTimeReactionDelay:        "Reakciókésleltetés",
    lblDlgSettingsTimeVerificationDelay:    "Ellenőrzési késleltetés",
    lblDlgSettingsTimeSeekDelay:            "Ugrási idő",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Előadó",
    plhDlgSettingsMetaArtist:               "Előadó neve",
    lblDlgSettingsMetaSongwriter:           "Dalszerző",
    plhDlgSettingsMetaSongwriter:           "Szövegíró / dalszerző",
    lblDlgSettingsMetaLrcBy:                "LRC készítette",
    plhDlgSettingsMetaLrcBy:                "LRC létrehozója",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "szinkronizált dalszöveg fájlok létrehozása.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metaadatok",
    lblDlgMetaArtist:                       "Előadó",
    plhDlgMetaArtist:                       "Előadó neve",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Album neve",
    lblDlgMetaTitle:                        "Cím",
    plhDlgMetaTitle:                        "Dal címe",
    lblDlgMetaSongwriter:                   "Dalszerző",
    plhDlgMetaSongwriter:                   "Szövegíró / dalszerző",
    lblDlgMetaLrcBy:                        "LRC készítette",
    plhDlgMetaLrcBy:                        "LRC létrehozója",
    lblDlgMetaOffsetMs:                     "Globális eltolás (ms)",
    tipDlgMetaAutoFill:                     "Metaadatok kitöltése a zenefájl tag-jeiből",
    btnDlgMetaAutoFill:                     "Automatikus kitöltés",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Jegyzettömb",
    tipNotepadShow:                         "Jegyzettömb megjelenítése",
    tipNotepadHide:                         "Jegyzettömb elrejtése",
    plhNotepad:                             "Illessze be vagy írja ide a nem szinkronizált dalszöveget…",
    btnNotepadSetLyrics:                    "Dalszöveg beállítása",
    tipNotepadSetLyrics:                    "Dalszöveglista beállítása a jegyzettömbből",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Új fájl",
    lblSyncLines:                           "sor",
    empSyncNoLrc:                           "Szinkronizálja a sorokat a zenével az LRC fájl elkészítéséhez.",
    lblSyncStartOfMusic:                    "Zene kezdete",
    tipSyncEarlier:                         "Sor mozgatása −50ms (D)",
    tipSyncLater:                           "Sor mozgatása +50ms (F)",
    lblSyncEndOfLyrics:                     "Dalszöveg vége",
    lblSyncEndOfMusic:                      "Zene vége",

  },

  lt: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Atšaukti",
    btnGlbYes:                              "Taip",
    btnGlbNo:                               "Ne",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yra nauja versija:",
    lnkUpdateWhatsNew:                      "Kas naujo",
    btnUpdateDownload:                      "Atsisiųsti",
    lnkUpdateSkip:                          "Praleisti šią versiją",
    tipUpdateDismiss:                       "Atmesti",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Numeskite garso arba LRC failą čia",
    cfmAppUnsavedTitle:                     "Neišsaugoti pakeitimai",
    cfmAppUnsavedMsg:                       "Išsaugoti failą prieš tęsiant?",
    tstAppSaved:                            "Failas išsaugotas.",
    tstAppAutoLrcLoaded:                    "Žodžių failas įkeltas automatiškai.",
    tstAppFileError:                        "Nepavyko atidaryti failo.",
    tstAppSaveError:                        "Nepavyko išsaugoti failo.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Atidaryti muzikos failą",
    ttlOsdOpenLyrics:                       "Atidaryti žodžių failą",
    ttlOsdSaveLrcAs:                        "Išsaugoti LRC failą kaip",
    ttlOsdSaveTxt:                          "Išsaugoti teksto failą",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Naujas LRC failas",
    tipHdrOpenMusic:                        "Atidaryti muzikos failą",
    tipHdrOpenLyrics:                       "Atidaryti dainos žodžių failą (.lrc su laiko žymomis arba .txt)",
    tipHdrSaveLrc:                          "Išsaugoti LRC failą",
    tipHdrSaveLrcAs:                        "Išsaugoti kaip naują .lrc failą",
    tipHdrMeta:                             "Redaguoti dainos metaduomenis",
    btnHdrMeta:                             "Metaduomenys",
    tipHdrSaveTxt:                          "Eksportuoti žodžių sąrašą į .txt failą",
    tipHdrSettings:                         "Atidaryti nustatymus",
    tipHdrHelp:                             "Pagalba",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Pažymėti esamą eilutę grotuvo laiku ir pereiti prie kitos (Enter)",
    btnFtrSyncTime:                         "Sinchronizuoti",
    lblFtrReactionDelay:                    "Reakcijos delsa",
    tipFtrPlayPause:                        "Leisti / Pristabdyti (Tarpas)",
    tipFtrStop:                             "Sustabdyti (Esc)",
    tipFtrVerify:                           "Tikrinti - leisti ir automatiškai pereiti po tikrinimo delsos",
    lblFtrVerificationDelay:                "Tikrinimo delsa",
    tipFtrPrevStamp:                        "Ankstesnė laiko žyma",
    tipFtrNextStamp:                        "Kita laiko žyma",
    lblFtrSeekDelay:                        "Šuolio trupmė",
    tipFtrSeekBack:                         "Grįžti atgal sukonfigūruotais sekundėmis (←)",
    tipFtrSeekNext:                         "Perkelti nurodytus sekundes pirmyn (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nustatymai",
    tabDlgSettingsDisplay:                  "Rodymas",
    tabDlgSettingsTime:                     "Laikas",
    tabDlgSettingsMeta:                     "Metaduomenys",
    tabDlgSettingsAbout:                    "Apie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kalba",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamsi",
    btnDlgSettingsDisplayThemeLight:        "Šviesi",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Eilutės redagavimo delsa",
    lblDlgSettingsTimeReactionDelay:        "Reakcijos delsa",
    lblDlgSettingsTimeVerificationDelay:    "Tikrinimo delsa",
    lblDlgSettingsTimeSeekDelay:            "Šuolio trupmė",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Atlikėjas",
    plhDlgSettingsMetaArtist:               "Atlikėjo vardas",
    lblDlgSettingsMetaSongwriter:           "Autorius",
    plhDlgSettingsMetaSongwriter:           "Dainos žodžių autorius / kompozitorius",
    lblDlgSettingsMetaLrcBy:                "LRC sukūrė",
    plhDlgSettingsMetaLrcBy:                "LRC kūrėjas",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "kurti sinchronizuotus dainos žodžių failus.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metaduomenys",
    lblDlgMetaArtist:                       "Atlikėjas",
    plhDlgMetaArtist:                       "Atlikėjo vardas",
    lblDlgMetaAlbum:                        "Albumas",
    plhDlgMetaAlbum:                        "Albumo pavadinimas",
    lblDlgMetaTitle:                        "Pavadinimas",
    plhDlgMetaTitle:                        "Dainos pavadinimas",
    lblDlgMetaSongwriter:                   "Autorius",
    plhDlgMetaSongwriter:                   "Dainos žodžių autorius / kompozitorius",
    lblDlgMetaLrcBy:                        "LRC sukūrė",
    plhDlgMetaLrcBy:                        "LRC kūrėjas",
    lblDlgMetaOffsetMs:                     "Bendras poslinkis (ms)",
    tipDlgMetaAutoFill:                     "Užpildyti metaduomenis iš muzikos failo žymų",
    btnDlgMetaAutoFill:                     "Automatinis pildymas",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Užrašai",
    tipNotepadShow:                         "Rodyti užrašus",
    tipNotepadHide:                         "Slėpti užrašus",
    plhNotepad:                             "Įklijuokite arba įveskite nesinchronizuotus žodžius čia…",
    btnNotepadSetLyrics:                    "Nustatyti žodžius",
    tipNotepadSetLyrics:                    "Nustatyti žodžių sąrašą iš užrašų",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Naujas failas",
    lblSyncLines:                           "eilučių",
    empSyncNoLrc:                           "Sinchronizuokite eilutes su muzika, kad sukurtumėte LRC failą.",
    lblSyncStartOfMusic:                    "Muzikos pradžia",
    tipSyncEarlier:                         "Perkelti eilutę −50ms (D)",
    tipSyncLater:                           "Perkelti eilutę +50ms (F)",
    lblSyncEndOfLyrics:                     "Žodžių pabaiga",
    lblSyncEndOfMusic:                      "Muzikos pabaiga",

  },

  mk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Откажи",
    btnGlbYes:                              "Да",
    btnGlbNo:                               "Не",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Достапна е нова верзија:",
    lnkUpdateWhatsNew:                      "Што е ново",
    btnUpdateDownload:                      "Преземи",
    lnkUpdateSkip:                          "Прескокни ја оваа верзија",
    tipUpdateDismiss:                       "Отфрли",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Пуштете аудио или LRC фајл овде",
    cfmAppUnsavedTitle:                     "Незачувани промени",
    cfmAppUnsavedMsg:                       "Зачувај го фајлот пред да продолжиш?",
    tstAppSaved:                            "Фајлот е зачуван.",
    tstAppAutoLrcLoaded:                    "Фајлот со текст е вчитан автоматски.",
    tstAppFileError:                        "Неуспешно отворање на фајлот.",
    tstAppSaveError:                        "Неуспешно зачувување на фајлот.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Отвори музички фајл",
    ttlOsdOpenLyrics:                       "Отвори фајл со текст",
    ttlOsdSaveLrcAs:                        "Зачувај LRC фајл како",
    ttlOsdSaveTxt:                          "Зачувај текстуален фајл",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Нов LRC фајл",
    tipHdrOpenMusic:                        "Отвори музички фајл",
    tipHdrOpenLyrics:                       "Отвори фајл со текст (.lrc со временски ознаки или .txt)",
    tipHdrSaveLrc:                          "Зачувај LRC фајл",
    tipHdrSaveLrcAs:                        "Зачувај како нов .lrc фајл",
    tipHdrMeta:                             "Уреди метаподатоци на песната",
    btnHdrMeta:                             "Метаподатоци",
    tipHdrSaveTxt:                          "Извези листа со текст во .txt фајл",
    tipHdrSettings:                         "Отвори поставки",
    tipHdrHelp:                             "Помош",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Означи го тековниот ред со времето на плеерот и напредни (Enter)",
    btnFtrSyncTime:                         "Синхр. врем.",
    lblFtrReactionDelay:                    "Задоцнување на реакцијата",
    tipFtrPlayPause:                        "Пушти / Паузирај (Интервал)",
    tipFtrStop:                             "Стоп (Esc)",
    tipFtrVerify:                           "Провери - пушти и автоматски напредни по задоцнувањето за проверка",
    lblFtrVerificationDelay:                "Задоцнување на проверката",
    tipFtrPrevStamp:                        "Претходна временска ознака",
    tipFtrNextStamp:                        "Следна временска ознака",
    lblFtrSeekDelay:                        "Време на прескок",
    tipFtrSeekBack:                         "Назад со конфигурираните секунди (←)",
    tipFtrSeekNext:                         "Прескокнете ги конфигурираните секунди напред (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Поставки",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsTime:                     "Време",
    tabDlgSettingsMeta:                     "Метаподатоци",
    tabDlgSettingsAbout:                    "За",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Јазик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темна",
    btnDlgSettingsDisplayThemeLight:        "Светла",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Задоцнување при уредување",
    lblDlgSettingsTimeReactionDelay:        "Задоцнување на реакцијата",
    lblDlgSettingsTimeVerificationDelay:    "Задоцнување на проверката",
    lblDlgSettingsTimeSeekDelay:            "Време на прескок",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Изведувач",
    plhDlgSettingsMetaArtist:               "Име на изведувачот",
    lblDlgSettingsMetaSongwriter:           "Автор",
    plhDlgSettingsMetaSongwriter:           "Текстописец / автор",
    lblDlgSettingsMetaLrcBy:                "LRC од",
    plhDlgSettingsMetaLrcBy:                "Создавач на LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "создавајте синхронизирани фајлови со текст на песни.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Метаподатоци",
    lblDlgMetaArtist:                       "Изведувач",
    plhDlgMetaArtist:                       "Име на изведувачот",
    lblDlgMetaAlbum:                        "Албум",
    plhDlgMetaAlbum:                        "Ime на албумот",
    lblDlgMetaTitle:                        "Наслов",
    plhDlgMetaTitle:                        "Наслов на песната",
    lblDlgMetaSongwriter:                   "Автор",
    plhDlgMetaSongwriter:                   "Текстописец / автор",
    lblDlgMetaLrcBy:                        "LRC од",
    plhDlgMetaLrcBy:                        "Создавач на LRC",
    lblDlgMetaOffsetMs:                     "Вкупно поместување (ms)",
    tipDlgMetaAutoFill:                     "Пополни метаподатоци од ознаките на музичкиот фајл",
    btnDlgMetaAutoFill:                     "Автоматско пополнување",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Белешки",
    tipNotepadShow:                         "Прикажи ги белешките",
    tipNotepadHide:                         "Сокриј ги белешките",
    plhNotepad:                             "Залепете или напишете несинхронизиран текст овде…",
    btnNotepadSetLyrics:                    "Постави текст",
    tipNotepadSetLyrics:                    "Постави листа со текст од белешките",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Нова датотека",
    lblSyncLines:                           "линии",
    empSyncNoLrc:                           "Синхронизирајте ги редовите со музиката за да го изградите LRC фајлот.",
    lblSyncStartOfMusic:                    "Почеток на музиката",
    tipSyncEarlier:                         "Помести ред −50ms (D)",
    tipSyncLater:                           "Помести ред +50ms (F)",
    lblSyncEndOfLyrics:                     "Крај на текстот",
    lblSyncEndOfMusic:                      "Крај на музиката",

  },

  sr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Откажи",
    btnGlbYes:                              "Да",
    btnGlbNo:                               "Не",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна је нова верзија:",
    lnkUpdateWhatsNew:                      "Шта је ново",
    btnUpdateDownload:                      "Преузми",
    lnkUpdateSkip:                          "Прескочи ову верзију",
    tipUpdateDismiss:                       "Одбаци",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Превуците аудио или LRC фајл овде",
    cfmAppUnsavedTitle:                     "Несачуване измене",
    cfmAppUnsavedMsg:                       "Сачувати фајл пре наставка?",
    tstAppSaved:                            "Фајл је сачуван.",
    tstAppAutoLrcLoaded:                    "Фајл са текстом је аутоматски учитан.",
    tstAppFileError:                        "Отварање фајла није успело.",
    tstAppSaveError:                        "Чување фајла није успело.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Отвори музички фајл",
    ttlOsdOpenLyrics:                       "Отвори фајл са текстом",
    ttlOsdSaveLrcAs:                        "Сачувај LRC фајл као",
    ttlOsdSaveTxt:                          "Сачувај текстуални фајл",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Нови LRC фајл",
    tipHdrOpenMusic:                        "Отвори музички фајл",
    tipHdrOpenLyrics:                       "Отвори фајл са текстом (.lrc са временским ознакама или .txt)",
    tipHdrSaveLrc:                          "Сачувај LRC фајл",
    tipHdrSaveLrcAs:                        "Сачувај као нови .lrc фајл",
    tipHdrMeta:                             "Уреди метаподатке песме",
    btnHdrMeta:                             "Метаподаци",
    tipHdrSaveTxt:                          "Извези листу са текстом у .txt фајл",
    tipHdrSettings:                         "Отвори подешавања",
    tipHdrHelp:                             "Помоћ",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Означи тренутни ред временом плејера и пређи на следећи (Enter)",
    btnFtrSyncTime:                         "Синхр. врем.",
    lblFtrReactionDelay:                    "Кашњење реакције",
    tipFtrPlayPause:                        "Пусти / Паузирај (Размак)",
    tipFtrStop:                             "Заустави (Esc)",
    tipFtrVerify:                           "Провери - пусти и аутоматски напредује после кашњења провере",
    lblFtrVerificationDelay:                "Кашњење провере",
    tipFtrPrevStamp:                        "Претходна временска ознака",
    tipFtrNextStamp:                        "Следећа временска ознака",
    lblFtrSeekDelay:                        "Трајање скока",
    tipFtrSeekBack:                         "Назад за конфигурисане секунде (←)",
    tipFtrSeekNext:                         "Прескочите конфигурисане секунде унапред (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Подешавања",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsTime:                     "Време",
    tabDlgSettingsMeta:                     "Метаподаци",
    tabDlgSettingsAbout:                    "О апликацији",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Језик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тамна",
    btnDlgSettingsDisplayThemeLight:        "Светла",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Кашњење при уређивању",
    lblDlgSettingsTimeReactionDelay:        "Кашњење реакције",
    lblDlgSettingsTimeVerificationDelay:    "Кашњење провере",
    lblDlgSettingsTimeSeekDelay:            "Трајање скока",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Извођач",
    plhDlgSettingsMetaArtist:               "Ime извођача",
    lblDlgSettingsMetaSongwriter:           "Аутор",
    plhDlgSettingsMetaSongwriter:           "Текстописац / аутор",
    lblDlgSettingsMetaLrcBy:                "LRC направио",
    plhDlgSettingsMetaLrcBy:                "Творац LRC-а",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "креирајте синхронизоване фајлове са текстом песама.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Метаподаци",
    lblDlgMetaArtist:                       "Извођач",
    plhDlgMetaArtist:                       "Ime извођача",
    lblDlgMetaAlbum:                        "Албум",
    plhDlgMetaAlbum:                        "Назив албума",
    lblDlgMetaTitle:                        "Наслов",
    plhDlgMetaTitle:                        "Назив песме",
    lblDlgMetaSongwriter:                   "Аутор",
    plhDlgMetaSongwriter:                   "Текстописац / аутор",
    lblDlgMetaLrcBy:                        "LRC направио",
    plhDlgMetaLrcBy:                        "Творац LRC-а",
    lblDlgMetaOffsetMs:                     "Укупни помак (ms)",
    tipDlgMetaAutoFill:                     "Попуни метаподатке из ознака музичког фајла",
    btnDlgMetaAutoFill:                     "Аутоматско попуњавање",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Бележница",
    tipNotepadShow:                         "Прикажи бележницу",
    tipNotepadHide:                         "Сакриј бележницу",
    plhNotepad:                             "Налепите или откуцајте несинхронизовани текст овде…",
    btnNotepadSetLyrics:                    "Постави текст",
    tipNotepadSetLyrics:                    "Постави листу текста из бележнице",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Нова датотека",
    lblSyncLines:                           "редова",
    empSyncNoLrc:                           "Синхронизујте редове са музиком да бисте изградили LRC фајл.",
    lblSyncStartOfMusic:                    "Почетак музике",
    tipSyncEarlier:                         "Помери ред −50ms (D)",
    tipSyncLater:                           "Помери ред +50ms (F)",
    lblSyncEndOfLyrics:                     "Крај текста",
    lblSyncEndOfMusic:                      "Крај музике",

  },

  sk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Zrušiť",
    btnGlbYes:                              "Áno",
    btnGlbNo:                               "Nie",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "K dispozícii je nová verzia:",
    lnkUpdateWhatsNew:                      "Čo je nové",
    btnUpdateDownload:                      "Stiahnuť",
    lnkUpdateSkip:                          "Preskočiť túto verziu",
    tipUpdateDismiss:                       "Zavrieť",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Presuňte sem zvukový alebo LRC súbor",
    cfmAppUnsavedTitle:                     "Neuložené zmeny",
    cfmAppUnsavedMsg:                       "Uložiť súbor pred pokračovaním?",
    tstAppSaved:                            "Súbor uložený.",
    tstAppAutoLrcLoaded:                    "Súbor s textom bol načítaný automaticky.",
    tstAppFileError:                        "Nepodarilo sa otvoriť súbor.",
    tstAppSaveError:                        "Nepodarilo sa uložiť súbor.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Otvoriť hudobný súbor",
    ttlOsdOpenLyrics:                       "Otvoriť súbor s textom",
    ttlOsdSaveLrcAs:                        "Uložiť LRC súbor ako",
    ttlOsdSaveTxt:                          "Uložiť textový súbor",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nový LRC súbor",
    tipHdrOpenMusic:                        "Otvoriť hudobný súbor",
    tipHdrOpenLyrics:                       "Otvoriť súbor s textom (.lrc s časovými značkami alebo .txt)",
    tipHdrSaveLrc:                          "Uložiť LRC súbor",
    tipHdrSaveLrcAs:                        "Uložiť ako nový súbor .lrc",
    tipHdrMeta:                             "Upraviť metadáta skladby",
    btnHdrMeta:                             "Metadáta",
    tipHdrSaveTxt:                          "Exportovať zoznam textu do súboru .txt",
    tipHdrSettings:                         "Otvoriť nastavenia",
    tipHdrHelp:                             "Pomoc",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Označiť aktuálny riadok časom prehrávača a postúpiť (Enter)",
    btnFtrSyncTime:                         "Synchronizovať",
    lblFtrReactionDelay:                    "Oneskorenie reakcie",
    tipFtrPlayPause:                        "Prehrať / Pozastaviť (Medzerník)",
    tipFtrStop:                             "Zastaviť (Esc)",
    tipFtrVerify:                           "Overiť - prehrá a automaticky postúpi po oneskorení overenia",
    lblFtrVerificationDelay:                "Oneskorenie overenia",
    tipFtrPrevStamp:                        "Predchádzajúca časová značka",
    tipFtrNextStamp:                        "Nasledujúca časová značka",
    lblFtrSeekDelay:                        "Čas skoku",
    tipFtrSeekBack:                         "Späť o nakonfigurované sekundy (←)",
    tipFtrSeekNext:                         "Posunutʹ vpred o nastavené sekundy (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavenia",
    tabDlgSettingsDisplay:                  "Zobrazenie",
    tabDlgSettingsTime:                     "Čas",
    tabDlgSettingsMeta:                     "Metadáta",
    tabDlgSettingsAbout:                    "O programe",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Tmavá",
    btnDlgSettingsDisplayThemeLight:        "Svetlá",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Oneskorenie úpravy riadka",
    lblDlgSettingsTimeReactionDelay:        "Oneskorenie reakcie",
    lblDlgSettingsTimeVerificationDelay:    "Oneskorenie overenia",
    lblDlgSettingsTimeSeekDelay:            "Čas skoku",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Interpret",
    plhDlgSettingsMetaArtist:               "Meno interpreta",
    lblDlgSettingsMetaSongwriter:           "Autor",
    plhDlgSettingsMetaSongwriter:           "Textár / skladateľ",
    lblDlgSettingsMetaLrcBy:                "LRC vytvoril",
    plhDlgSettingsMetaLrcBy:                "Tvorca LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "vytvárať synchronizované súbory s textom piesní.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadáta",
    lblDlgMetaArtist:                       "Interpret",
    plhDlgMetaArtist:                       "Meno interpreta",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Názov albumu",
    lblDlgMetaTitle:                        "Názov",
    plhDlgMetaTitle:                        "Názov skladby",
    lblDlgMetaSongwriter:                   "Autor",
    plhDlgMetaSongwriter:                   "Textár / skladateľ",
    lblDlgMetaLrcBy:                        "LRC vytvoril",
    plhDlgMetaLrcBy:                        "Tvorca LRC",
    lblDlgMetaOffsetMs:                     "Globálny posun (ms)",
    tipDlgMetaAutoFill:                     "Vyplniť metadáta z tagov hudobného súboru",
    btnDlgMetaAutoFill:                     "Automatické vyplnenie",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Poznámkový blok",
    tipNotepadShow:                         "Zobraziť poznámkový blok",
    tipNotepadHide:                         "Skryť poznámkový blok",
    plhNotepad:                             "Vložte alebo napíšte nesynchronizovaný text sem…",
    btnNotepadSetLyrics:                    "Nastaviť text",
    tipNotepadSetLyrics:                    "Nastaviť zoznam textu z poznámkového bloku",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nový súbor",
    lblSyncLines:                           "riadkov",
    empSyncNoLrc:                           "Synchronizujte riadky s hudbou na vytvorenie LRC súboru.",
    lblSyncStartOfMusic:                    "Začiatok hudby",
    tipSyncEarlier:                         "Posunúť riadok −50ms (D)",
    tipSyncLater:                           "Posunúť riadok +50ms (F)",
    lblSyncEndOfLyrics:                     "Koniec textu",
    lblSyncEndOfMusic:                      "Koniec hudby",

  },

  sl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Prekliči",
    btnGlbYes:                              "Da",
    btnGlbNo:                               "Ne",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Na voljo je nova različica:",
    lnkUpdateWhatsNew:                      "Kaj je novega",
    btnUpdateDownload:                      "Prenesi",
    lnkUpdateSkip:                          "Preskoči to različico",
    tipUpdateDismiss:                       "Zavrni",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Spustite zvočno ali LRC datoteko sem",
    cfmAppUnsavedTitle:                     "Neshranjene spremembe",
    cfmAppUnsavedMsg:                       "Shraniti datoteko pred nadaljevanjem?",
    tstAppSaved:                            "Datoteka shranjena.",
    tstAppAutoLrcLoaded:                    "Datoteka z besedilom je bila samodejno naložena.",
    tstAppFileError:                        "Odpiranje datoteke ni uspelo.",
    tstAppSaveError:                        "Shranjevanje datoteke ni uspelo.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Odpri glasbeno datoteko",
    ttlOsdOpenLyrics:                       "Odpri datoteko z besedilom",
    ttlOsdSaveLrcAs:                        "Shrani datoteko LRC kot",
    ttlOsdSaveTxt:                          "Shrani besedilno datoteko",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nova datoteka LRC",
    tipHdrOpenMusic:                        "Odpri glasbeno datoteko",
    tipHdrOpenLyrics:                       "Odpri datoteko z besedilom (.lrc s časovnimi žigi ali .txt)",
    tipHdrSaveLrc:                          "Shrani datoteko LRC",
    tipHdrSaveLrcAs:                        "Shrani kot novo datoteko .lrc",
    tipHdrMeta:                             "Uredi metapodatke pesmi",
    btnHdrMeta:                             "Metapodatki",
    tipHdrSaveTxt:                          "Izvozi seznam besedil v datoteko .txt",
    tipHdrSettings:                         "Odpri nastavitve",
    tipHdrHelp:                             "Pomoč",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Označi trenutno vrstico s časom predvajalnika in nadaljuj (Enter)",
    btnFtrSyncTime:                         "Sinhroniziraj",
    lblFtrReactionDelay:                    "Zamik reakcije",
    tipFtrPlayPause:                        "Predvajaj / Premor (Presledek)",
    tipFtrStop:                             "Ustavi (Esc)",
    tipFtrVerify:                           "Preveri - predvaja in samodejno napreduje po zamiku preverjanja",
    lblFtrVerificationDelay:                "Zamik preverjanja",
    tipFtrPrevStamp:                        "Prejšnji časovni žig",
    tipFtrNextStamp:                        "Naslednji časovni žig",
    lblFtrSeekDelay:                        "Čas skoka",
    tipFtrSeekBack:                         "Nazaj za nastavljene sekunde (←)",
    tipFtrSeekNext:                         "Premakni naprej za nastavljene sekunde (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavitve",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsTime:                     "Čas",
    tabDlgSettingsMeta:                     "Metapodatki",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Temna",
    btnDlgSettingsDisplayThemeLight:        "Svetla",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Zamik urejanja vrstice",
    lblDlgSettingsTimeReactionDelay:        "Zamik reakcije",
    lblDlgSettingsTimeVerificationDelay:    "Zamik preverjanja",
    lblDlgSettingsTimeSeekDelay:            "Čas skoka",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Izvajalec",
    plhDlgSettingsMetaArtist:               "Ime izvajalca",
    lblDlgSettingsMetaSongwriter:           "Avtor",
    plhDlgSettingsMetaSongwriter:           "Pisec besedila / skladatelj",
    lblDlgSettingsMetaLrcBy:                "LRC ustvaril",
    plhDlgSettingsMetaLrcBy:                "Ustvarjalec LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ustvarjajte sinhronizirane datoteke z besedili pesmi.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metapodatki",
    lblDlgMetaArtist:                       "Izvajalec",
    plhDlgMetaArtist:                       "Ime izvajalca",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Ime albuma",
    lblDlgMetaTitle:                        "Naslov",
    plhDlgMetaTitle:                        "Naslov pesmi",
    lblDlgMetaSongwriter:                   "Avtor",
    plhDlgMetaSongwriter:                   "Pisec besedila / skladatelj",
    lblDlgMetaLrcBy:                        "LRC ustvaril",
    plhDlgMetaLrcBy:                        "Ustvarjalec LRC",
    lblDlgMetaOffsetMs:                     "Globalni zamik (ms)",
    tipDlgMetaAutoFill:                     "Izpolni metapodatke iz oznak glasbene datoteke",
    btnDlgMetaAutoFill:                     "Samodejno izpolni",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Beležnica",
    tipNotepadShow:                         "Prikaži beležnico",
    tipNotepadHide:                         "Skrij beležnico",
    plhNotepad:                             "Prilepite ali vnesite nesinhronizirana besedila tukaj…",
    btnNotepadSetLyrics:                    "Nastavi besedilo",
    tipNotepadSetLyrics:                    "Nastavi seznam besedil iz beležnice",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Nova datoteka",
    lblSyncLines:                           "vrstic",
    empSyncNoLrc:                           "Sinhronizirajte vrstice z glasbo za izgradnjo datoteke LRC.",
    lblSyncStartOfMusic:                    "Začetek glasbe",
    tipSyncEarlier:                         "Premakni vrstico −50ms (D)",
    tipSyncLater:                           "Premakni vrstico +50ms (F)",
    lblSyncEndOfLyrics:                     "Konec besedila",
    lblSyncEndOfMusic:                      "Konec glasbe",

  },

  ta: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "ரத்து செய்",
    btnGlbYes:                              "ஆம்",
    btnGlbNo:                               "இல்லை",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "புதிய பதிப்பு உள்ளது:",
    lnkUpdateWhatsNew:                      "புதியது என்ன",
    btnUpdateDownload:                      "பதிவிறக்கு",
    lnkUpdateSkip:                          "இந்த பதிப்பைத் தவிர்க்கவும்",
    tipUpdateDismiss:                       "நிராகரி",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "ஒரு ஆடியோ அல்லது LRC கோப்பை இங்கே இழுத்து விடுங்கள்",
    cfmAppUnsavedTitle:                     "சேமிக்கப்படாத மாற்றங்கள்",
    cfmAppUnsavedMsg:                       "தொடர்வதற்கு முன் தற்போதைய கோப்பை சேமிக்கவா?",
    tstAppSaved:                            "கோப்பு சேமிக்கப்பட்டது.",
    tstAppAutoLrcLoaded:                    "பாடல் வரிகள் கோப்பு தானாக ஏற்றப்பட்டது.",
    tstAppFileError:                        "கோப்பைத் திறக்க முடியவில்லை.",
    tstAppSaveError:                        "கோப்பை சேமிக்க முடியவில்லை.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "இசை கோப்பைத் திற",
    ttlOsdOpenLyrics:                       "பாடல் வரிகள் கோப்பைத் திற",
    ttlOsdSaveLrcAs:                        "LRC கோப்பை இவ்வாறு சேமி",
    ttlOsdSaveTxt:                          "உரை கோப்பை சேமி",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "புதிய LRC கோப்பு",
    tipHdrOpenMusic:                        "இசை கோப்பைத் திற",
    tipHdrOpenLyrics:                       "பாடல் வரிகள் கோப்பைத் திற (.lrc நேர முத்திரைகளுடன் அல்லது .txt)",
    tipHdrSaveLrc:                          "LRC கோப்பை சேமி",
    tipHdrSaveLrcAs:                        "புதிய .lrc கோப்பாக சேமி",
    tipHdrMeta:                             "பாடலின் மெட்டாத் தரவை திருத்து",
    btnHdrMeta:                             "மெட்டாத் தரவு",
    tipHdrSaveTxt:                          "பாடல் வரிகள் பட்டியலை .txt கோப்பாக ஏற்றுமதி செய்",
    tipHdrSettings:                         "அமைப்புகளை திற",
    tipHdrHelp:                             "உதவி",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "தற்போதைய வரியை இயக்க நேரத்துடன் முத்திரையிட்டு முன்னேறு (Enter)",
    btnFtrSyncTime:                         "நேரம் ஒத்திசை",
    lblFtrReactionDelay:                    "எதிர்வினை தாமதம்",
    tipFtrPlayPause:                        "இயக்கு / இடைநிறுத்து (இடைவெளி)",
    tipFtrStop:                             "நிறுத்து (Esc)",
    tipFtrVerify:                           "சரிபார் - சரிபார்ப்பு தாமதத்திற்குப் பிறகு தானாக முன்னேறும்",
    lblFtrVerificationDelay:                "சரிபார்ப்பு தாமதம்",
    tipFtrPrevStamp:                        "முந்தைய நேர முத்திரை",
    tipFtrNextStamp:                        "அடுத்த நேர முத்திரை",
    lblFtrSeekDelay:                        "தாவல் நேரம்",
    tipFtrSeekBack:                         "கட்டமைக்கப்பட்ட வினாடிகளால் பின்னோக்கி (←)",
    tipFtrSeekNext:                         "கட்டமைக்கப்பட்ட விநாடிகள் முன்னோக்கி செல் (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "அமைப்புகள்",
    tabDlgSettingsDisplay:                  "காட்சி",
    tabDlgSettingsTime:                     "நேரம்",
    tabDlgSettingsMeta:                     "மெட்டாத் தரவு",
    tabDlgSettingsAbout:                    "பற்றி",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "மொழி",
    lblDlgSettingsDisplayTheme:             "தீம்",
    btnDlgSettingsDisplayThemeDark:         "இருண்ட",
    btnDlgSettingsDisplayThemeLight:        "வெளிச்சமான",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "வரி திருத்த தாமதம்",
    lblDlgSettingsTimeReactionDelay:        "எதிர்வினை தாமதம்",
    lblDlgSettingsTimeVerificationDelay:    "சரிபார்ப்பு தாமதம்",
    lblDlgSettingsTimeSeekDelay:            "தாவல் நேரம்",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "கலைஞர்",
    plhDlgSettingsMetaArtist:               "கலைஞரின் பெயர்",
    lblDlgSettingsMetaSongwriter:           "பாடலாசிரியர்",
    plhDlgSettingsMetaSongwriter:           "வரிகள் ஆசிரியர் / இசையமைப்பாளர்",
    lblDlgSettingsMetaLrcBy:                "LRC உருவாக்கியவர்",
    plhDlgSettingsMetaLrcBy:                "LRC உருவாக்குனர்",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ஒத்திசைக்கப்பட்ட பாடல் வரிகள் கோப்புகளை உருவாக்குங்கள்.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "மெட்டாத் தரவு",
    lblDlgMetaArtist:                       "கலைஞர்",
    plhDlgMetaArtist:                       "கலைஞரின் பெயர்",
    lblDlgMetaAlbum:                        "ஆல்பம்",
    plhDlgMetaAlbum:                        "ஆல்பத்தின் பெயர்",
    lblDlgMetaTitle:                        "தலைப்பு",
    plhDlgMetaTitle:                        "பாடலின் தலைப்பு",
    lblDlgMetaSongwriter:                   "பாடலாசிரியர்",
    plhDlgMetaSongwriter:                   "வரிகள் ஆசிரியர் / இசையமைப்பாளர்",
    lblDlgMetaLrcBy:                        "LRC உருவாக்கியவர்",
    plhDlgMetaLrcBy:                        "LRC உருவாக்குனர்",
    lblDlgMetaOffsetMs:                     "உலகளாவிய ஆஃப்செட் (ms)",
    tipDlgMetaAutoFill:                     "இசை கோப்பு குறிச்சொற்களிலிருந்து மெட்டாத் தரவை நிரப்பு",
    btnDlgMetaAutoFill:                     "தானாக நிரப்பு",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "குறிப்பேடு",
    tipNotepadShow:                         "குறிப்பேட்டை காட்டு",
    tipNotepadHide:                         "குறிப்பேட்டை மறை",
    plhNotepad:                             "ஒத்திசைக்கப்படாத பாடல் வரிகளை இங்கே ஒட்டவும் அல்லது தட்டச்சு செய்யவும்…",
    btnNotepadSetLyrics:                    "பாடல் வரிகளை அமை",
    tipNotepadSetLyrics:                    "குறிப்பேட்டிலிருந்து பாடல் வரிகள் பட்டியலை அமை",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "புதிய கோப்பு",
    lblSyncLines:                           "வரிகள்",
    empSyncNoLrc:                           "LRC கோப்பை உருவாக்க இசையுடன் வரிகளை ஒத்திசை செய்யுங்கள்.",
    lblSyncStartOfMusic:                    "இசையின் தொடக்கம்",
    tipSyncEarlier:                         "தேர்ந்த வரியை −50ms நகர்த்து (D)",
    tipSyncLater:                           "தேர்ந்த வரியை +50ms நகர்த்து (F)",
    lblSyncEndOfLyrics:                     "பாடல் வரிகளின் முடிவு",
    lblSyncEndOfMusic:                      "இசையின் முடிவு",

  },

  hi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "रद्द करें",
    btnGlbYes:                              "हाँ",
    btnGlbNo:                               "नहीं",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नया संस्करण उपलब्ध है:",
    lnkUpdateWhatsNew:                      "नया क्या है",
    btnUpdateDownload:                      "डाउनलोड करें",
    lnkUpdateSkip:                          "इस संस्करण को छोड़ें",
    tipUpdateDismiss:                       "खारिज करें",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "यहाँ ऑडियो या LRC फ़ाइल छोड़ें",
    cfmAppUnsavedTitle:                     "असहेजे परिवर्तन",
    cfmAppUnsavedMsg:                       "जारी रखने से पहले फ़ाइल सहेजें?",
    tstAppSaved:                            "फ़ाइल सहेजी गई।",
    tstAppAutoLrcLoaded:                    "गीत फ़ाइल स्वचालित रूप से लोड हुई।",
    tstAppFileError:                        "फ़ाइल खोलने में विफल।",
    tstAppSaveError:                        "फ़ाइल सहेजने में विफल।",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "संगीत फ़ाइल खोलें",
    ttlOsdOpenLyrics:                       "गीत फ़ाइल खोलें",
    ttlOsdSaveLrcAs:                        "LRC फ़ाइल इस रूप में सहेजें",
    ttlOsdSaveTxt:                          "टेक्स्ट फ़ाइल सहेजें",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "नई LRC फ़ाइल",
    tipHdrOpenMusic:                        "संगीत फ़ाइल खोलें",
    tipHdrOpenLyrics:                       "गीत फ़ाइल खोलें (.lrc टाइमस्टैम्प के साथ या .txt)",
    tipHdrSaveLrc:                          "LRC फ़ाइल सहेजें",
    tipHdrSaveLrcAs:                        "नई .lrc फ़ाइल के रूप में सहेजें",
    tipHdrMeta:                             "गाने का मेटाडेटा संपादित करें",
    btnHdrMeta:                             "मेटाडेटा",
    tipHdrSaveTxt:                          "गीत सूची को .txt फ़ाइल में निर्यात करें",
    tipHdrSettings:                         "सेटिंग्स खोलें",
    tipHdrHelp:                             "सहायता",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "वर्तमान पंक्ति को प्लेयर समय से टैग करें और आगे बढ़ें (Enter)",
    btnFtrSyncTime:                         "समय सिंक",
    lblFtrReactionDelay:                    "प्रतिक्रिया विलंब",
    tipFtrPlayPause:                        "चलाएं / रोकें (स्पेस)",
    tipFtrStop:                             "रोकें (Esc)",
    tipFtrVerify:                           "सत्यापित करें - सत्यापन विलंब के बाद स्वचालित रूप से आगे बढ़ता है",
    lblFtrVerificationDelay:                "सत्यापन विलंब",
    tipFtrPrevStamp:                        "पिछला टाइमस्टैम्प",
    tipFtrNextStamp:                        "अगला टाइमस्टैम्प",
    lblFtrSeekDelay:                        "जम्प समय",
    tipFtrSeekBack:                         "कॉन्फ़िगर किए गए सेकंड पीछे (←)",
    tipFtrSeekNext:                         "निर्धारित सेकंड आगे जाएं (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्स",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsTime:                     "समय",
    tabDlgSettingsMeta:                     "मेटाडेटा",
    tabDlgSettingsAbout:                    "के बारे में",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "डार्क",
    btnDlgSettingsDisplayThemeLight:        "लाइट",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "लाइन संपादन विलंब",
    lblDlgSettingsTimeReactionDelay:        "प्रतिक्रिया विलंब",
    lblDlgSettingsTimeVerificationDelay:    "सत्यापन विलंब",
    lblDlgSettingsTimeSeekDelay:            "जम्प समय",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "कलाकार",
    plhDlgSettingsMetaArtist:               "कलाकार का नाम",
    lblDlgSettingsMetaSongwriter:           "गीतकार",
    plhDlgSettingsMetaSongwriter:           "गीतकार / संगीतकार",
    lblDlgSettingsMetaLrcBy:                "LRC द्वारा",
    plhDlgSettingsMetaLrcBy:                "LRC निर्माता",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "समन्वित गीत फ़ाइलें बनाएं।",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "मेटाडेटा",
    lblDlgMetaArtist:                       "कलाकार",
    plhDlgMetaArtist:                       "कलाकार का नाम",
    lblDlgMetaAlbum:                        "एल्बम",
    plhDlgMetaAlbum:                        "एल्बम का नाम",
    lblDlgMetaTitle:                        "शीर्षक",
    plhDlgMetaTitle:                        "गाने का शीर्षक",
    lblDlgMetaSongwriter:                   "गीतकार",
    plhDlgMetaSongwriter:                   "गीतकार / संगीतकार",
    lblDlgMetaLrcBy:                        "LRC द्वारा",
    plhDlgMetaLrcBy:                        "LRC निर्माता",
    lblDlgMetaOffsetMs:                     "वैश्विक ऑफसेट (ms)",
    tipDlgMetaAutoFill:                     "संगीत फ़ाइल टैग से मेटाडेटा भरें",
    btnDlgMetaAutoFill:                     "स्वतः भरें",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "नोटपैड",
    tipNotepadShow:                         "नोटपैड दिखाएं",
    tipNotepadHide:                         "नोटपैड छुपाएं",
    plhNotepad:                             "असंक्रमित गीत यहाँ पेस्ट करें या टाइप करें…",
    btnNotepadSetLyrics:                    "गीत सेट करें",
    tipNotepadSetLyrics:                    "नोटपैड से गीत सूची सेट करें",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "नई फ़ाइल",
    lblSyncLines:                           "पंक्तियाँ",
    empSyncNoLrc:                           "LRC फ़ाइल बनाने के लिए संगीत के साथ पंक्तियाँ सिंक करें।",
    lblSyncStartOfMusic:                    "संगीत की शुरुआत",
    tipSyncEarlier:                         "चयनित पंक्ति −50ms (D)",
    tipSyncLater:                           "चयनित पंक्ति +50ms (F)",
    lblSyncEndOfLyrics:                     "गीत का अंत",
    lblSyncEndOfMusic:                      "संगीत का अंत",

  },

  bn: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "বাতিল করুন",
    btnGlbYes:                              "হ্যাঁ",
    btnGlbNo:                               "না",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "নতুন সংস্করণ উপলব্ধ:",
    lnkUpdateWhatsNew:                      "নতুন কি আছে",
    btnUpdateDownload:                      "ডাউনলোড করুন",
    lnkUpdateSkip:                          "এই সংস্করণটি এড়িয়ে যান",
    tipUpdateDismiss:                       "খারিজ করুন",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "এখানে অডিও বা LRC ফাইল ড্রপ করুন",
    cfmAppUnsavedTitle:                     "অসংরক্ষিত পরিবর্তন",
    cfmAppUnsavedMsg:                       "চালিয়ে যাওয়ার আগে ফাইল সংরক্ষণ করবেন?",
    tstAppSaved:                            "ফাইল সংরক্ষিত হয়েছে।",
    tstAppAutoLrcLoaded:                    "গানের কথার ফাইল স্বয়ংক্রিয়ভাবে লোড হয়েছে।",
    tstAppFileError:                        "ফাইল খুলতে ব্যর্থ।",
    tstAppSaveError:                        "ফাইল সংরক্ষণ করতে ব্যর্থ।",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "সংগীত ফাইল খুলুন",
    ttlOsdOpenLyrics:                       "গানের কথার ফাইল খুলুন",
    ttlOsdSaveLrcAs:                        "LRC ফাইল হিসেবে সংরক্ষণ করুন",
    ttlOsdSaveTxt:                          "টেক্সট ফাইল সংরক্ষণ করুন",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "নতুন LRC ফাইল",
    tipHdrOpenMusic:                        "সংগীত ফাইল খুলুন",
    tipHdrOpenLyrics:                       "গানের কথার ফাইল খুলুন (.lrc টাইমস্ট্যাম্প সহ বা .txt)",
    tipHdrSaveLrc:                          "LRC ফাইল সংরক্ষণ করুন",
    tipHdrSaveLrcAs:                        "নতুন .lrc ফাইল হিসেবে সংরক্ষণ করুন",
    tipHdrMeta:                             "গানের মেটাডেটা সম্পাদনা করুন",
    btnHdrMeta:                             "মেটাডেটা",
    tipHdrSaveTxt:                          "গানের কথার তালিকা .txt ফাইলে রপ্তানি করুন",
    tipHdrSettings:                         "সেটিংস খুলুন",
    tipHdrHelp:                             "সাহায্য",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "বর্তমান লাইনকে প্লেয়ার সময় দিয়ে চিহ্নিত করুন এবং এগিয়ে যান (Enter)",
    btnFtrSyncTime:                         "সময় সিঙ্ক",
    lblFtrReactionDelay:                    "প্রতিক্রিয়া বিলম্ব",
    tipFtrPlayPause:                        "চালান / বিরতি দিন (স্পেস)",
    tipFtrStop:                             "থামুন (Esc)",
    tipFtrVerify:                           "যাচাই করুন - যাচাইকরণ বিলম্বের পরে স্বয়ংক্রিয়ভাবে এগিয়ে যায়",
    lblFtrVerificationDelay:                "যাচাইকরণ বিলম্ব",
    tipFtrPrevStamp:                        "পূর্ববর্তী টাইমস্ট্যাম্প",
    tipFtrNextStamp:                        "পরবর্তী টাইমস্ট্যাম্প",
    lblFtrSeekDelay:                        "জাম্প সময়",
    tipFtrSeekBack:                         "কনফিগার করা সেকেন্ড পিছনে যান (←)",
    tipFtrSeekNext:                         "নির্ধারিত সেকেন্ড এগিয়ে যান (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "সেটিংস",
    tabDlgSettingsDisplay:                  "প্রদর্শন",
    tabDlgSettingsTime:                     "সময়",
    tabDlgSettingsMeta:                     "মেটাডেটা",
    tabDlgSettingsAbout:                    "সম্পর্কে",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ভাষা",
    lblDlgSettingsDisplayTheme:             "থিম",
    btnDlgSettingsDisplayThemeDark:         "ডার্ক",
    btnDlgSettingsDisplayThemeLight:        "লাইট",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "লাইন সম্পাদনা বিলম্ব",
    lblDlgSettingsTimeReactionDelay:        "প্রতিক্রিয়া বিলম্ব",
    lblDlgSettingsTimeVerificationDelay:    "যাচাইকরণ বিলম্ব",
    lblDlgSettingsTimeSeekDelay:            "জাম্প সময়",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "শিল্পী",
    plhDlgSettingsMetaArtist:               "শিল্পীর নাম",
    lblDlgSettingsMetaSongwriter:           "গীতিকার",
    plhDlgSettingsMetaSongwriter:           "গীতিকার / সুরকার",
    lblDlgSettingsMetaLrcBy:                "LRC তৈরি করেছেন",
    plhDlgSettingsMetaLrcBy:                "LRC নির্মাতা",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "সমন্বিত গানের কথার ফাইল তৈরি করুন।",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "মেটাডেটা",
    lblDlgMetaArtist:                       "শিল্পী",
    plhDlgMetaArtist:                       "শিল্পীর নাম",
    lblDlgMetaAlbum:                        "অ্যালবাম",
    plhDlgMetaAlbum:                        "অ্যালবামের নাম",
    lblDlgMetaTitle:                        "শিরোনাম",
    plhDlgMetaTitle:                        "গানের শিরোনাম",
    lblDlgMetaSongwriter:                   "গীতিকার",
    plhDlgMetaSongwriter:                   "গীতিকার / সুরকার",
    lblDlgMetaLrcBy:                        "LRC তৈরি করেছেন",
    plhDlgMetaLrcBy:                        "LRC নির্মাতা",
    lblDlgMetaOffsetMs:                     "বৈশ্বিক অফসেট (ms)",
    tipDlgMetaAutoFill:                     "সংগীত ফাইলের ট্যাগ থেকে মেটাডেটা পূরণ করুন",
    btnDlgMetaAutoFill:                     "স্বয়ংক্রিয় পূরণ",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "নোটপ্যাড",
    tipNotepadShow:                         "নোটপ্যাড দেখান",
    tipNotepadHide:                         "নোটপ্যাড লুকান",
    plhNotepad:                             "অসংক্রমিত গানের কথা এখানে পেস্ট করুন বা টাইপ করুন…",
    btnNotepadSetLyrics:                    "গানের কথা সেট করুন",
    tipNotepadSetLyrics:                    "নোটপ্যাড থেকে গানের কথার তালিকা সেট করুন",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "নতুন ফাইল",
    lblSyncLines:                           "লাইন",
    empSyncNoLrc:                           "LRC ফাইল তৈরি করতে সংগীতের সাথে লাইনগুলি সিঙ্ক করুন।",
    lblSyncStartOfMusic:                    "সংগীতের শুরু",
    tipSyncEarlier:                         "নির্বাচিত লাইন −50ms (D)",
    tipSyncLater:                           "নির্বাচিত লাইন +50ms (F)",
    lblSyncEndOfLyrics:                     "গানের কথার শেষ",
    lblSyncEndOfMusic:                      "সংগীতের শেষ",

  },

  ur: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "منسوخ کریں",
    btnGlbYes:                              "ہاں",
    btnGlbNo:                               "نہیں",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نیا ورژن دستیاب ہے:",
    lnkUpdateWhatsNew:                      "نیا کیا ہے",
    btnUpdateDownload:                      "ڈاؤن لوڈ کریں",
    lnkUpdateSkip:                          "اس ورژن کو چھوڑ دیں",
    tipUpdateDismiss:                       "مسترد کریں",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "یہاں آڈیو یا LRC فائل ڈراپ کریں",
    cfmAppUnsavedTitle:                     "غیر محفوظ تبدیلیاں",
    cfmAppUnsavedMsg:                       "جاری رکھنے سے پہلے فائل محفوظ کریں؟",
    tstAppSaved:                            "فائل محفوظ ہو گئی۔",
    tstAppAutoLrcLoaded:                    "گانے کی فائل خودکار طور پر لوڈ ہو گئی۔",
    tstAppFileError:                        "فائل کھولنے میں ناکامی۔",
    tstAppSaveError:                        "فائل محفوظ کرنے میں ناکامی۔",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "موسیقی فائل کھولیں",
    ttlOsdOpenLyrics:                       "گانے کی فائل کھولیں",
    ttlOsdSaveLrcAs:                        "LRC فائل اس طرح محفوظ کریں",
    ttlOsdSaveTxt:                          "متن فائل محفوظ کریں",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "نئی LRC فائل",
    tipHdrOpenMusic:                        "موسیقی فائل کھولیں",
    tipHdrOpenLyrics:                       "گانے کی فائل کھولیں (.lrc ٹائم اسٹیمپ کے ساتھ یا .txt)",
    tipHdrSaveLrc:                          "LRC فائل محفوظ کریں",
    tipHdrSaveLrcAs:                        "نئی .lrc فائل کے طور پر محفوظ کریں",
    tipHdrMeta:                             "گانے کا میٹا ڈیٹا ترمیم کریں",
    btnHdrMeta:                             "میٹا ڈیٹا",
    tipHdrSaveTxt:                          "گانوں کی فہرست .txt فائل میں برآمد کریں",
    tipHdrSettings:                         "ترتیبات کھولیں",
    tipHdrHelp:                             "مدد",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "موجودہ لائن کو پلیئر وقت سے نشان زد کریں اور آگے بڑھیں (Enter)",
    btnFtrSyncTime:                         "وقت سنک",
    lblFtrReactionDelay:                    "رد عمل کی تاخیر",
    tipFtrPlayPause:                        "چلائیں / روکیں (اسپیس)",
    tipFtrStop:                             "بند کریں (Esc)",
    tipFtrVerify:                           "تصدیق کریں - تصدیق تاخیر کے بعد خودکار طور پر آگے بڑھتا ہے",
    lblFtrVerificationDelay:                "تصدیق کی تاخیر",
    tipFtrPrevStamp:                        "پچھلا ٹائم اسٹیمپ",
    tipFtrNextStamp:                        "اگلا ٹائم اسٹیمپ",
    lblFtrSeekDelay:                        "جمپ وقت",
    tipFtrSeekBack:                         "ترتیب دیے گئے سیکنڈ پیچھے جائیں (←)",
    tipFtrSeekNext:                         "طے شدہ سیکنڈ آگے جائیں (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ترتیبات",
    tabDlgSettingsDisplay:                  "ڈسپلے",
    tabDlgSettingsTime:                     "وقت",
    tabDlgSettingsMeta:                     "میٹا ڈیٹا",
    tabDlgSettingsAbout:                    "کے بارے میں",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "تھیم",
    btnDlgSettingsDisplayThemeDark:         "گہرا",
    btnDlgSettingsDisplayThemeLight:        "روشن",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "لائن ترمیم تاخیر",
    lblDlgSettingsTimeReactionDelay:        "رد عمل کی تاخیر",
    lblDlgSettingsTimeVerificationDelay:    "تصدیق کی تاخیر",
    lblDlgSettingsTimeSeekDelay:            "جمپ وقت",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "فنکار",
    plhDlgSettingsMetaArtist:               "فنکار کا نام",
    lblDlgSettingsMetaSongwriter:           "نغمہ نگار",
    plhDlgSettingsMetaSongwriter:           "نغمہ نگار / موسیقار",
    lblDlgSettingsMetaLrcBy:                "LRC بنانے والا",
    plhDlgSettingsMetaLrcBy:                "LRC بنانے والا",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ہم آہنگ گانوں کی فائلیں بنائیں۔",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "میٹا ڈیٹا",
    lblDlgMetaArtist:                       "فنکار",
    plhDlgMetaArtist:                       "فنکار کا نام",
    lblDlgMetaAlbum:                        "البم",
    plhDlgMetaAlbum:                        "البم کا نام",
    lblDlgMetaTitle:                        "عنوان",
    plhDlgMetaTitle:                        "گانے کا عنوان",
    lblDlgMetaSongwriter:                   "نغمہ نگار",
    plhDlgMetaSongwriter:                   "نغمہ نگار / موسیقار",
    lblDlgMetaLrcBy:                        "LRC بنانے والا",
    plhDlgMetaLrcBy:                        "LRC بنانے والا",
    lblDlgMetaOffsetMs:                     "عالمی آفسیٹ (ms)",
    tipDlgMetaAutoFill:                     "موسیقی فائل ٹیگز سے میٹا ڈیٹا بھریں",
    btnDlgMetaAutoFill:                     "خودکار بھریں",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "نوٹ پیڈ",
    tipNotepadShow:                         "نوٹ پیڈ دکھائیں",
    tipNotepadHide:                         "نوٹ پیڈ چھپائیں",
    plhNotepad:                             "غیر مطابقت پذیر گانے یہاں چسپاں کریں یا ٹائپ کریں…",
    btnNotepadSetLyrics:                    "گانے سیٹ کریں",
    tipNotepadSetLyrics:                    "نوٹ پیڈ سے گانوں کی فہرست سیٹ کریں",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "نئی فائل",
    lblSyncLines:                           "لائنیں",
    empSyncNoLrc:                           "LRC فائل بنانے کے لیے موسیقی کے ساتھ لائنیں سنک کریں۔",
    lblSyncStartOfMusic:                    "موسیقی کا آغاز",
    tipSyncEarlier:                         "منتخب لائن −50ms (D)",
    tipSyncLater:                           "منتخب لائن +50ms (F)",
    lblSyncEndOfLyrics:                     "گانوں کا اختتام",
    lblSyncEndOfMusic:                      "موسیقی کا اختتام",

  },

  sw: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Ghairi",
    btnGlbYes:                              "Ndiyo",
    btnGlbNo:                               "Hapana",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Toleo jipya linapatikana:",
    lnkUpdateWhatsNew:                      "Nini kipya",
    btnUpdateDownload:                      "Pakua",
    lnkUpdateSkip:                          "Ruka toleo hili",
    tipUpdateDismiss:                       "Futa",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Dondosha faili la sauti au LRC hapa",
    cfmAppUnsavedTitle:                     "Mabadiliko ambayo hayajahifadhiwa",
    cfmAppUnsavedMsg:                       "Hifadhi faili la sasa kabla ya kuendelea?",
    tstAppSaved:                            "Faili limehifadhiwa.",
    tstAppAutoLrcLoaded:                    "Faili la maneno limepakiwa kiotomatiki.",
    tstAppFileError:                        "Imeshindwa kufungua faili.",
    tstAppSaveError:                        "Imeshindwa kuhifadhi faili.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Fungua faili la muziki",
    ttlOsdOpenLyrics:                       "Fungua faili la maneno",
    ttlOsdSaveLrcAs:                        "Hifadhi faili la LRC kama",
    ttlOsdSaveTxt:                          "Hifadhi faili la maandishi",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Faili mpya la LRC",
    tipHdrOpenMusic:                        "Fungua faili la muziki",
    tipHdrOpenLyrics:                       "Fungua faili la maneno ya wimbo (.lrc na alama za wakati au .txt)",
    tipHdrSaveLrc:                          "Hifadhi faili la LRC",
    tipHdrSaveLrcAs:                        "Hifadhi kama faili jipya la .lrc",
    tipHdrMeta:                             "Hariri metadata ya wimbo",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "Hamisha orodha ya maneno kwenye faili la .txt",
    tipHdrSettings:                         "Fungua mipangilio",
    tipHdrHelp:                             "Msaada",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Weka alama ya mstari wa sasa na wakati wa mchezaji na endelea (Enter)",
    btnFtrSyncTime:                         "Sawazisha wakati",
    lblFtrReactionDelay:                    "Kuchelewa kwa majibu",
    tipFtrPlayPause:                        "Cheza / Simamisha (Nafasi)",
    tipFtrStop:                             "Simama (Esc)",
    tipFtrVerify:                           "Thibitisha - inacheza na kuendelea kiotomatiki baada ya kuchelewa kwa uthibitisho",
    lblFtrVerificationDelay:                "Kuchelewa kwa uthibitisho",
    tipFtrPrevStamp:                        "Alama ya wakati iliyopita",
    tipFtrNextStamp:                        "Alama ya wakati inayofuata",
    lblFtrSeekDelay:                        "Muda wa kuruka",
    tipFtrSeekBack:                         "Rudi nyuma kwa sekunde zilizowekwa (←)",
    tipFtrSeekNext:                         "Ruka sekunde zilizosanidiwa mbele (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mipangilio",
    tabDlgSettingsDisplay:                  "Onyesho",
    tabDlgSettingsTime:                     "Wakati",
    tabDlgSettingsMeta:                     "Meta",
    tabDlgSettingsAbout:                    "Kuhusu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lugha",
    lblDlgSettingsDisplayTheme:             "Mandhari",
    btnDlgSettingsDisplayThemeDark:         "Giza",
    btnDlgSettingsDisplayThemeLight:        "Mwanga",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Kuchelewa kwa uhariri wa mstari",
    lblDlgSettingsTimeReactionDelay:        "Kuchelewa kwa majibu",
    lblDlgSettingsTimeVerificationDelay:    "Kuchelewa kwa uthibitisho",
    lblDlgSettingsTimeSeekDelay:            "Muda wa kuruka",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Msanii",
    plhDlgSettingsMetaArtist:               "Jina la msanii",
    lblDlgSettingsMetaSongwriter:           "Mwandishi wa wimbo",
    plhDlgSettingsMetaSongwriter:           "Mwandishi wa maneno / mtunzi",
    lblDlgSettingsMetaLrcBy:                "LRC na",
    plhDlgSettingsMetaLrcBy:                "Mtengenezaji wa LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "unda faili za maneno ya wimbo zilizosawazishwa.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Msanii",
    plhDlgMetaArtist:                       "Jina la msanii",
    lblDlgMetaAlbum:                        "Albamu",
    plhDlgMetaAlbum:                        "Jina la albamu",
    lblDlgMetaTitle:                        "Kichwa",
    plhDlgMetaTitle:                        "Kichwa cha wimbo",
    lblDlgMetaSongwriter:                   "Mwandishi wa wimbo",
    plhDlgMetaSongwriter:                   "Mwandishi wa maneno / mtunzi",
    lblDlgMetaLrcBy:                        "LRC na",
    plhDlgMetaLrcBy:                        "Mtengenezaji wa LRC",
    lblDlgMetaOffsetMs:                     "Ofiseti ya jumla (ms)",
    tipDlgMetaAutoFill:                     "Jaza metadata kutoka kwa lebo za faili la muziki",
    btnDlgMetaAutoFill:                     "Jaza kiotomatiki",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Kumbukumbu",
    tipNotepadShow:                         "Onyesha kumbukumbu",
    tipNotepadHide:                         "Ficha kumbukumbu",
    plhNotepad:                             "Bandika au andika maneno yasiyosawazishwa hapa…",
    btnNotepadSetLyrics:                    "Weka maneno",
    tipNotepadSetLyrics:                    "Weka orodha ya maneno kutoka kumbukumbu",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Faili mpya",
    lblSyncLines:                           "mistari",
    empSyncNoLrc:                           "Sawazisha mistari na muziki ili kuunda faili la LRC.",
    lblSyncStartOfMusic:                    "Mwanzo wa muziki",
    tipSyncEarlier:                         "Sogeza mstari −50ms (D)",
    tipSyncLater:                           "Sogeza mstari +50ms (F)",
    lblSyncEndOfLyrics:                     "Mwisho wa maneno",
    lblSyncEndOfMusic:                      "Mwisho wa muziki",

  },

  pa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "ਰੱਦ ਕਰੋ",
    btnGlbYes:                              "ਹਾਂ",
    btnGlbNo:                               "ਨਹੀਂ",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "ਨਵਾਂ ਸੰਸਕਰਨ ਉਪਲਬਧ ਹੈ:",
    lnkUpdateWhatsNew:                      "ਨਵਾਂ ਕੀ ਹੈ",
    btnUpdateDownload:                      "ਡਾਊਨਲੋਡ ਕਰੋ",
    lnkUpdateSkip:                          "ਇਸ ਸੰਸਕਰਨ ਨੂੰ ਛੱਡੋ",
    tipUpdateDismiss:                       "ਖਾਰਜ ਕਰੋ",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "ਇੱਥੇ ਆਡੀਓ ਜਾਂ LRC ਫਾਈਲ ਛੱਡੋ",
    cfmAppUnsavedTitle:                     "ਅਣਸੁਰੱਖਿਅਤ ਬਦਲਾਅ",
    cfmAppUnsavedMsg:                       "ਜਾਰੀ ਰੱਖਣ ਤੋਂ ਪਹਿਲਾਂ ਫਾਈਲ ਸੰਭਾਲੋ?",
    tstAppSaved:                            "ਫਾਈਲ ਸੁਰੱਖਿਅਤ ਹੋ ਗਈ।",
    tstAppAutoLrcLoaded:                    "ਗੀਤ ਫਾਈਲ ਆਪਣੇ ਆਪ ਲੋਡ ਹੋ ਗਈ।",
    tstAppFileError:                        "ਫਾਈਲ ਖੋਲ੍ਹਣ ਵਿੱਚ ਅਸਫਲ।",
    tstAppSaveError:                        "ਫਾਈਲ ਸੰਭਾਲਣ ਵਿੱਚ ਅਸਫਲ।",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "ਸੰਗੀਤ ਫਾਈਲ ਖੋਲ੍ਹੋ",
    ttlOsdOpenLyrics:                       "ਗੀਤ ਫਾਈਲ ਖੋਲ੍ਹੋ",
    ttlOsdSaveLrcAs:                        "LRC ਫਾਈਲ ਇਸ ਤਰ੍ਹਾਂ ਸੰਭਾਲੋ",
    ttlOsdSaveTxt:                          "ਟੈਕਸਟ ਫਾਈਲ ਸੰਭਾਲੋ",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "ਨਵੀਂ LRC ਫਾਈਲ",
    tipHdrOpenMusic:                        "ਸੰਗੀਤ ਫਾਈਲ ਖੋਲ੍ਹੋ",
    tipHdrOpenLyrics:                       "ਗੀਤ ਫਾਈਲ ਖੋਲ੍ਹੋ (.lrc ਟਾਈਮਸਟੈਂਪ ਨਾਲ ਜਾਂ .txt)",
    tipHdrSaveLrc:                          "LRC ਫਾਈਲ ਸੰਭਾਲੋ",
    tipHdrSaveLrcAs:                        "ਨਵੀਂ .lrc ਫਾਈਲ ਵਜੋਂ ਸੰਭਾਲੋ",
    tipHdrMeta:                             "ਗੀਤ ਦਾ ਮੈਟਾਡੇਟਾ ਸੰਪਾਦਿਤ ਕਰੋ",
    btnHdrMeta:                             "ਮੈਟਾਡੇਟਾ",
    tipHdrSaveTxt:                          "ਗੀਤ ਸੂਚੀ .txt ਫਾਈਲ ਵਿੱਚ ਨਿਰਯਾਤ ਕਰੋ",
    tipHdrSettings:                         "ਸੈਟਿੰਗਾਂ ਖੋਲ੍ਹੋ",
    tipHdrHelp:                             "ਮਦਦ",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "ਮੌਜੂਦਾ ਲਾਈਨ ਨੂੰ ਪਲੇਅਰ ਸਮੇਂ ਨਾਲ ਮਾਰਕ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ (Enter)",
    btnFtrSyncTime:                         "ਸਮਾਂ ਸਿੰਕ",
    lblFtrReactionDelay:                    "ਪ੍ਰਤੀਕਿਰਿਆ ਦੇਰੀ",
    tipFtrPlayPause:                        "ਚਲਾਓ / ਰੋਕੋ (ਸਪੇਸ)",
    tipFtrStop:                             "ਰੋਕੋ (Esc)",
    tipFtrVerify:                           "ਤਸਦੀਕ ਕਰੋ - ਤਸਦੀਕ ਦੇਰੀ ਬਾਅਦ ਆਪਣੇ ਆਪ ਅੱਗੇ ਵਧਦਾ ਹੈ",
    lblFtrVerificationDelay:                "ਤਸਦੀਕ ਦੇਰੀ",
    tipFtrPrevStamp:                        "ਪਿਛਲਾ ਟਾਈਮਸਟੈਂਪ",
    tipFtrNextStamp:                        "ਅਗਲਾ ਟਾਈਮਸਟੈਂਪ",
    lblFtrSeekDelay:                        "ਜੰਪ ਸਮਾਂ",
    tipFtrSeekBack:                         "ਸੰਰਚਿਤ ਸਕਿੰਟ ਪਿੱਛੇ ਜਾਓ (←)",
    tipFtrSeekNext:                         "ਨਿਰਧਾਰਿਤ ਸਕਿੰਟ ਅੱਗੇ ਜਾਓ (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ਸੈਟਿੰਗਾਂ",
    tabDlgSettingsDisplay:                  "ਡਿਸਪਲੇ",
    tabDlgSettingsTime:                     "ਸਮਾਂ",
    tabDlgSettingsMeta:                     "ਮੈਟਾਡੇਟਾ",
    tabDlgSettingsAbout:                    "ਬਾਰੇ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ਭਾਸ਼ਾ",
    lblDlgSettingsDisplayTheme:             "ਥੀਮ",
    btnDlgSettingsDisplayThemeDark:         "ਡਾਰਕ",
    btnDlgSettingsDisplayThemeLight:        "ਲਾਈਟ",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "ਲਾਈਨ ਸੰਪਾਦਨ ਦੇਰੀ",
    lblDlgSettingsTimeReactionDelay:        "ਪ੍ਰਤੀਕਿਰਿਆ ਦੇਰੀ",
    lblDlgSettingsTimeVerificationDelay:    "ਤਸਦੀਕ ਦੇਰੀ",
    lblDlgSettingsTimeSeekDelay:            "ਜੰਪ ਸਮਾਂ",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "ਕਲਾਕਾਰ",
    plhDlgSettingsMetaArtist:               "ਕਲਾਕਾਰ ਦਾ ਨਾਮ",
    lblDlgSettingsMetaSongwriter:           "ਗੀਤਕਾਰ",
    plhDlgSettingsMetaSongwriter:           "ਗੀਤਕਾਰ / ਸੰਗੀਤਕਾਰ",
    lblDlgSettingsMetaLrcBy:                "LRC ਦੁਆਰਾ",
    plhDlgSettingsMetaLrcBy:                "LRC ਬਣਾਉਣ ਵਾਲਾ",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ਸਮਕਾਲੀ ਗੀਤ ਫਾਈਲਾਂ ਬਣਾਓ।",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "ਮੈਟਾਡੇਟਾ",
    lblDlgMetaArtist:                       "ਕਲਾਕਾਰ",
    plhDlgMetaArtist:                       "ਕਲਾਕਾਰ ਦਾ ਨਾਮ",
    lblDlgMetaAlbum:                        "ਐਲਬਮ",
    plhDlgMetaAlbum:                        "ਐਲਬਮ ਦਾ ਨਾਮ",
    lblDlgMetaTitle:                        "ਸਿਰਲੇਖ",
    plhDlgMetaTitle:                        "ਗੀਤ ਦਾ ਸਿਰਲੇਖ",
    lblDlgMetaSongwriter:                   "ਗੀਤਕਾਰ",
    plhDlgMetaSongwriter:                   "ਗੀਤਕਾਰ / ਸੰਗੀਤਕਾਰ",
    lblDlgMetaLrcBy:                        "LRC ਦੁਆਰਾ",
    plhDlgMetaLrcBy:                        "LRC ਬਣਾਉਣ ਵਾਲਾ",
    lblDlgMetaOffsetMs:                     "ਗਲੋਬਲ ਆਫਸੈੱਟ (ms)",
    tipDlgMetaAutoFill:                     "ਸੰਗੀਤ ਫਾਈਲ ਟੈਗਾਂ ਤੋਂ ਮੈਟਾਡੇਟਾ ਭਰੋ",
    btnDlgMetaAutoFill:                     "ਆਟੋ-ਫਿੱਲ",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "ਨੋਟਪੈਡ",
    tipNotepadShow:                         "ਨੋਟਪੈਡ ਦਿਖਾਓ",
    tipNotepadHide:                         "ਨੋਟਪੈਡ ਲੁਕਾਓ",
    plhNotepad:                             "ਅਸਿੰਕਰੋਨਾਈਜ਼ਡ ਗੀਤ ਇੱਥੇ ਪੇਸਟ ਕਰੋ ਜਾਂ ਟਾਈਪ ਕਰੋ…",
    btnNotepadSetLyrics:                    "ਗੀਤ ਸੈੱਟ ਕਰੋ",
    tipNotepadSetLyrics:                    "ਨੋਟਪੈਡ ਤੋਂ ਗੀਤ ਸੂਚੀ ਸੈੱਟ ਕਰੋ",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "ਨਵੀਂ ਫਾਈਲ",
    lblSyncLines:                           "ਲਾਈਨਾਂ",
    empSyncNoLrc:                           "LRC ਫਾਈਲ ਬਣਾਉਣ ਲਈ ਸੰਗੀਤ ਨਾਲ ਲਾਈਨਾਂ ਸਿੰਕ ਕਰੋ।",
    lblSyncStartOfMusic:                    "ਸੰਗੀਤ ਦੀ ਸ਼ੁਰੂਆਤ",
    tipSyncEarlier:                         "ਚੁਣੀ ਲਾਈਨ −50ms (D)",
    tipSyncLater:                           "ਚੁਣੀ ਲਾਈਨ +50ms (F)",
    lblSyncEndOfLyrics:                     "ਗੀਤਾਂ ਦਾ ਅੰਤ",
    lblSyncEndOfMusic:                      "ਸੰਗੀਤ ਦਾ ਅੰਤ",

  },

  ha: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Soke",
    btnGlbYes:                              "Eh",
    btnGlbNo:                               "A'a",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Sabon sigar yana nan:",
    lnkUpdateWhatsNew:                      "Menene sabo",
    btnUpdateDownload:                      "Zazzage",
    lnkUpdateSkip:                          "Tsallake wannan sigar",
    tipUpdateDismiss:                       "Watsar",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Sauke fayil ɗin sauti ko LRC a nan",
    cfmAppUnsavedTitle:                     "Canje-canje da ba a ajiye ba",
    cfmAppUnsavedMsg:                       "Ajiye fayil ɗin kafin ci gaba?",
    tstAppSaved:                            "An ajiye fayil ɗin.",
    tstAppAutoLrcLoaded:                    "An loda fayil ɗin waƙa kai tsaye.",
    tstAppFileError:                        "An kasa buɗe fayil ɗin.",
    tstAppSaveError:                        "An kasa ajiye fayil ɗin.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Buɗe fayil ɗin kiɗa",
    ttlOsdOpenLyrics:                       "Buɗe fayil ɗin waƙa",
    ttlOsdSaveLrcAs:                        "Ajiye fayil ɗin LRC a matsayin",
    ttlOsdSaveTxt:                          "Ajiye fayil ɗin rubutu",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Sabon fayil ɗin LRC",
    tipHdrOpenMusic:                        "Buɗe fayil ɗin kiɗa",
    tipHdrOpenLyrics:                       "Buɗe fayil ɗin waƙa (.lrc da alamun lokaci ko .txt)",
    tipHdrSaveLrc:                          "Ajiye fayil ɗin LRC",
    tipHdrSaveLrcAs:                        "Ajiye a matsayin sabon fayil ɗin .lrc",
    tipHdrMeta:                             "Gyara bayanan kula na waƙa",
    btnHdrMeta:                             "Bayanan kula",
    tipHdrSaveTxt:                          "Fitar da jerin waƙa zuwa fayil ɗin .txt",
    tipHdrSettings:                         "Buɗe saitunan",
    tipHdrHelp:                             "Taimako",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Alamta layin yanzu da lokacin mai kunna waƙa kuma ci gaba (Enter)",
    btnFtrSyncTime:                         "Daidaita lokaci",
    lblFtrReactionDelay:                    "Jinkirin martani",
    tipFtrPlayPause:                        "Kunna / Tsayawa (Sarari)",
    tipFtrStop:                             "Tsaya (Esc)",
    tipFtrVerify:                           "Tabbatar - yana kunna kuma yana ci gaba kai tsaye bayan jinkirin tabbatarwa",
    lblFtrVerificationDelay:                "Jinkirin tabbatarwa",
    tipFtrPrevStamp:                        "Alamar lokaci ta baya",
    tipFtrNextStamp:                        "Alamar lokaci ta gaba",
    lblFtrSeekDelay:                        "Lokacin tsalle",
    tipFtrSeekBack:                         "Koma baya da daƙiƙoƙin da aka tsara (←)",
    tipFtrSeekNext:                         "Ci gaba da daƙiƙoƙin da aka tsara (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Saitunan",
    tabDlgSettingsDisplay:                  "Nuni",
    tabDlgSettingsTime:                     "Lokaci",
    tabDlgSettingsMeta:                     "Bayanan kula",
    tabDlgSettingsAbout:                    "Game da",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Harshe",
    lblDlgSettingsDisplayTheme:             "Jigo",
    btnDlgSettingsDisplayThemeDark:         "Duhu",
    btnDlgSettingsDisplayThemeLight:        "Haske",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Jinkirin gyara layi",
    lblDlgSettingsTimeReactionDelay:        "Jinkirin martani",
    lblDlgSettingsTimeVerificationDelay:    "Jinkirin tabbatarwa",
    lblDlgSettingsTimeSeekDelay:            "Lokacin tsalle",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Mawaƙi",
    plhDlgSettingsMetaArtist:               "Sunan mawaƙi",
    lblDlgSettingsMetaSongwriter:           "Marubucin waƙa",
    plhDlgSettingsMetaSongwriter:           "Marubuci / Mawaƙi",
    lblDlgSettingsMetaLrcBy:                "LRC ta",
    plhDlgSettingsMetaLrcBy:                "Mai ƙirƙirar LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ƙirƙira fayilolin waƙa masu daidaitawa.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Bayanan kula",
    lblDlgMetaArtist:                       "Mawaƙi",
    plhDlgMetaArtist:                       "Sunan mawaƙi",
    lblDlgMetaAlbum:                        "Kundin waƙa",
    plhDlgMetaAlbum:                        "Sunan kundin waƙa",
    lblDlgMetaTitle:                        "Take",
    plhDlgMetaTitle:                        "Take na waƙa",
    lblDlgMetaSongwriter:                   "Marubucin waƙa",
    plhDlgMetaSongwriter:                   "Marubuci / Mawaƙi",
    lblDlgMetaLrcBy:                        "LRC ta",
    plhDlgMetaLrcBy:                        "Mai ƙirƙirar LRC",
    lblDlgMetaOffsetMs:                     "Daidaitawar gaba ɗaya (ms)",
    tipDlgMetaAutoFill:                     "Cika bayanan kula daga alamomin fayil ɗin kiɗa",
    btnDlgMetaAutoFill:                     "Cika kai tsaye",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Rubutun bayanan kula",
    tipNotepadShow:                         "Nuna rubutun bayanan kula",
    tipNotepadHide:                         "Ɓoye rubutun bayanan kula",
    plhNotepad:                             "Liƙa ko rubuta waƙar da ba a daidaita ba a nan…",
    btnNotepadSetLyrics:                    "Saita waƙa",
    tipNotepadSetLyrics:                    "Saita jerin waƙa daga rubutun bayanan kula",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Sabon fayil",
    lblSyncLines:                           "layuka",
    empSyncNoLrc:                           "Daidaita layuka da kiɗa don gina fayil ɗin LRC.",
    lblSyncStartOfMusic:                    "Farkon kiɗa",
    tipSyncEarlier:                         "Matsa layi −50ms (D)",
    tipSyncLater:                           "Matsa layi +50ms (F)",
    lblSyncEndOfLyrics:                     "Ƙarshen waƙa",
    lblSyncEndOfMusic:                      "Ƙarshen kiɗa",

  },

  yo: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Fagilé",
    btnGlbYes:                              "Bẹ́ẹ̀ni",
    btnGlbNo:                               "Rárá",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ẹya tuntun wa:",
    lnkUpdateWhatsNew:                      "Kí ni titun",
    btnUpdateDownload:                      "Ṣe igbasilẹ",
    lnkUpdateSkip:                          "Fo ẹya yii",
    tipUpdateDismiss:                       "Foju pa",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Jọ̀ fáìlì ohun tabi LRC síbí",
    cfmAppUnsavedTitle:                     "Àwọn ìyípadà tí a kò pamọ",
    cfmAppUnsavedMsg:                       "Pamọ fáìlì lọwọlọwọ ṣáájú tẹsiwaju?",
    tstAppSaved:                            "A ti pamọ fáìlì.",
    tstAppAutoLrcLoaded:                    "A ti ṣii fáìlì orin laifọwọyi.",
    tstAppFileError:                        "Kò ṣeéṣe láti ṣii fáìlì.",
    tstAppSaveError:                        "Kò ṣeéṣe láti pamọ fáìlì.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Ṣii fáìlì orin",
    ttlOsdOpenLyrics:                       "Ṣii fáìlì ọ̀rọ̀ orin",
    ttlOsdSaveLrcAs:                        "Pamọ fáìlì LRC bí",
    ttlOsdSaveTxt:                          "Pamọ fáìlì ọ̀rọ̀",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Fáìlì LRC tuntun",
    tipHdrOpenMusic:                        "Ṣii fáìlì orin",
    tipHdrOpenLyrics:                       "Ṣii fáìlì orin (.lrc pẹlu àkókò tabi .txt)",
    tipHdrSaveLrc:                          "Pamọ fáìlì LRC",
    tipHdrSaveLrcAs:                        "Pamọ bí fáìlì .lrc tuntun",
    tipHdrMeta:                             "Ṣàtúnṣe àlàyé àfikún orin",
    btnHdrMeta:                             "Àlàyé àfikún",
    tipHdrSaveTxt:                          "Gbé àkójọ orin jáde sí fáìlì .txt",
    tipHdrSettings:                         "Ṣii ètò",
    tipHdrHelp:                             "Iranlọwọ",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Samisi ìlà lọwọlọwọ pẹlu àkókò olùṣere kí o sì tẹsiwaju (Enter)",
    btnFtrSyncTime:                         "Dọgba àkókò",
    lblFtrReactionDelay:                    "Idaduro ìfèsì",
    tipFtrPlayPause:                        "Ṣe / Dúró (Àyè)",
    tipFtrStop:                             "Dúró (Esc)",
    tipFtrVerify:                           "Dánwò - ṣe orin àti tẹsiwaju laifọwọyi lẹhin idaduro ìdánwò",
    lblFtrVerificationDelay:                "Idaduro ìdánwò",
    tipFtrPrevStamp:                        "Àkókò tó kọjá",
    tipFtrNextStamp:                        "Àkókò tó kàn",
    lblFtrSeekDelay:                        "Akoko ờfờ",
    tipFtrSeekBack:                         "Padà sẹhin pẹlu ìṣẹjú tí a ṣètò (←)",
    tipFtrSeekNext:                         "Lọlọlọ siwaju ni iṣẹ̀ju-aaya ti a ṣeto (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ètò",
    tabDlgSettingsDisplay:                  "Ifihan",
    tabDlgSettingsTime:                     "Àkókò",
    tabDlgSettingsMeta:                     "Àlàyé àfikún",
    tabDlgSettingsAbout:                    "Nípa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Èdè",
    lblDlgSettingsDisplayTheme:             "Àwòrán",
    btnDlgSettingsDisplayThemeDark:         "Òkùnkùn",
    btnDlgSettingsDisplayThemeLight:        "Ìmọ́lẹ̀",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Idaduro ìtúnṣe ìlà",
    lblDlgSettingsTimeReactionDelay:        "Idaduro ìfèsì",
    lblDlgSettingsTimeVerificationDelay:    "Idaduro ìdánwò",
    lblDlgSettingsTimeSeekDelay:            "Akoko ờfờ",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Akọrin",
    plhDlgSettingsMetaArtist:               "Orúkọ akọrin",
    lblDlgSettingsMetaSongwriter:           "Olùkọ orin",
    plhDlgSettingsMetaSongwriter:           "Olùkọ ọ̀rọ̀ / olùdásílẹ̀",
    lblDlgSettingsMetaLrcBy:                "LRC láti ọwọ",
    plhDlgSettingsMetaLrcBy:                "Olùdásílẹ̀ LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ṣẹdá àwọn fáìlì orin tí a dọgba.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Àlàyé àfikún",
    lblDlgMetaArtist:                       "Akọrin",
    plhDlgMetaArtist:                       "Orúkọ akọrin",
    lblDlgMetaAlbum:                        "Àpótí orin",
    plhDlgMetaAlbum:                        "Orúkọ àpótí orin",
    lblDlgMetaTitle:                        "Àkọlé",
    plhDlgMetaTitle:                        "Àkọlé orin",
    lblDlgMetaSongwriter:                   "Olùkọ orin",
    plhDlgMetaSongwriter:                   "Olùkọ ọ̀rọ̀ / olùdásílẹ̀",
    lblDlgMetaLrcBy:                        "LRC láti ọwọ",
    plhDlgMetaLrcBy:                        "Olùdásílẹ̀ LRC",
    lblDlgMetaOffsetMs:                     "Ìyídàpadà àpapọ̀ (ms)",
    tipDlgMetaAutoFill:                     "Kun àlàyé àfikún láti àmì fáìlì orin",
    btnDlgMetaAutoFill:                     "Kun laifọwọyi",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Iwe akọsilẹ",
    tipNotepadShow:                         "Ṣafihan iwe akọsilẹ",
    tipNotepadHide:                         "Farasin iwe akọsilẹ",
    plhNotepad:                             "Fi sii tabi kọ orin tí a kò dọgba síbí…",
    btnNotepadSetLyrics:                    "Ṣètò orin",
    tipNotepadSetLyrics:                    "Ṣètò àkójọ orin láti iwe akọsilẹ",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Faili tuntun",
    lblSyncLines:                           "ìlà",
    empSyncNoLrc:                           "Dọgba àwọn ìlà pẹlu orin láti kọ fáìlì LRC.",
    lblSyncStartOfMusic:                    "Ìbẹ̀rẹ̀ orin",
    tipSyncEarlier:                         "Gbe ìlà −50ms (D)",
    tipSyncLater:                           "Gbe ìlà +50ms (F)",
    lblSyncEndOfLyrics:                     "Òpin ọ̀rọ̀ orin",
    lblSyncEndOfMusic:                      "Òpin orin",

  },

  te: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "రద్దు చేయి",
    btnGlbYes:                              "అవును",
    btnGlbNo:                               "కాదు",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "కొత్త వెర్షన్ అందుబాటులో ఉంది:",
    lnkUpdateWhatsNew:                      "కొత్తవి ఏమిటి",
    btnUpdateDownload:                      "డౌన్‌లోడ్ చేయండి",
    lnkUpdateSkip:                          "ఈ వెర్షన్‌ను దాటవేయి",
    tipUpdateDismiss:                       "తిరస్కరించు",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "ఇక్కడ ఆడియో లేదా LRC ఫైల్ వదలండి",
    cfmAppUnsavedTitle:                     "సేవ్ చేయని మార్పులు",
    cfmAppUnsavedMsg:                       "కొనసాగే ముందు ప్రస్తుత ఫైల్ సేవ్ చేయాలా?",
    tstAppSaved:                            "ఫైల్ సేవ్ చేయబడింది.",
    tstAppAutoLrcLoaded:                    "పాట ఫైల్ స్వయంచాలకంగా లోడ్ చేయబడింది.",
    tstAppFileError:                        "ఫైల్ తెరవడం విఫలమైంది.",
    tstAppSaveError:                        "ఫైల్ సేవ్ చేయడం విఫలమైంది.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "సంగీత ఫైల్ తెరవండి",
    ttlOsdOpenLyrics:                       "పాట ఫైల్ తెరవండి",
    ttlOsdSaveLrcAs:                        "LRC ఫైల్‌ను ఇలా సేవ్ చేయి",
    ttlOsdSaveTxt:                          "టెక్స్ట్ ఫైల్ సేవ్ చేయి",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "కొత్త LRC ఫైల్",
    tipHdrOpenMusic:                        "సంగీత ఫైల్ తెరవండి",
    tipHdrOpenLyrics:                       "పాట ఫైల్ తెరవండి (.lrc టైమ్‌స్టాంప్‌లతో లేదా .txt)",
    tipHdrSaveLrc:                          "LRC ఫైల్ సేవ్ చేయి",
    tipHdrSaveLrcAs:                        "కొత్త .lrc ఫైల్‌గా సేవ్ చేయి",
    tipHdrMeta:                             "పాట మెటా డేటా సవరించు",
    btnHdrMeta:                             "మెటా డేటా",
    tipHdrSaveTxt:                          "పాట జాబితాను .txt ఫైల్‌కు ఎగుమతి చేయి",
    tipHdrSettings:                         "సెట్టింగులు తెరవండి",
    tipHdrHelp:                             "సహాయం",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "ప్రస్తుత లైన్‌ను ప్లేయర్ సమయంతో గుర్తించి ముందుకు వెళ్ళు (Enter)",
    btnFtrSyncTime:                         "సమయం సమకాలీకరించు",
    lblFtrReactionDelay:                    "ప్రతిస్పందన ఆలస్యం",
    tipFtrPlayPause:                        "ప్లే / పాజ్ (స్పేస్)",
    tipFtrStop:                             "ఆపు (Esc)",
    tipFtrVerify:                           "ధృవీకరించు - ధృవీకరణ ఆలస్యం తర్వాత స్వయంచాలకంగా ముందుకు వెళ్ళు",
    lblFtrVerificationDelay:                "ధృవీకరణ ఆలస్యం",
    tipFtrPrevStamp:                        "మునుపటి టైమ్‌స్టాంప్",
    tipFtrNextStamp:                        "తదుపరి టైమ్‌స్టాంప్",
    lblFtrSeekDelay:                        "దాటు సమయం",
    tipFtrSeekBack:                         "కాన్ఫిగర్ చేసిన సెకన్లు వెనక్కి (←)",
    tipFtrSeekNext:                         "కాన్ఫిగర్ చేసిన సెకన్లు ముందుకు వెళ్ళు (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "సెట్టింగులు",
    tabDlgSettingsDisplay:                  "ప్రదర్శన",
    tabDlgSettingsTime:                     "సమయం",
    tabDlgSettingsMeta:                     "మెటా డేటా",
    tabDlgSettingsAbout:                    "గురించి",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "భాష",
    lblDlgSettingsDisplayTheme:             "థీమ్",
    btnDlgSettingsDisplayThemeDark:         "చీకటి",
    btnDlgSettingsDisplayThemeLight:        "వెలుతురు",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "లైన్ సవరణ ఆలస్యం",
    lblDlgSettingsTimeReactionDelay:        "ప్రతిస్పందన ఆలస్యం",
    lblDlgSettingsTimeVerificationDelay:    "ధృవీకరణ ఆలస్యం",
    lblDlgSettingsTimeSeekDelay:            "దాటు సమయం",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "కళాకారుడు",
    plhDlgSettingsMetaArtist:               "కళాకారుని పేరు",
    lblDlgSettingsMetaSongwriter:           "పాటరచయిత",
    plhDlgSettingsMetaSongwriter:           "గీతరచయిత / సంగీత స్వరకర్త",
    lblDlgSettingsMetaLrcBy:                "LRC రూపొందించినవారు",
    plhDlgSettingsMetaLrcBy:                "LRC సృష్టికర్త",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "సమకాలీకరించిన పాట ఫైళ్ళు సృష్టించండి.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "మెటా డేటా",
    lblDlgMetaArtist:                       "కళాకారుడు",
    plhDlgMetaArtist:                       "కళాకారుని పేరు",
    lblDlgMetaAlbum:                        "ఆల్బమ్",
    plhDlgMetaAlbum:                        "ఆల్బమ్ పేరు",
    lblDlgMetaTitle:                        "శీర్షిక",
    plhDlgMetaTitle:                        "పాట శీర్షిక",
    lblDlgMetaSongwriter:                   "పాటరచయిత",
    plhDlgMetaSongwriter:                   "గీతరచయిత / సంగీత స్వరకర్త",
    lblDlgMetaLrcBy:                        "LRC రూపొందించినవారు",
    plhDlgMetaLrcBy:                        "LRC సృష్టికర్త",
    lblDlgMetaOffsetMs:                     "గ్లోబల్ ఆఫ్‌సెట్ (ms)",
    tipDlgMetaAutoFill:                     "సంగీత ఫైల్ ట్యాగ్‌ల నుండి మెటా డేటా నింపండి",
    btnDlgMetaAutoFill:                     "స్వయంచాలక నింపు",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "నోట్‌ప్యాడ్",
    tipNotepadShow:                         "నోట్‌ప్యాడ్ చూపు",
    tipNotepadHide:                         "నోట్‌ప్యాడ్ దాచు",
    plhNotepad:                             "సమకాలీకరించని పాట ఇక్కడ అతికించండి లేదా టైప్ చేయండి…",
    btnNotepadSetLyrics:                    "పాట సెట్ చేయి",
    tipNotepadSetLyrics:                    "నోట్‌ప్యాడ్ నుండి పాట జాబితా సెట్ చేయి",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "కొత్త ఫైల్",
    lblSyncLines:                           "పంక్తులు",
    empSyncNoLrc:                           "LRC ఫైల్ నిర్మించేందుకు సంగీతంతో లైన్లను సమకాలీకరించండి.",
    lblSyncStartOfMusic:                    "సంగీతం ప్రారంభం",
    tipSyncEarlier:                         "ఎంచుకున్న లైన్ −50ms (D)",
    tipSyncLater:                           "ఎంచుకున్న లైన్ +50ms (F)",
    lblSyncEndOfLyrics:                     "పాట ముగింపు",
    lblSyncEndOfMusic:                      "సంగీతం ముగింపు",

  },

  mr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "रद्द करा",
    btnGlbYes:                              "होय",
    btnGlbNo:                               "नाही",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नवीन आवृत्ती उपलब्ध आहे:",
    lnkUpdateWhatsNew:                      "नवीन काय आहे",
    btnUpdateDownload:                      "डाउनलोड करा",
    lnkUpdateSkip:                          "ही आवृत्ती वगळा",
    tipUpdateDismiss:                       "डिसमिस करा",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "येथे ऑडिओ किंवा LRC फाइल ड्रॉप करा",
    cfmAppUnsavedTitle:                     "न जतन केलेले बदल",
    cfmAppUnsavedMsg:                       "पुढे सुरू ठेवण्यापूर्वी फाइल जतन करायची आहे का?",
    tstAppSaved:                            "फाइल जतन केली.",
    tstAppAutoLrcLoaded:                    "गीत फाइल आपोआप लोड झाली.",
    tstAppFileError:                        "फाइल उघडण्यात अयशस्वी.",
    tstAppSaveError:                        "फाइल जतन करण्यात अयशस्वी.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "संगीत फाइल उघडा",
    ttlOsdOpenLyrics:                       "गीत फाइल उघडा",
    ttlOsdSaveLrcAs:                        "LRC फाइल असे जतन करा",
    ttlOsdSaveTxt:                          "मजकूर फाइल जतन करा",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "नवीन LRC फाइल",
    tipHdrOpenMusic:                        "संगीत फाइल उघडा",
    tipHdrOpenLyrics:                       "गीत फाइल उघडा (.lrc टाइमस्टॅम्पसह किंवा .txt)",
    tipHdrSaveLrc:                          "LRC फाइल जतन करा",
    tipHdrSaveLrcAs:                        "नवीन .lrc फाइल म्हणून जतन करा",
    tipHdrMeta:                             "गाण्याचा मेटाडेटा संपादित करा",
    btnHdrMeta:                             "मेटाडेटा",
    tipHdrSaveTxt:                          "गीत यादी .txt फाइलमध्ये निर्यात करा",
    tipHdrSettings:                         "सेटिंग्ज उघडा",
    tipHdrHelp:                             "मदत",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "वर्तमान ओळीला प्लेयर वेळाने टाइमस्टॅम्प करा आणि पुढे जा (Enter)",
    btnFtrSyncTime:                         "वेळ सिंक",
    lblFtrReactionDelay:                    "प्रतिक्रिया विलंब",
    tipFtrPlayPause:                        "चालवा / थांबवा (स्पेस)",
    tipFtrStop:                             "थांबवा (Esc)",
    tipFtrVerify:                           "सत्यापित करा - सत्यापन विलंबानंतर आपोआप पुढे जाते",
    lblFtrVerificationDelay:                "सत्यापन विलंब",
    tipFtrPrevStamp:                        "मागील टाइमस्टॅम्प",
    tipFtrNextStamp:                        "पुढील टाइमस्टॅम्प",
    lblFtrSeekDelay:                        "उडी वेळ",
    tipFtrSeekBack:                         "कॉन्फिगर केलेल्या सेकंदांनी मागे (←)",
    tipFtrSeekNext:                         "कॉन्फिगर केलेल्या सेकंदांनी पुढे जा (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्ज",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsTime:                     "वेळ",
    tabDlgSettingsMeta:                     "मेटाडेटा",
    tabDlgSettingsAbout:                    "बद्दल",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गडद",
    btnDlgSettingsDisplayThemeLight:        "प्रकाश",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "ओळ संपादन विलंब",
    lblDlgSettingsTimeReactionDelay:        "प्रतिक्रिया विलंब",
    lblDlgSettingsTimeVerificationDelay:    "सत्यापन विलंब",
    lblDlgSettingsTimeSeekDelay:            "उडी वेळ",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "कलाकार",
    plhDlgSettingsMetaArtist:               "कलाकाराचे नाव",
    lblDlgSettingsMetaSongwriter:           "गीतकार",
    plhDlgSettingsMetaSongwriter:           "गीतकार / संगीतकार",
    lblDlgSettingsMetaLrcBy:                "LRC द्वारे",
    plhDlgSettingsMetaLrcBy:                "LRC निर्माता",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "समकालीन गीत फाइल्स तयार करा.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "मेटाडेटा",
    lblDlgMetaArtist:                       "कलाकार",
    plhDlgMetaArtist:                       "कलाकाराचे नाव",
    lblDlgMetaAlbum:                        "अल्बम",
    plhDlgMetaAlbum:                        "अल्बमचे नाव",
    lblDlgMetaTitle:                        "शीर्षक",
    plhDlgMetaTitle:                        "गाण्याचे शीर्षक",
    lblDlgMetaSongwriter:                   "गीतकार",
    plhDlgMetaSongwriter:                   "गीतकार / संगीतकार",
    lblDlgMetaLrcBy:                        "LRC द्वारे",
    plhDlgMetaLrcBy:                        "LRC निर्माता",
    lblDlgMetaOffsetMs:                     "जागतिक ऑफसेट (ms)",
    tipDlgMetaAutoFill:                     "संगीत फाइल टॅगमधून मेटाडेटा भरा",
    btnDlgMetaAutoFill:                     "स्वयं-भरण",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "नोटपॅड",
    tipNotepadShow:                         "नोटपॅड दाखवा",
    tipNotepadHide:                         "नोटपॅड लपवा",
    plhNotepad:                             "असिंक्रोनाइझ्ड गीत येथे पेस्ट करा किंवा टाइप करा…",
    btnNotepadSetLyrics:                    "गीत सेट करा",
    tipNotepadSetLyrics:                    "नोटपॅडमधून गीत यादी सेट करा",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "नवीन फाइल",
    lblSyncLines:                           "ओळी",
    empSyncNoLrc:                           "LRC फाइल तयार करण्यासाठी संगीताशी ओळी सिंक करा.",
    lblSyncStartOfMusic:                    "संगीताची सुरुवात",
    tipSyncEarlier:                         "निवडलेली ओळ −50ms (D)",
    tipSyncLater:                           "निवडलेली ओळ +50ms (F)",
    lblSyncEndOfLyrics:                     "गीताचा शेवट",
    lblSyncEndOfMusic:                      "संगीताचा शेवट",

  },

  tl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlbCancel:                           "Kanselahin",
    btnGlbYes:                              "Oo",
    btnGlbNo:                               "Hindi",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "May bagong bersyon:",
    lnkUpdateWhatsNew:                      "Ano ang bago",
    btnUpdateDownload:                      "I-download",
    lnkUpdateSkip:                          "Laktawan ang bersyon na ito",
    tipUpdateDismiss:                       "Balewalain",

    // Prefix:App - Scope:app-level messages, confirms, toasts, empty states
    empAppDropFile:                         "Mag-drop ng audio o LRC file dito",
    cfmAppUnsavedTitle:                     "Mga hindi na-save na pagbabago",
    cfmAppUnsavedMsg:                       "I-save ang kasalukuyang file bago magpatuloy?",
    tstAppSaved:                            "Na-save ang file.",
    tstAppAutoLrcLoaded:                    "Awtomatikong na-load ang liriko file.",
    tstAppFileError:                        "Nabigong buksan ang file.",
    tstAppSaveError:                        "Nabigong i-save ang file.",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMusic:                        "Buksan ang music file",
    ttlOsdOpenLyrics:                       "Buksan ang liriko file",
    ttlOsdSaveLrcAs:                        "I-save ang LRC file bilang",
    ttlOsdSaveTxt:                          "I-save ang text file",

    // Prefix:Header - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Bagong LRC file",
    tipHdrOpenMusic:                        "Buksan ang music file",
    tipHdrOpenLyrics:                       "Buksan ang file ng liriko (.lrc na may mga timestamp o .txt)",
    tipHdrSaveLrc:                          "I-save ang LRC file",
    tipHdrSaveLrcAs:                        "I-save bilang bagong .lrc file",
    tipHdrMeta:                             "I-edit ang metadata ng kanta",
    btnHdrMeta:                             "Metadata",
    tipHdrSaveTxt:                          "I-export ang listahan ng liriko sa .txt file",
    tipHdrSettings:                         "Buksan ang mga setting",
    tipHdrHelp:                             "Tulong",

    // Prefix:Footer - Scope:bottom player bar controls
    tipFtrSyncTime:                         "Markahan ang kasalukuyang linya gamit ang oras ng player at sumulong (Enter)",
    btnFtrSyncTime:                         "I-sync ang oras",
    lblFtrReactionDelay:                    "Pagkaantala ng reaksyon",
    tipFtrPlayPause:                        "I-play / I-pause (Espasyo)",
    tipFtrStop:                             "Ihinto (Esc)",
    tipFtrVerify:                           "I-verify - nagpe-play at awtomatikong sumusulong pagkatapos ng pagkaantala ng pagpapatunay",
    lblFtrVerificationDelay:                "Pagkaantala ng pagpapatunay",
    tipFtrPrevStamp:                        "Nakaraang timestamp",
    tipFtrNextStamp:                        "Susunod na timestamp",
    lblFtrSeekDelay:                        "Oras ng talon",
    tipFtrSeekBack:                         "Bumalik sa nakatakdang segundo (←)",
    tipFtrSeekNext:                         "Sumulong ng mga naka-configure na segundo (→)",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mga Setting",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsTime:                     "Oras",
    tabDlgSettingsMeta:                     "Meta",
    tabDlgSettingsAbout:                    "Tungkol sa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Wika",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Madilim",
    btnDlgSettingsDisplayThemeLight:        "Maliwanag",

    // Prefix:DlgSettingsTime - Scope:settings dialog (Time tab)
    lblDlgSettingsTimeShiftDelay:           "Pagkaantala ng pag-edit ng linya",
    lblDlgSettingsTimeReactionDelay:        "Pagkaantala ng reaksyon",
    lblDlgSettingsTimeVerificationDelay:    "Pagkaantala ng pagpapatunay",
    lblDlgSettingsTimeSeekDelay:            "Oras ng talon",

    // Prefix:DlgSettingsMeta - Scope:settings dialog (Meta tab)
    lblDlgSettingsMetaArtist:               "Artista",
    plhDlgSettingsMetaArtist:               "Pangalan ng artista",
    lblDlgSettingsMetaSongwriter:           "Manunulat ng kanta",
    plhDlgSettingsMetaSongwriter:           "Manunulat ng liriko / kompositor",
    lblDlgSettingsMetaLrcBy:                "LRC ni",
    plhDlgSettingsMetaLrcBy:                "Tagalikha ng LRC",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "lumikha ng mga naka-synchronize na liriko file.",

    // Prefix:DlgMeta - Scope:metadata dialog
    ttlDlgMeta:                             "Metadata",
    lblDlgMetaArtist:                       "Artista",
    plhDlgMetaArtist:                       "Pangalan ng artista",
    lblDlgMetaAlbum:                        "Album",
    plhDlgMetaAlbum:                        "Pangalan ng album",
    lblDlgMetaTitle:                        "Pamagat",
    plhDlgMetaTitle:                        "Pamagat ng kanta",
    lblDlgMetaSongwriter:                   "Manunulat ng kanta",
    plhDlgMetaSongwriter:                   "Manunulat ng liriko / kompositor",
    lblDlgMetaLrcBy:                        "LRC ni",
    plhDlgMetaLrcBy:                        "Tagalikha ng LRC",
    lblDlgMetaOffsetMs:                     "Pangkalahatang offset (ms)",
    tipDlgMetaAutoFill:                     "Punan ang metadata mula sa mga tag ng music file",
    btnDlgMetaAutoFill:                     "Auto-fill",

    // Prefix:Notepad - Scope:notepad side panel
    lblNotepad:                             "Notepad",
    tipNotepadShow:                         "Ipakita ang notepad",
    tipNotepadHide:                         "Itago ang notepad",
    plhNotepad:                             "I-paste o i-type ang hindi naka-synchronize na liriko dito…",
    btnNotepadSetLyrics:                    "Itakda ang liriko",
    tipNotepadSetLyrics:                    "Itakda ang listahan ng liriko mula sa notepad",

    // Prefix:Sync - Scope:main timeline / LRC sync view
    lblSyncNewFile:                         "Bagong file",
    lblSyncLines:                           "linya",
    empSyncNoLrc:                           "I-sync ang mga linya sa musika upang buuin ang LRC file.",
    lblSyncStartOfMusic:                    "Simula ng musika",
    tipSyncEarlier:                         "Ilipat ang linya −50ms (D)",
    tipSyncLater:                           "Ilipat ang linya +50ms (F)",
    lblSyncEndOfLyrics:                     "Katapusan ng liriko",
    lblSyncEndOfMusic:                      "Katapusan ng musika",

  },
};

// ⚠ CLAUDE: When adding a new i18n key - it must go into EVERY language block in this file.
// ALL means ALL. Do not count, do not list languages here, do not create tiers.
// Scroll through every block and add the key. Every block. No exceptions.

export const LANGUAGES = [
  { key: 'ar', label: 'العربية' },
  { key: 'bg', label: 'Български' },
  { key: 'bn', label: 'বাংলা' },
  { key: 'ca', label: 'Català' },
  { key: 'zh_CN', label: '简体中文' },
  { key: 'zh_TW', label: '繁體中文' },
  { key: 'cs', label: 'Čeština' },
  { key: 'da', label: 'Dansk' },
  { key: 'de', label: 'Deutsch' },
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español' },
  { key: 'fr', label: 'Français' },
  { key: 'el', label: 'Ελληνικά' },
  { key: 'gl', label: 'Galego' },
  { key: 'ha', label: 'Hausa' },
  { key: 'he', label: 'עברית' },
  { key: 'hi', label: 'हिन्दी' },
  { key: 'hr', label: 'Hrvatski' },
  { key: 'hu', label: 'Magyar' },
  { key: 'hy', label: 'Հայerեն' },
  { key: 'id', label: 'Indonesia' },
  { key: 'it', label: 'Italiano' },
  { key: 'ja', label: '日本語' },
  { key: 'ko', label: '한국어' },
  { key: 'lt', label: 'Lietuvių' },
  { key: 'mk', label: 'Македонски' },
  { key: 'mr', label: 'मराठी' },
  { key: 'ms', label: 'Melayu' },
  { key: 'nl', label: 'Nederlands' },
  { key: 'nb', label: 'Norsk' },
  { key: 'fa', label: 'فارسی' },
  { key: 'pa', label: 'ਪੰਜਾਬੀ' },
  { key: 'pl', label: 'Polski' },
  { key: 'pt_BR', label: 'Português (Brasil)' },
  { key: 'pt_PT', label: 'Português (Portugal)' },
  { key: 'ro', label: 'Română' },
  { key: 'ru', label: 'Русский' },
  { key: 'sk', label: 'Slovenčina' },
  { key: 'sl', label: 'Slovenščina' },
  { key: 'sr', label: 'Српски' },
  { key: 'sv', label: 'Svenska' },
  { key: 'sw', label: 'Kiswahili' },
  { key: 'fi', label: 'Suomi' },
  { key: 'ta', label: 'தமிழ்' },
  { key: 'te', label: 'తెలుగు' },
  { key: 'th', label: 'ไทย' },
  { key: 'tl', label: 'Filipino' },
  { key: 'tr', label: 'Türkçe' },
  { key: 'uk', label: 'Українська' },
  { key: 'ur', label: 'اردو' },
  { key: 'vi', label: 'Tiếng Việt' },
  { key: 'yo', label: 'Yorùbá' },
];

const base = TRANSLATIONS.en;

// ⚠ CLAUDE: useT MUST return a useMemo-wrapped function. The bare form
//   `return (key) => ...` produces a new function every render, which destabilizes
//   every useCallback/useEffect depending on `t` → infinite render loop, EMFILE crashes.
//   See CLAUDE-i18n.md → "useT() must memoize". Do not "simplify" this.
export function useT(langKey) {
  return useMemo(() => {
    const lang = TRANSLATIONS[langKey] || base;
    return (key) => lang[key] ?? base[key] ?? key;
  }, [langKey]);
}

export function getT(langKey) {
  const lang = TRANSLATIONS[langKey] || base;
  return (key) => lang[key] ?? base[key] ?? key;
}
