'use client';

import type { ReactNode } from 'react';
import { CurrencyProvider } from './CurrencyContext';
import { PipelineProvider } from './PipelineContext';
import { BasketProvider } from './BasketContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <PipelineProvider>
        <BasketProvider>{children}</BasketProvider>
      </PipelineProvider>
    </CurrencyProvider>
  );
}
