import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Rocket, 
  Database, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  CloudLightning, 
  Share2, 
  Settings,
  Zap,
  Globe,
  Compass,
  Layers,
  Crosshair,
  Radio,
  RefreshCw,
  Sparkles,
  Binary,
  Activity,
  Terminal,
  ChevronRight
} from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Synthesizer / Wave Controls
  const [streamFrequency, setStreamFrequency] = useState<number>(5);
  const [amplitude, setAmplitude] = useState<number>(35);
  const [selectedNode, setSelectedNode] = useState<string>("snowflake");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [systemTime, setSystemTime] = useState<string>("12:00:00 UTC");
  const [radialAngle, setRadialAngle] = useState<number>(0);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [gearRotation, setGearRotation] = useState<number>(0);
  
  // Custom interactive waterfall floating nodes
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdCounter = useRef(0);

  const [logs, setLogs] = useState<string[]>([
    "SYS_STAGE_OK: Ingestion matrix listening on port 3000.",
    "ZOR-LIX CORE: Standing by for telemetry stream alignments.",
    "SECURITY: Universal SSL tunnel status validated."
  ]);

  // Handle UTC Millisecond Ticker, Rotating Orbital Feeds & Gear Physics
  useEffect(() => {
    const clockTimer = setInterval(() => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, "0");
      const baseTime = now.toISOString().slice(11, 19);
      setSystemTime(`${baseTime}.${ms} UTC`);
    }, 45);

    // Continuous gear physics & radar angle animation
    const motionTimer = setInterval(() => {
      setRadialAngle((prev) => (prev + 1.2) % 360);
      setGearRotation((prev) => (prev + (isSyncing ? 3.5 : 0.8)) % 360);
    }, 35);

    return () => {
      clearInterval(clockTimer);
      clearInterval(motionTimer);
    };
  }, [isSyncing]);

  // Particle updates (Interactive Waterfall Simulation inside Bento Box)
  useEffect(() => {
    const particleTimer = setInterval(() => {
      setParticles((prevParticles) => {
        // Increment Y coordinates & drop off particles that drift off screen
        const filtered = prevParticles
          .map((p) => ({ ...p, y: p.y + p.speed }))
          .filter((p) => p.y < 220);

        // Periodically inject random organic particles if count is low
        if (filtered.length < 15 && Math.random() > 0.4) {
          particleIdCounter.current += 1;
          const randomCol = Math.random() > 0.5 ? "#FFAF87" : "#C5E898";
          filtered.push({
            id: particleIdCounter.current,
            x: Math.random() * 260 + 20,
            y: 0,
            speed: Math.random() * 1.5 + 0.8,
            size: Math.random() * 3 + 1.5,
            opacity: Math.random() * 0.7 + 0.2,
            color: randomCol
          });
        }
        return filtered;
      });
    }, 40);

    return () => clearInterval(particleTimer);
  }, []);

  // Event trigger to manually inject massive event spikes
  const injectQuantumPeak = () => {
    const freshParticles: Particle[] = [];
    const colors = ["#FFAF87", "#C5E898", "#FFFFFF"];
    
    for (let i = 0; i < 12; i++) {
      particleIdCounter.current += 1;
      freshParticles.push({
        id: particleIdCounter.current,
        x: Math.random() * 260 + 20,
        y: Math.random() * -30 - 5,
        speed: Math.random() * 3.5 + 2,
        size: Math.random() * 4.5 + 2,
        opacity: Math.random() * 0.9 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setParticles((prev) => [...prev, ...freshParticles]);
    setLogs((prev) => [
      `SYS_ANOMALY: Manual high-frequency event spike injected! [${freshParticles.length} nodes]`,
      "STREAM_DENSITY: Dynamic queue latency peaked to 0.08ms.",
      ...prev.slice(0, 2)
    ]);
  };

  // Swapping core ingestion sources
  const handleNodeClick = (nodeId: string, nodeName: string) => {
    setSelectedNode(nodeId);
    setIsSyncing(true);

    const matchLogs = {
      snowflake: [
        "SNOWFLAKE_CONNECT: Discovered 8 active query clusters.",
        "COMPILER_PROBE: Handshake established under TLS_v1.3.",
        "INGRESS_OK: Live staging pipelines synced successfully."
      ],
      google: [
        "BIGQUERY_LINKED: Reconciling ledger records in real-time.",
        "CLUSTER_SCAN: Partition scanning of 14M rows compiled.",
        "DENSITY_INDEX: High fidelity vector stream secure."
      ],
      aws: [
        "S3_BUCKET_ATTACH: Listening to event notifications.",
        "SECURITY_DECRYPT: Decoying telemetry feeds with custom keys.",
        "INTEGRITY_OK: All cloud telemetry blocks verified."
      ],
      stripe: [
        "STRIPE_LEDGER: Syncing instant processing pipelines.",
        "EXCHANGE_RECONCILE: Currencies linked for universal index.",
        "DISPATCH_PEAK: Ledger pipeline established in 0.03ms."
      ]
    };

    setLogs([
      `ROUTING_TARGET: Ingestion hub routed to [${nodeName.toUpperCase()}]`,
      ...matchLogs[nodeId as keyof typeof matchLogs] || []
    ]);

    setTimeout(() => {
      setIsSyncing(false);
    }, 700);
  };

  const handleCalibration = () => {
    setIsCalibrating(true);
    setLogs((prev) => [
      "CALIBRATION_PROBE: Restructuring kinetic orbital frequencies...",
      "CALIBRATION_SUCCESS: Phase alignment synced cleanly.",
      ...prev.slice(0, 2)
    ]);
    setTimeout(() => {
      setIsCalibrating(false);
    }, 1200);
  };

  // Generates coordinate paths representing circular interactive sine-waves
  const generateCircularWavePath = () => {
    const cx = 150;
    const cy = 150;
    const baseRadius = 70 + amplitude * 0.4;
    const points: string[] = [];
    const step = 2.5; // High density angle step
    
    for (let theta = 0; theta <= 360; theta += step) {
      const rad = (theta * Math.PI) / 180;
      const waveFreq = streamFrequency;
      // Synthesize multi-harmonic sine modulation
      const offset = Math.sin(rad * waveFreq + (radialAngle * Math.PI) / 110) * (amplitude * 0.35)
                     + Math.cos(rad * 3 - (radialAngle * Math.PI) / 180) * 4;
      const r = baseRadius + offset;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${points.join(" L ")} Z`;
  };

  // Orbital satellites following the waveform boundaries
  const orbitalNodes = [0, 1, 2].map((i) => {
    const angleOffset = (360 / 3) * i;
    const speedMultiplier = streamFrequency * 0.25 + 0.45;
    const t = (radialAngle * speedMultiplier + angleOffset) % 360;
    const rad = (t * Math.PI) / 180;
    const r = 70 + amplitude * 0.4;
    const cx = 150;
    const cy = 150;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
      id: i,
    };
  });

  const databasesList = [
    { id: "snowflake", name: "Snowflake Cluster", icon: Database, speed: "0.08ms", color: "#FFAF87" },
    { id: "google", name: "Google BigQuery", icon: Cpu, speed: "0.12ms", color: "#C5E898" },
    { id: "aws", name: "Amazon AWS S3", icon: Share2, speed: "0.15ms", color: "#FFFFFF" },
    { id: "stripe", name: "Stripe Ledger", icon: CloudLightning, speed: "0.04ms", color: "#F59E0B" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 lg:py-24 overflow-hidden bg-[#020202] flex flex-col justify-center border-b border-white/5"
    >
      {/* Immersive Cyber Fog Ambient backlighting */}
      <div 
        className="absolute top-[8%] left-[15%] w-[800px] h-[350px] rounded-full bg-[#FFAF87]/10 blur-[160px] pointer-events-none transition-transform duration-1000"
        style={{ transform: `scale(${1 + amplitude * 0.004})` }}
      />
      <div 
        className="absolute bottom-[10%] right-[10%] w-[700px] h-[320px] rounded-full bg-[#C5E898]/5 blur-[150px] pointer-events-none"
      />

      {/* Modern High-density grid visual layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Main Responsive Grid Container */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Three-compartment asymmetric control layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ==========================================================
              SECTOR 1: SWISS-BRUTALIST INTEL-GRID & PARAMETER CONTROLS (Col: 5)
              ========================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full bg-black/40 border border-white/5 rounded-[36px] p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
            {/* Top neon indicator glowline */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFAF87]/40 to-transparent" />
            
            <div className="flex flex-col gap-6 text-left">
              {/* Cockpit system status identifier */}
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d0d0d] border border-white/10 text-[#FFAF87] text-[8px] font-mono tracking-widest uppercase select-none font-black"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAF87] animate-ping" />
                  <span>FLIGHTDECK CORE v3.9</span>
                </motion.div>
                <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                  SYS_ANCHOR // 04-26
                </div>
              </div>

              {/* Bold Brutalist Typographical Accent and Header */}
              <div className="flex flex-col gap-2 mt-2">
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-sans font-black tracking-tighter text-white leading-[1.05] uppercase">
                  Unify Stream <br />
                  <span className="text-[#FFAF87] italic font-serif lowercase tracking-normal font-normal">noise</span>.
                  <span className="block mt-1 font-light text-neutral-400">Discover latent</span>
                  <span className="block bg-gradient-to-r from-[#FFAF87] via-white to-[#C5E898] bg-clip-text text-transparent italic font-mono font-black tracking-widest normal-case text-3xl sm:text-4xl">
                    forecasting feeds.
                  </span>
                </h1>

                <p className="text-gray-400 font-light text-xs sm:text-xs max-w-xl leading-relaxed mt-4 select-none">
                  Consolidate high-frequency records, remote database queries, and volatile transaction ledgers directly into a beautiful circular cockpit map. Calibrate phase-modulators live to isolate signals cleanly.
                </p>
              </div>
            </div>

            {/* Micro Parameter Harmonizer Sliders */}
            <div className="flex flex-col gap-5 mt-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/5 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFAF87]/3 blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-[8.5px] text-[#FFAF87] tracking-widest uppercase block font-black">
                    HARMONIZER CONSTANTS
                  </span>
                  <span className="text-[7.5px] font-mono text-gray-500 uppercase">
                    Interactive Oscillations
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
                  {/* Frequency dial */}
                  <div className="flex flex-col gap-1.5 p-3 bg-[#050505] rounded-xl border border-white/5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-gray-400">
                      <span className="flex items-center gap-1 font-bold">
                        <Sliders className="w-3 h-3 text-[#FFAF87]" /> WAVE_FREQ:
                      </span>
                      <span className="text-[#FFAF87] font-black">{streamFrequency} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="1"
                      value={streamFrequency}
                      onChange={(e) => setStreamFrequency(Number(e.target.value))}
                      className="w-full accent-[#FFAF87] cursor-pointer bg-white/5 h-1 rounded-full mt-1.5"
                    />
                    <div className="flex items-center justify-between text-[6.5px] text-gray-600 font-mono mt-0.5 font-bold">
                      <span>1 HZ MIN</span>
                      <span>12 HZ PEAK</span>
                    </div>
                  </div>

                  {/* Amplitude dial */}
                  <div className="flex flex-col gap-1.5 p-3 bg-[#050505] rounded-xl border border-white/5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-gray-400">
                      <span className="flex items-center gap-1 font-bold">
                        <Zap className="w-3 h-3 text-[#C5E898]" /> WAVE_AMP:
                      </span>
                      <span className="text-[#C5E898] font-black">{amplitude}px</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="75"
                      step="5"
                      value={amplitude}
                      onChange={(e) => setAmplitude(Number(e.target.value))}
                      className="w-full accent-[#C5E898] cursor-pointer bg-white/5 h-1 rounded-full mt-1.5"
                    />
                    <div className="flex items-center justify-between text-[6.5px] text-gray-600 font-mono mt-0.5 font-bold">
                      <span>5PX MIN</span>
                      <span>75PX MAX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action commands navigation */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full mt-2">
                <button
                  onClick={() => onNavigate("pipeline")}
                  className="flex-1 px-5 py-3.5 rounded-xl bg-gradient-to-tr from-[#FFAF87] via-white to-[#C5E898] text-black font-sans font-black text-[10.5px] tracking-widest uppercase hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg select-none"
                >
                  Explore Solutions
                  <Rocket className="w-4 h-4 stroke-[2.5px] text-neutral-900" />
                </button>
                
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="flex-1 px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-sans font-bold text-[10.5px] tracking-widest uppercase hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
                >
                  Launch Console
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5E898] animate-pulse" />
                </button>
              </div>
            </div>
          </div>

          {/* ==========================================================
              SECTOR 2: KINETIC RADAR WAVE SCOPE & RADIAL HARMONIZER (Col: 4)
              ========================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full bg-black/60 border border-white/10 rounded-[36px] p-6 relative overflow-hidden backdrop-blur-md shadow-2xl select-none group">
            {/* Pulsating central energy glow sphere */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FFAF87]/5 blur-xl pointer-events-none"
              style={{ transform: `translate(-50%, -50%) scale(${1 + amplitude * 0.006})` }}
            />

            {/* Scope Identifier header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="font-mono text-[8px] text-[#FFAF87] tracking-widest uppercase flex items-center gap-1.5 font-bold">
                <Radio className="w-4 h-4 text-[#FFAF87] animate-pulse" />
                ORBITAL_SCOPE_V3
              </span>
              <button 
                onClick={handleCalibration}
                title="Calibrate Circular Orbit Phase"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:border-[#FFAF87]/40 border border-transparent transition-all cursor-pointer focus:outline-none"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-gray-400 hover:text-white ${isCalibrating ? "animate-spin text-[#C5E898]" : ""}`} />
              </button>
            </div>

            {/* Kinetic SVG Scope Screen with micro-ticks */}
            <div className="w-full flex items-center justify-center py-6 my-auto">
              <div className="relative w-[280px] h-[280px] flex items-center justify-center border border-white/5 rounded-full bg-black/30">
                
                {/* Concentric crosshair dials */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[84%] h-[84%] rounded-full border border-dashed border-white/5" />
                  <div className="w-[60%] h-[60%] rounded-full border border-dashed border-white/5" />
                  <div className="w-[36%] h-[36%] rounded-full border border-white/5" />
                  
                  {/* Axis dividers */}
                  <div className="absolute w-full h-[0.75px] bg-white/5" />
                  <div className="absolute h-full w-[0.75px] bg-white/5" />
                  
                  {/* Compass markings */}
                  <span className="absolute top-1.5 text-[6px] font-mono text-gray-500 tracking-widest">000° TRAC</span>
                  <span className="absolute right-1.5 text-[6px] font-mono text-gray-500 tracking-widest">090° SYNC</span>
                  <span className="absolute bottom-1.5 text-[6px] font-mono text-gray-500 tracking-widest">180° CORE</span>
                  <span className="absolute left-1.5 text-[6px] font-mono text-gray-500 tracking-widest">270° INP</span>
                </div>

                {/* Micro rotating ring ticks */}
                <svg 
                  className="absolute inset-[10px] w-[260px] h-[260px] pointer-events-none opacity-30 transition-transform duration-300" 
                  viewBox="0 0 200 200"
                  style={{ transform: `rotate(${-radialAngle}deg)` }}
                >
                  <circle cx="100" cy="100" r="95" stroke="#FFF" strokeWidth="0.5" strokeDasharray="1 10" fill="none" />
                </svg>

                {/* Concentric Live Waves SVG Plot */}
                <svg className="w-full h-full absolute inset-0 z-10 pointer-events-none" viewBox="0 0 300 300">
                  {/* Scanning sweep radial line */}
                  <line 
                    x1="150" 
                    y1="150" 
                    x2={150 + 130 * Math.cos((radialAngle * Math.PI) / 180)} 
                    y2={150 + 130 * Math.sin((radialAngle * Math.PI) / 180)} 
                    stroke="rgba(255,175,135,0.22)" 
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                  
                  {/* Main sine modulated circle path */}
                  <motion.path
                    animate={{ d: generateCircularWavePath() }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                    stroke="url(#customScopeGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Nodes orbiting on path boundaries */}
                  {orbitalNodes.map((node) => (
                    <circle
                      key={node.id}
                      cx={node.x}
                      cy={node.y}
                      r="4"
                      fill={node.id === 0 ? "#FFAF87" : node.id === 1 ? "#FFFFFF" : "#C5E898"}
                      style={{ filter: "drop-shadow(0px 0px 4px rgba(255,175,135,0.8))" }}
                    />
                  ))}

                  {/* Gradient mapping for standard wave */}
                  <defs>
                    <linearGradient id="customScopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFAF87" />
                      <stop offset="50%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#C5E898" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Central trigger key button */}
                <div className="relative z-20 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-black border border-white/10 shadow-2xl group-hover:border-[#FFAF87]/60 transition-colors">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#FFAF87]/20 animate-spin [animation-duration:10s]" />
                  <Crosshair className="w-5 h-5 text-[#FFAF87] group-hover:scale-125 transition-transform" />
                </div>
              </div>
            </div>

            {/* Micro Operational diagnostic values */}
            <div className="border-t border-white/5 pt-3">
              <div className="grid grid-cols-3 gap-2 text-center select-none font-bold">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[6.5px] text-gray-500 uppercase">SIGNAL_SPAN</span>
                  <span className="font-mono text-[9px] text-white font-extrabold uppercase">
                    {(streamFrequency * 18.5 + 23.4).toFixed(1)}° RAD
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 border-x border-white/5">
                  <span className="font-mono text-[6.5px] text-gray-500 uppercase">FEED_CALIB</span>
                  <span className="font-mono text-[9px] text-[#C5E898] font-extrabold uppercase">
                    99.98%
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[6.5px] text-gray-500 uppercase">PHASE_SWEEP</span>
                  <span className="font-mono text-[9px] text-[#FFAF87] font-extrabold uppercase">
                    {radialAngle.toFixed(0)}° DEG
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================================
              SECTOR 3: INTERLOCKING ROTOR SYSTEM & WAVE WATERFALL HUD (Col: 3)
              ========================================================== */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-4 h-full bg-black/40 border border-white/5 rounded-[36px] p-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5E898]/30 to-transparent" />
            
            {/* Live UTC Millisecond Clock */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-black border border-white/5 text-left select-none relative overflow-hidden">
              <div className="absolute top-1 right-2 flex items-center gap-1 font-mono text-[6.5px] text-[#C5E898] font-extrabold">
                <span className="w-1 h-1 rounded-full bg-[#C5E898] animate-ping" />
                SECURE
              </div>
              <span className="font-mono text-[7px] text-gray-500 tracking-wider">HARNESS_UTC_CLOCK</span>
              <div className="font-mono text-[11px] text-white font-black tracking-wider flex items-center justify-between">
                <span>{systemTime}</span>
              </div>
            </div>

            {/* Interlocking physical gear assembly & database switch board */}
            <div className="flex flex-col text-left">
              <div className="flex items-center justify-between mb-2 select-none">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-bold">
                  INGESTION_TUNNEL_GEARS:
                </span>
                
                {/* Visual indicator representation */}
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[7px] text-gray-400 font-bold uppercase">PHYS_ENGAGED</span>
                  <Activity className="w-2.5 h-2.5 text-[#C5E898] animate-pulse" />
                </div>
              </div>

              {/* Interactive sources buttons */}
              <div className="flex flex-col gap-2" id="database-connector-nodes">
                {databasesList.map((db) => {
                  const DbIcon = db.icon;
                  const isActive = selectedNode === db.id;

                  return (
                    <button
                      key={db.id}
                      onClick={() => handleNodeClick(db.id, db.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-300 relative overflow-hidden select-none cursor-pointer group ${
                        isActive
                          ? "bg-gradient-to-r from-[#121212] to-[#040404] border-[#FFAF87] shadow-[0_4px_12px_rgba(255,175,135,0.05)] scale-[1.01]"
                          : "bg-black/60 border-white/5 hover:border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${isActive ? "bg-[#FFAF87] text-black" : "bg-white/5 text-gray-400"} transition-all`}>
                          <DbIcon className={`w-3.5 h-3.5 ${isSyncing && isActive ? "animate-spin" : ""}`} />
                        </div>
                        <h4 className="font-sans font-black text-[10px] text-white tracking-widest uppercase">
                          {db.id}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* High-fidelity gear representation */}
                        <svg className={`w-6 h-6 transform transition-all ${isActive ? "text-[#FFAF87]" : "text-gray-600 group-hover:text-gray-400"}`} viewBox="0 0 24 24" style={{ transform: `rotate(${isActive ? gearRotation : -gearRotation * 0.4}deg)` }}>
                          <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.47,5.34 14.86,5.08L14.47,2.42C14.43,2.18 14.22,2 13.97,2H9.97C9.72,2 9.51,2.18 9.47,2.42L9.08,5.08C8.47,5.34 7.9,5.66 7.38,6.05L4.89,5.05C4.67,4.96 4.4,5.05 4.28,5.27L2.28,8.73C2.16,8.95 2.21,9.22 2.4,9.37L4.51,11C4.47,11.34 4.45,11.67 4.45,12C4.45,12.33 4.47,12.65 4.51,12.97L2.4,14.63C2.21,14.78 2.16,15.05 2.28,15.27L4.28,18.73C4.4,18.95 4.67,19.03 4.89,18.95L7.38,17.95C7.9,18.34 8.47,18.66 9.08,18.92L9.47,21.58C9.51,21.82 9.72,22 9.97,22H13.97C14.22,22 14.43,21.82 14.47,21.58L14.86,18.92C15.47,18.66 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Particle Waterfall simulation and logs */}
            <div className="rounded-2xl bg-black border border-white/5 flex flex-col p-4 relative overflow-hidden text-left min-h-[170px]">
              
              {/* Floating active event particles canvas overlay */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 select-none">
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className="absolute rounded-full transition-all duration-300"
                    style={{
                      left: `${p.x}px`,
                      top: `${p.y}px`,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      opacity: p.opacity,
                      boxShadow: `0 0 6px ${p.color}`
                    }}
                  />
                ))}
              </div>

              {/* Header inside debugging waterfall card */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 z-10 relative select-none">
                <span className="font-mono text-[8px] text-[#C5E898] uppercase tracking-widest block font-bold flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-[#C5E898]" />
                  TELEMETRY_LOGS
                </span>
                
                {/* Simulated event triggers */}
                <button 
                  onClick={injectQuantumPeak}
                  className="font-mono text-[7px] text-[#FFAF87] font-black border border-[#FFAF87]/20 px-1.5 py-0.5 rounded bg-[#FFAF87]/10 hover:bg-[#FFAF87] hover:text-black transition-colors cursor-pointer select-none"
                >
                  INJECT_PEAK
                </button>
              </div>

              {/* Scrolling log text stream */}
              <div className="flex-grow flex flex-col gap-1 pr-1 overflow-y-auto max-h-[90px] z-10 relative select-none">
                {logs.map((log, idx) => (
                  <div key={idx} className="font-mono text-[8.5px] leading-normal flex items-start gap-1">
                    <span className="text-[#FFAF87] font-semibold">{">"}</span>
                    <p className={idx === 0 && isSyncing ? "text-[#FFAF87] animate-pulse" : idx === 0 ? "text-[#C5E898] font-semibold" : "text-gray-400"}>
                      {log}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Static footer metadata for aesthetic integrity */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[7.5px] text-gray-500 select-none text-left">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5E898]" /> ENCRYPTED_STREAMS
              </span>
              <span>DELAY: <span className="text-white font-bold">{isSyncing ? "..." : "0.04 ms"}</span></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
