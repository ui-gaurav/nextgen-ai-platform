/**
 * Matrix-Driven Pricing Configuration
 *
 * Single source of truth for all pricing data.
 * Every displayed price traces back to computePrice() — zero hardcoded price strings in JSX.
 * Generates all 18 combinations (3 tiers × 2 cycles × 3 currencies) dynamically.
 */

export const TIERS = ['starter', 'pro', 'enterprise'];
export const CYCLES = ['monthly', 'annual'];
export const CURRENCIES = ['USD', 'EUR', 'INR'];

export const TIER_LABELS = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

export const TIER_DESCRIPTIONS = {
  starter: 'Perfect for individuals and small projects getting started with AI automation.',
  pro: 'For growing teams that need advanced analytics and priority support.',
  enterprise: 'Full-scale deployment with dedicated infrastructure and custom SLAs.',
};

export const TIER_FEATURES = {
  starter: [
    '5 automated workflows',
    '10,000 API calls/month',
    'Basic analytics dashboard',
    'Email support',
    'Single workspace',
  ],
  pro: [
    '50 automated workflows',
    '500,000 API calls/month',
    'Advanced analytics & reporting',
    'Priority support (< 4h SLA)',
    '10 team workspaces',
    'Custom integrations',
  ],
  enterprise: [
    'Unlimited workflows',
    'Unlimited API calls',
    'Real-time analytics & ML insights',
    'Dedicated support engineer',
    'Unlimited workspaces',
    'Custom integrations & SSO',
    'On-premise deployment option',
    '99.99% uptime SLA',
  ],
};

/** Base monthly rate in reference currency units (USD-equivalent index) */
export const BASE_RATES = {
  starter: 100,
  pro: 300,
  enterprise: 800,
};

/** Annual billing = 20% discount (multiplier applied per-month, then ×12 for yearly total) */
export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8;

/** Regional tariffs with currency symbol, exchange rate, and regional markup/markdown */
export const REGIONAL_TARIFFS = {
  USD: { symbol: '$', fxRate: 1.0, tariff: 1.0 },
  EUR: { symbol: '€', fxRate: 0.92, tariff: 0.98 },
  INR: { symbol: '₹', fxRate: 83.0, tariff: 1.05 },
};

/**
 * Pure function — no React state inside, fully testable in isolation.
 * Returns the numeric price for a given tier/cycle/currency combination.
 *
 * For monthly: base × fxRate × tariff
 * For annual:  base × ANNUAL_DISCOUNT_MULTIPLIER × fxRate × tariff (per month)
 *
 * @param {'starter'|'pro'|'enterprise'} tier
 * @param {'monthly'|'annual'} billingCycle
 * @param {'USD'|'EUR'|'INR'} currency
 * @returns {number} Price as a number (monthly rate for both cycles)
 */
export function computePrice(tier, billingCycle, currency) {
  const base = BASE_RATES[tier];
  const cycleMultiplier = billingCycle === 'annual' ? ANNUAL_DISCOUNT_MULTIPLIER : 1;
  const { fxRate, tariff } = REGIONAL_TARIFFS[currency];
  return base * cycleMultiplier * fxRate * tariff;
}

/**
 * Returns a formatted price string with currency symbol.
 *
 * @param {'starter'|'pro'|'enterprise'} tier
 * @param {'monthly'|'annual'} billingCycle
 * @param {'USD'|'EUR'|'INR'} currency
 * @returns {string} e.g. "$80", "€71", "₹6,972"
 */
export function formatPrice(tier, billingCycle, currency) {
  const price = computePrice(tier, billingCycle, currency);
  const { symbol } = REGIONAL_TARIFFS[currency];
  const formatted = Math.round(price).toLocaleString('en-US');
  return `${symbol}${formatted}`;
}

/**
 * Pre-generates all 18 formatted price strings.
 * Used by PricingSection to render all hidden spans at mount time.
 *
 * @returns {Array<{tier, cycle, currency, formatted, key}>}
 */
export function generateAllPrices() {
  const prices = [];
  for (const tier of TIERS) {
    for (const cycle of CYCLES) {
      for (const currency of CURRENCIES) {
        prices.push({
          tier,
          cycle,
          currency,
          formatted: formatPrice(tier, cycle, currency),
          key: `${tier}-${cycle}-${currency}`,
        });
      }
    }
  }
  return prices;
}
