import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Flame, RefreshCw } from "lucide-react";

// Precise, pixel-perfect real-world company logo SVGs that react beautifully to tailwind colors
const SnowflakeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <line x1="1" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="4.22" x2="19.78" y2="19.78" />
    <line x1="4.22" y1="19.78" x2="19.78" y2="4.22" />
    <path d="M12 5.5l2.5-2.5M12 5.5L9.5 3M12 18.5l2.5 2.5M12 18.5L9.5 21" />
    <path d="M5.5 12L3 14.5M5.5 12L3 9.5M18.5 12l2.5 2.5M18.5 12l2.5-2.5" />
  </svg>
);

const GoogleCloudLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.35 10.04a7.5 7.5 0 1 0-14.7 1.92A4.996 4.996 0 0 0 4.5 22h14.5a5.5 5.5 0 0 0 5.35-6.44a5.002 5.002 0 0 0-5-5.52zM19 20H4.55c-1.41 0-2.55-1.14-2.55-2.55c0-1.25.9-2.31 2.14-2.52l1.01-.17c.29-1.92 1.94-3.36 3.85-3.36c.45 0 .89.08 1.31.23l1.1.4c.54-.88 1.49-1.43 2.54-1.43c1.7 0 2.97 1.41 2.87 3.1l-.06.94l.87.35a3.52 3.52 0 0 1 2.17 3.25c0 1.93-1.57 3.5-3.5 3.5z" />
  </svg>
);

const StripeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.962 9.462c-2.422-.61-3.132-.97-3.132-1.65 0-.58.55-.9 1.401-.9 1.141 0 2.451.41 3.242.88l1.011-2.492c-1.181-.6-2.882-1-4.402-1-2.942 0-4.943 1.58-4.943 4.202 0 3.652 3.972 4.322 6.033 5.102 1.151.43 1.501 1.121 1.501 1.7 0 .82-.78 1.101-1.621 1.101-1.521.02-3.031-.6-3.962-1.16l-.821 2.641c1.23.631 2.921 1.121 4.622 1.121 3.142 0 5.233-1.571 5.233-4.482 0-4.042-4.223-4.432-6.103-5.062z" />
  </svg>
);

const AWSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.925 15.688c-1.15.539-2.316.711-3.238.711-2.022 0-3.073-1.026-3.073-2.617 0-2.327 1.833-3.208 5.4-3.208h.8v-.294c0-1.127-.47-1.872-1.852-1.872-.942 0-2.022.37-2.731.86a.465.465 0 0 1-.587-.1l-.7-.8c-.1-.13-.07-.32a5.41 5.41 0 0 1 3.998-1.32c2.72 0 3.87 1.44 3.87 3.88v4.99c0 .71.34 1.1.66 1.4.1.1.1.25.02.32a6.37 6.37 0 0 1-1.25.83.5.5 0 0 1-.5-.07l-.801-1.02zm-.113-4.148h-.793c-2.32 0-3.4 1.05-3.4 2.22 0 1.05.65 1.6 1.7 1.6 1.02 0 1.87-.55 2.37-1.36.1-.11.13-.2.13-.33v-2.13zm-.12 6.541a18.32 18.32 0 0 1-9.98-2.62.46.46 0 0 1-.1-.71l.66-.75c.11-.12.3-.12.44-.02 2.32 1.62 5.56 2.45 8.95 2.45c3.23 0 5.68-.69 7.02-1.95.12-.11.31-.09.41.03l.63.76a.46.46 0 0 1-.06.63c-1.82 1.63-4.8 2.46-7.97 2.46z" />
  </svg>
);

const MetaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.14 7c-1.74 0-3.32.74-4.41 2-1.09-1.26-2.67-2-4.41-2A5.66 5.66 0 0 0 1.66 12.66a5.66 5.66 0 0 0 5.66 5.66c1.74 0 3.32-.74 4.41-2 1.09 1.26 2.67 2 4.41 2a5.66 5.66 0 0 0 5.66-5.66A5.66 5.66 0 0 0 16.14 7zm0 9.24c-.95 0-1.84-.4-2.52-1.12l-1.05-1.12-1.04 1.12c-.68.72-1.57 1.12-2.52 1.12a3.53 3.53 0 0 1-3.53-3.53 3.53 3.53 0 0 1 3.53-3.53c.96 0 1.84.4 2.52 1.12l1.04 1.12 1.05-1.12c.68-.72 1.57-1.12 2.52-1.12a3.53 3.53 0 0 1 3.53 3.53 3.53 3.53 0 0 1-3.53 3.53z" />
  </svg>
);

const AzureLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.4 19.35L15.3 4H9.45L1.5 15.15l3.9 4.2zm6.75-8.35l4.65 8.35h6l-7.95-15z" />
  </svg>
);

const DatabricksLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 16.5l-6-3.3V9.7l6 3.3v5.5zm6-3.3l-6 3.3v-5.5l6-3.3v5.5z" />
  </svg>
);

const CloudflareLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.01 4C9.52 4 7.42 5.61 6.74 7.82c-.52-.31-1.12-.49-1.76-.49-1.84 0-3.33 1.49-3.33 3.33 0 .28.05.54.12.8h17.9a4.1 4.1 0 0 0 4.33-4.13c0-2.31-1.92-4.13-4.23-4.13-.51 0-.99.1-1.44.27C17.58 5.48 14.98 4 12.01 4zm-7.5 9.5a1.5 1.5 0 1 0 0 3h15a1.5 1.5 0 1 0 0-3H4.5z" />
  </svg>
);

export default function TrustBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cryptHash, setCryptHash] = useState<string>("8b4a...df21_SHA256");
  const [verificationCount, setVerificationCount] = useState<number>(419082);

  // Fluctuating cryptographic secure block hashes simulation
  useEffect(() => {
    const hashInterval = setInterval(() => {
      const keys = ["8b4a", "c9d2", "3f8e", "5a7c", "1e6d", "f4b0"];
      const tails = ["df21", "ae90", "bc33", "ea45", "6a11", "9c88"];
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const randomTail = tails[Math.floor(Math.random() * tails.length)];
      setCryptHash(`${randomKey}...${randomTail}_SHA256`);
      setVerificationCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    return () => clearInterval(hashInterval);
  }, []);

  const corporatePartners = [
    { name: "Snowflake", icon: SnowflakeLogo, details: "Telemetry Warehouse Ingestion Connected", uptime: "99.99%", latency: "0.02ms" },
    { name: "Google Cloud", icon: GoogleCloudLogo, details: "Sub-Tenant GPU Core Accelerations", uptime: "100.0%", latency: "0.08ms" },
    { name: "Stripe Connect", icon: StripeLogo, details: "Financial Ledgers Synchronization Buffer", uptime: "99.99%", latency: "0.03ms" },
    { name: "S3 Bucket", icon: AWSLogo, details: "Encrypted Parquet Data Lake Pools", uptime: "99.98%", latency: "0.12ms" },
    { name: "Meta Core", icon: MetaLogo, details: "High-Frequency Events Handshake", uptime: "99.94%", latency: "0.18ms" },
    { name: "Microsoft Azure", icon: AzureLogo, details: "Enterprise Active Directory Proxy", uptime: "100.0%", latency: "0.05ms" },
    { name: "Databricks Node", icon: DatabricksLogo, details: "Lakehouse Structured Schema Scanner", uptime: "99.97%", latency: "0.15ms" },
    { name: "Cloudflare Warp", icon: CloudflareLogo, details: "Secure Edge Routing Dispatch Gateway", uptime: "100.0%", latency: "0.01ms" }
  ];

  return (
    <section id="trust-section" className="relative z-10 bg-black pt-16 pb-24 overflow-hidden border-t border-white/5">
      {/* Background radial soft lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[300px] bg-peach/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-mint/3 blur-[120px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 w-full relative z-10">
        
        {/* Trust Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-mint bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full select-none">
            TRUST_VERIFICATION_LEDGER
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-white mt-6 mb-4">
            Cryptographic Integrity Board
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl leading-relaxed">
            Every transaction is verified in a holographic security board. Witness active partner handshakes executing with clean TLS integrity channels.
          </p>
        </div>

        {/* The New Layout Layout: Secure Partitioned Ledger Split (Grid 12) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Frame: Live Security Integrity Indicator Ledger Card (4 Columns) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-black border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">SECURE_CERT_STATUS</span>
                <span className="text-[9px] font-mono text-mint bg-mint/10 border border-mint/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none">
                  HEALTH_SECURE
                </span>
              </div>

              <div className="flex items-start gap-4 mb-8">
                <div className="p-3.5 rounded-2xl bg-mint/10 border border-mint/20 text-mint shrink-0">
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-sans font-black text-white text-base">Continuous Attestation</h4>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">
                    Continuous telemetry is double-checked for corruption before compilation.
                  </p>
                </div>
              </div>

              {/* Security parameters readout */}
              <div className="flex flex-col gap-3 py-4 border-y border-white/5 my-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">SIGNING HASH VALUE:</span>
                  <span className="text-peach font-bold">{cryptHash}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">COMPLETED CYCLES:</span>
                  <span className="text-white font-extrabold">{verificationCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">DEVIATION DISPOSITION:</span>
                  <span className="text-mint font-semibold uppercase">0.00% DRIFT</span>
                </div>
              </div>
            </div>

            <div className="pt-4 font-mono text-[8px] text-gray-600 uppercase tracking-widest">
              SECURE SHA-256 handshake monitor active
            </div>
          </div>

          {/* Right Frame: Partner Interlocking Grid Nodes (8 Columns) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {corporatePartners.map((partner, idx) => {
              const PartnerIcon = partner.icon;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={partner.name}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[160px] select-none relative overflow-hidden ${
                    isHovered
                      ? "bg-[#111] border-peach/45 shadow-[0_5px_15px_rgba(255,175,135,0.08)]"
                      : "bg-[#050505] border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Subtle scanning neon line on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-peach/10 to-transparent pointer-events-none transform -skew-x-12"
                    />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${isHovered ? "bg-peach text-black shadow-md scale-105" : "bg-white/5 text-gray-400"} transition-all`}>
                      <PartnerIcon className="w-5 h-5" />
                    </div>
                    
                    <span className="font-mono text-[9px] text-mint bg-mint/10 border border-mint/20 px-2 py-0.5 rounded-lg font-bold">
                      {partner.uptime}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans font-extrabold text-sm text-white tracking-tight leading-none mb-1">
                      {partner.name}
                    </h4>
                    <span className="font-mono text-[9px] text-gray-500 block uppercase tracking-wider">
                      {partner.latency} SYNC DELAY
                    </span>
                  </div>

                  {/* Dynamic absolute block describing the connection parameters inside tooltip */}
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-2 left-2 right-2 bg-black border border-white/10 p-2 rounded-lg text-[8px] font-mono text-gray-400 leading-normal z-20 shadow-xl"
                    >
                      {partner.details}
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
