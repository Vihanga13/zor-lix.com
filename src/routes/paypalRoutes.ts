import express, { Request, Response } from "express";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { getPlanPrice, isValidPlanPrice, type BillingCycle } from "../utils/planPricing.js";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;
const mode = process.env.PAYPAL_MODE || "sandbox";

if (!clientId || !clientSecret) {
  console.warn("PayPal credentials missing. Set PAYPAL_CLIENT_ID and PAYPAL_SECRET_KEY in .env");
}

const environment =
  mode === "production"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId!, clientSecret!)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId!, clientSecret!);

const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);
const router = express.Router();

router.post("/api/paypal/create-order", async (req: Request, res: Response) => {
  try {
    const { planName, amount, billingCycle } = req.body as {
      planName: string;
      amount: number;
      billingCycle: BillingCycle;
    };

    if (!planName || amount == null || !billingCycle) {
      res.status(400).json({ error: "planName, amount, and billingCycle are required" });
      return;
    }

    if (!isValidPlanPrice(planName, billingCycle, Number(amount))) {
      res.status(400).json({ error: "Invalid plan or amount" });
      return;
    }

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `${planName} (${billingCycle})`,
          amount: {
            currency_code: "USD",
            value: getPlanPrice(planName, billingCycle).toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/?order_id={ORDER_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/?cancel=true`,
      },
    });

    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.post("/api/paypal/capture-order", async (req: Request, res: Response) => {
  try {
    const { orderID } = req.body as { orderID: string };

    if (!orderID) {
      res.status(400).json({ error: "orderID is required" });
      return;
    }

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    res.status(500).json({ error: "Failed to capture order" });
  }
});

export default router;
