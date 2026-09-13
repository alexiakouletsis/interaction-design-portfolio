'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport is narrower than `breakpoint` (px).
 * Uses matchMedia so it reacts live to resizing/rotating, not just on load.
 */
export default function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);

    update(); // set the real value once mounted (server can't know screen width)
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);

  return isMobile;
}