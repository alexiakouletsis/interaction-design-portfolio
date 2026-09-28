'use client';

import { useEffect, useRef, useState } from 'react';

const MIN_DISPLAY_MS = 500; // avoids an instant flash-then-hide on fast connections
const SAFETY_TIMEOUT_MS = 4000; // never blocks forever, even if something never fires
const REVEAL_MS = 1300;

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [clipPath, setClipPath] = useState('none');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    let finished = false;

    const runReveal = () => {
      const revealStart = performance.now();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cx = width / 2;
      const cy = height / 2;
      const maxHalfWidth = width / 2;
      const maxHalfHeight = height / 2;

      const step = (now: number) => {
        const progress = Math.min(1, (now - revealStart) / REVEAL_MS);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        // width and height each grow toward their own real target, so the
        // rectangle keeps the screen's actual proportions the whole time,
        // rather than a square that overshoots one axis before the other
        const halfWidth = eased * maxHalfWidth;
        const halfHeight = eased * maxHalfHeight;

        const outer = `M0 0 H${width} V${height} H0 Z`;
        const inner = `M${cx - halfWidth} ${cy - halfHeight} H${cx + halfWidth} V${cy + halfHeight} H${cx - halfWidth} Z`;
        // note: evenodd is a bare keyword here, not a quoted string —
        // only the path data itself gets quotes
        setClipPath(`path(evenodd, '${outer} ${inner}')`);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDone(true);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(runReveal, remaining);
    };

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const whenLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

    Promise.all([whenLoaded, fontsReady]).then(finish);

    const safetyTimer = setTimeout(finish, SAFETY_TIMEOUT_MS);
    return () => {
      clearTimeout(safetyTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#f7f4f2',
        backgroundImage: 'url("/bg.png")',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'top center',
        backgroundSize: '100% auto',
        clipPath,
        pointerEvents: 'none',
      }}
    />
  );
}