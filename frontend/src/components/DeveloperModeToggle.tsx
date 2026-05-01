import React from 'react';
import { useMetrics } from '@/context/MetricsContext';

export default function DeveloperModeToggle() {
  const { developerMode, toggleDeveloperMode } = useMetrics();

  return (
    <button
      onClick={toggleDeveloperMode}
      className={`px-3 py-1 md:px-4 md:py-1.5 font-mono text-[10px] md:text-xs uppercase tracking-widest border transition-all ${
        developerMode 
          ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
          : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-amber-400 hover:border-amber-400'
      }`}
    >
      <span className="hidden sm:inline">X-Ray Mode {developerMode ? 'ON' : 'OFF'}</span>
      <span className="sm:hidden">X-RAY_{developerMode ? 'ON' : 'OFF'}</span>
    </button>
  );
}
