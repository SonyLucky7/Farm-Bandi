const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images', 'brands');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const brandLogos = {
  'aashirvaad': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#F0E4D4" stroke-width="2"/>
    <path d="M 40 42 Q 160 12 280 42" fill="none" stroke="#C62828" stroke-width="6" stroke-linecap="round"/>
    <g transform="translate(160, 28) scale(0.9)">
      <path d="M 0 -12 C 4 -6 4 6 0 10 C -4 6 -4 -6 0 -12 Z" fill="#D4A373"/>
      <path d="M -6 -8 C -4 -3 -2 5 -8 7 C -10 3 -8 -4 -6 -8 Z" fill="#E5A65E"/>
      <path d="M 6 -8 C 4 -3 2 5 8 7 C 10 3 8 -4 6 -8 Z" fill="#E5A65E"/>
      <path d="M -10 -2 C -7 2 -4 9 -12 12 C -14 7 -12 2 -10 -2 Z" fill="#D4A373"/>
      <path d="M 10 -2 C 7 2 4 9 12 12 C 14 7 12 2 10 -2 Z" fill="#D4A373"/>
    </g>
    <text x="160" y="76" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="900" fill="#C62828" letter-spacing="3" text-anchor="middle">AASHIRVAAD</text>
    <text x="160" y="96" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#795548" letter-spacing="1.5" text-anchor="middle">SHUDDH CHAKKI ATTA • 100% PURE</text>
  </svg>`,

  'tata': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <g transform="translate(56, 60)">
      <circle cx="0" cy="0" r="36" fill="#00529B"/>
      <path d="M -20 -14 L 20 -14 L 14 -4 L 5 -4 L 5 18 L -5 18 L -5 -4 L -14 -4 Z" fill="#FFFFFF"/>
      <path d="M -16 6 Q 0 16 16 6" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
    </g>
    <text x="120" y="68" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="900" fill="#00529B" letter-spacing="6">TATA</text>
    <text x="122" y="88" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#64748B" letter-spacing="2">SALT • TEA • SAMPANN DALS</text>
  </svg>`,

  'mtr': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#FEE2E2" stroke-width="2"/>
    <g transform="translate(160, 60)">
      <rect x="0" y="0" width="260" height="88" rx="44" fill="#C62828" stroke="#F59E0B" stroke-width="4" transform="translate(-130, -44)"/>
      <rect x="0" y="0" width="248" height="76" rx="38" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="4,3" transform="translate(-124, -38)"/>
      <text x="0" y="14" font-family="Georgia, serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="5" text-anchor="middle">MTR</text>
      <text x="0" y="32" font-family="Arial, sans-serif" font-size="9" font-weight="800" fill="#FEF08A" letter-spacing="3" text-anchor="middle">SINCE 1924 • AUTHENTIC TASTE</text>
    </g>
  </svg>`,

  'haldirams': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#FEE2E2" stroke-width="2"/>
    <g transform="translate(160, 60)">
      <path d="M -18 -32 L -24 -16 L -10 -22 L 0 -34 L 10 -22 L 24 -16 L 18 -32 Z" fill="#EAB308"/>
      <circle cx="-18" cy="-34" r="2" fill="#CA8A04"/>
      <circle cx="0" cy="-36" r="2.5" fill="#CA8A04"/>
      <circle cx="18" cy="-34" r="2" fill="#CA8A04"/>
      <rect x="-125" y="-16" width="250" height="46" rx="10" fill="#DC2626"/>
      <text x="0" y="16" font-family="Georgia, serif" font-size="28" font-style="italic" font-weight="bold" fill="#FEF08A" letter-spacing="1" text-anchor="middle">Haldiram&apos;s</text>
      <text x="0" y="44" font-family="Arial, sans-serif" font-size="9" font-weight="800" fill="#B91C1C" letter-spacing="2" text-anchor="middle">TRADITIONAL SWEETS &amp; NAMKEEN</text>
    </g>
  </svg>`,

  'mdh': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#FEE2E2" stroke-width="2"/>
    <g transform="translate(160, 60)">
      <ellipse cx="0" cy="-4" rx="95" ry="40" fill="#B91C1C" stroke="#D97706" stroke-width="4"/>
      <ellipse cx="0" cy="-4" rx="88" ry="34" fill="none" stroke="#FDE68A" stroke-width="1.5"/>
      <text x="0" y="8" font-family="Arial Black, Impact, sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" letter-spacing="6" text-anchor="middle">M.D.H</text>
      <text x="0" y="46" font-family="Arial, sans-serif" font-size="10" font-weight="800" fill="#991B1B" letter-spacing="1.5" text-anchor="middle">ASLI MASALE SACH SACH • 1919</text>
    </g>
  </svg>`,

  'everest': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#FEE2E2" stroke-width="2"/>
    <g transform="translate(160, 56)">
      <path d="M -110 18 L -30 -38 L 0 -18 L 30 -38 L 110 18 Z" fill="#BE123C"/>
      <path d="M -30 -38 L 0 -18 L 30 -38 L 22 -26 L 0 -12 L -22 -26 Z" fill="#FFFFFF" opacity="0.85"/>
      <text x="0" y="10" font-family="Arial Black, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" letter-spacing="4" text-anchor="middle">EVEREST</text>
      <text x="0" y="40" font-family="Arial, sans-serif" font-size="10" font-weight="800" fill="#881337" letter-spacing="2" text-anchor="middle">PURE SPICES • TASTE &amp; PURITY</text>
    </g>
  </svg>`,

  '24-mantra': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#DCFCE7" stroke-width="2"/>
    <g transform="translate(60, 60)">
      <circle cx="0" cy="0" r="38" fill="#15803D"/>
      <circle cx="0" cy="0" r="34" fill="none" stroke="#86EFAC" stroke-width="2"/>
      <path d="M 0 -22 C 12 -12 14 10 0 20 C -14 10 -12 -12 0 -22 Z" fill="#FFFFFF"/>
      <text x="0" y="6" font-family="Arial Black, sans-serif" font-size="20" font-weight="900" fill="#15803D" text-anchor="middle">24</text>
    </g>
    <text x="115" y="54" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="#15803D" letter-spacing="1">24 MANTRA</text>
    <text x="116" y="76" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#854D0E" letter-spacing="4">ORGANIC</text>
    <text x="116" y="94" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#166534" letter-spacing="1">100% PURE FARM CERTIFIED</text>
  </svg>`,

  'dabur': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#DCFCE7" stroke-width="2"/>
    <g transform="translate(56, 60)">
      <circle cx="0" cy="0" r="36" fill="#166534"/>
      <path d="M 0 -20 C 14 -18 20 -4 14 8 C 8 20 -8 20 -14 8 C -20 -4 -14 -18 0 -20 Z" fill="#86EFAC"/>
      <path d="M -2 18 L -2 4 L 2 4 L 2 18 Z" fill="#FEF08A"/>
    </g>
    <text x="110" y="62" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="900" fill="#DC2626" letter-spacing="2">Dabur</text>
    <text x="112" y="86" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#166534" letter-spacing="2">NATURAL &amp; AYURVEDIC ESSENTIALS</text>
  </svg>`,

  'patanjali': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#FEF3C7" stroke-width="2"/>
    <g transform="translate(56, 60)">
      <circle cx="0" cy="0" r="36" fill="#14532D"/>
      <path d="M 0 -22 C 16 -12 16 14 0 22 C -16 14 -16 -12 0 -22 Z" fill="#4ADE80"/>
      <path d="M -6 0 Q 0 -12 12 -4 Q 0 4 -6 0" fill="#EA580C"/>
    </g>
    <text x="110" y="60" font-family="Arial Black, sans-serif" font-size="28" font-weight="900" fill="#166534" letter-spacing="2">PATANJALI</text>
    <text x="112" y="84" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#D97706" letter-spacing="1.5">PRAKRITI KA AASHIRWAAD • GHEE</text>
  </svg>`,

  'generic': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <rect width="320" height="120" rx="16" fill="#FFFFFF" stroke="#DCFCE7" stroke-width="2"/>
    <g transform="translate(56, 60)">
      <circle cx="0" cy="0" r="36" fill="#155E40"/>
      <path d="M -14 2 L 14 2 L 10 18 L -10 18 Z" fill="#D4A373"/>
      <path d="M 0 -16 C 6 -10 6 -2 0 4 C -6 -2 -6 -10 0 -16 Z" fill="#4ADE80"/>
      <path d="M 6 -8 C 12 -6 12 0 6 4" fill="none" stroke="#86EFAC" stroke-width="2"/>
    </g>
    <text x="108" y="56" font-family="Arial Black, sans-serif" font-size="22" font-weight="900" fill="#155E40" letter-spacing="1">FARM FRESH</text>
    <text x="110" y="76" font-family="Georgia, serif" font-size="14" font-weight="bold" font-style="italic" fill="#D4A373">Daily Harvest</text>
    <text x="110" y="94" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#64748B" letter-spacing="1.5">DIRECT FROM GROWER ORCHARDS</text>
  </svg>`
};

async function generate() {
  for (const [key, svg] of Object.entries(brandLogos)) {
    const svgPath = path.join(dir, key + '.svg');
    const pngPath = path.join(dir, key + '.png');
    fs.writeFileSync(svgPath, svg, 'utf8');
    await sharp(Buffer.from(svg)).png().toFile(pngPath);
    console.log('Created:', key, '.svg and .png');
  }
}

generate().then(() => console.log('Successfully generated all brand logos!'));
