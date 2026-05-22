/**
 * Generate PWA icon PNGs from SVG using sharp.
 * Run: node scripts/generate-icons.mjs
 *
 * If sharp is not installed, this creates SVG icons as fallback
 * and you can convert them manually or install sharp:
 *   npm i -D sharp && node scripts/generate-icons.mjs
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

function createSvg(size) {
  const cornerRadius = Math.round(size * 0.18);
  const fontSize = Math.round(size * 0.52);
  const textY = Math.round(size * 0.58);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="#C41A3B"/>
  <text x="50%" y="${textY}" text-anchor="middle" dominant-baseline="central"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    font-weight="700" font-size="${fontSize}" fill="white">9</text>
</svg>`;
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    // sharp not available — write SVG files as fallback
    console.log('sharp not installed. Writing SVG fallback icons...');
    for (const size of [192, 512]) {
      const svg = createSvg(size);
      // Write as .png extension but SVG content — Next.js serves from public/
      // Better: write actual SVGs for reference
      const svgPath = join(iconsDir, `icon-${size}.svg`);
      writeFileSync(svgPath, svg);
      console.log(`  Created ${svgPath}`);
    }
    console.log('\nTo generate proper PNGs, run:');
    console.log('  npm i -D sharp && node scripts/generate-icons.mjs');
    return;
  }

  // Generate proper PNG icons using sharp
  for (const size of [192, 512]) {
    const svg = createSvg(size);
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();
    const pngPath = join(iconsDir, `icon-${size}.png`);
    writeFileSync(pngPath, pngBuffer);
    console.log(`  Created ${pngPath} (${pngBuffer.length} bytes)`);
  }
  console.log('Done! PNG icons generated.');
}

main().catch(console.error);
