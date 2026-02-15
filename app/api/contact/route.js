import { Resend } from "resend";

export const runtime = "nodejs"; // important for some deployments

const resend = new Resend(process.env.RESEND_API_KEY);

function badRequest(message) {
  return Response.json({ error: message }, { status: 400 });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name = "",
      email = "",
      phone = "",
      zipcode = "",
      service = "",
      preferred = "",
      message = "",
      website = "", // honeypot
    } = body || {};

    // basic honeypot spam block
    if (website && website.trim().length > 0) {
      return Response.json({ ok: true }, { status: 200 });
    }

    // validation
    if (!email || !message || !phone || !zipcode || !service || !preferred) {
      return badRequest("Please fill all required fields.");
    }

    const cleanName = (name || "Anonymous").toString().trim();
    const cleanEmail = email.toString().trim();
    const cleanPhone = phone.toString().trim();
    const cleanZip = zipcode.toString().trim();
    const cleanService = service.toString().trim();
    const cleanPreferred = preferred.toString().trim();
    const cleanMessage = message.toString().trim();

    // Send ONE email to you (admin)
    const toAdmin = process.env.CONTACT_TO_EMAIL; // your inbox
    const from = process.env.CONTACT_FROM_EMAIL; // must be verified on Resend

    if (!toAdmin || !from) {
      return Response.json(
        { error: "Server email config missing. Check env variables." },
        { status: 500 }
      );
    }

    const subject = `New booking request: ${cleanService} (${cleanName})`;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New booking request</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
        <p><strong>Zip Code:</strong> ${escapeHtml(cleanZip)}</p>
        <p><strong>Service:</strong> ${escapeHtml(cleanService)}</p>
        <p><strong>Preferred date/time:</strong> ${escapeHtml(cleanPreferred)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    await resend.emails.send({
      from,
      to: [toAdmin],
      replyTo: cleanEmail, // so you can reply directly to client
      subject,
      html: adminHtml,
    });

    // Optional: send confirmation email to client
    // (if you don’t want this, delete this block)
    await resend.emails.send({
      from,
      to: [cleanEmail],
      subject: "We received your booking request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thanks, ${escapeHtml(cleanName)}.</h2>
          <p>Your request has been received. We’ll respond shortly to confirm availability.</p>
          <p><strong>Requested service:</strong> ${escapeHtml(cleanService)}</p>
          <p><strong>Preferred date/time:</strong> ${escapeHtml(cleanPreferred)}</p>
          <p style="color:#666;font-size:12px;margin-top:16px;">
            Please avoid sending sensitive personal details by email.
          </p>
        </div>
      `,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }
}

// tiny sanitizer to prevent HTML injection
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
