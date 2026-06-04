import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Terminal as TermIcon, 
  Radio, 
  Cpu, 
  ShieldAlert, 
  Mail, 
  Clock, 
  Server, 
  Globe, 
  Network, 
  MessageSquare, 
  Sparkles, 
  CheckCircle, 
  CheckCircle2, 
  Database, 
  Workflow
} from "lucide-react";

interface ContactChannel {
  id: "general" | "support" | "custom";
  title: string;
  badge: string;
  icon: React.ComponentType<any>;
  latency: string;
  sub: string;
  color: string;
}

export default function Contact() {
  const [activeChannel, setActiveChannel] = useState<"general" | "support" | "custom">("general");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [urgency, setUrgency] = useState("Routine");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Real-time terminal diagnostic simulator
  const [terminalFeed, setTerminalFeed] = useState<string[]>([
    "SECURE_GATEWAY: Ingress control panel initialized.",
    "BOND_STATUS: AES-256 secure session established on local virtual node."
  ]);

  // Telemetry logs update as the user interacts with the form
  useEffect(() => {
    if (fullName && email) {
      setTerminalFeed((prev) => [
        ...prev.slice(-3),
        `PARSING: Binding identity [${fullName.substring(0,12)}...] to domain [${email.split('@')[1] || "unstaged"}]`
      ]);
    }
  }, [fullName, email]);

  useEffect(() => {
    if (message.length > 0) {
      setTerminalFeed((prev) => [
        ...prev.slice(-3),
        `BUFFERING: Envelope packet storage dynamic payload size: ${message.length} bytes.`
      ]);
    }
  }, [message]);

  const channels: ContactChannel[] = [
    {
      id: "general",
      title: "Direct Transmission",
      badge: "GENERAL ENQUIRY",
      icon: MessageSquare,
      latency: "Avg. response: <2.4hrs",
      sub: "General project scoping, brand partnerships, or operational questions.",
      color: "text-mint"
    },
    {
      id: "support",
      title: "Severe Overload Audit",
      badge: "EMERGENCY TIER",
      icon: ShieldAlert,
      latency: "Avg. response: 15 mins",
      sub: "For existing cluster failures, database handshake timeouts, or standard deviation drift.",
      color: "text-peach"
    },
    {
      id: "custom",
      title: "Enterprise Sandbox Sync",
      badge: "SALES & ARCHITECTURE",
      icon: Database,
      latency: "Avg. response: <1.2hrs",
      sub: "Request custom multi-tenant hardware clusters or private secure database models.",
      color: "text-indigo-400"
    }
  ];

  const currentChannel = channels.find(c => c.id === activeChannel) || channels[0];

  const handleChannelSelect = (id: "general" | "support" | "custom") => {
    setActiveChannel(id);
    setTerminalFeed((prev) => [
      ...prev.slice(-3),
      `GATEWAY_SHIFT: Swapped connection line to router bounds: [${id.toUpperCase()}]`
    ]);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      setTerminalFeed((prev) => [
        ...prev.slice(-3),
        "SYS_ERR: Packet rejection due to incomplete payload attributes."
      ]);
      return;
    }

    setIsSubmitting(true);
    setTerminalFeed((prev) => [
      ...prev.slice(-2),
      "INITIALIZING: Synthesizing secure TLS handshake credentials...",
      "CIPHER: Rotating Kyber-768 session keys..."
    ]);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTerminalFeed([
        `DISPATCH_SUCCESS: Core envelope verified and pushed to routing nodes.`,
        `NODE_RESPONSE: SSL verification code: [200_OK_ZORLIX]`,
        `TELEMETRY_STATUS: Connection dispatcher offline.`
      ]);
    }, 1800);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setUrgency("Routine");
    setMessage("");
    setIsSubmitted(false);
    setTerminalFeed([
      "SECURE_GATEWAY: Ingress control panel re-initialized.",
      "BOND_STATUS: Clean AES-256 session established on fresh virtual node."
    ]);
  };

  return (
    <section id="contact" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background Soft Ambient Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-peach/5 blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-mint/5 blur-[150px] pointer-events-none" />

      {/* Grid Coordinates mapping backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full text-left">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-mint text-2xs font-mono tracking-widest uppercase shadow-md select-none">
            <Radio className="w-3.5 h-3.5 text-mint animate-pulse" />
            <span>TRANSMISSION PORTAL // DIRECT INGRESS</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white mt-6 mb-4">
            Initialize Tunnel Handshake
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
            Dispatch a priority packet securely down our encrypted communication node. Select your destination lane below to initialize the console tracer automatically.
          </p>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="contact-deck-grid">
          
          {/* COLUMN A: Dynamic Transmission Channels Selection (4 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between h-full">
            <div>
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-2.5 mb-2.5 select-none">
                SELECT ROUTING CHANNEL
              </span>

              <div className="flex flex-col gap-4">
                {channels.map((chan) => {
                  const Icon = chan.icon;
                  const isSelected = activeChannel === chan.id;
                  return (
                    <button
                      key={chan.id}
                      onClick={() => handleChannelSelect(chan.id)}
                      className={`w-full p-5 rounded-2.5xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer select-none ${
                        isSelected
                          ? "bg-gradient-to-tr from-[#111] to-black border-peach shadow-[0_10px_30px_rgba(255,175,135,0.08)] scale-[1.01]"
                          : "bg-[#050505] border-white/5 hover:border-white/12 hover:bg-[#070707]"
                      }`}
                    >
                      {/* Active glowing mesh edge */}
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-peach/5 blur-xl pointer-events-none" />
                      )}

                      <div className="flex items-start gap-4 mb-3">
                        <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/8 ${isSelected ? "text-peach" : "text-gray-400"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[8.5px] text-gray-500 uppercase tracking-widest block mb-1">
                            {chan.badge}
                          </span>
                          <h4 className="font-sans font-extrabold text-[#e5e7eb] text-sm leading-snug">
                            {chan.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                        {chan.sub}
                      </p>

                      <div className="flex items-center justify-between font-mono text-[9px] pt-3 border-t border-white/5 mt-auto">
                        <span className="text-gray-500 uppercase block">OUTSIDE OVERHEAD</span>
                        <span className={`font-bold flex items-center gap-1.5 ${isSelected ? "text-peach" : "text-white"}`}>
                          <Clock className="w-3 h-3 text-mint animate-pulse" />
                          {chan.latency}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Server Integrity Status */}
            <div className="bg-[#050505] border border-white/5 p-5 rounded-2.5xl flex items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-mint/10 rounded-xl text-mint animate-pulse">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] text-gray-500 block">DESTINATION HOST</span>
                  <span className="text-xs font-sans font-black text-white block mt-0.5">TLS Core Secure Gateway</span>
                </div>
              </div>
              
              <div className="text-right leading-none shrink-0 font-mono">
                <span className="text-[7.5px] text-gray-500 uppercase block">DISPOSITION</span>
                <span className="text-[10px] text-mint font-bold mt-1.5 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-ping" />
                  GATE_ONLINE
                </span>
              </div>
            </div>

          </div>

          {/* COLUMN B: Responsive Interactive Contact Terminal (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-[#030303] border border-white/10 rounded-3xl relative overflow-hidden min-h-[500px]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-peach/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-mint/5 blur-3xl pointer-events-none" />

            {/* Terminal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 gap-3 select-none">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-peach/10 rounded-xl text-peach">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-xs text-white uppercase tracking-widest leading-none">
                    STAGING TRANSMISSION DESK
                  </h3>
                  <span className="font-mono text-[9px] text-gray-500 uppercase mt-1 block">
                    Securing route to: <span className="text-peach">{currentChannel.title}</span>
                  </span>
                </div>
              </div>

              <div className="font-mono text-[9px] text-mint bg-mint/10 border border-mint/20 px-3 py-1.5 rounded-xl block leading-none font-bold">
                ENVELOPE // ACTIVE_INGRESS
              </div>
            </div>

            {/* State Form block with animations */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col items-center justify-center text-center p-6 py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-mint/10 text-mint flex items-center justify-center mb-6 shadow-lg shadow-mint/5 border border-mint/20">
                    <CheckCircle2 className="w-8 h-8 stroke-[1.5px] animate-pulse" />
                  </div>
                  <h3 className="font-sans font-black text-2xl text-white mb-2">
                    Transmission Dispatched
                  </h3>
                  <p className="text-gray-400 font-light text-sm max-w-md leading-relaxed mb-8">
                    Your signal has successfully ingressed the routing loop. A cryptographic staging link and system handshake has been logged.
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:text-peach hover:border-peach/50 font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Open New Tunnel
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="input-form"
                  onSubmit={handlePostSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    
                    {/* Full Name field */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block select-none">
                        INQUIRER NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcella Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4.5 py-3.5 bg-black border border-white/8 rounded-xl outline-none focus:border-peach/60 text-white font-sans text-xs transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(255,175,135,0.04)]"
                      />
                    </div>

                    {/* Email address field */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block select-none">
                        CORPORATE SECURE EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. architectures@snowflake.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4.5 py-3.5 bg-black border border-white/8 rounded-xl outline-none focus:border-peach/60 text-white font-sans text-xs transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(255,175,135,0.04)]"
                      />
                    </div>

                  </div>

                  {/* Priority selector dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block select-none">
                      HANDSHAKE URGENCY PRIORITY
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Routine", "High Priority", "Critical Anomaly"].map((prio) => (
                        <button
                          key={prio}
                          type="button"
                          onClick={() => {
                            setUrgency(prio);
                            setTerminalFeed((prev) => [
                              ...prev.slice(-3),
                              `PRIO_MOD: Adjusted core latency threshold: [${prio.toUpperCase()}]`
                            ]);
                          }}
                          className={`py-2.5 rounded-xl border font-sans text-3xs font-black uppercase text-center transition-all cursor-pointer ${
                            urgency === prio
                              ? "bg-peach border-peach text-black font-extrabold shadow-md shadow-peach/10"
                              : "bg-black border-white/8 text-gray-400 hover:border-white/12"
                          }`}
                        >
                          {prio}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rich message box */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block select-none">
                      DIAGNOSTIC SIGNAL ENVELOPE (MESSAGE)
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your dataset clusters, schema latencies, or support request details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-black border border-white/8 rounded-xl outline-none focus:border-peach/60 text-white font-sans text-xs transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(255,175,135,0.04)] resize-none"
                    />
                  </div>

                  {/* Submit tunnel trigger button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-2 ${
                      isSubmitting 
                        ? "bg-white/5 border border-white/5 text-gray-600 select-none cursor-not-allowed" 
                        : "bg-gradient-to-tr from-peach via-white to-mint text-black hover:scale-[1.015] active:scale-[0.985]"
                    }`}
                  >
                    <span>{isSubmitting ? "Handshaking..." : "Secure Dispatch Transmission"}</span>
                    <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : "group-hover:translate-x-0.5"}`} />
                  </button>

                </motion.form>
              )}
            </AnimatePresence>

            {/* Micro Terminal Feed Box */}
            <div className="mt-6 p-4 bg-black border border-white/8 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-1.5 select-none">
                <TermIcon className="w-3.5 h-3.5 text-mint animate-pulse" />
                <span className="font-mono text-[8px] text-gray-500 uppercase">SYS_TELEMETRY_LOGS</span>
              </div>
              
              <div className="font-mono text-[9px] text-gray-400 flex flex-col gap-1 select-text">
                {terminalFeed.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1 p-0.5 leading-normal select-none">
                    <span className="text-mint font-bold">{">"}</span>
                    <p className="text-left">{log}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy footnote */}
            <div className="flex items-center justify-between text-[8px] text-gray-500 font-mono tracking-widest uppercase border-t border-white/5 pt-5 mt-6 select-none">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-mint" /> Encrypted Endpoint Verified
              </span>
              <span>TLS CORE 1.3 SEC_TUNNEL</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
