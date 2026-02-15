'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Sessions' },
    { href: '/prices', label: 'Rates' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/review', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
    { href: '/termsandconditions', label: 'Lounge Rules' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Whisper Bar */}
      <div className="hidden md:block border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-xs text-muted-foreground">
            <p className="tracking-wide">
              By appointment • Discreet service • 24/7 chat support
            </p>
            <p className="tracking-wide">
              • Private lounge setting
            </p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-background/65 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              {/* Minimal mark */}
              <div className="h-9 w-9 rounded-full border border-border bg-muted/40 shadow-sm transition group-hover:bg-muted" />

              <div className="flex flex-col leading-none">
                <span className="text-lg sm:text-xl font-serif font-semibold text-foreground tracking-tight">
                  Joslyn Jane&apos;s Lounge
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-muted-foreground group-hover:text-foreground transition">
                  Private Lounge Massage
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 6).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative text-sm text-foreground/80 hover:text-foreground transition"
                >
                  <span className="after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-foreground/80 after:transition-all after:duration-300 hover:after:w-full">
                    {l.label}
                  </span>
                </Link>
              ))}

              <Link
                href="/prices"
                className="ml-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
              >
                Reserve
              </Link>
            </nav>

            {/* Mobile Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground hover:bg-background transition"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="mr-2 text-xs tracking-widest uppercase text-muted-foreground">
                Menu
              </span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-5 rounded bg-foreground transition-all duration-300 ${
                    isMenuOpen ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[5px] h-[2px] w-5 rounded bg-foreground transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[10px] h-[2px] w-5 rounded bg-foreground transition-all duration-300 ${
                    isMenuOpen ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Panel */}
      {isMenuOpen && (
        <div className="lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-md"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed left-0 right-0 top-[80px] z-50 border-b border-border bg-background/95 backdrop-blur-2xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="py-6">
                <div className="mb-4 rounded-2xl border border-border bg-muted/30 p-4">
                  <p className="text-sm text-foreground font-medium">
                    Discreet reservations.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Calm environment • Premium care • Respectful service
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeMenu}
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground/90 hover:text-foreground hover:bg-muted transition"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/prices"
                    onClick={closeMenu}
                    className="w-full rounded-xl bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95 transition"
                  >
                    Reserve
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="w-full rounded-xl border border-border bg-background px-5 py-3 text-center text-sm font-medium text-foreground hover:bg-muted transition"
                  >
                    Ask a Question
                  </Link>
                </div>

                <p className="mt-5 text-xs text-muted-foreground">
                  Discreet. Calm. Elevated.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
