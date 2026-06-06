import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Quote, 
  Star, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Cpu, 
  Database, 
  Check, 
  ArrowRight, 
  TrendingDown, 
  DollarSign, 
  Terminal as TermIcon,
  BadgeAlert
} from "lucide-react";

interface ReviewNode {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  metricLabel: string;
  metricVal: string;
  metricSub: string;
  latency: string;
  nodesMonitored: string;
  integritySeal: string;
  statsPct: number; // For rendering animated SVG performance level
  activeTelemetryData: { label: string; value: number; color: string }[];
  auditLogs: string[];
}

export default function Testimonials() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [systemUptime, setSystemUptime] = useState<number>(99.998);

  const reviews: ReviewNode[] = [
    {
      id: "snowflake",
      company: "Snowflake Systems",
      name: "Marcella Vance",
      role: "Lead Infrastructure Architect",
      quote: "Zor-Lix cut down our telemetry classification lag by almost 90% in two weeks of installation. Connecting our database cluster took minutes. We integrated its multi-tenant ledger with absolute ease.",
      avatar: "/testimonial_result.webp",
      rating: 5,
      metricLabel: "TELEMETRY LAG REDUCTION",
      metricVal: "90% Faster",
      metricSub: "From 1.2s to 12ms active processing speed",
      latency: "0.02ms latency",
      nodesMonitored: "14 Clusters Active",
      integritySeal: "ECDH-256 Verified Handshake",
      statsPct: 90,
      activeTelemetryData: [
        { label: "Handshake Speed", value: 98, color: "#FFAF87" },
        { label: "Data Quality Ratio", value: 95, color: "#C5E898" },
        { label: "Anomaly Detection Rate", value: 91, color: "#FFAF87" }
      ],
      auditLogs: [
        "SNOW_INIT: Initiated classification algorithms successfully.",
        "LAG_REPORT: Dropped from 1.2s down to 12ms telemetry parsing overhead.",
        "SEAL_OK: ECDH-256 Symmetric keys rotating perfectly."
      ]
    },
    {
      id: "stripe",
      company: "Stripe Operations",
      name: "Elias Kaelen",
      role: "Director of Technical Engineering",
      quote: "We connected Zor-Lix directly to our multi-tenant ledger nodes. Its automated cleaning pipeline automatically reconciles extreme database spikes and null events in under UTC milliseconds.",
      avatar: "/testimonial (2)_result.webp",
      rating: 5,
      metricLabel: "RECONCILIATION SPEEDUP",
      metricVal: "99.2% Sync",
      metricSub: "Sub-millisecond ledger reconciliation bounds",
      latency: "0.05ms latency",
      nodesMonitored: "128 Ledger Pools",
      integritySeal: "Kyber-768 Hardware Shielded",
      statsPct: 99,
      activeTelemetryData: [
        { label: "Handshake Speed", value: 99, color: "#C5E898" },
        { label: "Data Quality Ratio", value: 98, color: "#C5E898" },
        { label: "Anomaly Detection Rate", value: 97, color: "#FFAF87" }
      ],
      auditLogs: [
        "STRIPE_LEDGER: Multi-tenant connection established on port 3000.",
        "INTEGRATION_SYNC: Real-time anomaly filters isolated 14 extreme anomalies.",
        "SEAL_OK: Kyber-768 session keys validated successfully."
      ]
    },
    {
      id: "salesforce",
      company: "Salesforce Cloud",
      name: "Sienna Rodriguez",
      role: "VP of Enterprise Planning",
      quote: "Our operational reports and business metrics are entirely automated now. Zor-Lix models historical trends with impressive intervals. A game changer for cross-departmental alignment.",
      avatar: "/testimonial (3)_result.webp",
      rating: 5,
      metricLabel: "REPORT AUTOMATION SAVINGS",
      metricVal: "18h Saved/wk",
      metricSub: "Instant Slack operational briefs dispatch active trendlines",
      latency: "0.12ms latency",
      nodesMonitored: "30 Metric Engines",
      integritySeal: "AES-GCM-256 Locked Payload",
      statsPct: 84,
      activeTelemetryData: [
        { label: "Handshake Speed", value: 88, color: "#FFAF87" },
        { label: "Data Quality Ratio", value: 94, color: "#C5E898" },
        { label: "Anomaly Detection Rate", value: 89, color: "#FFAF87" }
      ],
      auditLogs: [
        "SF_SYNC: Core analytics pipeline integrated flawlessly.",
        "DISPATCHER: Dispatched 8 automatic Slack summaries to channel nodes.",
        "SEAL_OK: AES-GCM-256 session integrity verified safely."
      ]
    }
  ];

  // Soft fluctuate uptime value inside metrics sidebar
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemUptime(parseFloat((99.996 + Math.random() * 0.003).toFixed(5)));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentSelected = reviews[selectedIdx];

  return (
    <section 
      id="testimonials" 
      className="py-24 relative bg-black overflow-hidden border-t border-white/5"
    >
      {/* Background Soft Neon Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-peach/5 blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[550px] h-[550px] rounded-full bg-mint/5 blur-[140px] pointer-events-none" />

      {/* Grid Coordinates mapping backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_90%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full text-left">
        
        {/* Section Title Header */}
        <div className="max-w-3xl mb-16">
          <span 
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-peach text-2xs font-mono tracking-widest uppercase shadow-md select-none"
            id="endorsement-pill"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-peach animate-pulse" />
            <span>ENTERPRISE ENDORSEMENTS // VERIFIED PROOFS</span>
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white mt-6 mb-4" id="endorsements-title">
            The Decrypted Endorsement Matrix
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl" id="endorsements-desc">
            Review detailed case testimonials, verified hardware handshake speeds, and active telemetry improvement logs direct from global technology teams.
          </p>
        </div>

        {/* 12-Column Responsive Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="endorsements-bento-grid">
          
          {/* COLUMN A: Dynamic Left Rail of Client Node Instances (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-2">
              VERIFIED CLIENT NODE CONNECTORS
            </span>

            {reviews.map((rev, idx) => {
              const isSelected = selectedIdx === idx;
              const isHovered = hoveredIdx === idx;
              return (
                <button
                  key={rev.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer select-none ${
                    isSelected
                      ? "bg-gradient-to-tr from-[#111] to-black border-peach shadow-[0_10px_25px_rgba(255,175,135,0.08)] scale-[1.01]"
                      : "bg-[#050505] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className={`w-9 h-9 rounded-full object-cover border transition-transform duration-300 ${
                          isSelected ? "border-peach scale-105" : "border-white/10"
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      
                      <div>
                        <h4 className="font-sans font-black text-xs text-white leading-tight">
                          {rev.company}
                        </h4>
                        <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mt-0.5">
                          {rev.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase shrink-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-mint animate-ping" : "bg-gray-700"} shrink-0`} />
                      <span className={isSelected ? "text-mint font-bold" : "text-gray-500"}>
                        {isSelected ? "inspecting" : "online"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[9px] pt-2 border-t border-white/5 mt-1.5">
                    <span className="text-gray-500 uppercase">TELEMETRY_LAG:</span>
                    <span className={`font-bold ${isSelected ? "text-peach" : "text-white"}`}>
                      {rev.latency}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Simulated System Uptime Metrics Panel */}
            <div className="mt-2 bg-gradient-to-b from-[#080808] to-black border border-white/5 p-4.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-mono text-[8.5px] text-gray-500 block uppercase">CORE SYSTEM INTEGRITY LOG</span>
                <span className="text-xs font-sans font-black text-white mt-0.5 block">Zor-Lix Node Constellation</span>
              </div>
              
              <div className="text-right leading-none shrink-0">
                <span className="font-mono text-[8px] text-gray-500 uppercase block">AGGREGATE UPTIME</span>
                <span className="text-xs font-mono text-mint font-black mt-1.5 block">
                  {systemUptime}%
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN B: Massive Featured Core Endorsement Frame & Diagnostics (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 bg-black border border-white/10 rounded-3xl relative overflow-hidden min-h-[480px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />

            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.02] stroke-[1px] pointer-events-none" />

            <div>
              {/* Header inside bento view: Rating and metadata details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 gap-3 select-none">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-peach/10 rounded-xl text-peach">
                    <Star className="w-5 h-5 fill-peach stroke-none" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xs text-white uppercase tracking-widest leading-none">
                      VERIFIED CASE STUDY REPORT
                    </h3>
                    <span className="font-mono text-[9px] text-gray-500 uppercase mt-1 block">
                      Assigned cryptographic validator profile
                    </span>
                  </div>
                </div>

                <div className="font-mono text-[9px] text-[#C5E898] bg-[#C5E898]/10 border border-[#C5E898]/20 px-3 py-1.5 rounded-xl block leading-none font-bold">
                  {currentSelected.integritySeal}
                </div>
              </div>

              {/* Animating Blockquote body text with huge quotes */}
              <div className="min-h-[120px] mb-8 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={selectedIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="text-white text-lg sm:text-xl font-sans font-light leading-relaxed tracking-tight"
                  >
                    "{currentSelected.quote}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Segmented layout of verified case performance comparison metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                
                {/* Visual SVG animated progress meter bar grid item */}
                <div className="bg-[#050505] p-4 rounded-xl border border-white/5 flex flex-col justify-between relative overflow-hidden select-none">
                  <div className="flex items-center justify-between font-mono text-[8px] text-gray-500 mb-2">
                    <span>{currentSelected.metricLabel}</span>
                    <span className="text-[#FFAF87] font-black">{currentSelected.statsPct}%</span>
                  </div>

                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${currentSelected.statsPct}%` }}
                      transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
                      className="h-full bg-peach"
                    />
                  </div>
                  
                  <span className="font-sans text-[11px] font-black text-white mt-2.5 block">
                    {currentSelected.metricVal}
                  </span>
                </div>

                {/* Nodes monitored card */}
                <div className="bg-[#050505] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="font-mono text-[8px] text-gray-500 uppercase block mb-1">MONITORED SCOPE</span>
                  <span className="text-sm font-sans font-black text-white block">
                    {currentSelected.nodesMonitored}
                  </span>
                  <span className="font-sans text-[10px] text-gray-500 mt-2 block leading-none">
                    Verified cluster nodes active
                  </span>
                </div>

                {/* Subheading operational statement */}
                <div className="bg-[#050505] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="font-mono text-[8px] text-gray-500 uppercase block mb-1">SETUP TRANSITION TIME</span>
                  <span className="text-sm font-sans font-black text-mint block">
                    {currentSelected.metricSub.split(" ")[0] || "Instant"} Handshake
                  </span>
                  <span className="font-sans text-[10px] text-gray-500 mt-2 block leading-none">
                    No downtime connection delay
                  </span>
                </div>

              </div>

              {/* Mini Interactive Diagnostics comparison list */}
              <div className="bg-[#050505] p-4.5 rounded-2xl border border-white/5 mb-6">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mb-3.5 select-none">
                  ACTIVE PIPELINE AUDIT COMPOSITIONS
                </span>

                <div className="grid sm:grid-cols-2 gap-4 items-stretch">
                  {/* Left Column: Metric scores */}
                  <div className="flex flex-col gap-2">
                    {currentSelected.activeTelemetryData.map((tel, tIdx) => (
                      <div key={tIdx} className="flex items-center justify-between text-xs font-mono select-none">
                        <span className="text-gray-400 capitalize">{tel.label}:</span>
                        <span className="font-bold font-sans" style={{ color: tel.color }}>
                          {tel.value}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Live Audit Logs */}
                  <div className="p-3 bg-black border border-white/5 rounded-xl font-mono text-[9.5px] text-gray-400 text-left min-h-[75px] max-h-[90px] overflow-y-auto w-full select-text">
                    {currentSelected.auditLogs.map((log, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-1 leading-normal select-none">
                        <span className="text-peach font-black">{">"}</span>
                        <p className={lIdx === 2 ? "text-mint font-semibold" : ""}>{log}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Author Profile and verification details footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-4">
                <img
                  src={currentSelected.avatar}
                  alt={currentSelected.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-peach/20 shrink-0 select-none"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-sans font-black text-white text-base leading-none">
                    {currentSelected.name}
                  </h4>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mt-2">
                    {currentSelected.role} at <span className="text-peach font-bold">{currentSelected.company}</span>
                  </span>
                </div>
              </div>

              <div className="font-mono text-[8.5px] text-gray-600 uppercase tracking-widest flex items-center gap-2 select-none">
                <Check className="w-4 h-4 text-mint stroke-[3px]" />
                <span>ALL COMPLIANCE SECURED</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
