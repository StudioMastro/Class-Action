# Project Overview

## Goal

Class Action is a powerful Figma plugin that revolutionizes how designers manage and apply styles to their frames. By introducing a CSS-like class system, it enables designers to create, save, and reuse consistent styles across their designs with just a few clicks. Perfect for design systems, rapid prototyping, and maintaining design consistency across large projects.

### Key Benefits
- **Save Time**: Create styles once, apply them anywhere
- **Maintain Consistency**: Ensure design coherence across your entire project
- **Collaborate Better**: Share and import style classes with your team
- **Work Smarter**: Manage styles like a developer with a familiar CSS-like approach

## Architecture

- **Core Logic:** Implemented in TypeScript with strict type-checking using Create Figma Plugin.
- **UI Layer:** Built with Preact and @create-figma-plugin/ui components for native Figma look and feel.
- **Data Storage:** Localized JSON-based storage using Figma's plugin data API.
- **Plugin Framework:** Leverages Create Figma Plugin framework for standardized development and build process.
- **Build System:** Uses esbuild through Create Figma Plugin for fast and efficient bundling.

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
│   ├── main.ts            # Main plugin logic
│   ├── ui.tsx             # Plugin UI (Preact components)
│   └── styles.css         # Tailwind CSS styles
├── build/                  # Build output directory (generated)
│   ├── code.js           # Compiled plugin code
│   ├── ui.js            # Compiled UI code
│   └── styles.css       # Compiled styles
├── .notes/               # Project documentation
├── manifest.json        # Plugin configuration (generated)
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js # Tailwind configuration
└── README.md          # Project documentation
```

### Directory Structure Guidelines

1. **Source Organization (`/src`)**:
   - All source files in the `src` directory
   - Main plugin logic in `main.ts`
   - UI implementation in `ui.tsx` using Preact
   - Styles in `styles.css` using Tailwind

2. **Build Output (`/build`)**:
   - Generated directory for compiled assets
   - Contains all build outputs (code.js, ui.js, styles.css)
   - Automatically created by build process
   - Not tracked in version control

3. **Configuration Files**:
   - `manifest.json` for plugin settings (generated)
   - `tsconfig.json` for TypeScript configuration
   - `package.json` for dependencies and scripts
   - `tailwind.config.js` for styling configuration

4. **Documentation**:
   - Project documentation in `.notes/` directory
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
   - Separate plugin logic (`main.ts`) and UI (`ui.tsx`)
   - Use TypeScript with strict type checking
   - Follow Create Figma Plugin conventions
   - Leverage @create-figma-plugin/ui components

2. **Build Process**:
   - Use Create Figma Plugin's build system
   - No manual compilation required
   - Source maps enabled for debugging

3. **Version Control**:
   - Track source files and configurations
   - Ignore build artifacts in `/dist`
   - Document changes in CHANGELOG.md

4. **Documentation**:
   - Keep documentation up-to-date
   - Include setup instructions in README.md
   - Document event system and data structures

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