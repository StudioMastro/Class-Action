# Project Overview

## Goal

Class Action is a powerful Figma plugin that revolutionizes how designers manage and apply styles to their frames. By introducing a CSS-like class system, it enables designers to create, save, and reuse consistent styles across their designs with just a few clicks. Perfect for design systems, rapid prototyping, and maintaining design consistency across large projects.

### Key Benefits
- **Save Time**: Create styles once, apply them anywhere
- **Maintain Consistency**: Ensure design coherence across your entire project
- **Collaborate Better**: Share and import style classes with your team
- **Work Smarter**: Manage styles like a developer with a familiar CSS-like approach

## Technical Stack

- **Core Logic:** Implemented in TypeScript with strict type-checking using Create Figma Plugin.
- **UI Layer:** Built with Preact and @create-figma-plugin/ui components for native Figma look and feel.
- **Data Storage:** Localized JSON-based storage using Figma's plugin data API.
- **Plugin Framework:** Leverages Create Figma Plugin framework for standardized development and build process.
- **Build System:** Uses esbuild through Create Figma Plugin for fast and efficient bundling.
- **Styling:** Tailwind CSS for custom styling integrated with Figma's design system.

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
│   ├── input.css          # Tailwind CSS input
│   └── output.css         # Generated CSS
├── build/                  # Build output directory
├── .notes/                # Project documentation
└── [configuration files]  # Various config files
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
  - Save frame properties as reusable classes
  - Apply styles with one click
  - Update existing classes with new properties
  - View detailed CSS-like property information
  - Full support for auto-layout properties
  - Comprehensive handling of frame dimensions and constraints

- **Auto Layout Support**:
  - Save and apply layout mode (NONE/HORIZONTAL/VERTICAL)
  - Handle primary and counter axis properties
  - Support for wrap and spacing settings
  - Manage padding values individually
  - Control canvas stacking (layoutPositioning)
  - Handle min/max width/height constraints

- **Style Properties**:
  - Complete appearance properties (opacity, blendMode, etc.)
  - Support for style references with RGB values
  - Direct style values with CSS-like format
  - Stroke properties and dash patterns
  - Corner radius settings

- **Developer-Friendly**:
  - TypeScript with strict type checking
  - CSS-like property display
  - Comprehensive error handling
  - Detailed console logging for debugging
  - Event-based communication between UI and plugin

## Future Enhancements

1. **Style Management**:
   - Enhanced property validation
   - Support for nested properties
   - Improved error handling
   - Class categories and tags

2. **UI Improvements**:
   - Class previews
   - Drag and drop reordering
   - Better visual feedback
   - Advanced search capabilities

3. **Collaboration**:
   - Enhanced import/export
   - Class sharing
   - Team libraries
   - Version control

4. **Advanced Features**:
   - Conditional styles
   - Style variables
   - Batch operations
   - Usage analytics

## Best Practices

1. **Code Organization**:
   - Separate concerns between main.ts and ui.tsx
   - Use TypeScript interfaces for type safety
   - Follow Create Figma Plugin patterns
   - Maintain clear error handling

2. **Style Management**:
   - Save complete frame properties
   - Handle all auto-layout cases
   - Validate property values
   - Convert style references to readable format

3. **Error Handling**:
   - Validate input before saving
   - Handle missing or invalid properties
   - Provide clear user feedback
   - Log errors for debugging

4. **Documentation**:
   - Keep interfaces documented
   - Update changelog for changes
   - Document complex logic
   - Maintain clear examples

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