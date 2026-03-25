/**
 * BadgeRow — four laurel-wreath badges using the real PNG leaf assets
 * from public/assets/. The entire row springs up from below as ONE unit.
 *
 * Asset map:
 *   public/assets/left-leaf.png   175×242
 *   public/assets/right-leaf.png  175×242
 *   public/assets/bbb-and-a+.png  262×236  (BBB shield + A+)
 *   public/assets/stars.png       105×27   (five stars)
 */

import React from 'react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// ─── Constants ────────────────────────────────────────────────────────────────

// Leaf SVG is 175×242 → at BADGE_H=138 the leaf width = 175/242×138 = 99px
// Badge width = 2×99 − 6 (tiny centre overlap closes the wreath) = 192
const BADGE_H = 138;
const BADGE_W = 192;
const LEAF_W  = Math.round((145 / 242) * BADGE_H); // 99px

// ─── Badge definitions ────────────────────────────────────────────────────────

type BadgeDef = {
  top?: string;      // small label above main text
  main?: string;     // large bold centre text
  sub?: string;      // small label below main text
  asset?: 'bbb' | 'stars';
};

const BADGES: BadgeDef[] = [
  { main: '80,000+', sub: 'Members' },
  { main: '20 Years', sub: 'In Business' },
  { asset: 'bbb' },
  { asset: 'stars', main: '3,000+', sub: 'Testimonials' },
];

// ─── Single badge ─────────────────────────────────────────────────────────────

const Badge: React.FC<BadgeDef & { color: string; leafFilter?: string }> = ({
  top, main, sub, asset, color, leafFilter,
}) => {
  const leafBase: React.CSSProperties = {
    position: 'absolute',
    top: 15,
    width: "54px",
    objectFit: 'fill',
    pointerEvents: 'none',
    filter: leafFilter,
    display: 'block',
    height: "129px",
  };

  const label: React.CSSProperties = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 12,
    fontWeight: 500,
    color,
    lineHeight: 1.1,
    textAlign: 'center',
    letterSpacing: '0.04em',
  };

  const mainStyle: React.CSSProperties = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    color,
    lineHeight: 1,
    textAlign: 'center',
    letterSpacing: '-0.015em',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: BADGE_W,
        height: BADGE_H,
        flexShrink: 0,
        top: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Leaf branches — PNG assets */}
      <img
        src={staticFile('assets/left-leaf.svg')}
        style={{ ...leafBase, left: 25 }}
        alt=""
      />
      <img
        src={staticFile('assets/right-leaf.svg')}
        style={{ ...leafBase, right: 25 }}
        alt=""
      />

      {/* ── Badge content (z-index above leaves) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          paddingTop: asset === 'stars' ? 2 : 0,
        }}
      >
        {/* BBB badge → use the combined image asset */}
        {asset === 'bbb' && (
          <Img
            src={staticFile('assets/bbb-and-a+.png')}
            style={{
              width: 100,
              height: 'auto',
              position: 'relative',
              left: "-10px",
              top: "8px",
              filter: leafFilter, // tint to match on light backgrounds
            }}
          />
        )}

        {/* Stars row */}
        {asset === 'stars' && (
          <Img
            src={staticFile('assets/stars.png')}
            style={{
              width: 52,
              height: 'auto',
              marginBottom: 1,
              filter: leafFilter,
            }}
          />
        )}

        {/* Small top label */}
        {top && <span style={label}>{top}</span>}

        {/* Large main stat */}
        {main && <span style={mainStyle}>{main}</span>}

        {/* Small bottom label */}
        {sub && <span style={label}>{sub}</span>}
      </div>
    </div>
  );
};

// ─── Row ──────────────────────────────────────────────────────────────────────

type BadgeRowProps = { darkText?: boolean };

export const BadgeRow: React.FC<BadgeRowProps> = ({ darkText = false }) => {
  const frame   = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entire row springs up from 60px below — resets fresh on every scene
  const rowY = spring({
    frame,
    fps,
    from: 56,
    to: 0,
    config: { damping: 200 },
    durationInFrames: 22,
  });

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const textColor = darkText ? '#1a5572' : '#daeef6';

  // On light backgrounds: convert the white-tinted PNGs to dark teal
  const leafFilter = darkText
    ? 'brightness(0) saturate(100%) invert(22%) sepia(55%) saturate(550%) hue-rotate(168deg) opacity(0.8)'
    : undefined;

  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        transform: `translateY(${rowY}px)`,
        opacity,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {BADGES.map((b, i) => (
        <Badge
          key={i}
          {...b}
          color={textColor}
          leafFilter={leafFilter}
        />
      ))}
    </div>
  );
};
