import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { HeadlineContent } from '../lib/sceneLoader';

type HeadlineSceneProps = { content: HeadlineContent };

export const HeadlineScene: React.FC<HeadlineSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isDark = content.textColor !== 'dark';
  const titleColor    = isDark ? '#ffffff'        : '#ffffff';
  const subtitleColor = isDark ? 'rgba(255,255,255,0.8)' : '#2a6a88';

  const titleY = spring({
    frame,
    fps,
    from: 48,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 26,
  });

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleY = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 22,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 18,
  });

  // Adaptive size
  const fontSize =
    content.title.length > 80 ? 36
    : content.title.length > 50 ? 48
    : content.title.length > 30 ? 64
    : content.title.length > 20 ? 72
    : 90; 

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '90px 100px 80px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize,
          fontWeight: 700,
          color: titleColor,
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: isDark ? '0 2px 20px rgba(0,0,0,0.2)' : 'none',
          maxWidth: 960,
        }}
      >
        {content.title}
      </h1>

      {content.subtitle && (
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 26,
            fontWeight: 400,
            color: subtitleColor,
            margin: '24px 0 0',
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            maxWidth: 700,
            lineHeight: 1.45,
          }}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
