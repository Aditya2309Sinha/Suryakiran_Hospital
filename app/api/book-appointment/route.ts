import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const webhookUrl = process.env.N8N_APPOINTMENT_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: 'Webhook URL not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Appointment request submitted successfully' });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, error: 'Failed to submit appointment request' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while booking appointment' },
      { status: 500 }
    );
  }
}