import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import AIPipeline from "./components/AIPipeline";
import LiveDashboard from "./components/LiveDashboard";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Integrations from "./components/Integrations";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import ComplianceVault from "./components/ComplianceVault";
import ZorlixaProduct from "./components/ZorlixaProduct";
import Footer from "./components/Footer";
import ChatwootWidget from "./components/ChatwootWidget";
import CookieBanner from "./components/CookieBanner";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [view, setView] = useState<"landing" | "terms" | "privacy" | "audits" | "zorlixa">("landing");

  // Track scroll position to update active nav section matching visible anchors
  useEffect(() => {
    if (view !== "landing") return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Normalize section indices matching corresponding Nav targets
          let sectionId = entry.target.id;
          if (sectionId === "home") setActiveSection("home");
          else if (sectionId === "features") setActiveSection("features");
          else if (sectionId === "pipeline") setActiveSection("pipeline");
          else if (sectionId === "dashboard") setActiveSection("dashboard");
          else if (sectionId === "pricing") setActiveSection("pricing");
          else if (sectionId === "faq") setActiveSection("faq");
          else if (sectionId === "contact") setActiveSection("contact");
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // High precision viewport window
      threshold: 0,
    });

    const targets = ["home", "features", "pipeline", "dashboard", "pricing", "faq", "contact"];
    targets.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [view]);

  const handleNavigation = (sectionId: string) => {
    if (sectionId === "terms" || sectionId === "privacy" || sectionId === "audits" || sectionId === "zorlixa") {
      setView(sectionId);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setView("landing");
    setActiveSection(sectionId);
    
    // Smooth delay for DOM rendering
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <div className="bg-black text-gray-200 selection:bg-peach selection:text-black">
      {/* Primary Sticky Header Menu */}
      <Navbar onNavigate={handleNavigation} activeSection={view === "landing" ? activeSection : ""} />

      {/* Main Single Page Sections Array / Dedicated Page view toggle */}
      {view === "landing" ? (
        <main>
          {/* Section 1: Hero Segment */}
          <Hero onNavigate={handleNavigation} />

          {/* Section 2: Trust Partners Bar */}
          <TrustBar />

          {/* Section 3: Architecture Core Features */}
          <Features />

          {/* Section 4: Operational Process How It Works */}
          <HowItWorks />

          {/* Section 5: Dynamic AI Topology Pipeline */}
          <AIPipeline />

          {/* Section 6: Live Interaction Console Dashboard */}
          <LiveDashboard />

          {/* Section 7: Statistics and Value Impacts */}
          <Benefits />

          {/* Section 8: Reviews and Endorsement Carousel */}
          <Testimonials />

          {/* Section 9: Tools Integration Registry Grid */}
          <Integrations />

          {/* Section 10: Pricing packages scheme */}
          <Pricing onNavigate={handleNavigation} />

          {/* Section 11: Accordions FAQ */}
          <FAQ />

          {/* Section 12: Ingress Contact Terminal Form */}
          <Contact />
        </main>
      ) : view === "zorlixa" ? (
        <ZorlixaProduct
          onBackToLanding={() => {
            setView("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onNavigate={handleNavigation}
        />
      ) : (
        <ComplianceVault
          activeTab={view}
          onTabChange={(tab) => setView(tab)}
          onBackToLanding={() => {
            setView("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* Platform Footer Information */}
      <Footer onNavigate={handleNavigation} />

      <ChatwootWidget />
      <CookieBanner />
    </div>
  );
}
