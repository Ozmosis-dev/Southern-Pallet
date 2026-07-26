import { NextRequest, NextResponse } from 'next/server';
import {
  deliverLead,
  LeadDeliveryFailedError,
  LeadDeliveryNotConfiguredError,
} from '../../../lib/lead-delivery';

/**
 * CONTACT FORM API ENDPOINT
 *
 * Handles the main quote-request form at the bottom of the homepage.
 * Delivers submissions through Resend and/or LEAD_WEBHOOK_URL. See README.md
 * "Forms & lead capture" for setup.
 */

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  productInterest?: string;
  message?: string;
  website?: string;
  timestamp: string;
  source: string;
  utmParams?: Record<string, string>;
  pageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    if (
      typeof formData.name !== 'string' ||
      !formData.name.trim() ||
      typeof formData.email !== 'string' ||
      !formData.email.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and email are required',
        },
        { status: 400 }
      );
    }

    if (typeof formData.website === 'string' && formData.website.trim()) {
      return NextResponse.json({
        success: true,
        message: 'Quote request received successfully',
      });
    }

    console.log('Contact form submission received:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      timestamp: formData.timestamp,
    });

    const leadPayload: Record<string, unknown> = { ...formData };
    delete leadPayload.website;

    const delivery = await deliverLead({
      formType: 'contact_request',
      subject: 'New Southern Pallet quote request',
      replyTo: formData.email,
      payload: leadPayload,
    });

    return NextResponse.json({
      success: true,
      message: 'Quote request received successfully',
      timestamp: new Date().toISOString(),
      deliveryChannels: delivery.channels,
    });
  } catch (error) {
    console.error('Contact form submission error:', error);

    if (error instanceof LeadDeliveryNotConfiguredError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Lead delivery is not configured',
        },
        { status: 503 }
      );
    }

    if (error instanceof LeadDeliveryFailedError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to deliver quote request',
        },
        { status: 502 }
      );
    }

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
