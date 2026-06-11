import { useState, useEffect } from "react";
import {
  Menu, X, ArrowUpRight, Network, Settings, LineChart,
  Activity, Compass, SlidersHorizontal, Workflow, Sparkles,
  RefreshCw, Radio, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen]               = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [sysOverhead, setSysOverhead]     = useState("0.038ms");
  const [hoveredLink, setHoveredLink]     = useState<string | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [glitchActive, setGlitchActive]   = useState(false);
  const [bars, setBars]                   = useState<number[]>(
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 12) + 3)
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollPercent(Math.min((window.scrollY / total) * 100, 100));
    };
    const ticker = setInterval(() => {
      setSysOverhead(`${(0.024 + Math.random() * 0.011).toFixed(3)}ms`);
      setBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 14) + 3));
    }, 2200);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(ticker); };
  }, []);

  const calibrate = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 350);
    setTimeout(() => setIsCalibrating(false), 1400);
  };

  const navLinks = [
    { name: "Home",      id: "home",      code: "01", Icon: Compass },
    { name: "Features",  id: "features",  code: "02", Icon: SlidersHorizontal },
    { name: "Solution",  id: "pipeline",  code: "03", Icon: Workflow },
    { name: "Dashboard", id: "dashboard", code: "04", Icon: LineChart },
    { name: "Pricing",   id: "pricing",   code: "05", Icon: Settings },
    { name: "FAQ",       id: "faq",       code: "06", Icon: Activity },
    { name: "Contact",   id: "contact",   code: "07", Icon: Sparkles },
  ];

  const telemetry = [
    "AI_INFERENCE · READY", "PIPELINE_SYNC · 14,892 ROWS/S",
    "ACCURACY · 98.4%",     "LATENCY · 0.038MS",
    "NODES · 24 ACTIVE",    "ANOMALY · 0 FLAGS",
    "VAULT · SECURE",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

        /* ticker */
        @keyframes nb-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .nb-ticker { animation: nb-ticker 30s linear infinite; display:flex; white-space:nowrap; }

        /* orbit */
        @keyframes nb-cw  { to{transform:rotate(360deg)}  }
        @keyframes nb-ccw { to{transform:rotate(-360deg)} }
        .nb-cw  { animation: nb-cw  9s linear infinite; }
        .nb-ccw { animation: nb-ccw 5s linear infinite; }

        /* ping */
        @keyframes nb-ping { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.8);opacity:0} }
        .nb-ping { position:relative; display:inline-flex; align-items:center; justify-content:center; }
        .nb-ping::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          background:currentColor; animation:nb-ping 1.6s ease-out infinite;
        }

        /* glitch */
        @keyframes nb-glitch {
          0%  {clip-path:inset(10% 0 75% 0);transform:translateX(-3px)}
          30% {clip-path:inset(60% 0 10% 0);transform:translateX(3px)}
          60% {clip-path:inset(30% 0 50% 0);transform:translateX(-2px)}
          100%{clip-path:inset(0 0 0 0);transform:translateX(0)}
        }
        .nb-glitch { animation: nb-glitch .3s steps(2) forwards; }

        /* scan */
        @keyframes nb-scan { from{transform:translateY(-100%)} to{transform:translateY(500%)} }
        .nb-scan-wrap { pointer-events:none; position:absolute; inset:0; overflow:hidden; border-radius:inherit; }
        .nb-scan-wrap::after {
          content:''; position:absolute; left:0; right:0; height:16%;
          background:linear-gradient(to bottom,transparent,rgba(197,232,152,.025),transparent);
          animation:nb-scan 4.5s linear infinite;
        }

        /* shimmer on hover */
        @keyframes nb-shimmer { from{transform:skewX(-12deg) translateX(-200%)} to{transform:skewX(-12deg) translateX(300%)} }
        .nb-hs-btn .nb-shim  { pointer-events:none; position:absolute; inset:0; width:45%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent); }
        .nb-hs-btn:hover .nb-shim { animation: nb-shimmer .8s ease forwards; }

        /* grid texture */
        .nb-grid-bg {
          background-image: linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
                            linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
          background-size: 34px 34px;
        }

        /* ── THE HANDSHAKE BUTTON ── */
        .nb-hs-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255,175,135,.22), rgba(255,130,60,.1));
          border: 1.5px solid rgba(255,175,135,.55);
          color: #FFAF87;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: all .22s ease;
          flex-shrink: 0;
        }
        .nb-hs-btn:hover {
          background: linear-gradient(135deg, rgba(255,175,135,.36), rgba(255,130,60,.22));
          border-color: rgba(255,175,135,.9);
          color: #fff;
          box-shadow: 0 0 24px rgba(255,175,135,.28), 0 4px 16px rgba(0,0,0,.4);
          transform: translateY(-1px);
        }
        .nb-hs-btn:active { transform: translateY(0); }
        .nb-hs-btn .nb-arrow { transition: transform .18s ease; }
        .nb-hs-btn:hover .nb-arrow { transform: translate(2px,-2px); }

        /* ── NAV PILL ── */
        .nb-nav-item {
          position: relative;
          display: flex; align-items: center; gap: 6px;
          padding: 8px 15px;
          border-radius: 999px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #9ca3af;
          border: 1px solid transparent;
          transition: color .15s, border-color .15s, background .15s;
          white-space: nowrap;
          background: none;
        }
        .nb-nav-item:hover { color: #e5e7eb; border-color: rgba(255,255,255,.07); background: rgba(255,255,255,.03); }
        .nb-nav-item.nb-active { color: #fff; }
        .nb-nav-item .nb-code {
          font-family:'DM Mono',monospace;
          font-size: 9px;
          color:#4b5563;
          transition:color .15s;
        }
        .nb-nav-item:hover .nb-code,
        .nb-nav-item.nb-active .nb-code { color: #FFAF87; }

        /* active pill bg */
        .nb-active-bg {
          position:absolute; inset:0; border-radius:999px;
          background:linear-gradient(135deg,rgba(255,175,135,.13),rgba(197,232,152,.07));
          border:1px solid rgba(255,175,135,.28);
        }

        /* ── MOBILE CARD ── */
        .nb-mob-card {
          display:flex; flex-direction:column; justify-content:space-between;
          padding:13px; border-radius:14px; height:70px;
          border:1px solid rgba(255,255,255,.06);
          background:rgba(255,255,255,.02);
          cursor:pointer; transition:all .16s;
          position:relative; overflow:hidden;
          text-align:left;
        }
        .nb-mob-card:hover { border-color:rgba(255,175,135,.3); background:rgba(255,175,135,.04); }
        .nb-mob-card.nb-active { border-color:rgba(255,175,135,.4); background:rgba(255,175,135,.06); }
        .nb-mob-card.nb-active::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#FFAF87,#C5E898);
        }

        /* ── MOBILE STRIP ── */
        .nb-mob-strip {
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
        }
        .nb-mob-strip::-webkit-scrollbar { display:none; }
        .nb-mob-link {
          flex-shrink:0;
          display:inline-flex; align-items:center; gap:6px;
          padding:9px 16px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.1);
          background:rgba(255,255,255,.04);
          color:#d1d5db;
          font-family:'Syne',sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing:.05em; text-transform:uppercase;
          white-space:nowrap;
          cursor:pointer;
          transition:background .15s,border-color .15s,color .15s;
        }
        .nb-mob-link:hover { color:#fff; border-color:rgba(255,175,135,.35); }
        .nb-mob-link.nb-active {
          color:#fff;
          border-color:rgba(255,175,135,.55);
          background:linear-gradient(135deg,rgba(255,175,135,.2),rgba(197,232,152,.1));
          box-shadow:0 0 16px rgba(255,175,135,.15);
        }
        .nb-mob-link .nb-code {
          font-family:'DM Mono',monospace;
          font-size:10px;
          color:#9ca3af;
        }
        .nb-mob-link.nb-active .nb-code { color:#FFAF87; }

        /* font utils */
        .nb-mono { font-family:'DM Mono',monospace; }
        .nb-syne { font-family:'Syne',sans-serif; }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none px-3 sm:px-4">

        {/* ══ TICKER TAPE ══════════════════════════════════════ */}
        <div className="pointer-events-auto w-full mt-2.5 rounded-lg overflow-hidden bg-black/65 border relative flex items-center">
          <div className="absolute left-0 inset-y-0 w-10 from-black to-transparent z-10 flex items-center justify-center">
            <Zap className="w-2.5 h-2.5" />
          </div>
          <div className="nb-ticker pl-10 text-gray-400">
            {[...telemetry, ...telemetry].map((t, i) => (
              <span key={i} className="nb-mono text-[7px] tracking-[.16em] mx-6">◈ {t}</span>
            ))}
          </div>
          <div className="absolute right-0 inset-y-0 w-10 from-black to-transparent z-10" />
        </div>

        {/* ══ MAIN NAVBAR ══════════════════════════════════════ */}
        <div className={`pointer-events-auto w-full mt-1.5 transition-all duration-300`}>
          <div className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
            scrolled
              ? "bg-[#020202]/97 backdrop-blur-2xl shadow-[0_16px_48px_-8px_rgba(255,175,135,.14)]"
              : "bg-[#050505]/82 backdrop-blur-xl border-white/[0.07]"
          }`}>

            <div className="nb-scan-wrap" />

            {/* Scroll progress bar — top edge */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] z-20 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFAF87] via-white/70 to-[#C5E898]"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>

            <div className="flex items-center w-full min-w-0">

              {/* ── ZONE 1 · LOGO ── */}
              <button
                onClick={() => { onNavigate("home"); setIsOpen(false); }}
                className={`flex items-center px-3 sm:px-4 py-0.5 sm:py-1 lg:py-1.5 cursor-pointer focus:outline-none group transition-opacity hover:opacity-90 border-r border-white/[0.06] flex-shrink-0 min-w-0 ${glitchActive ? "nb-glitch" : ""}`}
              >
                <img
                  src="/logo.svg"
                  alt="Zor-Lix"
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain object-left"
                />
              </button>

              {/* ── ZONE 2 · STATUS (xl only) ── */}
              <div className="hidden xl:flex flex-col justify-center px-4 border-r self-stretch select-none gap-1">
                <div className="nb-mono text-[7px] text-gray-600 uppercase tracking-[.18em]">MATRIX SEC_STATUS</div>
                <div className="nb-mono text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                  <span className="nb-ping rounded-full" />
                  SSL_SECURE
                </div>
              </div>

              {/* ── ZONE 3 · NAV LINKS (lg+) ── */}
              <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center px-3 py-2 overflow-hidden">
                {navLinks.map(({ name, id, code, Icon }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => onNavigate(id)}
                      onMouseEnter={() => setHoveredLink(id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`nb-nav-item focus:outline-none ${isActive ? "nb-active" : ""}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nb-active-pill"
                          className="nb-active-bg"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="nb-code relative z-10">{code}</span>
                      <Icon className={`w-3.5 h-3.5 relative z-10 flex-shrink-0 transition-colors ${isActive ? "text-[#FFAF87]" : "text-gray-600"}`} />
                      <span className="relative z-10">{name}</span>
                      <AnimatePresence>
                        {hoveredLink === id && !isActive && (
                          <motion.span
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.13 }}
                            className="absolute bottom-[5px] left-3 right-3 h-[1.5px] rounded-full bg-[#FFAF87]/38 origin-left"
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </nav>

              {/* ── ZONE 4 · RIGHT CLUSTER ── */}
              <div className="flex items-center flex-shrink-0 ml-auto border-l border-white/[0.06]">

                {/* Calibrate (lg+) */}
                <button
                  onClick={calibrate}
                  title="Recalibrate"
                  className="hidden lg:flex self-stretch px-3 items-center justify-center text-gray-600 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer focus:outline-none relative border-r border-white/[0.06]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCalibrating ? "animate-spin text-[#C5E898]" : ""}`} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFAF87] ring-[3px] ring-black nb-ping text-[#FFAF87]" />
                </button>

                {/* Handshake CTA */}
                <div className="hidden sm:flex px-2 sm:px-3 py-2.5 items-center self-stretch">
                  <button
                    onClick={() => onNavigate("zorlixa")}
                    className="nb-hs-btn focus:outline-none"
                  >
                    <div className="nb-shim" />
                    <span className="relative z-10">Zorlixa</span>
                    <ArrowUpRight className="nb-arrow w-3.5 h-3.5 flex-shrink-0 relative z-10" />
                  </button>
                </div>

                {/* Hamburger — mobile only */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle Menu"
                  aria-expanded={isOpen}
                  className="lg:hidden flex self-stretch items-center justify-center px-4 border-l border-white/[0.06] text-gray-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer focus:outline-none"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ══ MOBILE DRAWER ═══════════════════════════════════ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="pointer-events-auto w-full mt-2 bg-[#040404]/98 backdrop-blur-2xl border border-white/[0.12] rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,.95)] lg:hidden z-[110] overflow-hidden nb-grid-bg max-h-[min(70vh,520px)] overflow-y-auto"
            >
              {/* ambient glows */}
              <div className="absolute top-0 right-0 w-48 h-36 bg-[#FFAF87]/5 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-32 bg-[#C5E898]/4 blur-3xl pointer-events-none" />

              <div className="relative z-10 p-5 flex flex-col gap-4">

                {/* Drawer header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="nb-mono text-[8px] text-[#FFAF87] uppercase tracking-[.2em] font-bold">
                    CONSTELLATION NETWORK DRAWER
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="nb-ping w-[5px] h-[5px] rounded-full bg-[#C5E898] text-[#C5E898]" />
                    <span className="nb-mono text-[7px] text-[#C5E898] uppercase tracking-widest">LIVE</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map(({ name, id, code, Icon }) => {
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => { onNavigate(id); setIsOpen(false); }}
                        className={`nb-mob-card focus:outline-none ${isActive ? "nb-active" : ""}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? "text-[#FFAF87]" : "text-gray-400"}`} />
                            <span className={`font-syne text-xs font-bold tracking-wider uppercase ${isActive ? "text-white" : "text-gray-300"}`}>
                              {name}
                            </span>
                          </div>
                          <span className="nb-mono text-[10px] text-gray-500">{code}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between bg-black/50 px-4 py-2.5 rounded-xl border border-white/[0.05]">
                  <span className="nb-mono text-[8px] text-[#C5E898] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Network className="w-3 h-3 animate-pulse" />MOBILE_FEED: ACTIVE
                  </span>
                  <span className="nb-mono text-[8px] text-gray-500 tracking-widest">LATENCY: {sysOverhead}</span>
                </div>

                {/* Handshake CTA — full width in drawer */}
                <button
                  onClick={() => { onNavigate("zorlixa"); setIsOpen(false); }}
                  className="nb-hs-btn focus:outline-none w-full justify-center"
                >
                  <div className="nb-shim" />
                  <span className="relative z-10">Zorlixa</span>
                  <ArrowUpRight className="nb-arrow w-4 h-4 flex-shrink-0 relative z-10" />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}