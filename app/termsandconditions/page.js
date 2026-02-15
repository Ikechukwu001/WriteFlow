export const metadata = {
  title: "Terms & Conditions | Jenna’s Spa",
  description: "Terms and conditions for booking and services.",
};

const LAST_UPDATED = "February 15, 2026";

export default function TermsAndConditionsPage() {
  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      {/* subtle lounge glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,184,135,0.12),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(184,137,91,0.10),transparent_60%)] blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Terms • Policies
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-foreground">
            Terms & Conditions
          </h1>

          <div className="w-24 h-1 bg-accent rounded-full mt-4" />

          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Please read these terms carefully before booking. By scheduling a session, you agree to
            the guidelines below.
          </p>

          {/* Quick note card */}
          <div className="mt-8 rounded-3xl border border-border bg-card/70 backdrop-blur p-6">
            <p className="text-sm text-foreground/90 leading-relaxed">
              We maintain a calm, discreet, and professional environment. Respectful communication
              is required at all times. Any violation of boundaries may result in refusal of service.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-7 text-foreground/90 leading-relaxed">
          <Card title="Booking & Arrival">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Appointments are confirmed after availability is verified and payment is completed (if required).</li>
              <li>Please arrive on time. Late arrival may reduce your session time.</li>
              <li>By booking, you confirm you are able to participate safely in the session and will communicate any concerns clearly.</li>
            </ul>
          </Card>

          <Card title="Payment">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Payment is required to secure your session.</li>
              <li>BTC transactions are final and cannot be reversed.</li>
              <li>Please send the exact amount for your selected package.</li>
            </ul>
          </Card>

          <Card title="Cancellations & Rescheduling">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Please provide at least 24 hours notice to cancel or reschedule.</li>
              <li>Late cancellations may be subject to a fee.</li>
              <li>No-shows may forfeit the booking.</li>
            </ul>
          </Card>

          <Card title="Professional Standards & Conduct">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Services are provided in a professional and respectful environment.</li>
              <li>We maintain client confidentiality and discretion.</li>
              <li>Any harassment, threatening behavior, or inappropriate conduct results in immediate termination of the session without refund.</li>
            </ul>
          </Card>

          <Card title="Health & Safety">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Please inform us of injuries, allergies, medical conditions, or pregnancy before your session.</li>
              <li>We may decline service if we believe the session is unsafe or unsuitable.</li>
              <li>Results vary. No guarantee is made regarding outcomes or relief.</li>
            </ul>
          </Card>

          <Card title="Privacy">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Your personal information is used only for booking and communication.</li>
              <li>We do not publicly share client details or conversations.</li>
            </ul>
          </Card>

          <Card title="Agreement">
            <p className="text-muted-foreground">
              By booking a session, you agree to these terms and confirm you will communicate respectfully and follow professional boundaries.
            </p>
          </Card>

          {/* footer */}
          <p className="pt-3 text-xs text-muted-foreground">
            Last updated: <span className="text-foreground/90">{LAST_UPDATED}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-3xl border border-border bg-card/60 backdrop-blur p-7">
      <h2 className="text-xl font-serif font-bold text-foreground mb-3">
        {title}
      </h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
