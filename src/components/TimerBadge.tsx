import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type TimerBadgeProps = { label: string };

export const TimerBadge: React.FC<TimerBadgeProps> = ({ label }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 160, // sits below the badge row (badges are ~104px + 8px top padding)
        left: '50%',
        transform: 'translateX(-50%)',
        opacity,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: '#FDCB6E',
          borderRadius: 2, 
          fontFamily: 'Noto Serif, serif',
          fontWeight: 700,
          width: '160px',
          height: 50,
          color: '#004E6B',
          letterSpacing: '0.04em',
          padding: '2px 16px',
          }}
      >
        <span
          style={{
            margin: 'auto',
            display: 'block',
             fontSize: 35,
            textAlign: 'center',
            fontWeight: 700,
             letterSpacing: '0.04em',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
