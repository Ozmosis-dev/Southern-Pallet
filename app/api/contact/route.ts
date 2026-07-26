import { NextRequest, NextResponse } from 'next/server';

/**
 * CONTACT FORM API ENDPOINT
 *
 * Handles the main quote-request form at the bottom of the homepage.
 * Forwards submissions to LEAD_WEBHOOK_URL if set (Zapier, Make, a custom
 * endpoint, etc. all work — it's just a POST of the JSON body). If the env
 * var is unset, the submission is logged only. See README.md "Forms & lead
 * capture" for setup.
 */

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  productInterest?: string;
  message?: string;
  timestamp: string;
  source: string;
  utmParams?: Record<string, string>;
  pageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    console.log('Contact form submission received:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      timestamp: formData.timestamp,
    });

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'contact_request' }),
      });
    } else {
      console.warn('LEAD_WEBHOOK_URL is not set — form data was logged only, not delivered anywhere.');
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request received successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Contact form submission error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process quote request',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
