import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Terminal as TermIcon, 
  CheckCircle2, 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  Coins, 
  Cpu, 
  RefreshCw, 
  Download, 
  Key, 
  Fingerprint, 
  Radio, 
  Binary,
  Globe,
  Database,
  ExternalLink,
  LockKeyhole
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ComplianceVaultProps {
  activeTab: "terms" | "privacy" | "audits";
  onTabChange: (tab: "terms" | "privacy" | "audits") => void;
  onBackToLanding: () => void;
}

export default function ComplianceVault({ activeTab, onTabChange, onBackToLanding }: ComplianceVaultProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [signatureSeed, setSignatureSeed] = useState("ZOR_LIX_ECDSA_SHA256_F92A8E");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null);

  const handleVerifyLog = () => {
    setIsVerifying(true);
    setVerificationSuccess(null);
    setVerificationLogs([
      "BOOT_VERIFICATION: Fetching live consensus audit node hashes...",
    ]);

    setTimeout(() => {
      setVerificationLogs(prev => [...prev, "ECDSA_VAL: Authenticating with Kyber-1024 quantum-safe keys..."]);
    }, 400);

    setTimeout(() => {
      setVerificationLogs(prev => [...prev, "BLOCK_CHECK: Verifying SHA-256 Ledger Block #4810291-C..."]);
    }, 900);

    setTimeout(() => {
      setVerificationLogs(prev => [
        ...prev, 
        `SIG_MATCH: Hash matches authority source [${(Math.random().toString(16).substring(2, 10)).toUpperCase()}].`
      ]);
    }, 1400);

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setVerificationLogs(prev => [...prev, "STATUS_SUCCESS: Zero-knowledge integrity handshake validated successfully."]);
    }, 1800);
  };

  const tabs = [
    { id: "terms", name: "Terms of Compliance", icon: FileText, label: "REGULATORY_PROTOCOL_STATEMENT" },
    { id: "privacy", name: "Privacy Ledger", icon: Lock, label: "AES-256_LOCAL_ISOLATION_GUIDELINE" },
    { id: "audits", name: "E2EE Audit Reports", icon: ShieldCheck, label: "CONTINUOUS_CONSENSUS_VALIDATOR" }
  ];

  return (
    <div id="compliance-vault-root" className="min-h-screen bg-[#020202] text-gray-200 pt-28 pb-20 relative overflow-hidden">
      {/* Immersive cyber grids & glowing orbits */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-peach/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-mint/5 blur-[150px] pointer-events-none" />

      {/* Screen coordinate headers */}
      <div className="absolute top-4 left-6 font-mono text-[8px] text-gray-500 uppercase tracking-widest hidden sm:flex items-center gap-1.5 select-none">
        <Radio className="w-3.5 h-3.5 text-peach animate-pulse" />
        <span>SECURE GATEWAY ENVELOPE: CRYPTO_VAULT // SSL_1.3</span>
      </div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full">
        
        {/* UPPER ROUTE CONTROLS */}
        <div id="compliance-header-action" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b border-white/5 pb-8">
          <button
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/8 hover:border-peach bg-black text-xs font-sans font-bold uppercase tracking-wider text-gray-300 hover:text-peach cursor-pointer transition-all w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Core Platform</span>
          </button>

          <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 px-4.5 py-2 rounded-2xl w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Query protocol hashes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-sans text-white focus:outline-none placeholder-gray-600 w-full"
            />
          </div>
        </div>

        {/* PAGE TITLE */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#C5E898] uppercase tracking-widest select-none">
            <Fingerprint className="w-4 h-4 text-[#C5E898]" />
            <span>AUTHENTIC COMPLIANCE SPHERE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white mt-4 mb-3">
            Zor-Lix Vault
          </h1>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl leading-relaxed">
            Unpacking localized isolation matrices, security audit nodes, and continuous cryptographic compliance records. Choose an isolated channel below to read specific legals.
          </p>
        </div>

        {/* MAIN SPLIT DECK SCREEN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="compliance-split-deck">
          
          {/* LEFT RAIL NAVIGATOR CHANNELS (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mb-1 px-1">
              ISOLATED INTEGRITY CHANNELS
            </span>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as any)}
                  className={`flex flex-col text-left p-5 rounded-3xl border transition-all duration-300 relative group cursor-pointer ${
                    isActive 
                      ? "bg-gradient-to-tr from-[#080808] to-black border-peach shadow-[0_8px_30px_rgba(255,175,135,0.06)]" 
                      : "bg-[#030303]/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isActive ? "bg-peach/10 border-peach text-peach" : "bg-white/5 border-white/5 text-gray-400 group-hover:text-white"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-sans font-black text-sm ${isActive ? "text-peach" : "text-gray-300 group-hover:text-white"}`}>
                        {tab.name}
                      </h4>
                      <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block mt-0.5">
                        {tab.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 font-light text-[11px] leading-relaxed pl-1">
                    {tab.id === "terms" && "Platform limits, transaction latency rules, database squeezing provisions."}
                    {tab.id === "privacy" && "AES-256 offline security patterns and complete zero-knowledge node rules."}
                    {tab.id === "audits" && "E2E encryption consensus reports and real-time live diagnostic validates."}
                  </p>
                  
                  {isActive && (
                    <div className="absolute right-5 top-5 p-1 rounded-full bg-peach/10 text-peach">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Quick Live Security Telemetry Sandbox Block */}
            <div className="bg-[#030303] border border-white/5 rounded-3xl p-5.5 mt-4 text-left select-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-mint/5 blur-2xl" />
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="font-mono text-[8px] text-mint uppercase tracking-widest flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5 text-mint animate-pulse" />
                  CONSENSUS_VERIFIER
                </span>
                <span className="font-mono text-[7px] text-gray-500 uppercase">SYS_STABLE // WS_UP</span>
              </div>

              <span className="font-mono text-[9px] text-gray-400 block mb-1">SIGNATURE SEED:</span>
              <code className="text-[10px] font-mono bg-white/5 py-1 px-2.5 rounded-lg text-peach block truncate uppercase mb-4">
                {signatureSeed}
              </code>

              <button
                disabled={isVerifying}
                onClick={handleVerifyLog}
                className="w-full py-2.5 rounded-xl bg-gradient-to-tr from-peach to-amber-300 text-black font-sans font-extrabold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Handshake...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verify Consensus Cryptography</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {verificationLogs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-black border border-white/8 rounded-xl"
                  >
                    <div className="font-mono text-[8.5px] leading-relaxed text-gray-400 flex flex-col gap-1 select-text">
                      {verificationLogs.map((log, i) => (
                        <div key={i} className="flex gap-1.5">
                          <span className={i === verificationLogs.length - 1 ? "text-peach animate-pulse" : "text-mint"}>{">"}</span>
                          <span className="text-left">{log}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT DETAILED CONTENT WALL (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-7 sm:p-9 bg-black border border-white/10 rounded-3xl relative overflow-hidden text-left" id="compliance-content-wall">
            <div className="absolute top-0 right-0 w-32 h-32 bg-peach/5 blur-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeTab === "terms" && (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-4.5 mb-6">
                    <div>
                      <span className="font-mono text-[8px] text-peach uppercase tracking-widest block mb-1">ZOR_LIX_TERMS // SECURE_AGREEMENT</span>
                      <h3 className="text-xl sm:text-2xl font-sans font-black text-white">Terms of Compliance</h3>
                    </div>
                    
                  </div>

                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-400 font-light leading-relaxed flex flex-col gap-6">
                    <p>
                      These terms constitute a binding system handshake between the Client Terminal Operator ("User") and <strong className="text-white">Zor-Lix Intelligence Systems</strong>. Accessing this isolated staging portal requires real-time consensus handshakes.
                    </p>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-peach font-mono">01/</span> Zero-Latency Packet Squeezing
                      </h5>
                      <p>
                        Zor-Lix executes sub-microsecond dataset compressing dynamically. Users commit to providing clean relational telemetry bounds. System is not liable for data structures uploaded outside the encrypted Sandbox container environments.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-peach font-mono">02/</span> Client Node Isolation Protocols
                      </h5>
                      <p>
                        Every running workspace is dynamically allocated a localized multi-tenant sandbox mesh. Users will not execute distributed malicious queries or attempt vector-inversion loops against the consensus cluster.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-peach font-mono">03/</span> Regulatory Compliance Assurances
                      </h5>
                      <p>
                        This infrastructure aligns with global <strong className="text-peach">ISO-27001</strong> and <strong className="text-peach">GDPR Type-2 Isolated Localizations</strong>. Any financial calculations performed in our benefits reactor block serve as honest estimates based on verified user inputs.
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center gap-3 mt-4">
                      <LockKeyhole className="w-5 h-5 text-peach shrink-0" />
                      <p className="font-mono text-[10px] text-gray-500 uppercase leading-normal">
                        ENVELOPE HASH ACCLI: SHA256//BCE738_102AA_DFF9
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-4.5 mb-6">
                    <div>
                      <span className="font-mono text-[8px] text-mint uppercase tracking-widest block mb-1">DATA_PROTECTION // AIS_LEAN_VAULT</span>
                      <h3 className="text-xl sm:text-2xl font-sans font-black text-white">Privacy Ledger</h3>
                    </div>
                    
                  </div>

                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-400 font-light leading-relaxed flex flex-col gap-6">
                    <p>
                      At Zor-Lix, our architecture defaults to <strong className="text-white">AES-256 client-isolated storage systems</strong>. No private key or operational payload parameter is ever logged or synchronized server-side without an active OAuth handshake.
                    </p>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-mint font-mono">01/</span> Zero-Knowledge Tunnel Architecture
                      </h5>
                      <p>
                        All user prompts, financial parameter changes, and database configurations remain inside your browser session’s local memory sandbox (<code className="text-mint">localStorage</code>). We do not collect individual keystroke trackers.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-mint font-mono">02/</span> TLS 1.3 Transport Isolation
                      </h5>
                      <p>
                        In-flight communication tunnels between client browsers and internal proxy databases (such as our API streams and model integrations) run entirely atop highly optimized TLS 1.3 tunnels.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-mint font-mono">03/</span> Ephemeral Dataset Deletion
                      </h5>
                      <p>
                        Staged memory graphs, custom API queries, and temporary workspace instances are destroyed instantly when a session closes. Zero traces remain in any system registers.
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center gap-3 mt-4">
                      <Key className="w-5 h-5 text-mint shrink-0" />
                      <p className="font-mono text-[10px] text-gray-500 uppercase leading-normal">
                        ENCRYPT SCHEMA METHOD: ECDH_SECP256K1_ENCRYPTED
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "audits" && (
                <motion.div
                  key="audits"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-4.5 mb-6">
                    <div>
                      <span className="font-mono text-[8px] text-[#C5E898] uppercase tracking-widest block mb-1">CONSENSUS_COMPLIANCY // SOC2_TYPE_II</span>
                      <h3 className="text-xl sm:text-2xl font-sans font-black text-white">E2EE Audit Reports</h3>
                    </div>
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C5E898] text-gray-400 hover:text-[#C5E898] transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-400 font-light leading-relaxed flex flex-col gap-6">
                    <p>
                      Our most recent <strong className="text-white">SOC-2 Type-II compliance assessment</strong> has concluded with a absolute perfect rating. Independent validation teams confirmed zero cryptographic leakage points.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#050505] border border-white/5">
                        <span className="font-mono text-[7px] text-gray-500 block uppercase">AUDIT STAMP</span>
                        <h6 className="font-sans font-black text-white text-xs uppercase mt-1">SQUEEZE_CONDUIT</h6>
                        <p className="text-[11px] text-gray-400 font-light mt-1">Verify direct channel pipeline memory buffer isolation protocols. Pass score: <strong className="text-[#C5E898]">100%</strong>.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#050505] border border-white/5">
                        <span className="font-mono text-[7px] text-gray-500 block uppercase">AUDIT STAMP</span>
                        <h6 className="font-sans font-black text-white text-xs uppercase mt-1">LEAD_DECRYPT_KEY</h6>
                        <p className="text-[11px] text-gray-400 font-light mt-1">Verified rotation cycles for RSA/Kyber-768 consensus authority nodes. Pass score: <strong className="text-[#C5E898]">100%</strong>.</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-[#C5E898] font-mono">03/</span> Continuous Auditing Nodes
                      </h5>
                      <p>
                        Rather than doing simple annual validations, Zor-Lix integrates a continuous, code-verifiable blockchain reporting network that triggers micro-consensus proofs every hour. Use our consensus simulator panel on the left to verify active compliance live.
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-[#C5E898] shrink-0" />
                        <p className="font-mono text-[10px] text-gray-500 uppercase leading-normal">
                          CERTIFICATE ID: SYNC_SOC2_2026_V10.2
                        </p>
                      </div>
                      <a href="#audits" className="font-mono text-[9px] text-[#C5E898] hover:underline flex items-center gap-1 uppercase select-none">
                        Registry Verification <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Compliance stamps footer indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-[8.5px] text-gray-500 font-mono tracking-widest uppercase border-t border-white/5 pt-6 mt-10 select-none gap-2">
              <span className="flex items-center gap-1.5 text-[#C5E898] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#C5E898]" /> SYSTEM INTEGRITY CERTIFIED ISO-27001
              </span>
              <span>ZOR_LIX_AI // DATASEC_PROT_LEVEL_4</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
