import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowPathIcon } from './Icons';

export default function HeroSection() {
  const headingRef = useScrollReveal({ threshold: 0.1 });
  const subRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-60" aria-hidden="true" />

      {/* Gradient orb decorations */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-forsythia/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-deep-saffron/8 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="animate-fade-slide-up hero-delay-1 mb-6">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-forsythia border border-forsythia/30 rounded-full px-4 py-2 bg-forsythia/5">
            <ArrowPathIcon className="w-3.5 h-3.5" />
            Next-Generation Data Platform
          </span>
        </div>

        {/* Headline — single <h1> for the entire page */}
        <h1
          ref={headingRef}
          className="word-reveal animate-fade-slide-up hero-delay-2 text-arctic-powder mb-6"
        >
          {'Automate Your Data. Accelerate Your Future.'.split(' ').map((word, i) => (
            <span key={i} className="word">
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="reveal animate-fade-slide-up hero-delay-3 max-w-2xl mx-auto text-lg bento:text-xl text-arctic-powder/70 mb-10 leading-relaxed"
        >
          NexusAI transforms raw data into actionable intelligence with AI-powered pipelines,
          real-time analytics, and enterprise-grade security — all in one unified platform.
        </p>

        {/* Dual CTAs */}
        <div className="animate-fade-slide-up hero-delay-4 flex flex-col bento:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full bento:w-auto inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold px-8 py-4 rounded-xl bg-gradient-to-r from-forsythia to-deep-saffron text-oceanic-noir hover:shadow-xl hover:shadow-forsythia/25 hover:-translate-y-0.5 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
          >
            Start Free Trial
          </a>
          <a
            href="#features"
            className="w-full bento:w-auto inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold px-8 py-4 rounded-xl border border-arctic-powder/20 text-arctic-powder hover:border-forsythia/50 hover:text-forsythia hover:-translate-y-0.5 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
          >
            Explore Features
          </a>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-in hero-delay-4 mt-16 grid grid-cols-2 bento:grid-cols-4 gap-6 bento:gap-10 max-w-3xl mx-auto">
          {[
            { value: '10M+', label: 'Data Points Processed' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '50+', label: 'Integrations' },
            { value: '<100ms', label: 'Avg Response' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl bento:text-3xl font-bold text-forsythia">
                {stat.value}
              </div>
              <div className="text-xs text-arctic-powder/50 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-arctic-powder/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-forsythia/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
