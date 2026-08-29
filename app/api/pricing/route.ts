import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/escape-html";

const ADMIN_EMAIL = "admin@veliq.co";
const SENDER_EMAIL = "admin@veliq.co";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, businessName, phone, email, services, contactVia, formLoadedAt } = body;

    // Timing trap: real users take >1.5s; bots submit near-instantly.
    if (typeof formLoadedAt !== "number" || Date.now() - formLoadedAt < 1500) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const safeName         = escapeHtml(String(name));
    const safeBusinessName = escapeHtml(String(businessName || "—"));
    const safePhone        = escapeHtml(String(phone));
    const safeEmail        = escapeHtml(String(email));
    const safeServices     = Array.isArray(services) ? services.map((s: string) => escapeHtml(String(s))) : [];
    const safeContactVia   = Array.isArray(contactVia) ? contactVia.map((v: string) => escapeHtml(String(v))) : [];

    const resend = new Resend(process.env.RESEND_API_KEY);

    const servicesList = safeServices.length
      ? safeServices.map((s) => `<li style="margin:4px 0;color:#e2e8f0;font-size:14px">• ${s}</li>`).join("")
      : `<li style="margin:4px 0;color:#94a3b8;font-size:14px">None selected</li>`;

    const contactViaList = safeContactVia.length
      ? safeContactVia.join(", ")
      : "Not specified";

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;border-bottom:1px solid rgba(99,102,241,0.2)">
          <h1 style="margin:0 0 6px;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.03em">New Quote Request</h1>
          <p style="margin:0;color:#94a3b8;font-size:14px">Someone submitted the pricing form on veliq.co</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#1e293b;padding:32px 40px">

          <!-- Contact details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
            <tr><td style="padding-bottom:8px">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6366f1">Contact Details</p>
            </td></tr>

            <tr><td style="background:#0f172a;border-radius:12px;padding:20px 24px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;width:140px;vertical-align:top">
                    <span style="font-size:12px;color:#64748b;font-weight:600">Name</span>
                  </td>
                  <td style="padding:6px 0;vertical-align:top">
                    <span style="font-size:14px;color:#f1f5f9;font-weight:500">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;width:140px;vertical-align:top">
                    <span style="font-size:12px;color:#64748b;font-weight:600">Business</span>
                  </td>
                  <td style="padding:6px 0;vertical-align:top">
                    <span style="font-size:14px;color:#f1f5f9;font-weight:500">${safeBusinessName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;width:140px;vertical-align:top">
                    <span style="font-size:12px;color:#64748b;font-weight:600">Phone (WhatsApp)</span>
                  </td>
                  <td style="padding:6px 0;vertical-align:top">
                    <span style="font-size:14px;color:#f1f5f9;font-weight:500">${safePhone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;width:140px;vertical-align:top">
                    <span style="font-size:12px;color:#64748b;font-weight:600">Email</span>
                  </td>
                  <td style="padding:6px 0;vertical-align:top">
                    <span style="font-size:14px;color:#f1f5f9;font-weight:500">${safeEmail}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;width:140px;vertical-align:top">
                    <span style="font-size:12px;color:#64748b;font-weight:600">Contact via</span>
                  </td>
                  <td style="padding:6px 0;vertical-align:top">
                    <span style="font-size:14px;color:#6366f1;font-weight:600">${contactViaList}</span>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- Services -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding-bottom:8px">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6366f1">Services Interested In</p>
            </td></tr>
            <tr><td style="background:#0f172a;border-radius:12px;padding:20px 24px">
              <ul style="margin:0;padding:0;list-style:none">${servicesList}</ul>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0f172a;border-radius:0 0 16px 16px;padding:24px 40px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.06)">
          <h3 style="margin:0 0 4px;color:#0f172a;font-size:16px;font-weight:700;letter-spacing:1px;color:#fff">VELIQ</h3>
          <p style="margin:0;color:#94a3b8;font-size:12px">Built for those who don't settle.</p>
          <p style="margin:12px 0 0;color:#cbd5e1;font-size:11px">&copy; ${new Date().getFullYear()} VELIQ. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await resend.emails.send({
      from: `VELIQ <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Quote Request — ${safeName}${safeBusinessName !== "—" ? ` · ${safeBusinessName}` : ""}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Pricing form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
