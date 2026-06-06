import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, Shield, Cpu, Activity, Sparkles, CheckCircle2, ShieldCheck, Key } from "lucide-react";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"security" | "model" | "general">("security");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: "security", label: "Security & Vault", icon: Shield, desc: "AES-256 vault configurations" },
    { id: "model", label: "Neural Engine", icon: Cpu, desc: "Neural prediction models" },
    { id: "general", label: "Integrations & Sync", icon: Activity, desc: "Handshake latencies & brokers" },
  ];

  const faqs = {
    security: [
      {
        q: "What is Zor-Lix?",
        a: "Zor-Lix is an AI-powered business intelligence platform that helps organizations unify data from multiple sources, automate data preparation, perform advanced analytics, and generate actionable insights for faster and more informed decision-making.",
      },
      {
        q: "Which data sources can Zor-Lix connect to?",
        a: "Zor-Lix supports integration with enterprise databases, data warehouses, CRM systems, ERP platforms, cloud applications, APIs, SaaS tools, and other business systems, creating a centralized intelligence layer across the organization.",
      },
    ],
    model: [
      {
        q: "How does the AI data processing engine work?",
        a: "The platform automatically ingests, cleans, validates, and structures incoming data before applying AI-driven analytics. This process helps eliminate data inconsistencies, improve quality, and ensure reliable insights across business operations.",
      },
      {
        q: "What types of insights does Zor-Lix provide?",
        a: "Zor-Lix delivers real-time business intelligence, trend analysis, anomaly detection, predictive forecasting, performance monitoring, and decision-support recommendations that help organizations identify opportunities and optimize operations.",
      },
    ],
    general: [
      {
        q: "Is Zor-Lix suitable for enterprise-scale deployments?",
        a: "Yes. Zor-Lix is designed for enterprise environments and supports scalable data processing, large-volume analytics workloads, multi-source integrations, and customizable intelligence dashboards to meet evolving business requirements.",
      },
      {
        q: "How does Zor-Lix improve business decision-making?",
        a: "Zor-Lix continuously analyzes enterprise data to identify trends, risks, and opportunities in real time. By transforming complex datasets into clear insights, predictive forecasts, and actionable recommendations, the platform enables teams to make faster, more informed decisions with greater confidence.",
      },
    ],
  };

  return (
    <section id="faq" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background radial soft lights */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-peach/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full text-center">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto mb-16 text-center flex flex-col items-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-mint bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full select-none">
            SUPPORT PLATFORM REGISTER
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mt-6 mb-4">
            Security & FAQ Directory
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Click any directory filter category button below to reload and audit dynamic system responses instantly.
          </p>

          {/* Centered Capsule Category Navigation Tab row */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/5 p-1.5 rounded-2xl mt-10 max-w-lg select-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setOpenIndex(0);
                }}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-sans font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-peach text-black shadow-md font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The New Layout Layout: Centered horizontal tab splitting bottom dual column (Grid 12) */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch text-left">
          
          {/* Column Left: Firewall Security Audit Checklist Panel (5 Columns) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-black border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="font-mono text-[9px] text-[#C5E898] uppercase tracking-widest block">SYSTEMS_FIREWALL_AUDIT</span>
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 text-peach rounded-2xl">
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-white text-base leading-tight">Zero-Trust Framework</h4>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">
                    Continuous cert checks and double encryptions are verified before database handshakes are established.
                  </p>
                </div>
              </div>

              {/* Checklist rows */}
              <ul className="flex flex-col gap-3 py-6 border-y border-white/5 my-4">
                {[
                  "Continuous SOC-2 cryptographic audits",
                  "No raw database tables are written to disk",
                  "AES-256 cloud envelope secrets keys mapping",
                  "Isolated customer database sandbox nodes",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3.5 text-xs text-gray-300 font-light">
                    <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 font-mono text-[8px] text-gray-600 uppercase tracking-widest">
              SECURE SHA-256 firewall proxy checked
            </div>
          </div>

          {/* Column Right: Dynamic Accordions for active category answers (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-2">
              KNOWLEDGE RESPONSIONS REGISTER
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {faqs[activeCategory].map((faq, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isOpen ? "border-peach/40 bg-white/5 shadow-md" : "border-white/5 hover:border-white/12 bg-[#050505]"
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-4.5">
                          <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? "text-peach" : "text-gray-500"} transition`} />
                          <span className="font-sans font-extrabold text-[#e5e7eb] text-sm sm:text-base tracking-tight leading-snug">
                            {faq.q}
                          </span>
                        </div>
                        <div className="p-1 rounded-lg bg-white/5 text-gray-400">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0 border-t border-white/5 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                              <p className="pl-9">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
