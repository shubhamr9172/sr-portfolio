import React, { useState } from 'react';
import { useMetrics } from '@/context/MetricsContext';

export default function HeroSearch() {
  const [jobDescription, setJobDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [constraints, setConstraints] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ latency_ms: number; prompt_tokens: number; completion_tokens: number } | null>(null);
  const { addMetric } = useMetrics();

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;
    setIsLoading(true);
    setSummary('');
    setMetrics(null);
    try {
      const res = await fetch('http://localhost:8000/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription }),
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setSummary(data.summary);
      setMetrics({
        latency_ms: data.latency_ms,
        prompt_tokens: data.prompt_tokens,
        completion_tokens: data.completion_tokens,
      });
      addMetric({
        endpoint: 'POST /api/generate-summary',
        latency_ms: data.latency_ms,
        prompt_tokens: data.prompt_tokens,
        completion_tokens: data.completion_tokens,
        timestamp: new Date(),
      });
    } catch (error) {
      setSummary("An error occurred while communicating with the NVIDIA endpoint.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevealConstraints = async () => {
    if (constraints) {
      setConstraints(null);
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/api/summary-constraints');
      const data = await res.json();
      setConstraints(data.constraints);
    } catch (error) {
      setConstraints("Failed to fetch constraints.");
    }
  };

  return (
    <div className="w-full p-6 md:p-8">
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <textarea
          className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold min-h-[150px] mb-4"
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-gold-dark hover:bg-gold text-zinc-950 font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? 'Processing via Llama 3.1 8B...' : 'Generate Dynamic Summary'}
        </button>
      </div>

      {summary && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8 relative">
          <h2 className="text-xl font-semibold mb-4 text-gold">Professional Summary</h2>
          <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {summary}
          </div>
          
          {metrics && (
            <div className="mt-6 pt-4 border-t border-zinc-800 flex gap-4 text-xs font-mono text-zinc-500">
              <span>Latency: {metrics.latency_ms}ms</span>
              <span>Prompt Tokens: {metrics.prompt_tokens}</span>
              <span>Completion Tokens: {metrics.completion_tokens}</span>
            </div>
          )}

          <div className="mt-6">
            <button 
              onClick={handleRevealConstraints}
              className="text-sm text-gold border border-gold hover:bg-gold hover:text-zinc-950 px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              {constraints ? 'Hide Prompt Constraints' : 'View Prompt Constraints'}
            </button>
          </div>

          {constraints && (
            <div className="mt-4 bg-zinc-950 border border-zinc-800 p-4 rounded-md">
              <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">System Instructions</h3>
              <pre className="text-sm font-mono text-zinc-400 whitespace-pre-wrap">{constraints}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
