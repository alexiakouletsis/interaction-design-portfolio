'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BackHomeLink({
  color,
  returnToProject,
}: {
  color: string;
  returnToProject?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const href =
    returnToProject !== undefined
      ? `/?project=${returnToProject}#carousel-anchor`
      : '/#carousel-anchor';

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: '"lato", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        color,
        textDecoration: 'none',
      }}
    >
      <span>← </span>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        Click to return home
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
    </Link>
  );
}