
# Build Scripts

To build the static site for production with SSR, run these commands:

1. Build the application:
```bash
npm run build
```

2. Generate static HTML files:
```bash
node scripts/build-static.js
```

Or you can add these to your package.json scripts section:
```json
{
  "scripts": {
    "build:static": "vite build && node scripts/build-static.js",
    "build:ssr": "vite build --ssr src/entry-server.tsx"
  }
}
```
