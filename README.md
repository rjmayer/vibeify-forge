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

3. Build the @vibeify/engine dependency:
```bash
# The engine package needs to be built after installation from git
cd node_modules/@vibeify/engine
npm install && npm run build
cd ../../..
```

### Build

Build the extension for production:
```bash
npm run build
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
│   ├── popup/
│   │   ├── popup.html         # Popup UI
│   │   └── popup.ts           # Popup logic with smoke test
│   └── lib/
│       └── template-loader.ts # Template loader for @vibeify/engine
├── prompts/
│   └── templates/             # Template library (YAML format)
│       ├── greeting.yaml
│       └── code-review.yaml
├── manifest.json              # Chrome extension manifest (MV3)
├── vite.config.ts            # Vite build configuration
└── tsconfig.json             # TypeScript configuration
```

## License

See [LICENSE](LICENSE) file for details.

