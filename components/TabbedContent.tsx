'use client';

import { useState } from 'react';

const TEXT_COLOR = '#314057';

export default function TabbedContent({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          marginBottom: '5rem',
          borderBottom: '1px solid rgba(49, 64, 87, 0.2)',
          paddingBottom: '1rem',
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: '"lato", sans-serif',
              fontWeight: active === i ? 700 : 400,
              fontSize: '1.1rem',
              color: TEXT_COLOR,
              paddingBottom: '0.5rem',
              borderBottom: active === i ? `2px solid ${TEXT_COLOR}` : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[active].content}
    </div>
  );
}