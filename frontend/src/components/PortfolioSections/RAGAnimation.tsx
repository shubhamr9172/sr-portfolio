import React from 'react';
import { motion } from 'framer-motion';

export default function RAGAnimation() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background Knowledge Grid (The Vector DB) */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-4 opacity-20">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="w-1 h-1 bg-gold rounded-full"
          />
        ))}
      </div>

      {/* The Synthesis Core (The LLM) */}
      <motion.div 
        className="relative z-10 w-32 h-32 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Core Glow */}
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Core Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-gold/30 rounded-full border-dashed" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-gold/50 rounded-full border-dotted" 
        />
        
        {/* Central Hub */}
        <div className="w-12 h-12 bg-zinc-900 border border-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          <div className="w-4 h-4 bg-gold rounded-sm animate-spin-slow rotate-45" />
        </div>
      </motion.div>

      {/* Query Pulses (Data Flow) */}
      <DataStream direction="left" />
      <DataStream direction="right" />
      <DataStream direction="top" />
      <DataStream direction="bottom" />

      {/* Floating Tokens (The Synthesis Output) */}
      <div className="absolute inset-0">
        {[ "RETRIEVE", "AUGMENT", "GENERATE", "VECTOR_DB", "CONTEXT", "LLM_INIT"].map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
              scale: [0.5, 1, 0.8]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              delay: i * 1.5,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-gold/60 border border-gold/20 px-2 py-1 rounded bg-black/40 backdrop-blur-sm"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DataStream({ direction }: { direction: 'left' | 'right' | 'top' | 'bottom' }) {
  const isHorizontal = direction === 'left' || direction === 'right';
  
  return (
    <div className={`absolute ${isHorizontal ? 'w-full h-px' : 'h-full w-px'} opacity-30`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          initial={isHorizontal ? { x: direction === 'left' ? -200 : 200 } : { y: direction === 'top' ? -200 : 200 }}
          animate={isHorizontal ? { x: direction === 'left' ? 600 : -600 } : { y: direction === 'top' ? 600 : -600 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: i * 1.2,
            ease: "easeInOut"
          }}
          className={`absolute ${isHorizontal ? 'w-24 h-px' : 'h-24 w-px'} bg-gradient-to-r from-transparent via-gold to-transparent`}
          style={isHorizontal ? { top: '50%' } : { left: '50%' }}
        />
      ))}
    </div>
  );
}
