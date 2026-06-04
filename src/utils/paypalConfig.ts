// PayPal Sandbox Configuration
export const PAYPAL_CONFIG = {
  CLIENT_ID: "ATsbxK_Np55iDsAdworUDrw4D_IeaxGwVflIrMj9LFqjPee0yhTj3QtBSHtnMnDBCMKON-1hBR1qbySf",
  SECRET_KEY: "EGIL9A41metxd7q1XlwL6BXy5oQFkpV5YUT4NsCYPz32I-5cNm-Z7_N99EyNNeGGFmHI2C1ZFtGpq2wt",
  MODE: "sandbox", // Use "sandbox" for testing, "production" for live
  SCRIPT_URL: "https://www.paypal.com/sdk/js",
  API_BASE_URL: process.env.NODE_ENV === "production" ? "" : "http://localhost:5000",
};

// Plan pricing mapping for PayPal
export const PLAN_PRICING_MAP: Record<string, { amount: string; description: string }> = {
  "Starter Segment": {
    amount: "63.00",
    description: "Growth Startup - Up to 5 secure source integrations",
  },
  "Professional Module": {
    amount: "159.00",
    description: "Scale-up Corporation - Up to 25 source integrations",
  },
  "Enterprise Core": {
    amount: "399.00",
    description: "Decentralized Entity - Infinite secure source integrations",
  },
};

// Load PayPal SDK dynamically
export const loadPayPalScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).paypal) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `${PAYPAL_CONFIG.SCRIPT_URL}?client-id=${PAYPAL_CONFIG.CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.body.appendChild(script);
  });
};

// Create PayPal order
export const createPayPalOrder = async (
  planName: string
): Promise<string> => {
  const planInfo = PLAN_PRICING_MAP[planName];
  if (!planInfo) {
    throw new Error("Invalid plan name");
  }

  try {
    const apiUrl = `${PAYPAL_CONFIG.API_BASE_URL}/api/paypal/create-order`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planName,
        amount: planInfo.amount,
        description: planInfo.description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create PayPal order");
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    throw error;
  }
};

// Capture PayPal order
export const capturePayPalOrder = async (
  orderID: string
): Promise<any> => {
  try {
    const apiUrl = `${PAYPAL_CONFIG.API_BASE_URL}/api/paypal/capture-order`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID }),
    });

    if (!response.ok) {
      throw new Error("Failed to capture PayPal order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    throw error;
  }
};
