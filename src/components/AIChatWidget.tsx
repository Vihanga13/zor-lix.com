import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Cpu, Bot, Sparkles, TrendingUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "user" | "ai";
  text: string;
  time: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Greetings! I am the Zor-Lix Autonomous Companion. Which business telemetry, predictive forecaster, or pipeline setup should we analyze together today?",
      time: "Just now",
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const quickQuestions = [
    "Forecast ARR for next quarter",
    "How does the AI pipeline clean data?",
    "Check model accuracy levels",
  ];

  const handleSendResponse = (promptStr: string) => {
    if (!promptStr.trim()) return;

    // Append User Prompt
    const newMsg: Message = {
      sender: "user",
      text: promptStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // AI simulated realistic response logic
    setTimeout(() => {
      let aiResponseText = "";
      const query = promptStr.toLowerCase();

      if (query.includes("forecast") || query.includes("arr")) {
        aiResponseText = "Zor-Lix's forecasting engine projects ARR climbing to $28.4M by Q3 (+15.5% QoQ). The 95% confidence interval shows fluctuation bound between $27.9M and $28.9M using our transformer-v4 seasonality index.";
      } else if (query.includes("clean") || query.includes("how does")) {
        aiResponseText = "Our Context-Aware Pre-processing Agent scans databases for schema drifts or duplicate logs. It replaces null metrics with interpolated averages, ensuring pristine inputs for neural projection layers.";
      } else if (query.includes("accuracy") || query.includes("confidence")) {
        aiResponseText = "Zor-Lix's predictive neural models operate with a recorded structural data accuracy level of 99.8%. Standard time-series deviations average less than ±2.1% globally across multi-tenant connected databases.";
      } else {
        aiResponseText = "Understood. Our AI Core Agents are currently operating under sub-millisecond latencies. I can help provision automated email digests of these metrics, or connect additional Postgres and Snowflake warehouses. What is your next operational target?";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendResponse(inputText);
    }
  };

  return (
    <div id="ai-chat-widget-root" className="fixed bottom-6 right-6 z-100 flex flex-col items-end">
      {/* Dynamic Pop-up Drawer Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-[330px] sm:w-[380px] h-[500px] mb-4 rounded-3xl glassmorphism-glow border border-peach/25 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header segment of Chat */}
            <div className="p-4 bg-black/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-peach/10 border border-peach/30 flex items-center justify-center text-peach">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  {/* Status Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-mint border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white flex items-center gap-1">
                    Zor-Lix Companion
                    <Sparkles className="w-3 h-3 text-peach" />
                  </h3>
                  <span className="font-mono text-[9px] text-mint uppercase tracking-wider block">
                    Telemetry Copilot ON
                  </span>
                </div>
              </div>
              <button
                id="ai-chat-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close Chat Companion"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Messages Section */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
              id="ai-chat-messages-container"
            >
              {messages.map((msg, idx) => {
                const isAI = msg.sender === "ai";
                return (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      isAI ? "self-start items-start" : "self-end items-end"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed tracking-wide ${
                        isAI
                          ? "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none"
                          : "bg-peach text-black font-semibold rounded-tr-none shadow-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="font-mono text-[8px] text-gray-500 mt-1 uppercase tracking-widest">
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {/* Bot thinking placeholder indicator */}
              {isTyping && (
                <div className="self-start flex items-center gap-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-gray-400 font-mono text-[10px]">
                  <Cpu className="w-3.5 h-3.5 animate-spin text-peach" />
                  <span>Zor-Lix Core in_computation...</span>
                </div>
              )}
            </div>

            {/* Quick Helper Questions tags */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 pt-1 border-t border-white/5">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mb-1.5">
                  Suggested Queries
                </span>
                <div className="flex flex-col gap-1.5">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendResponse(q)}
                      className="text-left w-full px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-peach/30 text-[10px] font-sans transition-all cursor-pointer truncate"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Core Message Input Field Box */}
            <div className="p-3 bg-black/40 border-t border-white/5 flex items-center gap-2">
              <input
                type="text"
                id="ai-chat-text-input"
                placeholder="Ask Zor-Lix Companion..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 text-white placeholder-gray-500 outline-none border border-white/5 focus:border-peach/20 text-xs font-sans"
              />
              <button
                id="ai-chat-send-btn"
                onClick={() => handleSendResponse(inputText)}
                className="p-2.5 rounded-xl bg-peach text-black hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer"
                aria-label="Send messages"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button with glowing circles */}
      <motion.button
        id="ai-chat-widget-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-peach text-black flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(255,175,135,0.4)] relative group focus:outline-none"
        aria-label="Launch AI Telemetry Companion"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-6 h-6 text-black" key="close" />
          ) : (
            <div className="relative flex items-center justify-center" key="chat">
              <MessageSquare className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
              {/* Dynamic Notification Badge dot */}
              <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-mint animate-ping" />
            </div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
