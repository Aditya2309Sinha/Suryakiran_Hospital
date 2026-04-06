import { NextResponse } from 'next/server';
import { getLogs } from '@/lib/login-logger';

export async function GET() {
  try {
    const logs = getLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}