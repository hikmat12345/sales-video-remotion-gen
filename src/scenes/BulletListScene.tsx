import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BulletsContent } from '../lib/sceneLoader';

type BulletListSceneProps = { content: BulletsContent };

const BULLET_STAGGER = 30; // 1 second at 30 fps

export const BulletListScene: React.FC<BulletListSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame,
    fps,
    from: 40,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 24,
  });

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '90px 260px',
      }}
    >
      <h2
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 52,
          fontWeight: 700,
          color: '#ffffff',
          margin: '20px 0 40px',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        {content.title}
      </h2>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {content.items.map((item, i) => {
          const delay = 16 + i * BULLET_STAGGER;
          const localFrame = Math.max(0, frame - delay);

          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Each item slides from bottom
          const itemY = spring({
            frame: localFrame,
            fps,
            from: 28,
            to: 0,
            config: { damping: 200 },
            durationInFrames: 18,
          });

          return (
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 20,
                opacity,
                transform: `translateY(${itemY}px)`,
              }}
            >
              {/* Teal checkmark */}
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  marginRight: 20,
                  flexShrink: 0,
                  color: '#4ecdc4',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                ✓
              </span>
              <span
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 30,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: 1.3,
                }}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
