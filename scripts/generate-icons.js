const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ICON_VIEWBOX = 32;
const ICON_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_VIEWBOX}" height="${ICON_VIEWBOX}" viewBox="0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}">
  <rect x="1.5" y="1.5" width="29" height="29" rx="6" fill="#f2efe7" stroke="#1b1a16" stroke-width="2.4"/>
  <text x="6.2" y="11" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="7" font-weight="700" fill="#1b1a16">&gt;_</text>
  <text x="16" y="23.5" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="12" fill="#1b1a16">LP</text>
</svg>`;

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function alphaAt(data, width, height, x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return 0;
  return data[(y * width + x) * 4 + 3];
}

function defringe(data, width, height) {
  const neighbors = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1],
  ];

  for (let pass = 0; pass < 4; pass++) {
    const toClear = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const alpha = data[i + 3];
        if (alpha === 0) continue;

        const lum = luminance(data[i], data[i + 1], data[i + 2]);
        const touchesClear = neighbors.some(([dx, dy]) => alphaAt(data, width, height, x + dx, y + dy) === 0);

        if (alpha < 160) {
          toClear.push(i);
          continue;
        }

        if (touchesClear && lum > 50) {
          toClear.push(i);
        }
      }
    }

    for (const i of toClear) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
    }
  }

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      continue;
    }

    if (data[i + 3] < 255) {
      const scale = 255 / data[i + 3];
      data[i] = Math.min(255, Math.round(data[i] * scale));
      data[i + 1] = Math.min(255, Math.round(data[i + 1] * scale));
      data[i + 2] = Math.min(255, Math.round(data[i + 2] * scale));
      data[i + 3] = 255;
    }
  }
}

async function renderIcon(size) {
  const { data, info } = await sharp(Buffer.from(ICON_SVG))
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  defringe(data, info.width, info.height);

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

async function writeIcon(size, dest) {
  await (await renderIcon(size)).toFile(dest);
}

function createPngIco(pngPaths) {
  const images = pngPaths.map((pngPath) => {
    const pngBuffer = fs.readFileSync(pngPath);
    const width = pngBuffer.readUInt32BE(16);
    const height = pngBuffer.readUInt32BE(20);
    return { pngBuffer, width, height };
  });

  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header[entry] = image.width >= 256 ? 0 : image.width;
    header[entry + 1] = image.height >= 256 ? 0 : image.height;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.pngBuffer.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.pngBuffer.length;
  });

  return Buffer.concat([header, ...images.map((image) => image.pngBuffer)]);
}

async function generateIcons() {
  const rootDir = path.join(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'app');
  const tempDir = path.join(__dirname, '.icon-tmp');

  fs.mkdirSync(tempDir, { recursive: true });

  const png16 = path.join(tempDir, '16.png');
  const png32 = path.join(tempDir, '32.png');
  const png48 = path.join(tempDir, '48.png');
  const png64 = path.join(tempDir, '64.png');
  const png180 = path.join(tempDir, '180.png');

  await Promise.all([
    writeIcon(16, png16),
    writeIcon(32, png32),
    writeIcon(48, png48),
    writeIcon(64, png64),
    writeIcon(180, png180),
  ]);

  const icoBuffer = createPngIco([png16, png32, png48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  fs.copyFileSync(png32, path.join(publicDir, 'icon.png'));
  fs.copyFileSync(png64, path.join(appDir, 'icon.png'));
  fs.copyFileSync(png180, path.join(publicDir, 'apple-touch-icon.png'));
  fs.copyFileSync(png180, path.join(appDir, 'apple-icon.png'));
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), ICON_SVG);

  const leftoverIconIco = path.join(appDir, 'icon.ico');
  if (fs.existsSync(leftoverIconIco)) {
    fs.unlinkSync(leftoverIconIco);
  }

  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('Icons generated from SVG source');
}

generateIcons().catch((error) => {
  console.error(error);
  process.exit(1);
});
