'use client';

import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Shield,
  Globe,
  AtSign,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      zipcode: form.zipcode.value,
      service: form.service.value,
      preferred: form.preferred.value,
      message: form.message.value,
      website: form.website.value, // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("Your request has been sent successfully.");
      form.reset();
    } catch (err) {
      setStatus(err?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      {/* subtle velvet glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,184,135,0.12),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(184,137,91,0.10),transparent_60%)] blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Contact • Booking
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Contact & Booking
          </h1>

          <div className="w-24 h-1 bg-accent rounded-full mt-2" />

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Choose your preferred channel below or send a booking request. We respond as quickly as possible.
          </p>
        </div>

        {/* Direct Contact */}
        <div className="grid gap-4 mb-14">
          <ContactItem
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value="janejoslynjacinta@gmail.com"
            href="mailto:janejoslynjacinta@gmail.com"
            badge="Fast"
          />

          <ContactItem
            icon={<Phone className="h-5 w-5" />}
            label="Phone"
            value="+1 (720) 331-3799"
            href="tel:+17203313799"
            badge="Call / Text"
          />

          <ContactItem
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            value="+1 (720) 331-3799"
            href="https://wa.me/17203313799"
            badge="Preferred"
          />

          <ContactItem
            icon={<Shield className="h-5 w-5" />}
            label="Signal"
            value="+1 (720) 331-3799"
            href="https://signal.me/#p/+17203313799"
            badge="Private"
          />

          <ContactItem
            icon={<Send className="h-5 w-5" />}
            label="Telegram"
            value="+1 720 771 6452"
            href="https://t.me/+17207716452"
            badge="Chat"
          />

          <ContactItem
            icon={<AtSign className="h-5 w-5" />}
            label="Discord"
            value="@Jane_joslyn_Jacinta"
            href="https://discord.com/app"
            note="Open Discord and search this handle."
          />

          <ContactItem
            icon={<Globe className="h-5 w-5" />}
            label="X (Twitter)"
            value="@JoslynJane9268"
            href="https://x.com/JoslynJane9268"
          />
        </div>

        {/* Form */}
        <div className="max-w-3xl">
          <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Request an Appointment
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Provide the session type and your preferred date/time — we’ll confirm availability.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              {/* Honeypot (hidden) */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <input
                  name="zipcode"
                  type="text"
                  placeholder="Zip Code"
                  required
                  className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <select
                  name="service"
                  required
                  defaultValue=""
                  className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="" disabled>
                    Select a session type
                  </option>
                  <option value="Nuru Ritual">Nuru Ritual</option>
                  <option value="Deep Tissue Renewal">Deep Tissue Renewal</option>
                  <option value="Full Body Serenity">Full Body Serenity</option>
                  <option value="Private Sensory Ritual">Private Sensory Ritual</option>
                  <option value="Other / Ask">Other / Ask</option>
                </select>

                <input
                  name="preferred"
                  type="text"
                  placeholder="Preferred date & time (e.g. Feb 20, 6pm)"
                  required
                  className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <textarea
                name="message"
                rows={6}
                placeholder="Any extra details (pressure, focus areas, questions)…"
                required
                className="rounded-2xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-fit rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Booking Request"}
                </button>

                <p className="text-xs text-muted-foreground">
                  Please keep communication respectful and professional.
                </p>
              </div>

              {status && (
                <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
                  <p className="text-sm text-foreground/90">{status}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href, badge, note }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-2xl border border-border bg-card/50 backdrop-blur px-6 py-4 hover:bg-card/70 transition"
    >
      <div className="flex items-center gap-4">
        <span className="text-accent">{icon}</span>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            {badge ? (
              <span className="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                {badge}
              </span>
            ) : null}
          </div>

          <p className="text-base md:text-lg font-medium text-foreground truncate">
            {value}
          </p>

          {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
        </div>
      </div>

      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition">
        Open <ExternalLink className="h-4 w-4" />
      </span>
    </a>
  );
}
