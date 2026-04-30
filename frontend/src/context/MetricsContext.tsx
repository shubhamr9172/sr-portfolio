import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ApiMetric {
  endpoint: string;
  latency_ms: number;
  prompt_tokens: number;
  completion_tokens: number;
  timestamp: Date;
}

interface MetricsContextType {
  metrics: ApiMetric[];
  addMetric: (metric: ApiMetric) => void;
  developerMode: boolean;
  toggleDeveloperMode: () => void;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export function MetricsProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<ApiMetric[]>([]);
  const [developerMode, setDeveloperMode] = useState(false);

  const addMetric = (metric: ApiMetric) => {
    setMetrics((prev) => [metric, ...prev].slice(0, 10)); // keep last 10
  };

  const toggleDeveloperMode = () => {
    setDeveloperMode((prev) => !prev);
  };

  return (
    <MetricsContext.Provider value={{ metrics, addMetric, developerMode, toggleDeveloperMode }}>
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetrics() {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
}
