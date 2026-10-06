'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const TOTAL_SLIDES = 17;
const SLIDES = Array.from({ length: TOTAL_SLIDES }, (_, i) => `/storyboard${i + 1}.png`);
const ARROW_COLOR = '#314057';
const IMAGE_BRIGHTNESS = 0.93; // used for both the inline carousel and the fullscreen view, so they always match
const IMAGE_CONTRAST = 1.08; // boosts contrast so the pencil/ink lines read crisper, same in both views

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
      <path
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
        stroke={ARROW_COLOR}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const label = direction === 'left' ? 'Previous slide' : 'Next slide';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: hovered ? 'scale(1.25)' : 'scale(1)',
        transition: 'transform 0.2s ease',
      }}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

export default function StoryboardCarousel() {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % TOTAL_SLIDES);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  const currentSrc = SLIDES[index];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        <ArrowButton direction="left" onClick={goPrev} />

        <div
          onClick={() => setIsFullscreen(true)}
          style={{
            position: 'relative',
            width: '600px',
            height: '600px',
            borderRadius: '24px',
            cursor: 'zoom-in',
            overflow: 'hidden',
            backgroundColor: '#f7f4f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={currentSrc}
            alt={`Storyboard slide ${index + 1}`}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: `brightness(${IMAGE_BRIGHTNESS}) contrast(${IMAGE_CONTRAST})`,
            }}
          />
        </div>

        <ArrowButton direction="right" onClick={goNext} />
      </div>

      <span
        style={{
          marginTop: '1rem',
          fontFamily: '"lato", sans-serif',
          fontWeight: 400,
          fontSize: '0.9rem',
          color: ARROW_COLOR,
        }}
      >
        {index + 1} / {TOTAL_SLIDES}
      </span>

      {isFullscreen &&
        createPortal(
          <div
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              cursor: 'zoom-out',
              padding: '24px',
            }}
          >
            <img
              src={currentSrc}
              alt={`Storyboard slide ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                filter: `brightness(${IMAGE_BRIGHTNESS}) contrast(${IMAGE_CONTRAST})`,
              }}
            />
          </div>,
          document.body
        )}
    </div>
  );
}