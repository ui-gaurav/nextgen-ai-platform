import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import {
  ArrowTrendingUpIcon,
  ChartPieIcon,
  LinkIcon,
  LinkSolidIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from './Icons';

/* ─── Data ─── */
const STATS = [
  { icon: ArrowTrendingUpIcon, value: '340%', label: 'Average ROI', suffix: 'first year' },
  { icon: ChartPieIcon, value: '2.4B', label: 'Events Processed', suffix: 'per day' },
  { icon: ArrowTrendingUpIcon, value: '67%', label: 'Time Saved', suffix: 'on data ops' },
];

const INTEGRATIONS = [
  { name: 'AWS', icon: LinkSolidIcon },
  { name: 'Google Cloud', icon: LinkSolidIcon },
  { name: 'Snowflake', icon: LinkIcon },
  { name: 'Databricks', icon: LinkIcon },
  { name: 'Slack', icon: LinkSolidIcon },
  { name: 'GitHub', icon: LinkIcon },
  { name: 'Salesforce', icon: LinkSolidIcon },
  { name: 'Stripe', icon: LinkIcon },
];

const TESTIMONIALS = [
  {
    quote: 'NexusAI reduced our pipeline build time from weeks to hours. The AI-powered anomaly detection alone saved us six figures in the first quarter.',
    author: 'Sarah Chen',
    title: 'VP of Engineering, DataScale',
    avatar: 'SC',
  },
  {
    quote: 'We evaluated seven platforms. NexusAI was the only one that delivered real-time sync across our entire stack without custom middleware.',
    author: 'Marcus Williams',
    title: 'CTO, FinLedger',
    avatar: 'MW',
  },
  {
    quote: 'The predictive intelligence module surfaced a churn signal we had been missing for months. It paid for itself in week one.',
    author: 'Priya Sharma',
    title: 'Head of Data, RetailPulse',
    avatar: 'PS',
  },
];

export default function SocialProofSection() {
  const sectionRef = useScrollReveal({ threshold: 0.05 });
  const statsRef = useStaggerReveal({ threshold: 0.1 });
  const integrationsRef = useScrollReveal({ threshold: 0.1 });
  const testimonialsRef = useStaggerReveal({ threshold: 0.1 });

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      className="reveal relative py-24 bento:py-32 bg-nocturnal-expedition/20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ─── Stats ─── */}
        <div ref={statsRef} className="grid grid-cols-1 bento:grid-cols-3 gap-6 mb-24 reveal-stagger">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="reveal rounded-2xl border border-white/5 bg-oceanic-noir/50 p-8 text-center hover-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-forsythia/10 text-forsythia flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-mono text-4xl font-bold text-forsythia mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-sm text-arctic-powder mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-arctic-powder/40">{stat.suffix}</div>

                {/* Mini sparkline bar (decorative) */}
                <div className="flex items-end justify-center gap-1 mt-6 h-8" aria-hidden="true">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-forsythia/20 to-forsythia/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Integrations ─── */}
        <div ref={integrationsRef} className="reveal text-center mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-forsythia mb-4 block">
            Integrations
          </span>
          <h2 className="text-arctic-powder mb-4">
            Connects to Your Entire Stack
          </h2>
          <p className="max-w-xl mx-auto text-arctic-powder/60 mb-10">
            50+ native integrations. Plug into your existing tools in minutes, not months.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 bento:gap-6">
            {INTEGRATIONS.map((integration) => {
              const Icon = integration.icon;
              return (
                <figure
                  key={integration.name}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/5 bg-oceanic-noir/40 hover:border-forsythia/20 hover:bg-oceanic-noir/60 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)] cursor-default"
                >
                  <Icon className="w-4 h-4 text-deep-saffron" />
                  <figcaption className="font-mono text-sm text-arctic-powder/70">
                    {integration.name}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        {/* ─── Testimonials ─── */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-forsythia mb-4 block">
            Testimonials
          </span>
          <h2 className="text-arctic-powder mb-4">
            Trusted by Data Teams Everywhere
          </h2>
        </div>

        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 bento:grid-cols-3 gap-6 reveal-stagger"
        >
          {TESTIMONIALS.map((t) => (
            <article
              key={t.author}
              className="reveal rounded-2xl border border-white/5 bg-oceanic-noir/50 p-6 bento:p-8 hover-lift"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-forsythia" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-arctic-powder/70 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forsythia to-deep-saffron flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-oceanic-noir">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-sm text-arctic-powder font-semibold">
                    {t.author}
                  </div>
                  <div className="text-xs text-arctic-powder/40">{t.title}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Testimonial nav arrows (decorative on desktop, functional on mobile if carousel) */}
        <div className="flex justify-center gap-3 mt-8 bento:hidden">
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-arctic-powder/50 hover:text-forsythia hover:border-forsythia/30 transition-colors duration-[var(--duration-micro)]"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-arctic-powder/50 hover:text-forsythia hover:border-forsythia/30 transition-colors duration-[var(--duration-micro)]"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
