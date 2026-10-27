'use client';

import { useState } from 'react';

export default function BackToTopButton({ color }: { color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: '"lato", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        color,
      }}
    >
      <span style={{ position: 'relative', display: 'inline-block' }}>
        Back to top
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-2px',
            width: '100%',
            height: '1px',
            backgroundColor: color,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          }}
        />
      </span>
      <span aria-hidden> ↑</span>
    </button>
  );
}