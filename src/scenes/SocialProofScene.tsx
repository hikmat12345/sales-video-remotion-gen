import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SocialProofContent } from '../lib/sceneLoader';

type SocialProofSceneProps = {
  content: SocialProofContent;
};

export const SocialProofScene: React.FC<SocialProofSceneProps> = ({
  content,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 28,
  });

  const statOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
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
        padding: '80px 80px 100px',
      }}
    >
      {/* Stat */}
      <div
        style={{
          opacity: statOpacity,
          transform: `scale(${statScale})`,
          textAlign: 'center',
          marginBottom: 48,
        }}
      >
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 96,
            fontWeight: 900,
            color: '#ffffff',
            display: 'block',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {content.stat}
        </span>
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 32,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {content.label}
        </span>
      </div>

      {/* Review cards */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {content.reviews.map((review, i) => {
          const delay = 20 + i * 12;
          const cardOpacity = interpolate(frame, [delay, delay + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const cardY = spring({
            frame: Math.max(0, frame - delay),
            fps,
            from: 24,
            to: 0,
            config: { damping: 200 },
            durationInFrames: 18,
          });

          return (
            <div
              key={review.name}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '20px 24px',
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ fontSize: 14, color: '#f9c74f' }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.9)',
                  margin: '0 0 10px',
                  lineHeight: 1.4,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                — {review.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
