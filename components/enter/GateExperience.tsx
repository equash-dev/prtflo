'use client';

import { useActionState } from 'react';
import { unlock, type GateState } from '@/app/enter/actions';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';

export function GateExperience() {
  const [state, formAction, isPending] = useActionState<GateState, FormData>(
    unlock,
    null,
  );

  return (
    <main className="ambient flex min-h-svh flex-col justify-between bg-ground px-6 py-12 text-canvas md:px-12 md:py-16">
      <p className="cold-open text-[11px] uppercase tracking-[0.2em] text-canvas/60">
        {SITE.brandSerial}
      </p>

      <div
        className="cold-open max-w-4xl"
        style={{ '--cold-open-delay': '120ms' } as React.CSSProperties}
      >
        <p className="text-[11px] uppercase tracking-[0.04em] text-canvas/50">
          {COPY.gate.eyebrow}
        </p>
        <h1 className="mt-6 text-5xl font-normal uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {SITE.brandName}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-canvas/70 md:text-xl">
          {COPY.gate.prompt}
        </p>
      </div>

      <form
        action={formAction}
        className="cold-open max-w-sm"
        style={{ '--cold-open-delay': '320ms' } as React.CSSProperties}
      >
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          autoFocus
          required
          placeholder={COPY.gate.placeholder}
          aria-label={COPY.gate.placeholder}
          aria-invalid={state ? true : undefined}
          className={`w-full border-0 border-b bg-transparent pb-3 text-base text-canvas outline-none transition-colors placeholder:uppercase placeholder:tracking-[0.04em] placeholder:text-canvas/40 focus:border-canvas ${
            state ? 'gate-miss border-canvas/60' : 'border-canvas/30'
          } ${isPending ? 'opacity-50' : ''}`}
          disabled={isPending}
        />
        <div className="mt-6 flex items-baseline justify-between gap-6">
          <button
            type="submit"
            disabled={isPending}
            className="text-[11px] uppercase tracking-[0.04em] text-canvas/80 transition-colors hover:text-canvas disabled:opacity-50"
          >
            {COPY.gate.submitLabel} →
          </button>
          <p aria-live="polite" className="gate-error text-[11px] uppercase tracking-[0.04em] text-canvas/50">
            {state && !isPending ? state.error : null}
          </p>
        </div>
      </form>
    </main>
  );
}
