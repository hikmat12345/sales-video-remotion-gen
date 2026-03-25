import React from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { LogoBadgeContent } from '../lib/sceneLoader';

const LEAF_H = 320;
// Original leaf SVG aspect ratio: 175 × 242
const LEAF_W = Math.round((175 / 242) * LEAF_H); // ~231 px

// CSS filter: convert white SVG leaves to dark teal matching the reference
const LEAF_FILTER =
  'brightness(0) saturate(100%) invert(16%) sepia(60%) saturate(700%) hue-rotate(175deg) opacity(0.92)';

export const LogoBadgeScene: React.FC<{ content: LogoBadgeContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Whole emblem bounces in
  const emblemScale = spring({
    frame,
    fps,
    from: 0.65,
    to: 1,
    config: { damping: 12, stiffness: 58 },
    durationInFrames: 40,
  });
  const emblemOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });

  // Ribbon slides up after emblem
  const ribbonOpacity = interpolate(frame, [24, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ribbonY = spring({
    frame: Math.max(0, frame - 24),
    fps,
    from: 22,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 22,
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
        paddingTop: 60, // clear badge row
      }}
    >
      <div
        style={{
          opacity: emblemOpacity,
          transform: `scale(${emblemScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ── Leaves + number ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>

          {/* Left laurel */}
          <img
            src={staticFile('assets/left-leaf.svg')}
            style={{ height: LEAF_H, width: LEAF_W, filter: LEAF_FILTER }}
          />

          {/* Centre: big number + YEARS */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 240,
              gap: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 210,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                textShadow: '0 4px 32px rgba(0,0,0,0.25)',
              }}
            >
              {content.years}
            </span>
            <span
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 52,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.2em',
                marginTop: 6,
                textShadow: '0 2px 12px rgba(0,0,0,0.2)',
              }}
            >
              YEARS
            </span>
          </div>

          {/* Right laurel */}
          <img
            src={staticFile('assets/right-leaf.svg')}
            style={{ height: LEAF_H, width: LEAF_W, filter: LEAF_FILTER }}
          />
        </div>

        {/* ── Ribbon banner ── */}
        <div
          style={{
            opacity: ribbonOpacity,
            transform: `translateY(${ribbonY}px)`,
            marginTop: -14,
          }}
        >
          <div
            style={{
              width: 450,
              height: 70,
              background: '#0a3f5c',
              clipPath: 'polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 22,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
              }}
            >
              IN BUSINESS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
