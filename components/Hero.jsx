'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const images = useMemo(
    () => ['/JaneFirst.jpeg', '/JaneSecond.jpeg', '/JaneThird.jpeg'],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % images.length);
    }, 5600);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Private lounge ambiance ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              quality={95}
            />
          </div>
        ))}
      </div>

      {/* Lounge Overlay: deeper shadows + warm glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(255,200,120,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_30%,rgba(255,120,180,0.10),transparent_55%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          {/* Label */}
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/90">
            Private Lounge • By Reservation
          </p>

          {/* Headline */}
          <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            A softer night for your body —{' '}
            <span className="text-white/90">calm, close, and discreet.</span>
          </h1>

          {/* Copy */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Step into a warm lounge atmosphere designed for relaxation and connection — soothing touch,
            premium care, and a respectful experience that helps you unwind completely.
          </p>

          {/* Micro note (tasteful + professional) */}
          <p className="mt-4 text-xs text-white/70">
            Discreet service • Consent-first • Professional standards
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/prices"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black shadow-sm hover:opacity-95 transition"
            >
              Reserve a Session
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/15 transition"
            >
              View Sessions
            </Link>
          </div>

          {/* Trust Row */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
            {[
              'Private lounge setting',
              'Clean & prepared',
              'Gentle or deep pressure',
              'Respectful experience',
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs text-white/85"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Indicators: lounge-style bar */}
          <div className="mt-10 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-[4px] rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'w-12 bg-white'
                    : 'w-7 bg-white/35 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <span className="h-10 w-[1px] bg-white/30" />
        </div>
      </div>
    </section>
  );
}
