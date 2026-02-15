'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Zap, Heart, Feather } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Nuru Ritual',
      description:
        'A warm, silky full-body experience designed for deep relaxation and immersive sensation in a private lounge setting.',
      image: '/JaneSixth.jpeg',
      icon: Sparkles,
      benefits: [
        'Deep physical relaxation',
        'Heightened sensory awareness',
        'Warm oil application',
        'Slow, immersive pacing',
      ],
      duration: '60 – 90 minutes',
    },
    {
      id: 2,
      title: 'Deep Release',
      description:
        'Intentional pressure focused on easing tension while maintaining a calm, respectful flow throughout the session.',
      image: '/JaneSeveth.jpeg',
      icon: Zap,
      benefits: [
        'Relieves muscle tightness',
        'Improves flexibility',
        'Restores physical comfort',
        'Custom pressure control',
      ],
      duration: '60 – 120 minutes',
    },
    {
      id: 3,
      title: 'Full Body Serenity',
      description:
        'A smooth head-to-toe session crafted to calm the body and quiet the mind in an intimate, low-lit environment.',
      image: '/JaneThird.jpeg',
      icon: Heart,
      benefits: [
        'Total body relaxation',
        'Stress release',
        'Improved circulation',
        'Balanced full-body flow',
      ],
      duration: '90 – 120 minutes',
    },
    {
      id: 4,
      title: 'Erotic Massage',
      description:
        'A refined and elevated private session centered on comfort, communication, and mindful connection.',
      image: '/JaneFourth.jpeg',
      icon: Feather,
      benefits: [
        'Discreet atmosphere',
        'Clear boundaries',
        'Personalized pacing',
        'Relaxed intimate setting',
      ],
      duration: '60 – 90 minutes',
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Lounge Sessions
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif text-foreground leading-tight">
            Private sessions designed for calm, comfort, and connection
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Each experience is reserved in advance and tailored to your preferred pace.
            Professional standards and discretion remain at the center of every session.
          </p>
        </div>

        {/* Sessions */}
        <div className="mt-20 space-y-28">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center"
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border bg-card">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/40">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-3xl font-serif text-foreground">
                    {service.title}
                  </h2>
                </div>

                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits */}
                <ul className="mt-6 space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Duration:</span>{' '}
                  {service.duration}
                </p>

                <div className="mt-8 flex gap-4">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:opacity-95 transition"
                  >
                    Reserve this session
                  </Link>

                  <Link
                    href="/prices"
                    className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3 text-sm font-medium text-foreground hover:bg-muted transition"
                  >
                    View rates
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expectations */}
        <div className="mt-32 border-t border-border pt-16">
          <h2 className="text-3xl font-serif text-foreground">
            What to expect
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-3">
                Before your session
              </h3>
              <p>
                A brief message confirms your preferred time, comfort level, and expectations.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-3">
                During your session
              </h3>
              <p>
                Relax in a low-lit, private setting while techniques are applied with care and communication.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-3">
                After your session
              </h3>
              <p>
                Take your time before leaving. Hydration and gentle rest are recommended.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-3">
                Professional standards
              </h3>
              <p>
                Respect, discretion, and consent-first communication are maintained at all times.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/prices"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-95 transition"
            >
              Explore rates
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
