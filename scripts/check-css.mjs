import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

const pages = [{name:'index.html', subdir:''}];

for (const dir of ['servicios', 'blog']) {
  for (const f of readdirSync(join(dist, dir))) {
    pages.push({name: `${dir}/${f}/index.html`, subdir:`${dir}/${f}`});
  }
}

for (const p of pages) {
  try {
    const html = readFileSync(join(dist, p.name), 'utf8');
    const hasExt = html.match(/<link rel="stylesheet" href="\/_astro\/[^"]+\.css"/);
    const hasInline = html.match(/<style>/);
    const astroCssCount = (html.match(/\/_astro\/.*\.css/g) || []).length;
    console.log(`${p.name}: ${hasExt ? 'EXTERNAL CSS ('+astroCssCount+')' : hasInline ? 'inlined OK' : 'no CSS'}`);
  } catch(e) {
    console.log(`${p.name}: SKIP (${e.code})`);
  }
}
