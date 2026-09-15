'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero component: a paused video of eyes is "scrubbed" based on the
 * mouse's Y position on the page, so it looks like the eyes are
 * tracking the cursor vertically.
 *
 * Assumes the source video goes: looking DOWN (t=0) -> looking UP (t=duration).
 * If your eyes move the wrong direction, flip the FLIP_DIRECTION flag below.
 */

const FLIP_DIRECTION = false; // set true if the eyes move opposite of what you want
const EASE = 0.03; // 0-1, lower = smoother/laggier, higher = snappier/twitchier
const OVERLAY_INSET_X = '0vw'; // left/right space between the darken filter + grain and the screen edge
const OVERLAY_INSET_Y = '3vw'; // top/bottom space between the darken filter + grain and the screen edge
const NUM_DRIPS = 260; // how many separate drip columns
const MAX_DRIP_LENGTH_VH = 78; // how far drips grow as you scroll, in vh
const FADE_START_PERCENT = 40; // where the fade begins, as % of the drip's current height
const SCROLL_EASE = 0.28; // 0-1, lower = smoother/laggier growth as you scroll
const CHUNK_SIZE = 40; // how many neighboring drips share the same length
const CHUNK_LENGTH_VARIATION = 0.15; // 0-1, how much a chunk's length can vary from the max

function DripDivider({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const dripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const smoothedProgressRef = useRef(0);
  const chunkMultipliersRef = useRef<number[]>([]);

  useEffect(() => {
    // random "control points" spaced along the row; each drip's multiplier is
    // smoothly interpolated between its two nearest control points, so the
    // height contour flows rather than stepping abruptly at chunk edges
    const numControlPoints = Math.ceil(NUM_DRIPS / CHUNK_SIZE) + 1;
    chunkMultipliersRef.current = Array.from(
      { length: numControlPoints },
      () => 1 - CHUNK_LENGTH_VARIATION + Math.random() * CHUNK_LENGTH_VARIATION * 2
    );

    // tiny offscreen canvas: drawing the video's bottom strip scaled down to
    // NUM_DRIPS x 1 pixels gets us one averaged color per drip column, cheaply
    const canvas = document.createElement('canvas');
    canvas.width = NUM_DRIPS;
    canvas.height = 1;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const tick = () => {
      const video = videoRef.current;

      // readyState >= 2 (HAVE_CURRENT_DATA) means an actual decoded frame
      // exists to sample — videoWidth alone only means metadata has loaded,
      // which can be true slightly before any real pixel data is ready,
      // and drawing too early samples a blank/black frame
      if (video && video.videoWidth > 0 && video.readyState >= 2 && ctx) {
        try {
          const stripHeight = Math.max(4, video.videoHeight * 0.05);
          ctx.drawImage(
            video,
            0,
            video.videoHeight - stripHeight,
            video.videoWidth,
            stripHeight,
            0,
            0,
            NUM_DRIPS,
            1
          );
          const data = ctx.getImageData(0, 0, NUM_DRIPS, 1).data;
          for (let i = 0; i < NUM_DRIPS; i++) {
            const el = dripRefs.current[i];
            if (el) {
              const r = data[i * 4];
              const g = data[i * 4 + 1];
              const b = data[i * 4 + 2];
              el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
          }
        } catch {
          // video not ready yet this frame, skip
        }
      }

      // height grows with scroll (smoothed so it doesn't jump), same for every
      // drip. the fade itself is a static percentage-based mask set once in
      // JSX below, which stays anchored to the bottom of whatever height this
      // currently is — no per-frame math needed for the fade.
      const targetProgress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      smoothedProgressRef.current += (targetProgress - smoothedProgressRef.current) * SCROLL_EASE;
      const baseLength = smoothedProgressRef.current * MAX_DRIP_LENGTH_VH;
      for (let i = 0; i < NUM_DRIPS; i++) {
        const el = dripRefs.current[i];
        if (el) {
          const position = i / CHUNK_SIZE;
          const pointIndex = Math.floor(position);
          const t = position - pointIndex; // 0-1 progress between the two control points
          const smoothT = t * t * (3 - 2 * t); // smoothstep, avoids kinks at each control point
          const points = chunkMultipliersRef.current;
          const a = points[pointIndex] ?? 1;
          const b = points[pointIndex + 1] ?? a;
          const multiplier = a + (b - a) * smoothT;
          el.style.height = `${baseLength * multiplier}vh`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        height: 0,
        display: 'flex',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {Array.from({ length: NUM_DRIPS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dripRefs.current[i] = el;
          }}
          style={{
            flex: 1,
            height: 0,
            backgroundColor: '#d9b99b',
            maskImage: `linear-gradient(to bottom, black 0%, black ${FADE_START_PERCENT}%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${FADE_START_PERCENT}%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}

export default function EyesHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isHeroVisibleRef = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      durationRef.current = video.duration || 0;
    };

    // if metadata already loaded before this effect ran (common on fast/local
    // connections), the 'loadedmetadata' event already fired and we'd miss it
    if (video.readyState >= 1 && video.duration) {
      durationRef.current = video.duration;
    }

    const computeTarget = (clientY: number) => {
      // ignore mouse/touch position once the hero has scrolled out of view —
      // the eyes just hold wherever they last were instead of continuing to react
      if (!isHeroVisibleRef.current) return;
      const normalized = Math.min(Math.max(clientY / window.innerHeight, 0), 1);
      const y = FLIP_DIRECTION ? normalized : 1 - normalized;
      targetTimeRef.current = y * durationRef.current;
    };

    const handleMouseMove = (e: MouseEvent) => computeTarget(e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) computeTarget(e.touches[0].clientY);
    };

    const tick = () => {
      if (durationRef.current > 0) {
        const current = video.currentTime;
        const target = targetTimeRef.current;
        const diff = target - current;
        // only nudge if the gap is meaningfully large, avoids fighting the video decoder
        if (Math.abs(diff) > 0.01) {
          video.currentTime = current + diff * EASE;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    let observer: IntersectionObserver | null = null;
    if (sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isHeroVisibleRef.current = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(sectionRef.current);
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
      <video
        ref={videoRef}
        src="/eyes.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: OVERLAY_INSET_Y,
          bottom: OVERLAY_INSET_Y,
          left: OVERLAY_INSET_X,
          right: OVERLAY_INSET_X,
          pointerEvents: 'none',
          opacity: 0.4,
          backgroundImage: `url("/darken-filter.svg")`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: OVERLAY_INSET_Y,
          bottom: OVERLAY_INSET_Y,
          left: OVERLAY_INSET_X,
          right: OVERLAY_INSET_X,
          pointerEvents: 'none',
          opacity: 1,
          mixBlendMode: 'overlay',
          backgroundImage: `url("/grain-overlay.svg")`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            margin: 0,
            color: '#fff',
            fontFamily: '"quiche-sans", sans-serif',
            fontSize: '10vw',
            fontWeight: 100,
            letterSpacing: '0.02em',
            lineHeight: 1.05,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          INTERACTIVE
          <br />
          DESIGN
        </h1>
        <p
          style={{
            margin: 0,
            marginTop: '1vw',
            color: '#fff',
            fontFamily: '"lato", sans-serif',
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: '0.85vw',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          ARTF1250 portfolio by Alexia Kouletsis
        </p>
      </div>
      </section>
      <DripDivider videoRef={videoRef} />
    </div>
  );
}