import express, { Request, Response } from "express";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

// Create PayPal environment
const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  "ATsbxK_Np55iDsAdworUDrw4D_IeaxGwVflIrMj9LFqjPee0yhTj3QtBSHtnMnDBCMKON-1hBR1qbySf",
  "EGIL9A41metxd7q1XlwL6BXy5oQFkpV5YUT4NsCYPz32I-5cNm-Z7_N99EyNNeGGFmHI2C1ZFtGpq2wt"
);

const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

const router = express.Router();

// Create PayPal Order
router.post("/api/paypal/create-order", async (req: Request, res: Response) => {
  try {
    const { planName, amount, description } = req.body;

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `order_${Date.now()}`,
          description: description || planName,
          custom_id: planName,
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
      application_context: {
        brand_name: "Zor Lix Intelligence",
        locale: "en-US",
        landing_page: "BILLING",
        return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/?order_id={ORDER_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/?cancel=true`,
      },
    });

    const order = await client.execute(request);
    res.json({
      id: (order.result as any).id,
      status: (order.result as any).status,
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({
      error: "Failed to create order",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Capture PayPal Order
router.post("/api/paypal/capture-order", async (req: Request, res: Response) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client.execute(request);

    if ((capture.result as any).status === "COMPLETED") {
      res.json({
        id: (capture.result as any).id,
        status: (capture.result as any).status,
        payer: (capture.result as any).payer,
        purchase_units: (capture.result as any).purchase_units,
      });
    } else {
      res.status(400).json({
        error: "Order capture failed",
        status: (capture.result as any).status,
      });
    }
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    res.status(500).json({
      error: "Failed to capture order",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
