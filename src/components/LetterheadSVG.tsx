import React from 'react';

/**
 * LetterheadSVG Component
 * Renders the official "Aria Kavosh Pi Hamoun" (آریا کاوش پی هامون) letterhead graphics in high resolution.
 */
export const LetterheadSVG: React.FC<{ customImage?: string | null }> = ({ customImage }) => {
  if (customImage) {
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={customImage}
          alt="سربرگ شرکت"
          className="w-full h-full object-cover select-none"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none bg-white">
      <svg
        viewBox="0 0 210 297"
        className="w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Architectural Pattern for bottom right background */}
          <pattern id="archGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#e2e8f0" strokeWidth="0.15" opacity="0.6" />
            <polygon points="0,16 8,8 16,16" fill="none" stroke="#cbd5e1" strokeWidth="0.1" opacity="0.4" />
          </pattern>
        </defs>

        {/* ===================== TOP HEADER AREA ===================== */}
        
        {/* Top Right Yellow Header Polygon for Number/Date/Attachment */}
        {/* Yellow shape: spans top right corner */}
        <polygon
          points="0,0 120,0 95,33 0,33"
          fill="#F5B811"
        />
        
        {/* Top Dark Charcoal Trapezoid Header for Company Logo & Title */}
        <polygon
          points="90,0 210,0 210,40 100,40 85,0"
          fill="#33373B"
        />
        <polygon
          points="87,0 95,0 106,38 98,38"
          fill="#52585E"
          opacity="0.8"
        />

        {/* Decorative thin accent line under top yellow block */}
        <polygon
          points="0,33 95,33 90,36 0,36"
          fill="#D9A00A"
          opacity="0.8"
        />

        {/* Top Right Dashed Dotted Lines for Number, Date, Attachment */}
        <g stroke="#33373B" strokeWidth="0.25" strokeDasharray="0.8 0.8" opacity="0.6">
          <line x1="12" y1="10" x2="48" y2="10" />
          <line x1="12" y1="18" x2="48" y2="18" />
          <line x1="12" y1="26" x2="48" y2="26" />
        </g>

        {/* Labels in Top Yellow Area */}
        <text x="50" y="11" fontFamily="Vazirmatn" fontSize="3.6" fontWeight="bold" fill="#1e293b" textAnchor="start">
          شماره :
        </text>
        <text x="50" y="19" fontFamily="Vazirmatn" fontSize="3.6" fontWeight="bold" fill="#1e293b" textAnchor="start">
          تاریخ :
        </text>
        <text x="50" y="27" fontFamily="Vazirmatn" fontSize="3.6" fontWeight="bold" fill="#1e293b" textAnchor="start">
          پیوست :
        </text>

        {/* Logo and Company Name in Dark Header Bar */}
        {/* Golden AKPH Cube Logo Icon */}
        <g transform="translate(162, 7) scale(0.65)">
          <rect x="0" y="0" width="40" height="36" fill="#F5B811" rx="2" />
          <rect x="2" y="2" width="36" height="32" fill="#2B2F33" rx="1" />
          <text x="20" y="22" fontFamily="Vazirmatn" fontSize="12" fontWeight="900" fill="#F5B811" textAnchor="middle">
            AKPH
          </text>
        </g>

        {/* Company Title in White */}
        <text x="156" y="18" fontFamily="Vazirmatn" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="end">
          آریا کاوش
        </text>
        <text x="156" y="28" fontFamily="Vazirmatn" fontSize="6.5" fontWeight="bold" fill="#FFFFFF" textAnchor="end">
          پی هــــامون
        </text>


        {/* ===================== LEFT MARGIN GEOMETRIC LINES ===================== */}
        <g opacity="0.35" stroke="#475569" strokeWidth="0.25" fill="none">
          {/* Vertical left margin line */}
          <line x1="18" y1="42" x2="18" y2="260" strokeWidth="0.3" stroke="#64748b" />
          
          {/* Architectural geometric polygons down the left bar */}
          <path d="M 0,42 L 18,52 L 18,72 L 0,62 Z" fill="#f8fafc" />
          <path d="M 0,62 L 18,72 L 0,82 Z" fill="#e2e8f0" opacity="0.5" />
          <path d="M 0,82 L 18,92 L 18,112 L 0,102 Z" />
          <path d="M 0,102 L 18,112 L 0,122 Z" />
          <path d="M 0,122 L 18,132 L 18,152 L 0,142 Z" fill="#f1f5f9" />
          <path d="M 0,142 L 18,152 L 0,162 Z" />
          <path d="M 0,162 L 18,172 L 18,192 L 0,182 Z" />
          <path d="M 0,182 L 18,192 L 0,202 Z" />
          <path d="M 0,202 L 18,212 L 18,232 L 0,222 Z" />
          <path d="M 0,222 L 18,232 L 0,242 Z" />
          <path d="M 0,242 L 18,252 L 18,262 L 0,260 Z" />
        </g>

        {/* Faint Architectural Background Grid on Bottom Right */}
        <g opacity="0.22" stroke="#94a3b8" strokeWidth="0.2" fill="none">
          <polygon points="120,200 210,180 210,270 120,270" fill="url(#archGrid)" />
          <path d="M 110,230 L 140,210 L 210,230 M 130,250 L 160,230 L 210,250" />
        </g>

        {/* ===================== BOTTOM FOOTER AREA ===================== */}

        {/* Dark Charcoal Angled Base Bar under Footer */}
        <polygon points="80,268 210,268 210,297 160,297 70,297" fill="#33373B" />
        
        {/* Left Yellow Main Address Polygon */}
        <polygon points="0,262 85,262 160,297 0,297" fill="#F5B811" />
        <polygon points="80,262 87,262 147,297 140,297" fill="#D9A00A" opacity="0.7" />

        {/* Middle Dark/Yellow Accent Strip */}
        <polygon points="90,268 150,268 165,297 145,297" fill="#33373B" />

        {/* Footer Text - Address & Phone (Left Yellow Polygon) */}
        <g transform="translate(10, 268)">
          {/* Location Pin Icon */}
          <circle cx="70" cy="4" r="1.8" fill="#1e293b" />
          <path d="M 70,2.5 L 70,5.5 M 68.5,4 L 71.5,4" stroke="#ffffff" strokeWidth="0.4" />
          <text x="66" y="5" fontFamily="Vazirmatn" fontSize="3.1" fontWeight="bold" fill="#0f172a" textAnchor="end">
            مشهد- بلوار مجد - مجد ۲۰- شماره ۱۸
          </text>

          {/* Phone Icon */}
          <circle cx="70" cy="18" r="1.8" fill="#1e293b" />
          <path d="M 69,17 C 69,19 71,19 71,17" stroke="#ffffff" strokeWidth="0.4" fill="none" />
          <text x="66" y="19" fontFamily="Vazirmatn" fontSize="3.2" fontWeight="bold" fill="#0f172a" textAnchor="end">
            ۰۹۱۵۰۲۰۹۰۰۰ - ۳۷۲۵۹۰۳۵
          </text>
        </g>

        {/* Footer Text - Web & Email (Middle Dark Polygon) */}
        <g transform="translate(105, 271)">
          {/* Globe Icon */}
          <circle cx="-3" cy="4" r="1.5" fill="#F5B811" />
          <text x="1" y="5" fontFamily="Vazirmatn" fontSize="3" fontWeight="bold" fill="#FFFFFF" textAnchor="start">
            www.AriaKavosh.ir
          </text>

          {/* Mail Icon */}
          <rect x="-4.5" y="13" width="3" height="2.2" fill="#F5B811" rx="0.3" />
          <text x="1" y="15" fontFamily="Vazirmatn" fontSize="3" fontWeight="bold" fill="#FFFFFF" textAnchor="start">
            info@AriaKavosh.ir
          </text>
        </g>

        {/* Right QR Code Box */}
        <g transform="translate(168, 263)">
          {/* Yellow Box Frame */}
          <rect x="0" y="0" width="29" height="29" fill="#F5B811" rx="1" />
          <rect x="1.5" y="1.5" width="26" height="26" fill="#FFFFFF" rx="0.5" />
          
          {/* QR Code Pattern Simulation */}
          {/* Top-Left Finder */}
          <rect x="3.5" y="3.5" width="7" height="7" fill="#000000" />
          <rect x="5" y="5" width="4" height="4" fill="#FFFFFF" />
          <rect x="6" y="6" width="2" height="2" fill="#000000" />

          {/* Top-Right Finder */}
          <rect x="18.5" y="3.5" width="7" height="7" fill="#000000" />
          <rect x="20" y="5" width="4" height="4" fill="#FFFFFF" />
          <rect x="21" y="6" width="2" height="2" fill="#000000" />

          {/* Bottom-Left Finder */}
          <rect x="3.5" y="18.5" width="7" height="7" fill="#000000" />
          <rect x="5" y="20" width="4" height="4" fill="#FFFFFF" />
          <rect x="6" y="21" width="2" height="2" fill="#000000" />

          {/* QR Data Dots */}
          <rect x="12" y="4" width="2" height="2" fill="#000000" />
          <rect x="15" y="4" width="2" height="2" fill="#000000" />
          <rect x="12" y="7" width="2" height="2" fill="#000000" />
          <rect x="14" y="9" width="3" height="2" fill="#000000" />
          <rect x="4" y="12" width="2" height="2" fill="#000000" />
          <rect x="7" y="12" width="2" height="3" fill="#000000" />
          <rect x="10" y="12" width="2" height="2" fill="#000000" />
          <rect x="13" y="12" width="2" height="2" fill="#000000" />
          <rect x="16" y="12" width="3" height="2" fill="#000000" />
          <rect x="20" y="12" width="2" height="2" fill="#000000" />
          <rect x="23" y="12" width="2" height="4" fill="#000000" />
          <rect x="12" y="15" width="4" height="2" fill="#000000" />
          <rect x="17" y="15" width="2" height="3" fill="#000000" />
          <rect x="12" y="18" width="2" height="2" fill="#000000" />
          <rect x="15" y="18" width="3" height="2" fill="#000000" />
          <rect x="19" y="18" width="2" height="2" fill="#000000" />
          <rect x="22" y="18" width="3" height="3" fill="#000000" />
          <rect x="12" y="21" width="2" height="3" fill="#000000" />
          <rect x="15" y="22" width="3" height="2" fill="#000000" />
          <rect x="19" y="21" width="2" height="4" fill="#000000" />
        </g>
      </svg>
    </div>
  );
};
