/** Public sandbox client ID — safe in browser; secret stays server-only if you add a backend later. */
export const PAYPAL_CLIENT_ID =
  import.meta.env.VITE_PAYPAL_CLIENT_ID ||
  "ATsbxK_Np55iDsAdworUDrw4D_IeaxGwVflIrMj9LFqjPee0yhTj3QtBSHtnMnDBCMKON-1hBR1qbySf";

const SCRIPT_URL = "https://www.paypal.com/sdk/js";

export interface PayPalOrderActions {
  order: {
    create: (payload: {
      purchase_units: Array<{
        description?: string;
        amount: { currency_code: string; value: string };
      }>;
    }) => Promise<string>;
    capture: () => Promise<{ id: string }>;
  };
}

export interface PayPalButtonsInstance {
  render: (container: HTMLElement) => Promise<void>;
  close: () => void;
}

export interface PayPalSDK {
  Buttons: (config: {
    style?: { layout?: string; color?: string; shape?: string; label?: string };
    createOrder: (
      data: unknown,
      actions: PayPalOrderActions
    ) => Promise<string>;
    onApprove: (data: { orderID: string }, actions: PayPalOrderActions) => Promise<void>;
    onError?: (err: unknown) => void;
    onCancel?: () => void;
  }) => PayPalButtonsInstance;
}

declare global {
  interface Window {
    paypal?: PayPalSDK;
  }
}

let scriptLoadPromise: Promise<void> | null = null;

export function loadPayPalScript(): Promise<void> {
  if (window.paypal) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-paypal-sdk="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("PayPal SDK failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.dataset.paypalSdk = "true";
    script.src = `${SCRIPT_URL}?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error("PayPal SDK failed to load"));
    };
    document.body.appendChild(script);
  });

  return scriptLoadPromise;
}

export interface RenderPayPalButtonsOptions {
  planName: string;
  amount: number;
  onSuccess?: (orderId: string) => void;
  onError?: (message: string) => void;
}

export async function renderPayPalButtons(
  container: HTMLElement,
  options: RenderPayPalButtonsOptions
): Promise<() => void> {
  await loadPayPalScript();

  if (!window.paypal) {
    throw new Error("PayPal SDK not available");
  }

  container.innerHTML = "";

  const buttons = window.paypal.Buttons({
    style: {
      layout: "vertical",
      color: "gold",
      shape: "rect",
      label: "paypal",
    },
    createOrder: (_data, actions) =>
      actions.order.create({
        purchase_units: [
          {
            description: options.planName,
            amount: {
              currency_code: "USD",
              value: options.amount.toFixed(2),
            },
          },
        ],
      }),
    onApprove: async (_data, actions) => {
      try {
        const capture = await actions.order.capture();
        options.onSuccess?.(capture.id);
      } catch (err) {
        console.error("PayPal capture error:", err);
        options.onError?.("Failed to capture payment");
      }
    },
    onError: (err) => {
      console.error("PayPal error:", err);
      options.onError?.("Payment failed. Please try again.");
    },
  });

  await buttons.render(container);

  return () => {
    try {
      buttons.close();
    } catch {
      container.innerHTML = "";
    }
  };
}
