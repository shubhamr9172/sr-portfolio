import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    title: "System Engineer",
    company: "Tata Consultancy Services (TCS) — Pune",
    period: "May 2024 - Present",
    description: "Ensuring continuous operation and high availability of enterprise applications within strict SLA parameters as a key member of a production run-team. Maintaining CI/CD pipelines via Jenkins and Concourse (NitroDX), performing data updates via REST APIs (Postman), and analyzing PostgreSQL databases for proactive incident resolution. Utilizing Microsoft Copilot to automate log summarization and SOP generation.",
    skills: ["PostgreSQL", "Jenkins", "Concourse", "Docker", "SLA Management", "NitroDX"]
  },
  {
    title: "Project: Corporate Onboarding Assistant (AI-RAG)",
    company: "Independent Development",
    period: "2024",
    description: "Engineered an AI-driven RAG system that reduced the employee onboarding lifecycle from 1 week to 1 day (85% reduction in time-to-productivity). Built a high-performance retrieval pipeline using LangChain and NVIDIA NIM, automating access request guidance and reducing lead support queries by 40%. Implemented a role-aware personalization engine and scalable document ingestion with ChromaDB.",
    skills: ["LangChain", "NVIDIA NIM", "ChromaDB", "Python", "RAG", "Role-Aware Filtering"]
  },
  {
    title: "Project: Zenith-LaTeX",
    company: "Independent Development",
    period: "2024",
    description: "Architected a 100% serverless React application that transforms raw LaTeX code into ATS-compliant PDFs, reducing the manual resume update cycle by over 70%. Optimized operational costs to $0/month via client-side TeXLive API patterns. Integrated Gemini & NVIDIA Gemma 2 APIs to enforce professional standards like the STAR method and Action Verbs.",
    skills: ["React", "Gemini API", "Gemma 2", "Monaco Editor", "LaTeX", "CORS Optimization"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-8 md:px-16 border-t border-zinc-900 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Operational <span className="text-gold">History</span></h2>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Experience_Timeline</p>
        </motion.div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                <div className="mb-4 md:mb-0 md:col-span-1 pt-1">
                  <span className="text-gold font-mono text-sm">{exp.period}</span>
                </div>
                
                <div className="md:col-span-3 relative">
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute -left-[2.35rem] top-1.5 w-3 h-3 bg-zinc-900 border border-gold rounded-full z-10 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                  {/* Timeline line */}
                  <div className="hidden md:block absolute -left-[2rem] top-4 bottom-[-3rem] w-px bg-zinc-800 z-0"></div>

                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <h4 className="text-zinc-400 mb-4">{exp.company}</h4>
                  <p className="text-zinc-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
