import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Users, Database, Zap, Sparkles, RefreshCw, Layers, Shield, Terminal as TermIcon, FileText, ChevronRight, Activity } from "lucide-react";

export default function LiveDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<"arr" | "users" | "data" | "speed">("arr");
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [cpuLoad, setCpuLoad] = useState(65);
  const [queueDelay, setQueueDelay] = useState(1.4);
  const [spikeTriggered, setSpikeTriggered] = useState(false);
  const [opsLogs, setOpsLogs] = useState<Array<{ id: string; msg: string; type: "success" | "warning" }>>([
    { id: "L01", msg: "INGEST_NODE_A: Polling snowflake table 'orders'...", type: "success" },
    { id: "L02", msg: "CLEAN_AGENT_B: Null field imputes calculated in 0.05s", type: "success" },
    { id: "L03", msg: "FORECAST_NODE_C: Auto pipeline horizon extended to 90d", type: "success" },
  ]);

  // Handle manual sync simulation with simulated transaction spikes
  const triggerSpike = () => {
    setIsSynthesizing(true);
    setSpikeTriggered(true);
    setCpuLoad(92);
    setQueueDelay(2.18);
    setOpsLogs((prev) => {
      const maxNum = prev.reduce((max, log) => {
        const num = parseInt(log.id.replace(/\D/g, ""), 10) || 0;
        return num > max ? num : max;
      }, 0);
      const nextNum = maxNum + 1;
      const displayId = `L${nextNum.toString().padStart(2, "0")}`;
      return [
        { id: displayId, msg: "SYS_SPIKE: High-frequency query injection simulation triggered!", type: "warning" },
        ...prev,
      ];
    });

    setTimeout(() => {
      setIsSynthesizing(false);
      setSpikeTriggered(false);
      setCpuLoad(68);
      setQueueDelay(1.25);
    }, 2200);
  };

  // Simulate automatic system updates
  useEffect(() => {
    const timer = setInterval(() => {
      if (!spikeTriggered) {
        setCpuLoad((prev) => {
          const delta = Math.floor(Math.random() * 9) - 4;
          return Math.max(50, Math.min(80, prev + delta));
        });
        setQueueDelay((prev) => {
          const delta = (Math.random() * 0.3) - 0.15;
          return parseFloat(Math.max(0.8, Math.min(2.0, prev + delta)).toFixed(2));
        });

        const events = [
          "TRANS_METRIC: Discovered ARR shift of +2.1% across Stripe accounts",
          "SYNC_NODE_B: Snowflake pipeline latency mapped at 0.02ms",
          "AI_FORECAST: Transformer Horizon updated (±1.5% Confidence)",
          "DISPATCH_A: Successfully delivered Slack anomaly warning webhook",
          "SCHEMA_ALIGN: MongoDB collection structure validated successfully",
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setOpsLogs((prev) => {
          const maxNum = prev.reduce((max, log) => {
            const num = parseInt(log.id.replace(/\D/g, ""), 10) || 0;
            return num > max ? num : max;
          }, 0);
          const nextNum = maxNum + 1;
          const displayId = `L${nextNum.toString().padStart(2, "0")}`;
          return [
            { id: displayId, msg: randomEvent, type: "success" },
            ...prev.slice(0, 4),
          ];
        });
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [spikeTriggered]);

  const metrics = {
    arr: {
      title: "Annual Recurring Revenue",
      value: "$24,582,100",
      change: "+31.2%",
      color: "text-peach",
      glowColor: "peach",
      desc: "Autonomously reconciled across Stripe, HubSpot, and ledger nodes.",
      chartData: {
        "7d": [18, 19.3, 20.1, 21.5, 22.8, 23.4, 24.58],
        "30d": [12.5, 14.2, 15.8, 17.5, 19.1, 20.8, 21.5, 23.1, 24.58],
        "90d": [8.2, 10.4, 12.8, 15.1, 16.9, 19.4, 21.3, 22.9, 24.58],
      }
    },
    users: {
      title: "Active Core Enterprises",
      value: "421,902",
      change: "+18.4%",
      color: "text-mint",
      glowColor: "mint",
      desc: "Live synchronized users with real-time heartbeat sessions active.",
      chartData: {
        "7d": [380, 392, 401, 410, 415, 418, 421.9],
        "30d": [320, 335, 348, 362, 375, 390, 402, 411, 421.9],
        "90d": [240, 275, 290, 310, 332, 358, 381, 401, 421.9],
      }
    },
    data: {
      title: "Processed Ingestion Volume",
      value: "84.22 TB",
      change: "+112.5%",
      color: "text-peach",
      glowColor: "peach",
      desc: "Unstructured databases normalized and standard-mapped.",
      chartData: {
        "7d": [52, 60, 68, 72, 77, 81, 84.42],
        "30d": [31, 38, 46, 52, 59, 67, 72, 78, 84.42],
        "90d": [15, 24, 32, 44, 55, 62, 70, 78, 84.42],
      }
    },
    speed: {
      title: "AI Pipeline Ingestion Latency",
      value: "0.012 ms",
      change: "-84.8%",
      color: "text-mint",
      glowColor: "mint",
      desc: "Sub-millisecond data clearing and transformer mapping delay.",
      chartData: {
        "7d": [0.09, 0.07, 0.05, 0.04, 0.03, 0.02, 0.012],
        "30d": [0.18, 0.15, 0.12, 0.10, 0.08, 0.06, 0.04, 0.02, 0.012],
        "90d": [0.45, 0.38, 0.31, 0.25, 0.18, 0.12, 0.08, 0.04, 0.012],
      }
    }
  };

  const activeChartData = metrics[selectedMetric].chartData[timeframe];
  // If sync spike occurs during simulation, artificially inflate trends
  const adjustedChartData = spikeTriggered 
    ? activeChartData.map((d) => d * 1.25)
    : activeChartData;

  const maxVal = Math.max(...adjustedChartData);
  const minVal = Math.min(...adjustedChartData);
  const spread = maxVal - minVal || 1;

  const padding = 45;
  const height = 210;
  const width = 550;
  
  // Real SVG path calculations
  const dPath = adjustedChartData.map((val, idx) => {
    const x = padding + (idx / (adjustedChartData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / spread) * (height - padding * 2);
    return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Circular gauge parameters
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const cpuOffset = circumference - (cpuLoad / 100) * circumference;
  const queuePercent = Math.min(100, Math.max(0, (queueDelay / 3) * 100));
  const queueOffset = circumference - (queuePercent / 100) * circumference;

  return (
    <section id="dashboard" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-peach/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-mint/5 blur-[130px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-peach bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full">
            REAL-TIME INTEL HUD
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mt-6 mb-4">
            Terminal Reactor Cockpit
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
            A panoramic analytical layout grouping predictive visual modeling with high-frequency stream logging. Select parameter metrics to re-project trends instantly.
          </p>
        </div>

        {/* The New Layout: Horizontal Split Configuration (Columns 8 and 4) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column Left: Visualizer Stream Control Deck (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/10 flex-grow flex flex-col justify-between relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-sans font-black text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-peach animate-pulse shrink-0" />
                      {metrics[selectedMetric].title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-light max-w-lg leading-normal">
                      {metrics[selectedMetric].desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {/* Timeframe switch */}
                    <div className="flex bg-black border border-white/5 p-1 rounded-xl">
                      {(["7d", "30d", "90d"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeframe(t)}
                          className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-wider font-extrabold transition-all cursor-pointer ${
                            timeframe === t
                              ? "bg-peach text-black shadow font-black"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {t.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Large Visual SVG Chart */}
                <div className="relative h-[220px] w-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.svg
                      key={selectedMetric + timeframe + spikeTriggered}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      viewBox={`0 0 ${width} ${height}`}
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        <linearGradient id="chartGradientArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFAF87" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#FFAF87" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Guide dividers */}
                      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                      <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeWidth={1} strokeDasharray="3 3" />
                      
                      {/* Polygon fill under path */}
                      <path
                        d={`${dPath} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
                        fill="url(#chartGradientArea)"
                      />

                      {/* Secondary predictive path (dashed) representing model forecast bounds */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        d={dPath}
                        fill="none"
                        stroke="#FFAF87"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />

                      {/* Point indicators */}
                      {adjustedChartData.map((val, idx) => {
                        const x = padding + (idx / (adjustedChartData.length - 1)) * (width - padding * 2);
                        const y = height - padding - ((val - minVal) / spread) * (height - padding * 2);
                        const isHovered = activeSegment === idx;

                        return (
                          <g key={idx}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isHovered ? 12 : 5}
                              fill={isHovered ? "rgba(255,175,135,0.15)" : "transparent"}
                              onMouseEnter={() => setActiveSegment(idx)}
                              onMouseLeave={() => setActiveSegment(null)}
                              className="cursor-pointer"
                            />
                            <circle cx={x} cy={y} r="3" fill="#FFAF87" className="pointer-events-none" />
                          </g>
                        );
                      })}
                    </motion.svg>
                  </AnimatePresence>

                  {/* Active hovered node tooltips */}
                  {activeSegment !== null && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-3.5 py-2 rounded-xl text-[10px] font-mono text-white shadow-xl flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-mint animate-pulse shrink-0" />
                      <span>Forecasted:</span>
                      <strong className="text-peach font-extrabold">
                        {adjustedChartData[activeSegment].toFixed(2)}
                        {selectedMetric === "arr" ? "M" : selectedMetric === "users" ? "k" : selectedMetric === "data" ? " TB" : " ms"}
                      </strong>
                    </div>
                  )}

                  {spikeTriggered && (
                    <div className="absolute inset-0 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center justify-center pointer-events-none">
                      <span className="font-mono text-xs text-red-400 font-extrabold uppercase animate-pulse">
                        ⚠️ SPIKE_INJECTION_FEED_ACTIVE (+25% COMPRESS)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Select Panels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 border-t border-white/5 pt-6">
                {(["arr", "users", "data", "speed"] as const).map((mKey) => (
                  <button
                    key={mKey}
                    onClick={() => setSelectedMetric(mKey)}
                    className={`py-3 px-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      selectedMetric === mKey
                        ? "bg-white/5 border-peach/50 shadow-md"
                        : "bg-transparent border-white/5 hover:border-white/12"
                    }`}
                  >
                    <span className="font-mono text-[8px] text-gray-500 uppercase block">{mKey} index</span>
                    <span className="text-sm font-sans font-black text-white leading-tight">
                      {mKey === "arr" ? "ARR Revenue" : mKey === "users" ? "Accounts" : mKey === "data" ? "Data Lake" : "Compute ms"}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Column Right: Nuclear Control Diagnostics Board (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="glassmorphism rounded-3xl p-6 border border-white/10 shadow-2xl flex-grow flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />

              <div>
                <span className="font-mono text-[9px] text-[#C5E898] uppercase tracking-widest block border-b border-white/5 pb-2 mb-4">
                  DIAGNOSTICS_STAGING_DRAWER
                </span>

                {/* Standard circular gauges aligned horizontal */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-black p-4 rounded-2xl border border-white/5">
                  {/* Gauge 1: Cpu status */}
                  <div className="flex flex-col items-center text-center">
                    <span className="font-mono text-[8px] text-gray-500 uppercase mb-2">GPU POOL</span>
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="21" stroke="rgba(255,175,135,0.08)" strokeWidth="3.5" fill="transparent" />
                        <circle
                          cx="28"
                          cy="28"
                          r="21"
                          stroke="#FFAF87"
                          strokeWidth="3.5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 21}
                          strokeDashoffset={(2 * Math.PI * 21) - (cpuLoad / 100) * (2 * Math.PI * 21)}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute font-sans font-black text-[10px] text-white">{cpuLoad}%</span>
                    </div>
                  </div>

                  {/* Gauge 2: Queue status */}
                  <div className="flex flex-col items-center text-center">
                    <span className="font-mono text-[8px] text-gray-500 uppercase mb-2">BROKER DELAY</span>
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="21" stroke="rgba(167,243,208,0.08)" strokeWidth="3.5" fill="transparent" />
                        <circle
                          cx="28"
                          cy="28"
                          r="21"
                          stroke="#A7F3D0"
                          strokeWidth="3.5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 21}
                          strokeDashoffset={(2 * Math.PI * 21) - (queuePercent / 100) * (2 * Math.PI * 21)}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute font-sans font-black text-[10px] text-white">{queueDelay}s</span>
                    </div>
                  </div>
                </div>

                {/* Command list of ops logs */}
                <div className="flex flex-col gap-3 h-[180px] overflow-y-auto mb-6 pr-1">
                  <AnimatePresence initial={false}>
                    {opsLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="p-3 bg-black border border-white/5 rounded-xl flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between text-[8px] font-mono font-bold">
                          <span className={log.type === "warning" ? "text-red-400" : "text-mint"}>
                            {log.id} // SECURE
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full ${log.type === "warning" ? "bg-red-500" : "bg-mint animate-pulse"}`} />
                        </div>
                        <p className="font-mono text-[9px] text-gray-400 leading-normal">{log.msg}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Button: Trigger Test sync Spike */}
              <div>
                <button
                  onClick={triggerSpike}
                  disabled={isSynthesizing}
                  className="w-full py-4 bg-gradient-to-tr from-peach via-white to-mint text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isSynthesizing ? "virtualizing load..." : "Trigger Test Sync Spike"}
                  <RefreshCw className={`w-4 h-4 text-black ${isSynthesizing ? "animate-spin" : ""}`} />
                </button>

                <div className="flex items-center gap-2 justify-center text-[9px] font-mono text-gray-500 mt-3 uppercase">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Encrypted ledger vault AES-256</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
