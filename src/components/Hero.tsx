import React, { useState, useEffect, useRef } from "react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
}

const databasesList = [
  { id: "snowflake", name: "Snowflake", iconPath: "M12,2C11.5,2 11,2.19 10.59,2.59L6.41,6.77C5.59,7.59 5.59,8.88 6.41,9.7L10.59,13.88C11,14.29 11.5,14.5 12,14.5C12.5,14.5 13,14.31 13.41,13.9L17.59,9.72C18.41,8.9 18.41,7.61 17.59,6.79L13.41,2.61C13,2.2 12.5,2 12,2M12,4.18L14.82,7L12,9.82L9.18,7L12,4.18M19,10.5C18.62,10.5 18.27,10.67 18.04,10.97L14.5,15.5C14.27,15.8 14.27,16.2 14.5,16.5L18.04,21.03C18.27,21.33 18.62,21.5 19,21.5C19.38,21.5 19.73,21.33 19.96,21.03L23.5,16.5C23.73,16.2 23.73,15.8 23.5,15.5L19.96,10.97C19.73,10.67 19.38,10.5 19,10.5M19,12.82L21.18,16L19,19.18L16.82,16L19,12.82M5,10.5C4.62,10.5 4.27,10.67 4.04,10.97L0.5,15.5C0.27,15.8 0.27,16.2 0.5,16.5L4.04,21.03C4.27,21.33 4.62,21.5 5,21.5C5.38,21.5 5.73,21.33 5.96,21.03L9.5,16.5C9.73,16.2 9.73,15.8 9.5,15.5L5.96,10.97C5.73,10.67 5.38,10.5 5,10.5M5,12.82L7.18,16L5,19.18L2.82,16L5,12.82Z", speed: "0.08ms", color: "#FFAF87" },
  { id: "google",    name: "Google BigQuery", iconPath: "M4,3H5V4H4V3M6,3H7V4H6V3M8,3H9V4H8V3M10,3H11V4H10V3M12,3H13V4H12V3M14,3H15V4H14V3M16,3H17V4H16V3M18,3H19V4H18V3M20,3H21V4H20V3M3,5H4V6H3V5M5,5H6V6H5V5M7,5H8V6H7V5M9,5H10V6H9V5M11,5H12V6H11V5M13,5H14V6H13V5M15,5H16V6H15V5M17,5H18V6H17V5M19,5H20V6H19V5M21,5H22V6H21V5M2,7H3V8H2V7M4,7H5V8H4V7M6,7H7V8H6V7M8,7H9V8H8V7M10,7H11V8H10V7M12,7H13V8H12V7M14,7H15V8H14V7M16,7H17V8H16V7M18,7H19V8H18V7M20,7H21V8H20V7M22,7H23V8H22V7M3,9H4V10H3V9M5,9H6V10H5V9M7,9H8V10H7V9M9,9H10V10H9V9M11,9H12V10H11V9M13,9H14V10H13V9M15,9H16V10H15V9M17,9H18V10H17V9M19,9H20V10H19V9M21,9H22V10H21V9M4,11H5V12H4V11M6,11H7V12H6V11M8,11H9V12H8V11M10,11H11V12H10V11M12,11H13V12H12V11M14,11H15V12H14V11M16,11H17V12H16V11M18,11H19V12H18V11M20,11H21V12H20V11", speed: "0.12ms", color: "#C5E898" },
  { id: "aws",       name: "Amazon AWS S3", iconPath: "M19,13H5V11H19M19,19H5V17H19M19,7H5V5H19M21,20.1C21,20.6 20.6,21 20.1,21H3.9C3.4,21 3,20.6 3,20.1V3.9C3,3.4 3.4,3 3.9,3H20.1C20.6,3 21,3.4 21,3.9V20.1Z", speed: "0.15ms", color: "#FFFFFF" },
  { id: "stripe",    name: "Stripe Ledger", iconPath: "M20,8H4C2.9,8 2,8.9 2,10V20C2,21.1 2.9,22 4,22H20C21.1,22 22,21.1 22,20V10C22,8.9 21.1,8 20,8M20,20H4V10H20V20M6,15.5C6,14.12 7.12,13 8.5,13C9.88,13 11,14.12 11,15.5C11,16.88 9.88,18 8.5,18C7.12,18 6,16.88 6,15.5M13,13H18V14H13V13M13,15H18V16H13V15M13,17H18V18H13V17Z", speed: "0.04ms", color: "#F59E0B" },
];

const dbLogs: Record<string, string[]> = {
  snowflake: [
    "SNOWFLAKE_CONNECT: Discovered 8 active query clusters.",
    "COMPILER_PROBE: Handshake established under TLS_v1.3.",
    "INGRESS_OK: Live staging pipelines synced successfully.",
  ],
  google: [
    "BIGQUERY_LINKED: Reconciling ledger records in real-time.",
    "CLUSTER_SCAN: Partition scanning of 14M rows compiled.",
    "DENSITY_INDEX: High fidelity vector stream secure.",
  ],
  aws: [
    "S3_BUCKET_ATTACH: Listening to event notifications.",
    "SECURITY_DECRYPT: Decoying telemetry feeds with custom keys.",
    "INTEGRITY_OK: All cloud telemetry blocks verified.",
  ],
  stripe: [
    "STRIPE_LEDGER: Syncing instant processing pipelines.",
    "EXCHANGE_RECONCILE: Currencies linked for universal index.",
    "DISPATCH_PEAK: Ledger pipeline established in 0.03ms.",
  ],
};

const GEAR_PATH =
  "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.47,5.34 14.86,5.08L14.47,2.42C14.43,2.18 14.22,2 13.97,2H9.97C9.72,2 9.51,2.18 9.47,2.42L9.08,5.08C8.47,5.34 7.9,5.66 7.38,6.05L4.89,5.05C4.67,4.96 4.4,5.05 4.28,5.27L2.28,8.73C2.16,8.95 2.21,9.22 2.4,9.37L4.51,11C4.47,11.34 4.45,11.67 4.45,12C4.45,12.33 4.47,12.65 4.51,12.97L2.4,14.63C2.21,14.78 2.16,15.05 2.28,15.27L4.28,18.73C4.4,18.95 4.67,19.03 4.89,18.95L7.38,17.95C7.9,18.34 8.47,18.66 9.08,18.92L9.47,21.58C9.51,21.82 9.72,22 9.97,22H13.97C14.22,22 14.43,21.82 14.47,21.58L14.86,18.92C15.47,18.66 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";

export default function Hero({ onNavigate }: HeroProps) {
  const [streamFrequency, setStreamFrequency] = useState<number>(5);
  const [amplitude, setAmplitude] = useState<number>(35);
  const [selectedNode, setSelectedNode] = useState<string>("snowflake");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [systemTime, setSystemTime] = useState<string>("12:00:00.000 UTC");
  const [radialAngle, setRadialAngle] = useState<number>(0);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [gearRotation, setGearRotation] = useState<number>(0);
  const [wavePath, setWavePath] = useState<string>("");
  const [sweepEnd, setSweepEnd] = useState<{ x: number; y: number }>({ x: 230, y: 120 });
  const [orbPositions, setOrbPositions] = useState<{ x: number; y: number }[]>([
    { x: 190, y: 120 },
    { x: 50, y: 120 },
    { x: 120, y: 50 },
  ]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [logs, setLogs] = useState<string[]>([
    "SYS_STAGE_OK: Ingestion matrix listening on port 3000.",
    "ZOR-LIX CORE: Standing by for telemetry stream alignments.",
    "SECURITY: Universal SSL tunnel status validated.",
  ]);

  const particleIdCounter = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radialRef = useRef(0);
  const gearRef = useRef(0);
  const freqRef = useRef(streamFrequency);
  const ampRef = useRef(amplitude);
  const isSyncingRef = useRef(isSyncing);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(0);

  // Keep refs in sync
  useEffect(() => { freqRef.current = streamFrequency; }, [streamFrequency]);
  useEffect(() => { ampRef.current = amplitude; }, [amplitude]);
  useEffect(() => { isSyncingRef.current = isSyncing; }, [isSyncing]);

  // UTC Clock
  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, "0");
      setSystemTime(`${now.toISOString().slice(11, 19)}.${ms} UTC`);
    }, 45);
    return () => clearInterval(t);
  }, []);

  // Main animation RAF loop
  useEffect(() => {
    function generateWavePath(angle: number, freq: number, amp: number): string {
      const cx = 120, cy = 120;
      const baseR = 70 + amp * 0.4;
      const points: string[] = [];
      for (let theta = 0; theta <= 360; theta += 2.5) {
        const rad = (theta * Math.PI) / 180;
        const offset =
          Math.sin(rad * freq + (angle * Math.PI) / 110) * (amp * 0.35) +
          Math.cos(rad * 3 - (angle * Math.PI) / 180) * 4;
        const r = baseR + offset;
        points.push(`${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`);
      }
      return `M ${points.join(" L ")} Z`;
    }

    function getOrbPos(i: number, angle: number, amp: number, freq: number) {
      const angleOffset = (360 / 3) * i;
      const speedMult = freq * 0.25 + 0.45;
      const t = (angle * speedMult + angleOffset) % 360;
      const rad = (t * Math.PI) / 180;
      const r = 70 + amp * 0.4;
      return { x: 120 + r * Math.cos(rad), y: 120 + r * Math.sin(rad) };
    }

    function frame(ts: number) {
      const dt = ts - lastFrameRef.current;
      if (dt >= 35) {
        lastFrameRef.current = ts;
        radialRef.current = (radialRef.current + 1.2) % 360;
        gearRef.current = (gearRef.current + (isSyncingRef.current ? 3.5 : 0.8)) % 360;

        const angle = radialRef.current;
        const freq = freqRef.current;
        const amp = ampRef.current;

        setRadialAngle(angle);
        setGearRotation(gearRef.current);
        setWavePath(generateWavePath(angle, freq, amp));

        const rad2 = (angle * Math.PI) / 180;
        setSweepEnd({
          x: parseFloat((120 + 118 * Math.cos(rad2)).toFixed(1)),
          y: parseFloat((120 + 118 * Math.sin(rad2)).toFixed(1)),
        });

        setOrbPositions([0, 1, 2].map((i) => getOrbPos(i, angle, amp, freq)));
      }
      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Particle canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }, [particles]);

  // Particle physics loop
  useEffect(() => {
    const t = setInterval(() => {
      setParticles((prev) => {
        const moved = prev
          .map((p) => ({ ...p, y: p.y + p.speed }))
          .filter((p) => p.y < 160);
        if (moved.length < 15 && Math.random() > 0.4) {
          particleIdCounter.current += 1;
          moved.push({
            id: particleIdCounter.current,
            x: Math.random() * 240 + 10,
            y: 0,
            speed: Math.random() * 1.5 + 0.8,
            size: Math.random() * 3 + 1.5,
            opacity: Math.random() * 0.7 + 0.2,
            color: Math.random() > 0.5 ? "#FFAF87" : "#C5E898",
          });
        }
        return moved;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  const injectQuantumPeak = () => {
    const colors = ["#FFAF87", "#C5E898", "#FFFFFF"];
    const fresh: Particle[] = Array.from({ length: 12 }, (_, i) => {
      particleIdCounter.current += 1;
      return {
        id: particleIdCounter.current,
        x: Math.random() * 240 + 10,
        y: Math.random() * -30 - 5,
        speed: Math.random() * 3.5 + 2,
        size: Math.random() * 4.5 + 2,
        opacity: Math.random() * 0.9 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles((prev) => [...prev, ...fresh]);
    setLogs([
      `SYS_ANOMALY: Manual high-frequency event spike injected! [12 nodes]`,
      "STREAM_DENSITY: Dynamic queue latency peaked to 0.08ms.",
      ...logs.slice(0, 2),
    ]);
  };

  const handleNodeClick = (nodeId: string, nodeName: string) => {
    setSelectedNode(nodeId);
    setIsSyncing(true);
    isSyncingRef.current = true;
    setLogs([
      `ROUTING_TARGET: Ingestion hub routed to [${nodeName.toUpperCase()}]`,
      ...(dbLogs[nodeId] || []),
    ]);
    setTimeout(() => {
      setIsSyncing(false);
      isSyncingRef.current = false;
    }, 700);
  };

  const handleCalibration = () => {
    setIsCalibrating(true);
    setLogs([
      "CALIBRATION_PROBE: Restructuring kinetic orbital frequencies...",
      "CALIBRATION_SUCCESS: Phase alignment synced cleanly.",
      ...logs.slice(0, 2),
    ]);
    setTimeout(() => setIsCalibrating(false), 1200);
  };

  const renderDbIcon = (dbId: string, isActive: boolean) => {
    const iconStyle = {
      width: 14,
      height: 14,
      animation: isSyncing && isActive ? "heroSpin 0.6s linear infinite" : "none",
    };

    if (dbId === "snowflake") {
      return (
        <svg viewBox="0 0 24 24" style={iconStyle} fill="#29B5E8">
          <path d="M12 2.25a.75.75 0 0 1 .75.75v3.19l2.25-1.3a.75.75 0 1 1 .75 1.3l-2.25 1.3 2.25 1.3a.75.75 0 0 1-.75 1.3l-2.25-1.3V12h3.19l-1.3-2.25a.75.75 0 1 1 1.3-.75l1.3 2.25 1.3-2.25a.75.75 0 1 1 1.3.75l-1.3 2.25H21a.75.75 0 0 1 0 1.5h-3.19l1.3 2.25a.75.75 0 1 1-1.3.75l-1.3-2.25-1.3 2.25a.75.75 0 1 1-1.3-.75l-1.3-2.25H12.75v3.19l2.25-1.3a.75.75 0 1 1 .75 1.3l-2.25 1.3 2.25 1.3a.75.75 0 0 1-.75 1.3l-2.25-1.3v3.19a.75.75 0 0 1-1.5 0v-3.19l-2.25 1.3a.75.75 0 1 1-.75-1.3l2.25-1.3-2.25-1.3a.75.75 0 1 1 .75-1.3l2.25 1.3V12H8.81l1.3 2.25a.75.75 0 1 1-1.3.75l-1.3-2.25-1.3 2.25a.75.75 0 1 1-1.3-.75l-1.3-2.25H3a.75.75 0 0 1 0-1.5h3.19l-1.3-2.25a.75.75 0 1 1 1.3-.75l1.3 2.25 1.3-2.25a.75.75 0 1 1 1.3.75l-1.3 2.25H11.25V5.44l-2.25 1.3a.75.75 0 1 1-.75-1.3l2.25-1.3-2.25-1.3a.75.75 0 0 1 .75-1.3l2.25 1.3V3a.75.75 0 0 1 .75-.75z"/>
        </svg>
      );
    }
    if (dbId === "google") {
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      );
    }
    if (dbId === "aws") {
      return (
        <svg viewBox="0 0 24 24" style={iconStyle} fill="none">
          <path d="M2 17c5 4.5 15 4.5 20 0M17.5 16.2l4.5.8-2.2-4" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.2 7.5h-1.5l-2.2 6h1.4l.5-1.5h2.1l.5 1.5h1.4l-2.2-6zm-.8 3.5l.7-2.1.7 2.1H5.4z" fill="#FFF" />
          <path d="M14.5 7.5l-1.5 4.5-1.5-4.5h-1.3l2.2 6.1h1.2l2.2-6.1h-1.3z" fill="#FFF" />
          <path d="M18.5 11c-.5-.3-.9-.4-1.3-.4-.5 0-.8.2-.8.5 0 .3.2.4.7.6 1 .3 1.8.6 1.8 1.6 0 1-.9 1.6-2.1 1.6-.7 0-1.4-.2-1.8-.5l.4-1c.4.3.8.4 1.3.4.5 0 .8-.2.8-.5 0-.3-.3-.5-.8-.6-.9-.3-1.7-.6-1.7-1.6 0-1 .9-1.5 2-1.5.6 0 1.2.2 1.6.4l-.4 1z" fill="#FFF" />
        </svg>
      );
    }
    if (dbId === "stripe") {
      return (
        <svg viewBox="0 0 24 24" style={iconStyle} fill="#635BFF">
          <path d="M13.962 2.17c-2.43 0-4.324 1.222-4.324 3.738 0 3.754 5.12 3.123 5.12 5.093 0 .614-.547.962-1.437.962-1.71 0-3.325-.712-4.46-1.385L7.8 13.064c1.478.962 3.753 1.57 5.753 1.57 2.593 0 4.675-1.258 4.675-3.83 0-3.896-5.12-3.14-5.12-5.074 0-.547.464-.871 1.293-.871 1.34 0 2.766.496 3.79 1.077l1.018-2.396a9.58 9.58 0 0 0-5.447-1.37z" />
        </svg>
      );
    }
    return null;
  };

  const signalSpan = (streamFrequency * 18.5 + 23.4).toFixed(1);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-12 lg:py-24 overflow-hidden flex flex-col justify-center border-b border-white/5"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(2, 2, 2, 0.2), rgba(2, 2, 2, 0.5)), url('/hero.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-[5%] left-[10%] rounded-full pointer-events-none transition-transform duration-1000"
        style={{
          background: "rgba(255,175,135,0.08)",
          filter: "blur(120px)",
          transform: `scale(${1 + amplitude * 0.004})`,
        }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] rounded-full pointer-events-none"
        style={{ background: "rgba(197,232,152,0.05)", filter: "blur(100px)" }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "5rem 5rem",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%,#000 80%,transparent 100%)",
        }}
      />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">

          {/* ===================== SECTOR 1 ===================== */}
          <div
            className="lg:col-span-5 flex flex-col gap-6 relative overflow-hidden p-6 sm:p-8"
            style={{
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(255,175,135,0.4),transparent)",
              }}
            />

            {/* Status row */}
            <div className="flex items-center justify-between">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full select-none"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#FFAF87",
                  fontFamily: "monospace",
                  fontSize: "9px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: "#FFAF87",
                    animation: "heroPing 1.2s ease-in-out infinite",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                FLIGHTDECK CORE v3.9
              </div>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "8px",
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                SYS_ANCHOR // 04-26
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <h1
                style={{
                  fontSize: "clamp(28px, 4.5vw, 52px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              >
                Intelligence Beyond Traditional{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontFamily: "Georgia, serif",
                    color: "#FFAF87",
                    textTransform: "lowercase",
                    letterSpacing: "0.01em",
                  }}
                >
                  Analytics

                </span>
                .
                <span
                  style={{
                    display: "block",
                    fontWeight: 300,
                    color: "#999",
                    marginTop: 4,
                  }}
                >
                  AI-Powered Data Analytics &
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "monospace",
                    fontSize: "clamp(18px, 3vw, 32px)",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "none",
                    background: "linear-gradient(90deg,#FFAF87,#fff,#C5E898)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginTop: 6,
                  }}
                >
                  Decision Intelligence

                </span>
              </h1>
              <p
                className="select-none"
                style={{
                  color: "#888",
                  fontWeight: 300,
                  fontSize: "11px",
                  lineHeight: 1.7,
                  maxWidth: 440,
                  marginTop: 10,
                }}
              >
                Zor-Lix enables organizations to integrate data from multiple systems, automate data quality management, and generate actionable business intelligence through advanced AI analytics.

              </p>
            </div>

            {/* Harmonizer sliders */}
            <div
              className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="flex items-center justify-between pb-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8.5px",
                    color: "#FFAF87",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 900,
                  }}
                >
                  HARMONIZER CONSTANTS
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "7.5px",
                    color: "#555",
                    textTransform: "uppercase",
                  }}
                >
                  Interactive Oscillations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none">
                {/* Frequency */}
                <div
                  className="flex flex-col gap-1.5 p-3 rounded-xl"
                  style={{
                    background: "#050505",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="flex items-center justify-between"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "9px",
                      color: "#999",
                      fontWeight: 700,
                    }}
                  >
                    <span>⚡ WAVE_FREQ:</span>
                    <span style={{ color: "#FFAF87", fontWeight: 900 }}>
                      {streamFrequency} Hz
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={streamFrequency}
                    onChange={(e) => setStreamFrequency(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: "#FFAF87" }}
                  />
                  <div
                    className="flex items-center justify-between"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "6.5px",
                      color: "#444",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    <span>1 HZ MIN</span>
                    <span>12 HZ PEAK</span>
                  </div>
                </div>

                {/* Amplitude */}
                <div
                  className="flex flex-col gap-1.5 p-3 rounded-xl"
                  style={{
                    background: "#050505",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="flex items-center justify-between"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "9px",
                      color: "#999",
                      fontWeight: 700,
                    }}
                  >
                    <span>⚡ WAVE_AMP:</span>
                    <span style={{ color: "#C5E898", fontWeight: 900 }}>
                      {amplitude}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="75"
                    step="5"
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: "#C5E898" }}
                  />
                  <div
                    className="flex items-center justify-between"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "6.5px",
                      color: "#444",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    <span>5PX MIN</span>
                    <span>75PX MAX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate("zorlixa")}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl select-none transition-all hover:scale-[1.01] active:scale-[0.98]"
                style={{
                  padding: "12px 18px",
                  background: "linear-gradient(135deg,#FFAF87,#fff,#C5E898)",
                  color: "#111",
                  fontWeight: 900,
                  fontSize: "10.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(255,175,135,0.15)",
                }}
              >
                Zorlixa
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
            </div>
          </div>

          {/* ===================== SECTOR 2 — RADAR ===================== */}
          <div
            className="lg:col-span-4 flex flex-col justify-between relative overflow-hidden p-6"
            style={{
              backgroundImage: 'url("/herobox_result.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Scope header */}
            <div
              className="flex items-center justify-between pb-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span
                className="flex items-center gap-2"
                style={{
                  fontFamily: "monospace",
                  fontSize: "8px",
                  color: "#FFAF87",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                <span
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: "#FFAF87",
                    animation: "heroPing 1.8s ease-in-out infinite",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                ORBITAL_SCOPE_V3
              </span>
              <button
                onClick={handleCalibration}
                title="Calibrate"
                className="flex items-center justify-center rounded-lg transition-all"
                style={{
                  padding: "5px 7px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid transparent",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    width: 14,
                    height: 14,
                    animation: isCalibrating ? "heroSpin 0.7s linear infinite" : "none",
                    color: isCalibrating ? "#C5E898" : undefined,
                  }}
                >
                  <path
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* SVG Scope */}
            <div className="flex items-center justify-center py-4 flex-1">
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(0,0,0,0.3)",
                  flexShrink: 0,
                }}
              >
                <svg
                  viewBox="0 0 240 240"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                >
                  {/* Dashed rings */}
                  <circle cx="120" cy="120" r="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" strokeDasharray="2 8" />
                  <circle cx="120" cy="120" r="72" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" strokeDasharray="2 8" />
                  <circle cx="120" cy="120" r="44" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
                  {/* Axis lines */}
                  <line x1="0" y1="120" x2="240" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
                  <line x1="120" y1="0" x2="120" y2="240" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
                  {/* Compass labels */}
                  <text x="120" y="14" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#444">000° TRAC</text>
                  <text x="226" y="123" textAnchor="end" fontFamily="monospace" fontSize="6" fill="#444">090°</text>
                  <text x="120" y="236" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#444">180° CORE</text>
                  <text x="14" y="123" textAnchor="start" fontFamily="monospace" fontSize="6" fill="#444">270°</text>
                  {/* Rotating tick ring */}
                  <circle
                    cx="120" cy="120" r="110"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="1 9"
                    transform={`rotate(${-radialAngle},120,120)`}
                  />
                  {/* Sweep line */}
                  <line
                    x1="120" y1="120"
                    x2={sweepEnd.x} y2={sweepEnd.y}
                    stroke="rgba(255,175,135,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                  {/* Main wave path */}
                  <path
                    d={wavePath}
                    stroke="url(#heroGrad)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Orbital nodes */}
                  {orbPositions.map((pos, i) => (
                    <circle
                      key={i}
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill={i === 0 ? "#FFAF87" : i === 1 ? "#ffffff" : "#C5E898"}
                    />
                  ))}
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFAF87" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#C5E898" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center crosshair button */}
                <button
                  onClick={handleCalibration}
                  className="relative flex items-center justify-center rounded-full transition-all"
                  style={{
                    zIndex: 20,
                    width: 56,
                    height: 56,
                    background: "#000",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFAF87" strokeWidth="2" style={{ width: 20, height: 20 }}>
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="1" />
                    <line x1="12" y1="3" x2="12" y2="7" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="7" y2="12" />
                    <line x1="17" y1="12" x2="21" y2="12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scope stats */}
            <div
              className="grid grid-cols-3 gap-0 pt-3 select-none"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {[
                { label: "SIGNAL_SPAN", val: `${signalSpan}° RAD`, color: "#fff" },
                { label: "FEED_CALIB",  val: "99.98%",             color: "#C5E898" },
                { label: "PHASE_SWEEP", val: `${Math.round(radialAngle)}° DEG`, color: "#FFAF87" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1 text-center"
                  style={i === 1 ? { borderLeft: "1px solid rgba(255,255,255,0.05)", borderRight: "1px solid rgba(255,255,255,0.05)" } : {}}
                >
                  <span style={{ fontFamily: "monospace", fontSize: "6.5px", color: "#555", textTransform: "uppercase", fontWeight: 700 }}>
                    {s.label}
                  </span>
                  <span style={{ fontFamily: "monospace", fontSize: "9px", fontWeight: 900, textTransform: "uppercase", color: s.color }}>
                    {s.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ===================== SECTOR 3 — RIGHT PANEL ===================== */}
          <div
            className="lg:col-span-3 flex flex-col gap-4 relative overflow-hidden p-6"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ background: "linear-gradient(to right,transparent,rgba(197,232,152,0.3),transparent)" }}
            />

            {/* UTC Clock */}
            <div
              className="p-3.5 rounded-2xl relative overflow-hidden text-left"
              style={{ background: "#000", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="absolute top-2 right-2.5 flex items-center gap-1.5"
                style={{
                  fontFamily: "monospace",
                  fontSize: "6.5px",
                  color: "#C5E898",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <span
                  className="rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    background: "#C5E898",
                    animation: "heroPing 1.4s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                SECURE
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "7px", color: "#555", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                HARNESS_UTC_CLOCK
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "11px", color: "#fff", fontWeight: 900, letterSpacing: "0.06em", marginTop: 4 }}>
                {systemTime}
              </div>
            </div>

            {/* Ingestion gears */}
            <div>
              <div className="flex items-center justify-between mb-2 select-none">
                <span style={{ fontFamily: "monospace", fontSize: "8px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                  INGESTION_TUNNEL_GEARS:
                </span>
                <div className="flex items-center gap-1" style={{ fontFamily: "monospace", fontSize: "7px", color: "#888", fontWeight: 700, textTransform: "uppercase" }}>
                  PHYS_ENGAGED
                  <span
                    className="rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: "#C5E898",
                      animation: "heroPing 1.5s ease-in-out infinite",
                      display: "inline-block",
                      marginLeft: 4,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {databasesList.map((db) => {
                  const isActive = selectedNode === db.id;
                  return (
                    <button
                      key={db.id}
                      onClick={() => handleNodeClick(db.id, db.name)}
                      className="w-full flex items-center justify-between text-left select-none cursor-pointer transition-all"
                      style={{
                        padding: "8px 10px",
                        borderRadius: 12,
                        border: isActive ? "1px solid #FFAF87" : "1px solid rgba(255,255,255,0.05)",
                        background: isActive
                          ? "linear-gradient(90deg,#121212,#040404)"
                          : "rgba(0,0,0,0.6)",
                        boxShadow: isActive ? "0 4px 12px rgba(255,175,135,0.06)" : "none",
                        transform: isActive ? "scale(1.01)" : "scale(1)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-lg transition-all"
                          style={{
                            padding: 5,
                            background: isActive ? "rgba(255,175,135,0.15)" : "rgba(255,255,255,0.05)",
                            border: isActive ? "1px solid rgba(255,175,135,0.3)" : "1px solid transparent",
                          }}
                        >
                          {renderDbIcon(db.id, isActive)}
                        </div>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 900, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {db.id}
                        </span>
                      </div>
                      {/* Gear icon */}
                      <svg
                        viewBox="0 0 24 24"
                        style={{
                          width: 22,
                          height: 22,
                          color: isActive ? "#FFAF87" : "#555",
                          transform: `rotate(${isActive ? gearRotation : -gearRotation * 0.4}deg)`,
                          transition: "color 0.25s",
                          flexShrink: 0,
                        }}
                        fill="currentColor"
                      >
                        <path d={GEAR_PATH} />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Telemetry log with particle canvas */}
            <div
              className="rounded-2xl flex flex-col relative overflow-hidden flex-1"
              style={{
                background: "#000",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "12px 14px",
                minHeight: 140,
              }}
            >
              <canvas
                ref={canvasRef}
                width={260}
                height={160}
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.28,
                  width: "100%",
                  height: "100%",
                }}
              />

              <div
                className="flex items-center justify-between relative z-10"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8, marginBottom: 8 }}
              >
                <span
                  className="flex items-center gap-1"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8px",
                    color: "#C5E898",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                  TELEMETRY_LOGS
                </span>
                <button
                  onClick={injectQuantumPeak}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "7px",
                    color: "#FFAF87",
                    fontWeight: 900,
                    border: "1px solid rgba(255,175,135,0.2)",
                    padding: "3px 7px",
                    borderRadius: 4,
                    background: "rgba(255,175,135,0.08)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    transition: "all 0.15s",
                  }}
                >
                  INJECT_PEAK
                </button>
              </div>

              <div
                className="flex flex-col gap-1 relative z-10"
                style={{ overflowY: "auto", maxHeight: 80 }}
              >
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1" style={{ fontFamily: "monospace", fontSize: "8.5px", lineHeight: 1.4 }}>
                    <span style={{ color: "#FFAF87", fontWeight: 700, flexShrink: 0 }}>{">"}</span>
                    <p
                      style={{
                        color:
                          idx === 0 && isSyncing
                            ? "#FFAF87"
                            : idx === 0
                            ? "#C5E898"
                            : "#666",
                        fontWeight: idx === 0 ? 700 : 400,
                        animation: idx === 0 && isSyncing ? "heroTextPulse 1s ease-in-out infinite" : "none",
                        margin: 0,
                      }}
                    >
                      {log}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between pt-2 select-none"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "monospace",
                fontSize: "7.5px",
                color: "#555",
              }}
            >
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C5E898" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                ENCRYPTED_STREAMS
              </span>
              <span>
                DELAY:{" "}
                <span style={{ color: "#fff", fontWeight: 700 }}>
                  {isSyncing ? "..." : "0.04 ms"}
                </span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Global keyframe injector */}
      <style>{`
        @keyframes heroPing {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @keyframes heroSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroTextPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}