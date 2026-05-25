"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Play,
  ImageIcon,
} from "lucide-react";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt: string;
  featured: boolean;
}

interface CarGalleryProps {
  media: MediaItem[];
  carName: string;
}

export default function CarGallery({ media, carName }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const featuredIndex = media.findIndex((m) => m.featured) ?? 0;
  const currentMedia = media[selectedIndex];

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const goToPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    },
    [goToNext, goToPrev]
  );

  return (
    <>
      <div className="space-y-3">
        {/* Main Image / Video */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label={`View ${carName} gallery - ${currentMedia.alt}`}
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9]">
            {currentMedia.type === "image" ? (
              <Image
                src={currentMedia.url}
                alt={currentMedia.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority={selectedIndex === featuredIndex}
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <video
                src={currentMedia.url}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <track kind="captions" />
              </video>
            )}

            {/* Zoom overlay */}
            {currentMedia.type === "image" && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <ImageIcon size={12} className="text-white/70" />
              <span className="text-xs text-white/70 font-medium">
                {selectedIndex + 1} / {media.length}
              </span>
            </div>

            {/* Navigation arrows (visible on hover, always on mobile) */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {media.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {media.map((item, index) => (
              <button
                key={`${item.url}-${index}`}
                onClick={() => setSelectedIndex(index)}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === selectedIndex
                    ? "border-gold ring-1 ring-gold/30"
                    : "border-white/10 hover:border-white/30"
                }`}
                aria-label={`View ${item.alt}`}
                aria-current={index === selectedIndex ? "true" : undefined}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <Play size={16} className="text-gold" />
                  </div>
                )}

                {/* Featured badge */}
                {item.featured && (
                  <div className="absolute top-0.5 left-0.5 bg-gold/90 rounded-sm px-1">
                    <span className="text-[8px] font-bold text-black">
                      MAIN
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label="Image lightbox"
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-10 text-sm text-white/60">
              {selectedIndex + 1} / {media.length}
            </div>

            {/* Main lightbox image */}
            <div
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {currentMedia.type === "image" ? (
                <Image
                  src={currentMedia.url}
                  alt={currentMedia.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                />
              ) : (
                <video
                  src={currentMedia.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                >
                  <track kind="captions" />
                </video>
              )}
            </div>

            {/* Navigation */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Thumbnail strip in lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-1">
              {media.map((item, index) => (
                <button
                  key={`lb-${item.url}-${index}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedIndex
                      ? "border-gold opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`View ${item.alt}`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <Play size={12} className="text-gold" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
