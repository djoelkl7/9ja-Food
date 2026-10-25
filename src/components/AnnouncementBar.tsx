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
    <div className="bg-[#141210] text-[#FAF6F0] text-xs font-medium py-2 px-4 border-b border-[#D4A53A]/30 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A53A] shrink-0 hidden sm:inline" />
          <span className="leading-tight">
            {siteConfig.announcement.text}
          </span>
          {siteConfig.announcement.ctaText && (
            <button
              onClick={onNavigateToBooking}
              className="ml-2 underline text-[#D4A53A] hover:text-[#E8C547] transition-colors font-semibold cursor-pointer shrink-0"
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
