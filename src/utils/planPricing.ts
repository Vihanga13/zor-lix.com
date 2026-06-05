export type BillingCycle = "monthly" | "annual";

const PLAN_PRICES: Record<string, Record<BillingCycle, number>> = {
  "Starter Segment": { monthly: 79, annual: 63 },
  "Professional Module": { monthly: 199, annual: 159 },
  "Enterprise Core": { monthly: 499, annual: 399 },
};

export function getPlanPrice(planName: string, billingCycle: BillingCycle): number {
  const plan = PLAN_PRICES[planName];
  if (!plan) {
    throw new Error(`Unknown plan: ${planName}`);
  }
  return plan[billingCycle];
}

export function isValidPlanPrice(
  planName: string,
  billingCycle: BillingCycle,
  amount: number
): boolean {
  try {
    return getPlanPrice(planName, billingCycle) === amount;
  } catch {
    return false;
  }
}
