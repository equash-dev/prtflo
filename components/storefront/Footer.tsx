'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE } from '@/config/site';
import { CurrencySwitcher } from './CurrencySwitcher';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hairline md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-[11px] uppercase tracking-[0.04em] text-muted md:pointer-events-none md:py-0"
      >
        {title}
        <svg
          viewBox="0 0 24 24"
          className={[
            'h-3.5 w-3.5 text-muted transition-transform duration-200 md:hidden',
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

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="mt-24 border-t border-hairline px-4 md:px-10">
      <div className="py-14 md:py-16">
        <div className="md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] md:gap-10">
          <div className="pb-8 md:pb-0">
            <div className="flex flex-col leading-none">
              <span className="text-base uppercase tracking-[0.1em] text-ink">
                {SITE.brandName}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                {SITE.brandSerial}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {SITE.brandTagline}
            </p>
          </div>

          <FooterColumn title="Collections">
            <ul className="space-y-3 text-sm text-ink">
              {SITE.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-muted">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="House">
            <ul className="space-y-3 text-sm text-ink">
              {SITE.utilityNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-muted">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="text-sm text-ink transition-colors hover:text-muted"
            >
              {SITE.contactEmail}
            </a>
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="text-sm leading-relaxed text-muted">
              Notes from the house — new work and the occasional reveal.
            </p>
            {subscribed ? (
              <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-ink">
                Noted. The house writes rarely — and only when there is
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
                className="h-10 w-full min-w-0 border border-hairline bg-transparent px-3 text-[12px] text-ink placeholder:text-muted focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-l-0 border-hairline text-ink transition-colors hover:bg-ink hover:text-canvas"
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

        <div className="mt-12 flex flex-col gap-6 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.04em] text-muted">
              United Kingdom · English
            </span>
            <CurrencySwitcher />
          </div>
          <Link
            href="/intro"
            className="text-[11px] uppercase tracking-[0.04em] text-muted transition-colors hover:text-ink"
          >
            {SITE.revealLine}
          </Link>
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.04em] text-muted">
          © {new Date().getFullYear()} {SITE.brandName}
        </p>
      </div>
    </footer>
  );
}
