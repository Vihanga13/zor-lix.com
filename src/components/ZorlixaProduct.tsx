import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
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
  HelpCircle,
  Dribbble,
  Inbox,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ZorlixaProductProps {
  onBackToLanding: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function ZorlixaProduct({ onBackToLanding, onNavigate }: ZorlixaProductProps) {
  // 3D Engine Sliders State
  const [waveFreq, setWaveFreq] = useState<number>(5);
  const [waveAmp, setWaveAmp] = useState<number>(32);
  
  // Cost Configurator State
  const [selectedTier, setSelectedTier] = useState<"developer" | "scale" | "enterprise">("scale");
  const [securityLevel, setSecurityLevel] = useState<"aes" | "e2ee" | "quantum">("e2ee");
  const [selectedAddons, setSelectedAddons] = useState({
    slackFeeder: true,
    pdfBriefing: false,
    sqlAgent: true
  });

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Mesh References for Real-Time Manipulation
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const outerShellRef = useRef<THREE.Mesh | null>(null);
  const scanningRingRef = useRef<THREE.Mesh | null>(null);
  const matrixParticlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Thread-safe mutable refs to handle real-time slider syncing without resetting WebGL Context
  const freqRef = useRef<number>(waveFreq);
  const ampRef = useRef<number>(waveAmp);

  // Sync sliders directly to ref targets
  useEffect(() => {
    freqRef.current = waveFreq;
    ampRef.current = waveAmp;
  }, [waveFreq, waveAmp]);

  // Telemetry Log Updates
  const [sysTick, setSysTick] = useState<string>("0.012ms");
  const [consensusHash, setConsensusHash] = useState<string>("ZOR_ECDSA_12A9");
  const [logs, setLogs] = useState<string[]>([
    "3D_ENGINE: WebGL2 context verified, running hard iron layers.",
    "VOLUMETRIC: Core matrices responding flawlessly to input constants.",
    "SECURITY: Nvidia Triton multi-instance clusters validated, safe execution loops."
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const ms = (0.010 + Math.random() * 0.008).toFixed(3);
      setSysTick(`${ms}ms`);
      setConsensusHash(`ZOR_ECDSA_${Math.floor(Math.random() * 9000 + 1000).toString(16).toUpperCase()}`);
      
      const newLogsList = [
        "TELEMETRY: Packets sync loop running at 120 FPS.",
        `REACTOR: Concurrency scaling adjusted to ${waveFreq * 16} active nodes.`,
        `COMPILER: Squeezing density bounds at ${(waveAmp * 0.4).toFixed(1)}% limit.`,
        "INGRESS_OK: Zero packet drift recorded in ledger.",
        "MATRIX: Volumetric point-cloud aligned smoothly."
      ];
      const randomLog = newLogsList[Math.floor(Math.random() * newLogsList.length)];
      setLogs(prev => [randomLog, ...prev.slice(0, 4)]);
    }, 2500);
    return () => clearInterval(timer);
  }, [waveFreq, waveAmp]);

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!mountRef.current) return;
    
    // --- SCENE & WORLD SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050506); // Pure dark industrial void
    scene.fog = new THREE.FogExp2(0x050506, 0.015);
    sceneRef.current = scene;
    
    // --- CAMERA ENGINE ---
    const camera = new THREE.PerspectiveCamera(
      45, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 2.0, 6.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    // --- RENDER ENGINE ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // --- HIGH-CONTRAST MONOCHROMATIC LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0a0a0f); // Dark low-level ambient
    scene.add(ambientLight);
    
    const primaryAccentLight = new THREE.PointLight(0xffaf87, 2.0, 40); // Targeted Accent Color (#ffaf87)
    primaryAccentLight.position.set(-4, 3, 4);
    scene.add(primaryAccentLight);
    
    const fillAccentLight = new THREE.PointLight(0xffaf87, 0.8, 30); // Balanced Back Light
    fillAccentLight.position.set(4, -2, 3);
    scene.add(fillAccentLight);
    
    const structuralLight = new THREE.DirectionalLight(0xffffff, 0.4); // Clean white geometric highlights
    structuralLight.position.set(0, 5, -2);
    scene.add(structuralLight);
    
    // --- CORE GEOMETRY 01: SOLID TACTICAL OCTAHEDRON ---
    const coreGeo = new THREE.OctahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      emissive: 0x2b1c14, // Very muted warm metallic baseline
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;
    
    // --- CORE GEOMETRY 02: WIREFRAME ICOSAHEDRON SHELL ---
    const shellGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xffaf87, // Accent wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerShell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(outerShell);
    outerShellRef.current = outerShell;
    
    // --- SCANNING DATA PLANE (HORIZONTAL TRACKING RING) ---
    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 6, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffaf87,
      emissive: 0xffaf87,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    });
    const scanningRing = new THREE.Mesh(ringGeo, ringMat);
    scanningRing.rotation.x = Math.PI / 2;
    scene.add(scanningRing);
    scanningRingRef.current = scanningRing;
    
    // --- DATA GRID VOLUMETRIC PARTICLES ---
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.5;
      particlePositions[i * 3] = radius * Math.cos(theta);
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      particlePositions[i * 3 + 2] = radius * Math.sin(theta);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0xffaf87,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const matrixParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(matrixParticles);
    matrixParticlesRef.current = matrixParticles;
    
    // --- BACKGROUND STRUCTURAL STARFIELD ---
    const starGeo = new THREE.BufferGeometry();
    const starCount = 400;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 150;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x334155, size: 0.07 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    
    let runtime = 0;
    
    // --- TICK ANIMATION LOOP ---
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      runtime += 0.016;
      
      const normFreq = (freqRef.current - 1) / 11;
      const normAmp = (ampRef.current - 10) / 110;
      
      const dynamicRotSpeed = 0.5 * (0.3 + normFreq * 2.0);
      const rhythmicPulse = Math.sin(runtime * (2.0 + normFreq * 4.0)) * (normAmp * 0.4);
      
      // Update Core Mechanics
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y += 0.01 * dynamicRotSpeed;
        coreMeshRef.current.rotation.x += 0.007 * dynamicRotSpeed;
        
        const coreScale = 1.0 + rhythmicPulse;
        coreMeshRef.current.scale.set(coreScale, coreScale, coreScale);
        
        const mat = coreMeshRef.current.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.emissiveIntensity = 0.1 + normAmp * 1.8;
        }
      }
      
      // Update Counter-Rotating Shell Frame
      if (outerShellRef.current) {
        outerShellRef.current.rotation.y -= 0.005 * dynamicRotSpeed;
        outerShellRef.current.rotation.z += 0.003 * dynamicRotSpeed;
        
        const shellScale = 1.0 - rhythmicPulse * 0.5;
        outerShellRef.current.scale.set(shellScale, shellScale, shellScale);
      }
      
      // Translate Scanning Ring along Y axis
      if (scanningRingRef.current) {
        scanningRingRef.current.position.y = Math.sin(runtime * 1.5) * 1.8;
        scanningRingRef.current.rotation.z += 0.005;
      }
      
      // Manipulate Data Particles 
      if (matrixParticlesRef.current) {
        matrixParticlesRef.current.rotation.y += 0.002 * dynamicRotSpeed;
        const pMat = matrixParticlesRef.current.material as THREE.PointsMaterial;
        if (pMat) {
          pMat.size = 0.03 + (normAmp * 0.06);
          pMat.opacity = 0.3 + (normAmp * 0.4);
        }
      }
      
      starField.rotation.y += 0.0001;
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    
    // --- RESOURCE TEARDOWN PIPELINE ---
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      rendererRef.current?.dispose();
    };
  }, []);

  // Cost calculations
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

  return (
    <div id="zorlixa-product-root" className="min-h-screen bg-[#050506] text-[#D1D5DB] font-mono p-4 antialiased selection:bg-[#ffaf87]/30 selection:text-white relative overflow-x-hidden">
      
      {/* Telemetry Ticker */}
      <div className="w-full border-b border-white/10 pb-2.5 mb-4 flex items-center justify-between text-[9px] text-slate-500 tracking-tight overflow-x-auto whitespace-nowrap gap-6 select-none">
        <div className="flex items-center gap-4">
          <span>[ CORE TELEMETRY SYNC: ONLINE ]</span>
          <span>LATENCY: <span className="text-white">{sysTick}</span></span>
          <span>GRAPH INTERNALS: VECTORS VALIDATED</span>
          <span>ANOMALY DETECTOR: 0 FLAGS</span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <span>COMPUTE_PIPELINE_ACTIVE</span>
          <span>RENDER QUALITY: <span className="text-white">99.98%</span></span>
          <span>3D RENDER: <span className="text-[#ffaf87]">VANILLA THREE.JS CORE</span></span>
          <span>SYS_STATUS: OPTIMAL</span>
        </div>
      </div>
      
      {/* ===================== CONTROL BAR HEADER ===================== */}
      <header className="w-full border border-white/10 bg-[#0b0c0e]/60 backdrop-blur-md rounded px-4 py-3 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToLanding}
            className="group flex items-center gap-2 border border-white/10 hover:border-[#ffaf87] bg-black text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-[#ffaf87] px-3.5 py-1.5 rounded cursor-pointer transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Core Platform</span>
          </button>
          <span className="text-[9px] text-[#ffaf87] border border-[#ffaf87]/20 bg-[#ffaf87]/5 px-2 py-0.5 rounded uppercase tracking-wider font-bold hidden sm:inline-block">
            SSL_SECURE | NVIDIA INCEPTION SHOWCASE
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-4 text-[10px] uppercase font-bold tracking-wider text-slate-400 font-sans">
          <button onClick={onBackToLanding} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">01 // Home</button>
          <button onClick={() => { onBackToLanding(); setTimeout(() => { document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }); }, 100); }} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">02 // Features</button>
          <button onClick={() => { onBackToLanding(); setTimeout(() => { document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" }); }, 100); }} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">03 // Solution</button>
          <button onClick={() => { onBackToLanding(); setTimeout(() => { document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" }); }, 100); }} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">04 // Dashboard</button>
          <button onClick={() => { onBackToLanding(); setTimeout(() => { document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }, 100); }} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">05 // Pricing</button>
          <button onClick={() => { onBackToLanding(); setTimeout(() => { document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }); }, 100); }} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">06 // FAQ</button>
          <button onClick={() => { onBackToLanding(); setTimeout(() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }, 100); }} className="hover:text-white transition-colors px-2 py-1 cursor-pointer">07 // Contact</button>
        </nav>
        <button 
          onClick={() => onNavigate("contact")}
          className="border border-[#ffaf87] text-[#ffaf87] hover:bg-[#ffaf87] hover:text-black transition-all font-bold uppercase tracking-widest px-4 py-2 rounded flex items-center gap-2 text-[10px] cursor-pointer"
        >
          <span>ESTABLISH HANDSHAKE</span>
          <span>↗</span>
        </button>
      </header>
      
      {/* ===================== CORE GRID MATRIX ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Column 1: Flightdeck Content + Sliders (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 p-6 border border-white/5 bg-[#0b0c0e]/40 rounded relative text-left">
          <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between select-none">
            <span>● CONTROL CONSOLE CORE V4.2</span>
            <span>DATA ENGINE // STABLE</span>
          </div>
          
          <div className="space-y-4 my-auto select-text">
            <h1 className="text-2xl sm:text-4xl font-sans font-black uppercase text-white tracking-tight leading-none">
              INTELLIGENCE BEYOND <br />
              TRADITIONAL <span className="italic font-serif font-normal lowercase text-[#ffaf87]">analytics</span>.
            </h1>
            <h2 className="text-xl sm:text-3xl font-sans font-black uppercase tracking-wide text-slate-400 leading-tight">
              AI-POWERED 3D DATA <br />
              ANALYTICS &amp; <br />
              <span className="text-white border-b-2 border-[#ffaf87]/40 pb-1">Decision Intelligence</span>
            </h2>
            <p className="text-[11px] leading-relaxed text-slate-400 font-sans tracking-wide">
              ZorLix enables organizations to integrate data from multiple systems, automate data quality management, and generate actionable business intelligence through advanced AI analytics. Powered by NVIDIA Triton &amp; real-time 3D volumetric matrix engines.
            </p>
          </div>
          
          {/* Real-time Interactive Sliders */}
          <div className="space-y-4 border-t border-white/10 pt-4 select-none">
            <div className="text-[9px] text-[#ffaf87] font-bold uppercase tracking-wider font-mono">3D HARMONIZER VOLTAGE</div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>🌀 CYBER CORE SPIN SPEED (FREQ)</span>
                <span className="text-white font-bold">{waveFreq} Hz</span>
              </div>
              <input 
                type="range" min="1" max="12" value={waveFreq} 
                onChange={(e) => setWaveFreq(Number(e.target.value))}
                className="w-full accent-[#ffaf87] bg-white/5 h-1 rounded cursor-pointer"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>⚡ RADIAL EXPANSION AMPLITUDE</span>
                <span className="text-white font-bold">{waveAmp}%</span>
              </div>
              <input 
                type="range" min="10" max="120" value={waveAmp} 
                onChange={(e) => setWaveAmp(Number(e.target.value))}
                className="w-full accent-[#ffaf87] bg-white/5 h-1 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2 select-none">
            <button 
              onClick={() => {
                const element = document.getElementById("blueprints-hub");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white/5 border border-[#ffaf87]/30 text-white font-bold uppercase tracking-widest py-3 px-2 rounded hover:bg-[#ffaf87]/10 transition-all text-[10px] cursor-pointer text-center"
            >
              Explore Solutions ›
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("deployment-scale");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white/5 border border-white/10 text-slate-300 font-bold uppercase tracking-widest py-3 px-2 rounded hover:bg-white/10 transition-all text-[10px] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Deploy Scale</span>
              <span className="w-1.5 h-1.5 bg-[#ffaf87] rounded-full inline-block animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Column 2: 3D Canvas Mount Frame (5 cols) */}
        <div className="lg:col-span-5 border border-white/5 bg-[#0b0c0e]/40 rounded p-4 flex flex-col min-h-[480px] relative text-left">
          <div className="w-full text-[9px] text-[#ffaf87] font-bold flex justify-between items-center mb-2 select-none">
            <span>● INDUSTRIAL CORE VIEW | REALTIME WEBGL ACTIVE</span>
            <span className="text-slate-500 text-xs tracking-widest">● LIVE RUNNING</span>
          </div>
          
          {/* WebGL Canvas */}
          <div ref={mountRef} className="flex-1 w-full min-h-[380px] bg-black/40 rounded border border-white/5 shadow-inner overflow-hidden" />
          
          {/* Canvas specs summary */}
          <div className="w-full grid grid-cols-3 gap-2 border-t border-white/5 pt-3 mt-3 text-center text-[9px] font-mono select-none">
            <div>
              <div className="text-slate-500 uppercase">Target Velocity</div>
              <div className="text-white font-bold mt-0.5">{((0.3 + ((waveFreq-1)/11)*2.0)).toFixed(2)} rad/s</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Pulse Volatiles</div>
              <div className="text-[#ffaf87] font-bold mt-0.5">{Math.floor(((waveAmp-10)/110)*100)}%</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Matrix Dense Grid</div>
              <div className="text-white font-bold mt-0.5">1.2K NODE VECTORS</div>
            </div>
          </div>
        </div>

        {/* Column 3: Tactical Pipeline Connectors & Ingestion Logs (3 cols) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between text-left">
          <div className="border border-white/5 bg-[#0b0c0e]/40 rounded p-4 space-y-3 flex-1">
            <div className="flex items-center justify-between text-[9px] pb-1 border-b border-white/5 select-none">
              <span className="text-slate-400 uppercase tracking-wider font-bold">Ingestion Tunnel Gears</span>
              <span className="text-[#ffaf87]">[DATA_ENGAGED]</span>
            </div>
            
            <div className="space-y-2 pt-1 text-[10px]">
              <div className="p-2 bg-black border border-white/10 rounded flex items-center justify-between group hover:border-[#ffaf87]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffaf87] font-bold">◆</span>
                  <span className="font-bold text-white tracking-wider">SNOWFLAKE ENGINE</span>
                </div>
                <span className="text-slate-500 text-xs group-hover:text-[#ffaf87]">⚙</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded flex items-center justify-between text-slate-400 cursor-pointer hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">◆</span>
                  <span>GOOGLE BIGQUERY</span>
                </div>
                <span className="text-slate-700 text-xs">⚙</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded flex items-center justify-between text-slate-400 cursor-pointer hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">◆</span>
                  <span>AWS REDSHIFT PIPELINE</span>
                </div>
                <span className="text-slate-700 text-xs">⚙</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded flex items-center justify-between text-slate-400 cursor-pointer hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">◆</span>
                  <span>STRIPE COMPUTE TUNNEL</span>
                </div>
                <span className="text-slate-700 text-xs">⚙</span>
              </div>
            </div>
          </div>
          
          {/* Scrollable Telemetry Terminal */}
          <div className="border border-white/5 bg-[#0b0c0e]/60 rounded p-4 h-48 flex flex-col justify-between font-mono text-[10px]">
            <div className="flex items-center justify-between text-[9px] text-slate-500 border-b border-white/5 pb-1 select-none">
              <span>&gt;_ CONSOLE_TELEMETRY_LOGS</span>
              <span className="text-[#ffaf87] bg-[#ffaf87]/5 px-1 border border-[#ffaf87]/20 text-[8px] rounded uppercase font-bold">3D_HARDWARE_DIRECT</span>
            </div>
            <div className="space-y-1.5 text-[10px] font-mono text-slate-400 my-auto overflow-y-auto max-h-32 pt-2 select-text">
              {logs.map((log, idx) => (
                <p key={idx} className={`${idx === 0 ? "text-white" : "text-slate-400"} flex items-start gap-1`}>
                  <span>&gt;</span>
                  <span>{log}</span>
                </p>
              ))}
              <p className="text-slate-600 flex items-start gap-1"><span>&gt;</span> <span>CONSENSUS_STAMP: {consensusHash}</span></p>
            </div>
            <div className="flex justify-between items-center text-[8px] text-slate-600 border-t border-white/5 pt-1.5 select-none">
              <span>🔒 AES_256 SHADER STREAM</span>
              <span>GPU: DIRECT_HARDWARE_RENDER</span>
            </div>
          </div>
        </div>

      </div>

      {/* ===================== PERFORMANCE HUB SECTIONS ===================== */}
      <section id="blueprints-hub" className="mt-10 space-y-6 text-left">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          
          <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
            <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3 font-mono">PERFORMANCE HUB</div>
            <h3 className="text-xl font-sans font-black text-white mb-3">AI Throughput Intelligence</h3>
            <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans font-light">Monitor model serving latency, GPU utilization, and request pipelines within a cohesive command interface designed for inference-scale workloads.</p>
            <ul className="mt-4 space-y-2 text-[10px] text-slate-400 font-mono">
              <li>• Dynamic batch scheduling for real-time inference</li>
              <li>• Multi-GPU resource balancing and caching</li>
              <li>• Predictive load shaping with live telemetry</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
            <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3 font-mono">INTEGRATION GRID</div>
            <h3 className="text-xl font-sans font-black text-white mb-3">Enterprise Data Fusion</h3>
            <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans font-light">Connect AI inference to modern data infrastructure with connectors for cloud data lakes, operational stores, and analytics pipelines.</p>
            <ul className="mt-4 space-y-2 text-[10px] text-slate-400 font-mono">
              <li>• Snowflake / BigQuery / Redshift ingestion</li>
              <li>• Real-time event stream orchestration</li>
              <li>• Secure API endpoints and clustered gateway access</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
            <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3 font-mono">SECURE OPERATIONS</div>
            <h3 className="text-xl font-sans font-black text-white mb-3">Trusted AI Deployment</h3>
            <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans font-light">Deliver enterprise-ready inference environments with hardened security, compliance-ready controls, and a transparent audit trail.</p>
            <ul className="mt-4 space-y-2 text-[10px] text-slate-400 font-mono">
              <li>• AES-256 encrypted compute streams</li>
              <li>• Multi-tenant isolation and audit logging</li>
              <li>• GPU workload throttling and failover guardrails</li>
            </ul>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          
          <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
            <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3 font-mono">SOLUTION BLUEPRINT</div>
            <h3 className="text-xl font-sans font-black text-white mb-3">Adaptive Inference Pipeline</h3>
            <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans font-light">A single platform for model deployment, telemetry visualization, and automated scale management tuned for data-intensive AI workloads.</p>
            <div className="mt-5 space-y-3 text-[10px] text-slate-400 font-mono">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#ffaf87] shrink-0"></span>
                <span>Automated model refresh cycles with versioned deployments.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#ffaf87] shrink-0"></span>
                <span>Integrated cluster health analytics and workload forecasting.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#ffaf87] shrink-0"></span>
                <span>Full stack observability from data ingress to inference output.</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#09090b]/90 p-6">
            <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3 font-mono">RESULTS DASHBOARD</div>
            <h3 className="text-xl font-sans font-black text-white mb-3">Operational Metrics</h3>
            <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 font-mono">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">GPU EFFICIENCY</div>
                <div className="text-2xl font-black text-white mt-2">94%</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">MODEL UPTIME</div>
                <div className="text-2xl font-black text-white mt-2">99.97%</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">LATENCY</div>
                <div className="text-2xl font-black text-white mt-2">0.58ms</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">THROUGHPUT</div>
                <div className="text-2xl font-black text-white mt-2">4.2k inf/s</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== SCALE DEPLOYMENT ESTIMATOR SECTION ===================== */}
      <section id="deployment-scale" className="mt-10 bg-[#0b0c0e]/40 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[9px] text-[#ffaf87] font-bold uppercase tracking-widest block mb-1">
                SYS_DEPLOY_CALCULATOR // INTEGRITY BUILDER
              </span>
              <h3 className="text-3xl font-sans font-black text-white uppercase tracking-tight leading-none">
                Calculate Deployment Scale
              </h3>
              <p className="text-slate-400 text-sm font-sans font-light mt-3 leading-relaxed max-w-xl">
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
                    className={`flex flex-col items-center p-3 rounded border cursor-pointer text-center transition-all ${
                      selectedTier === t.id
                        ? "bg-[#ffaf87] border-[#ffaf87] text-black font-extrabold shadow-md"
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
                    className={`flex flex-col items-center p-3 rounded border cursor-pointer text-center transition-all ${
                      securityLevel === s.id
                        ? "bg-[#ffaf87] border-[#ffaf87] text-black font-extrabold shadow-md"
                        : "bg-black/50 border-white/5 text-gray-400 hover:border-white/10"
                    }`}
                  >
                    <span className="font-sans text-[11px] font-bold leading-none">{s.label}</span>
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
                      className={`flex items-center justify-between p-3 rounded border cursor-pointer text-left transition-all ${
                        isChecked 
                          ? "bg-white/10 border-[#ffaf87]/50 text-[#ffaf87]" 
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
          <div className="lg:col-span-5 flex flex-col justify-between bg-black border border-white/8 rounded-3xl p-6 sm:p-8 h-full min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 select-none font-mono">
              <span className="text-[9px] text-[#ffaf87] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[#ffaf87]" /> ESTIMATED RATE:
              </span>
              <span className="text-gray-500 uppercase">SYS_ESTIMATE</span>
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
            <div className="flex flex-col gap-2.5 bg-[#050506] p-4 rounded-2xl border border-white/5 text-xs select-none">
              <div className="flex justify-between items-center text-slate-400">
                <span>Selected Tier:</span>
                <strong className="text-white capitalize">{selectedTier}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Transport Encryption:</span>
                <strong className="text-white uppercase">
                  {securityLevel === "aes" ? "AES-256" : securityLevel === "e2ee" ? "E2EE" : "Quantum"}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-400 border-t border-white/5 pt-2 mt-1">
                <span>Consensus latency:</span>
                <strong className="text-[#ffaf87]">0.012ms</strong>
              </div>
            </div>

            {/* Ingress CTA button */}
            <button 
              onClick={() => onNavigate("contact")}
              className="w-full mt-6 py-3 rounded bg-gradient-to-tr from-[#ffaf87] to-amber-300 text-black font-sans font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] hover:opacity-95 transition-all"
            >
              <span>Initiate Core Deployment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ===================== FOOTER SECTION ===================== */}
      <footer className="mt-8 text-center text-[8px] text-slate-600 border-t border-white/5 pt-3 flex justify-between select-none">
        <span>ZorLix © 2026 | NVIDIA INCEPTION SHOWCASE HIGH-PERFORMANCE INFRASTRUCTURE</span>
        <span>TACTICAL CONSOLE INTERFACE v3.5 | SECURE PIPELINES</span>
      </footer>

    </div>
  );
}
