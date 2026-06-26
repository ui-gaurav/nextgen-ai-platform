import { useRef, useCallback, memo } from 'react';
import {
  TIERS,
  CYCLES,
  CURRENCIES,
  TIER_LABELS,
  TIER_DESCRIPTIONS,
  TIER_FEATURES,
  formatPrice,
  REGIONAL_TARIFFS,
} from '../config/pricing.config';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDownIcon } from './Icons';

/**
 * PricingSection — Feature 1: Matrix-Driven Pricing with Re-render Isolation
 *
 * Architecture: CSS attribute-driven visibility swap (Pattern 2).
 *
 * - All 18 price strings (3 tiers × 2 cycles × 3 currencies) are pre-rendered
 *   into hidden <span> elements at mount time.
 * - A container <div> holds data-currency and data-cycle attributes.
 * - Changing the currency/cycle mutates these DOM attributes via ref — zero React state
 *   change on the pricing cards, zero re-render.
 * - CSS attribute selectors ([data-currency="USD"][data-cycle="monthly"]) show/hide
 *   the correct <span>.
 *
 * Boundary clarification: The dropdown/toggle components ARE allowed to re-render
 * their own UI state (e.g. open/closed). The constraint is only that price card
 * parents must NOT re-render when currency/cycle changes.
 */

const DEFAULT_CURRENCY = 'USD';
const DEFAULT_CYCLE = 'monthly';

export default function PricingSection() {
  // Ref to the pricing container — DOM attribute mutations happen here
  const pricingContainerRef = useRef(null);
  const sectionRef = useScrollReveal({ threshold: 0.05 });
  const headingRef = useScrollReveal({ threshold: 0.2 });

  // These callbacks mutate DOM attributes directly — no React state
  const handleCurrencyChange = useCallback((currency) => {
    const el = pricingContainerRef.current;
    if (el) el.setAttribute('data-currency', currency);
  }, []);

  const handleCycleChange = useCallback((cycle) => {
    const el = pricingContainerRef.current;
    if (el) el.setAttribute('data-cycle', cycle);
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="reveal relative py-24 bento:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-forsythia mb-4 block">
            Pricing
          </span>
          <h2
            ref={headingRef}
            className="word-reveal text-arctic-powder mb-4"
          >
            {'Simple, Transparent Pricing'.split(' ').map((word, i) => (
              <span key={i} className="word">{word} </span>
            ))}
          </h2>
          <p className="max-w-xl mx-auto text-arctic-powder/60 text-lg">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Controls — these CAN re-render their own state */}
        <PricingControls
          onCurrencyChange={handleCurrencyChange}
          onCycleChange={handleCycleChange}
        />

        {/* Pricing Cards Container — data-* attributes are mutated by controls */}
        <div
          ref={pricingContainerRef}
          data-currency={DEFAULT_CURRENCY}
          data-cycle={DEFAULT_CYCLE}
          className="grid grid-cols-1 bento:grid-cols-3 gap-6 bento:gap-5 mt-10"
        >
          {TIERS.map((tier) => (
            <PricingCard key={tier} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * PricingControls — currency dropdown + billing cycle toggle.
 * These components manage their OWN local state for UI (selected state display).
 * They communicate selection to the pricing container via DOM attribute mutation (callbacks).
 */
const PricingControls = memo(function PricingControls({ onCurrencyChange, onCycleChange }) {
  const cycleRef = useRef(DEFAULT_CYCLE);
  const currencyRef = useRef(DEFAULT_CURRENCY);

  // Use refs + forceUpdate pattern to allow the control UI to update
  // without touching any shared ancestor state
  const cycleToggleRef = useRef(null);
  const currencySelectRef = useRef(null);

  const handleCycleToggle = useCallback(() => {
    const newCycle = cycleRef.current === 'monthly' ? 'annual' : 'monthly';
    cycleRef.current = newCycle;
    onCycleChange(newCycle);

    // Update toggle UI directly via DOM — no state needed
    const toggle = cycleToggleRef.current;
    if (toggle) {
      toggle.setAttribute('data-active-cycle', newCycle);
    }
  }, [onCycleChange]);

  const handleCurrencySelect = useCallback((e) => {
    const newCurrency = e.target.value;
    currencyRef.current = newCurrency;
    onCurrencyChange(newCurrency);
  }, [onCurrencyChange]);

  return (
    <div className="flex flex-col bento:flex-row items-center justify-center gap-6">
      {/* Billing cycle toggle */}
      <div
        ref={cycleToggleRef}
        data-active-cycle={DEFAULT_CYCLE}
        className="pricing-cycle-toggle inline-flex items-center rounded-xl bg-oceanic-noir border border-white/10 p-1"
      >
        <button
          type="button"
          onClick={handleCycleToggle}
          className="cycle-btn cycle-btn-monthly font-mono text-sm px-5 py-2.5 rounded-lg transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={handleCycleToggle}
          className="cycle-btn cycle-btn-annual font-mono text-sm px-5 py-2.5 rounded-lg transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
        >
          Annual
          <span className="ml-1.5 text-xs text-deep-saffron font-semibold">-20%</span>
        </button>
      </div>

      {/* Currency selector */}
      <div className="relative">
        <select
          ref={currencySelectRef}
          defaultValue={DEFAULT_CURRENCY}
          onChange={handleCurrencySelect}
          className="font-mono text-sm bg-oceanic-noir border border-white/10 text-arctic-powder rounded-xl px-4 py-2.5 pr-10 appearance-none cursor-pointer hover:border-forsythia/30 transition-colors duration-[var(--duration-micro)] focus:outline-none focus:border-forsythia/50"
          aria-label="Select currency"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {REGIONAL_TARIFFS[c].symbol} {c}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-arctic-powder/40 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
});

/**
 * PricingCard — memoized. Never re-renders on currency/cycle change.
 * All 6 price variants (2 cycles × 3 currencies) are pre-rendered as hidden spans.
 * CSS attribute selectors on the parent container show the correct one.
 */
const PricingCard = memo(function PricingCard({ tier }) {
  const isPro = tier === 'pro';

  return (
    <article
      className={`relative rounded-2xl border p-6 bento:p-8 flex flex-col hover-lift
        ${isPro
          ? 'border-forsythia/40 bg-gradient-to-b from-oceanic-noir via-oceanic-noir to-forsythia/5 shadow-lg shadow-forsythia/5'
          : 'border-white/5 bg-oceanic-noir/60'
        }`}
    >
      {/* Popular badge */}
      {isPro && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-forsythia to-deep-saffron text-oceanic-noir px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier name */}
      <h3 className={`font-mono text-lg mb-2 ${isPro ? 'text-forsythia' : 'text-arctic-powder'}`}>
        {TIER_LABELS[tier]}
      </h3>

      {/* Description */}
      <p className="text-arctic-powder/50 text-sm mb-6">
        {TIER_DESCRIPTIONS[tier]}
      </p>

      {/* Price display — all 6 variants pre-rendered, CSS shows correct one */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          {/* Pre-render all 6 price spans for this tier */}
          {CYCLES.map((cycle) =>
            CURRENCIES.map((currency) => (
              <span
                key={`${tier}-${cycle}-${currency}`}
                className={`price-value price-${currency}-${cycle} font-mono text-4xl bento:text-5xl font-bold ${
                  isPro ? 'text-forsythia' : 'text-arctic-powder'
                }`}
              >
                {formatPrice(tier, cycle, currency)}
              </span>
            ))
          )}
          <span className="text-arctic-powder/40 text-sm font-mono">/mo</span>
        </div>
        {/* Annual savings note — shown for both cycles, wording changes via CSS */}
        <p className="text-arctic-powder/40 text-xs mt-1 font-mono">
          <span className="price-value price-USD-annual price-EUR-annual price-INR-annual">
            Billed annually · Save 20%
          </span>
          <span className="price-value price-USD-monthly price-EUR-monthly price-INR-monthly">
            Billed monthly
          </span>
        </p>
      </div>

      {/* CTA button */}
      <a
        href="#"
        className={`block text-center font-mono text-sm font-semibold py-3.5 rounded-xl mb-6 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]
          ${isPro
            ? 'bg-gradient-to-r from-forsythia to-deep-saffron text-oceanic-noir hover:shadow-lg hover:shadow-forsythia/25'
            : 'border border-white/10 text-arctic-powder hover:border-forsythia/40 hover:text-forsythia'
          }`}
      >
        {tier === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
      </a>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 mt-auto">
        {TIER_FEATURES[tier].map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 mt-0.5 shrink-0 ${isPro ? 'text-forsythia' : 'text-deep-saffron/70'}`}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-arctic-powder/70">{feat}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});
