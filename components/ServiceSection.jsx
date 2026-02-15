'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Zap, Heart, Feather, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: 'Nuru Ritual',
      description:
        'A silky full-body session designed for deep relaxation, warmth, and a slow reset.',
      image: '/JaneSixth.jpeg',
      icon: Sparkles,
      tag: 'Signature',
    },
    {
      id: 2,
      title: 'Deep Release',
      description:
        'Focused pressure and pacing to ease tension, soften knots, and restore comfort.',
      image: '/JaneSeveth.jpeg',
      icon: Zap,
      tag: 'Restorative',
    },
    {
      id: 3,
      title: 'Full Body Serenity',
      description:
        'A head-to-toe flow to calm the nervous system and help you fully unwind.',
      image: '/JaneEighth.jpeg',
      icon: Heart,
      tag: 'Classic',
    },
    {
      id: 4,
      title: 'Sensory Lounge',
      description:
        'A refined, discreet experience crafted around comfort, boundaries, and mindful touch.',
      image: '/JaneNinth.jpeg',
      icon: Feather,
      tag: 'Private',
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Lounge Sessions
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Curated sessions — calm, close, and elevated
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              The most requested options, designed for comfort, discretion, and a premium lounge atmosphere.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Consent-first • Clear boundaries • Professional service
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition"
          >
            View all sessions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-3xl border border-border bg-background/70 backdrop-blur transition hover:bg-background"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-muted">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                {/* Tag + Icon */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-white/90">
                    {service.tag}
                  </span>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-serif font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-6">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:gap-3 transition-all"
                  >
                    See details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-muted/25 to-background">
          <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-8">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Reservations
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl font-serif font-semibold text-foreground">
                A private slot, reserved for you
              </h3>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                Sessions are by reservation to ensure privacy and uninterrupted attention. View rates, choose a time,
                or message us to confirm details before booking.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/prices"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
                >
                  View Rates
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3 text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Right side mini trust */}
            <div className="md:col-span-4">
              <div className="rounded-2xl border border-border bg-background/70 p-6 backdrop-blur">
                <p className="text-sm font-medium text-foreground">What to expect</p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    Clean, prepared lounge setting
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    Tailored pressure & pacing
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    Clear boundaries, consent-first
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
