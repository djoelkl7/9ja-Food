import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { X, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigateToBooking: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigateToBooking }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!siteConfig.announcement.enabled || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#10471A] via-[#1B5E20] to-[#10471A] text-[#FFF7E8] text-xs font-medium py-2 px-4 border-b border-[#C6A15B]/40 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto text-center">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0 hidden sm:inline" />
          <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 hidden sm:inline" />
          <span className="leading-tight">
            {siteConfig.announcement.text}
          </span>
          {siteConfig.announcement.ctaText && (
            <button
              onClick={onNavigateToBooking}
              className="ml-2 underline text-[#C6A15B] hover:text-[#FFF7E8] transition-colors font-semibold cursor-pointer shrink-0"
            >
              {siteConfig.announcement.ctaText} →
            </button>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#FFF7E8]/60 hover:text-[#FFF7E8] p-1 -mr-2 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
