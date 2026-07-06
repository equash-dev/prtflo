'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'eq.pipeline';

interface PipelineContextValue {
  pipeline: boolean;
  toggle: () => void;
}

const PipelineContext = createContext<PipelineContextValue | null>(null);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [pipeline, setPipeline] = useState(false);

  useEffect(() => {
    setPipeline(window.localStorage.getItem(STORAGE_KEY) === 'on');
  }, []);

  const toggle = useCallback(() => {
    setPipeline((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      return next;
    });
  }, []);

  return (
    <PipelineContext.Provider value={{ pipeline, toggle }}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline(): PipelineContextValue {
  const ctx = useContext(PipelineContext);
  if (!ctx) {
    throw new Error('usePipeline must be used inside PipelineProvider');
  }
  return ctx;
}
