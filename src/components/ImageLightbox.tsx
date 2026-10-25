import React, { useEffect } from 'react';
import { GalleryItem } from '../data/galleryData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      <button
        onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer z-10"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer z-10"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img
          src={currentItem.image}
          alt={currentItem.alt}
          className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
          referrerPolicy="no-referrer"
        />
        <div className="mt-4 text-center text-white space-y-1 max-w-xl">
          <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            {currentItem.categoryLabel}
          </div>
          <h4 className="font-serif text-lg font-bold">{currentItem.title}</h4>
          <p className="text-xs text-white/80 leading-relaxed">{currentItem.caption}</p>
        </div>
      </div>
    </div>
  );
};
