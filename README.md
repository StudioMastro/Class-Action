# Class Action - Figma Plugin

A powerful Figma plugin that allows you to save, manage, and reuse frame styles as reusable classes across your design system.

## Features

- 💾 **Save Frame Styles as Classes**: Capture and store frame properties as reusable classes
- 🔄 **Apply Classes**: Quickly apply saved styles to other frames
- 📤 **Export/Import**: Share your classes across different files or with team members
- 🔄 **Batch Apply**: Apply classes to all matching frames in your current page
- ✏️ **Class Management**: Rename, update, or delete saved classes
- 📊 **Usage Statistics**: Track how often classes are used and by whom
- 🔍 **Search & Filter**: Find classes by name or properties

## Installation

1. Open Figma
2. Go to Menu > Plugins > Development > Import plugin from manifest
3. Select the `manifest.json` file from this repository

## Usage

### Saving a Class
1. Select a frame in your Figma file
2. Open the Class Action plugin
3. Enter a name for your class
4. Click "Save Class"

### Applying a Class
1. Select a target frame
2. Open the plugin
3. Click "Apply" next to the class you want to use

### Exporting Classes
1. Open the plugin
2. Click the "Export Classes" button
3. Choose where to save the JSON file

### Importing Classes
1. Open the plugin
2. Click "Import Classes"
3. Select your previously exported JSON file

## Development

### Prerequisites
- Node.js (Latest LTS version)
- TypeScript
- Figma Desktop App

### Setup
1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

4. To watch for changes during development:
```bash
npm run watch
```

### Project Structure
- `code.ts`: Main plugin logic
- `ui.html`: Plugin UI implementation
- `manifest.json`: Plugin configuration
- `package.json`: Project dependencies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms specified in the `package.json` file.

## Version History

- 1.0.0: Initial release
  - Basic class saving and applying functionality
  - Import/Export feature
  - Class management tools

## Acknowledgments

- Built with [Figma Plugin DS](https://github.com/thomas-lowry/figma-plugin-ds)
- Developed for the Figma community
# Test
# Another test
