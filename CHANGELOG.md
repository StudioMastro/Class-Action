# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.8] - 2025-02-10

### Added
- Automated directory structure generation script
- Updated project structure documentation

### Changed
- Updated `directory_structure.mdc` with current project layout
- Enhanced directory descriptions and organization
- Improved documentation clarity with better file categorization

## [0.2.7] - 2025-02-06

### Changed
- Restructured `cursor_rules.mdc` to follow new Cursor documentation standards
- Enhanced AI assistant configuration with more specific guidelines
- Improved documentation referencing with @ syntax
- Updated glob patterns for better file targeting

### Added
- Comprehensive sections in `cursor_rules.mdc`:
  - Context initialization guidelines
  - Code generation standards
  - File organization rules
  - AI interaction protocols
  - Development workflow
  - Security and performance guidelines
- Added external documentation references
- Enhanced metadata for AI context

## [0.2.6] - 2025-02-06

### Added
- Created new granular rules structure in `.cursor/rules/`:
  - `react_components.mdc` for React-specific guidelines
  - `figma_plugin.mdc` for plugin development standards
- Enhanced rules with glob pattern matching
- Added detailed component and plugin architecture guidelines

### Changed
- Migrated from `.cursorrules` to project-specific rules in `.cursor/rules/`
- Updated rules format to follow latest Cursor documentation
- Improved rule organization with better file targeting

### Removed
- Deprecated `.cursorrules` file in favor of new rules system

## [0.2.5] - 2025-02-06

### Added
- Created `.cursorrules` file with global AI instructions for development
- Added `testing_standards.mdc` with comprehensive testing guidelines
- Implemented detailed code quality and testing requirements
- Enhanced AI assistance with specific Figma plugin development rules

### Changed
- Updated project documentation structure with testing standards
- Enhanced development guidelines with specific testing requirements
- Improved code quality requirements with detailed specifications

## [0.2.4] - 2025-02-06

### Changed
- Migrated core documentation files to Notepad format:
  - `project_overview.mdc` → Notepad
  - `meeting_notes.mdc` → Notepad
  - `task_list.mdc` → Notepad
  - `webpack_migration.mdc` → Notepad
- Enhanced documentation with direct file references and metadata
- Improved documentation structure with better cross-referencing

### Added
- Added YAML metadata headers to all Notepad files
- Implemented direct file linking with `@` syntax
- Created standardized Notepad templates

### Removed
- Deprecated old MDC format files in favor of new Notepad system

## [0.2.3] - 2025-02-06

### Changed
- Migrated `webpack_migration.mdc` to Notepad format for better documentation organization
- Enhanced documentation structure with direct file references using `@` syntax
- Improved cross-referencing between documentation files

### Added
- Created new Notepad system for project documentation
- Added metadata headers to documentation files
- Implemented direct file linking in documentation

### Removed
- Deprecated `webpack_migration.mdc` in favor of new Notepad format

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
- Resolved file re-import issue
- Improved feedback messages during import process
- Optimized import event handling

## [0.2.0] - 2025-01-17

### Added
- Full support for Figma styles (fillStyleId and strokeStyleId)
- Improved design token handling with variable reference preservation
- Scrolling in class update modal

### Changed
- Updated tsconfig.json to support ES2017
- Improved code typing for better reliability

## [0.1.0] - 2025-01-17

### Added
- Search functionality with filtering
- Improved user interface
- Style class management
- Class import and export functionality
- Auto-layout support

### Changed
- Removed version property from manifest.json for Figma compatibility 