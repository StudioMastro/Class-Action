# Project Overview

## Goal

Develop a Figma plugin that allows users to save, manage, and apply frame styles as reusable CSS-like classes to streamline design workflows.

## Architecture

- **Core Logic:** Implemented in TypeScript for robust type-checking and maintainability.
- **UI Layer:** Built using an HTML interface with vanilla JavaScript for lightweight and fast performance.
- **Data Storage:** Localized JSON-based storage to save and manage classes.
- **Plugin Framework:** Leverages Figma Plugin API for seamless integration with Figma's design environment.

## Project Structure

```
plugin-root/
├── src/                    # Source code directory
│   ├── code.ts            # Main plugin logic
│   ├── ui.html            # Plugin UI
│   ├── ui/                # UI components and assets
│   │   ├── components/    # Reusable UI components
│   │   ├── styles/        # CSS and style files
│   │   └── scripts/       # UI-specific scripts
│   └── lib/               # Shared utilities and helpers
├── dist/                  # Build output directory (except code.js)
├── .notes/                # Project documentation
├── code.js               # Compiled plugin code (in root for Figma)
├── manifest.json         # Plugin configuration
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md           # Project documentation
```

### Directory Structure Guidelines

1. **Source Organization (`/src`)**:
   - Keep all source files in the `src` directory
   - Main plugin logic in `code.ts`
   - UI-related files in `ui/` subdirectory
   - Shared utilities in `lib/` subdirectory

2. **Build Output**:
   - `code.js` must be in root directory (Figma requirement)
   - Other compiled assets go in `dist/`

3. **Configuration Files**:
   - Keep configuration files in root directory
   - `manifest.json` for plugin settings
   - `tsconfig.json` for TypeScript configuration
   - `package.json` for dependencies

4. **Documentation**:
   - Keep documentation in `.notes/` directory
   - Main README.md in root for quick start guide

## Key Features

- Save and name frame styles as reusable classes.
- Apply saved classes to selected frames for consistency.
- Export and import classes as JSON for collaboration and portability.
- Manage class definitions (rename, update, delete).
- Support for batch application of classes to multiple frames.
- Simple, intuitive UI for easy navigation and class management.
- Real-time updates and feedback while using the plugin.

## Future Enhancements

- Add support for advanced styling options like conditional rules.
- Integration with external design systems and cloud storage.
- Enhanced analytics for class usage and design impact tracking.

## Best Practices

1. **Code Organization**:
   - Keep plugin logic (`code.ts`) and UI (`ui.html`) separate
   - Use TypeScript for type safety and better maintainability
   - Organize UI components and styles in dedicated directories

2. **Build Process**:
   - Compile TypeScript to JavaScript for Figma compatibility
   - Keep `code.js` in root directory as required by Figma
   - Use source maps for easier debugging

3. **Version Control**:
   - Track source files and configurations
   - Ignore build artifacts except `code.js`
   - Document changes in CHANGELOG.md

4. **Documentation**:
   - Keep documentation up-to-date
   - Include setup instructions in README.md
   - Document API and data structures

## Project Highlights

This project aims to fill a critical gap in the Figma ecosystem by enabling reusable, centralized style management, improving productivity and design consistency for teams and individual users alike.