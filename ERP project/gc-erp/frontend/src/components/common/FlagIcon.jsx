import React from 'react';

/**
 * FlagIcon
 * Renders high-quality crisp SVG flag badges for employee nationalities.
 * Solves the issue where Windows OS renders country emojis as two-letter text signs.
 */
export default function FlagIcon({ country = 'KW', className = "w-4 h-3 rounded-[2px] shadow-xs shrink-0 overflow-hidden border border-black/10 inline-block align-middle" }) {
  const code = (country || '').toUpperCase().trim();

  // 1. Kuwait Flag (KW / KUWAITI)
  if (code === 'KW' || code.includes('KUWAIT')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#007a3d" />
        <rect y="13.33" width="60" height="13.33" fill="#ffffff" />
        <rect y="26.66" width="60" height="13.34" fill="#ce1126" />
        <polygon points="0,0 18,13.33 18,26.66 0,40" fill="#000000" />
      </svg>
    );
  }

  // 2. India Flag (IN / INDIAN)
  if (code === 'IN' || code.includes('IND')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#ff9933" />
        <rect y="13.33" width="60" height="13.33" fill="#ffffff" />
        <rect y="26.66" width="60" height="13.34" fill="#138808" />
        {/* Ashoka Chakra */}
        <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1" />
        <circle cx="30" cy="20" r="1.2" fill="#000080" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="30"
            y1="20"
            x2={30 + 4.8 * Math.cos((deg * Math.PI) / 180)}
            y2={20 + 4.8 * Math.sin((deg * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    );
  }

  // 3. Jordan Flag (JO / JORDANIAN)
  if (code === 'JO' || code.includes('JORDAN')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#000000" />
        <rect y="13.33" width="60" height="13.33" fill="#ffffff" />
        <rect y="26.66" width="60" height="13.34" fill="#007a3d" />
        <polygon points="0,0 28,20 0,40" fill="#ce1126" />
        {/* 7-Pointed Star */}
        <circle cx="10" cy="20" r="2.5" fill="#ffffff" />
      </svg>
    );
  }

  // 4. United Kingdom Flag (GB / UK / BRITISH)
  if (code === 'GB' || code === 'UK' || code.includes('BRIT')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#012169" />
        {/* White Saltire */}
        <line x1="0" y1="0" x2="60" y2="40" stroke="#ffffff" strokeWidth="6" />
        <line x1="60" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="6" />
        {/* Red Saltire */}
        <line x1="0" y1="0" x2="60" y2="40" stroke="#c8102e" strokeWidth="2.5" />
        <line x1="60" y1="0" x2="0" y2="40" stroke="#c8102e" strokeWidth="2.5" />
        {/* White St George Cross */}
        <rect x="25" width="10" height="40" fill="#ffffff" />
        <rect y="15" width="60" height="10" fill="#ffffff" />
        {/* Red St George Cross */}
        <rect x="27" width="6" height="40" fill="#c8102e" />
        <rect y="17" width="60" height="6" fill="#c8102e" />
      </svg>
    );
  }

  // 5. Egypt Flag (EG / EGYPTIAN)
  if (code === 'EG' || code.includes('EGYPT')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#ce1126" />
        <rect y="13.33" width="60" height="13.33" fill="#ffffff" />
        <rect y="26.66" width="60" height="13.34" fill="#000000" />
        {/* Eagle Emblem */}
        <path d="M 28,17 L 32,17 L 31,23 L 29,23 Z" fill="#c09838" />
        <circle cx="30" cy="18" r="1.5" fill="#c09838" />
      </svg>
    );
  }

  // 6. Russia Flag (RU / RUSSIAN)
  if (code === 'RU' || code.includes('RUSS')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#ffffff" />
        <rect y="13.33" width="60" height="13.33" fill="#0039a6" />
        <rect y="26.66" width="60" height="13.34" fill="#d52b1e" />
      </svg>
    );
  }

  // 7. Saudi Arabia Flag (SA / SAUDI)
  if (code === 'SA' || code.includes('SAUDI')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#006c35" />
        {/* White Sword and Shahada Bar */}
        <rect x="18" y="24" width="24" height="2" fill="#ffffff" rx="0.5" />
        <polygon points="18,23 15,25 18,27" fill="#ffffff" />
        <path d="M 17,14 Q 30,12 43,14 Q 30,16 17,14" fill="#ffffff" opacity="0.9" />
      </svg>
    );
  }

  // 8. United States Flag (US / USA / AMERICAN)
  if (code === 'US' || code === 'USA' || code.includes('AMER')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#b22234" />
        {[1, 3, 5].map((i) => (
          <rect key={i} y={i * 3.07} width="60" height="3.07" fill="#ffffff" />
        ))}
        {[7, 9, 11].map((i) => (
          <rect key={i} y={i * 3.07} width="60" height="3.07" fill="#ffffff" />
        ))}
        <rect width="25" height="21.5" fill="#3c3b6e" />
        <circle cx="12.5" cy="10.7" r="4" fill="#ffffff" opacity="0.8" />
      </svg>
    );
  }

  // 9. Philippines Flag (PH / FILIPINO)
  if (code === 'PH' || code.includes('PHILIP') || code.includes('FILIP')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="20" fill="#0038a8" />
        <rect y="20" width="60" height="20" fill="#ce1126" />
        <polygon points="0,0 26,20 0,40" fill="#ffffff" />
        <circle cx="9" cy="20" r="3.5" fill="#fcd116" />
      </svg>
    );
  }

  // 10. UAE Flag (AE / EMIRATI)
  if (code === 'AE' || code.includes('UAE') || code.includes('EMIRAT')) {
    return (
      <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#00732f" />
        <rect y="13.33" width="60" height="13.33" fill="#ffffff" />
        <rect y="26.66" width="60" height="13.34" fill="#000000" />
        <rect width="15" height="40" fill="#ff0000" />
      </svg>
    );
  }

  // Fallback: Neutral Blue/White clean flag icon
  return (
    <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#0284c7" />
      <polygon points="0,0 30,20 0,40" fill="#ffffff" />
      <rect x="25" y="15" width="30" height="10" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}
