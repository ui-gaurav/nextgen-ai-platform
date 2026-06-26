import { useState, useCallback } from 'react';
import { SearchIcon, XMarkIcon } from './Icons';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Integrations', href: '#social-proof' },
  { label: 'About', href: '#cta' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-oceanic-noir/80 border-b border-white/5">
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="NexusAI Home">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forsythia to-deep-saffron flex items-center justify-center transition-transform duration-[var(--duration-micro)] ease-[var(--ease-micro)] group-hover:scale-110">
            <span className="font-mono text-oceanic-noir font-bold text-sm">N</span>
          </div>
          <span className="font-mono font-bold text-lg text-arctic-powder tracking-tight">
            Nexus<span className="text-forsythia">AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden bento:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm text-arctic-powder/70 hover:text-forsythia transition-colors duration-[var(--duration-micro)] ease-[var(--ease-micro)] tracking-wide uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden bento:flex items-center gap-4">
          <button
            type="button"
            className="text-arctic-powder/60 hover:text-forsythia transition-colors duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <a
            href="#pricing"
            className="font-mono text-sm font-semibold px-5 py-2.5 rounded-lg bg-gradient-to-r from-forsythia to-deep-saffron text-oceanic-noir hover:shadow-lg hover:shadow-forsythia/20 transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="bento:hidden text-arctic-powder p-2"
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="bento:hidden bg-oceanic-noir/95 backdrop-blur-xl border-t border-white/5 animate-fade-in">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobile}
                  className="block font-mono text-sm text-arctic-powder/70 hover:text-forsythia py-3 uppercase tracking-wide transition-colors duration-[var(--duration-micro)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6">
            <a
              href="#pricing"
              onClick={closeMobile}
              className="block text-center font-mono text-sm font-semibold px-5 py-3 rounded-lg bg-gradient-to-r from-forsythia to-deep-saffron text-oceanic-noir"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
