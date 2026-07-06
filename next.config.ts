import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Local images live in /public; no remote patterns required for v1.
    formats: ['image/webp'],
  },
};

export default nextConfig;
