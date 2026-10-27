'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ChevronIcon({ direction, color }: { direction: 'left' | 'right'; color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
      <path
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Thumbnail({
  src,
  alt,
  maxWidth,
  maxHeight,
  onClick,
}: {
  src: string;
  alt: string;
  maxWidth: string;
  maxHeight: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: 'auto',
        height: 'auto',
        maxWidth,
        maxHeight,
        margin: '0 auto',
        borderRadius: '16px',
        boxShadow: '0 25px 45px rgba(0, 0, 0, 0.18), 0 8px 15px rgba(0, 0, 0, 0.1)',
        cursor: 'zoom-in',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
    />
  );
}

export default function GalleryLightbox({
  images,
  altPrefix,
  thumbMaxWidth = '380px',
  thumbMaxHeight = '55vh',
}: {
  images: string[];
  altPrefix: string;
  thumbMaxWidth?: string;
  thumbMaxHeight?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIndex, goPrev, goNext]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
        {images.map((src, i) => (
          <Thumbnail
            key={src}
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            maxWidth={thumbMaxWidth}
            maxHeight={thumbMaxHeight}
            onClick={() => setOpenIndex(i)}
          />
        ))}
      </div>

      {openIndex !== null &&
        createPortal(
          <div
            onClick={() => setOpenIndex(null)}
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
              aria-label="Previous image"
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
              <ChevronIcon direction="left" color="#fff" />
            </button>

            <img
              src={images[openIndex]}
              alt={`${altPrefix} ${openIndex + 1}`}
              style={{
                maxWidth: '85%',
                maxHeight: '90%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
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
              <ChevronIcon direction="right" color="#fff" />
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
              {openIndex + 1} / {images.length}
            </span>
          </div>,
          document.body
        )}
    </>
  );
}