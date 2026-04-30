import Head from "next/head";
import Hero from "@/components/PortfolioSections/Hero";
import Specs from "@/components/PortfolioSections/Specs";
import Experience from "@/components/PortfolioSections/Experience";
import HeroSearch from "@/components/HeroSearch";
import TerminalWidget from "@/components/TerminalWidget";
import LogisticsDropzone from "@/components/LogisticsDropzone";
import DeveloperModeToggle from "@/components/DeveloperModeToggle";
import SystemArchitectureOverlay from "@/components/SystemArchitectureOverlay";

export default function Home() {
  return (
    <>
      <Head>
        <title>Digital Control Room | Systems Architect Portfolio</title>
        <meta name="description" content="Portfolio of a Systems Architect & LLMOps Veteran showcasing advanced AI engineering capabilities." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-black text-zinc-100 selection:bg-gold selection:text-black">
        {/* Navigation / Header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-black font-bold text-xs">CR</div>
            <div className="text-sm font-bold tracking-[0.2em] text-zinc-100 hidden md:block">DIGITAL_CONTROL_ROOM_v1.0</div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest text-zinc-500 uppercase">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-gold transition-colors cursor-pointer bg-transparent border-none">System_Init</button>
              <button onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gold transition-colors cursor-pointer bg-transparent border-none">Live_Demos</button>
              <button onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gold transition-colors cursor-pointer bg-transparent border-none">System_Specs</button>
              <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gold transition-colors cursor-pointer bg-transparent border-none">Op_History</button>
            </nav>
            <div className="h-4 w-px bg-zinc-800 hidden md:block"></div>
            <div className="text-[10px] font-mono text-gold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
              SECURE_LINK_ACTIVE
            </div>
          </div>
        </header>

        <DeveloperModeToggle />
        <SystemArchitectureOverlay />

        {/* Hero Section */}
        <Hero />

        {/* Demos Section */}
        <section id="demos" className="py-24 bg-zinc-950">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Neural <span className="text-gold">Operations</span></h2>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">Live_Interactive_Demos</p>
            </div>

            <div className="grid grid-cols-1 gap-24">
              {/* Demo 1: Adaptive Interface */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold mb-4 text-white">01. The Adaptive Interface</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      Demonstrates dynamic prompt engineering using <span className="text-gold font-bold">Llama 3.1 8B</span>. This logic is derived from my <span className="text-zinc-100 font-bold">Zenith-LaTeX</span> project, enforcing the STAR method and Action Verbs for high-impact professional summaries.
                    </p>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded text-xs font-mono text-zinc-500">
                      <p className="mb-2 text-zinc-400 uppercase tracking-wider">Tech Stack:</p>
                      <ul className="space-y-1">
                        <li>• Next.js / TypeScript</li>
                        <li>• FastAPI Backend</li>
                        <li>• NVIDIA NIM API</li>
                        <li>• JSON Constraint Parsing</li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-2/3 w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-0">
                    <HeroSearch />
                  </div>
                </div>
              </div>

              {/* Demo 2: Diagnostic Terminal */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
                <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
                  <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold mb-4 text-white">02. L2 Diagnostic Terminal</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      A multi-model pipeline featuring <span className="text-gold font-bold">Nemotron Content Safety</span> and <span className="text-gold font-bold">Nemotron-120B</span>. Built to simulate the AI-assisted L2 support workflows I manage at TCS to accelerate SOP generation and incident resolution.
                    </p>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded text-xs font-mono text-zinc-500">
                      <p className="mb-2 text-zinc-400 uppercase tracking-wider">Tech Stack:</p>
                      <ul className="space-y-1">
                        <li>• LLM-as-a-Guardrail</li>
                        <li>• Sequential Inference</li>
                        <li>• Log Tokenization</li>
                        <li>• SOP Extraction Logic</li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-2/3 w-full bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-0">
                    <TerminalWidget />
                  </div>
                </div>
              </div>

              {/* Demo 3: Logistics Engine */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold mb-4 text-white">03. Logistics Reasoning Engine</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      Utilizes <span className="text-gold font-bold">Nemotron-3-Nano-Omni</span> (Reasoning model) to parse unstructured invoice data and perform business intelligence calculations with chain-of-thought logic.
                    </p>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded text-xs font-mono text-zinc-500">
                      <p className="mb-2 text-zinc-400 uppercase tracking-wider">Tech Stack:</p>
                      <ul className="space-y-1">
                        <li>• CoT (Chain of Thought)</li>
                        <li>• Unstructured Data Extraction</li>
                        <li>• BI Logic Integration</li>
                        <li>• Multi-Model Benchmarking</li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-2/3 w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-0">
                    <LogisticsDropzone />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Specs Section */}
        <Specs />

        {/* Experience Section */}
        <Experience />

        {/* Footer */}
        <footer id="contact" className="py-20 border-t border-zinc-900 bg-black text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-white mb-4">Establish <span className="text-gold">Connection</span></h3>
            <p className="text-zinc-400 mb-8 font-mono text-sm">SECURE_COMM_PROTOCOL: ON</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg text-left">
                <p className="text-gold font-mono text-[10px] uppercase mb-2 tracking-widest">Email_Endpoint</p>
                <a href="mailto:shubhamreddy9172@gmail.com" className="text-white hover:text-gold transition-colors text-lg font-bold">shubhamreddy9172@gmail.com</a>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg text-left">
                <p className="text-gold font-mono text-[10px] uppercase mb-2 tracking-widest">Phone_Gateway</p>
                <p className="text-white text-lg font-bold">+91-9172587538</p>
              </div>
            </div>

            <div className="mb-12 flex justify-center gap-8 text-zinc-500">
              <a href="https://linkedin.com/in/shubham-reddy" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-mono text-xs uppercase tracking-widest no-underline border-b border-transparent hover:border-gold pb-1">LinkedIn</a>
              <a href="https://github.com/shubhamreddy91" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-mono text-xs uppercase tracking-widest no-underline border-b border-transparent hover:border-gold pb-1">GitHub</a>
              <a href="/Shubham_Resume.pdf" target="_blank" className="hover:text-gold transition-colors font-mono text-xs uppercase tracking-widest no-underline border-b border-transparent hover:border-gold pb-1">Download_CV</a>
            </div>
            
            <p className="text-zinc-600 text-[10px] font-mono mb-4 uppercase tracking-[0.2em]">
              Location: Pune, India // Timezone: IST (UTC+5:30)
            </p>
            
            <p className="text-zinc-700 text-[10px] font-mono">
              &copy; {new Date().getFullYear()} SHUBHAM_REDDY_CORE_SYSTEMS. AUTH_REQUIRED.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
