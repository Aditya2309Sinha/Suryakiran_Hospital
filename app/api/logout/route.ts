import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie, verifyToken, getTokenFromCookie } from '@/lib/auth';
import { appendLog } from '@/lib/login-logger';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const ip = getClientIp(request);
    const timestamp = new Date().toISOString();
    
    if (token) {
      const payload = verifyToken(token);
      if (payload?.username) {
        await appendLog({
          timestamp,
          username: payload.username,
          ip_address: ip,
          status: 'success',
          action: 'logout',
        });
      }
    }
    
    await clearAuthCookie();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}