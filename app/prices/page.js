'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Copy, Check, Send, Shield, Clock, Info } from 'lucide-react';

export default function PricingPage() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState('outcall'); // 'outcall' | 'incall'

  // Telegram handle used for payment/confirmation
  const telegramHandle = '@JANEJOSLYN_JACINTA';

  const PRICING = useMemo(
    () => ({
      outcall: [
        { duration: '30 minutes', price: '$180', note: 'Outcall • quick reset' },
        { duration: '1 hour', price: '$260', note: 'Outcall • most requested' },
        { duration: '2 hours', price: '$380', note: 'Outcall • deeper release' },
        { duration: '3 hours', price: '$500', note: 'Outcall • premium time' },
        { duration: '6 hours', price: '$800', note: 'Outcall • extended care' },
        { duration: '24 hours', price: '$1,500', note: 'Outcall • VIP arrangement' },
      ],
      incall: [
        { duration: '30 minutes', price: '$160', note: 'Incall • quick reset' },
        { duration: '1 hour', price: '$250', note: 'Incall • most requested' },
        { duration: '2 hours', price: '$350', note: 'Incall • deeper release' },
        { duration: '3 hours', price: '$450', note: 'Incall • premium time' },
        { duration: '6 hours', price: '$600', note: 'Incall • extended care' },
        { duration: '24 hours', price: '$1,200', note: 'Incall • VIP arrangement' },
      ],
    }),
    []
  );

  const pricing = PRICING[active];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(telegramHandle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // silent
    }
  };

  const openTelegram = () => {
    window.open('https://t.me/JANEJOSLYN_JACINTA', '_blank', 'noopener,noreferrer');
  };

  // ✅ Added: “extra payment methods” cards (no addresses)
  const paymentOptions = useMemo(
    () => [
      {
        key: 'ethereum',
        title: 'Ethereum (ETH)',
        subtitle: 'Ethereum payments accepted',
        cta: 'Contact for ETH details',
        badge: 'Ξ',
      },
      {
        key: 'paypal',
        title: 'PayPal',
        subtitle: 'Quick and secure payment via PayPal',
        cta: 'Contact for PayPal details',
        badge: 'P',
      },
      {
        key: 'bitcoin',
        title: 'Bitcoin (BTC)',
        subtitle: 'Cryptocurrency payments accepted',
        cta: 'Contact for BTC details',
        badge: '₿',
      },
      {
        key: 'chime',
        title: 'Chime',
        subtitle: 'Send payment via Chime',
        cta: 'Contact for Chime details',
        badge: '🏦',
      },
      {
        key: 'applepay',
        title: 'Apple Pay',
        subtitle: 'Send payment via Apple Pay',
        cta: 'Contact for Apple Pay details',
        badge: '',
      },
    ],
    []
  );

  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      {/* Velvet glow accents */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,185,120,0.16),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,120,160,0.10),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Rates & Payment
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-foreground">
            Incall & Outcall Pricing
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-5" />
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose Incall or Outcall, select a duration, then confirm payment via Telegram to reserve your time.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 text-accent" />
            Respectful communication • Reservation only • Confirmation after payment
          </div>
        </div>

        {/* Toggle */}
        <div className="mb-10 flex items-center justify-center">
          <div className="inline-flex rounded-full border border-border bg-card/60 p-1 backdrop-blur">
            <button
              onClick={() => setActive('outcall')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === 'outcall'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted/40'
              }`}
              type="button"
            >
              Outcall
            </button>
            <button
              onClick={() => setActive('incall')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === 'incall'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted/40'
              }`}
              type="button"
            >
              Incall
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-18">
          {pricing.map((item, i) => (
            <div
              key={i}
              className="
                group rounded-3xl border border-border
                bg-card/80 backdrop-blur-xl
                shadow-sm hover:shadow-xl
                transition-all duration-300
                overflow-hidden
              "
            >
              <div className="pointer-events-none h-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70" />

              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {active === 'outcall' ? 'Outcall' : 'Incall'} • Duration
                </p>

                <h2 className="mt-2 text-xl font-serif font-semibold text-foreground">
                  {item.duration}
                </h2>

                <p className="mt-4 text-4xl font-bold text-accent">
                  {item.price}
                </p>

                <p className="mt-3 text-sm text-muted-foreground">
                  {item.note}
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <Link
                    href={`/contact?service=${encodeURIComponent(
                      `${active.toUpperCase()} - ${item.duration}`
                    )}`}
                    className="
                      w-full rounded-2xl bg-primary px-5 py-3
                      text-center text-sm font-semibold text-primary-foreground
                      shadow-md hover:opacity-95 transition
                    "
                  >
                    Reserve this duration
                  </Link>

                  <a
                    href="#payment"
                    className="
                      w-full rounded-2xl border border-border bg-background/40 px-5 py-3
                      text-center text-sm font-medium text-foreground
                      hover:bg-muted transition
                    "
                  >
                    Payment instructions
                  </a>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Your reservation is confirmed after payment verification.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div id="payment" className="mt-20 mb-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Payment method
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-foreground">
              Telegram Payment / Confirmation
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-5" />
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
              After choosing your Incall/Outcall duration, message us on Telegram to complete payment and confirm
              your slot. Use the QR code or handle below.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex flex-col lg:flex-row gap-10 lg:items-start lg:justify-between">
                {/* Left: Instructions */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-accent/15 border border-border flex items-center justify-center">
                      <Send className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                        Telegram
                      </p>
                      <h3 className="text-2xl font-serif font-semibold text-foreground">
                        Message to pay & confirm
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Send a message with:
                      <span className="text-foreground font-medium"> (1)</span> your selected duration,
                      <span className="text-foreground font-medium"> (2)</span> Incall/Outcall,
                      <span className="text-foreground font-medium"> (3)</span> preferred date/time,
                      <span className="text-foreground font-medium"> (4)</span> your name + phone.
                    </p>

                    <div className="rounded-2xl border border-border bg-background/35 p-5">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Telegram handle
                      </p>

                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-lg font-semibold text-foreground">{telegramHandle}</p>

                        <div className="flex gap-2">
                          <button
                            onClick={copyToClipboard}
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition"
                          >
                            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>

                          <button
                            onClick={openTelegram}
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 transition"
                          >
                            <Send className="h-4 w-4" />
                            Open Telegram
                          </button>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground">
                        Tip: If the link doesn’t open, scan the QR instead.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: QR(s) */}
                <div className="w-full lg:w-[360px]">
                  <div className="rounded-3xl border border-border bg-background/35 p-5">
                    <p className="text-sm font-medium text-foreground">Scan QR</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Telegram QR code (recommended)
                    </p>

                    <div className="mt-4 relative overflow-hidden rounded-2xl border border-border bg-black/10">
                      <div className="relative aspect-square w-full">
                        <Image
                          src="/JaneTrans.jpeg"
                          alt="Telegram QR code for payment/confirmation"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* Optional second QR */}
                    <div className="mt-5">
                      <p className="text-xs text-muted-foreground">
                        Optional: secondary QR (if needed)
                      </p>
                      <div className="mt-3 relative overflow-hidden rounded-2xl border border-border bg-black/10">
                        <div className="relative aspect-square w-full">
                          <Image
                            src="/JaneTransTwo.jpeg"
                            alt="Secondary QR code"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      Always confirm the details in chat before sending payment.
                    </p>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="mt-10 grid md:grid-cols-3 gap-8">
                <Step
                  icon={<Clock className="h-5 w-5 text-accent" />}
                  title="Choose duration"
                  text="Pick Incall or Outcall, then select the time block you want."
                />
                <Step
                  icon={<Shield className="h-5 w-5 text-accent" />}
                  title="Confirm details"
                  text="Message on Telegram and confirm availability + payment details."
                />
                <Step
                  icon={<Check className="h-5 w-5 text-accent" />}
                  title="Reservation confirmed"
                  text="Once payment is verified, your reservation is locked in."
                />
              </div>

              {/* Policy */}
              <div className="mt-10 rounded-3xl border border-border bg-background/35 p-6">
                <p className="text-sm font-medium text-foreground">Reservation policy</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Reservations are confirmed after verification. Respectful communication is required at all times.
                  Inappropriate messages will not be answered.
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto rounded-2xl bg-primary px-7 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-95 transition"
                  >
                    Go to Contact
                  </Link>

                  <Link
                    href="/termsandconditions"
                    className="w-full sm:w-auto rounded-2xl border border-border bg-background/40 px-7 py-3 text-center text-sm font-semibold text-foreground hover:bg-muted transition"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ NEW SECTION (added at the bottom): Payment option boxes like your screenshot */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              More payment options
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-foreground">
              Multiple payment methods available
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-5" />
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
              Tap any method below to contact us and get the correct payment details.
            </p>
          </div>

          {/* mobile: stacked | desktop: grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {paymentOptions.map((m) => (
              <PaymentOptionCard key={m.key} method={m} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card/70 backdrop-blur-xl p-6 text-sm text-muted-foreground">
            For safety and accuracy, payment details are shared only in direct contact.
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-background/30 p-6">
      <div className="h-11 w-11 rounded-2xl bg-accent/15 border border-border flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PaymentOptionCard({ method }) {
  return (
    <Link
      href={`/contact?payment=${encodeURIComponent(method.title)}`}
      className="
        group block rounded-3xl border border-border
        bg-card/80 backdrop-blur-xl
        shadow-sm hover:shadow-xl
        transition-all duration-300
        overflow-hidden
      "
      aria-label={`Open contact to pay with ${method.title}`}
    >
      {/* top sheen */}
      <div className="pointer-events-none h-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70" />

      <div className="p-8">
        {/* icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/40 text-2xl text-foreground">
          <span className="group-hover:scale-105 transition-transform">{method.badge}</span>
        </div>

        <h3 className="text-center text-xl font-serif font-bold text-foreground">
          {method.title}
        </h3>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          {method.subtitle}
        </p>

        <p className="mt-4 text-center text-sm font-semibold text-accent">
          {method.cta}
        </p>
      </div>
    </Link>
  );
}
