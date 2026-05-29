import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'public/images/logo-icon.svg'));

const sizes = [192, 512];

for (const size of sizes) {
  const outPath = join(root, `public/images/icon-${size}.png`);
  await sharp(svg).resize(size, size).png().toFile(outPath);
  console.log(`Created ${outPath}`);
}
