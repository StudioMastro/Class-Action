# Class Action - Figma Plugin

<img src="assets/banner.png" alt="Class Action Banner" style="border-radius: 1rem; margin: 1rem 0"/>

> Transform your Figma workflow with smart frame management and reusable classes.

_This plugin is built with [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/)._

## Why Class Action?

Ever found yourself repeatedly adjusting frame dimensions and properties across your Figma files? Class Action lets you save and reuse frame configurations with a single click, making your design workflow faster and more consistent.

### Key Features

- **Save Frame Classes**: Create reusable classes from any frame configuration
- **Quick Apply**: Apply saved classes to any frame with one click
- **Smart Search**: Find the right class instantly with our smart search
- **Batch Operations**: Apply classes to multiple frames at once (Premium)
- **Import/Export**: Share your classes across teams and projects (Premium)
- **Unlimited Classes**: Store as many classes as you need (Premium)
- **Variables Support**: Full support for Figma variables (color, numeric, boolean, and string)

## Use Cases

- **Design Systems**: Maintain consistent component containers
- **Responsive Design**: Quickly switch between different frame sizes
- **Layout Templates**: Save and reuse common layout configurations
- **Team Collaboration**: Share standardized frame setups
- **Rapid Prototyping**: Speed up your design workflow

## How It Works

1. **Select** any frame in your design
2. **Save** its properties as a reusable class
3. **Apply** the class to other frames instantly
4. **Organize** your classes with smart search and filtering

## Plans

### Free Plan

- Save up to 5 classes
- Basic search functionality
- Single class application
- Essential frame properties

### Premium Plan

- Save unlimited classes
- Batch operations (Apply All & Apply Global)
- Import/Export functionality
- Priority support
- Early access to new features

## Features and Limitations

### Supported Frame Properties

The plugin can save and apply the following properties:

- ✅ Basic dimensions (width, height)
- ✅ Layout mode (auto-layout or fixed)
- ✅ Aspect ratio and constraints
- ✅ Rotation
- ✅ Auto-layout properties (spacing, padding, alignment, etc.)
- ✅ Corner radius
- ✅ Opacity and blend mode
- ✅ Stroke properties (weight, align, dash pattern)
- ✅ Figma variables (color, numeric, boolean, and string variables)

### Variables Support

| Variable | Support | Notes                                           |
| -------- | ------- | ----------------------------------------------- |
| Color    | ✅ Full | Color variables in fills and strokes            |
| Number   | ✅ Full | Numeric variables for dimensions, padding, etc. |
| Boolean  | ✅ Full | Boolean variables are preserved                 |
| String   | ✅ Full | String variables are preserved                  |

### Style Properties Support

| Property     | Support          | Notes                                            |
| ------------ | ---------------- | ------------------------------------------------ |
| Solid Colors | ✅ Full          | Direct colors, style references, and variables   |
| Gradients    | ⚠️ Partial       | Basic gradient support, may lose some properties |
| Images       | ❌ Not Supported | Image fills are not saved or applied             |
| Videos       | ❌ Not Supported | Video fills are not saved or applied             |
| Effects      | ✅ Full          | Shadows and blur effects are fully supported     |
| Layout Grids | ✅ Full          | Grid styles are supported                        |

### Known Limitations

#### Image and Video Fills

The plugin currently does not support saving and applying image or video fills. When saving a class from a frame with an image background, the image will not be included in the class and will not be applied when using the class on other frames.

This limitation is due to technical constraints in the Figma API and the need to keep plugin storage size reasonable.

#### Position in Canvas

The plugin intentionally does not save or apply the absolute position (X, Y coordinates) of frames in the canvas. This prevents unwanted overlapping when applying classes to multiple frames and preserves the positioning of frames within auto-layout containers.

## 🔗 Useful Links

- [Plugin Page](https://www.figma.com/community/plugin/1479216087650447650/class-action)
- [Support](mailto:alessandro.mastro@icloud.com)
- [Twitter](https://x.com/mastrooooooo)

## 💖 Support

Love Class Action? Rate us on the Figma Community platform and spread the word!

---

## For Developers

<details>
<summary>Development Guide</summary>

### Pre-requisites

- [Node.js](https://nodejs.org) – v20
- [Figma desktop app](https://figma.com/downloads/)

### Build Configuration

The plugin uses custom build configuration files for the Figma Plugin build process:

1. Copy the example configuration files to create your own:

   ```bash
   cp build-figma-plugin.example.js build-figma-plugin.main.js
   cp build-figma-plugin.manifest.example.js build-figma-plugin.manifest.js
   ```

2. Update the configuration files with your own API keys and settings:
   - `build-figma-plugin.main.js`: Contains environment variables and API keys for LemonSqueezy
   - `build-figma-plugin.manifest.js`: Contains network access configuration for the plugin

> **Note**: The actual configuration files (`build-figma-plugin.main.js` and `build-figma-plugin.manifest.js`) are ignored by Git to prevent sensitive information from being committed to the repository.

### Build

```bash
$ npm run build
```

### Development

```bash
$ npm run watch
```

For more details, see the [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/).

1. In the Figma desktop app, open a Figma document.
2. Search for and run `Import plugin from manifest…` via the Quick Actions search bar.
3. Select the `manifest.json` file that was generated by the `build` script.

### Debugging

Use `console.log` statements to inspect values in your code.

To open the developer console, search for and run `Show/Hide Console` via the Quick Actions search bar.

### Analytics System

The plugin includes an optional analytics system to collect anonymous usage data. This helps us improve the plugin by understanding how it's used.

#### Features

- **Opt-in only**: Users must explicitly consent to data collection
- **Anonymous**: No personal information is collected
- **Transparent**: Users can see what data is collected
- **Minimal**: Only collects essential usage metrics

#### Data Collected

- Number of classes saved and applied
- Features used
- Plugin performance metrics

#### Implementation

1. **Client-side**: The analytics service in `src/analytics/` handles data collection and user consent
2. **Server-side**: A simple serverless function in `api/analytics.js` receives and processes the data
3. **Storage**: Data is stored in a database (MongoDB, Firebase, etc.)

#### Deployment

The analytics backend can be deployed to Vercel or similar serverless platforms:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy the analytics API
vercel
```

#### Privacy Considerations

- All data collection is opt-in
- Users can disable analytics at any time
- No personally identifiable information is collected
- Data is used only to improve the plugin

## See also

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [Yuanqing Figma Plugins](https://github.com/yuanqing/figma-plugins#readme)

Official docs and code samples from Figma:

- [Plugin API docs](https://figma.com/plugin-docs/)
- [Figma Plugin Samples](https://github.com/figma/plugin-samples#readme)

</details>
