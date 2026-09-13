'use client';

import { useCallback, useEffect, useState } from 'react';

const PROJECTS = [
  { label: 'Project 0', href: '/projects/project-0' },
  { label: 'Project 1', href: '/projects/project-1' },
  { label: 'Project 2', href: '/projects/project-2' },
];

const CARD_WIDTH = 460; // px
const CARD_HEIGHT = 580; // px
const RADIUS = 620; // px, how far cards sit from the center of rotation
const CARD_COLOR = '#7c93a6';
const LABEL_COLOR = '#344055';

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'block' }}
    >
      <path
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
        stroke={LABEL_COLOR}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCarousel() {
  const [step, setStep] = useState(0);
  const count = PROJECTS.length;
  const angleStep = 360 / count;
  // wrap the raw step count into a valid project index for highlighting/links
  const activeIndex = ((step % count) + count) % count;

  const goPrev = useCallback(() => {
    setStep((s) => s - 1);
  }, []);

  const goNext = useCallback(() => {
    setStep((s) => s + 1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        width: '100%',
        padding: '4rem 1rem',
      }}
    >
      <ArrowButton direction="left" onClick={goPrev} />

      <div
        style={{
          perspective: '1400px',
          width: `${CARD_WIDTH * 2}px`,
          height: `${CARD_HEIGHT + 60}px`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${RADIUS}px) rotateY(${-step * angleStep}deg)`,
            transition: 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {PROJECTS.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={project.label}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${CARD_WIDTH}px`,
                  transform: `translate(-50%, -50%) rotateY(${i * angleStep}deg) translateZ(${RADIUS}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: isActive ? 1 : 0.55,
                  transition: 'opacity 0.7s ease',
                }}
              >
                <a
                  href={project.href}
                  style={{
                    display: 'block',
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    borderRadius: '16px',
                    backgroundColor: CARD_COLOR,
                    boxShadow: '0 35px 60px rgba(0, 0, 0, 0.35), 0 12px 20px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <span
                  style={{
                    marginTop: '1rem',
                    fontFamily: '"lato", sans-serif',
                    fontWeight: 400,
                    fontSize: '1.1rem',
                    color: LABEL_COLOR,
                  }}
                >
                  {project.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ArrowButton direction="right" onClick={goNext} />
    </div>
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

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction === 'left' ? 'Previous project' : 'Next project'}
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