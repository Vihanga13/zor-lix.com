import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Server, 
  CloudLightning, 
  Link2, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Layers, 
  Terminal as TermIcon, 
  Binary, 
  Check, 
  Eye, 
  Fingerprint, 
  AlertTriangle 
} from "lucide-react";

interface IntegrationNode {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  latency: string;
  throughput: string;
  cipher: string;
  status: "secure" | "syncing" | "locked";
}

export default function Integrations() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [keyStrength, setKeyStrength] = useState<number>(256);
  const [algorithm, setAlgorithm] = useState<"aes" | "chacha" | "kyber">("aes");
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [entropyScore, setEntropyScore] = useState<number>(99.98);
  const [sessionNonce, setSessionNonce] = useState<string>("x7B8_9C1E_0FA3_DE82");
  const [auditLogs, setAuditLogs] = useState<string[]>([
    "SYS_LEDGER: Primary handshake protocols initialized over TLS_v1.3.",
    "CIPHER_LOAD: Ephemeral ECDH key Exchange established.",
    "INTEGRATION_OK: Awaiting secure node selection signals."
  ]);

  const nodesList: IntegrationNode[] = [
    { 
      id: "snowflake", 
      name: "Snowflake Cluster", 
      category: "Data Warehouse", 
      icon: Database, 
      latency: "0.08ms", 
      throughput: "4.8 GB/s",
      cipher: "Kyber-1024 Post-Quantum",
      status: "secure"
    },
    { 
      id: "bigquery", 
      name: "Google BigQuery", 
      category: "Analytics Engine", 
      icon: Cpu, 
      latency: "0.12ms", 
      throughput: "8.2 GB/s",
      cipher: "AES-GCM-256 Ephemeral",
      status: "secure"
    },
    { 
      id: "s3_bucket", 
      name: "Amazon S3 Lake", 
      category: "Parquet Store", 
      icon: Server, 
      latency: "0.15ms", 
      throughput: "3.1 GB/s",
      cipher: "ChaCha20-Poly1305 Strict",
      status: "secure"
    },
    { 
      id: "stripe", 
      name: "Stripe Transaction", 
      category: "Ledger Channel", 
      icon: CloudLightning, 
      latency: "0.04ms", 
      throughput: "1.4 GB/s",
      cipher: "AES-GCM-256 Hardware",
      status: "secure"
    },
    { 
      id: "postgres", 
      name: "PostgreSQL Replica", 
      category: "Relational DB", 
      icon: Link2, 
      latency: "0.02ms", 
      throughput: "9.5 GB/s",
      cipher: "Kyber-768 Ephemeral",
      status: "secure"
    }
  ];

  // Rotate custom nonces and slightly drift entropy score for continuous visual feel
  useEffect(() => {
    const timer = setInterval(() => {
      const hexChars = "0123456789ABCDEF";
      let randomNonce = "x";
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          randomNonce += hexChars[Math.floor(Math.random() * 16)];
        }
        if (i < 3) randomNonce += "_";
      }
      setSessionNonce(randomNonce);
      setEntropyScore(parseFloat((99.95 + Math.random() * 0.04).toFixed(3)));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Update audit log when changing nodes
  const handleNodeSelect = (idx: number) => {
    setSelectedIdx(idx);
    const targetNode = nodesList[idx];
    
    const newLogs = [
      `HANDSHAKE_TRIGGER: Requested key exchange from [${targetNode.name.toUpperCase()}]`,
      `VERIFICATION_BOUNDS: Exchanging salts ... Nonce: [${sessionNonce}]`,
      `MUTUAL_TRUST_OK: Connected using ${targetNode.cipher} ... latency: ${targetNode.latency}`
    ];
    setAuditLogs(newLogs);
  };

  // Perform full manual Key rotation cascade animation
  const handleKeyRotation = () => {
    setIsRotating(true);
    
    setAuditLogs([
      "REKEY_CASCADE_INIT: Revoking existing TLS certificates...",
      `ENTROPY_RESET: Seeding random values via high-entropy hardware clock...`,
      "SUCCESS: Re-generation of symmetric keys complete for all source gateways!"
    ]);

    setTimeout(() => {
      setIsRotating(false);
    }, 1500);
  };

  const currentSelectedNode = nodesList[selectedIdx];
  const SelectedIcon = currentSelectedNode.icon;

  return (
    <section 
      id="integrations" 
      className="py-24 relative bg-black overflow-hidden border-t border-white/5"
    >
      {/* Absolute Ambient Flares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-peach/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[550px] h-[350px] rounded-full bg-mint/5 blur-[130px] pointer-events-none" />

      {/* Grid Alignment Layout Guides */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_90%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* Asymmetric Header */}
        <div className="max-w-3xl mb-16 text-left">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-peach text-2xs font-mono tracking-widest uppercase shadow-md select-none"
            id="integrations-pill"
          >
            <Fingerprint className="w-3.5 h-3.5 text-peach animate-pulse" />
            <span>CRYPTOGRAPHIC SEGMENTATION // ZERO_TRUST</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white mt-6 mb-4" id="integrations-title">
            Cryptographic Ring Buffer
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl" id="integrations-description">
            Audit secure external datasets and active handshake connections built on a localized zero-knowledge rotation plane. Swap active nodes on the orbital track to inspect active cipher signatures.
          </p>
        </div>

        {/* Outer 12-Column Grid splitting Orbit Ring & Diagnostics Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="cryptographic-deck-container">
          
          {/* COLUMN A: The Orbital Cipher Wheel & Satellites (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-[#080808] to-black border border-white/5 rounded-3xl p-8 relative overflow-hidden min-h-[500px]">
            {/* Soft geometric orbit lines in background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,175,135,0.03)_0%,transparent_100%)] pointer-events-none" />
            
            {/* Primary Physical Concentric Orbit Track Rings */}
            <div className="absolute w-[280px] h-[280px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-[180px] h-[180px] border border-dashed border-white/5 rounded-full pointer-events-none" />

            <div className="relative w-[340px] h-[340px] flex items-center justify-center">
              
              {/* CENTER HUB INDICATION: Visual Cryptographic Vault Core */}
              <motion.div 
                animate={{ rotate: isRotating ? 360 : 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
                className={`w-[110px] h-[110px] rounded-full bg-[#0d0d0d] border ${
                  isRotating ? "border-peach" : "border-white/10"
                } flex flex-col items-center justify-center p-3 relative z-20 shadow-xl select-none`}
              >
                <div className="absolute inset-1 rounded-full border border-dashed border-white/5 animate-spin duration-10000" />
                
                {/* Active encryption status icon */}
                <div className="p-2.5 rounded-full bg-peach/10 text-peach mb-1 relative z-10">
                  <SelectedIcon className={`w-5 h-5 ${isRotating ? "animate-spin" : ""}`} />
                </div>
                
                <span className="font-mono text-[8px] text-gray-400 block tracking-tight uppercase leading-none text-center max-w-[90px] truncate">
                  {currentSelectedNode.name}
                </span>
                
                <span className="font-mono text-[7px] text-mint uppercase font-black block mt-1 tracking-wider">
                  VERIFIED
                </span>
              </motion.div>

              {/* SATELLITES DRIPPED RADIALLY: Interactive Orbital Keys */}
              {nodesList.map((node, idx) => {
                const NodeIcon = node.icon;
                const isSelected = selectedIdx === idx;
                
                // Calculate physical coordinates for circular arrangements
                const angle = (idx * (360 / nodesList.length)) * (Math.PI / 180);
                const radius = 140; // Pixel radius distance from Center Hub Node
                const x = Math.round(Math.cos(angle) * radius);
                const y = Math.round(Math.sin(angle) * radius);

                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeSelect(idx)}
                    className="absolute cursor-pointer transition-all duration-300 group z-30"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    {/* Glowing orbit line linking Satellite to the center */}
                    <svg className="absolute -z-10 w-48 h-48 -top-24 -left-24 pointer-events-none">
                      <line 
                        x1="96" 
                        y1="96" 
                        x2={96 - x} 
                        y2={96 - y} 
                        stroke={isSelected ? "#FFAF87" : "rgba(255,255,255,0.03)"} 
                        strokeWidth={isSelected ? "1.5" : "0.5"}
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />
                    </svg>

                    <div className="relative">
                      {/* Satellite Node Core button */}
                      <div className={`p-4 rounded-full border text-center transition-all duration-300 ${
                        isSelected 
                          ? "bg-black border-peach text-peach scale-110 shadow-[0_4px_16px_rgba(255,175,135,0.2)]" 
                          : "bg-[#0b0b0b] border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                      }`}>
                        <NodeIcon className="w-4 h-4" />
                      </div>

                      {/* Display pill tag floating next to satellites, visible on hover or when Selected */}
                      <div className={`absolute left-1/2 -translate-x-1/2 top-11 px-2 py-1 rounded bg-[#0d0d0d] border border-white/10 text-[8px] font-mono tracking-wider uppercase text-white whitespace-nowrap transition-all select-none ${
                        isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                      }`}>
                        {node.name}
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Bottom System Identity and entropy scorecard metrics */}
            <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-white/5 text-left font-mono">
              <div className="bg-[#050505] p-3 rounded-2xl border border-white/5">
                <span className="text-[8px] text-gray-500 uppercase block mb-1">ENTROPY STABILITY Score</span>
                <span className="text-sm font-sans font-black text-mint">{entropyScore}%</span>
              </div>
              <div className="bg-[#050505] p-3 rounded-2xl border border-white/5">
                <span className="text-[8px] text-gray-500 uppercase block mb-1">ACTIVE NONCE HEX</span>
                <span className="text-xs text-white uppercase font-bold tracking-tight">{sessionNonce}</span>
              </div>
            </div>

          </div>

          {/* COLUMN B: Cryptographic Handshake Audit & Controls (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-black border border-white/10 rounded-3xl relative overflow-hidden text-left" id="cryptographic-audit-panel">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />

            {/* Panel Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 gap-3 select-none">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-peach/10 rounded-xl text-peach">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-sm text-white leading-none">
                    ZERO-ACCESS ENVELOPE VAULT
                  </h3>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1 block">
                    Zero-Knowledge handshake configurations
                  </span>
                </div>
              </div>

              <div className="font-mono text-[9px] text-[#C5E898] bg-[#C5E898]/10 border border-[#C5E898]/20 px-3 py-1.5 rounded-xl block leading-none w-fit font-bold">
                PROTOCOL STATUS // TLS_A_1.3
              </div>
            </div>

            {/* Interactive Selector knobs */}
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              
              {/* Selector Block 1: Symmetric Key Strength slider */}
              <div className="flex flex-col gap-2 p-4 bg-[#080808] border border-white/5 rounded-2xl select-none">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>KEY CONFIGURATION STRENGTH:</span>
                  <span className="text-peach font-bold">{keyStrength}-bit Key</span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="128"
                  value={keyStrength}
                  onChange={(e) => setKeyStrength(Number(e.target.value))}
                  className="w-full accent-peach cursor-pointer bg-white/5 h-1 rounded-full mt-2"
                />
                <div className="flex items-center justify-between text-[7.5px] text-gray-600 font-mono mt-1">
                  <span>128-BIT NORMAL</span>
                  <span>512-BIT MAX INTENSE</span>
                </div>
              </div>

              {/* Selector Block 2: Symmetric Algorithm Toggles */}
              <div className="flex flex-col gap-2 p-4 bg-[#080808] border border-white/5 rounded-2xl select-none">
                <span className="text-[11px] font-mono text-gray-400 block pb-1">
                  CRYPTOGRAPHIC MATRIX TYPE:
                </span>
                
                <div className="grid grid-cols-3 gap-2">
                  {(["aes", "chacha", "kyber"] as const).map((alg) => (
                    <button
                      key={alg}
                      onClick={() => setAlgorithm(alg)}
                      className={`py-1.5 rounded-lg border text-center font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                        algorithm === alg
                          ? "bg-mint border-mint text-black font-extrabold"
                          : "bg-black border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      {alg === "aes" ? "AES-GCM" : alg === "chacha" ? "CHACHA" : "KYBER"}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Dynamic Handshake Output Field */}
            <div className="bg-[#050505] p-5 rounded-2xl border border-white/5 mb-6 flex flex-col justify-between relative min-h-[190px]">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">
                  HOT_CIPHER_TELEMETRY READOUT
                </span>
                <span className="font-mono text-[8px] text-peach bg-peach/10 px-2 py-0.5 rounded-lg select-none">
                  DECRYPTION_OFFLOADED
                </span>
              </div>

              {/* Dynamic properties representation of current selected node */}
              <div className="grid sm:grid-cols-2 gap-4 w-full py-2">
                <div className="flex flex-col gap-1 text-left leading-none">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">SELECTED ORIGIN</span>
                  <span className="text-sm font-sans font-black text-white mt-1">
                    {currentSelectedNode.name}
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-left leading-none">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">CIPHER ENCRYPT SYMMETRIC</span>
                  <span className="text-sm font-sans font-black text-peach mt-1">
                    {currentSelectedNode.cipher}
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-left leading-none mt-2">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">NETWORK BANDWIDTH CAP</span>
                  <span className="text-sm font-sans font-black text-white mt-1">
                    {currentSelectedNode.throughput}
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-left leading-none mt-2">
                  <span className="font-mono text-[8px] text-gray-500 uppercase">STAGING INTEGRITY</span>
                  <span className="text-sm font-sans font-black text-mint mt-1 flex items-center gap-1">
                    <Check className="w-4 h-4 text-mint" /> 100% SHIELDED
                  </span>
                </div>
              </div>

              {/* Real-Time Live Encrypted Terminal logs console */}
              <div className="p-3 bg-black border border-white/5 rounded-xl font-mono text-[10px] text-gray-400 text-left min-h-[85px] mt-4 max-h-[100px] overflow-y-auto pr-1">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1 select-none leading-normal">
                    <span className="text-peach font-bold">{">"}</span>
                    <p className={idx === 2 ? "text-mint font-semibold" : ""}>{log}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom buttons panel with manually initiated Cert Rotation Cascade */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button
                onClick={handleKeyRotation}
                disabled={isRotating}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-tr from-peach via-white to-mint text-black font-sans font-black text-xs tracking-wider uppercase rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer select-none"
                id="rekey-cascade-trigger"
              >
                {isRotating ? "cascade rekeying..." : "Cascade Rekey Certs"}
                <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
              </button>

              <div className="flex items-center gap-2 text-2xs font-mono text-gray-500 uppercase">
                <ShieldCheck className="w-4 h-4 text-mint shrink-0" />
                <span>Zero client secrets are stored within cloud containers.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
