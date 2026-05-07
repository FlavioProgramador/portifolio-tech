import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protect admin routes and message API
  if (pathname.startsWith('/admin') || pathname === '/api/contact/messages') {
    const auth = req.headers.get('authorization') || '';
    if (!auth || !auth.startsWith('Basic ')) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' }
      });
    }

    try {
      const b64 = auth.split(' ')[1];
      const creds = globalThis.atob(b64);
      const [user, pass] = creds.split(':');

      if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
        return new NextResponse('Unauthorized', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' }
        });
      }
    } catch {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' }
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/contact/messages']
};
