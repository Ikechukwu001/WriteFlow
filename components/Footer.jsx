import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-background via-muted/40 to-background">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Private Lounge
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-serif font-semibold text-foreground">
                Reserve your private slot
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                A calm, discreet atmosphere with professional care and clear boundaries — by reservation only.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Consent-first • Respectful service • Clean & prepared setting
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/prices"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
              >
                Reserve
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3 text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <div className="leading-none">
                <p className="text-xl font-serif font-semibold text-foreground">
                  Joslyn Jane&apos;s Lounge
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Private • Discreet • Elevated
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A warm lounge experience built around calm pacing, comfort, and professionalism.
              Every session is guided by clear communication and respectful boundaries.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Discreet reservations
              </span>
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Consent-first
              </span>
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Private setting
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-medium text-foreground">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Sessions' },
                { href: '/prices', label: 'Rates' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/review', label: 'Reviews' },
                { href: '/termsandconditions', label: 'Lounge Rules' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-medium text-foreground">Contact</h4>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground/80">
                  Phone
                </span>
                <a href="tel:+1(720)331-3799" className="mt-2 inline-block text-sm text-muted-foreground hover:text-foreground transition">
                  +1 (720) 331-3799 
                </a>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground/80">
                  Email
                </span>
                <a href="mailto:janejoslynjacinta@gmail.com" className="mt-2 inline-block text-sm text-muted-foreground hover:text-foreground transition">
                  janejoslynjacinta@gmail.com
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              For the best experience, include your preferred day/time when messaging.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Joslyn Jane&apos;s Lounge. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Discreet. Calm. Elevated.
          </p>
        </div>
      </div>
    </footer>
  );
}
