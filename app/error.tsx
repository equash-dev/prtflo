'use client';

import { Button } from '@/components/ui/Button';
import { SITE } from '@/config/site';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ground px-6 py-16 text-center text-canvas">
      <p className="text-[11px] uppercase tracking-[0.2em] text-canvas/60">
        {SITE.brandSerial}
      </p>
      <h1 className="mt-6 text-4xl font-normal uppercase leading-[0.95] tracking-tight md:text-6xl">
        A seam gave way.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-canvas/70">
        Something went wrong while dressing this page.
      </p>
      <div className="mt-10">
        <Button size="lg" type="button" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
