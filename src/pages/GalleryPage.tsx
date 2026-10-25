import React, { useState } from 'react';
import { galleryItems, galleryCategories } from '../data/galleryData';
import { ImageLightbox } from '../components/ImageLightbox';
import { LazyImage } from '../components/LazyImage';
import { Sparkles, Maximize2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = galleryItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0B0A09] via-[#141210] to-[#26160C] text-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-[#D4A53A]/25">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A53A]/15 border border-[#D4A53A]/40 text-[#E8C547] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A53A]" />
            <span>Visual Culinary Journal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFFDF9]">
            The Naija Pot Gallery
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
            Glimpse into the warmth of our dining room, the smoke rising from our charcoal grills, and our signature plates.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {galleryCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3D2314] text-[#D4A53A] shadow-sm border border-[#D4A53A]'
                    : 'bg-white text-stone-700 border border-[#D4A53A]/20 hover:border-[#D4A53A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Editorial Grid with Intersection Observer Lazy Loading, Scale Transition and Hover Color Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-xl overflow-hidden bg-[#1C1916] border border-[#D4A53A]/25 shadow-sm hover:shadow-2xl transition-all cursor-pointer will-change-transform"
            >
              <div className="aspect-4/3 w-full relative overflow-hidden">
                <LazyImage
                  src={item.image}
                  alt={item.alt}
                  aspectRatioClassName="aspect-4/3"
                  containerClassName="w-full h-full"
                  showHoverOverlay={true}
                  overlayGradient="bg-gradient-to-t from-[#0A0908]/90 via-[#D4A53A]/15 to-transparent"
                />

                {/* Scrim Overlay for Permanent Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* View Zoom Trigger */}
                <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-xs text-[#FFF7E8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 border border-[#D4A53A]/40">
                  <Maximize2 className="w-4 h-4 text-[#D4A53A]" />
                </div>

                {/* Caption & Category */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A53A]">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-base font-bold leading-snug group-hover:text-[#E8C547] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox
        items={filteredGallery}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
