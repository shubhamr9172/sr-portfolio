import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, GraduationCap, Award, Code2, Layers, Database } from 'lucide-react';

const SKILLS = [
  {
    category: "AI & Automation",
    icon: <Cpu className="text-gold" size={20} />,
    items: ["Microsoft Copilot (Applied)", "Prompt Engineering", "Automation Concepts", "LangChain", "NVIDIA NIM"]
  },
  {
    category: "Platforms & Tools",
    icon: <Layers className="text-gold" size={20} />,
    items: ["Docker", "Jenkins", "Concourse", "Postman", "ServiceNow", "Git", "Confluence"]
  },
  {
    category: "Programming & Data",
    icon: <Database className="text-gold" size={20} />,
    items: ["Python", "SQL", "PostgreSQL", "Java (Basic)", "React", "Next.js", "FastAPI"]
  }
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering – Computer Science",
    institution: "Marathwada Mitra Mandal’s Institute of Technology, Pune",
    year: "2023"
  },
  {
    degree: "Diploma – Information Technology",
    institution: "Puranmal Lahoti Government Polytechnic, Latur",
    year: "2020"
  }
];

const CERTIFICATIONS = [
  { name: "Google – Introduction to Generative AI", provider: "Google" },
  { name: "Intel – AI Aware Program", provider: "Intel" }
];

export default function Specs() {
  return (
    <section id="specs" className="py-24 px-8 md:px-16 bg-black border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-2">System <span className="text-gold">Specifications</span></h2>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Technical_Capabilities_&_Credentials</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Code2 size={20} className="text-gold" />
              Core_Architecture.exe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS.map((skillGroup, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg hover:border-gold/50 transition-colors group"
                >
                  <div className="mb-4 p-2 bg-zinc-900 rounded w-fit group-hover:bg-gold/10 transition-colors">
                    {skillGroup.icon}
                  </div>
                  <h4 className="text-white font-bold mb-4 font-mono text-sm uppercase tracking-wider">{skillGroup.category}</h4>
                  <ul className="space-y-2">
                    {skillGroup.items.map((item, i) => (
                      <li key={i} className="text-zinc-500 text-xs font-mono flex items-center gap-2">
                        <span className="w-1 h-1 bg-gold rounded-full opacity-50"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certs Column */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <GraduationCap size={20} className="text-gold" />
                Academic_Records
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-zinc-800 pl-4 py-1">
                    <p className="text-zinc-300 text-sm font-bold leading-snug mb-1">{edu.degree}</p>
                    <p className="text-zinc-500 text-xs">{edu.institution}</p>
                    <p className="text-gold font-mono text-[10px] mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Award size={20} className="text-gold" />
                Certified_Assets
              </h3>
              <div className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 bg-gold rotate-45 shrink-0"></div>
                    <div>
                      <p className="text-zinc-300 text-sm leading-snug">{cert.name}</p>
                      <p className="text-zinc-500 text-[10px] font-mono">{cert.provider}_VERIFIED</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info / Mission */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-6 border border-dashed border-zinc-800 rounded-lg bg-zinc-950/50"
        >
          <p className="text-zinc-500 font-mono text-xs leading-relaxed italic">
            // Additional_Directive: Created educational content on Generative AI and Prompt Engineering; authored technical blogs on AI, automation, and software engineering. Committed to bridging the gap between legacy systems and intelligent automation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
