import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  formattedNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '447342229865',
  formattedNumber = '+44 7342 229865',
  defaultMessage = 'Hello Naija Pot! I would like to make an enquiry / order food.',
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Interactive Tooltip Card on Hover / State */}
      <div
        className={`mb-3 bg-[#141210] text-[#FFFDF9] border border-[#D4A53A]/40 rounded-2xl p-4 shadow-2xl max-w-xs transition-all duration-300 origin-bottom-right ${
          isTooltipOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
        role="dialog"
        aria-label="WhatsApp quick chat"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A53A]">
              WhatsApp Kitchen Chat
            </span>
          </div>
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="text-stone-400 hover:text-white p-0.5 rounded cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed mb-3">
          Chat with the Naija Pot team directly for table bookings, event catering, or takeaway questions.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md active:scale-95"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.761.88 2.8.88 3.182 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.767-5.772-5.767zm7.65 5.766c0 4.218-3.433 7.651-7.65 7.651-1.336 0-2.434-.343-3.489-.968l-4.542 1.19 1.213-4.432c-.696-1.111-1.066-2.228-1.066-3.441 0-4.219 3.433-7.651 7.65-7.651 4.217 0 7.649 3.432 7.649 7.651z" />
          </svg>
          <span>Chat on WhatsApp</span>
        </a>
        <div className="mt-2 text-[10px] text-center text-stone-400 font-mono">
          {formattedNumber}
        </div>
      </div>

      {/* Main Floating WhatsApp Button */}
      <div className="relative group flex items-center">
        {/* Subtle hover label on desktop */}
        <span className="hidden sm:inline-block mr-3 py-1.5 px-3 rounded-full bg-[#141210]/95 backdrop-blur-md text-[#FFFDF9] text-xs font-semibold border border-[#D4A53A]/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
          Chat on WhatsApp <span className="text-[#25D366] font-mono text-[11px] ml-1">{formattedNumber}</span>
        </span>

        {/* Outer glowing pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-xs animate-ping pointer-events-none duration-1000" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsTooltipOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 border-2 border-white/30 cursor-pointer"
          aria-label={`Chat with Naija Pot on WhatsApp (${formattedNumber})`}
        >
          {/* Authentic WhatsApp Icon SVG */}
          <svg
            className="w-8 h-8 sm:w-9 sm:h-9 fill-current text-white filter drop-shadow-sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.507 14.307l-.009.075c-.301 1.057-1.469 1.942-2.391 2.083-.755.115-1.745.207-4.996-1.144-4.16-1.729-6.845-5.962-7.054-6.241-.208-.278-1.688-2.247-1.688-4.288 0-2.042 1.069-3.047 1.45-3.46.381-.413.832-.516 1.109-.516.277 0 .554.003.797.015.257.012.602-.097.941.719.348.832 1.189 2.903 1.293 3.117.104.214.173.466.035.743-.138.277-.208.45-.415.693-.208.243-.437.543-.624.729-.208.208-.426.434-.183.85.243.417 1.079 1.782 2.316 2.883 1.591 1.417 2.934 1.856 3.35 2.064.416.208.66.173.902-.104.243-.277 1.039-1.213 1.317-1.629.277-.416.554-.347.936-.208.381.139 2.424 1.144 2.84 1.352.416.208.693.312.797.485.104.173.104 1.005-.197 2.062zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.176L2 22l4.966-1.399C8.423 21.492 10.154 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>

          {/* Active online green dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#128C7E]" />
          </span>
        </a>
      </div>
    </div>
  );
};
