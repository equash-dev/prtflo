import { Button } from '@/components/ui/Button';
import { SITE } from '@/config/site';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ground px-6 py-16 text-center text-canvas">
      <p className="text-[11px] uppercase tracking-[0.2em] text-canvas/60">
        {SITE.brandSerial}
      </p>
      <h1 className="mt-6 text-4xl font-normal uppercase leading-[0.95] tracking-tight md:text-6xl">
        Nothing hangs here.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-canvas/70">
        The page you asked for was never cut. The collection is still open.
      </p>
      <div className="mt-10">
        <Button href="/collection" size="lg">
          Enter the collection
        </Button>
      </div>
    </main>
  );
}
