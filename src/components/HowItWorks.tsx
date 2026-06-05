import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Terminal as TermIcon, ChevronRight, Layers, ArrowRight, RotateCw, RefreshCw } from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const stepsList = [
    {
      title: "One-Click Sync",
      subtitle: "Ingest any DB",
      desc: "Connect your SQL schemas, SaaS keys, or analytics feeds. Our zero-config connectors discover your tables, metrics, and relationships automatically in under 60 seconds.",
      icon: "/Interactive Orbit Dial_result.webp",
      accent: "peach",
      dataView: {
        action: "CONNECTIVITY STATUS",
        metricName: "Cloud Connectors",
        metricValue: "42 Enabled",
        status: "OPTIMIZED",
        codeSnippet: `ZorLix.connect({\n  provider: "snowflake",\n  auth: "E2EE_VAULT",\n  autoDiscovery: true\n});`,
      },
    },
    {
      title: "Contextual Cleanse",
      subtitle: "Neutralizing anomalies",
      desc: "Our pre-processing agent scans records for schema drift, null values, and timing anomalies. It repairs tables instantly, creating high-fidelity pristine streams.",
      icon: "/Interactive Orbit Dial (2)_result.webp",
      accent: "mint",
      dataView: {
        action: "MODEL SANITIZER",
        metricName: "Anomalies Caught",
        metricValue: "0 Detected Today",
        status: "PRISTINE_READY",
        codeSnippet: `ZorLix.clean({\n  imputeNulls: "auto",\n  alignTimestamps: "UTC",\n  schemaValidation: "strict"\n});`,
      },
    },
    {
      title: "Neural Engine",
      subtitle: "Dynamic forecasting",
      desc: "Pre-trained proprietary transformer models construct predictions for user acquisition, churn, inventory bottlenecks, and sales cycles without manual coding.",
      icon: "/Interactive Orbit Dial (3)_result.webp",
      accent: "peach",
      dataView: {
        action: "FORECASTING ENGINE",
        metricName: "AI Confidence Interval",
        metricValue: "±2.1% Deviation",
        status: "ACCURATE",
        codeSnippet: `ZorLix.predict({\n  horizon: "90d",\n  model: "transformer-v4",\n  confidence: 0.95\n});`,
      },
    },
    {
      title: "Autonomous Actions",
      subtitle: "Trigger automation",
      desc: "Build live webhook triggers or direct our specialized AI Agents to execute workflows. Seamlessly alert your team on Slack or update sheets when anomalies are detected.",
      icon: "/Interactive Orbit Dial (4)_result.webp",
      accent: "mint",
      dataView: {
        action: "DISPATCH DISPATCHER",
        metricName: "Slack Workflows",
        metricValue: "Active 24/7",
        status: "ARMED",
        codeSnippet: `ZorLix.onAnomaly((anomaly) => {\n  Slack.notify("Critical drop detected!");\n  CloudRun.triggerRedundancy();\n});`,
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background ambient light effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-peach/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-24 text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-peach bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full select-none">
            OPERATIONAL PIPELINE STEPPERS
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-white mt-6 mb-4">
            Interactive Orbit Dial
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
            Click directly on any satellite node around the rotating radial orbit wheel on the left. Watch the diagnostic console on the right pivot to display real-time script routines instanstly.
          </p>
        </div>

        {/* The New Layout: Orbit Dial & Diagnostic Split (Column 12) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: The Interactive Rotating Orbit Selector Hub (Column 6) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] select-none p-4">
            
            {/* Concentric helper rings */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 animate-pulse" />
            <div className="absolute w-[240px] h-[240px] rounded-full border border-white/10" />
            
            {/* Core rotating center capsule displaying active step info */}
            <div className="relative z-20 w-40 h-40 rounded-full bg-gradient-to-tr from-peach via-black to-mint p-[1.5px] shadow-[0_0_35px_rgba(255,175,135,0.15)] flex items-center justify-center bg-black">
              <div className="absolute inset-[1.5px] bg-[#070707] rounded-full flex flex-col items-center justify-center p-4 text-center">
                <span className="font-mono text-[9px] text-[#FFAF87] font-bold block mb-1">CURRENT ENGINE</span>
                <span className="text-sm font-sans font-black text-white leading-tight uppercase">
                  STAGE_0{activeStep + 1}
                </span>
                <span className="font-mono text-[8px] text-gray-500 block uppercase mt-1">
                  {stepsList[activeStep].subtitle}
                </span>

                {/* Spinning loader decorator */}
                <RefreshCw className="w-4 h-4 text-mint animate-spin mt-3" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* Satellites positioned polar-coordinates style dynamically based on step index */}
            {stepsList.map((step, idx) => {
              // Polar angle coordinates offsets
              const angle = (idx / stepsList.length) * 2 * Math.PI - Math.PI / 2;
              const radiusPix = 135;
              const posX = radiusPix * Math.cos(angle);
              const posY = radiusPix * Math.sin(angle);
              
              const isSelected = activeStep === idx;

              return (
                <div key={step.title}>
                  {/* Neon connect ray */}
                  {isSelected && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ transform: "none" }}>
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${posX}px)`}
                        y2={`calc(50% + ${posY}px)`}
                        stroke="#FFAF87"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    </svg>
                  )}

                  <motion.button
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                    style={{
                      transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`,
                    }}
                    className={`absolute top-1/2 left-1/2 z-30 w-14 h-14 rounded-full border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[#111111] border-peach text-peach shadow-[0_0_15px_rgba(255,175,135,0.25)] scale-110"
                        : "bg-[#050505] border-white/5 text-gray-500 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <img 
                      src={step.icon} 
                      alt="" 
                      className="w-8 h-8 mb-1 object-contain"
                    />
                    <span className="font-mono text-[8px] leading-none">0{idx + 1}</span>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Right Block: Fully synchronized Code & Diagnostic Control Board HUD (Column 6) */}
          <div className="lg:col-span-6">
            <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl min-h-[440px] flex flex-col justify-between relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <TermIcon className="w-4 h-4 text-mint animate-pulse" />
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                      ZOR_LIX_PIPELINE_STAGING_ENV
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-mint flex items-center gap-1.5 bg-mint/10 border border-mint/15 px-2.5 py-0.5 rounded-full select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint animate-ping" />
                    STAGE_SYNCED
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-mint uppercase tracking-widest block">
                        {stepsList[activeStep].dataView.action}
                      </span>
                      <h4 className="text-2xl font-sans font-extrabold text-white mt-1">
                        {stepsList[activeStep].title} – {stepsList[activeStep].subtitle}
                      </h4>
                      <p className="text-gray-400 text-sm font-light mt-2 leading-relaxed">
                        {stepsList[activeStep].desc}
                      </p>
                    </div>

                    {/* Code sandbox trigger display */}
                    <div className="p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-peach select-all overflow-x-auto whitespace-pre">
                      {stepsList[activeStep].dataView.codeSnippet}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Connected operational feedback metrics */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6">
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                    {stepsList[activeStep].dataView.metricName}
                  </span>
                  <span className="text-lg font-sans font-black text-white block mt-1">
                    {stepsList[activeStep].dataView.metricValue}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                    MODULE HEALTH
                  </span>
                  <span className="text-lg font-sans font-black text-mint block mt-1">
                    {stepsList[activeStep].dataView.status}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
