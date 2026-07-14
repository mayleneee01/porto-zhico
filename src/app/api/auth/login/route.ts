import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || '123Sampai456.';

    if (password === adminPassword) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await encrypt({ role: 'admin', expires });

      (await cookies()).set('admin_token', session, { expires, httpOnly: true });

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error("LOGIN_ROUTE_ERROR:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
