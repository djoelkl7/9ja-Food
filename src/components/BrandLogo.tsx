import React from 'react';
import { siteConfig } from '../data/siteConfig';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'burgundy' | 'brown' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'brown',
  size = 'md',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light'; // For dark backgrounds like black/brown sections
  const primaryText = isLight ? '#FFFDF9' : variant === 'dark' ? '#0B0A09' : '#3D2314';
  const accentGold = '#D4A53A';
  const subtitleColor = isLight ? '#E8C547' : '#5C3822';

  const sizeClasses = {
    sm: { w: 32, h: 32, img: 'w-8 h-8', textMain: 'text-lg', subText: 'text-[9px]' },
    md: { w: 48, h: 48, img: 'w-12 h-12', textMain: 'text-2xl', subText: 'text-[10px]' },
    lg: { w: 64, h: 64, img: 'w-16 h-16', textMain: 'text-3xl', subText: 'text-xs' },
    xl: { w: 96, h: 96, img: 'w-24 h-24', textMain: 'text-4xl', subText: 'text-sm' },
  };

  const currentSize = sizeClasses[size];

  // If official logo image is configured, render the official Canva asset
  if (siteConfig.branding.logoImagePath) {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img
          src={siteConfig.branding.logoImagePath}
          alt={siteConfig.legalName}
          className={`${currentSize.img} object-contain rounded-full shadow-xs transition-transform duration-300 hover:scale-105 shrink-0 border border-[#C6A15B]/30`}
          referrerPolicy="no-referrer"
        />
        {showSubtitle && (
          <div className="flex flex-col leading-none">
            <span
              className={`font-serif font-black tracking-wider ${currentSize.textMain}`}
              style={{ color: primaryText }}
            >
              NAIJA <span style={{ color: accentGold }}>POT</span>
            </span>
            <span
              className={`font-sans uppercase font-semibold tracking-[0.22em] mt-0.5 ${currentSize.subText}`}
              style={{ color: subtitleColor }}
            >
              Kitchen & Grill Ltd
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Traditional Nigerian Iron Pot (Iskoto) & Golden Flame Emblem */}
      <svg
        width={currentSize.w}
        height={currentSize.h}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Naija Pot Emblem"
      >
        {/* Radiance / Flame Glow behind */}
        <circle cx="32" cy="32" r="30" fill={isLight ? 'rgba(198,161,91,0.15)' : 'rgba(109,31,43,0.08)'} />
        <circle cx="32" cy="32" r="29" stroke={accentGold} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Rising Golden Culinary Flames / Aromas */}
        <path
          d="M32 10C34 14 31 17 32 21C30 18 29 15 32 10Z"
          fill={accentGold}
        />
        <path
          d="M25 14C27 17 24 19 26 23C24 20 23 17 25 14Z"
          fill={accentGold}
          opacity="0.85"
        />
        <path
          d="M39 14C37 17 40 19 38 23C40 20 41 17 39 14Z"
          fill={accentGold}
          opacity="0.85"
        />

        {/* Traditional Pot Rim (Gold trimmed) */}
        <ellipse cx="32" cy="24" rx="19" ry="3.5" fill={accentGold} />
        <ellipse cx="32" cy="23.5" rx="17.5" ry="2.8" fill={primaryText} />

        {/* Pot Body (Traditional Round-bottomed Nigerian Cast Iron Cooking Pot) */}
        <path
          d="M13 24.5C13 24.5 14 43 32 43C50 43 51 24.5 51 24.5C46 27 38 27.8 32 27.8C26 27.8 18 27 13 24.5Z"
          fill={primaryText}
        />

        {/* Gold Band & Decorative geometric embossing on Pot */}
        <path
          d="M17 31C21 34 43 34 47 31"
          stroke={accentGold}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="35" r="1.5" fill={accentGold} />
        <circle cx="26" cy="34" r="1.2" fill={accentGold} />
        <circle cx="38" cy="34" r="1.2" fill={accentGold} />

        {/* Side Loop Handles */}
        <path
          d="M12 25.5C9 25.5 8 28.5 10 31.5C11.5 33.5 13.5 32.5 13.5 32.5"
          stroke={accentGold}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M52 25.5C55 25.5 56 28.5 54 31.5C52.5 33.5 50.5 32.5 50.5 32.5"
          stroke={accentGold}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Three Traditional Pot Tripod Legs */}
        <path d="M22 41L18 49C17.5 50 18.5 51 19.5 50.5L24 42" fill={accentGold} />
        <path d="M42 41L46 49C46.5 50 45.5 51 44.5 50.5L40 42" fill={accentGold} />
        <path d="M31 42.5L31 51C31 51.5 33 51.5 33 51L33 42.5" fill={accentGold} />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-black tracking-wider ${currentSize.textMain}`}
          style={{ color: primaryText }}
        >
          NAIJA <span style={{ color: accentGold }}>POT</span>
        </span>
        {showSubtitle && (
          <span
            className={`font-sans uppercase font-semibold tracking-[0.22em] mt-0.5 ${currentSize.subText}`}
            style={{ color: subtitleColor }}
          >
            Kitchen & Grill Ltd
          </span>
        )}
      </div>
    </div>
  );
};
