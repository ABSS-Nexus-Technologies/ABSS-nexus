import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Simple in-memory sliding window rate limiter for bot & spam defense
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(150),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().max(100),
  budget: z.string().trim().max(100),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000),
});

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const forwardedFor = request.headers.get('x-forwarded-for');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    const clientIp = cfConnectingIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions from this connection. Please wait a few minutes or message us directly on WhatsApp (+91 76888 99205).',
        },
        { status: 429 }
      );
    }

    // 2. Body Validation
    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
          message: 'Invalid form input. Please verify your fields.',
        },
        { status: 400 }
      );
    }

    const { name, email, phone, service, budget, message } = result.data;
    const timestamp = new Date().toISOString();

    // 3. Log securely in production telemetry
    console.log('[Inquiry Received]', {
      name,
      email,
      phone: phone || 'N/A',
      service,
      budget,
      length: message.length,
      clientIp,
      timestamp,
    });

    // 4. Dispatch Email via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const recipientEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'abssnexus@gmail.com';
        const senderEmail = process.env.EMAIL_FROM || 'ABSS Nexus <notifications@abssnexus.in>';

        await resend.emails.send({
          from: senderEmail,
          to: recipientEmail,
          replyTo: email,
          subject: `⚡ New Project Inquiry: ${service} — ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; background: #ffffff;">
              <h2 style="color: #0F172A; margin-top: 0;">⚡ New Client Project Inquiry</h2>
              <p style="color: #64748B; font-size: 14px;">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600; width: 140px;">Client Name:</td>
                  <td style="padding: 10px 0; color: #0F172A; font-weight: 700;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Email:</td>
                  <td style="padding: 10px 0; color: #0284C7;"><a href="mailto:${email}" style="color: #0284C7;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="padding: 10px 0; color: #0F172A;">${phone || 'Not provided'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Required Service:</td>
                  <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">${service}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Estimated Budget:</td>
                  <td style="padding: 10px 0; color: #10B981; font-weight: 700;">${budget}</td>
                </tr>
              </table>

              <div style="background: #F8FAFC; border-left: 4px solid #0284C7; padding: 16px; border-radius: 6px; margin: 20px 0;">
                <strong style="color: #0F172A; display: block; margin-bottom: 6px;">Project Scope / Goals:</strong>
                <p style="color: #334155; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center;">
                ABSS Nexus Technologies &bull; Jaipur, Rajasthan, India &bull; Direct: +91 76888 99205
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn('[Resend Email Warning] Failed to dispatch email notification:', emailErr);
        // We do not fail the request if external email transport fails, as the lead is already logged safely
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully received. We will contact you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error processing request. Please contact us directly on WhatsApp.',
      },
      { status: 500 }
    );
  }
}
