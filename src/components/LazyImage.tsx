import React, { useState, useEffect, useRef } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatioClassName?: string;
  showHoverOverlay?: boolean;
  overlayGradient?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatioClassName = '',
  showHoverOverlay = true,
  overlayGradient,
  priority = false,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin: '120px 0px',
        threshold: 0.05,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const defaultOverlay =
    overlayGradient ||
    'bg-gradient-to-t from-[#0A0908]/80 via-[#D4A53A]/10 to-transparent';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group bg-[#1C1916] ${aspectRatioClassName} ${containerClassName}`}
    >
      {/* Shimmer Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 lazy-image-placeholder pointer-events-none" />
      )}

      {/* Main Image with scale transition on hover */}
      {isIntersecting && !hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-105 will-change-transform ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
          } ${className}`}
        />
      )}

      {/* Subtle Color Overlay on Hover */}
      {showHoverOverlay && isLoaded && !hasError && (
        <div
          className={`absolute inset-0 ${defaultOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none`}
        />
      )}

      {/* Fallback container if load fails */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1C1916] text-[#D4A53A] p-4 text-center">
          <UtensilsCrossed className="w-8 h-8 opacity-40 mb-2" />
          <span className="text-xs font-serif font-medium text-[#F5E6D3]/70">{alt}</span>
        </div>
      )}
    </div>
  );
};
