import { NextRequest, NextResponse } from 'next/server';
import { generateToken, setAuthCookie, verifyToken, getTokenFromCookie } from '@/lib/auth';
import { appendLog } from '@/lib/login-logger';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '98761234';

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
    const body = await request.json();
    const { username, password } = body;
    const ip = getClientIp(request);
    const timestamp = new Date().toISOString();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken(username);
      await setAuthCookie(token);
      
      await appendLog({
        timestamp,
        username,
        ip_address: ip,
        status: 'success',
        action: 'login',
      });
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { username }
      });
    }

    await appendLog({
      timestamp,
      username: username || 'unknown',
      ip_address: ip,
      status: 'failed',
      action: 'login',
    });

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: { username: payload.username }
    });
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}