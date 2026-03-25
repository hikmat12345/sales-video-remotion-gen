import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { QuoteContent } from '../lib/sceneLoader';

type QuoteSceneProps = { content: QuoteContent };

export const QuoteScene: React.FC<QuoteSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.92,
    to: 1,
    config: { damping: 200 },
    durationInFrames: 28,
  });

  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '90px 110px 80px',
        textAlign: 'center', 
      }}
    >
      <p
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 46,
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.45,
          letterSpacing: '0.005em',
          opacity,
          transform: `scale(${scale})`,
          textShadow: '0 2px 16px rgba(0,0,0,0.25)',
        }}
      >
        &ldquo;{content.text}&rdquo;
      </p>
    </div>
  );
};
