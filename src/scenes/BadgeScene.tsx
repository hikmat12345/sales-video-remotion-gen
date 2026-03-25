import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BadgeContent } from '../lib/sceneLoader';

type BadgeSceneProps = { content: BadgeContent };

export const BadgeScene: React.FC<BadgeSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillScale = spring({
    frame,
    fps,
    from: 0.35,
    to: 1,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 32,
  });

  const pillOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subY = spring({
    frame: Math.max(0, frame - 22),
    fps,
    from: 20,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 18,
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        textAlign: 'center',
      }}
    >
      {/* PRO pill — bright teal box, like in the actual slide */}
      <div
        style={{
          opacity: pillOpacity,
          transform: `scale(${pillScale})`,
          marginBottom: 10,
          marginTop: 70,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: '#00b4d8',
            borderRadius: 2,
            width:"405px" ,
            height: "209px",
            padding: '58px 72px',
          }}
        >
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 86,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.1em',
              display: 'block',
              lineHeight: 1,
              margin: 'auto',
              
            }}
          >
            {content.label}
          </span>
        </div>
      </div>

      <p
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 24,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          maxWidth: 600,
          lineHeight: 1.5,
        }}
      >
        {content.subtitle}
      </p>
    </div>
  );
};
