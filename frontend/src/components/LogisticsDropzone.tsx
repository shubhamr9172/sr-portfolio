import React, { useState } from 'react';
import { useMetrics } from '@/context/MetricsContext';

interface MarginResponse {
  analysis: string;
  latency_ms: number;
  prompt_tokens: number;
  completion_tokens: number;
}

export default function LogisticsDropzone() {
  const [invoiceText, setInvoiceText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addMetric } = useMetrics();

  const handleParse = async () => {
    if (!invoiceText.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/parse-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_text: invoiceText }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse invoice');
      }

      const data = await response.json();
      setResult(data);
      
      addMetric({
        endpoint: 'POST /api/parse-invoice',
        latency_ms: data.latency_ms,
        prompt_tokens: data.prompt_tokens,
        completion_tokens: data.completion_tokens,
        timestamp: new Date(),
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-8">

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <textarea
            value={invoiceText}
            onChange={(e) => setInvoiceText(e.target.value)}
            placeholder="e.g., 50lbs Flour: $25.00\n10lbs Sugar: $12.00\nYields: 500 Brownies"
            className="w-full h-48 p-4 bg-zinc-900 text-amber-500 font-mono border border-zinc-700 rounded focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none"
          />
          
          <button
            onClick={handleParse}
            disabled={loading || !invoiceText.trim()}
            className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold font-mono rounded uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Run Logistics Analysis'}
          </button>
        </div>

        <div className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded overflow-auto h-48 relative">
          {error && <div className="text-red-500 font-mono text-sm">{error}</div>}
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-80">
              <span className="text-amber-500 font-mono animate-pulse">Running Reasoning Model...</span>
            </div>
          )}

          {result && (
            <div className="font-mono text-sm">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-zinc-800">
                <span className="text-emerald-400 text-xs">STATUS: SUCCESS</span>
                <span className="text-zinc-500 text-xs">{result.latency_ms}ms | {result.completion_tokens} tokens</span>
              </div>
              <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {result.analysis}
              </div>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="text-zinc-600 font-mono text-sm h-full flex items-center justify-center">
              Awaiting input data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
