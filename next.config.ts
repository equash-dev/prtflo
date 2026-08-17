import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Lets a production build/serve pair run beside the dev server without
  // the two fighting over .next (dev invalidates prod artifacts in place):
  // NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod next start
  distDir: process.env.NEXT_DIST_DIR || '.next',
  experimental: {
    serverActions: {
      // Dev runs behind the Codespaces port-forwarding proxy. X-Forwarded-Host
      // correctly reports the public *.app.github.dev domain, but the tunnel
      // does not preserve the browser's real Origin header — Next receives
      // `Origin: localhost:3000` on every Server Action request regardless of
      // the public URL in the address bar. Confirmed from the dev server's own
      // log line ("`x-forwarded-host` ... does not match `origin` header with
      // value `localhost:3000`"), not guessed. Trusting localhost:3000 here is
      // safe: this only affects local dev, and SITE_PASSWORD's HMAC gate
      // (lib/access.ts) still guards every route regardless of origin checks.
      allowedOrigins: ['*.app.github.dev', 'localhost:3000'],
    },
  },
  logging: {
    // Phones on the LAN have no reachable devtools; surface their console
    // errors in the dev terminal instead.
    browserToTerminal: 'warn',
  },
  images: {
    // Local images live in /public; no remote patterns required for v1.
    formats: ['image/webp'],
    // Next 16 restricts served qualities to [75] by default; product imagery
    // is served at 90 to stay faithful to the generated masters.
    qualities: [75, 90],
  },
};

export default nextConfig;
