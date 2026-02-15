'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function KnowMe() {
  return (
    <section className="relative w-full bg-background py-24 md:py-32">
      {/* subtle mood layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_20%,rgba(255,200,120,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_25%,rgba(255,120,180,0.08),transparent_55%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT - Image Stack (Lounge framing) */}
          <div className="relative">
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-xl">
              <Image
                src="/JaneFourth.jpeg"
                alt="Private lounge ambiance"
                fill
                className="object-cover"
                priority
              />
              {/* soft vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
            </div>

            {/* Floating Secondary Image */}
            <div className="absolute -bottom-10 -right-10 hidden md:block h-56 w-56 overflow-hidden rounded-2xl border border-border shadow-lg bg-background">
              <Image
                src="/JaneFifth.jpeg"
                alt="Warm lounge details"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* RIGHT - Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              The Lounge
            </p>

            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-foreground leading-tight">
              A warm, discreet space — designed for release.
            </h2>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every session is paced with intention: calm lighting, a comfortable setup,
              and a respectful atmosphere where you can fully unwind.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              You can choose gentle relaxation or deeper pressure — always guided by
              your comfort. Clear communication, privacy, and professionalism remain
              non-negotiable.
            </p>

            {/* Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Discreet', desc: 'Private setting & respectful service.' },
                { title: 'Consent-first', desc: 'Boundaries and comfort come first.' },
                { title: 'Elevated care', desc: 'Clean, prepared, premium touch.' },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-muted/20 p-4"
                >
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle CTA */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Explore Sessions →
              </Link>

              <Link
                href="/termsandconditions"
                className="text-sm text-muted-foreground hover:text-foreground transition"
              >
                View lounge rules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
