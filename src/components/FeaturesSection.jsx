import { useRef, useCallback, useSyncExternalStore, useEffect } from 'react';
import { BENTO_BREAKPOINT_PX } from '../config/constants';
import { useMatchMedia } from '../hooks/useMatchMedia';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import {
  Cog8ToothIcon,
  Cube16SolidIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  SearchIcon,
  ChevronDownIcon,
} from './Icons';

/* ─── Feature Data ─── */
const FEATURES = [
  {
    id: 'automation',
    icon: Cog8ToothIcon,
    title: 'Process Automation',
    description: 'Build complex data pipelines with our visual workflow editor. Automate ETL, data cleansing, and transformation — no code required.',
    span: 'col-span-2', // wide card
  },
  {
    id: 'infrastructure',
    icon: Cube16SolidIcon,
    title: 'Deploy Anywhere',
    description: 'Run on any cloud or on-premise. Kubernetes-native architecture with automatic scaling and zero-downtime deployments.',
    span: 'col-span-1',
  },
  {
    id: 'analytics',
    icon: ChartPieIcon,
    title: 'Real-Time Analytics',
    description: 'Interactive dashboards with sub-second query latency. Drill down into any metric with AI-powered anomaly detection.',
    span: 'col-span-1',
  },
  {
    id: 'growth',
    icon: ArrowTrendingUpIcon,
    title: 'Predictive Intelligence',
    description: 'ML models trained on your data surface trends before they happen. Forecast demand, detect churn, and optimize spend automatically.',
    span: 'col-span-1',
  },
  {
    id: 'sync',
    icon: ArrowPathIcon,
    title: 'Live Data Sync',
    description: 'Bi-directional sync across 50+ sources with change data capture. Your entire stack stays consistent in real time.',
    span: 'col-span-1',
  },
  {
    id: 'intelligence',
    icon: SearchIcon,
    title: 'Data Intelligence',
    description: 'Natural language queries across your entire data lake. Ask questions in plain English and get instant, visualized answers.',
    span: 'col-span-2', // wide card
  },
];

/* ─── Active Index Store (module-level, shared between Bento & Accordion) ─── */
let _activeIndex = 0;
let _listeners = new Set();

function getActiveIndex() {
  return _activeIndex;
}

function setActiveIndex(index) {
  _activeIndex = index;
  _listeners.forEach((fn) => fn());
}

function subscribeActiveIndex(callback) {
  _listeners.add(callback);
  return () => _listeners.delete(callback);
}

/**
 * Hook to access the shared activeIndex via useSyncExternalStore.
 * Both Bento and Accordion read from the same source.
 * State persists across view swaps (Context Lock).
 */
function useActiveIndex() {
  const index = useSyncExternalStore(
    subscribeActiveIndex,
    getActiveIndex,
    getActiveIndex
  );
  return [index, setActiveIndex];
}

/* ─── Main Features Section ─── */
export default function FeaturesSection() {
  const isMobile = useMatchMedia(`(max-width: ${BENTO_BREAKPOINT_PX - 1}px)`);
  const sectionRef = useScrollReveal({ threshold: 0.05 });
  const headingRef = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="reveal relative py-24 bento:py-32 bg-nocturnal-expedition/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-forsythia mb-4 block">
            Our Product
          </span>
          <h2
            ref={headingRef}
            className="word-reveal text-arctic-powder mb-4"
          >
            {'Everything You Need to Scale'.split(' ').map((word, i) => (
              <span key={i} className="word">{word} </span>
            ))}
          </h2>
          <p className="max-w-2xl mx-auto text-arctic-powder/60 text-lg">
            Six powerful modules that work together seamlessly — from ingestion to insight.
          </p>
        </div>

        {/* View swap: Bento (desktop) or Accordion (mobile) */}
        {isMobile ? <AccordionView /> : <BentoGridView />}
      </div>
    </section>
  );
}

/* ─── Bento Grid (Desktop ≥768px) ─── */
function BentoGridView() {
  const [activeIndex, setActive] = useActiveIndex();
  const containerRef = useStaggerReveal({ threshold: 0.08 });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-3 gap-4 reveal-stagger"
      role="list"
    >
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon;
        const isActive = activeIndex === index;

        return (
          <article
            key={feature.id}
            className={`reveal ${feature.span} relative rounded-2xl border p-6 bento:p-8 cursor-pointer group
              transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)]
              ${isActive
                ? 'border-forsythia/40 bg-gradient-to-br from-oceanic-noir to-nocturnal-expedition/80 shadow-lg shadow-forsythia/10'
                : 'border-white/5 bg-oceanic-noir/50 hover:border-forsythia/20 hover:bg-oceanic-noir/80'
              }`}
            role="listitem"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            tabIndex={0}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
              transition-colors duration-[var(--duration-micro)] ease-[var(--ease-micro)]
              ${isActive ? 'bg-forsythia/20 text-forsythia' : 'bg-white/5 text-arctic-powder/60 group-hover:text-forsythia'}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <h3 className={`font-mono text-lg mb-2 transition-colors duration-[var(--duration-micro)]
              ${isActive ? 'text-forsythia' : 'text-arctic-powder group-hover:text-forsythia'}`}>
              {feature.title}
            </h3>
            <p className="text-arctic-powder/60 text-sm leading-relaxed">
              {feature.description}
            </p>

            {/* Active indicator bar */}
            <div
              className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-forsythia to-deep-saffron
                transition-opacity duration-[var(--duration-micro)] ease-[var(--ease-micro)]
                ${isActive ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            />
          </article>
        );
      })}
    </div>
  );
}

/* ─── Accordion (Mobile <768px) ─── */
function AccordionView() {
  const [activeIndex, setActive] = useActiveIndex();

  const togglePanel = useCallback(
    (index) => {
      setActive(activeIndex === index ? -1 : index);
    },
    [activeIndex]
  );

  return (
    <div className="flex flex-col gap-2" role="list">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon;
        const isOpen = activeIndex === index;
        const panelId = `accordion-panel-${feature.id}`;
        const triggerId = `accordion-trigger-${feature.id}`;

        return (
          <AccordionItem
            key={feature.id}
            feature={feature}
            Icon={Icon}
            index={index}
            isOpen={isOpen}
            panelId={panelId}
            triggerId={triggerId}
            onToggle={togglePanel}
          />
        );
      })}
    </div>
  );
}

/* ─── Single Accordion Item ─── */
function AccordionItem({ feature, Icon, index, isOpen, panelId, triggerId, onToggle }) {
  const panelRef = useRef(null);

  // Animate height with WAAPI for smooth open/close
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0px';
      panel.style.opacity = isOpen ? '1' : '0';
      return;
    }

    if (isOpen) {
      const targetHeight = panel.scrollHeight;
      panel.animate(
        [
          { maxHeight: '0px', opacity: 0 },
          { maxHeight: `${targetHeight}px`, opacity: 1 },
        ],
        {
          duration: 350,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        }
      );
    } else {
      panel.animate(
        [
          { maxHeight: `${panel.scrollHeight}px`, opacity: 1 },
          { maxHeight: '0px', opacity: 0 },
        ],
        {
          duration: 350,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        }
      );
    }
  }, [isOpen]);

  return (
    <article
      className={`rounded-xl border overflow-hidden transition-colors duration-[var(--duration-micro)]
        ${isOpen ? 'border-forsythia/30 bg-oceanic-noir/80' : 'border-white/5 bg-oceanic-noir/40'}`}
      role="listitem"
    >
      {/* Trigger */}
      <button
        type="button"
        id={triggerId}
        className="w-full flex items-center gap-4 p-4 text-left min-h-[56px]"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        role="button"
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
          ${isOpen ? 'bg-forsythia/20 text-forsythia' : 'bg-white/5 text-arctic-powder/50'}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <h3 className={`flex-1 font-mono text-base
          ${isOpen ? 'text-forsythia' : 'text-arctic-powder'}`}>
          {feature.title}
        </h3>
        <ChevronDownIcon
          className={`w-5 h-5 shrink-0 chevron-rotate
            ${isOpen ? 'open text-forsythia' : 'text-arctic-powder/40'}`}
          aria-hidden="true"
        />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="accordion-panel"
        style={{ maxHeight: isOpen ? undefined : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-4 pb-4 pl-[68px]">
          <p className="text-arctic-powder/60 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </article>
  );
}
