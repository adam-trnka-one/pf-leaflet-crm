
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        server: path.resolve(__dirname, 'src/entry-server.tsx')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'server' ? 'entry-server.js' : '[name]-[hash].js';
        }
      }
    },
    ssr: mode === 'production'
  },
  ssr: {
    // Prevent SSR from trying to bundle these
    noExternal: ['react-router-dom']
  }
}));
