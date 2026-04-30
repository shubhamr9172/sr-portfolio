import React, { useState } from 'react';
import { useMetrics } from '@/context/MetricsContext';

export default function TerminalWidget() {
  const [logInput, setLogInput] = useState('');
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState<{ latency_ms: number; prompt_tokens: number; completion_tokens: number } | null>(null);
  const { addMetric } = useMetrics();

  const addOutputLine = (line: React.ReactNode) => {
    setOutput((prev) => [...prev, line]);
  };

  const handleDiagnose = async () => {
    if (!logInput.trim()) return;
    setIsProcessing(true);
    setMetrics(null);
    setOutput([<div key="start" className="text-zinc-500">{`> Analyzing provided server log...`}</div>]);
    
    try {
      // 1. Safety Check (Engineering Trap)
      addOutputLine(<div key="sc-init" className="text-amber-500 mt-2">Initiating NVIDIA Nemotron Content Safety Check...</div>);
      
      const safetyRes = await fetch('http://localhost:8000/api/safety-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_log: logInput }),
      });
      const safetyData = await safetyRes.json();
      
      if (!safetyData.safe) {
        addOutputLine(<div key="sc-fail" className="text-red-500 font-bold">[!] ERROR: Malicious content or prompt injection detected. Aborting.</div>);
        setIsProcessing(false);
        return;
      }
      
      addOutputLine(
        <div key="sc-pass" className="text-green-400 font-bold animate-pulse">
          [ ✓ Guardrail Check Passed ] ({safetyData.latency_ms}ms)
        </div>
      );
      
      addMetric({
        endpoint: 'POST /api/safety-check',
        latency_ms: safetyData.latency_ms,
        prompt_tokens: 0,
        completion_tokens: 0,
        timestamp: new Date(),
      });
      
      // 2. Generate SOP
      addOutputLine(<div key="sop-init" className="text-zinc-400 mt-4">Routing log to NVIDIA Nemotron-120B for SOP generation...</div>);
      
      const diagRes = await fetch('http://localhost:8000/api/diagnose-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_log: logInput }),
      });
      
      if (!diagRes.ok) throw new Error('API Error during diagnosis');
      const diagData = await diagRes.json();
      
      addOutputLine(
        <div key="sop-result" className="mt-4 p-4 border border-zinc-700 bg-zinc-900 rounded">
          <h3 className="text-gold font-bold mb-4">Generated Standard Operating Procedure (SOP)</h3>
          <div className="text-zinc-300 whitespace-pre-wrap font-sans">{diagData.sop}</div>
        </div>
      );
      
      setMetrics({
        latency_ms: diagData.latency_ms,
        prompt_tokens: diagData.prompt_tokens,
        completion_tokens: diagData.completion_tokens,
      });

      addMetric({
        endpoint: 'POST /api/diagnose-log',
        latency_ms: diagData.latency_ms,
        prompt_tokens: diagData.prompt_tokens,
        completion_tokens: diagData.completion_tokens,
        timestamp: new Date(),
      });

    } catch (error) {
      addOutputLine(<div key="err" className="text-red-500 mt-2">[!] Critical Error: Communication with NVIDIA endpoints failed.</div>);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      
      <div className="bg-black border border-zinc-800 rounded-lg overflow-hidden font-mono text-sm shadow-xl">
        {/* Terminal Header */}
        <div className="bg-zinc-900 px-4 py-2 flex items-center border-b border-zinc-800">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-zinc-500 text-xs tracking-wider">root@control-room:~</div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="text-gold block mb-2">{`> Input Raw Server Log:`}</label>
            <textarea
              className="w-full bg-transparent border border-zinc-700 rounded p-4 text-zinc-300 focus:outline-none focus:border-gold min-h-[120px] resize-y"
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
              placeholder="Paste stack trace or error log here..."
            />
          </div>
          
          <button 
            onClick={handleDiagnose}
            disabled={isProcessing}
            className="border border-gold text-gold hover:bg-gold hover:text-black font-bold px-6 py-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? 'Executing...' : 'Run Diagnostics'}
          </button>
          
          <div className="mt-6 border-t border-zinc-800 pt-4 min-h-[100px]">
            {output.map((line, i) => (
              <div key={i} className="mb-1">{line}</div>
            ))}
            {isProcessing && <div className="animate-pulse text-gold mt-2">_</div>}
          </div>

          {metrics && (
            <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-4 text-xs font-mono text-zinc-600">
              <span>Model Latency: {metrics.latency_ms}ms</span>
              <span>Tokens: {metrics.prompt_tokens} (in) / {metrics.completion_tokens} (out)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
