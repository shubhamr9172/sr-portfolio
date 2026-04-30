import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function NeuralCore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms
  const rotateX = useTransform(mouseY, [-400, 400], [10, -10]);
  const rotateY = useTransform(mouseX, [-400, 400], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px] pointer-events-none">
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-64 h-64 flex items-center justify-center"
      >
        {/* The Outer Shell (Concentric Rings) */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{ 
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [360, 0]
            }}
            transition={{ 
              duration: 10 + ring * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute border border-gold/30 rounded-full"
            style={{ 
              width: `${100 + ring * 40}%`, 
              height: `${100 + ring * 40}%`,
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.1)'
            }}
          />
        ))}

        {/* The Geometric Heart */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotateZ: [0, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-32 h-32 flex items-center justify-center"
        >
          {/* Glowing Center */}
          <div className="absolute inset-0 bg-gold/40 rounded-full blur-[40px] animate-pulse" />
          
          {/* Wireframe Cube/Diamond */}
          <div className="w-16 h-16 border-2 border-gold rotate-45 relative shadow-[0_0_30px_rgba(251,191,36,0.6)]">
            <div className="absolute inset-2 border border-gold/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          </div>
        </motion.div>

        {/* Orbiting Data Nodes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotateY: [0, 360],
              rotateX: [360, 0]
            }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.5
            }}
            className="absolute w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="absolute top-0 left-1/2 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              style={{ transform: `translateZ(${150 + i * 20}px)` }}
            />
          </motion.div>
        ))}

        {/* Floating System Terms (Holographic Glitch) */}
        <div className="absolute inset-0 overflow-visible">
          {["NEURAL_LINK", "QUANTUM_INIT", "LLM_CORE", "RAG_ACTIVE", "SYS_LEVEL_01"].map((term, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [0, (i % 2 === 0 ? 200 : -200)],
                y: [0, (i < 3 ? 200 : -200)],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono text-gold border border-gold/20 px-2 py-0.5 bg-black/60 backdrop-blur-sm whitespace-nowrap"
            >
              {term}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Background Scanning Beam */}
      <motion.div 
        animate={{ y: [-200, 600] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent h-20 w-full pointer-events-none opacity-50"
      />
    </div>
  );
}
