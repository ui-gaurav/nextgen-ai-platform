import { useSyncExternalStore } from 'react';

/**
 * Custom hook: performant matchMedia listener via useSyncExternalStore.
 * 
 * Uses matchMedia('change') event — fires only at the breakpoint transition,
 * not on every pixel of resize. This is the recommended pattern per the brief.
 *
 * @param {string} query - CSS media query string, e.g. '(max-width: 767px)'
 * @returns {boolean} Whether the media query currently matches
 */
export function useMatchMedia(query) {
  const subscribe = (callback) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  // SSR fallback — assume desktop
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
