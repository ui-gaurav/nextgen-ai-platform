import { ChevronUpSolidIcon } from './Icons';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#social-proof' },
    { label: 'Changelog', href: '#' },
    { label: 'Documentation', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Status', href: '#' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-oceanic-noir pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 bento:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 bento:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forsythia to-deep-saffron flex items-center justify-center">
                <span className="font-mono text-oceanic-noir font-bold text-sm">N</span>
              </div>
              <span className="font-mono font-bold text-lg text-arctic-powder tracking-tight">
                Nexus<span className="text-forsythia">AI</span>
              </span>
            </a>
            <p className="text-arctic-powder/50 text-sm leading-relaxed max-w-xs">
              Next-generation AI platform for teams that move fast and value their data.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-arctic-powder/40 mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-arctic-powder/60 hover:text-forsythia transition-colors duration-[var(--duration-micro)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex flex-col bento:flex-row items-center justify-between gap-4">
          <p className="text-xs text-arctic-powder/30 font-mono">
            © {new Date().getFullYear()} NexusAI. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-arctic-powder/40 hover:text-forsythia hover:border-forsythia/30 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
            aria-label="Scroll to top"
          >
            <ChevronUpSolidIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
