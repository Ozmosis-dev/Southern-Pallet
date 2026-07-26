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
 * Forwards submissions to LEAD_WEBHOOK_URL if set (Zapier, Make, a custom
 * endpoint, etc. all work — it's just a POST of the JSON body). If the env
 * var is unset, the submission is logged only. See README.md "Forms & lead
 * capture" for setup.
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
  timestamp: string;
  source: string;
  utmParams?: Record<string, string>;
  pageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: RecycleFormData = await request.json();

    if (!formData.fullName?.trim() || !formData.email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Full name and email are required',
        },
        { status: 400 }
      );
    }

    console.log('Recycle form submission received:', {
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      palletType: formData.palletType,
      quantity: formData.quantity,
      timestamp: formData.timestamp,
    });

    const delivery = await deliverLead({
      formType: 'pallet_sell_request',
      subject: 'New Southern Pallet recycling quote request',
      replyTo: formData.email,
      payload: { ...formData },
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
