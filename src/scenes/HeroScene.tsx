import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { HeroContent } from '../lib/sceneLoader';

type HeroSceneProps = { content: HeroContent };

export const HeroScene: React.FC<HeroSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline slides up from below
  const textY = spring({
    frame,
    fps,
    from: 40,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const textOpacity = interpolate(frame, [0, 20], [0, 1], {
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
        padding: '0 120px',
      }}
    >
      <h1
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 52,
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          textAlign: 'center',
          textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        {content.headline}
      </h1>
    </div>
  );
};
