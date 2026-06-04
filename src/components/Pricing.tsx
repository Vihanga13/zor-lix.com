import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Terminal as TermIcon, Sparkles, RefreshCw } from "lucide-react";

interface PricingProps {
  onNavigate: (sectionId: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual" | "quarterly">("annual");
  const [activePlanIdx, setActivePlanIdx] = useState<number>(1);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<string | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  
  const plans = [
    {
      name: "Starter Segment",
      scaleName: "Growth Startup",
      price: billingCycle === "annual" ? 63 : 79,
      connectorRange: "1-5 Secure Sources",
      desc: "Perfect for high-growth startups testing automated schema cleaning & forecasting pipelines.",
      features: [
        "Up to 5 secure source integrations",
        "7-day prediction forecasting bounds",
        "Context-Aware automatic cleaning",
        "Daily Slack status digests",
        "Standard AES-256 vault encryption",
      ],
      cta: "Activate Trial",
      accent: "peach",
    },
    {
      name: "Professional Module",
      scaleName: "Scale-up Corporation",
      price: billingCycle === "annual" ? 159 : 199,
      connectorRange: "6-25 Secure Sources",
      desc: "Our most popular tier. Delivers full scale-up capabilities, WebSocket triggers, and neural modeling.",
      features: [
        "Up to 25 source integrations",
        "90-day neural forecast models",
        "Real-time live WebSocket pipelines",
        "Priority 24/7 developer channels",
        "Custom operational PDF reports",
        "Shared service levels SLAs support",
      ],
      cta: "Secure License",
      accent: "mint",
    },
    {
      name: "Enterprise Core",
      scaleName: "Decentralized Entity",
      price: billingCycle === "annual" ? 399 : 499,
      connectorRange: "26+ Secure Sources",
      desc: "Dedicated high-performance VM instances with customized AI Agents handling advanced SQL flows.",
      features: [
        "Infinite secure source integrations",
        "Custom fine-tuned prediction models",
        "Autonomous AI Agent executions",
        "Dedicated isolated physical databases",
        "Private tenant whiteglove deployments",
        "Custom service parameters & legal EAs",
      ],
      cta: "Contact Operations",
      accent: "peach",
    },
  ];

  const handleTriggerCheckout = (planName: string) => {
    setSelectedCheckoutPlan(planName);
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
    }, 1800);
  };

  return (
    <section id="pricing" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Absolute Ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-peach/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full animate-fade-in">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-peach bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full select-none">
            INTELLIGENCE LICENSING // METRIC_PROVISION
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mt-6 mb-4">
            Slide-to-Scale Configurator
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Specify your integration scaling volume below to automatically center and highlight the appropriate operational tier.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/5 p-1 rounded-xl mt-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4.5 py-2 rounded-lg text-xs font-sans font-bold tracking-wider transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-peach text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              MONTHLY CHARGE
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4.5 py-2 rounded-lg text-xs font-sans font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-peach text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              ANNUAL BILLING
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* CUSTOM INTERACTIVE ELEMENT: Horizontal Scale Configurator Slider */}
        <div className="max-w-4xl mx-auto bg-black border border-white/10 p-6 sm:p-8 rounded-3xl mb-12 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-mint/5 blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-4 select-none">
            <span>SPECIFY SOURCE INTEGRATION VOLUME:</span>
            <span className="text-peach font-bold uppercase tracking-wider">{plans[activePlanIdx].connectorRange}</span>
          </div>

          <input
            type="range"
            min="0"
            max="2"
            value={activePlanIdx}
            onChange={(e) => setActivePlanIdx(Number(e.target.value))}
            className="w-full h-1 bg-white/5 accent-peach rounded-full cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono mt-3 text-gray-400 select-none">
            <span onClick={() => setActivePlanIdx(0)} className="cursor-pointer hover:text-white">STARTER (1-5 Sources)</span>
            <span onClick={() => setActivePlanIdx(1)} className="cursor-pointer hover:text-white">PROFESSIONAL (6-25 Sources)</span>
            <span onClick={() => setActivePlanIdx(2)} className="cursor-pointer hover:text-white">ENTERPRISE (26+ Sources)</span>
          </div>
        </div>

        {/* The New Layout Layout: Staggered Spotlight Grid (12 Columns) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto text-left">
          
          {/* Main Selected Plan Module (8 Columns of grid) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlanIdx + billingCycle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-10 rounded-3xl bg-[#090909] border border-peach/50 flex flex-col justify-between h-full relative overflow-hidden shadow-[0_20px_45px_rgba(255,175,135,0.12)]"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-peach/5 blur-3xl pointer-events-none" />

                {/* Spotlight Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-peach uppercase font-bold tracking-widest bg-peach/10 px-2.5 py-0.5 rounded-lg">
                      {plans[activePlanIdx].scaleName}
                    </span>
                    <h3 className="text-3xl font-sans font-black text-white mt-3 tracking-tight">
                      {plans[activePlanIdx].name}
                    </h3>
                    <p className="text-gray-400 font-light text-xs sm:text-sm mt-1.5 max-w-lg leading-relaxed">
                      {plans[activePlanIdx].desc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 shrink-0 bg-black/90 p-4 rounded-2xl border border-white/5">
                    <span className="text-4xl font-sans font-black text-white">$</span>
                    <span className="text-4xl font-sans font-black text-white">{plans[activePlanIdx].price}</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider ml-1">/ mo</span>
                  </div>
                </div>

                {/* Features Columns */}
                <div className="grid sm:grid-cols-2 gap-6 my-4">
                  {plans[activePlanIdx].features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 font-light">
                      <div className="w-4 h-4 rounded-full bg-mint/10 border border-mint/20 text-mint shrink-0 mt-0.5 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA operations row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/5 mt-8">
                  <div className="flex items-center gap-2 text-2xs font-mono text-gray-500">
                    <HelpCircle className="w-4.5 h-4.5" />
                    <span>All prices billed on checkpoint boundaries.</span>
                  </div>

                  <button
                    onClick={() => handleTriggerCheckout(plans[activePlanIdx].name)}
                    className="px-8 py-4 bg-gradient-to-tr from-peach via-white to-mint text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    {plans[activePlanIdx].cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Select Panel list of other layers (4 Columns of grid) */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-2">
              FALLBACK LICENSING LAYERS
            </span>

            {plans.map((p, pIdx) => {
              const isSelected = activePlanIdx === pIdx;

              return (
                <div
                  key={p.name}
                  onClick={() => setActivePlanIdx(pIdx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px] relative overflow-hidden select-none ${
                    isSelected
                      ? "bg-[#111] border-peach shadow"
                      : "bg-[#050505] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-sans font-extrabold text-sm text-white">{p.name}</h4>
                    <span className="font-mono text-[10px] text-peach font-bold">${p.price}/mo</span>
                  </div>
                  
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block">
                    {p.connectorRange} LIMIT
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Tactical Checkout Sandbox Drawer Overlay */}
        <AnimatePresence>
          {selectedCheckoutPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden text-left"
              >
                <button
                  onClick={() => setSelectedCheckoutPlan(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono text-xs bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 cursor-pointer"
                >
                  ESC [✖]
                </button>

                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <TermIcon className="w-4 h-4 text-peach animate-pulse" />
                  <span className="font-mono text-[10px] text-gray-400 uppercase">LUMINA_LICENSING_SANDBOX</span>
                </div>

                {isProcessingCheckout ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4 select-none">
                    <RefreshCw className="w-10 h-10 text-peach animate-spin" />
                    <p className="font-mono text-xs text-gray-400">CONNECTING CLIENT DATA LEDGER INSTANCE...</p>
                    <div className="w-48 bg-white/5 h-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.6 }}
                        className="bg-peach h-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-mint/10 text-mint rounded-2xl">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-xl font-sans font-black text-white">License Sandbox Provisioned</h4>
                        <p className="text-xs font-mono text-mint uppercase mt-0.5">Status: Staging Standby active</p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                      We have compiled a secure sandbox instance for <strong className="text-white font-bold">{selectedCheckoutPlan}</strong> permissions. All connected Snowflake instances or MySQL nodes established in the active console will authenticate fully.
                    </p>

                    <div className="p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-peach flex flex-col gap-1.5 select-all">
                      <span>{"{"}</span>
                      <span>  "nodeId": "alpha_config_{Date.now().toString().slice(-4)}",</span>
                      <span>  "planModuleCode": "{selectedCheckoutPlan}",</span>
                      <span>  "securityWarp": "AES_256_E2EE"</span>
                      <span>{"}"}</span>
                    </div>

                    <button
                      onClick={() => setSelectedCheckoutPlan(null)}
                      className="w-full py-4 bg-white text-black font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:bg-neutral-200 transition-all active:scale-[0.98]"
                    >
                      Enter Operating Sandbox
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
