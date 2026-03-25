import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { TestimonialContent } from '../lib/sceneLoader';

type TestimonialSceneProps = { content: TestimonialContent };

export const TestimonialScene: React.FC<TestimonialSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stars = content.stars ?? 5;

  const starsOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const quoteScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 200 },
    durationInFrames: 24,
  });

  const quoteOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const attrOpacity = interpolate(frame, [32, 46], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const attrY = spring({
    frame: Math.max(0, frame - 32),
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
        padding: '90px 120px 80px',
        textAlign: 'center',
      }}
    >
      {/* Stars */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 28,
          opacity: starsOpacity,
        }}
      >
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} style={{ fontSize: 34, color: '#f9c74f' }}>★</span>
        ))}
      </div>

      {/* Quote — serif font matching the video style */}
      <blockquote
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 30,
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#ffffff',
          margin: '0 0 32px',
          lineHeight: 1.55,
          opacity: quoteOpacity,
          transform: `scale(${quoteScale})`,
          maxWidth: 880,
        }}
      >
        &ldquo;{content.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div
        style={{
          width: 52,
          height: 2,
          background: 'rgba(255,255,255,0.45)',
          borderRadius: 2,
          marginBottom: 20,
          opacity: attrOpacity,
        }}
      />

      {/* Attribution */}
      <div style={{ opacity: attrOpacity, transform: `translateY(${attrY}px)` }}>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 22, fontWeight: 700, color: '#ffffff', margin: '0 0 5px' }}>
          {content.name}
        </p>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          {content.role}
        </p>
      </div>
    </div>
  );
};
