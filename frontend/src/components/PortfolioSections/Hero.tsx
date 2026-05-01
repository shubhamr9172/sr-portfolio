import { motion } from 'framer-motion';
import NeuralTopography from './NeuralTopography';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-8 md:px-16 overflow-hidden pt-20">
      {/* Background Matrix/Grid effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
             backgroundSize: '50px 50px',
             backgroundPosition: 'center center'
           }}>
      </div>
      
      {/* Scanning Line Background */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-gold to-transparent"
          style={{ width: '2px' }}
        />
      </div>

      {/* Glowing orb effect */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gold opacity-5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1 h-3 bg-gold/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <span className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase">Core_System_Online // Node_01_Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-white leading-[0.9]"
          >
            I'm <span className="text-gold">Shubham</span>
            <br/>Reddy<span className="text-gold">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-1 bg-zinc-900/50 border-l-2 border-gold w-fit px-4"
          >
            <span className="text-gold font-mono text-xs uppercase tracking-widest">Applied AI & Automation Engineer</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-xl text-zinc-500 max-w-xl mb-12 leading-relaxed font-light"
          >
            Architecting <span className="text-zinc-100 font-medium">intelligent systems</span> that bridge enterprise support and Generative AI. Specializing in high-availability automation and LLM-driven operational efficiency.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <a href="/Shubham_Resume.pdf" download="Shubham_Reddy_Resume.pdf" target="_blank" className="group relative px-6 py-4 md:px-8 md:py-4 overflow-hidden rounded bg-gold text-black font-bold no-underline text-center">
              <span className="relative z-10 font-mono text-xs md:text-sm uppercase tracking-wider">Download_CV.pdf</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <button onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-4 md:px-8 md:py-4 bg-transparent border border-zinc-700 hover:border-gold hover:text-gold transition-all duration-300 font-mono text-xs md:text-sm uppercase tracking-wider rounded cursor-pointer group text-center">
              <span className="group-hover:tracking-[0.2em] transition-all">Initialize_Demos</span>
            </button>
          </motion.div>
        </div>

        {/* Right side Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          {/* Subtle glow behind the topography */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 blur-[80px] rounded-full" />
          <NeuralTopography />
        </motion.div>
      </div>
    </section>
  );
}

