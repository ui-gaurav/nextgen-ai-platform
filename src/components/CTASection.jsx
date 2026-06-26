import { useScrollReveal } from '../hooks/useScrollReveal';

export default function CTASection() {
  const sectionRef = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="cta" ref={sectionRef} className="reveal relative py-24 bento:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Gradient background card */}
        <div className="relative rounded-3xl overflow-hidden p-10 bento:p-16">
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-oceanic-noir via-nocturnal-expedition to-oceanic-noir"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-forsythia/10 via-transparent to-deep-saffron/10"
            aria-hidden="true"
          />

          {/* Decorative dots */}
          <div className="absolute inset-0 dot-grid-bg opacity-30" aria-hidden="true" />

          {/* Border glow */}
          <div
            className="absolute inset-0 rounded-3xl border border-forsythia/20"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-arctic-powder mb-4 text-3xl bento:text-4xl">
              Ready to Transform Your Data Stack?
            </h2>
            <p className="text-arctic-powder/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of data teams who ship faster, catch issues sooner,
              and make smarter decisions with NexusAI.
            </p>

            <div className="flex flex-col bento:flex-row items-center justify-center gap-4">
              <a
                href="#pricing"
                className="w-full bento:w-auto inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold px-10 py-4 rounded-xl bg-gradient-to-r from-forsythia to-deep-saffron text-oceanic-noir hover:shadow-xl hover:shadow-forsythia/25 hover:-translate-y-0.5 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
              >
                Start Your Free Trial
              </a>
              <a
                href="#"
                className="w-full bento:w-auto inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold px-10 py-4 rounded-xl border border-arctic-powder/20 text-arctic-powder hover:border-forsythia/50 hover:text-forsythia hover:-translate-y-0.5 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
              >
                Book a Demo
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-arctic-powder/30 text-xs font-mono">
              <span>✓ 14-day free trial</span>
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
