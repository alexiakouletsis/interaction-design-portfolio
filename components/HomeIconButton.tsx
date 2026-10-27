'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomeIconButton({ returnToProject }: { returnToProject?: number }) {
  const [hovered, setHovered] = useState(false);
  const href =
    returnToProject !== undefined
      ? `/?project=${returnToProject}#carousel-anchor`
      : '/#carousel-anchor';

  return (
    <Link
      href={href}
      aria-label="Return home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 10,
        display: 'flex',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        transition: 'transform 0.2s ease',
      }}
    >
      <img src="/home-icon.svg" alt="" style={{ width: '28px', height: '28px', display: 'block' }} />
    </Link>
  );
}