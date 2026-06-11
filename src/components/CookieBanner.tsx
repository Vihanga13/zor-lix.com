import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[380px] z-[9999] bg-[#050505]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden font-syne"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {/* Subtle gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFAF87]/5 to-transparent pointer-events-none" />
          
          <div className="relative p-5">
            <button 
              onClick={handleDecline}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFAF87]/10 border border-[#FFAF87]/20 text-[#FFAF87]">
                <Cookie className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">Cookie Policy</h3>
            </div>
            
            <p className="text-xs text-gray-400 mb-5 leading-relaxed font-mono tracking-wide">
              We use cookies to optimize site functionality and analyze telemetry data. By accepting, you consent to our privacy protocols.
            </p>
            
            <div className="flex gap-2.5">
              <button
                onClick={handleDecline}
                className="flex-1 py-2 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2 px-3 text-[10px] font-bold tracking-widest uppercase text-[#050505] bg-gradient-to-r from-[#FFAF87] to-[#C5E898] hover:shadow-[0_0_15px_rgba(255,175,135,0.4)] rounded-xl transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
