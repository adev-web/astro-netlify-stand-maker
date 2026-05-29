import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'public/images/logo-icon.svg'));

const publicDir = join(root, 'public');

const sizes = [
  { file: 'favicon.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
];

for (const { file, size } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(join(publicDir, file));
  console.log(`Created ${file}`);
}

// Maskable icons: render SVG on a slightly smaller canvas (80%) with padding
for (const size of [192, 512]) {
  const padding = Math.round(size * 0.12);
  const innerSize = size - padding * 2;
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="#1a3a5c"/>
    </svg>`
  );
  const overlay = await sharp(svg).resize(innerSize, innerSize).png().toBuffer();
  await sharp(bg)
    .composite([{ input: overlay, top: padding, left: padding }])
    .png()
    .toFile(join(publicDir, `icon-maskable-${size}.png`));
  console.log(`Created icon-maskable-${size}.png`);
}

// Screenshot placeholders
const createScreenshot = async (w, h) => {
  const svgScreenshot = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="#f5f7fa"/>
      <rect x="0" y="0" width="${w}" height="${Math.round(h * 0.12)}" fill="#1a3a5c"/>
      <rect x="${Math.round(w * 0.1)}" y="${Math.round(h * 0.25)}" width="${Math.round(w * 0.8)}" height="${Math.round(h * 0.06)}" fill="#e8a838" rx="4"/>
      <rect x="${Math.round(w * 0.1)}" y="${Math.round(h * 0.35)}" width="${Math.round(w * 0.8)}" height="${Math.round(h * 0.5)}" fill="#ffffff" rx="8" stroke="#e2e8f0" stroke-width="2"/>
      <text x="${Math.round(w / 2)}" y="${Math.round(h * 0.55)}" font-family="sans-serif" font-size="${Math.round(w * 0.04)}" fill="#1a3a5c" text-anchor="middle" font-weight="bold">ExpoStands Panamá</text>
      <text x="${Math.round(w / 2)}" y="${Math.round(h * 0.62)}" font-family="sans-serif" font-size="${Math.round(w * 0.025)}" fill="#4a5568" text-anchor="middle">Fabricación de stands y exhibidores</text>
    </svg>`
  );
  await sharp(svgScreenshot).png().toFile(join(publicDir, `screenshot-${w}x${h}.png`));
  console.log(`Created screenshot-${w}x${h}.png`);
};

await createScreenshot(540, 720);
await createScreenshot(1080, 1440);
