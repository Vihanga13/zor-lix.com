import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  Filter, 
  Binary, 
  Disc, 
  ArrowRight, 
  Activity, 
  Cpu, 
  Sparkles, 
  CheckCircle, 
  BarChart3, 
  Send, 
  Radio, 
  Terminal as TermIcon,
  Workflow,
  Zap,
  Network,
  GitBranch,
  ShieldCheck
} from "lucide-react";

interface PipelineNode {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  icon: string;
  stepNum: string;
  latency: string;
  throughput: string;
  cx: number; // SVG Xcoordinate
  cy: number; // SVG Ycoordinate
  endpoint: string;
}

export default function AIPipeline() {
  const [activeNode, setActiveNode] = useState<string>("collect");
  const [ingressProtocol, setIngressProtocol] = useState<"https" | "ws" | "grpc">("ws");
  const [baseThroughput, setBaseThroughput] = useState<number>(45000);
  const [tickerSpeed, setTickerSpeed] = useState<number>(14200);
  const [isPacketFiring, setIsPacketFiring] = useState<boolean>(false);
  const [packetProgress, setPacketProgress] = useState<number>(0);
  const [firedPacketIndex, setFiredPacketIndex] = useState<number>(0);
  
  // Terminal logs simulation inside the pipeline monitor
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    "SYS_INIT: Constellation mesh network online and secure.",
    "BROKER_LOAD: WebSocket transport protocol synchronized on port 3000.",
    "PIPELINE_OK: Awaiting transactional packet ingest."
  ]);

  // Fluctuating metric values for active performance simulation
  useEffect(() => {
    const streamTimer = setInterval(() => {
      setTickerSpeed((prev) => prev + Math.floor(Math.random() * 30) - 15);
      setBaseThroughput((prev) => {
        const adjustment = Math.floor(Math.random() * 200) - 100;
        return Math.max(10000, Math.min(99000, prev + adjustment));
      });
    }, 1200);

    return () => clearInterval(streamTimer);
  }, []);

  const nodes: PipelineNode[] = [
    {
      id: "collect",
      name: "Collect",
      subtitle: "Unified Ingest",
      desc: "Connect Snowflake database clusters, local PostgreSQL tables, or API event streams dynamically. Our zero-trust secure pipeline discovers your custom datasets and maps relationships without database access permissions.",
      icon: "/Holographic Constellation.webp",
      stepNum: "01",
      latency: "0.01ms",
      throughput: "45k streams/m",
      cx: 50,
      cy: 160,
      endpoint: "snowflake_ledger_prod"
    },
    {
      id: "clean",
      name: "Clean",
      subtitle: "Outlier Harmonization",
      desc: "Autonomously detects standard deviation drift, timestamp corruption, and missing attributes. Cleans and processes telemetry values into standardized rows without introducing delay overhead.",
      icon: "/Holographic Constellation (2).webp",
      stepNum: "02",
      latency: "0.08ms",
      throughput: "120k blocks/m",
      cx: 170,
      cy: 60,
      endpoint: "staging_pipeline_registry"
    },
    {
      id: "analyze",
      name: "Analyze",
      subtitle: "Neural Modeling",
      desc: "Leverages proprietary Transformer time-series models trained specifically for transaction telemetry. Detect acquisition anomalies, future inventory spikes, and churn lifecycle patterns in minutes.",
      icon: "/Holographic Constellation (3).webp",
      stepNum: "03",
      latency: "1.12ms",
      throughput: "88k records/m",
      cx: 310,
      cy: 140,
      endpoint: "neural_transformer_core"
    },
    {
      id: "decide",
      name: "Decide",
      subtitle: "Autonomous Action",
      desc: "Configures active alert dispatchers and servers. Pipes rich JSON operational digests straight to Slack webhooks, database lakes, or custom Cloud storage channels automatically.",
      icon: "/Holographic Constellation (4).webp",
      stepNum: "04",
      latency: "0.24ms",
      throughput: "15k acts/m",
      cx: 440,
      cy: 70,
      endpoint: "global_socket_ingress"
    },
  ];

  // Active step info helper
  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[0];

  // Fire transaction packet flow animation along SVG bridges
  const firePacket = () => {
    if (isPacketFiring) return;
    setIsPacketFiring(true);
    setPacketProgress(0);

    const logStatements = [
      `PACKET_FIRE: Dispatched transaction envelope test unit ...`,
      `ROUTING_HOP: Relaying packet frame via protocol [${ingressProtocol.toUpperCase()}]`,
      `TRANSIT_STATS: Synthesizing validation handshake across nodes...`
    ];

    setPipelineLogs((prev) => [...prev.slice(-3), ...logStatements]);

    // Fast coordinate shift animation simulation
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setPacketProgress(currentStep);

      if (currentStep >= 100) {
        clearInterval(interval);
        setIsPacketFiring(false);
        setPipelineLogs((prev) => [
          ...prev.slice(-4),
          `PIPELINE_OK: Ingestion success! Latency verified: 0.14ms`
        ]);
      }
    }, 28);
  };

  // Switch ingress flow method and log
  const handleProtocolChange = (proto: "https" | "ws" | "grpc") => {
    setIngressProtocol(proto);
    setPipelineLogs((prev) => [
      ...prev.slice(-4),
      `GATE_SHIFT: Transport bound protocol swapped to [${proto.toUpperCase()}].`
    ]);
  };

  return (
    <section id="pipeline" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background neon soft glowing blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-peach/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-mint/5 blur-[150px] pointer-events-none" />

      {/* Coordinate backdrop mesh lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-mint text-2xs font-mono tracking-widest uppercase shadow-md select-none" id="pipeline-heading-p">
            <Network className="w-3.5 h-3.5 text-mint animate-pulse" />
            <span>DATA PIPELINE FLOW // CONSTELLATION</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mt-6 mb-4" id="pipeline-heading-title">
            Holographic Constellation Mesh
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl" id="pipeline-heading-desc">
            An uncommon, interactive star-atlas representation of our ingestion pipeline. Swap active telemetry coordinates or fire sample database packages directly through glowing pipeline bridges.
          </p>
        </div>

        {/* 12-Column Grid splitting Isometric Constellation Field & Controller HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="constellation-split-deck">
          
          {/* COLUMN A: Interactive Constellation Map & SVG Bridge (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-b from-[#080808]/90 to-black border border-white/5 rounded-3xl p-6 relative overflow-hidden min-h-[500px] select-none">
            
            {/* Mesh Coordinate Watermark */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-gray-500 flex items-center gap-1.5 leading-none">
              <Workflow className="w-3.5 h-3.5 text-mint" />
              <span>TOPOLOGY_MAP // GRID_VECTOR</span>
            </div>

            {/* Constellation Core Ingress Protocol Badge */}
            <div className="absolute top-4 right-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
              INGRESS_PORT: <span className="font-bold text-peach">{ingressProtocol === "ws" ? "WS_SECURE" : ingressProtocol === "grpc" ? "GRPC_MUX" : "HTTPS_POST"}</span>
            </div>

            {/* Render Stage of the Interactive Constellation */}
            <div className="relative w-full h-[320px] my-auto flex items-center justify-center">
              
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 240" fill="none" preserveAspectRatio="xMidYMid meet">
                {/* SVG Definitions for Gradients and Masks */}
                <defs>
                  <linearGradient id="bridge-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFAF87" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#C5E898" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#FFAF87" stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="active-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C5E898" />
                    <stop offset="100%" stopColor="#FFAF87" />
                  </linearGradient>
                </defs>

                {/* Primary Constellation Connecting Lines */}
                <line x1="50" y1="160" x2="170" y2="60" stroke="url(#bridge-glow)" strokeWidth="1.5" />
                <line x1="170" y1="60" x2="310" y2="140" stroke="url(#bridge-glow)" strokeWidth="1.5" />
                <line x1="310" y1="140" x2="440" y2="70" stroke="url(#bridge-glow)" strokeWidth="1.5" />

                {/* Secondary decorative constellation support lines */}
                <line x1="50" y1="160" x2="310" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="170" y1="60" x2="440" y2="70" stroke="rgba(255,175,135,0.03)" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Moving Pacnet / Tracer Dot Animation along the bridges */}
                {isPacketFiring && (
                  <>
                    {/* Path 1: 0% to 33.3% */}
                    {packetProgress <= 33.3 && (
                      <circle
                        cx={50 + (170 - 50) * (packetProgress / 33.3)}
                        cy={160 + (60 - 160) * (packetProgress / 33.3)}
                        r="5"
                        fill="url(#active-pulse)"
                        className="shadow-[0_0_10px_#FFAF87]"
                      />
                    )}

                    {/* Path 2: 33.3% to 66.6% */}
                    {packetProgress > 33.3 && packetProgress <= 66.6 && (
                      <circle
                        cx={170 + (310 - 170) * ((packetProgress - 33.3) / 33.3)}
                        cy={60 + (140 - 60) * ((packetProgress - 33.3) / 33.3)}
                        r="5"
                        fill="url(#active-pulse)"
                      />
                    )}

                    {/* Path 3: 66.6% to 100% */}
                    {packetProgress > 66.6 && (
                      <circle
                        cx={310 + (440 - 310) * ((packetProgress - 66.6) / 33.4)}
                        cy={140 + (70 - 140) * ((packetProgress - 66.6) / 33.4)}
                        r="5"
                        fill="url(#active-pulse)"
                      />
                    )}
                  </>
                )}
              </svg>

              {/* Physical Render Buttons situated dynamically on the coordinate nodes */}
              {nodes.map((node) => {
                const NodeIcon = node.icon;
                const isSelected = activeNode === node.id;
                
                // Position offset variables based on the SVG coordinates scale
                const xPct = `${(node.cx / 510) * 100}%`;
                const yPct = `${(node.cy / 232) * 100}%`;

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className="absolute cursor-pointer transition-all duration-300 group z-20"
                    style={{
                      left: xPct,
                      top: yPct,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Pulsing base glow ring for active nodes */}
                    <div className={`absolute -inset-4 rounded-full transition-all duration-500 ${
                      isSelected 
                        ? "bg-peach/15 scale-125 blur-sm border border-peach/20 animate-pulse" 
                        : "bg-transparent scale-100 group-hover:bg-white/5"
                    }`} />

                    <div className="relative">
                      {/* Physical star block button */}
                      <div className={`p-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        isSelected 
                          ? "bg-black border-peach text-peach scale-110 shadow-[0_0_20px_rgba(255,175,135,0.25)]" 
                          : "bg-[#0b0b0b]/90 border-white/5 text-gray-400 group-hover:border-white/10 group-hover:text-white"
                      }`}>
                        <img src={node.icon} alt={node.name} className="w-5 h-5 object-contain" />
                      </div>

                      {/* Display Star Index name label */}
                      <div className={`absolute left-1/2 -translate-x-1/2 top-12 px-2 py-1 rounded bg-[#0d0d0d] border border-white/10 text-[8px] font-mono tracking-wider uppercase text-white whitespace-nowrap transition-all select-none ${
                        isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                      }`}>
                        {node.stepNum}. {node.name}
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Bottom active constellation summary */}
            <div className="bg-[#050505] border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between text-left gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-peach/10 text-peach shrink-0">
                  <Zap className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="font-mono text-[8px] text-gray-500 uppercase block">ACTIVE DISPATCH CONSOLE</span>
                  <span className="text-xs font-sans font-extrabold text-white mt-0.5 block">Trigger real-time tracing packet</span>
                </div>
              </div>
              
              <button
                onClick={firePacket}
                disabled={isPacketFiring}
                className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-transform cursor-pointer select-none shrink-0 ${
                  isPacketFiring 
                    ? "bg-white/5 border border-white/5 text-gray-500" 
                    : "bg-gradient-to-tr from-peach to-amber-300 text-black hover:scale-[1.03]"
                }`}
                id="fire-packet-tracer-btn"
              >
                <span>{isPacketFiring ? "Packet In Flight..." : "Fire Packet Tracer"}</span>
                <Send className={`w-3.5 h-3.5 ${isPacketFiring ? "animate-ping" : ""}`} />
              </button>
            </div>

          </div>

          {/* COLUMN B: Deep Constellation Flow Controller HUD (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 bg-black border border-white/10 rounded-3xl relative overflow-hidden text-left" id="constellation-controller-deck">
            <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />

            {/* Ingress diagnostics header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 gap-3 select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-peach animate-ping shrink-0" />
                <div>
                  <h3 className="font-sans font-black text-sm text-white flex items-center gap-1.5 leading-none">
                    CONSTELLATION HARNESS
                    <Sparkles className="w-3.5 h-3.5 text-peach" />
                  </h3>
                  <span className="font-mono text-[9px] text-gray-500 uppercase mt-1 block">
                    Transactional pipeline parameter selectors
                  </span>
                </div>
              </div>

              <div className="font-mono text-[10px] text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-xl block leading-none w-fit">
                ENGINE STATUS: <span className="text-mint font-bold">MUTATION_OK</span>
              </div>
            </div>

            {/* Interactive Selector Controls Panel */}
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              
              {/* Selector HUD 1: Stream Throughput Slider */}
              <div className="flex flex-col gap-2 p-4 bg-[#080808] border border-white/5 rounded-2xl select-none">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>THROUGHPUT VOLUME:</span>
                  <span className="text-peach font-bold">{(baseThroughput / 1000).toFixed(1)}k/sec</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="99000"
                  step="5000"
                  value={baseThroughput}
                  onChange={(e) => setBaseThroughput(Number(e.target.value))}
                  className="w-full accent-peach cursor-pointer bg-white/5 h-1 rounded-full mt-2"
                />
                <div className="flex items-center justify-between text-[7.5px] text-gray-600 font-mono mt-1">
                  <span>10K FLOW RATE</span>
                  <span>99K FLOW RATE MAX</span>
                </div>
              </div>

              {/* Selector HUD 2: Protocol Exchange Handshakes */}
              <div className="flex flex-col gap-2 p-4 bg-[#080808] border border-white/5 rounded-2xl select-none">
                <span className="text-[11px] font-mono text-gray-400 block pb-1">
                  TRANSPORT PROTOCOL BIND:
                </span>
                
                <div className="grid grid-cols-3 gap-2">
                  {(["https", "ws", "grpc"] as const).map((proto) => (
                    <button
                      key={proto}
                      onClick={() => handleProtocolChange(proto)}
                      className={`py-1.5 rounded-lg border text-center font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                        ingressProtocol === proto
                          ? "bg-mint border-mint text-black font-extrabold"
                          : "bg-black border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      {proto === "https" ? "HTTPS" : proto === "ws" ? "WS" : "gRPC"}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Selected node telemetry diagnostics screen layout */}
            <div className="bg-[#050505] p-5 rounded-2xl border border-white/5 mb-6 flex flex-col justify-between relative min-h-[190px]">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 select-none">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">
                  CONSTELLATION NODE READOUT
                </span>
                <span className="font-mono text-[8px] text-mint bg-mint/10 px-2 py-0.5 rounded-lg">
                  STAGE_{currentNode.stepNum} // BOUND_SECURE
                </span>
              </div>

              {/* Dynamic node properties layout section */}
              <div className="grid sm:grid-cols-2 gap-4 w-full py-2">
                <div className="flex flex-col gap-1 text-left leading-none">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">TELEMETRY KEY</span>
                  <span className="text-sm font-sans font-black text-white mt-1">
                    {currentNode.name} ({currentNode.subtitle})
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-left leading-none">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">INTERNAL PATHWAY</span>
                  <span className="text-sm font-sans font-black text-peach mt-1">
                    {currentNode.endpoint}
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-left leading-none mt-2">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">REACTION OVERHEAD</span>
                  <span className="text-sm font-sans font-black text-white mt-1">
                    {currentNode.latency}
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-left leading-none mt-2">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">COORDINATE DENSITY</span>
                  <span className="text-xs font-mono text-mint mt-1">
                    [X:{currentNode.cx}, Y:{currentNode.cy}] Verified
                  </span>
                </div>
              </div>

              {/* Interactive explanation summary block */}
              <p className="font-sans text-xs text-gray-400 leading-relaxed mt-3 pt-3 border-t border-white/5">
                {currentNode.desc}
              </p>

              {/* Console logs simulator output */}
              <div className="p-3 bg-black border border-white/5 rounded-xl font-mono text-[9px] text-gray-400 text-left min-h-[75px] mt-4 max-h-[90px] overflow-y-auto pr-1 select-text">
                {pipelineLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1 leading-normal select-none">
                    <span className="text-mint font-bold">{">"}</span>
                    <p className={idx % 2 === 0 ? "text-gray-300 font-medium" : "text-gray-400"}>{log}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom aggregate indicator row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5 select-none">
              <div className="flex flex-col gap-1 leading-none">
                <span className="font-mono text-[8px] text-gray-500 uppercase">Aggregate rows</span>
                <span className="text-sm font-sans font-black text-white mt-1">
                  {tickerSpeed.toLocaleString()} /s
                </span>
              </div>

              <div className="flex flex-col gap-1 leading-none">
                <span className="font-mono text-[8px] text-gray-500 uppercase">NODE THREADS</span>
                <span className="text-sm font-sans font-bold text-mint mt-1">
                  64 ASYNC
                </span>
              </div>

              <div className="flex flex-col gap-1 leading-none">
                <span className="font-mono text-[8px] text-gray-500 uppercase">ACTIVE SOCKETS</span>
                <span className="text-sm font-sans font-black text-white mt-1">
                  128 TUNNELS
                </span>
              </div>

              <div className="flex flex-col gap-1 leading-none">
                <span className="font-mono text-[8px] text-gray-500 uppercase">DISPOSITION</span>
                <span className="text-sm font-sans font-black text-peach mt-1">
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
