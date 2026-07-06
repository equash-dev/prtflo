import Link from 'next/link';
import { CATEGORIES } from '@/config/categories';

export function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav className="border-b border-hairline px-4 md:px-10">
      <ul className="flex gap-6 overflow-x-auto">
        {CATEGORIES.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className={[
                  'inline-flex h-11 items-center border-b text-[11px] uppercase tracking-[0.04em] transition-colors',
                  active
                    ? 'border-ink text-ink'
                    : 'border-transparent text-muted hover:text-ink',
                ].join(' ')}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
