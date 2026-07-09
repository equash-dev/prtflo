'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'eq.basket';

export interface BasketLine {
  slug: string;
  size: string | null;
  colour: string | null;
  qty: number;
}

type LineRef = Pick<BasketLine, 'slug' | 'size' | 'colour'>;

const lineKey = (l: LineRef) => [l.slug, l.size ?? '', l.colour ?? ''].join('|');

function load(): BasketLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is BasketLine =>
        !!l &&
        typeof l === 'object' &&
        typeof (l as BasketLine).slug === 'string' &&
        typeof (l as BasketLine).qty === 'number' &&
        (l as BasketLine).qty > 0,
    );
  } catch {
    return [];
  }
}

interface BasketContextValue {
  lines: BasketLine[];
  count: number;
  add: (line: LineRef) => void;
  setQty: (line: LineRef, qty: number) => void;
  remove: (line: LineRef) => void;
  clear: () => void;
}

const BasketContext = createContext<BasketContextValue | null>(null);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BasketLine[]>([]);

  useEffect(() => {
    setLines(load());
  }, []);

  const update = useCallback(
    (fn: (prev: BasketLine[]) => BasketLine[]) => {
      setLines((prev) => {
        const next = fn(prev);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const add = useCallback(
    (line: LineRef) =>
      update((prev) => {
        const key = lineKey(line);
        const existing = prev.find((l) => lineKey(l) === key);
        if (existing) {
          return prev.map((l) =>
            lineKey(l) === key ? { ...l, qty: l.qty + 1 } : l,
          );
        }
        return [...prev, { ...line, qty: 1 }];
      }),
    [update],
  );

  const setQty = useCallback(
    (line: LineRef, qty: number) =>
      update((prev) => {
        const key = lineKey(line);
        if (qty < 1) return prev.filter((l) => lineKey(l) !== key);
        return prev.map((l) => (lineKey(l) === key ? { ...l, qty } : l));
      }),
    [update],
  );

  const remove = useCallback(
    (line: LineRef) =>
      update((prev) => prev.filter((l) => lineKey(l) !== lineKey(line))),
    [update],
  );

  const clear = useCallback(() => update(() => []), [update]);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, add, setQty, remove, clear],
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

export function useBasket(): BasketContextValue {
  const ctx = useContext(BasketContext);
  if (!ctx) {
    throw new Error('useBasket must be used inside BasketProvider');
  }
  return ctx;
}
