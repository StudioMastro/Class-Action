# Project Overview

## Goal

Class Action is a powerful Figma plugin that revolutionizes how designers manage and apply styles to their frames. By introducing a CSS-like class system, it enables designers to create, save, and reuse consistent styles across their designs with just a few clicks. Perfect for design systems, rapid prototyping, and maintaining design consistency across large projects.

### Key Benefits
- **Save Time**: Create styles once, apply them anywhere
- **Maintain Consistency**: Ensure design coherence across your entire project
- **Collaborate Better**: Share and import style classes with your team
- **Work Smarter**: Manage styles like a developer with a familiar CSS-like approach

## Architecture

- **Core Logic:** Implemented in TypeScript for robust type-checking and maintainability.
- **UI Layer:** Built using an HTML interface with vanilla JavaScript for lightweight and fast performance.
- **Data Storage:** Localized JSON-based storage to save and manage classes.
- **Plugin Framework:** Leverages Figma Plugin API for seamless integration with Figma's design environment.

## Documentation Guidelines

- All documentation must be written in English
- This includes:
  - Project Overview
  - Meeting Notes
  - Task List
  - Code Comments
  - User Documentation
  - API Documentation
- Exception: User interface can be multilingual based on target market

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

- **Smart Style Management**:
  - Save any frame's styles as reusable classes
  - Apply styles with one click
  - Update styles globally across your design
  - Organize and search your style library

- **Efficient Workflow**:
  - Batch apply styles to multiple frames
  - Quick search and filter functionality
  - Real-time style preview
  - Intuitive drag-and-drop interface

- **Team Collaboration**:
  - Export and import style libraries
  - Share consistent styles across projects
  - Maintain design system consistency
  - Version control for your styles

- **Developer-Friendly**:
  - CSS-like class naming
  - JSON-based style definitions
  - Easy integration with design systems
  - Familiar interface for developers

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

## Figma Plugin Requirements

### Technical Specifications
- Plugin must work in both Figma and FigJam environments
- UI must use Figma's design system components
- All async operations must show loading states
- Error handling must provide clear user feedback
- No console.log statements in production code

### Plugin Store Assets
- Icons: 128x128 and 32x32 (PNG with transparent background)
- Cover image for plugin page
- Screenshots/GIFs demonstrating key features
- Description within character limits
- Relevant tags for discoverability

### Testing Requirements
- Verify functionality in both Figma desktop and web
- Test with various file sizes and complexities
- Validate behavior with different user permissions