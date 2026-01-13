# vibeify-forge

Vibeify Forge is a browser-based prompt design and library plugin that helps users turn good prompts into reusable, structured tools—directly alongside ChatGPT. It enables rapid experimentation, live previewing, and effortless reuse, without forcing users into complex versioning or workflows.

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rjmayer/vibeify-forge.git
cd vibeify-forge
```

2. Install dependencies:
```bash
npm install
```

Note: The postinstall script automatically builds the @vibeify/engine dependency.

### Build

Build the extension for production:
```bash
npm run build
```

Build a Firefox-compatible bundle (uses the MV2-style manifest):
```bash
TARGET=firefox npm run build
```

The built extension will be in the `dist/` directory.

### Development Mode

Run in development mode with auto-rebuild:
```bash
npm run dev
```

## Loading the Extension in Chrome

1. Build the extension (see above)
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `dist` directory from the project

## Loading the Extension in Firefox

1. Build the extension with the Firefox target (see above)
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file inside the `dist` directory

## Testing

Once loaded:
1. Click the Vibeify Forge extension icon in your Chrome toolbar
2. The popup will automatically run a smoke test that:
   - Loads template files from `/prompts/templates`
   - Resolves a greeting template with sample input
   - Displays the rendered output

## Project Structure

```
vibeify-forge/
├── src/
│   ├── background.ts          # Background service worker
│   ├── popup.ts               # Popup logic with smoke test
│   └── lib/
│       └── template-loader.ts # Template loader for @vibeify/engine
├── prompts/
│   └── templates/             # Template library (YAML format)
│       ├── greeting.yaml
│       └── code-review.yaml
├── popup.html                 # Popup UI
├── manifest.json              # Chrome manifest (MV3)
├── manifest.firefox.json      # Firefox manifest (MV2-style background)
├── vite.config.ts             # Vite build configuration
└── tsconfig.json              # TypeScript configuration
```

## License

See [LICENSE](LICENSE) file for details.

