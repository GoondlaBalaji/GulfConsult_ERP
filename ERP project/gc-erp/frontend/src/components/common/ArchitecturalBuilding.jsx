import React from 'react';

/**
 * ArchitecturalBuilding
 * Authentic 3D Architectural Blueprint Skyline Watermark.
 * 
 * Exactly matches the user's reference design with 3 iconic corporate buildings:
 * 1. Left: Modern Curved Glass Commercial Building with Canopy & Fin
 * 2. Center: Stepped Crystalline High-Rise with Entrance Portico & Multi-Tier Setbacks
 * 3. Right: Contemporary Corporate Complex with Cantilevered Sky-Canopy & Wings
 */
export default function ArchitecturalBuilding({ className = "w-[480px] sm:w-[560px] lg:w-[640px] h-[120px] sm:h-[135px] lg:h-[150px] opacity-90" }) {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <img
        src="/architectural-building-transparent.png"
        alt="Gulf Consult 3D Architectural Buildings"
        className="w-full h-full object-contain object-bottom"
      />
    </div>
  );
}
