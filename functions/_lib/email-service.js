/**
 * ABSS Nexus Technologies - Production Email & Notification Service
 * Supports: Resend, SendGrid, Cloudflare MailChannels, and Admin Webhooks
 */

export const isEmailServiceConfigured = (env) => {
  return Boolean(
    env?.RESEND_API_KEY ||
    env?.SENDGRID_API_KEY ||
    env?.MAILCHANNELS_ENABLED === "true" ||
    env?.MAILCHANNELS_API_KEY
  );
};

export const getSenderDetails = (env, customName = null, customEmail = null) => {
  const name = customName || env?.EMAIL_FROM_NAME || "ABSS Nexus Technologies";
  const email = customEmail || env?.EMAIL_FROM_ADDRESS || "notifications@abssnexus.in";
  return { name, email, formatted: `${name} <${email}>` };
};

export const sendEmail = async (env, { to, subject, html, text, fromName, fromEmail }) => {
  const sender = getSenderDetails(env, fromName, fromEmail);
  const plainText = text || html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  // 1. Resend API (Recommended for modern edge runtimes)
  if (env?.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: sender.formatted,
          to: Array.isArray(to) ? to : [to],
          subject,
          html,
          text: plainText,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        return { ok: true, provider: "resend", id: data.id };
      }
      console.error("[EmailService] Resend API error:", response.status, data);
    } catch (err) {
      console.error("[EmailService] Resend network error:", err.message);
    }
  }

  // 2. SendGrid API Fallback
  if (env?.SENDGRID_API_KEY) {
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: (Array.isArray(to) ? to : [to]).map((em) => ({ email: em })) }],
          from: { email: sender.email, name: sender.name },
          subject,
          content: [
            { type: "text/plain", value: plainText },
            { type: "text/html", value: html },
          ],
        }),
      });

      if (response.ok || response.status === 202) {
        return { ok: true, provider: "sendgrid" };
      }
      const data = await response.json().catch(() => ({}));
      console.error("[EmailService] SendGrid API error:", response.status, data);
    } catch (err) {
      console.error("[EmailService] SendGrid network error:", err.message);
    }
  }

  // 3. Cloudflare MailChannels (Free for Cloudflare Workers)
  if (env?.MAILCHANNELS_ENABLED === "true" || env?.MAILCHANNELS_API_KEY) {
    try {
      const headers = { "Content-Type": "application/json" };
      if (env?.MAILCHANNELS_API_KEY) {
        headers["X-Api-Key"] = env.MAILCHANNELS_API_KEY;
      }
      const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers,
        body: JSON.stringify({
          personalizations: [{ to: (Array.isArray(to) ? to : [to]).map((em) => ({ email: em })) }],
          from: { email: sender.email, name: sender.name },
          subject,
          content: [{ type: "text/html", value: html }],
        }),
      });

      if (response.ok || response.status === 202) {
        return { ok: true, provider: "mailchannels" };
      }
      console.error("[EmailService] MailChannels API error:", response.status);
    } catch (err) {
      console.error("[EmailService] MailChannels network error:", err.message);
    }
  }

  // Development / Unconfigured fallback logging
  console.log(`[EmailService:Simulated] To: ${to} | Subject: "${subject}" | Provider: None (Configure RESEND_API_KEY in Cloudflare Dashboard)`);
  return { ok: false, provider: "none", simulated: true, error: "No email provider configured" };
};

/**
 * Dispatch an alert to Slack, Discord, or WhatsApp Webhook Gateway
 */
export const sendAdminWebhookAlert = async (env, { event, title, details }) => {
  const webhookUrl = env?.ADMIN_WEBHOOK_URL;
  if (!webhookUrl) return { ok: false, error: "No webhook URL configured" };

  try {
    const formattedFields = Object.entries(details || {})
      .map(([k, v]) => `*${k}:* ${v}`)
      .join("\n");

    const payload = {
      text: `🚀 *[ABSS Nexus Alert]*: ${title}\n*Event:* \`${event}\`\n${formattedFields}`,
      event,
      title,
      details,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return { ok: response.ok };
  } catch (err) {
    console.error("[WebhookAlert] Error sending webhook:", err.message);
    return { ok: false, error: err.message };
  }
};

/**
 * Branded HTML Templates
 */

const baseEmailLayout = (title, bodyContent) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1d1d1f;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f7; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #e5e5ea;">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #0d1b2a 0%, #1e3a8a 100%); text-align: left;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">ABSS Nexus Technologies</h1>
              <p style="margin: 4px 0 0 0; color: #93c5fd; font-size: 13px;">Corporate IT Services & Career Portals</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              ${bodyContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafc; border-top: 1px solid #e5e5ea; text-align: center; font-size: 12px; color: #86868b; line-height: 1.6;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} ABSS Nexus Technologies LLP. All rights reserved.</p>
              <p style="margin: 4px 0 0 0;">Sector 62, Noida, Uttar Pradesh, India &bull; <a href="https://abssnexus.in" style="color: #0066cc; text-decoration: none;">abssnexus.in</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const renderContactAdminAlert = (lead) => {
  const name = lead.client || lead.name || "Anonymous";
  const contact = lead.contact || [lead.email, lead.phone].filter(Boolean).join(" / ");
  const service = lead.service || "General Inquiry";
  const budget = lead.budget ? `₹${Number(lead.budget).toLocaleString("en-IN")}` : "Not Specified";
  const message = lead.message || lead.notes || "No message provided.";

  const content = `
    <div style="margin-bottom: 24px;">
      <span style="background: #e0f2fe; color: #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase;">New Project Lead</span>
      <h2 style="margin: 12px 0 0 0; color: #1d1d1f; font-size: 20px;">Website Inquiry Received</h2>
    </div>
    <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #f8fafc; border-radius: 8px; font-size: 14px; margin-bottom: 24px;">
      <tr><td width="30%" style="color: #64748b; font-weight: 600;">Client Name:</td><td style="font-weight: 700; color: #0f172a;">${name}</td></tr>
      <tr><td style="color: #64748b; font-weight: 600;">Contact:</td><td style="color: #0f172a;">${contact}</td></tr>
      <tr><td style="color: #64748b; font-weight: 600;">Service Required:</td><td style="color: #0284c7; font-weight: 600;">${service}</td></tr>
      <tr><td style="color: #64748b; font-weight: 600;">Estimated Budget:</td><td style="color: #0f172a;">${budget}</td></tr>
      <tr><td style="color: #64748b; font-weight: 600;">Message / Details:</td><td style="color: #334155; line-height: 1.5;">${message}</td></tr>
    </table>
    <div style="text-align: center;">
      <a href="https://abssnexus.in/admin/company/leads" style="display: inline-block; background: #0066cc; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Open Lead in Admin Portal</a>
    </div>
  `;
  return {
    subject: `🔥 [New Lead] ${name} - ${service}`,
    html: baseEmailLayout(`New Lead: ${name}`, content),
  };
};

export const renderContactUserConfirmation = (lead) => {
  const name = lead.name || lead.client || "Valued Client";
  const service = lead.service || "IT Consulting";

  const content = `
    <h2 style="margin: 0 0 16px 0; color: #1d1d1f; font-size: 20px;">Thank you for contacting ABSS Nexus Technologies</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #3c4043; margin-bottom: 20px;">
      Hello <strong>${name}</strong>,<br/><br/>
      We have successfully received your project inquiry regarding <strong>${service}</strong>.
      Our solutions architects and delivery managers are reviewing your requirements and will reach out to you within 24 business hours.
    </p>
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px;">What happens next?</h4>
      <ul style="margin: 0; padding-left: 20px; color: #15803d; font-size: 13px; line-height: 1.6;">
        <li>Requirements assessment by our technical team</li>
        <li>Complimentary 30-minute scoping & architecture call</li>
        <li>Tailored proposal and delivery timeline</li>
      </ul>
    </div>
    <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0;">
      Need immediate assistance? Feel free to call us at <strong style="color: #1d1d1f;">+91 93340 76352</strong> or email <strong style="color: #1d1d1f;">contact@abssnexus.in</strong>.
    </p>
  `;
  return {
    subject: `We've received your project inquiry - ABSS Nexus Technologies`,
    html: baseEmailLayout(`Inquiry Received`, content),
  };
};

export const renderStudentVerificationEmail = ({ name, email, verificationUrl }) => {
  const studentName = name || "Student";
  const content = `
    <h2 style="margin: 0 0 16px 0; color: #1d1d1f; font-size: 20px;">Welcome to ABSS Nexus Internship Portal</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #3c4043; margin-bottom: 24px;">
      Hello <strong>${studentName}</strong>,<br/><br/>
      Thank you for registering with ABSS Nexus Technologies. To activate your student account and access live internship projects, please verify your email address.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${verificationUrl}" style="display: inline-block; background: #0066cc; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(0, 102, 204, 0.25);">Verify Email Address</a>
    </div>
    <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 12px;">
      This verification link is valid for <strong>24 hours</strong>. If the button above does not work, copy and paste this link into your browser:
    </p>
    <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 6px; word-break: break-all; font-size: 12px; color: #475569; font-family: monospace;">
      ${verificationUrl}
    </div>
  `;
  return {
    subject: `Verify Your Email Address - ABSS Nexus Internship Portal`,
    html: baseEmailLayout(`Verify Your Email`, content),
  };
};

export const renderStudentPasswordResetEmail = ({ name, email, resetUrl }) => {
  const studentName = name || "Student";
  const content = `
    <h2 style="margin: 0 0 16px 0; color: #1d1d1f; font-size: 20px;">Password Reset Request</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #3c4043; margin-bottom: 24px;">
      Hello <strong>${studentName}</strong>,<br/><br/>
      We received a request to reset your password for the ABSS Nexus Internship Portal account registered with <strong>${email}</strong>.
    </p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" style="display: inline-block; background: #0066cc; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Reset My Password</a>
    </div>
    <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 12px;">
      This link will expire in <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email; your account remains secure.
    </p>
    <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 6px; word-break: break-all; font-size: 12px; color: #475569; font-family: monospace;">
      ${resetUrl}
    </div>
  `;
  return {
    subject: `Password Reset Request - ABSS Nexus Internship Portal`,
    html: baseEmailLayout(`Reset Password`, content),
  };
};
