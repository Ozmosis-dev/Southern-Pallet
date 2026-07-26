import { NextRequest, NextResponse } from 'next/server';

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

    console.log('Recycle form submission received:', {
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      palletType: formData.palletType,
      quantity: formData.quantity,
      timestamp: formData.timestamp,
    });

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'pallet_sell_request' }),
      });
    } else {
      console.warn('LEAD_WEBHOOK_URL is not set — form data was logged only, not delivered anywhere.');
    }

    return NextResponse.json({
      success: true,
      message: 'Pallet sell request received successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Recycle form submission error:', error);

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
