import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrandContent } from '../lib/sceneLoader';

type BrandSceneProps = { content: BrandContent };

export const BrandScene: React.FC<BrandSceneProps> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.88,
    to: 1,
    config: { damping: 200 },
    durationInFrames: 28,
  });

  const opacity = interpolate(frame, [0, 16], [0, 1], {
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
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Brand name — serif to match the actual Accounting Coach wordmark */}
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 96,
          fontWeight: 400,
          color: '#ffffff',
          lineHeight: 1.05,
          textAlign: 'center',
          letterSpacing: '-0.01em',
          textShadow: '0 2px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div>{content.line1}</div>
        <div>
          {content.line2}
          {content.trademark && (
            <sup
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 28,
                verticalAlign: 'super',
                marginLeft: 4,
                opacity: 0.8,
              }}
            >
              ®
            </sup>
          )}
        </div>
      </div>
    </div>
  );
};
