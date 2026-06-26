import { useRef, useEffect } from 'react';

/**
 * Custom hook: IntersectionObserver-based scroll reveal.
 *
 * Adds the `.revealed` class when the element enters the viewport.
 * Supports optional stagger by wrapping children in a `.reveal-stagger` container.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - Intersection ratio to trigger reveal
 * @param {string} [options.rootMargin='0px 0px -60px 0px'] - Root margin for earlier/later trigger
 * @param {boolean} [options.once=true] - If true, unobserves after first reveal
 * @returns {React.RefObject} ref to attach to the element
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Custom hook: observe multiple child elements for staggered reveal.
 * Attach to a parent container; all `.reveal` children will be observed individually.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.1]
 * @param {string} [options.rootMargin='0px 0px -40px 0px']
 * @returns {React.RefObject} ref to attach to the parent container
 */
export function useStaggerReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    container.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
