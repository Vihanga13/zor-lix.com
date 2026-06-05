import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, HelpCircle } from "lucide-react";
import PayPalButtons from "./PayPalButtons";
import type { BillingCycle } from "../utils/planPricing";

interface PricingProps {
  onNavigate: (sectionId: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");
  const [activePlanIdx, setActivePlanIdx] = useState<number>(1);

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
     
      accent: "peach",
    },
  ];

  const activePlan = plans[activePlanIdx];

  const handlePaymentSuccess = useCallback((orderId: string) => {
    alert(`Payment successful! Order ID: ${orderId}`);
  }, []);

  return (
    <section id="pricing" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-peach/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10 w-full animate-fade-in">
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

        <div className="max-w-4xl mx-auto bg-black border border-white/10 p-6 sm:p-8 rounded-3xl mb-12 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-mint/5 blur-2xl pointer-events-none" />

          <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-4 select-none">
            <span>SPECIFY SOURCE INTEGRATION VOLUME:</span>
            <span className="text-peach font-bold uppercase tracking-wider">{activePlan.connectorRange}</span>
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

        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto text-left">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlanIdx + billingCycle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-10 rounded-3xl bg-[#090909] border border-peach/50 flex flex-col justify-between h-full relative shadow-[0_20px_45px_rgba(255,175,135,0.12)]"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-peach/5 blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-peach uppercase font-bold tracking-widest bg-peach/10 px-2.5 py-0.5 rounded-lg">
                      {activePlan.scaleName}
                    </span>
                    <h3 className="text-3xl font-sans font-black text-white mt-3 tracking-tight">
                      {activePlan.name}
                    </h3>
                    <p className="text-gray-400 font-light text-xs sm:text-sm mt-1.5 max-w-lg leading-relaxed">
                      {activePlan.desc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 shrink-0 bg-black/90 p-4 rounded-2xl border border-white/5">
                    <span className="text-4xl font-sans font-black text-white">$</span>
                    <span className="text-4xl font-sans font-black text-white">{activePlan.price}</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider ml-1">/ mo</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 my-4">
                  {activePlan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 font-light">
                      <div className="w-4 h-4 rounded-full bg-mint/10 border border-mint/20 text-mint shrink-0 mt-0.5 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-6 pt-8 border-t border-white/5 mt-8">
                  <div className="flex items-center gap-2 text-2xs font-mono text-gray-500">
                    <HelpCircle className="w-4.5 h-4.5" />
                    <span>All prices billed on checkpoint boundaries.</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-5">
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3">
                      Pay with PayPal — ${activePlan.price}/mo ({billingCycle})
                    </p>
                    <PayPalButtons
                      key={`${activePlan.name}-${activePlan.price}-${billingCycle}`}
                      planName={activePlan.name}
                      amount={activePlan.price}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

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
      </div>
    </section>
  );
}
