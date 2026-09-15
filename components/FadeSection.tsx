'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children in a block that floats/fades based on how much of it is
 * currently within the viewport — not how close it is to exact center.
 * Using overlap (rather than center-distance) means content that's already
 * fully visible on initial page load starts fully opaque, instead of
 * incorrectly appearing dim just because it isn't centered.
 */
export default function FadeSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [style, setStyle] = useState({
    opacity: 1,
    transform: 'translateY(0px) scale(1)',
  });

  useEffect(() => {
    const tick = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const referenceHeight = Math.max(1, Math.min(rect.height, viewportHeight));
        const progress = Math.min(Math.max(visibleHeight / referenceHeight, 0), 1);

        const opacity = 0.1 + progress * 0.9;
        const lift = (1 - progress) * 50; // px — the "float" distance
        const scale = 0.97 + progress * 0.03;

        setStyle({
          opacity,
          transform: `translateY(${lift}px) scale(${scale})`,
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: style.opacity,
        transform: style.transform,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}