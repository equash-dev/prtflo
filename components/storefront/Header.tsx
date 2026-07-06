'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/config/site';
import { CurrencySwitcher } from './CurrencySwitcher';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!open) {
        setHidden(y > 80 && y > lastY.current);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, searchOpen]);

  return (
    <>
    {/* Transform only while hiding — a transformed header becomes the containing
        block for the fixed drawer/search overlay and clips them to its own box. */}
    <header
      className={[
        'sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur',
        hidden
          ? '-translate-y-full transition-transform duration-300'
          : 'transition-transform duration-300',
      ].join(' ')}
    >
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-10">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="-ml-2 flex h-10 w-10 items-center justify-center text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          </button>
          <Link href="/collection" className="flex flex-col leading-none">
            <span className="text-sm uppercase tracking-[0.1em] text-ink md:text-base">
              {SITE.brandName}
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-muted">
              {SITE.brandSerial}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="border-b border-ink pb-0.5 text-[11px] uppercase tracking-[0.04em] text-ink transition-opacity hover:opacity-60"
          >
            Search
          </button>
          <div className="hidden sm:block">
            <CurrencySwitcher />
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={[
          'fixed inset-0 z-50 lg:block',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={[
            'absolute inset-0 bg-ink/30 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
        <div
          className={[
            'absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-canvas px-6 py-5 shadow-xl transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
              {SITE.brandSerial}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-5">
            {SITE.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl uppercase tracking-[0.02em] text-ink transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="mt-10 flex flex-col gap-3 border-t border-hairline pt-8">
            {SITE.utilityNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[12px] uppercase tracking-[0.04em] text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/intro"
              onClick={() => setOpen(false)}
              className="text-[12px] uppercase tracking-[0.04em] text-muted transition-colors hover:text-ink"
            >
              {SITE.revealLine}
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-5 border-t border-hairline pt-6">
            <CurrencySwitcher />
          </div>
        </div>
      </div>

    </header>

    {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}
