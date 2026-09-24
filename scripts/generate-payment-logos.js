const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images', 'payments');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const paymentBadges = {
  'visa': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <g transform="translate(60, 38)">
      <!-- Visa Italic Wordmark with Gold Wing on V -->
      <path d="M -38 -15 L -26 15 L -18 15 L -10 -15 L -18 -15 L -22 6 L -30 -15 Z" fill="#1A1F71"/>
      <!-- Gold wing on V -->
      <path d="M -48 -15 L -34 15 L -28 15 L -42 -15 Z" fill="#F7B600"/>
      <!-- I -->
      <rect x="-7" y="-15" width="8" height="30" fill="#1A1F71"/>
      <!-- S -->
      <path d="M 17 -10 C 14 -16 5 -16 5 -10 C 5 -4 19 -5 19 6 C 19 16 7 16 3 10 L 8 4 C 11 9 14 9 14 6 C 14 3 0 3 0 -9 C 0 -18 13 -18 19 -11 Z" fill="#1A1F71"/>
      <!-- A -->
      <path d="M 23 15 L 31 -15 L 39 -15 L 47 15 L 39 15 L 37 8 L 29 8 L 27 15 Z M 31 2 L 35 2 L 33 -6 Z" fill="#1A1F71"/>
    </g>
  </svg>`,

  'mastercard': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <g transform="translate(60, 38)">
      <!-- Left Red Circle -->
      <circle cx="-16" cy="0" r="24" fill="#EB001B"/>
      <!-- Right Yellow Circle -->
      <circle cx="16" cy="0" r="24" fill="#F79E1B"/>
      <!-- Overlap Intersection -->
      <path d="M 0 -17.8 C 6.5 -13.5 10.8 -6.3 10.8 2 C 10.8 10.3 6.5 17.5 0 21.8 C -6.5 17.5 -10.8 10.3 -10.8 2 C -10.8 -6.3 -6.5 -13.5 0 -17.8 Z" fill="#FF5F00"/>
    </g>
  </svg>`,

  'amex': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#016FD0"/>
    <rect x="5" y="5" width="110" height="66" rx="6" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>
    <g transform="translate(60, 43)">
      <text x="0" y="-8" font-family="Arial Black, Impact, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" letter-spacing="1.5" text-anchor="middle">AMERICAN</text>
      <text x="0" y="10" font-family="Arial Black, Impact, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" letter-spacing="2" text-anchor="middle">EXPRESS</text>
    </g>
  </svg>`,

  'applepay': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#000000"/>
    <g transform="translate(60, 38)">
      <!-- Apple Logo -->
      <g transform="translate(-32, -4) scale(0.9)">
        <!-- Apple Leaf -->
        <path d="M 1.5 -16 C 5.5 -16 8 -19.5 7.5 -23 C 3.5 -22.5 1 -19.5 1.5 -16 Z" fill="#FFFFFF"/>
        <!-- Apple Body -->
        <path d="M -9 8 C -6 13 -2 13 2 9 C 6 13 10 13 13 8 C 17 -1 13 -13 6 -13 C 2 -13 0 -10 -2 -10 C -4 -10 -6 -13 -10 -13 C -17 -13 -21 0 -15 9 Z" fill="#FFFFFF"/>
      </g>
      <!-- Pay Text -->
      <text x="-4" y="8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="600" fill="#FFFFFF" letter-spacing="-0.5">Pay</text>
    </g>
  </svg>`,

  'paypal': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <g transform="translate(60, 38)">
      <!-- Double P Logo -->
      <g transform="translate(-38, -18) scale(0.85)">
        <path d="M 4 2 L 14 2 C 21 2 26 5 24 13 C 22 20 17 24 10 24 L 6 24 L 2 46 L -4 46 L 4 2 Z" fill="#003087"/>
        <path d="M 12 12 L 22 12 C 29 12 34 15 32 23 C 30 30 25 34 18 34 L 14 34 L 10 54 L 4 54 L 12 12 Z" fill="#0079C1" opacity="0.9"/>
      </g>
      <!-- PayPal text -->
      <text x="-3" y="7" font-family="Arial, Helvetica, sans-serif" font-size="18" font-style="italic" font-weight="900">
        <tspan fill="#003087">Pay</tspan><tspan fill="#0079C1">Pal</tspan>
      </text>
    </g>
  </svg>`,

  'gpay': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <g transform="translate(60, 38)">
      <!-- Google G Emblem -->
      <g transform="translate(-32, 0)">
        <path d="M 0 -13 C 5.5 -13 9.5 -10.8 11.5 -8.8 L 8.5 -5.8 C 7 -7.2 4.5 -8.5 0 -8.5 C -6.5 -8.5 -11.5 -3.5 -11.5 2.5 C -11.5 8.5 -6.5 13.5 0 13.5 C 6 13.5 9.5 9.5 10 5.5 L 0 5.5 L 0 1.5 L 14.5 1.5 C 14.8 2.8 15 4 15 5.5 C 15 12 10.5 17.5 0 17.5 C -8.5 17.5 -15.5 10.8 -15.5 2.5 C -15.5 -5.8 -8.5 -13 0 -13 Z" fill="#4285F4"/>
        <path d="M -11 -3 L -7.5 0 C -6.5 -2.5 -4.5 -4.5 -1.5 -5 L -1.5 -9 C -5.5 -8 -9 -5.5 -11 -3 Z" fill="#EA4335"/>
        <path d="M -11 8 C -9 10.5 -5.5 13 -1.5 14 L -1.5 10 C -4.5 9.5 -6.5 7.5 -7.5 5 L -11 8 Z" fill="#34A853"/>
        <path d="M -15.5 2.5 C -15.5 4.5 -14.5 6.5 -13 8 L -9.5 5 C -10.2 4.2 -10.5 3.3 -10.5 2.5 C -10.5 1.7 -10.2 0.8 -9.5 0 L -13 -3 C -14.5 -1.5 -15.5 0.5 -15.5 2.5 Z" fill="#FBBC05"/>
      </g>
      <!-- Pay Text -->
      <text x="-4" y="6" font-family="'Product Sans', Arial, sans-serif" font-size="20" font-weight="700" fill="#5F6368">Pay</text>
    </g>
  </svg>`,

  'upi': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <g transform="translate(60, 38)">
      <!-- UPI Arrows -->
      <g transform="translate(-38, 0)">
        <path d="M -6 -14 L 8 -14 L 0 0 L -14 0 Z" fill="#097939"/>
        <path d="M 0 0 L 14 0 L 6 14 L -8 14 Z" fill="#ED752E"/>
      </g>
      <!-- UPI Text -->
      <text x="-8" y="7" font-family="Arial Black, Impact, sans-serif" font-size="20" font-weight="900" fill="#2E3192" letter-spacing="1">UPI</text>
      <!-- Subtitle -->
      <text x="-8" y="19" font-family="Arial, sans-serif" font-size="6" font-weight="800" fill="#097939" letter-spacing="0.5">INSTANT PAY</text>
    </g>
  </svg>`,

  'klarna': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 76" width="120" height="76">
    <rect width="120" height="76" rx="10" fill="#FFB3C7"/>
    <g transform="translate(60, 44)">
      <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="900" fill="#0A0A0A" letter-spacing="-0.5" text-anchor="middle">Klarna.</text>
    </g>
  </svg>`
};

async function generate() {
  for (const [key, svg] of Object.entries(paymentBadges)) {
    const svgPath = path.join(dir, key + '.svg');
    const pngPath = path.join(dir, key + '.png');
    fs.writeFileSync(svgPath, svg, 'utf8');
    await sharp(Buffer.from(svg)).png().toFile(pngPath);
    console.log('Created payment logo:', key, '.svg & .png');
  }
}

generate().then(() => console.log('All payment logos generated successfully!'));
