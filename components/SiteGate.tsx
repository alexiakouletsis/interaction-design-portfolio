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
          backgroundColor: '#344055',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: '"deseo-medium", sans-serif',
          fontSize: '18vw',
          lineHeight: 1,
          zIndex: 9999,
        }}
      >
        <span>Mobile</span>
        <span>version</span>
        <span>unavailable</span>
      </div>
    );
  }

  return <>{children}</>;
}