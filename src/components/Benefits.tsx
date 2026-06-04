import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Server, 
  Layers, 
  Coins, 
  CheckCircle2 
} from "lucide-react";

type BusinessSector = "fintech" | "enterprise" | "saas";

export default function Benefits() {
  const [sector, setSector] = useState<BusinessSector>("fintech");
  const [dataIngest, setDataIngest] = useState<number>(35); // in Terabytes per month
  const [nodeCount, setNodeCount] = useState<number>(140); // VM processing nodes count

  // Calculated Realized Outcomes based on sliders
  const legacyCostModel = (dataIngest * 2400) + (nodeCount * 450);
  const zorlixCostModel = (dataIngest * 220) + (nodeCount * 80) + 1200;
  const netSavings = legacyCostModel - zorlixCostModel;
  const savingsPercent = Math.round((netSavings / legacyCostModel) * 100);
  
  // Staging metrics
  const engineerEfficiencyMultiplier = 4.2;
  const devHoursRecovered = Math.round(nodeCount * 14 * engineerEfficiencyMultiplier);

  // Simulated telemetry console for the financial calculator
  const [calcLogs, setCalcLogs] = useState<string[]>([
    "FIN_SYS: Ingress yield estimator calibrated.",
    "BOND_RATE: Adjusted sector parameters to [FINTECH_LEDGERS]."
  ]);

  // Update logs when inputs change
  useEffect(() => {
    const formattedSavings = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(netSavings);
    setCalcLogs((prev) => [
      ...prev.slice(-3),
      `CALC_UPDATE: Recalculating ledger bounds. Ingest: ${dataIngest} TB/Mo. NodeCount: ${nodeCount}.`,
      `EST_OUTCOME: Total projected annual savings estimated at ${formattedSavings}/year.`,
      `COMPRESSION_RATIO: Unified database squeeze quotient at ${(legacyCostModel / Math.max(1, zorlixCostModel)).toFixed(1)}:1.`
    ]);
  }, [dataIngest, nodeCount, sector]);

  const handleSectorChange = (sec: BusinessSector) => {
    setSector(sec);
    const sectorLabels = {
      fintech: "FINTECH_LEDGERS // HIGH_CONCURRENCY",
      enterprise: "ENTERPRISE_AI_CLOUD // MULTI_REGIONAL",
      saas: "SAAS_API_FLOWS // DYNAMIC_TRANSITION"
    };
    setCalcLogs((prev) => [
      ...prev.slice(-3),
      `SECTOR_SHIFT: Binding calculations to [${sectorLabels[sec]}].`
    ]);
  };

  // Generate SVG cash flow points for traditional vs optimized flows
  const generateGraphPoints = (isZorlix: boolean) => {
    const points = [];
    const steps = 6;
    const baseVal = isZorlix ? 180 : 200;
    const damping = isZorlix ? 0.3 : 1.1;
    const scaleFactor = (dataIngest / 100) * 0.6 + (nodeCount / 500) * 0.4;

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 440 + 30;
      let y;
      if (isZorlix) {
        // Keeps costs low and highly predictive (flat curve)
        y = 170 - (i * 12 * damping) - (scaleFactor * i * 3);
      } else {
        // Traditional costs spike heavily reflecting scaling inefficiencies
        y = 180 - (i * i * 4 * damping) - (scaleFactor * i * 16);
      }
      // Guarantee graph boundaries
      y = Math.min(220, Math.max(20, y));
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  return (
    <section id="benefits" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background radial glowing gradients */}
      <div className="absolute top-[20%] left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-peach/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-1/4 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-mint/5 blur-[150px] pointer-events-none" />

      {/* Grid line backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-mint text-2xs font-mono tracking-widest uppercase shadow-md select-none">
            <Coins className="w-3.5 h-3.5 text-mint animate-pulse" />
            <span>REALIZED FINANCIAL OUTCOMES</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white mt-6 mb-4">
            Compacted Ledger Reactor
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
            Squeeze out pricing inefficiencies. Specify your dataset velocity scale and VM active count below to project automated infrastructure optimization instantly.
          </p>
        </div>

        {/* 12-Column Custom Grid splitting the dynamic dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="fin-outcomes-grid">
          
          {/* COLUMN A: Dynamic Cyber-Financial Reactor HUD (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-[#080808] to-black border border-white/8 rounded-3xl relative overflow-hidden min-h-[580px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />
            
            {/* HUD Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 select-none">
                <span className="font-mono text-[8px] text-[#FFAF87] tracking-widest uppercase block">ROI_ESTIMATOR_CONTROL</span>
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">INGRESS_TUNNEL: SECURE</span>
              </div>

              <h3 className="text-xl font-sans font-black text-white leading-tight mb-2">
                Outcomes Synthesizer
              </h3>
              <p className="text-gray-400 font-light text-xs leading-relaxed mb-6">
                Specify operational scale dimensions parameters below to trigger algorithmic financial metrics live updates.
              </p>

              {/* Selector HUD component: Business Sector Choice */}
              <div className="mb-6 select-none">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">
                  CHOOSE CORE BUSINESS SECTOR
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["fintech", "enterprise", "saas"] as const).map((sec) => (
                    <button
                      key={sec}
                      onClick={() => handleSectorChange(sec)}
                      className={`py-2 rounded-xl border text-center font-mono text-[8px] uppercase tracking-wider transition-all cursor-pointer ${
                        sector === sec
                          ? "bg-peach border-peach text-black font-extrabold"
                          : "bg-black border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      {sec === "fintech" ? "Fintech" : sec === "enterprise" ? "Enterprise" : "SaaS API"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 1: Data Ingest Volume */}
              <div className="bg-[#050505] p-4.5 rounded-2xl border border-white/5 mb-4 text-left select-none">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-2">
                  <span>DATA INGEST VOLUME:</span>
                  <span className="text-peach font-black">{dataIngest} Terabytes/Mo</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={dataIngest}
                  onChange={(e) => setDataIngest(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 accent-peach rounded-full cursor-pointer mt-1"
                />
                <div className="flex items-center justify-between font-mono text-[8px] text-gray-600 mt-1.5">
                  <span>5 TB (ENTRY_POINT)</span>
                  <span>200 TB (MASSIVE)</span>
                </div>
              </div>

              {/* Slider 2: Processing VMs / Server Nodes */}
              <div className="bg-[#050505] p-4.5 rounded-2xl border border-white/5 text-left select-none">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-2">
                  <span>DEPLOYED WORKER NODES:</span>
                  <span className="text-mint font-black">{nodeCount} Server Clusters</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="20"
                  value={nodeCount}
                  onChange={(e) => setNodeCount(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 accent-mint rounded-full cursor-pointer mt-1"
                />
                <div className="flex items-center justify-between font-mono text-[8px] text-gray-600 mt-1.5">
                  <span>20 WORKER NODES</span>
                  <span>1000 MAX STACKS</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Computations stacked sidebar */}
            <div className="flex flex-col gap-6 pt-6 border-t border-white/5 mt-8 select-none">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">ANNUAL COGNITIVE SAVINGS</span>
                  <span className="text-2xl sm:text-3xl font-sans font-black text-peach tracking-tight block mt-1">
                    {devHoursRecovered.toLocaleString()}+ <span className="text-xs font-light text-gray-400 font-mono">Hrs</span>
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">OVERALL SQUEEZE SAVED</span>
                  <span className="text-2xl sm:text-3xl font-sans font-black text-mint tracking-tight block mt-1 animate-pulse">
                    ${(netSavings * 12).toLocaleString()}+ <span className="text-xs font-light text-gray-400 font-mono">USD</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN B: Custom Visual Cash-Flow Graph & Contrast Matrix (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-black border border-white/10 rounded-3xl relative overflow-hidden text-left" id="financial-matrix-deck">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />

            <div>
              {/* Dynamic Financial Flow projection graph */}
              <div className="border-b border-white/5 pb-4 mb-6">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mb-3.5 select-none">
                  COHERENT CASH FLOW PATHWAY PROJECTION
                </span>

                <div className="relative w-full h-[180px] bg-[#050505] rounded-2xl border border-white/5 flex items-center justify-center p-2 mb-4">
                  <span className="absolute top-3 left-3 font-mono text-[8px] text-gray-500 uppercase">YIELD_CURVE // SCALING_EFFICIENCY</span>
                  <span className="absolute top-3 right-3 font-mono text-[8.5px] text-[#C5E898] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                    ZOR-LIX: {savingsPercent}% CHEAPER
                  </span>

                  {/* Reactive SVG Graph Lines */}
                  <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 500 240" fill="none" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="optFlow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#C5E898" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#C5E898" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="legacyFlow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFAF87" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#FFAF87" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid Lines */}
                    <line x1="30" y1="40" x2="470" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <line x1="30" y1="120" x2="470" y2="120" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <line x1="30" y1="200" x2="470" y2="200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                    {/* Traditional Legacy Costs Flow Line */}
                    <polyline
                      fill="none"
                      stroke="#FFAF87"
                      strokeWidth="2.5"
                      points={generateGraphPoints(false)}
                      className="transition-all duration-500 ease-out"
                    />
                    <path
                      d={`M 30,220 L ${generateGraphPoints(false)} L 470,220 Z`}
                      fill="url(#legacyFlow-grad)"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Optimized Zorlix Costs Flow Line */}
                    <polyline
                      fill="none"
                      stroke="#C5E898"
                      strokeWidth="3.5"
                      points={generateGraphPoints(true)}
                      className="transition-all duration-500 ease-out"
                    />
                    <path
                      d={`M 30,220 L ${generateGraphPoints(true)} L 470,220 Z`}
                      fill="url(#optFlow-grad)"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>

                  {/* Label legends overlays */}
                  <div className="absolute bottom-2.5 left-4 right-4 flex justify-between font-mono text-[7px] text-gray-600 uppercase select-none">
                    <span>JAN_INIT</span>
                    <span>Q2_RECON</span>
                    <span>Q3_CLUSTER</span>
                    <span>Q4_PEAK_YIELD</span>
                  </div>
                </div>
              </div>

              {/* Parallel Comparison Contrasters */}
              <div className="grid sm:grid-cols-2 gap-4.5 mb-6 select-none">
                
                {/* Traditional Bill items block */}
                <div className="p-4 rounded-2xl bg-[#050505] border border-red-950/20 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/2 blur-2xl" />
                  <span className="font-mono text-[8px] text-red-400 uppercase tracking-widest block mb-1">
                    LEGACY STAGING OVERHEAD
                  </span>
                  
                  <h4 className="font-sans font-black text-white text-base mt-1.5 block">
                    ${(legacyCostModel * 12).toLocaleString()}/year
                  </h4>
                  
                  <ul className="mt-3.5 flex flex-col gap-1.5 font-mono text-[8.5px] text-gray-500">
                    <li className="flex justify-between border-b border-white/5 pb-1">
                      <span>• Snowflake credits leakage</span>
                      <span className="text-gray-400 font-bold">40%</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-1">
                      <span>• Continuous Kafka/ETL pipelines</span>
                      <span className="text-gray-400 font-bold">35%</span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span>• Multi-tool data licenses</span>
                      <span className="text-gray-400 font-bold">25%</span>
                    </li>
                  </ul>
                </div>

                {/* Zor-Lix Bill items block */}
                <div className="p-4 rounded-2xl bg-[#050505] border border-mint/20 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-mint/5 blur-2xl" />
                  <span className="font-mono text-[8px] text-mint uppercase tracking-widest block mb-1">
                    ZOR-LIX UNIFIED LEDGER CORE
                  </span>
                  
                  <h4 className="font-sans font-black text-mint text-base mt-1.5 block">
                    ${(zorlixCostModel * 12).toLocaleString()}/year
                  </h4>

                  <ul className="mt-3.5 flex flex-col gap-1.5 font-mono text-[8.5px] text-gray-500">
                    <li className="flex justify-between border-b border-white/5 pb-1">
                      <span>• Autonomous classification logic</span>
                      <span className="text-mint font-bold">INCLUDED</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-1">
                      <span>• Direct secure database stream</span>
                      <span className="text-mint font-bold">ZERO OVERHEAD</span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span>• Comprehensive metrics briefly</span>
                      <span className="text-mint font-bold">CONSOLIDATED</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Calculated active metrics bars & Live Output Terminal logs simulator */}
            <div className="p-4 bg-black border border-white/8 rounded-2xl mt-2">
              <div className="flex items-center justify-between gap-2 mb-3 border-b border-white/5 pb-1.5 select-none font-mono text-[8px] text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-mint animate-pulse" />
                  AGGREGATOR_INFERENCE_CORES // YIELD_METRIC
                </span>
                
                <span className="text-peach font-bold">
                  SQUEEZE_COEF: {savingsPercent}% SAVED
                </span>
              </div>

              {/* Diagnostic calculated log streams */}
              <div className="font-mono text-[9px] text-gray-400 flex flex-col gap-1 select-text">
                {calcLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1 p-0.5 leading-normal select-none">
                    <span className="text-mint font-semibold">{">"}</span>
                    <p className="text-left leading-normal">{log}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom aggregate indicator security line */}
            <div className="flex items-center justify-between text-[8px] text-gray-500 font-mono tracking-widest uppercase border-t border-white/5 pt-5 mt-6 select-none">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-mint" /> SOC-2 COMPLIANCY SECURED
              </span>
              <span>VERIFIED FINANCIAL LEDGER SYNC</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
