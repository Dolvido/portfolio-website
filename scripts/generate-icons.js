const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

function generateSvgIcon() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#f2efe7"/>
  <rect x="1.75" y="1.75" width="28.5" height="28.5" rx="6" fill="none" stroke="#1b1a16" stroke-width="2.5"/>
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

async function writePng(source, size, dest) {
  await sharp(source).resize(size, size).png().toFile(dest);
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
  const png16 = path.join(tempDir, '16.png');
  const png32 = path.join(tempDir, '32.png');
  const png48 = path.join(tempDir, '48.png');
  const png64 = path.join(tempDir, '64.png');
  const png180 = path.join(tempDir, '180.png');

  await Promise.all([
    writePng(source, 16, png16),
    writePng(source, 32, png32),
    writePng(source, 48, png48),
    writePng(source, 64, png64),
    writePng(source, 180, png180),
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
