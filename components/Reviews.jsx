'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  { name: "Amanda R.", text: "Absolutely amazing session. I felt relaxed and refreshed immediately." },
  { name: "James K.", text: "Very professional and calming experience. Highly recommend." },
  { name: "Sophia M.", text: "The best session I’ve had in years." },
  { name: "Daniel T.", text: "Clean environment, great technique, and very respectful." },
  { name: "Lauren P.", text: "Helped relieve my back tension after just one visit." },
  { name: "Michael B.", text: "Comfortable, discreet, and worth every minute." },
  { name: "Rachel S.", text: "Felt at ease from start to finish." },
  { name: "Chris W.", text: "Attentive, skilled, and genuinely professional." },
  { name: "Emily D.", text: "A perfect balance of calm and deeper pressure." },
  { name: "Joshua L.", text: "Exceeded my expectations. Booking again soon." },
  { name: "Nicole A.", text: "Warm atmosphere and great communication." },
  { name: "Brian H.", text: "Helped me unwind after a stressful week." },
  { name: "Vanessa O.", text: "Excellent service and clear boundaries." },
  { name: "Kevin N.", text: "One of the best private experiences I’ve had." },
  { name: "Melissa J.", text: "Very intuitive and respectful throughout." },
  { name: "Andrew C.", text: "Felt like a reset for my body and mood." },
  { name: "Tina E.", text: "Gentle, calming, and extremely professional." },
  { name: "Robert F.", text: "Great pressure and attention to detail." },
  { name: "Hannah V.", text: "Relaxing from the first minute." },
  { name: "Eric Z.", text: "I left feeling lighter and more at ease." },
];

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  const current = reviews[index];

  const rating = 4.9; // placeholder
  const totalReviews = useMemo(() => 200, []); // placeholder
  const stars = 5;

  useEffect(() => {
    if (pause) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [pause]);

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  // Elegant indicator logic: 8-dot window that follows your current index
  const visibleDots = 8;
  const pageStart = Math.floor(index / visibleDots) * visibleDots;
  const dotItems = reviews.slice(pageStart, pageStart + visibleDots);

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-b from-background via-muted/25 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Lounge Guests
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Quiet words from our guests
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              Discreet from the first message — calm, respectful, and elevated through to the end.
            </p>
          </div>

          {/* Rating summary */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-5 py-3 backdrop-blur">
            <div className="flex items-center gap-1">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>{" "}
              <span className="text-muted-foreground">/ 5</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-muted-foreground">{totalReviews}+ notes</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Quote Card */}
          <div
            className="lg:col-span-8 rounded-3xl border border-border bg-background/80 backdrop-blur p-8 md:p-10 shadow-sm"
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Private guest note
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted transition"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted transition"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quote */}
            <div key={index} className="mt-8 animate-in fade-in duration-500">
              <p className="text-2xl md:text-3xl font-serif text-foreground leading-snug">
                “{current.text}”
              </p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  — <span className="font-medium text-foreground">{current.name}</span>
                </p>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress indicators (windowed) */}
            <div className="mt-8 flex items-center gap-2">
              {dotItems.map((_, i) => {
                const absoluteIndex = pageStart + i;
                const active = absoluteIndex === index;

                return (
                  <button
                    key={absoluteIndex}
                    onClick={() => setIndex(absoluteIndex)}
                    className={`h-[4px] rounded-full transition-all ${
                      active
                        ? "w-12 bg-foreground/80"
                        : "w-7 bg-foreground/20 hover:bg-foreground/35"
                    }`}
                    aria-label={`Go to review ${absoluteIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Side cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-background/70 p-7 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                What guests mention
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Discreet atmosphere and premium comfort
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Clear communication and respectful pacing
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Professional standards and boundaries
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/25 to-background p-7">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Reservation note
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Sessions are reserved in advance to maintain privacy and uninterrupted time.
                View rates, then message us to confirm your preferred slot.
              </p>
              <Link
                href="/prices"
                className="mt-5 inline-flex text-sm font-medium text-foreground hover:opacity-80 transition"
              >
                View rates →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
