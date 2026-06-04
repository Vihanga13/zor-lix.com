import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  Filter, 
  TrendingUp, 
  Sliders, 
  FileText, 
  Bot, 
  Cpu, 
  Activity, 
  Sparkles, 
  Check, 
  Terminal as TermIcon, 
  Info, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  ArrowRight,
  Eye,
  Server,
  Network
} from "lucide-react";

export default function Features() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Simulation states
  const [pingTarget, setPingTarget] = useState<"snowflake" | "postgres" | "stripe">("snowflake");
  const [denoiseThreshold, setDenoiseThreshold] = useState<number>(3.0);
  const [forecastHorizon, setForecastHorizon] = useState<"30d" | "60d" | "90d">("90d");
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [selectedPrompt, setSelectedPrompt] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [exportConfigs, setExportConfigs] = useState({
    slack: true,
    pdf: false,
    googleSheets: true
  });
  const [latencyTimer, setLatencyTimer] = useState<number>(0.04);
  const [waveOffset, setWaveOffset] = useState<number>(0);
  const [socketLogs, setSocketLogs] = useState<string[]>([]);
  const [reportProgress, setReportProgress] = useState<number | null>(null);
  const [successLogAlert, setSuccessLogAlert] = useState<string | null>(null);

  // Active database interactive cluster states
  const [dbStatus, setDbStatus] = useState({
    snowflake: "ONLINE",
    postgres: "ONLINE",
    stripe: "ONLINE"
  });

  // Oscilloscope math animation
  useEffect(() => {
    let frameId: number;
    const animateWave = () => {
      setWaveOffset((prev) => (prev + 0.12) % 360);
      frameId = requestAnimationFrame(animateWave);
    };
    frameId = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Latency micro wiggle simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLatencyTimer(parseFloat((0.032 + Math.random() * 0.012).toFixed(3)));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Fake logs feeder for websocket stream layer
  useEffect(() => {
    if (!isStreaming) return;
    const logsInterval = setInterval(() => {
      const operations = ["MUTATION_OK", "INDEX_STABLE", "INGEST_PACKET", "AES_VERIFIED"];
      const addresses = ["0xFA9A2B", "0x3C8E19", "0xF92A8E", "0xD1096B"];
      const randomOp = operations[Math.floor(Math.random() * operations.length)];
      const randomAdd = addresses[Math.floor(Math.random() * addresses.length)];
      const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
      const newLog = `[${timestamp}] ${randomOp} // ${randomAdd} (${(30 + Math.random() * 50).toFixed(0)} bytes)`;
      
      setSocketLogs((prev) => [newLog, ...prev.slice(0, 6)]);
    }, 900);
    return () => clearInterval(logsInterval);
  }, [isStreaming]);

  const listItems = [
    {
      num: "01",
      tag: "ESTABLISH CONNECTORS",
      title: "Automated Pipeline Collection",
      desc: "Establish permanent secure feeds into Snowflake database clusters, PostgreSQL instances, and transaction brokers. All schema shapes are auto-analyzed and stabilized instantly.",
      icon: Database,
      accent: "peach",
      stats: "45k streams sync",
      extra: "Uptime authenticated: 99.98%"
    },
    {
      num: "02",
      tag: "REFINE METRIC QUALITY",
      title: "Context-Aware AI Cleaning",
      desc: "Autonomously detects duplicate identifiers, standard deviation drift, and timing errors before writing metrics. Drops extreme outliers while preserving real transactional values.",
      icon: Filter,
      accent: "mint",
      stats: "Zero-latency repair",
      extra: "Sigma boundary trigger: 3.5x"
    },
    {
      num: "03",
      tag: "FORECAST OPPORTUNITIES",
      title: "Predictive Neural Horizons",
      desc: "Leverages proprietary Transformer modeling trained specifically on high-frequency enterprise telemetry. Lock in confidence prediction bounds down to ±1.5% in minutes.",
      icon: TrendingUp,
      accent: "peach",
      stats: "98.4% Confidence",
      extra: "Transformer Model V2 Armed"
    },
    {
      num: "04",
      tag: "REDUCE RE-POLLING",
      title: "Fluid WebSocket Stream",
      desc: "Say goodbye to traditional heavy database querying. Continuous updates are piped securely over active TLS socket networks directly to browser screens without thread locking.",
      icon: Sliders,
      accent: "mint",
      stats: "120 FPS render output",
      extra: "Zero background cycles"
    },
    {
      num: "05",
      tag: "DISTRIBUTE DIGESTS",
      title: "Automated Operational Reports",
      desc: "Formulate beautiful executive briefs and trend sheets that publish themselves. Autonomously dispatches rich status alerts straight to standard Slack, Notion, or Cloud storage pools.",
      icon: FileText,
      accent: "peach",
      stats: "1 Click Dispatch",
      extra: "S3, Slack & GSheet Ready"
    },
    {
      num: "06",
      tag: "AUTONOMOUS OPERATIONS",
      title: "Language-to-Query SQL Agents",
      desc: "Instruct Zor-Lix using direct conversational strings. Our autonomous SQL agent compiles dynamic complex queries, checks integrity thresholds, and alerts you to spikes.",
      icon: Bot,
      accent: "mint",
      stats: "Natural query parsed",
      extra: "AI Agent active parameters"
    }
  ];

  const agentPrompts = [
    {
      prompt: "Synthesize ARR metrics for snowflake clusters",
      sql: "SELECT DATE_TRUNC('month', created_at) AS month,\n       SUM(gross_amount) AS monthly_arr_sum\nFROM snowflake_ledger_prod\nWHERE status = 'active'\nGROUP BY 1\nORDER BY 1 DESC;"
    },
    {
      prompt: "Identify schema drift parameters within transaction table",
      sql: "SELECT attribute_key,\n       COUNT(*) AS mutation_count,\n       VAR_SAMP(attribute_bytes) AS entropy\nFROM staging_pipeline_registry\nGROUP BY attribute_key\nHAVING mutation_count > 0.05 * SUM(mutation_count);"
    },
    {
      prompt: "Extract anomalous high-frequency spike configurations",
      sql: "SELECT event_id, event_timestamp, telemetry_value\nFROM global_socket_ingress\nWHERE telemetry_value > (\n   AVG(telemetry_value) OVER() + 3.5 * STDDEV(telemetry_value) OVER()\n)\nORDER BY event_timestamp DESC;"
    }
  ];

  // Simulated Custom Query Submission
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setSuccessLogAlert("Autonomous SQL compiled successfully! Schema validated.");
      setTimeout(() => setSuccessLogAlert(null), 4000);
    }, 1500);
  };

  // Simulated Report Dispatch
  const handleDispatchReport = () => {
    setReportProgress(0);
    const interval = setInterval(() => {
      setReportProgress((p) => {
        if (p === null) return 0;
        if (p >= 100) {
          clearInterval(interval);
          setSuccessLogAlert("Report dispatched successfully to configured targets!");
          setTimeout(() => setSuccessLogAlert(null), 4000);
          return null;
        }
        return p + 20;
      });
    }, 200);
  };

  // Helper to generate dynamic morphing SVG wave path
  const getWavePath = (frequencyMultiplier: number, amplitudeMultiplier: number) => {
    const points: string[] = [];
    const width = 360;
    const height = 48;
    const midY = height / 2;

    for (let x = 0; x <= width; x += 3) {
      // Math formula creating dynamic oscillations
      const radians = (x / width) * Math.PI * 2 * frequencyMultiplier + waveOffset;
      const y = midY + Math.sin(radians) * 16 * amplitudeMultiplier;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <section id="features" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Cinematic ambient vector graphics background */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-peach/5 blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-mint/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Modern, Editorial-grade Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-peach bg-[#141414] border border-white/10 px-4 py-2 rounded-full select-none inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-peach animate-ping" />
            COMPUTATIONAL HORIZONS // DEEP SYSTEMS ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white mt-6 mb-6 leading-none">
            Deep-Stack Systems
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
            A highly visual modular circuit console. Select specialized slots of the telemetry bus to hot-swap systemic visualizers, analyze pipeline thresholds, and evaluate compiler algorithms.
          </p>
        </div>

        {/* Master 12-Column Grid Split */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch" id="deep-stack-modular-container">
          
          {/* LEFT 5-COLUMNS: Futuristic Modular Circuit Board Console */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#080808]/90 border border-white/10 rounded-[32px] p-6 sm:p-7 relative overflow-hidden select-none shadow-[2xl]">
            {/* Tech blueprints coordinate map backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-peach animate-spin-slow" />
                <span className="font-mono text-[9px] uppercase text-gray-500 tracking-widest block font-bold">
                  TELEMETRY_BUS_MATRIX // SYSTEMES v3.9
                </span>
              </div>
              <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                BUS_PIN: <span className="font-sans font-extrabold text-mint">{latencyTimer}ms</span>
              </div>
            </div>

            {/* Dynamic CSS Wiring Pipeline Flow - animated SVG wires with traveling packages */}
            <div className="absolute left-[36px] top-[74px] bottom-[30px] w-[2px] bg-white/5 pointer-events-none block z-0">
              {/* Pulsing indicator traveling along active wire */}
              <motion.div 
                className="absolute w-[6px] h-[34px] left-[-2px] rounded-full bg-gradient-to-b from-[#FFAF87] via-[#C5E898] to-transparent shadow-[0_0_12px_rgba(255,175,135,0.8)]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Circuit rack node slots */}
            <div className="flex flex-col gap-3.5 relative z-10 w-full">
              {listItems.map((item, idx) => {
                const IconComp = item.icon;
                const isSelected = selectedIdx === idx;
                const isHovered = hoveredIdx === idx;
                const accentHex = item.accent === "peach" ? "text-peach" : "text-mint";
                const borderHex = item.accent === "peach" ? "group-hover:border-[#FFAF87]/40" : "group-hover:border-[#C5E898]/40";
                
                return (
                  <button
                    key={idx}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 relative group cursor-pointer flex items-center justify-between overflow-hidden ${
                      isSelected 
                        ? "bg-[#101010] border-white/20 shadow-[0_12px_32px_rgba(255,175,135,0.06)] scale-[1.01]"
                        : "bg-transparent border-white/5 hover:bg-[#0c0c0c]"
                    }`}
                  >
                    {/* Active highlight background glow */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
                    )}

                    {/* Circuit module connectivity indicator ribbon */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-300 ${
                        isSelected 
                          ? item.accent === "peach" ? "bg-peach shadow-[0_0_12px_#FFAF87]" : "bg-mint shadow-[0_0_12px_#C5E898]"
                          : isHovered 
                          ? item.accent === "peach" ? "bg-peach/50" : "bg-mint/50"
                          : "bg-transparent"
                      }`}
                    />

                    {/* Left node content block */}
                    <div className="flex items-center gap-4 pl-2">
                      <div className={`p-2.5 rounded-xl border transition-all duration-300 z-10 ${
                        isSelected 
                          ? "bg-white/5 border-white/10" 
                          : "bg-[#0b0b0b] border-white/5 group-hover:border-white/10"
                      }`}>
                        <IconComp 
                          className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${
                            isSelected || isHovered ? (item.accent === "peach" ? "text-peach" : "text-mint") : "text-gray-500"
                          }`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[8px] text-gray-500 tracking-wider">STAGE_{item.num}</span>
                          <span className="font-mono text-[8.5px] text-gray-600 block">//</span>
                          <span className={`font-mono text-[8.5px] uppercase font-bold tracking-widest ${
                            item.accent === "peach" ? "text-peach" : "text-mint"
                          }`}>
                            {item.tag.split(" ")[0]}
                          </span>
                        </div>
                        <h4 className="font-sans font-extrabold text-white text-sm sm:text-base tracking-tight leading-normal mt-1">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    {/* Diagnostic Quick-Meter indicators */}
                    <div className="hidden sm:flex flex-col items-end text-right justify-center pr-1 select-none">
                      <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">MUT_INDEX</span>
                      <span className="font-sans font-black text-white text-xs mt-0.5 tracking-tighter">
                        {item.stats.split(" ")[0]}
                      </span>
                    </div>

                  </button>
                );
              })}
            </div>

            {/* Instruction bus bar */}
            <div className="mt-6 pt-4 border-t border-white/5 relative z-10 text-center">
              <span className="font-mono text-[8.5px] text-gray-500 uppercase tracking-widest block">
                [ INTERACTIVE MODULE SLOT DETECTED. SELECT NODES ABOVE TO CALIBRATE COMMAND INTERFACES ]
              </span>
            </div>
          </div>

          {/* RIGHT 7-COLUMNS: The Cybernetic Test Hangar & Visualizer Console */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-black border border-white/10 rounded-[32px] p-6 sm:p-8 relative overflow-hidden" id="diagnostics-hangar-core">
            <div className="absolute top-0 right-0 w-40 h-40 bg-peach/5 blur-[50px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-mint/5 blur-[50px] pointer-events-none" />

            {/* Diagnostics screen header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4 select-none">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-peach animate-ping shrink-0" />
                <div>
                  <h3 className="font-sans font-black text-sm text-white flex items-center gap-1.5 tracking-wider leading-none uppercase">
                    DIAGNOSTICS & HARDWARE HANGAR
                    <Sparkles className="w-3.5 h-3.5 text-peach" />
                  </h3>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1 block">
                    ACTIVE SEGMENT: <span className="text-white font-extrabold">{listItems[selectedIdx].num} // {listItems[selectedIdx].tag}</span>
                  </span>
                </div>
              </div>

              {/* Dynamic OSCILLOSCOPE Signal Vector Display */}
              <div className="bg-[#050505] border border-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 h-[44px] min-w-[200px] relative overflow-hidden">
                <div className="absolute left-3 top-1 font-mono text-[7px] text-gray-600 block uppercase tracking-widest">
                  SYS_WAVE_O7
                </div>
                
                {/* SVG Oscilloscope rendered in real-time */}
                <svg className="w-full h-[28px] stroke-peach/40 overflow-visible mt-2" viewBox="0 0 360 48" preserveAspectRatio="none">
                  {/* Outer glowing path */}
                  <path 
                    d={getWavePath(
                      selectedIdx === 0 ? 3.5 : selectedIdx === 1 ? 5.5 : selectedIdx === 2 ? 2.0 : selectedIdx === 3 ? 8.0 : selectedIdx === 4 ? 4.0 : 6.0,
                      selectedIdx === 0 ? 0.7 : selectedIdx === 1 ? 1.4 : selectedIdx === 2 ? 0.5 : selectedIdx === 3 ? 1.8 : selectedIdx === 4 ? 0.9 : 1.2
                    )} 
                    fill="none" 
                    stroke={listItems[selectedIdx].accent === "peach" ? "#FFAF87" : "#C5E898"} 
                    strokeWidth="1.5" 
                    className="transition-colors duration-500"
                  />
                </svg>
              </div>
            </div>

            {/* MAIN COMPACT SANDBOX VIEWPORT CONTAINER */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 mb-6 min-h-[260px] flex flex-col justify-between relative shadow-inner">
              <div className="absolute top-3.5 right-4 font-mono text-[7.5px] text-gray-600 tracking-wider block uppercase select-none font-bold">
                COMMAND_INTERFACE_VIEWPORT
              </div>

              <div className="relative z-10 w-full h-full flex flex-col justify-center">
                
                {/* LAYER 01 SIMULATOR: Automated Database Pipeline Selector */}
                {selectedIdx === 0 && (
                  <div className="flex flex-col gap-4 animate-fade-in text-left">
                    <span className="font-mono text-[9px] text-[#FFAF87] font-bold uppercase tracking-widest block">
                      [ CONNECTOR HARDWARE SELECTOR ]
                    </span>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {(["snowflake", "postgres", "stripe"] as const).map((source) => (
                        <button
                          key={source}
                          onClick={() => setPingTarget(source)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-[10px] uppercase flex flex-col items-center justify-between gap-1 ${
                            pingTarget === source
                              ? "bg-peach text-black border-peach font-extrabold shadow-[0_4px_16px_rgba(255,175,135,0.15)] scale-[1.01]"
                              : "bg-[#090909] border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <span className="font-bold">{source}</span>
                          <span className={`text-[7px] px-1 py-0.5 rounded ${
                            pingTarget === source ? "bg-black/10 text-black" : "bg-white/5 text-gray-500"
                          }`}>
                            {dbStatus[source]}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/10 bg-black text-left">
                      <span className="font-mono text-[8px] text-gray-500 block uppercase font-bold tracking-wider mb-1.5">
                        AUTONOMOUS HANDSHAKE DIAGNOSTICS:
                      </span>
                      <p className="font-sans text-xs text-gray-300 leading-relaxed block">
                        Direct connection to <strong className="text-white font-extrabold capitalize">{pingTarget}</strong> cluster certified under locked TLS crypto protocols. Multi-partition synchronization active. Ingress packet frequency is continuously checked against regional stability.
                      </p>
                    </div>
                  </div>
                )}

                {/* LAYER 02 SIMULATOR: Context-Aware AI Cleaning - Interactive Scatterplot outlier scrubbing */}
                {selectedIdx === 1 && (
                  <div className="flex flex-col gap-4 animate-fade-in text-left">
                    <span className="font-mono text-[9px] text-[#C5E898] font-bold uppercase tracking-widest block">
                      [ CONTEXT-AWARE AI NOISE CLEANING MATRIX ]
                    </span>

                    {/* Outlier particles map representing outlier data being filtered */}
                    <div className="h-[90px] border border-white/5 rounded-xl bg-black relative overflow-hidden p-2">
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                      
                      {/* Fake scatter points */}
                      {[
                        { x: 20, y: 30, isNoise: false },
                        { x: 45, y: 65, isNoise: false },
                        { x: 75, y: 15, isNoise: false },
                        { x: 120, y: 55, isNoise: false },
                        { x: 180, y: 40, isNoise: false },
                        { x: 220, y: 70, isNoise: false },
                        // Outliers
                        { x: 90, y: 85, isNoise: true, sigma: 2.0 },
                        { x: 140, y: 15, isNoise: true, sigma: 2.2 },
                        { x: 290, y: 10, isNoise: true, sigma: 4.5 },
                        { x: 310, y: 80, isNoise: true, sigma: 3.8 },
                        { x: 60, y: 10, isNoise: true, sigma: 1.5 }
                      ].map((pt, i) => {
                        const isFiltered = pt.isNoise && (pt.sigma || 0) < denoiseThreshold;
                        return (
                          <motion.div
                            key={i}
                            className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              pt.isNoise 
                                ? isFiltered 
                                  ? "bg-red-500/20 shadow-none border border-red-500/10 line-through scale-75" 
                                  : "bg-red-400 shadow-[0_0_8px_red]"
                                : "bg-mint shadow-[0_0_8px_#C5E898]"
                            }`}
                            style={{ left: pt.x, top: pt.y }}
                            animate={{ opacity: isFiltered ? 0.2 : 1 }}
                          />
                        );
                      })}

                      <div className="absolute bottom-2 left-2 font-mono text-[7px] text-gray-500">
                        [ MINT = STABLE METRICS  /  RED = DETECTED ANOMALOUS OUTLIERS ]
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black border border-white/5 text-left">
                      <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mb-2 font-bold">
                        <span>SIGMA ANOMALY THRESHOLD KNOB:</span>
                        <span className="text-mint font-extrabold">{denoiseThreshold.toFixed(1)}σ</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="5.0"
                        step="0.5"
                        value={denoiseThreshold}
                        onChange={(e) => setDenoiseThreshold(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 accent-mint rounded-full cursor-pointer"
                      />
                      <div className="flex items-center justify-between text-[7.5px] text-gray-500 font-mono mt-1 w-full uppercase">
                        <span>1.0σ (AGGRESSIVE PURGE)</span>
                        <span>3.0σ (BALANCED)</span>
                        <span>5.0σ (MINIMAL REMOVAL)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAYER 03 SIMULATOR: Predictive Neural Horizons (Confidence projection sandbox) */}
                {selectedIdx === 2 && (
                  <div className="flex flex-col gap-4 animate-fade-in text-left">
                    <span className="font-mono text-[9px] text-[#FFAF87] font-bold uppercase tracking-widest block">
                      [ TRANSFORMER STOCHASTIC CONFINEMENT INTERVALS ]
                    </span>

                    <div className="flex items-center gap-2">
                      {(["30d", "60d", "90d"] as const).map((days) => (
                        <button
                          key={days}
                          onClick={() => setForecastHorizon(days)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer uppercase ${
                            forecastHorizon === days
                              ? "bg-peach border-peach text-black font-extrabold shadow-[0_4px_16px_rgba(255,175,135,0.15)]"
                              : "bg-[#090909] border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          Forecast {days}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-black border border-white/10 relative">
                      <div className="flex items-center justify-between font-mono text-[9.5px] text-gray-400 mb-2">
                        <span>CONFIDENCE BOUNDS RANGE:</span>
                        <span className="text-white font-extrabold">
                          {forecastHorizon === "30d" ? "±0.5% (STRICT PROJECTION)" : forecastHorizon === "60d" ? "±1.1% (BALANCED CURVE)" : "±1.5% (EXPANDED DIVERGENCE)"}
                        </span>
                      </div>
                      
                      <div className="h-6 w-full bg-white/5 rounded-lg overflow-hidden relative border border-white/5 flex items-center justify-center p-1">
                        {/* Dynamic animated area bar to look like a hardware meter */}
                        <div className="absolute left-2 text-[8px] font-mono text-gray-400">0% PROBABILITY</div>
                        <motion.div
                          initial={{ width: "95%" }}
                          animate={{ width: forecastHorizon === "30d" ? "98.5%" : forecastHorizon === "60d" ? "93.4%" : "88.2%" }}
                          transition={{ type: "spring", stiffness: 80 }}
                          className="h-full bg-gradient-to-r from-peach to-peach/40 rounded"
                        />
                        <div className="absolute right-2 text-[8px] font-mono text-white font-extrabold">
                          {forecastHorizon === "30d" ? "99.5%" : forecastHorizon === "60d" ? "98.9%" : "98.4%"} ACCURATE
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAYER 04 SIMULATOR: WebSocket Stream (Binary / Hex operations inspector) */}
                {selectedIdx === 3 && (
                  <div className="flex flex-col gap-4 animate-fade-in text-left">
                    <span className="font-mono text-[9px] text-[#C5E898] font-bold uppercase tracking-widest block">
                      [ REAL-TIME WEB_SOCKET COMPRESSION BUS ]
                    </span>

                    <div className="p-3 rounded-xl bg-black border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isStreaming ? "bg-mint animate-pulse" : "bg-red-500"} border border-black shrink-0`} />
                        <div>
                          <span className="font-sans font-bold text-xs text-white block">
                            {isStreaming ? "Telemetry Pipe Streaming (120 FPS)" : "Active Connection Paused"}
                          </span>
                          <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block mt-0.5">
                            TLS SOCKET VERIFIED SECURED // CH_88
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase border font-extrabold cursor-pointer transition-colors ${
                          isStreaming 
                            ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" 
                            : "bg-mint border-mint text-black hover:bg-opacity-80"
                        }`}
                      >
                        {isStreaming ? "Disconnect Pipe" : "Establish socket"}
                      </button>
                    </div>

                    {/* Scrolling terminal stream */}
                    <div className="p-3 bg-black border border-white/10 rounded-xl font-mono text-[9px] text-gray-400 max-h-[110px] h-[95px] overflow-y-hidden leading-normal text-left relative flex flex-col gap-1">
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                      {socketLogs.length === 0 ? (
                        <div className="text-gray-600 text-center py-4 uppercase">Waiting for telemetry payloads...</div>
                      ) : (
                        socketLogs.map((log, idx) => (
                          <div key={idx} className={idx === 0 ? "text-mint font-bold" : "text-gray-500"}>
                            {">"} {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* LAYER 05 SIMULATOR: Automated Reports (Multi-target compiler & Dispatcher) */}
                {selectedIdx === 4 && (
                  <div className="flex flex-col gap-4 animate-fade-in text-left">
                    <span className="font-mono text-[9px] text-[#FFAF87] font-bold uppercase tracking-widest block">
                      [ AUTOMATED DIGEST CONFIGURATION RACK ]
                    </span>

                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        onClick={() => setExportConfigs({...exportConfigs, slack: !exportConfigs.slack})}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-[9px] uppercase flex flex-col justify-between items-center gap-1.5 ${
                          exportConfigs.slack
                            ? "bg-peach/10 border-peach text-peach font-bold"
                            : "bg-black border-white/5 text-gray-500"
                        }`}
                      >
                        <span>SLACK AGENT</span>
                        <span className="text-[7px] opacity-80">{exportConfigs.slack ? "ACTIVE" : "OFFLINE"}</span>
                      </button>

                      <button
                        onClick={() => setExportConfigs({...exportConfigs, pdf: !exportConfigs.pdf})}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-[9px] uppercase flex flex-col justify-between items-center gap-1.5 ${
                          exportConfigs.pdf
                            ? "bg-peach/10 border-peach text-peach font-bold"
                            : "bg-black border-white/5 text-gray-500"
                        }`}
                      >
                        <span>PDF BRIEFING</span>
                        <span className="text-[7px] opacity-80">{exportConfigs.pdf ? "ACTIVE" : "OFFLINE"}</span>
                      </button>

                      <button
                        onClick={() => setExportConfigs({...exportConfigs, googleSheets: !exportConfigs.googleSheets})}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-[9px] uppercase flex flex-col justify-between items-center gap-1.5 ${
                          exportConfigs.googleSheets
                            ? "bg-peach/10 border-peach text-peach font-bold"
                            : "bg-black border-white/5 text-gray-500"
                        }`}
                      >
                        <span>SHEETS SYNC</span>
                        <span className="text-[7px] opacity-80">{exportConfigs.googleSheets ? "ACTIVE" : "OFFLINE"}</span>
                      </button>
                    </div>

                    <div className="p-3 bg-black border border-white/10 rounded-xl">
                      {reportProgress !== null ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between font-mono text-[8px] text-gray-400">
                            <span>COMPILING METADATA ASSETS...</span>
                            <span>{reportProgress}%</span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              className="bg-peach h-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${reportProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="font-sans text-2xs text-gray-500 leading-normal max-w-[280px]">
                            Dispatches complex reports automatically every Monday 08:00 UTC with updated parameters checked above.
                          </p>
                          <button
                            onClick={handleDispatchReport}
                            className="bg-peach hover:bg-opacity-90 text-black font-mono font-bold text-[9px] px-3.5 py-2 rounded-lg cursor-pointer uppercase transition-colors shrink-0"
                          >
                            Compile Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* LAYER 06 SIMULATOR: Language-to-Query SQL Agent (Interactive prompt terminal) */}
                {selectedIdx === 5 && (
                  <div className="flex flex-col gap-4 animate-fade-in text-left">
                    <span className="font-mono text-[9px] text-[#C5E898] font-bold uppercase tracking-widest block">
                      [ AUTONOMOUS SQL AGENT COMPLY INTERACTIVE RACK ]
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {agentPrompts.map((prom, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedPrompt(idx);
                            setCustomPrompt("");
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-mono border transition-all cursor-pointer uppercase ${
                            selectedPrompt === idx && !customPrompt
                              ? "bg-mint border-mint text-black font-extrabold"
                              : "bg-black border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          Prompt #{idx + 1}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleCustomSubmit} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Or draft manual instructions here (e.g. Find arr totals...)"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="bg-black border border-white/10 text-white rounded-xl px-3 py-2 text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-mint/50 flex-1"
                      />
                      <button
                        type="submit"
                        disabled={isCompiling}
                        className="bg-mint text-black text-[9px] uppercase font-mono font-bold px-4 py-2 rounded-xl border border-mint cursor-pointer hover:bg-opacity-80 transition-colors shrink-0 flex items-center gap-1 isDisabled:opacity-50"
                      >
                        {isCompiling ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            CALS
                          </>
                        ) : (
                          "Compile"
                        )}
                      </button>
                    </form>

                    {/* Compiled terminal view */}
                    <div className="p-3 bg-black border border-white/10 rounded-xl font-mono text-[9.5px] text-gray-400 max-h-[100px] h-[75px] overflow-y-auto leading-normal text-left select-all">
                      <div className="text-mint font-semibold mb-1">
                        {">"} {customPrompt ? customPrompt : agentPrompts[selectedPrompt].prompt}
                      </div>
                      <pre className="text-gray-300 font-mono text-[8.5px] leading-relaxed">
                        {customPrompt 
                          ? `SELECT count(distinct pipeline_id) AS total_pipelines,\n       status\nFROM application_matrix_prod\nWHERE instructions LIKE '%${customPrompt.replace(/'/g, "''")}%'\nGROUP BY status;`
                          : agentPrompts[selectedPrompt].sql
                        }
                      </pre>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Static Layer Description panel */}
            <div className="flex flex-col gap-3 text-left">
              <span className="font-mono text-[9px] text-[#FFAF87] font-bold tracking-widest uppercase block mb-1">
                LAYER_SPECS // {listItems[selectedIdx].num} // ARCHITECTURAL DATA
              </span>

              <h3 className="text-2xl sm:text-3xl font-sans font-black text-white leading-none">
                {listItems[selectedIdx].title}
              </h3>
              
              <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
                {listItems[selectedIdx].desc}
              </p>
            </div>

            {/* Success flash messages for compiling/dispatch actions */}
            <AnimatePresence>
              {successLogAlert && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-28 left-6 right-6 p-4 rounded-xl border border-[#C5E898]/40 bg-[#0c0c0c] text-mint text-xs font-mono flex items-center gap-2 shadow-[0_8px_32px_rgba(197,232,152,0.15)] select-none z-50 text-left"
                >
                  <ShieldCheck className="w-4.5 h-4.5 text-mint shrink-0" />
                  <span>{successLogAlert}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Four-Column Diagnostic Stats Panel Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 select-none">
              <div className="flex flex-col gap-1 leading-none text-left">
                <span className="font-mono text-[7.5px] text-gray-500 uppercase tracking-widest block">PIPELINE_STABILITY</span>
                <span className="text-sm font-sans font-bold text-[#C5E898] mt-1.5 flex items-center gap-1 uppercase">
                  <Check className="w-3.5 h-3.5 text-mint font-black" /> SECURED
                </span>
              </div>

              <div className="flex flex-col gap-1 leading-none text-left">
                <span className="font-mono text-[7.5px] text-gray-500 uppercase tracking-widest block">TELEMETRY_SPEED</span>
                <span className="text-sm font-sans font-black text-white mt-1.5">
                  {listItems[selectedIdx].stats}
                </span>
              </div>

              <div className="flex flex-col gap-1 leading-none text-left">
                <span className="font-mono text-[7.5px] text-gray-500 uppercase tracking-widest block">VAULT_PROTOCOLS</span>
                <span className="text-sm font-sans font-black text-white mt-1.5">
                  AES_256_E2EE
                </span>
              </div>

              <div className="flex flex-col gap-1 leading-none text-left">
                <span className="font-mono text-[7.5px] text-gray-500 uppercase tracking-widest block">INGRESS_DISPATCH</span>
                <span className="text-sm font-sans font-black text-peach mt-1.5">
                  STABLE_READY
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
