import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

const pages = ['index.html'];

function findPages(dir, prefix) {
  for (const entry of readdirSync(join(dist, dir))) {
    const fullPath = join(dist, dir, entry);
    if (statSync(fullPath).isDirectory()) {
      findPages(`${dir}/${entry}`, `${prefix}${entry}/`);
    } else if (entry.endsWith('.html')) {
      pages.push(`${dir}/${entry}`);
    }
  }
}
for (const dir of ['servicios', 'blog']) {
  findPages(dir, '');
}

for (const page of pages) {
  const htmlPath = join(dist, page);
  let html = readFileSync(htmlPath, 'utf8');
  let changed = false;

  html = html.replace(
    /<link rel="stylesheet" href="([^"]+\.css)">\s*/g,
    (match, href) => {
      const cssPath = join(dist, href.replace(/^\//, ''));
      try {
        const css = readFileSync(cssPath, 'utf8');
        changed = true;
        return `<style>${css}</style>`;
      } catch {
        console.warn(`CSS not found: ${cssPath}`);
        return match;
      }
    }
  );

  if (changed) {
    writeFileSync(htmlPath, html);
    console.log(`Inlined CSS in ${page}`);
  }
}
