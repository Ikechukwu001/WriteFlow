'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'lounge_disclaimer_hidden_v1';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  useEffect(() => {
    try {
      const hidden = localStorage.getItem(STORAGE_KEY);
      if (!hidden) setIsOpen(true);
    } catch {
      setIsOpen(true);
    }
  }, []);

  const close = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {}
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[7px]"
        onClick={close}
        aria-hidden="true"
      />

      {/* Soft lounge glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,200,120,0.14),transparent_60%)]" />
        <div className="absolute left-1/3 top-2/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,120,180,0.10),transparent_60%)]" />
      </div>

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

        <div className="p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Welcome to the lounge
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-semibold text-foreground">
                A quick note before you reserve
              </h2>
            </div>

            <button
              type="button"
              onClick={close}
              className="rounded-full border border-border bg-background/70 px-3 py-2 text-sm text-foreground hover:bg-background transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Message */}
          <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
            <p>
              We’re committed to a discreet, respectful experience from the first message to the end of your session.
            </p>

            <div className="rounded-xl border border-border bg-background/60 p-4">
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Please communicate respectfully (no abusive or explicit messages).</li>
                <li>Consent and boundaries are always respected — comfort comes first.</li>
                <li>If you have concerns, share them calmly and we’ll resolve them professionally.</li>
                <li>You can review guest notes anytime on the Reviews page.</li>
              </ul>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="h-4 w-4 accent-[hsl(var(--primary))]"
              />
              Don’t show this again
            </label>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={close}
              className="w-full rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground shadow hover:opacity-95 transition"
            >
              Continue
            </button>

            <Link
              href="/review"
              onClick={close}
              className="w-full rounded-xl border border-border bg-background px-5 py-3 font-medium text-foreground hover:bg-muted transition text-center"
            >
              View Reviews
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            By continuing, you agree to our lounge rules and respectful communication policy.
          </p>
        </div>
      </div>
    </div>
  );
}
