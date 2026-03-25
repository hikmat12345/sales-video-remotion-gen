import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { InstructorContent } from '../lib/sceneLoader';

export const InstructorScene: React.FC<{ content: InstructorContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Photo rises up from below
  const photoOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: 'clamp' });
  const photoY = spring({ frame, fps, from: 50, to: 0, config: { damping: 200 }, durationInFrames: 34 });

  // Left block slides in from left
  const leftOpacity = interpolate(frame, [14, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftX = spring({ frame: Math.max(0, frame - 14), fps, from: -60, to: 0, config: { damping: 200 }, durationInFrames: 28 });

  // Right block slides in from right
  const rightOpacity = interpolate(frame, [22, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightX = spring({ frame: Math.max(0, frame - 22), fps, from: 60, to: 0, config: { damping: 200 }, durationInFrames: 28 });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>

      {/* ── Center photo + name label ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 195,
          transform: `translateX(-50%) translateY(${photoY}px)`,
          opacity: photoOpacity,
          width: 800,
          bottom: -300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <img
            src={staticFile('assets/instructor-photo.png')}
            alt="Photo of instructor"
            style={{ width: 600, height: 'auto', display: 'block' }}
          />

          {/* Name label bar — overlays bottom of photo */}
          {content.name && (
            <div
              style={{
                position: 'absolute',
                top: "530px",
                left: "0px",
                zIndex: 9999,
                right: "0px",
                background: "#ffffff",
                padding: "10px 20px",
                textAlign: "center",
                color: "black",
                width: "60%",
                margin: "auto",
              }}
            >
              <span
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'black',
                  letterSpacing: '0.02em',
                }}
              >
                {content.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Left text block ── */}
      <div
        style={{
          position: 'absolute',
          left: 68,
          bottom: 148,
          maxWidth: 340,
          opacity: leftOpacity,
          transform: `translateX(${leftX}px)`,
        }}
      >
        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 46,
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 14px',
            lineHeight: 1.1,
            textShadow: '0 2px 14px rgba(0,0,0,0.25)',
          }}
        >
          {content.leftTitle}
        </h2>
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 26,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.82)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {content.leftSubtitle}
        </p>
      </div>

      {/* ── Right text block ── */}
      <div
        style={{
          position: 'absolute',
          right: 68,
          bottom: 148,
          maxWidth: 340,
          textAlign: 'right',
          opacity: rightOpacity,
          transform: `translateX(${rightX}px)`,
        }}
      >
        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 46,
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 14px',
            lineHeight: 1.1,
            textShadow: '0 2px 14px rgba(0,0,0,0.25)',
          }}
        >
          {content.rightTitle}
        </h2>
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 26,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.82)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {content.rightSubtitle}
        </p>
      </div>

    </div>
  );
};
