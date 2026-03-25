import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedLinesContent } from '../lib/sceneLoader';

const LINE_DELAY = 30; // 1 second at 30 fps

export const AnimatedLinesScene: React.FC<{ content: AnimatedLinesContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '90px 120px',
        textAlign: 'center',
        gap: 4,
      }}
    >
      {content.lines.map((line, i) => {
        const delay = i * LINE_DELAY;
        const localFrame = Math.max(0, frame - delay);

        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const y = spring({
          frame: localFrame,
          fps,
          from: 38,
          to: 0,
          config: { damping: 200 },
          durationInFrames: 24,
        });

        return (
          <p
            key={i}
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 54,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              opacity,
              transform: `translateY(${y}px)`,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
};
