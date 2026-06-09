import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ZorLix.com - NVIDIA Inception Showcase Dashboard Interface
 * STABLE 3D IMPLEMENTATION (Vanilla Three.js + Precise State Sync)
 * Aesthetic: Monochromatic Cyber-Industrial Command Center (Exclusive Accent: #ffaf87)
 */

interface ZorLixConsoleProps {
  onBackToLanding: () => void;
  onNavigate: (sectionId: string) => void;
}

const ZorLixConsole: React.FC<ZorLixConsoleProps> = ({ onBackToLanding, onNavigate }) => {
  const [waveFreq, setWaveFreq] = useState<number>(5);
  const [waveAmp, setWaveAmp] = useState<number>(32);
  
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
  
  // Sync state values directly to refs on user interaction
  useEffect(() => {
    freqRef.current = waveFreq;
    ampRef.current = waveAmp;
  }, [waveFreq, waveAmp]);
  
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
    
    const primaryAccentLight = new THREE.PointLight(0xffaf87, 2.0, 40); // Targeted Accent Color
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
  
  return (
    <div className="min-h-screen bg-[#050506] text-[#D1D5DB] font-mono px-4 pb-4 pt-40 lg:pt-52 antialiased selection:bg-[#ffaf87]/30 selection:text-white relative overflow-x-hidden">
      {/* Telemetry Ticker */}
      <div className="w-full border-b border-white/10 pb-1.5 mb-3 flex items-center justify-between text-[9px] text-slate-500 tracking-tight overflow-x-auto whitespace-nowrap gap-6">
        <div className="flex items-center gap-4">
          <span>[ CORE TELEMETRY SYNC: ONLINE ]</span>
          <span>LATENCY: <span className="text-white">0.012MS</span></span>
          <span>GRAPH INTERNALS: VECTORS VALIDATED</span>
          <span>ANOMALY DETECTOR: 0 FLAGS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>COMPUTE_PIPELINE_ACTIVE</span>
          <span>RENDER QUALITY: <span className="text-white">99.98%</span></span>
          <span>3D RENDER: <span className="text-[#ffaf87]">VANILLA THREE.JS CORE</span></span>
          <span>SYS_STATUS: OPTIMAL</span>
        </div>
      </div>
      
      {/* Header Panel */}
      <header className="w-full border border-white/10 bg-[#0b0c0e]/60 backdrop-blur-md rounded px-4 py-3 flex flex-wrap items-center justify-between gap-4 mb-4">
       
        
       
      </header>
      
      {/* Core Grid Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Flightdeck Content + Sliders */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 p-6 border border-white/5 bg-[#0b0c0e]/40 rounded relative">
          <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between">
            <span>● CONTROL CONSOLE CORE V4.2</span>
            <span>DATA ENGINE // STABLE</span>
          </div>
          <div className="space-y-4 my-auto">
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none">
              INTELLIGENCE BEYOND <br />
              TRADITIONAL <span className="italic font-serif font-normal lowercase text-[#ffaf87]">analytics</span>.
            </h1>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-slate-400">
              AI-POWERED 3D DATA <br />
              ANALYTICS &amp; <br />
              <span className="text-white border-b-2 border-[#ffaf87]/40 pb-1">Decision Intelligence</span>
            </h2>
            <p className="text-[11px] leading-relaxed text-slate-400 font-sans tracking-wide">
              ZorLix enables organizations to integrate data from multiple systems, automate data quality management, and generate actionable business intelligence through advanced AI analytics. Powered by NVIDIA Triton &amp; real-time 3D volumetric matrix engines.
            </p>
          </div>
          
          {/* Real-time Interactive Fields */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div className="text-[9px] text-[#ffaf87] font-bold uppercase tracking-wider">3D HARMONIZER VOLTAGE</div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span> CYBER CORE SPIN SPEED (FREQ)</span>
                <span className="text-white font-bold">{waveFreq} Hz</span>
              </div>
              <input 
                type="range" min="1" max="12" value={waveFreq} 
                onChange={(e) => setWaveFreq(Number(e.target.value))}
                className="w-full accent-[#ffaf87] bg-white/5 h-1 rounded"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span> RADIAL EXPANSION AMPLITUDE</span>
                <span className="text-white font-bold">{waveAmp}%</span>
              </div>
              <input 
                type="range" min="10" max="120" value={waveAmp} 
                onChange={(e) => setWaveAmp(Number(e.target.value))}
                className="w-full accent-[#ffaf87] bg-white/5 h-1 rounded"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button className="bg-white/5 border border-[#ffaf87]/30 text-white font-bold uppercase tracking-widest py-3 px-2 rounded hover:bg-[#ffaf87]/10 transition-all text-[10px]">
              Platform ›
            </button>
            
          </div>
        </div>

        {/* 3D Canvas Mount Frame */}
        <div className="lg:col-span-5 border border-white/5 bg-[#0b0c0e]/40 rounded p-4 flex flex-col min-h-[480px] relative">
          <div className="w-full text-[9px] text-[#ffaf87] font-bold flex justify-between items-center mb-2">
            <span><span>●</span> INDUSTRIAL CORE VIEW | REALTIME WEBGL ACTIVE</span>
            <span className="text-slate-500 text-xs tracking-widest">● LIVE RUNNING</span>
          </div>
          <div ref={mountRef} className="flex-1 w-full min-h-[380px] bg-black/40 rounded border border-white/5 shadow-inner" />
          <div className="w-full grid grid-cols-3 gap-2 border-t border-white/5 pt-3 mt-3 text-center text-[9px] font-mono">
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

        {/* Tactical Pipeline Connectors & Ingestion Logs */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          <div className="border border-white/5 bg-[#0b0c0e]/40 rounded p-4 space-y-3 flex-1">
            <div className="flex items-center justify-between text-[9px] pb-1 border-b border-white/5">
              <span className="text-slate-400 uppercase tracking-wider font-bold">Ingestion Tunnel Gears</span>
              <span className="text-[#ffaf87]">[DATA_ENGAGED]</span>
            </div>
            <div className="space-y-2 pt-1 text-[10px]">
              <div className="p-2 bg-black border border-white/10 rounded flex items-center justify-between group hover:border-[#ffaf87]/40 transition-colors">
                <div className="flex items-center gap-2"><span className="text-[#ffaf87] font-bold">◆</span><span className="font-bold text-white tracking-wider">SNOWFLAKE ENGINE</span></div>
                <span className="text-slate-500 text-xs group-hover:text-[#ffaf87]">⚙</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2"><span className="text-slate-600">◆</span><span>GOOGLE BIGQUERY</span></div>
                <span className="text-slate-700 text-xs">⚙</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2"><span className="text-slate-600">◆</span><span>AWS REDSHIFT PIPELINE</span></div>
                <span className="text-slate-700 text-xs">⚙</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/5 rounded flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2"><span className="text-slate-600">◆</span><span>STRIPE COMPUTE TUNNEL</span></div>
                <span className="text-slate-700 text-xs">⚙</span>
              </div>
            </div>
          </div>
          <div className="border border-white/5 bg-[#0b0c0e]/60 rounded p-4 h-48 flex flex-col justify-between font-mono text-[10px]">
            <div className="flex items-center justify-between text-[9px] text-slate-500 border-b border-white/5 pb-1">
              <span>&gt;_ CONSOLE_TELEMETRY_LOGS</span>
              <span className="text-[#ffaf87] bg-[#ffaf87]/5 px-1 border border-[#ffaf87]/20 text-[8px] rounded uppercase font-bold">3D_HARDWARE_DIRECT</span>
            </div>
            <div className="space-y-1.5 text-[10px] font-mono text-slate-400 my-auto overflow-y-auto max-h-32 pt-2 select-none">
              <p className="text-white flex items-start gap-1"><span>&gt;</span> <span>3D_ENGINE: WebGL2 context verified, running hard iron layers.</span></p>
              <p className="flex items-start gap-1"><span>&gt;</span> <span>VOLUMETRIC: Core matrices responding flawlessly to input constants.</span></p>
              <p className="text-slate-600 flex items-start gap-1"><span>&gt;</span> <span>SECURITY: Nvidia Triton multi-instance clusters validated, safe execution loops.</span></p>
            </div>
            <div className="flex justify-between items-center text-[8px] text-slate-600 border-t border-white/5 pt-1.5">
              <span> AES_256 SHADER STREAM</span>
              <span>GPU: DIRECT_HARDWARE_RENDER</span>
            </div>
          </div>
        </div>

        {/* NEW INFORMATION SECTIONS */}
        <section className="lg:col-span-12 mt-10 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
              <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3">PERFORMANCE HUB</div>
              <h3 className="text-xl font-black text-white mb-3">AI Throughput Intelligence</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Monitor model serving latency, GPU utilization, and request pipelines within a cohesive command interface designed for inference-scale workloads.</p>
              <ul className="mt-4 space-y-2 text-[10px] text-slate-400">
                <li>• Dynamic batch scheduling for real-time inference</li>
                <li>• Multi-GPU resource balancing and caching</li>
                <li>• Predictive load shaping with live telemetry</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
              <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3">INTEGRATION GRID</div>
              <h3 className="text-xl font-black text-white mb-3">Enterprise Data Fusion</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Connect AI inference to modern data infrastructure with connectors for cloud data lakes, operational stores, and analytics pipelines.</p>
              <ul className="mt-4 space-y-2 text-[10px] text-slate-400">
                <li>• Snowflake / BigQuery / Redshift ingestion</li>
                <li>• Real-time event stream orchestration</li>
                <li>• Secure API endpoints and clustered gateway access</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
              <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3">SECURE OPERATIONS</div>
              <h3 className="text-xl font-black text-white mb-3">Trusted AI Deployment</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">Deliver enterprise-ready inference environments with hardened security, compliance-ready controls, and a transparent audit trail.</p>
              <ul className="mt-4 space-y-2 text-[10px] text-slate-400">
                <li>• AES-256 encrypted compute streams</li>
                <li>• Multi-tenant isolation and audit logging</li>
                <li>• GPU workload throttling and failover guardrails</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#0b0c0e]/40 p-6">
              <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3">SOLUTION BLUEPRINT</div>
              <h3 className="text-xl font-black text-white mb-3">Adaptive Inference Pipeline</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">A single platform for model deployment, telemetry visualization, and automated scale management tuned for data-intensive AI workloads.</p>
              <div className="mt-5 space-y-3 text-[10px] text-slate-400">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ffaf87]"></span>
                  <span>Automated model refresh cycles with versioned deployments.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ffaf87]"></span>
                  <span>Integrated cluster health analytics and workload forecasting.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ffaf87]"></span>
                  <span>Full stack observability from data ingress to inference output.</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#09090b]/90 p-6">
              <div className="text-[9px] uppercase tracking-widest text-[#ffaf87] mb-3">RESULTS DASHBOARD</div>
              <h3 className="text-xl font-black text-white mb-3">Operational Metrics</h3>
              <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400">
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
      </div>
      <div className="mt-6 text-center text-[8px] text-slate-600 border-t border-white/5 pt-3 flex justify-between">
        <span>ZorLix © 2026 | NVIDIA INCEPTION SHOWCASE HIGH-PERFORMANCE INFRASTRUCTURE</span>
        <span>TACTICAL CONSOLE INTERFACE v3.5 | SECURE PIPELINES</span>
      </div>
    </div>
  );
};

export default ZorLixConsole;