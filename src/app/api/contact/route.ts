import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(150),
  phone: z.string().max(30).optional(),
  service: z.string().max(100),
  budget: z.string().max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
});

export async function POST(request: Request) {
  try {
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

    // Log securely in production telemetry
    console.log('[Inquiry Received]', {
      name,
      email,
      phone,
      service,
      budget,
      length: message.length,
      timestamp: new Date().toISOString(),
    });

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
