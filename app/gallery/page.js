'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const images = useMemo(
    () => [
      { id: 1, src: '/JaneFirst.jpeg', alt: 'Low-lit lounge atmosphere with warm tones', span: 'md:col-span-2 md:row-span-2', tag: 'Atmosphere' },
      { id: 2, src: '/JaneSecond.jpeg', alt: 'Calm setup with soft lighting and clean details', span: 'md:col-span-1 md:row-span-1', tag: 'Setup' },
      { id: 3, src: '/JaneThird.jpeg', alt: 'Premium oils and essentials prepared with care', span: 'md:col-span-1 md:row-span-1', tag: 'Details' },
      { id: 4, src: '/JaneFourth.jpeg', alt: 'Warm textures and discreet lounge styling', span: 'md:col-span-1 md:row-span-2', tag: 'Atmosphere' },
      { id: 5, src: '/JaneFifth.jpeg', alt: 'Fresh linens and a prepared private space', span: 'md:col-span-1 md:row-span-1', tag: 'Setup' },
      { id: 6, src: '/JaneSixth.jpeg', alt: 'Comfort-focused preparation for an elevated session', span: 'md:col-span-2 md:row-span-1', tag: 'Setup' },
      { id: 7, src: '/JaneSeveth.jpeg', alt: 'Quiet corner designed for comfort and privacy', span: 'md:col-span-1 md:row-span-1', tag: 'Atmosphere' },
      { id: 8, src: '/JaneEighth.jpeg', alt: 'Signature arrangement with premium finishing touches', span: 'md:col-span-1 md:row-span-1', tag: 'Details' },
      { id: 9, src: '/JaneNinth.jpeg', alt: 'Soft lighting for a private, relaxed moment', span: 'md:col-span-1 md:row-span-1', tag: 'Atmosphere' },
      { id: 10, src: '/JaneTenth.jpeg', alt: 'A velvet lounge feel — warm, discreet, and refined', span: 'md:col-span-2 md:row-span-2', tag: 'Atmosphere' },
      { id: 11, src: '/JaneEleventh.jpeg', alt: 'Small details curated for a premium experience', span: 'md:col-span-1 md:row-span-1', tag: 'Details' },
      { id: 12, src: '/JaneTwelth.jpeg', alt: 'Soft velvet tones with a clean, private finish', span: 'md:col-span-1 md:row-span-1', tag: 'Atmosphere' },
      { id: 13, src: '/JaneThirteenth.jpeg', alt: 'Premium setup prepared for a calm session', span: 'md:col-span-2 md:row-span-1', tag: 'Setup' },
      { id: 14, src: '/JaneFourtenth.jpeg', alt: 'Warm details curated for comfort and discretion', span: 'md:col-span-1 md:row-span-2', tag: 'Details' },
      { id: 15, src: '/JaneFifteenth.jpeg', alt: 'A quiet, refined corner designed for relaxation', span: 'md:col-span-1 md:row-span-1', tag: 'Atmosphere' },
      { id: 16, src: '/JaneSixteenth.jpeg', alt: 'A final premium touch — clean, warm, and intentional', span: 'md:col-span-1 md:row-span-1', tag: 'Details' },
    ],
    []
  );

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i + 1) % images.length);
  };

  // Lock scroll when lightbox open
  useEffect(() => {
    if (selectedIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedIndex]);

  // Keyboard controls: Esc, ←, →
  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  return (
    <>
      <section className="relative w-full bg-background py-24 md:py-32">
        {/* subtle lounge glow */}
        <div className="pointer-events-none absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,185,120,0.14),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,120,160,0.10),transparent_60%)] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Gallery
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-serif text-foreground">
              A glimpse into the lounge atmosphere
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Warm lighting, clean preparation, and discreet details. This is a private space built for comfort,
              calm pacing, and an elevated experience.
            </p>

            {/* Curated chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Atmosphere', 'Setup', 'Details'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {images.map((image, idx) => (
              <button
                type="button"
                key={image.id}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card/70 text-left ${image.span}`}
                style={{ minHeight: '250px' }}
                aria-label={`Open image: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={image.id === 1}
                />

                {/* velvet overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(224,185,120,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tag + View */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-white/90">
                    {image.tag}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/90">
                    View ⤢
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl"
          onClick={closeLightbox}
          aria-modal="true"
          role="dialog"
        >
          {/* Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15 transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white hover:bg-white/15 transition"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 transition"
            aria-label="Close lightbox"
          >
            Close ✕
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[78vh] overflow-hidden rounded-3xl border border-white/10 bg-black/30">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                quality={95}
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center text-white/85 text-sm">
              {selectedImage.alt}{' '}
              <span className="text-white/50">(Esc to close • ← → to navigate)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
