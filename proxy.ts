import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE, isValidAccessToken } from '@/lib/access';

export function proxy(request: NextRequest) {
  const authed = isValidAccessToken(request.cookies.get(ACCESS_COOKIE)?.value);
  const isGate = request.nextUrl.pathname === '/enter';

  if (isGate) {
    // The gate is not a destination once inside. POSTs pass through so the
    // Server Action always reaches the page.
    if (authed && request.method === 'GET') {
      return NextResponse.redirect(new URL('/intro', request.url));
    }
    return NextResponse.next();
  }

  if (authed) return NextResponse.next();
  return NextResponse.redirect(new URL('/enter', request.url));
}

export const config = {
  // `.*\..*` exempts every dotted path: all public/ assets (/products/**.webp
  // etc.) stay open by design ("pages only" gating) — and so would any future
  // route containing a dot (robots.txt, sitemap.xml).
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
};
