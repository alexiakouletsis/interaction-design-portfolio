'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function WorkPDF({ src, alt }: { src: string; alt: string }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  // hides the browser's built-in PDF viewer toolbar/side panel/scrollbar —
  // a standard (if not universally supported) PDF open parameter
  const cleanSrc = `${src}#toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <>
      <div
        onClick={() => setIsFullscreen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          maxWidth: '800px',
          maxHeight: '85vh',
          aspectRatio: '0.7391', // trying 8.5x11.5
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 45px rgba(0, 0, 0, 0.18), 0 8px 15px rgba(0, 0, 0, 0.1)',
          cursor: 'zoom-in',
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* pointerEvents: none disables scrolling/zooming within the PDF viewer
            itself — the click still reaches the wrapping div above, since a
            pointer-events:none element lets clicks pass straight through it */}
        <iframe
          src={cleanSrc}
          title={alt}
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
        />
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
            <div
              style={{
                // both dimensions now derive from the same 90vh value, so the
                // box's actual aspect ratio matches the page ratio exactly
                // instead of two different vh values silently disagreeing
                width: 'min(90vw, calc(90vh * 0.7391))',
                height: '90vh',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={cleanSrc}
                title={alt}
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}