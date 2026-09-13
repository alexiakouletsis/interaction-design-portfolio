'use client';

import useIsMobile from '@/hooks/useIsMobile';

export default function SiteGate({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#eef6fb',
          backgroundImage: 'url("/bg.png")',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'top center',
          backgroundSize: '100% auto',
          color: '#344055',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: '"quiche-sans", sans-serif',
          fontWeight: 400,
          fontSize: '10vw',
          lineHeight: 1.3,
          zIndex: 9999,
        }}
      >
        <span>MOBILE</span>
        <span>VERSION</span>
        <span>UNAVAILABLE</span>
      </div>
    );
  }

  return <>{children}</>;
}