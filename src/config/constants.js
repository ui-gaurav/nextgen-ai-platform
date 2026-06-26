/**
 * Shared breakpoint for Bento ↔ Accordion view swap.
 *
 * This value is mirrored in index.css @theme as --breakpoint-bento: 768px.
 * JS uses: matchMedia(`(max-width: ${BENTO_BREAKPOINT_PX - 1}px)`)  →  mobile (<768)
 * CSS uses: @media (min-width: 768px)                                 →  desktop (≥768)
 *
 * Both boundaries are the same: <768 = mobile, ≥768 = desktop.
 * No dead zone at 768px.
 */
export const BENTO_BREAKPOINT_PX = 768;
