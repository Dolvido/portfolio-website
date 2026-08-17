const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

function generateSvgIcon() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect x="1.5" y="1.5" width="29" height="29" rx="6" fill="#f2efe7" stroke="#1b1a16" stroke-width="2.4"/>
  <text x="6.2" y="11" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="7" font-weight="700" fill="#1b1a16">&gt;_</text>
  <text x="16" y="23.5" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="12" fill="#1b1a16">LP</text>
</svg>`;
}

function isPng(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const header = Buffer.alloc(8);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, header, 0, 8, 0);
  fs.closeSync(fd);
  return header.toString('hex') === '89504e470d0a1a0a';
}

function findSource(publicDir) {
  const candidates = [
    path.join(__dirname, 'favicon-source.png'),
    path.join(publicDir, 'favicon.ico'),
    path.join(publicDir, 'icon.png'),
  ];
  return candidates.find(isPng) || null;
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

async function punchOuterBackground(sourcePath) {
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const lightThreshold = 185;
  const visited = Buffer.alloc(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    visited[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const i = p * 4;
    if (luminance(data[i], data[i + 1], data[i + 2]) < lightThreshold) continue;
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
    const x = p % width;
    const y = (p / width) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
    push(x + 1, y + 1);
    push(x - 1, y - 1);
    push(x + 1, y - 1);
    push(x - 1, y + 1);
  }

  const neighbors = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, -1], [1, -1], [-1, 1],
  ];
  for (let pass = 0; pass < 2; pass++) {
    const extra = [];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const p = y * width + x;
        const i = p * 4;
        if (data[i + 3] === 0) continue;
        if (luminance(data[i], data[i + 1], data[i + 2]) < 150) continue;
        const nextToClear = neighbors.some(([dx, dy]) => {
          return data[((y + dy) * width + (x + dx)) * 4 + 3] === 0;
        });
        if (nextToClear) extra.push(i);
      }
    }
    for (const i of extra) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
    }
  }

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] !== 0) continue;
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
  }

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] === 0) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;
  const side = Math.max(croppedWidth, croppedHeight);
  const out = Buffer.alloc(side * side * 4, 0);
  const offsetX = Math.floor((side - croppedWidth) / 2);
  const offsetY = Math.floor((side - croppedHeight) / 2);

  for (let y = 0; y < croppedHeight; y++) {
    const srcStart = ((minY + y) * width + minX) * 4;
    const destStart = ((offsetY + y) * side + offsetX) * 4;
    data.copy(out, destStart, srcStart, srcStart + croppedWidth * 4);
  }

  return sharp(out, { raw: { width: side, height: side, channels: 4 } }).png();
}

async function writePng(source, size, dest) {
  await sharp(source)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(dest);
}

async function generateIcons() {
  const rootDir = path.join(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'app');
  const tempDir = path.join(__dirname, '.icon-tmp');
  const source = findSource(publicDir);

  if (!source) {
    throw new Error('No PNG favicon source found. Place one at scripts/favicon-source.png.');
  }

  fs.mkdirSync(tempDir, { recursive: true });
  const punchedPath = path.join(tempDir, 'punched.png');
  await (await punchOuterBackground(source)).toFile(punchedPath);

  const png16 = path.join(tempDir, '16.png');
  const png32 = path.join(tempDir, '32.png');
  const png48 = path.join(tempDir, '48.png');
  const png64 = path.join(tempDir, '64.png');
  const png180 = path.join(tempDir, '180.png');

  await Promise.all([
    writePng(punchedPath, 16, png16),
    writePng(punchedPath, 32, png32),
    writePng(punchedPath, 48, png48),
    writePng(punchedPath, 64, png64),
    writePng(punchedPath, 180, png180),
  ]);

  const icoBuffer = await pngToIco([png16, png32, png48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  fs.copyFileSync(png32, path.join(publicDir, 'icon.png'));
  fs.copyFileSync(png64, path.join(appDir, 'icon.png'));
  fs.copyFileSync(png180, path.join(publicDir, 'apple-touch-icon.png'));
  fs.copyFileSync(png180, path.join(appDir, 'apple-icon.png'));
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), generateSvgIcon());

  const leftoverIconIco = path.join(appDir, 'icon.ico');
  if (fs.existsSync(leftoverIconIco)) {
    fs.unlinkSync(leftoverIconIco);
  }

  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`Icons generated from ${path.relative(rootDir, source)}`);
}

generateIcons().catch((error) => {
  console.error(error);
  process.exit(1);
});
