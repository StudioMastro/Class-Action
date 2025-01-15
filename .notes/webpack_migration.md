# Migration to Create Figma Plugin

## Decision
After evaluating different options for the plugin structure, we decided to use Create Figma Plugin for the following reasons:
- Officially supported and widely tested solution
- Excellent documentation and active community
- Native TypeScript support
- Optimized build system for Figma plugins
- Integrated hot reload and development tools

## Create Figma Plugin & Preact Notes

### Why Preact Instead of React
1. **Performance Benefits**
   - Smaller bundle size (~3KB vs React's ~40KB)
   - Faster initial load times
   - Lower memory footprint
   - Optimized for Figma plugin environment

2. **API Compatibility**
   - Almost identical API to React
   - Same component patterns and hooks
   - Compatible with React libraries via `preact/compat`
   - Minimal learning curve for React developers

3. **Migration Considerations**
   - Replace React imports with Preact
   - Most components will work without changes
   - Some React-specific features may need alternatives
   - Use `preact/compat` for React library compatibility

### Create Figma Plugin Features
1. **Build System**
   - Uses esbuild for faster compilation
   - Automatic HMR (Hot Module Replacement)
   - Optimized production builds
   - TypeScript and JSX support out of the box

2. **Development Experience**
   - Built-in development server
   - Fast refresh for UI changes
   - Source maps for debugging
   - Plugin reloading utilities

3. **UI Components**
   - Preact components matching Figma's UI
   - Built-in Figma design system components
   - Dark mode support
   - Accessibility features

## Migration Plan

### 1. Backup and Preparation
- [x] Created backup branch `backup/pre-create-figma-plugin`
- [x] Documented current project state

### 2. Create Figma Plugin Setup
- [ ] Install create-figma-plugin globally
- [ ] Generate new project with TypeScript + UI template
- [ ] Verify generated structure against Figma documentation

### 3. Code Migration
- [ ] Migrate plugin code (`code.ts`)
  - [ ] Adapt class management logic
  - [ ] Verify Figma API compatibility
  - [ ] Update event handling
- [ ] Migrate user interface
  - [ ] Convert React components to Preact
  - [ ] Adapt styles and layout
  - [ ] Implement plugin-UI communication
  - [ ] Test component compatibility

### 4. Testing and Validation
- [ ] Verify core functionality
  - [ ] Class saving
  - [ ] Class application
  - [ ] Import/Export
- [ ] Performance testing
  - [ ] Bundle size analysis
  - [ ] Load time measurements
  - [ ] Memory usage monitoring
- [ ] UI/UX validation

### 5. Documentation and Release
- [ ] Update README
- [ ] Document new structure
- [ ] Prepare for release

## Technical Notes

### Project Structure
```
src/
├── main.ts           # Plugin entry point (ex code.ts)
├── ui.tsx           # Interface entry point
└── components/      # UI Components
    ├── app.tsx      # Main UI component
    └── ui/          # Reusable UI components
```

### Considerations
1. **Build System**: Create Figma Plugin automatically handles:
   - Bundling (esbuild)
   - TypeScript compilation
   - Hot reload
   - Asset management
   - Production optimizations

2. **Compatibility**: 
   - Maintain compatibility with existing data
   - Verify functionality with new structure
   - Test React component migrations
   - Validate plugin API usage

3. **Development Workflow**:
   - Use `npm run build` for production
   - Use `npm run watch` for development
   - Utilize HMR for faster development
   - Implement proper debugging setup 