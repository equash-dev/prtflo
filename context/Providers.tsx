'use client';

import type { ReactNode } from 'react';
import { CurrencyProvider } from './CurrencyContext';
import { PipelineProvider } from './PipelineContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <PipelineProvider>{children}</PipelineProvider>
    </CurrencyProvider>
  );
}
