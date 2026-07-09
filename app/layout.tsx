import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Providers } from '@/context/Providers';
import { SITE } from '@/config/site';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});

// Tints mobile browser chrome to the ground token so the frame around
// the page belongs to the house rather than defaulting to white.
export const viewport: Viewport = {
  themeColor: '#4f4a44',
};

export const metadata: Metadata = {
  title: {
    default: `${SITE.brandName} — ${SITE.brandTagline}`,
    template: `%s · ${SITE.brandName}`,
  },
  description: SITE.brandTagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-ground text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
