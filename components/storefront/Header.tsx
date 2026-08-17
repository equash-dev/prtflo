'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/config/site';
import { useBasket } from '@/context/BasketContext';
import { CurrencySwitcher } from './CurrencySwitcher';
import { PipelineToggle } from './PipelineToggle';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const { count } = useBasket();
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 80 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  return (
    <>
    {/* Flat and opaque, no blur — confirmed from screenshot: centered wordmark,
        inline category nav, no hamburger/drawer. */}
    <header
      className={[
        'sticky top-0 z-40 border-b border-hairline bg-canvas',
        hidden
          ? '-translate-y-full transition-transform duration-300'
          : 'transition-transform duration-300',
      ].join(' ')}
    >
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-10">
        <nav className="flex items-center gap-4 md:gap-6">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] uppercase tracking-[0.02em] text-ink transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/collection"
          className="justify-self-center text-[15px] font-medium uppercase tracking-[0.08em] text-ink md:text-base"
        >
          {SITE.brandName}
        </Link>

        <div className="flex items-center justify-self-end gap-4 md:gap-5">
          {/* Negative margins keep the layout tight while the padded box
              gives both text controls a finger-sized touch target. */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="-mx-1 -my-3 px-1 py-3 text-[11px] uppercase tracking-[0.04em] text-ink transition-opacity hover:opacity-60"
          >
            Search
          </button>
          <Link
            href="/basket"
            className="-mx-1 -my-3 px-1 py-3 text-[11px] uppercase tracking-[0.04em] text-ink transition-opacity hover:opacity-60"
          >
            Basket{count > 0 ? ` (${count})` : ''}
          </Link>
          <div className="hidden sm:block">
            <PipelineToggle />
          </div>
          <div className="hidden sm:block">
            <CurrencySwitcher />
          </div>
        </div>
      </div>
    </header>

    {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}
