
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes to pre-render
const routes = [
  '/',
  '/products',
  '/help',
  '/blog'
];

async function generateStaticFiles() {
  // Import the server entry point
  const { render } = await import('../dist/entry-server.js');
  
  // Read the client-side HTML template
  const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  
  for (const route of routes) {
    try {
      const { html } = render(route);
      
      // Replace the app placeholder with the rendered HTML
      const finalHtml = template.replace('<!--app-html-->', html);
      
      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = path.resolve(__dirname, '../dist/index.html');
      } else {
        const dir = path.resolve(__dirname, `../dist${route}`);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        outputPath = path.resolve(dir, 'index.html');
      }
      
      fs.writeFileSync(outputPath, finalHtml);
      console.log(`Generated: ${outputPath}`);
    } catch (error) {
      console.error(`Error generating ${route}:`, error);
    }
  }
}

generateStaticFiles().catch(console.error);
