# Changelog

Tutte le modifiche notevoli a questo progetto saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2025-02-06

### Changed
- Migrated PostCSS configuration to ES Module format (`postcss.config.mjs`)
- Updated build system configuration for better module compatibility
- Improved documentation organization and structure

### Added
- Added comprehensive build system documentation
- Enhanced project structure documentation in `.cursor/rules`

### Fixed
- Resolved ESLint configuration issues with PostCSS files
- Fixed TypeScript configuration to include all necessary files

## [0.2.1] - 2025-01-19

### Fixed
- Risolto il problema con la reimportazione dello stesso file
- Migliorati i messaggi di feedback durante l'importazione
- Ottimizzata la gestione degli eventi di importazione

## [0.2.0] - 2025-01-17

### Added
- Supporto completo per gli stili di Figma (fillStyleId e strokeStyleId)
- Gestione migliorata dei token di design con mantenimento dei riferimenti alle variabili
- Scroll nella modale di aggiornamento classi

### Changed
- Aggiornato tsconfig.json per supportare ES2017
- Migliorata tipizzazione del codice per una maggiore affidabilità

## [0.1.0] - 2025-01-17

### Added
- Funzionalità di ricerca con filtro
- Interfaccia utente migliorata
- Gestione delle classi di stile
- Importazione ed esportazione delle classi
- Supporto per l'autolayout

### Changed
- Rimossa proprietà version dal manifest.json per compatibilità con Figma 