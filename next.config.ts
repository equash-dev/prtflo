import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Lets a production build/serve pair run beside the dev server without
  // the two fighting over .next (dev invalidates prod artifacts in place):
  // NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod next start
  distDir: process.env.NEXT_DIST_DIR || '.next',
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
