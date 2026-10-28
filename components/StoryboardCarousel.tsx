'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ARROW_COLOR = '#314057';
const IMAGE_BRIGHTNESS = 0.93; // used for both the inline carousel and the fullscreen view, so they always match
const IMAGE_CONTRAST = 1.15; // boosts contrast so the pencil/ink lines read crisper, same in both views

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

export default function StoryboardCarousel({
  images,
  applyFilter = true,
}: {
  images: string[];
  applyFilter?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = images.length;
  const imageFilter = applyFilter ? `brightness(${IMAGE_BRIGHTNESS}) contrast(${IMAGE_CONTRAST})` : 'none';

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  const currentSrc = images[index];

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
            width: '680px',
            height: '480px',
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
              filter: imageFilter,
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
        {index + 1} / {totalSlides}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous slide"
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <img
              src={currentSrc}
              alt={`Storyboard slide ${index + 1}`}
              style={{
                maxWidth: '85%',
                maxHeight: '90%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                filter: imageFilter,
              }}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next slide"
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <span
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                fontFamily: '"lato", sans-serif',
                fontWeight: 400,
                fontSize: '0.9rem',
              }}
            >
              {index + 1} / {totalSlides}
            </span>
          </div>,
          document.body
        )}
    </div>
  );
}