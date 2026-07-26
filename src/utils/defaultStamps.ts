/**
 * Default SVG Data-URIs for Company Stamp & Official Signature
 */

// Official Circular Stamp for "شرکت آریا کاوش پی هامون"
export function createDefaultCompanyStampSVG(): string {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="92" fill="none" stroke="#1d4ed8" stroke-width="5" stroke-dasharray="190 6" opacity="0.88"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="#1d4ed8" stroke-width="2" opacity="0.88"/>
    <circle cx="100" cy="100" r="54" fill="none" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.88"/>
    
    <!-- Top Curved Text Path -->
    <path id="textPathTop" d="M 28,100 A 72,72 0 1,1 172,100" fill="none"/>
    <text font-family="Vazirmatn" font-size="13" font-weight="bold" fill="#1d4ed8" opacity="0.9">
      <textPath href="#textPathTop" startOffset="50%" text-anchor="middle">
        شرکت آریا کاوش پی هامون (سهامی خاص)
      </textPath>
    </text>

    <!-- Bottom Curved Text Path -->
    <path id="textPathBottom" d="M 172,100 A 72,72 0 0,1 28,100" fill="none"/>
    <text font-family="Vazirmatn" font-size="11" font-weight="bold" fill="#1d4ed8" opacity="0.9">
      <textPath href="#textPathBottom" startOffset="50%" text-anchor="middle">
        ثبت: ۴۵۲۰۹۰ • شناسه ملی: ۱۰۳۸۰۶۰۰
      </textPath>
    </text>

    <!-- Center Logo & Stars -->
    <polygon points="100,68 108,84 126,84 112,94 118,110 100,100 82,110 88,94 74,84 92,84" fill="#1d4ed8" opacity="0.8"/>
    <text x="100" y="125" font-family="Vazirmatn" font-size="12" font-weight="bold" fill="#1d4ed8" text-anchor="middle" opacity="0.9">
      ★ هیئت مدیره ★
    </text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
}

// Realistic Executive Signature SVG
export function createDefaultSignatureSVG(): string {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="110" viewBox="0 0 220 110">
    <path d="M 25,65 C 45,20 65,15 85,45 C 95,60 110,85 130,55 C 145,30 160,25 180,45 C 190,55 170,80 140,85 C 110,90 85,75 75,55 C 65,35 90,25 115,35 C 140,45 165,70 195,60" fill="none" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
    <path d="M 40,85 Q 90,95 180,82" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
    <circle cx="185" cy="40" r="2.5" fill="#0f172a"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
}
