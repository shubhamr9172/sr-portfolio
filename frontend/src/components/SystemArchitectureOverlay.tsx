import React from 'react';
import { useMetrics } from '@/context/MetricsContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemArchitectureOverlay() {
  const { metrics, developerMode } = useMetrics();

  return (
    <AnimatePresence>
      {developerMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-40 bg-zinc-950/95 flex flex-col items-center justify-center font-mono backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-6xl p-8 pointer-events-auto"
          >
            <div className="flex justify-between items-end mb-8 border-b-2 border-gold pb-4">
              <h2 className="text-3xl text-gold tracking-[0.2em] uppercase">
                System Architecture & Telemetry
              </h2>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                Security_Level: ALPHA_7
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Client Node */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="border border-zinc-700 p-6 rounded bg-zinc-900 relative shadow-2xl"
              >
                <div className="absolute -right-4 top-1/2 w-8 h-px bg-gold opacity-50"></div>
                <h3 className="text-xl text-zinc-100 mb-2 font-bold">Client Layer</h3>
                <p className="text-zinc-400 text-sm">Next.js / React / Framer</p>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="text-emerald-400 text-xs flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    STATUS: ACTIVE
                  </div>
                </div>
              </motion.div>

              {/* API Gateway / Backend */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="border border-gold p-6 rounded bg-zinc-900 shadow-[0_0_30px_rgba(251,191,36,0.1)] relative z-10"
              >
                <div className="absolute -left-4 top-1/2 w-8 h-px bg-gold opacity-50"></div>
                <div className="absolute -right-4 top-1/2 w-8 h-px bg-gold opacity-50"></div>
                <h3 className="text-xl text-gold mb-2 font-bold">Orchestration</h3>
                <p className="text-zinc-400 text-sm">FastAPI / Python 3.12</p>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="text-gold text-xs animate-pulse font-bold">READY_FOR_INFERENCE</div>
                </div>
              </motion.div>

              {/* NVIDIA NIM */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="border border-zinc-700 p-6 rounded bg-zinc-900 relative shadow-2xl"
              >
                <div className="absolute -left-4 top-1/2 w-8 h-px bg-gold opacity-50"></div>
                <h3 className="text-xl text-zinc-100 mb-2 font-bold">Inference Engine</h3>
                <p className="text-zinc-400 text-sm">NVIDIA NIM Endpoints</p>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="text-emerald-400 text-xs">MODEL_NODES: 4 ACTIVE</div>
                </div>
              </motion.div>
            </div>

            {/* Live Metrics Feed */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded shadow-inner overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm text-gold tracking-[0.3em] uppercase">Live Telemetry Stream</h3>
                <div className="text-[10px] font-mono text-zinc-600">POLLING_INTERVAL: REALTIME</div>
              </div>
              
              {metrics.length === 0 ? (
                <div className="py-12 text-center text-zinc-600 italic border-2 border-dashed border-zinc-800 rounded">
                  No API calls intercepted. Execute a demo to populate telemetry.
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[300px] custom-scrollbar">
                  <table className="w-full text-left text-sm text-zinc-400 border-collapse">
                    <thead className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider sticky top-0 bg-zinc-900 border-b border-zinc-800">
                      <tr>
                        <th className="px-4 py-3 font-bold">Timestamp</th>
                        <th className="px-4 py-3 font-bold">Endpoint_Route</th>
                        <th className="px-4 py-3 font-bold text-gold">Latency_ms</th>
                        <th className="px-4 py-3 font-bold">Tokens_In</th>
                        <th className="px-4 py-3 font-bold">Tokens_Out</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {metrics.slice().reverse().map((m, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={idx} 
                          className="hover:bg-zinc-800/30 transition-colors group"
                        >
                          <td className="px-4 py-3 font-mono text-xs text-zinc-500 group-hover:text-zinc-400">
                            {m.timestamp.toLocaleTimeString([], { hour12: false })}
                          </td>
                          <td className="px-4 py-3 text-emerald-400 font-mono text-xs">{m.endpoint}</td>
                          <td className="px-4 py-3 text-gold font-bold font-mono">{m.latency_ms}</td>
                          <td className="px-4 py-3 font-mono text-xs">{m.prompt_tokens}</td>
                          <td className="px-4 py-3 font-mono text-xs">{m.completion_tokens}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
