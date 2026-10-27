'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function WorkImage({
  src,
  alt,
  maxWidth = '800px',
  maxHeight = '85vh',
  caption,
}: {
  src: string;
  alt: string;
  maxWidth?: string;
  maxHeight?: string;
  caption?: string;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div style={{ maxWidth, margin: '0 auto' }}>
        <img
          src={src}
          alt={alt}
          onClick={() => setIsFullscreen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'block',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight,
            margin: '0 auto',
            borderRadius: '16px',
            boxShadow: '0 25px 45px rgba(0, 0, 0, 0.18), 0 8px 15px rgba(0, 0, 0, 0.1)',
            cursor: 'zoom-in',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        />
        {caption && (
          <p
            style={{
              marginTop: '0.5rem',
              fontFamily: '"lato", sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: '#314057',
              textAlign: 'center',
            }}
          >
            {caption}
          </p>
        )}
      </div>
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
              src={src}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}