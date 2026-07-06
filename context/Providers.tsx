'use client';

import type { ReactNode } from 'react';
import { CurrencyProvider } from './CurrencyContext';

export function Providers({ children }: { children: ReactNode }) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
