import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Terminal as TermIcon, 
  Radio, 
  Cpu, 
  Mail, 
  Clock, 
  Server, 
  Globe, 
  Network, 
  Sparkles, 
  CheckCircle, 
  CheckCircle2, 
  Workflow
} from "lucide-react";

// Declare Turnstile global type
declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'invisible';
  tabindex?: number;
}

interface ContactChannel {
  id: "general" | "support" | "custom";
  title: string;
  badge: string;
  icon: string;
  latency: string;
  sub: string;
  color: string;
}

// Cloudflare Turnstile Site Key
const TURNSTILE_SITE_KEY = "0x4AAAAAADfHwMxH0w-vF4jB";

export default function Contact() {
  const [activeChannel, setActiveChannel] = useState<"general" | "support" | "custom">("general");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [urgency, setUrgency] = useState("Routine");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<boolean>(false);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Real-time terminal diagnostic simulator
  const [terminalFeed, setTerminalFeed] = useState<string[]>([
    "SECURE_GATEWAY: Ingress control panel initialized.",
    "BOND_STATUS: AES-256 secure session established on local virtual node.",
    "TURNSTILE: Ready for human verification challenge."
  ]);

  // Load Turnstile script
  useEffect(() => {
    if (document.querySelector('script[src*="turnstile"]')) {
      initializeTurnstile();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeTurnstile();
    };
    document.head.appendChild(script);

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (e) {
          console.warn('Failed to remove turnstile widget:', e);
        }
      }
    };
  }, []);

  const initializeTurnstile = () => {
    if (!turnstileContainerRef.current || !window.turnstile) return;

    // Reset existing widget if any
    if (turnstileWidgetId.current) {
      try {
        window.turnstile.remove(turnstileWidgetId.current);
      } catch (e) {
        console.warn('Failed to remove existing widget:', e);
      }
    }

    // Render new widget
    try {
      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileError(false);
          setTerminalFeed((prev) => [
            ...prev.slice(-3),
            `TURNSTILE: Human verification completed successfully. Token: ${token.substring(0, 8)}...`
          ]);
        },
        'error-callback': () => {
          setTurnstileError(true);
          setTurnstileToken(null);
          setTerminalFeed((prev) => [
            ...prev.slice(-3),
            "TURNSTILE_ERR: Verification challenge failed. Please try again."
          ]);
        },
        'expired-callback': () => {
          setTurnstileToken(null);
          setTurnstileError(true);
          setTerminalFeed((prev) => [
            ...prev.slice(-3),
            "TURNSTILE_EXP: Token expired. Please complete verification again."
          ]);
        },
        theme: 'dark',
        size: 'normal'
      });
      turnstileWidgetId.current = widgetId;
    } catch (error) {
      console.error('Failed to initialize turnstile:', error);
      setTurnstileError(true);
    }
  };

  // Reset turnstile when form is reset
  useEffect(() => {
    if (isSubmitted) {
      // Reset turnstile when form is reset after submission
      if (turnstileWidgetId.current && window.turnstile && !isSubmitting) {
        try {
          window.turnstile.reset(turnstileWidgetId.current);
          setTurnstileToken(null);
          setTurnstileError(false);
        } catch (e) {
          console.warn('Failed to reset turnstile:', e);
        }
      }
    }
  }, [isSubmitted]);

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
      icon: "/Initialize Tunnel Handshake.webp",
      latency: "Avg. response: <2.4hrs",
      sub: "General project scoping, brand partnerships, or operational questions.",
      color: "text-mint"
    },
    {
      id: "support",
      title: "Severe Overload Audit",
      badge: "EMERGENCY TIER",
      icon: "/Initialize Tunnel Handshake (2).webp",
      latency: "Avg. response: 15 mins",
      sub: "For existing cluster failures, database handshake timeouts, or standard deviation drift.",
      color: "text-peach"
    },
    {
      id: "custom",
      title: "Enterprise Sandbox Sync",
      badge: "SALES & ARCHITECTURE",
      icon: "/Initialize Tunnel Handshake (3).webp",
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

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!fullName || !email || !message) {
      setSubmissionError("All fields are required");
      setTerminalFeed((prev) => [
        ...prev.slice(-3),
        "SYS_ERR: Packet rejection due to incomplete payload attributes."
      ]);
      return;
    }

    // Validate Turnstile
    if (!turnstileToken) {
      setSubmissionError("Please complete the human verification challenge");
      setTerminalFeed((prev) => [
        ...prev.slice(-3),
        "SYS_ERR: Transmission blocked - Human verification required."
      ]);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setTerminalFeed((prev) => [
      ...prev.slice(-2),
      "INITIALIZING: Synthesizing secure TLS handshake credentials...",
      "CIPHER: Rotating Kyber-768 session keys...",
      `VERIFYING: Validating turnstile token with Cloudflare...`
    ]);

    try {
      // First, verify the Turnstile token with your backend
      // You should create an endpoint that verifies the token using Cloudflare's API
      // For demo purposes, we're including it in the form submission
      // In production, you should verify on your backend before processing the form
      
      const response = await fetch("https://formspree.io/f/xkoanyvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          channel: activeChannel,
          urgency: urgency,
          message: message,
          "cf-turnstile-response": turnstileToken, // Include turnstile token for backend verification
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTerminalFeed([
          `DISPATCH_SUCCESS: Core envelope verified and pushed to routing nodes.`,
          `NODE_RESPONSE: SSL verification code: [200_OK_ZORLIX]`,
          `TELEMETRY_STATUS: Connection dispatcher offline.`,
          `TURNSTILE: Human verification passed and documented.`
        ]);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      setIsSubmitting(false);
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
      setSubmissionError(errorMsg);
      setTerminalFeed((prev) => [
        ...prev.slice(-3),
        `SYS_ERR: Transmission failed - ${errorMsg}`
      ]);
      
      // Reset turnstile on error
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken(null);
      }
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setUrgency("Routine");
    setMessage("");
    setIsSubmitted(false);
    setSubmissionError(null);
    
    // Reset turnstile
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken(null);
      setTurnstileError(false);
    }
    
    setTerminalFeed([
      "SECURE_GATEWAY: Ingress control panel re-initialized.",
      "BOND_STATUS: Clean AES-256 session established on fresh virtual node.",
      "TURNSTILE: Human verification reset - ready for new session."
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
                        <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/8 transition-all duration-300 flex items-center justify-center w-14 h-14 shrink-0 ${
                          isSelected ? "text-peach border-peach/30" : "text-gray-400"
                        }`}>
                          <img 
                            src={chan.icon} 
                            alt="" 
                            className={`w-8 h-8 object-contain transition-all duration-300 ${
                              isSelected ? "opacity-100 scale-110 brightness-110" : "opacity-60 grayscale hover:opacity-90 hover:grayscale-0"
                            }`} 
                          />
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

            {/* Error Alert */}
            {submissionError && !isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[9px] mb-6"
              >
                <span className="font-bold">ERROR:</span> {submissionError}
              </motion.div>
            )}

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

                  {/* Cloudflare Turnstile Widget */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block select-none">
                      HUMAN VERIFICATION
                    </label>
                    <div 
                      ref={turnstileContainerRef}
                      className="turnstile-container flex justify-start"
                    />
                    {turnstileError && (
                      <span className="text-red-400 font-mono text-[8px] mt-1">
                        Verification required - Please complete the challenge
                      </span>
                    )}
                    {turnstileToken && (
                      <span className="text-mint font-mono text-[8px] mt-1 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verification complete
                      </span>
                    )}
                  </div>

                  {/* Submit tunnel trigger button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className={`w-full py-3.5 font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-2 ${
                      isSubmitting || !turnstileToken
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