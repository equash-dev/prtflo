import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE, isValidAccessToken } from '@/lib/access';

export function proxy(request: NextRequest) {
  const authed = isValidAccessToken(request.cookies.get(ACCESS_COOKIE)?.value);
  const isGate = request.nextUrl.pathname === '/enter';

  if (isGate) {
    // The gate is not a destination once inside. POSTs pass through so the
    // Server Action always reaches the page.
    if (authed && request.method === 'GET') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (authed) return NextResponse.next();
  return NextResponse.redirect(new URL('/enter', request.url));
}

export const config = {
  // Pages are gated; public/ assets are not. The asset directories are named
  // here rather than excluded by a catch-all dotted-path rule. The previous
  // `.*\..*` also swallowed the `.rsc` and `.segment.rsc` transport suffixes
  // that Next appends to this matcher, so each page's RSC payload skipped the
  // gate while its HTML was gated: /collection.rsc served the whole page to
  // anyone who asked for it. Keep this list in step with public/.
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|products/|campaign/|models/|spots/).*)',
  ],
};
