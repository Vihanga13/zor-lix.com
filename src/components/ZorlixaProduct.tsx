import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Terminal as TermIcon, 
  Activity, 
  RefreshCw, 
  ArrowLeft, 
  ChevronRight, 
  Coins, 
  Zap, 
  Radio, 
  Binary, 
  Database, 
  Server, 
  Network, 
  Sparkles, 
  TrendingUp, 
  Wrench,
  Flame,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ZorlixaProductProps {
  onBackToLanding: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function ZorlixaProduct({ onBackToLanding, onNavigate }: ZorlixaProductProps) {
  // Telemetry Controls State
  const [compressionRatio, setCompressionRatio] = useState<number>(4.2);
  const [threadCount, setThreadCount] = useState<number>(64);
  const [targetCluster, setTargetCluster] = useState<"snowflake" | "bigquery" | "postgres" | "s3">("snowflake");
  const [engineStability, setEngineStability] = useState<number>(99.98);
  const [consensusHash, setConsensusHash] = useState<string>("ZOR_ECDSA_12A9");

  // Performance Comparison State
  const [activeMetric, setActiveMetric] = useState<"latency" | "overhead" | "egress">("latency");

  // Deploy Configurator State
  const [selectedTier, setSelectedTier] = useState<"developer" | "scale" | "enterprise">("scale");
  const [securityLevel, setSecurityLevel] = useState<"aes" | "e2ee" | "quantum">("e2ee");
  const [selectedAddons, setSelectedAddons] = useState({
    slackFeeder: true,
    pdfBriefing: false,
    sqlAgent: true
  });

  // Ticker telemetry
  const [sysTick, setSysTick] = useState<string>("0.024ms");
  useEffect(() => {
    const timer = setInterval(() => {
      setSysTick(`${(0.021 + Math.random() * 0.015).toFixed(3)}ms`);
      // Update a slice of signature hash
      setConsensusHash(`ZOR_ECDSA_${Math.floor(Math.random() * 9000 + 1000).toString(16).toUpperCase()}`);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Performance metric values
  const metricsData = {
    latency: {
      title: "Query Latency (ms)",
      desc: "Time taken to compile and execute complex SQL mutations over 10M rows.",
      zorlixa: 0.034,
      competitorA: 4.82,
      competitorB: 12.45
    },
    overhead: {
      title: "Scrubbing Overhead (%)",
      desc: "CPU cycle utilization penalty during contextual AI denoising and duplicate scrubbing.",
      zorlixa: 1.2,
      competitorA: 8.5,
      competitorB: 16.4
    },
    egress: {
      title: "API Egress Penalty",
      desc: "Normalized payload footprint in bytes per transaction pipeline dispatch.",
      zorlixa: 0.18,
      competitorA: 1.24,
      competitorB: 2.89
    }
  };

  // Estimator Calculations
  const calculateCost = () => {
    let base = 0;
    if (selectedTier === "developer") base = 49;
    if (selectedTier === "scale") base = 249;
    if (selectedTier === "enterprise") base = 899;

    let secMultiplier = 1;
    if (securityLevel === "e2ee") secMultiplier = 1.2;
    if (securityLevel === "quantum") secMultiplier = 1.5;

    let addonsCost = 0;
    if (selectedAddons.slackFeeder) addonsCost += 29;
    if (selectedAddons.pdfBriefing) addonsCost += 49;
    if (selectedAddons.sqlAgent) addonsCost += 119;

    return Math.round(base * secMultiplier + addonsCost);
  };

  const calculateThroughput = () => {
    // throughput depends on compression & threads
    const baseThroughput = 4.2; // k rows/sec
    return (baseThroughput * (compressionRatio * 0.7) * (threadCount / 16)).toFixed(1);
  };

  const calculateNodeTemp = () => {
    return (32 + (threadCount * 0.18) + (compressionRatio * 1.1)).toFixed(1);
  };

  return (
    <div id="zorlixa-product-root" className="min-h-screen bg-[#010101] text-gray-200 pt-28 pb-20 relative overflow-hidden">
      {/* Immersive background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FFAF87]/6 blur-[150px] pointer-events-none animated-glow-1" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#C5E898]/5 blur-[150px] pointer-events-none animated-glow-2" />

      {/* Coordinate Telemetry lines */}
      <div className="absolute top-4 left-6 font-mono text-[8px] text-gray-600 uppercase tracking-[0.25em] hidden sm:flex items-center gap-1.5 select-none">
        <Radio className="w-3.5 h-3.5 text-peach animate-pulse" />
        <span>ZORLIXA_ENVELOPE // DEPLOYED_STAGE: PRODUCT_NODE // PORT_80</span>
      </div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* ===================== SECTION HEADER (NAVIGATION BAR) ===================== */}
        <div id="zorlixa-header-action" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 border-b border-white/5 pb-8">
          <button
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/8 hover:border-peach bg-black text-xs font-sans font-extrabold uppercase tracking-wider text-gray-300 hover:text-peach cursor-pointer transition-all w-fit shadow-md hover:shadow-peach/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Core Platform</span>
          </button>

          <div className="flex items-center gap-4 bg-[#090909] border border-white/5 px-5 py-2.5 rounded-2xl select-none">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">CALIB_LATENCY:</span>
            <span className="font-mono text-[10px] font-bold text-mint">{sysTick}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-ping" />
          </div>
        </div>

        {/* ===================== HERO SECTION ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 text-left">
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#FFAF87] bg-[#141414] border border-white/10 px-4 py-2 rounded-full select-none inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FFAF87]" />
              ZORLIXA DECISION ENGINE
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white mb-6 leading-none uppercase">
              Intelligence At <br />
              <span className="bg-gradient-to-r from-peach via-white to-mint WebkitBackgroundClip:text WebkitTextFillColor:transparent background-clip:text text-transparent">
                Sub-Millisecond
              </span> Speed
            </h1>
            <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Zorlixa is the premier autonomous engine within the Zor-Lix system. It continuously compresses high-throughput transactional telemetry, cleans metric noise via real-time statistical filters, and enables natural language AI agent interactions over multi-tenant database clusters instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById("zorlixa-configurator");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-xl font-sans font-extrabold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-peach to-mint hover:opacity-95 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg shadow-peach/20"
              >
                Configure Deployment
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById("zorlixa-telemetry");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-xl font-sans font-extrabold text-xs uppercase tracking-wider text-gray-300 border border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                Live Demo Sandbox
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Abstract Sphere */}
            <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/5 relative bg-black/40 flex items-center justify-center overflow-hidden glassmorphism">
              {/* Rotating inner rings */}
              <div className="absolute inset-4 rounded-full border border-dashed border-[#FFAF87]/20 animate-spin-slow" />
              <div className="absolute inset-10 rounded-full border border-dashed border-[#C5E898]/20 animate-spin-reverse" />
              
              {/* Central glowing core */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-peach/30 to-mint/20 filter blur-xl animate-pulse" />
              <Cpu className="w-16 h-16 text-white relative z-10 animate-pulse" />

              {/* Orbital badges floating */}
              <div className="absolute top-12 left-12 px-3 py-1 bg-black border border-white/10 rounded-lg font-mono text-[8px] text-gray-400">
                THREAD_BUS: SECURE
              </div>
              <div className="absolute bottom-16 right-8 px-3 py-1 bg-black border border-white/10 rounded-lg font-mono text-[8px] text-gray-400">
                AES-256-GCM
              </div>
            </div>
            
            {/* Glowing lines crossing back */}
            <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#FFAF87]/10 to-transparent rotate-[35deg] pointer-events-none" />
            <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#C5E898]/10 to-transparent rotate-[-35deg] pointer-events-none" />
          </div>
        </div>

        {/* ===================== SECTION 1: INTERACTIVE TELEMETRY SANDBOX ===================== */}
        <div id="zorlixa-telemetry" className="mb-20">
          <div className="max-w-3xl mb-12 text-left">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-mint">// SIMULATION TERMINAL</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white mt-2">
              Live Telemetry Simulator
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed mt-4">
              Directly manipulate the core parameters of the Zorlixa computational reactor. Adjust thread concurrency and dynamic data squeezing rates to see the immediate effect on overall node metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left controls panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#070707] border border-white/8 rounded-[28px] p-6 sm:p-8 relative overflow-hidden text-left glassmorphism">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px)] bg-[size:2rem] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                  <Wrench className="w-4 h-4 text-peach" />
                  <span className="font-mono text-[9px] uppercase font-bold text-gray-500 tracking-widest">
                    REACTOR_KNOBS // MATRIX_v3.9
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Slider 1: Compression Ratio */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Activity className="w-3.5 h-3.5 text-peach" /> DATA COMPRESSION RATE:
                      </span>
                      <span className="text-peach font-extrabold">{compressionRatio.toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range"
                      min="1.0"
                      max="16.0"
                      step="0.2"
                      value={compressionRatio}
                      onChange={(e) => setCompressionRatio(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-peach rounded-full cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[7px] text-gray-500 font-mono">
                      <span>1.0x (RAW BYTES)</span>
                      <span>8.0x (BALANCED)</span>
                      <span>16.0x (ULTRA COMPRESSED)</span>
                    </div>
                  </div>

                  {/* Slider 2: Thread Concurrency */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Cpu className="w-3.5 h-3.5 text-mint" /> THREAD CONCURRENCY:
                      </span>
                      <span className="text-mint font-extrabold">{threadCount} THREADS</span>
                    </div>
                    <input 
                      type="range"
                      min="8"
                      max="256"
                      step="8"
                      value={threadCount}
                      onChange={(e) => setThreadCount(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-mint rounded-full cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[7px] text-gray-500 font-mono">
                      <span>8 WORKERS</span>
                      <span>128 BALANCED</span>
                      <span>256 MAX LOAD</span>
                    </div>
                  </div>

                  {/* Database targets selectors */}
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-bold mb-1">
                      TARGET DATABASE STAGING TARGET:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "snowflake", name: "Snowflake", icon: Database },
                        { id: "bigquery", name: "BigQuery", icon: Server },
                        { id: "postgres", name: "PostgreSQL", icon: Network },
                        { id: "s3", name: "Amazon S3", icon: Binary }
                      ].map((db) => {
                        const Icon = db.icon;
                        const isSelected = targetCluster === db.id;
                        return (
                          <button
                            key={db.id}
                            onClick={() => setTargetCluster(db.id as any)}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-left cursor-pointer transition-all font-mono text-[10px] ${
                              isSelected 
                                ? "bg-peach border-peach text-black font-extrabold shadow-md" 
                                : "bg-black/50 border-white/5 text-gray-400 hover:border-white/10"
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-gray-500"}`} />
                            <span>{db.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-8 font-mono text-[8px] text-gray-500 text-center uppercase tracking-wider">
                [ Sliders dynamically recalculate reactor output live ]
              </div>
            </div>

            {/* Right metrics panel (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-black border border-white/10 rounded-[28px] p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 w-full text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-mint animate-pulse" />
                    <span className="font-mono text-[9px] uppercase font-bold text-gray-400 tracking-widest">
                      REACTOR_OUTPUTS // CORE_METERS
                    </span>
                  </div>
                  <div className="font-mono text-[8px] text-gray-500 uppercase">
                    CONSENSUS_SEED: <span className="text-white font-extrabold">{consensusHash}</span>
                  </div>
                </div>

                {/* Primary Metric: Throughput Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  
                  {/* Metric Box 1 */}
                  <div className="p-5 rounded-2xl bg-[#050505] border border-white/5 relative overflow-hidden flex flex-col justify-between h-[110px]">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">CALCULATED_THROUGHPUT</span>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white glow-peach mt-1">
                      {calculateThroughput()} <span className="text-xs text-[#FFAF87]">k/sec</span>
                    </div>
                    <div className="font-mono text-[7.5px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#FFAF87]" /> Ingestion frequency factor
                    </div>
                  </div>

                  {/* Metric Box 2 */}
                  <div className="p-5 rounded-2xl bg-[#050505] border border-white/5 relative overflow-hidden flex flex-col justify-between h-[110px]">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">CORE_TEMPERATURE</span>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white glow-mint mt-1 flex items-center gap-1.5">
                      {calculateNodeTemp()} <span className="text-xs text-[#C5E898]">°C</span>
                      {Number(calculateNodeTemp()) > 65 && <Flame className="w-5 h-5 text-red-400 animate-pulse" />}
                    </div>
                    <div className="font-mono text-[7.5px] text-gray-500 uppercase tracking-widest">
                      Node thermal index stability
                    </div>
                  </div>
                </div>

                {/* Second Row Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  
                  <div className="p-4.5 rounded-2xl bg-[#050505] border border-white/5 text-left">
                    <span className="font-mono text-[7px] text-gray-500 uppercase block">INTEGRITY_INDEX</span>
                    <div className="text-sm font-sans font-black text-[#C5E898] mt-1.5">99.982%</div>
                  </div>

                  <div className="p-4.5 rounded-2xl bg-[#050505] border border-white/5 text-left">
                    <span className="font-mono text-[7px] text-gray-500 uppercase block">PACKET_MUT_PENALTY</span>
                    <div className="text-sm font-sans font-black text-white mt-1.5">
                      {(threadCount > 120 ? (threadCount - 120) * 0.0024 : 0).toFixed(4)}%
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-4.5 rounded-2xl bg-[#050505] border border-white/5 text-left">
                    <span className="font-mono text-[7px] text-gray-500 uppercase block">ISOLATION_CLASS</span>
                    <div className="text-sm font-sans font-black text-white mt-1.5 uppercase">Level 4 Sandbox</div>
                  </div>

                </div>

                {/* Progress bar simulation detailing memory density */}
                <div className="p-4 rounded-2xl bg-[#050505] border border-white/5">
                  <div className="flex justify-between font-mono text-[8px] text-gray-400 mb-1.5 uppercase">
                    <span>SQUEEZE PACKET MEMORY INGEST DENSITY:</span>
                    <span className="text-white font-extrabold">{(compressionRatio * 6.25).toFixed(1)}% Comp</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="bg-gradient-to-r from-peach to-mint h-full"
                      animate={{ width: `${compressionRatio * 6.25}%` }}
                      transition={{ type: "spring", stiffness: 90 }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ===================== SECTION 2: PERFORMANCE METRIC VIEWS ===================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12 text-left">
            <span className="font-mono text-[9px] text-[#FFAF87] font-bold uppercase tracking-widest">// HARDWARE BENCHMARKS</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white mt-2">
              Performance Indicators
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed mt-4">
              Select key latency, CPU overhead, or payload metrics to visually compare the optimized Zorlixa system engine against legacy architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="zorlixa-benchmarks">
            {/* Left buttons selection list (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {[
                { id: "latency", label: "Query Latency Speed", desc: "Compile and execute speeds under high mutations." },
                { id: "overhead", label: "Scrubbing CPU Penalty", desc: "Core cycle utilization during AI cleaning." },
                { id: "egress", label: "Payload Egress Size", desc: "Footprint of pipeline dispatches in bytes." }
              ].map((m) => {
                const isActive = activeMetric === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveMetric(m.id as any)}
                    className={`flex flex-col text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive 
                        ? "bg-[#0a0a0a] border-peach shadow-[0_4px_20px_rgba(255,175,135,0.05)] scale-[1.01]" 
                        : "bg-transparent border-white/5 hover:border-white/10 hover:bg-[#040404]"
                    }`}
                  >
                    <span className={`font-sans font-black text-sm ${isActive ? "text-peach" : "text-gray-300"}`}>
                      {m.label}
                    </span>
                    <span className="text-[11px] text-gray-500 font-light mt-1.5">
                      {m.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right chart visualizer (8 cols) */}
            <div className="lg:col-span-8 bg-black border border-white/10 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
              
              <div className="relative z-10 w-full text-left flex-1 flex flex-col justify-between">
                <div className="mb-8">
                  <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block">BENCHMARK_VARIABLE:</span>
                  <h4 className="text-lg font-sans font-black text-white mt-1 uppercase tracking-wide">
                    {metricsData[activeMetric].title}
                  </h4>
                  <p className="text-xs text-gray-400 font-light mt-1 max-w-xl">
                    {metricsData[activeMetric].desc}
                  </p>
                </div>

                {/* Animated Bars */}
                <div className="flex flex-col gap-6 w-full select-none mb-4">
                  
                  {/* Bar 1: Zorlixa */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between font-mono text-[9px] text-mint uppercase font-bold">
                      <span>Zorlixa engine (Optimized)</span>
                      <span>{metricsData[activeMetric].zorlixa} {activeMetric === "latency" ? "ms" : activeMetric === "overhead" ? "% CPU" : "MB"}</span>
                    </div>
                    <div className="h-5 w-full bg-white/5 rounded-lg overflow-hidden border border-white/5 p-0.5">
                      <motion.div 
                        className="bg-gradient-to-r from-mint to-[#C5E898]/40 h-full rounded-md"
                        initial={{ width: 0 }}
                        animate={{ width: "8%" }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>

                  {/* Bar 2: Competitor A */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between font-mono text-[9px] text-gray-400 uppercase">
                      <span>Standard AI Pipeline</span>
                      <span>{metricsData[activeMetric].competitorA} {activeMetric === "latency" ? "ms" : activeMetric === "overhead" ? "% CPU" : "MB"}</span>
                    </div>
                    <div className="h-5 w-full bg-white/5 rounded-lg overflow-hidden border border-white/5 p-0.5">
                      <motion.div 
                        className="bg-peach/60 h-full rounded-md"
                        initial={{ width: 0 }}
                        animate={{ width: `${(metricsData[activeMetric].competitorA / metricsData[activeMetric].competitorB) * 90}%` }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>

                  {/* Bar 3: Competitor B */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between font-mono text-[9px] text-gray-500">
                      <span>Legacy ETL Architecture</span>
                      <span>{metricsData[activeMetric].competitorB} {activeMetric === "latency" ? "ms" : activeMetric === "overhead" ? "% CPU" : "MB"}</span>
                    </div>
                    <div className="h-5 w-full bg-white/5 rounded-lg overflow-hidden border border-white/5 p-0.5">
                      <motion.div 
                        className="bg-gray-600/40 h-full rounded-md"
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>

                </div>

                <div className="border-t border-white/5 pt-4 font-mono text-[7.5px] text-gray-500 uppercase tracking-widest flex items-center justify-between">
                  <span>TEST_CLUSTER: INTEL_XEON_8_CORES</span>
                  <span>CONFIDENCE BOUNDS: ±0.005 ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== SECTION 3: KEY PRODUCT FEATURES ===================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12 text-left">
            <span className="font-mono text-[9px] text-mint font-bold uppercase tracking-widest">// ARCHITECTURE CORE</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white mt-2">
              Engine Specifications
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed mt-4">
              Designed for extreme compliance benchmarks, fast execution boundaries, and zero-knowledge storage configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-[24px] bg-[#070707] border border-white/5 flex flex-col justify-between gap-4 group hover:border-[#FFAF87]/30 transition-all select-none">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-peach/10 rounded-xl border border-peach/20 text-[#FFAF87]">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="font-mono text-[8px] text-gray-500 uppercase">CLASS_01</span>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-white text-base tracking-tight mb-2">Zero-Knowledge Sandbox</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  All transactional memory matrices remain locally bound to user browser sessions. Payload configurations are isolated immediately.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-[24px] bg-[#070707] border border-white/5 flex flex-col justify-between gap-4 group hover:border-mint/30 transition-all select-none">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-mint/10 rounded-xl border border-mint/20 text-[#C5E898]">
                  <TermIcon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[8px] text-gray-500 uppercase">CLASS_02</span>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-white text-base tracking-tight mb-2">Autonomous SQL Compiler</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Translates standard conversational strings into highly complex SQL structures. Auto-analyzes query nodes to prevent vector loops.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-[24px] bg-[#070707] border border-white/5 flex flex-col justify-between gap-4 group hover:border-[#FFAF87]/30 transition-all select-none">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-peach/10 rounded-xl border border-peach/20 text-[#FFAF87]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[8px] text-gray-500 uppercase">CLASS_03</span>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-white text-base tracking-tight mb-2">Stochastic Predictions</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Built on high-density neural networks configured specifically for telemetry datasets. Provides predictions with confidence bounds down to ±1.5%.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ===================== SECTION 4: INTERACTIVE COST ESTIMATOR ===================== */}
        <div id="zorlixa-configurator" className="bg-[#050505] border border-white/10 rounded-[32px] p-6 sm:p-8 md:p-10 relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFAF87]/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#C5E898]/5 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Estimator details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="font-mono text-[9px] text-[#FFAF87] font-bold uppercase tracking-widest block mb-1">
                  SYS_DEPLOY_CALCULATOR // INTEGRITY BUILDER
                </span>
                <h3 className="text-3xl sm:text-4xl font-sans font-black text-white uppercase tracking-tight leading-none">
                  Calculate Deployment Scale
                </h3>
                <p className="text-gray-400 text-sm font-light mt-3 leading-relaxed max-w-xl">
                  Adjust target scaling limits, security structures, and active AI utility features to see a real-time deployment cost estimate.
                </p>
              </div>

              {/* Selector 1: Tier scale */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block font-bold">
                  01 // NODE SCALE TIER:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "developer", label: "Developer", price: "$49/mo" },
                    { id: "scale", label: "Scale Level", price: "$249/mo" },
                    { id: "enterprise", label: "Enterprise", price: "$899/mo" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTier(t.id as any)}
                      className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        selectedTier === t.id
                          ? "bg-peach border-peach text-black font-extrabold shadow-md"
                          : "bg-black/50 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      <span className="font-sans text-xs font-bold leading-none">{t.label}</span>
                      <span className="font-mono text-[8px] mt-1.5 opacity-80">{t.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Security level */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block font-bold">
                  02 // TRANSPORT ENCRYPT SYSTEM:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "aes", label: "AES-256 GCM", sub: "Standard Encryption" },
                    { id: "e2ee", label: "E2EE Consensus", sub: "Multi-party check" },
                    { id: "quantum", label: "Kyber Quantum", sub: "Quantum-resistant" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSecurityLevel(s.id as any)}
                      className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        securityLevel === s.id
                          ? "bg-mint border-mint text-black font-extrabold shadow-md"
                          : "bg-black/50 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      <span className="font-sans text-2xs font-bold leading-none">{s.label}</span>
                      <span className="font-mono text-[7px] mt-1.5 opacity-80">{s.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 3: Checkbox Add-ons */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block font-bold">
                  03 // COMPILER UTILITY UTILS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { key: "slackFeeder", label: "Slack Feeder", desc: "+$29/mo" },
                    { key: "pdfBriefing", label: "PDF Briefing", desc: "+$49/mo" },
                    { key: "sqlAgent", label: "Autonomous SQL", desc: "+$119/mo" }
                  ].map((item) => {
                    const isChecked = selectedAddons[item.key as keyof typeof selectedAddons];
                    return (
                      <button
                        key={item.key}
                        onClick={() => setSelectedAddons({
                          ...selectedAddons,
                          [item.key]: !isChecked
                        })}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-left transition-all ${
                          isChecked 
                            ? "bg-white/10 border-peach/50 text-[#FFAF87]" 
                            : "bg-black/50 border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <span className="font-sans text-xs font-semibold">{item.label}</span>
                        <span className="font-mono text-[9px] opacity-85">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Estimator display box (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-black border border-white/8 rounded-3xl p-6 sm:p-8 h-full min-h-[280px]">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 select-none">
                <span className="font-mono text-[9px] text-[#C5E898] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#C5E898]" /> ESTIMATED RATE:
                </span>
                <span className="font-mono text-[7px] text-gray-500 uppercase">SYS_ESTIMATE</span>
              </div>

              {/* Price output */}
              <div className="py-6 flex flex-col gap-1">
                <span className="font-sans text-[11px] text-gray-500 uppercase tracking-widest font-bold">Deployment cost:</span>
                <h4 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-white glow-peach flex items-baseline">
                  ${calculateCost()}
                  <span className="text-sm font-sans font-light text-gray-400 lowercase ml-1">/month</span>
                </h4>
              </div>

              {/* Estimated spec stack summaries */}
              <div className="flex flex-col gap-2.5 bg-[#050505] p-4 rounded-2xl border border-white/5 text-xs select-none">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Selected Tier:</span>
                  <strong className="text-white capitalize">{selectedTier}</strong>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Transport Encryption:</span>
                  <strong className="text-white uppercase">
                    {securityLevel === "aes" ? "AES-256" : securityLevel === "e2ee" ? "E2EE" : "Quantum"}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-gray-400 border-t border-white/5 pt-2 mt-1">
                  <span>Consensus latency:</span>
                  <strong className="text-[#C5E898]">0.02ms</strong>
                </div>
              </div>

              {/* Ingress CTA button */}
              <button 
                onClick={() => onNavigate("contact")}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-tr from-peach to-mint text-black font-sans font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>Initiate Core Deployment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
