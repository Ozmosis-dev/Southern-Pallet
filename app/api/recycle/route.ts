import { NextRequest, NextResponse } from 'next/server';
import {
  deliverLead,
  LeadDeliveryFailedError,
  LeadDeliveryNotConfiguredError,
} from '../../../lib/lead-delivery';

/**
 * RECYCLE / SELL-PALLETS API ENDPOINT
 *
 * Handles the sell/recycle-pallets form on the recycle page.
 * Delivers submissions through Resend and/or LEAD_WEBHOOK_URL. See README.md
 * "Forms & lead capture" for setup.
 */

export interface RecycleFormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  palletType?: string;
  quantity?: string;
  condition?: string;
  location?: string;
  additionalDetails?: string;
  pickupService?: string;
  submissionId?: string;
  website?: string;
  timestamp: string;
  source: string;
  utmParams?: Record<string, string>;
  pageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Full name and email are required',
        },
        { status: 400 }
      );
    }

    const formData = body as RecycleFormData;

    if (
      typeof formData.fullName !== 'string' ||
      !formData.fullName.trim() ||
      typeof formData.email !== 'string' ||
      !formData.email.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Full name and email are required',
        },
        { status: 400 }
      );
    }

    if (typeof formData.website === 'string' && formData.website.trim()) {
      return NextResponse.json({
        success: true,
        message: 'Pallet sell request received successfully',
      });
    }

    console.log('Recycle form submission received:', {
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      palletType: formData.palletType,
      quantity: formData.quantity,
      timestamp: formData.timestamp,
    });

    const leadPayload: Record<string, unknown> = { ...formData };
    delete leadPayload.website;

    const delivery = await deliverLead({
      formType: 'pallet_sell_request',
      subject: 'New Southern Pallet recycling quote request',
      replyTo: formData.email,
      payload: leadPayload,
    });

    return NextResponse.json({
      success: true,
      message: 'Pallet sell request received successfully',
      timestamp: new Date().toISOString(),
      deliveryChannels: delivery.channels,
    });
  } catch (error) {
    console.error('Recycle form submission error:', error);

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
          message: 'Failed to deliver pallet sell request',
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process pallet sell request',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
