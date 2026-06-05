import { useEffect, useRef, useState } from "react";
import { renderPayPalButtons } from "../utils/paypalConfig";

interface PayPalButtonsProps {
  planName: string;
  amount: number;
  onSuccess?: (orderId: string) => void;
  className?: string;
}

export default function PayPalButtons({
  planName,
  amount,
  onSuccess,
  className = "",
}: PayPalButtonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    setLoading(true);
    setError(null);

    renderPayPalButtons(container, {
      planName,
      amount,
      onSuccess: (orderId) => {
        onSuccess?.(orderId);
      },
      onError: (message) => setError(message),
    })
      .then((dispose) => {
        if (cancelled) {
          dispose();
          return;
        }
        cleanup = dispose;
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setError("Could not load PayPal. Check your connection and client ID.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [planName, amount, onSuccess]);

  return (
    <div className={className}>
      {loading && (
        <p className="text-center font-mono text-[10px] text-gray-500 py-2">Loading PayPal…</p>
      )}
      {error && (
        <p className="text-center font-mono text-[10px] text-red-400 py-2">{error}</p>
      )}
      <div ref={containerRef} className="w-full min-h-[48px] z-10 relative" />
    </div>
  );
}
