'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { CurrencyCode } from '@/types/currency';
import { CURRENCIES, DEFAULT_CURRENCY } from '@/config/currencies';

const STORAGE_KEY = 'eq.currency';

interface CurrencyContextValue {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
  config: (typeof CURRENCIES)[CurrencyCode];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in CURRENCIES) {
      setCodeState(stored as CurrencyCode);
    }
  }, []);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ code, setCode, config: CURRENCIES[code] }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used inside CurrencyProvider');
  }
  return ctx;
}
