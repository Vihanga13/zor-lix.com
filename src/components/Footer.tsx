import React, { useState, useEffect } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  Cpu, 
  Heart, 
  ArrowUp, 
  Terminal as TermIcon,
  ShieldCheck,
  Radio, 
  Network, 
  Compass, 
  Database,
  Lock,
  Workflow,
  Sparkles,
  RefreshCw,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [activeDiagnostic, setActiveDiagnostic] = useState<string>("UTC_SECURE");
  const [globalInferenceRate, setGlobalInferenceRate] = useState<number>(1420);
  const [sysTime, setSysTime] = useState<string>("");

  useEffect(() => {
    // Dynamic real-time telemetry simulator
    const timer = setInterval(() => {
      setGlobalInferenceRate((prev) => prev + Math.floor(Math.random() * 10) - 5);
    }, 1500);

    const updateTime = () => {
      const date = new Date();
      setSysTime(date.toISOString().substring(11, 19) + " UTC");
    };
    
    updateTime();
    const clockTimer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(clockTimer);
    };
  }, []);

  const links = {
    platform: [
      { name: "Live Insights Dashboard", id: "dashboard", description: "Real-time telemetry diagnostics" },
      { name: "Core Features", id: "features", description: "Transformer modeling parameters" },
      { name: "Constellation Pipeline", id: "pipeline", description: "Interactive star-atlas mesh" },
      { name: "System Pricing", id: "pricing", description: "Enterprise and dev nodes" },
    ],
    resources: [
      { name: "Staging Portal", id: "home", description: "Zero-latency entry lab" },
      { name: "Client Knowledgebase", id: "faq", description: "Encrypted direct FAQ vault" },
      { name: "Support Ingress", id: "contact", description: "Direct secure signal dispatch" },
    ],
    compliance: [
      { name: "Terms of Compliance", id: "terms", description: "Regulatory protocol statements" },
      { name: "Privacy Ledger", id: "privacy", description: "AES-256 local isolation guidelines" },
      { name: "E2EE Audit Reports", id: "audits", description: "Continuous consensus validation" },
    ]
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const diagnosticsOptions = [
    { key: "UTC_SECURE", label: "CLOCK", value: sysTime || "11:55:26 UTC" },
    { key: "ASYNC_SYNC", label: "SYNC", value: "99.998% AVG" },
    { key: "CIPHER_ROT", label: "CIPHER", value: "Kyber-768 ACTIVATED" },
    { key: "CPU_STABILITY", label: "CORES", value: "88/128 CLUSTERS" }
  ];

  return (
    <footer id="footer" className="bg-[#020202] border-t border-white/5 py-24 relative z-10 overflow-hidden">
      {/* Background cyber grid patterns & ambient glows */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-mint/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-[600px] h-[350px] rounded-full bg-peach/5 blur-[160px] pointer-events-none" />

      {/* Coordinate system backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* UPPER FOOTER GRID: Bento Diagnostics Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16" id="footer-upper-bento">
          
          {/* Brand & Live Telemetry Panel (Column A - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 bg-black border border-white/8 rounded-3xl relative overflow-hidden group">
            {/* Mesh Coordinate corner marking */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <Compass className="w-3.5 h-3.5 text-peach" />
              <span>TERMINAL_IDENTIFIER // GRID_A01</span>
            </div>

            <div className="absolute top-4 right-4 font-mono text-[8px] text-mint uppercase tracking-widest select-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-ping" />
              STATUS: SEC_STREAM
            </div>

            <div className="pt-8">
              {/* Animated Logo */}
              <button
                onClick={() => onNavigate("home")}
                className="flex items-center cursor-pointer text-left focus:outline-none mb-4 group transition-opacity hover:opacity-90"
              >
                <img
                  src="/logo.svg"
                  alt="Zor-Lix"
                  className="h-10 sm:h-12 w-auto object-contain object-left"
                />
              </button>

              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mt-3">
                Pre-processing high-throughput database clusters & executing sub-millisecond anomaly detection using secure, client-isolated cryptographic telemetry networks.
              </p>
            </div>

            {/* Simulated Live Console Widget Inside the Brand Block */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block select-none">
                LOCAL HANDSHAKE DECRYPT DIAGNOSIS
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {diagnosticsOptions.map((opt) => {
                  const isActive = activeDiagnostic === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setActiveDiagnostic(opt.key)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer select-none ${
                        isActive 
                          ? "bg-[#0b0b0b] border-peach shadow-[0_4px_12px_rgba(255,175,135,0.05)]" 
                          : "bg-[#050505] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="font-mono text-[7px] text-gray-500 block uppercase">{opt.label}</span>
                      <span className={`font-sans text-[10px] font-black mt-1 block truncate ${isActive ? "text-peach" : "text-white"}`}>
                        {opt.value}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Compartmentalized Link Directory (Column B - 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#030303]/40 border border-white/5 rounded-3xl p-7 relative overflow-hidden">
            {/* Grid background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff00_90%,#ffffff01_100%)] pointer-events-none" />
            <div className="absolute top-4 left-4 font-mono text-[8px] text-gray-500 uppercase select-none">
              ROUTE_MAPPERS // CLUSTER_DIRECTORY
            </div>

            {/* Platform column */}
            <div className="flex flex-col justify-between pt-8">
              <div>
                <span className="font-mono text-[9px] text-peach uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 select-none">
                  SYSTEM CORE
                </span>
                <ul className="flex flex-col gap-3.5">
                  {links.platform.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => onNavigate(link.id)}
                        className="group/link text-[11px] text-gray-400 hover:text-white transition-all duration-300 text-left cursor-pointer focus:outline-none"
                      >
                        <span className="font-sans font-extrabold block relative">
                          {link.name}
                        </span>
                        <span className="font-mono text-[7px] text-gray-500 uppercase block mt-0.5 group-hover/link:text-peach transition-colors">
                          {link.description}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources column */}
            <div className="flex flex-col justify-between pt-8">
              <div>
                <span className="font-mono text-[9px] text-mint uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 select-none">
                  SANDBOX RECON
                </span>
                <ul className="flex flex-col gap-3.5">
                  {links.resources.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => onNavigate(link.id)}
                        className="group/link text-[11px] text-gray-400 hover:text-white transition-all duration-300 text-left cursor-pointer focus:outline-none"
                      >
                        <span className="font-sans font-extrabold block relative">
                          {link.name}
                        </span>
                        <span className="font-mono text-[7px] text-gray-500 uppercase block mt-0.5 group-hover/link:text-mint transition-colors">
                          {link.description}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compliance column */}
            <div className="flex flex-col justify-between pt-8">
              <div>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 select-none">
                  COMPLIANCE VAULT
                </span>
                <ul className="flex flex-col gap-3.5">
                  {links.compliance.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => onNavigate(link.id)}
                        className="group/link text-[11px] text-gray-400 hover:text-white transition-all duration-300 text-left block w-full cursor-pointer focus:outline-none"
                      >
                        <span className="font-sans font-extrabold block relative">
                          {link.name}
                        </span>
                        <span className="font-mono text-[7px] text-gray-500 uppercase block mt-0.5 group-hover/link:text-white transition-colors">
                          {link.description}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* MID FOOTER ROW: Interactive Signal Beam and Rotating Social Nodes */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-6 bg-black border border-white/8 rounded-2.5xl gap-6 mb-12 select-none" id="footer-mid-beam-bar">
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-peach">
              <Network className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">GLOBAL TRANSMISSION SPEED</span>
              <p className="font-sans font-black text-sm text-white mt-1">
                {globalInferenceRate.toLocaleString()} transactional packets/sec active sync
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 justify-end">
            {/* Social Node Connectors */}
            <div className="grid grid-cols-4 gap-2.5 w-full sm:w-auto">
              {[
                { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
                { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                { label: "GitHub", icon: Github, href: "https://github.com" },
                { label: "Facebook", icon: Facebook, href: "https://facebook.com" }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#050505] hover:bg-black border border-white/5 hover:border-peach/50 rounded-xl text-gray-400 hover:text-peach flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Launch Signal Beam (Back to top) button */}
            <button
              onClick={handleScrollToTop}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-tr from-peach via-white to-mint text-black font-sans font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 hover:scale-[1.015] active:scale-[0.985] transition-all cursor-pointer box-border"
              id="back-to-top-launcher-btn"
            >
              <span>Transmit Signal Beam</span>
              <div className="p-1 rounded-full bg-black/10 text-black">
                <ArrowUp className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
            </button>
          </div>

        </div>

        {/* BOTTOM METRICS BAR (Legal and compliance signatures) */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-gray-500 font-mono gap-4 select-none">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Zor-Lix Intelligence Inc. All rights reserved. 
            </p>
            <span className="hidden sm:inline-block text-gray-700">|</span>
            <a href="https://zor-lix.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">
              zor-lix.com (secure domain)
            </a>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5E898] stroke-[2px]" />
            <span>Encrypted Ledger. Standard TLS 1.3 Secure</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
