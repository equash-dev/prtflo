'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE } from '@/config/site';
import { CurrencySwitcher } from './CurrencySwitcher';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-canvas/15 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-[11px] uppercase tracking-[0.04em] text-canvas/60 md:pointer-events-none md:py-0"
      >
        {title}
        <svg
          viewBox="0 0 24 24"
          className={[
            'h-3.5 w-3.5 text-canvas/60 transition-transform duration-200 md:hidden',
            open ? 'rotate-45' : '',
          ].join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div className={[open ? 'block' : 'hidden', 'pb-5 md:block md:pb-0 md:pt-5'].join(' ')}>
        {children}
      </div>
    </div>
  );
}

// True-black band — a direct structural pull from the confirmed flat-black
// footer convention, not just a recolour of the light-chrome tokens.
export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="mt-24 bg-ground px-4 md:px-10">
      <div className="py-14 md:py-16">
        <div className="md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] md:gap-10">
          <div className="pb-8 md:pb-0">
            <div className="flex flex-col leading-none">
              <span className="text-base uppercase tracking-[0.1em] text-canvas">
                {SITE.brandName}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-canvas/60">
                {SITE.brandSerial}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-canvas/60">
              {SITE.brandTagline}
            </p>
          </div>

          <FooterColumn title="Collections">
            <ul className="space-y-3 text-sm text-canvas">
              {SITE.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-canvas/60">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="House">
            <ul className="space-y-3 text-sm text-canvas">
              {SITE.utilityNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-canvas/60">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="text-sm text-canvas transition-colors hover:text-canvas/60"
            >
              {SITE.contactEmail}
            </a>
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="text-sm leading-relaxed text-canvas/60">
              Notes from the house: new work and the occasional reveal.
            </p>
            {subscribed ? (
              <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-canvas">
                Noted. The house writes rarely, and only when there is
                something to show.
              </p>
            ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="mt-4 flex"
            >
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email address"
                className="h-10 w-full min-w-0 border border-canvas/20 bg-transparent px-3 text-[12px] text-canvas placeholder:text-canvas/50 focus:border-canvas focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-l-0 border-canvas/20 text-canvas transition-colors hover:bg-canvas hover:text-ground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="14 6 20 12 14 18" />
                </svg>
              </button>
            </form>
            )}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-canvas/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.04em] text-canvas/60">
              United Kingdom · English
            </span>
            <CurrencySwitcher variant="dark" />
          </div>
          <Link
            href="/intro"
            className="text-[11px] uppercase tracking-[0.04em] text-canvas/60 transition-colors hover:text-canvas"
          >
            {SITE.revealLine}
          </Link>
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.04em] text-canvas/60">
          © {new Date().getFullYear()} {SITE.brandName}
        </p>
      </div>
    </footer>
  );
}
