import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Cpu, 
  Network, 
  Settings, 
  LineChart, 
  Activity, 
  Compass, 
  SlidersHorizontal,
  Workflow,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Radio,
  Zap,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [sysOverhead, setSysOverhead] = useState("0.038ms");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isSystemCalibrating, setIsSystemCalibrating] = useState(false);
  const [activeSignalStream, setActiveSignalStream] = useState<number[]>(
    Array.from({ length: 8 }, () => Math.floor(Math.random() * 12) + 3)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPercent(Math.min((window.scrollY / totalScroll) * 100, 100));
      }
    };

    // Update system latency overhead fluctuating organically
    const interval = setInterval(() => {
      const overhead = (0.024 + Math.random() * 0.011).toFixed(3);
      setSysOverhead(`${overhead}ms`);
      
      // Update micro modular signal bars
      setActiveSignalStream(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 14) + 3)
      );
    }, 2500);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const triggerCalibration = () => {
    if (isSystemCalibrating) return;
    setIsSystemCalibrating(true);
    setTimeout(() => {
      setIsSystemCalibrating(false);
    }, 1500);
  };

  const navLinks = [
    { name: "Home", id: "home", code: "01/HM", icon: Compass },
    { name: "Features", id: "features", code: "02/FT", icon: SlidersHorizontal },
    { name: "Solution", id: "pipeline", code: "03/SL", icon: Workflow },
    { name: "Dashboard", id: "dashboard", code: "04/DB", icon: LineChart },
    { name: "Pricing", id: "pricing", code: "05/PR", icon: Settings },
    { name: "FAQ", id: "faq", code: "06/FQ", icon: Activity },
    { name: "Contact", id: "contact", code: "07/CN", icon: Sparkles },
  ];

  return (
    <header
      id="navbar-header"
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none"
    >
      {/* 
        PRECISE DYNAMICAL HUD OUTLINE
        Top margin line representing modern dashboard frame
      */}
      <div className="w-full max-w-[1520px] h-[1px] bg-gradient-to-r from-transparent via-[#FFAF87]/20 to-transparent mt-3 opacity-80" />

      {/* 
        THE COGNITIVE HUB COCKPIT (Interactive HUD Capsule)
        Beautiful border textures, micro neon indicators, and asymmetrically balanced functional sectors.
      */}
      <div
        id="navbar-capsule"
        className={`pointer-events-auto w-full transition-all duration-500 ease-out flex items-center justify-between py-2 px-3 sm:px-6 rounded-[28px] border mt-2.5 relative ${
          scrolled
            ? "max-w-[1440px] bg-[#020202]/95 backdrop-blur-2xl border-[#FFAF87]/25 shadow-[0_24px_64px_-12px_rgba(255,175,135,0.15)]"
            : "max-w-[1490px] bg-black/70 backdrop-blur-md border-white/5 shadow-[0_12px_45px_rgba(0,0,0,0.9)]"
        }`}
      >
        {/* Dynamic Holographic Progress Trace on bottom path */}
        <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-white/5 overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FFAF87] via-[#FFF] to-[#C5E898] shadow-[0_0_8px_#FFAF87]" 
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        {/* Tactical Crosshair Flaring Brackets */}
        <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-6 border-l border-y border-[#FFAF87]/20 rounded-l-md pointer-events-none" />
        <div className="absolute right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-6 border-r border-y border-[#C5E898]/20 rounded-r-md pointer-events-none" />

        {/* LEFT SECTOR: The Cybernetic Orbital Core Logo */}
        <div id="navbar-left-cluster" className="flex items-center gap-4 shrink-0">
          <button
            id="navbar-logo-btn"
            onClick={() => {
              onNavigate("home");
              setIsOpen(false);
            }}
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
          >
            {/* Spinning Neon Core Reactor */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#121212] to-black border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-[#FFAF87]/60 transition-colors shadow-inner">
              
              {/* Concentric spin dashes */}
              <div className="absolute inset-1.5 rounded-xl border border-dashed border-[#FFAF87]/15 animate-spin [animation-duration:8s]" />
              <div className="absolute inset-3 rounded-lg border border-spacing-1 border-[#C5E898]/10 animate-spin [animation-duration:4s] [animation-direction:reverse]" />
              
              {/* Dynamic pulse node core */}
              <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#FFAF87] to-amber-300 shadow-[0_0_12px_#FFAF87] group-hover:scale-125 transition-transform" />
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="19" stroke="#C5E898" strokeWidth="0.75" fill="none" strokeDasharray="4 14" className="opacity-30 group-hover:opacity-100 transition-opacity" />
              </svg>
            </div>

            {/* Glowing Brand Typography & Status Info */}
            <div className="flex flex-col text-left leading-none">
              <span className="font-sans font-black text-sm tracking-widest text-white uppercase flex items-center gap-1.5">
                Zor-Lix
                <span className="text-[8.5px] font-mono text-[#C5E898] hover:text-[#FFAF87] font-bold px-1.5 py-0.5 rounded bg-[#C5E898]/10 border border-[#C5E898]/20 transition-all">
                  v3.9
                </span>
              </span>
              <span className="font-mono text-[7px] text-gray-500 uppercase tracking-[0.25em] mt-1 block">
                COGNITIVE SYSTEMS
              </span>
            </div>
          </button>
          
          <div className="hidden xl:block h-7 w-[1px] bg-white/10" />

          {/* Micro Ambient Realout HUD */}
          <div className="hidden xl:flex items-center gap-2 text-left select-none">
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[6.5px] text-gray-500 tracking-widest uppercase">MATRIX SEC_STATUS</span>
              <span className="font-mono text-[8.5px] text-[#C5E898] font-black tracking-widest mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5E898] animate-ping" />
                SSL_SECURE
              </span>
            </div>
          </div>
        </div>

        {/* CENTER SECTOR: Tactile Dashboard Index Dials */}
        <nav 
          id="desktop-nav" 
          className="hidden lg:flex items-center gap-1 bg-[#050505]/40 border border-white/5 p-1 rounded-full relative z-10 box-glow-peach"
        >
          {navLinks.map((link) => {
            const isSelected = activeSection === link.id;
            const isHovered = hoveredLink === link.id;
            const LinkIcon = link.icon;

            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`font-sans text-[10.5px] font-bold tracking-widest uppercase transition-all duration-300 relative px-4 py-2.5 rounded-full cursor-pointer flex items-center gap-2 overflow-hidden ${
                  isSelected ? "text-neutral-950 font-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {/* Friction-less fluid spring indicator pill */}
                {isSelected && (
                  <motion.div
                    layoutId="activeHUDIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#FFAF87] via-[#FFF] to-[#C5E898] rounded-full z-0 shadow-[0_4px_16px_rgba(255,175,135,0.4)]"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}

                {/* Index numeral identifier code */}
                <span className={`font-mono text-[6.5px] block ${
                  isSelected ? "text-black/60 font-black" : isHovered ? "text-[#FFAF87]" : "text-gray-600"
                }`}>
                  {link.code}
                </span>

                <span className="relative z-10 flex items-center gap-1.5">
                  <LinkIcon className={`w-3.5 h-3.5 ${isSelected ? "text-black/80 stroke-[2.5px]" : "text-gray-500 group-hover:text-[#FFAF87]"}`} />
                  {link.name}
                </span>

                {/* Bottom line hover spark */}
                <AnimatePresence>
                  {isHovered && !isSelected && (
                    <motion.div 
                      layoutId="hoverGlowNode"
                      className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#FFAF87]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* RIGHT SECTOR: Micro Sensory Level, Latency and Calibration Tools */}
        <div id="navbar-right-cluster" className="flex items-center gap-3 shrink-0">
          
          {/* Uncommon interactive soundwave level simulation */}
          <div className="hidden lg:flex items-center gap-1 border-l border-white/10 pl-3 h-7 select-none" title="Live System Event Frequency">
            <Radio className="w-3.5 h-3.5 stroke-[1.5px] text-gray-500" />
            <div className="flex items-end gap-0.5 h-3.5 w-16">
              {activeSignalStream.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${h}px` }}
                  transition={{ type: "spring", stiffness: 150, damping: 10 }}
                  className="w-[2px] bg-[#C5E898]/40 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Trigger calibration panel with spin kinetics */}
          <button
            onClick={triggerCalibration}
            title="Recalibrate Interface Feeds"
            className="hidden sm:flex relative p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#FFAF87]/30 text-gray-400 hover:text-white transition-all cursor-pointer focus:outline-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSystemCalibrating ? "animate-spin text-[#C5E898]" : "text-gray-500"}`} />
            <span className="absolute top-[2px] right-[2px] w-2 h-2 rounded-full bg-[#FFAF87] ring-4 ring-black animate-pulse" />
          </button>

          {/* Latency HUD statistics */}
          <div className="hidden sm:flex flex-col text-right font-mono text-[6.5px] text-gray-500 leading-tight uppercase select-none border-r border-white/10 pr-3 h-7 justify-center">
            <span className="flex items-center gap-1 justify-end text-[#C5E898] font-bold">
              <span className="w-1 h-1 rounded-full bg-[#C5E898] animate-pulse" />
              STABLE_INP
            </span>
            <span className="mt-0.5 text-gray-400 font-extrabold tracking-widest">BUS: {sysOverhead}</span>
          </div>

          {/* Compliance Vault trigger */}
          <button
            id="navbar-vault-btn"
            onClick={() => onNavigate("audits")}
            className="group hidden sm:flex px-4 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0d0d0d] hover:bg-black border border-[#C5E898]/15 text-white hover:border-[#C5E898] hover:shadow-[0_0_15px_rgba(197,232,152,0.15)] font-sans text-[9px] font-black tracking-widest uppercase transition-all duration-300 items-center gap-1.5 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5E898]" />
            <span>Vault</span>
          </button>

          {/* Call-to-Action Dynamic Handshake button */}
          <button
            id="navbar-get-started-btn"
            onClick={() => onNavigate("contact")}
            className="group px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#101010] hover:bg-black border border-white/10 text-white hover:border-[#FFAF87] hover:shadow-[0_0_15px_rgba(255,175,135,0.15)] font-sans text-[9.5px] font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer relative overflow-hidden"
          >
            {/* Travelling laser trigger */}
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <span>Handshake</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAF87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Responsive Mobile Trigger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2.5 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          >
            {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>

      </div>

      {/* MOBILE UNIQUE HUD DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="absolute top-[82px] left-4 right-4 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-[30px] shadow-[0_32px_64px_rgba(0,0,0,0.92)] lg:hidden z-40 overflow-hidden"
          >
            {/* Cyber Grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:100%_1.5rem] pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFAF87]/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 p-6 flex flex-col gap-4">
              <span className="font-mono text-[7.5px] text-[#FFAF87] uppercase tracking-[0.25em] block border-b border-white/5 pb-2.5 select-none font-black text-left">
                CONSTELLATION NETWORK DRAWER
              </span>

              {/* Asymmetrical grid menu mapping */}
              <div className="grid grid-cols-2 gap-2.5 mt-1">
                {navLinks.map((link) => {
                  const isSelected = activeSection === link.id;
                  const LinkIcon = link.icon;

                  return (
                    <button
                      key={link.id}
                      id={`mobile-nav-link-${link.id}`}
                      onClick={() => {
                        onNavigate(link.id);
                        setIsOpen(false);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-[76px] relative overflow-hidden group ${
                        isSelected
                          ? "bg-gradient-to-tr from-[#121212] to-black border-[#FFAF87] text-[#FFAF87]"
                          : "bg-[#050505]/60 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-[7px] text-gray-500 font-extrabold group-hover:text-[#FFAF87] transition-colors font-bold">
                          {link.code}
                        </span>
                        <LinkIcon className={`w-3.5 h-3.5 ${isSelected ? "text-[#FFAF87]" : "text-gray-500 group-hover:text-white"}`} />
                      </div>
                      
                      <span className="font-sans font-black text-[11px] uppercase tracking-widest block mt-2 text-white">
                        {link.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* High precision diagnostic status metrics */}
              <div className="bg-[#050505]/90 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between mt-1 font-mono text-[8px] text-gray-500 select-none text-left">
                <span className="flex items-center gap-1.5 uppercase font-bold text-[#C5E898]">
                  <Network className="w-3.5 h-3.5 text-[#C5E898] animate-pulse" />
                  MOBILE_FEED: ACTIVE
                </span>
                <span>LATENCY: {sysOverhead}</span>
              </div>

              {/* Action trigger dispatch */}
              <button
                id="mobile-get-started-btn"
                onClick={() => {
                  onNavigate("contact");
                  setIsOpen(false);
                }}
                className="mt-2 w-full py-4 rounded-xl bg-gradient-to-tr from-[#FFAF87] via-white to-[#C5E898] text-black font-sans text-center font-bold text-[10.5px] tracking-widest uppercase shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
              >
                <span>Dispatch Signal</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3px] text-neutral-900" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
