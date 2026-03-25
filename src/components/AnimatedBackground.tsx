import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BackgroundVariant } from '../lib/sceneLoader';

type Cfg = { image: string; light: boolean };

const VARIANTS: Record<BackgroundVariant, Cfg> = {
  'gradient-dark':        { image: staticFile('assets/navy.png'),      light: false },
  'gradient-teal-dark':   { image: staticFile('assets/navy.png'),      light: false },
  'gradient-very-dark':   { image: staticFile('assets/navy.png'),      light: false },
  'gradient-teal':        { image: staticFile('assets/green.png'),     light: false },
  'gradient-teal-bright': { image: staticFile('assets/green.png'),     light: false },
  'light-blue':           { image: staticFile('assets/lightblue.png'), light: true  },
  white:                  { image: staticFile('assets/lightblue.png'), light: true  },
};

// Slowly-sweeping diagonal light ray
const DiagonalRay: React.FC<{
  frame: number; period: number; offset: number;
  opacity: number; width: number; blur: number;
}> = ({ frame, period, offset, opacity, width, blur }) => {
  const loopFrame = (frame + Math.round(offset * period)) % period;
  const x = interpolate(loopFrame, [0, period], [-30, 130]);
  return (
    <div
      style={{
        position: 'absolute',
        top: '-20%', left: `${x}%`,
        width: `${width}%`, height: '140%',
        background: `rgba(255,255,255,${opacity})`,
        transform: 'rotate(-28deg)',
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};

export const AnimatedBackground: React.FC<{ variant: string }> = ({ variant }) => {
  const frame = useCurrentFrame();
  const cfg = VARIANTS[variant as BackgroundVariant] ?? VARIANTS['gradient-teal'];

  // ── Ken Burns: slow zoom from 1.0 → 1.09 over first 360 frames of scene ──
  const zoom = interpolate(frame, [0, 360], [1.0, 1.09], { extrapolateRight: 'clamp' });

  // ── Brightness breathes gently: ±5% every ~4 s ──
  const brightness = 1 + Math.sin(frame / 125) * 0.05;

  // ── Entry: bg fades in over first 10 frames ──
  const bgOpacity = interpolate(frame, [0, 10], [0.55, 1], { extrapolateRight: 'clamp' });

  // ── Floating orbs ──
  const o1x = 8  + Math.cos(frame / 80) * 4;
  const o1y = 18 + Math.sin(frame / 65) * 7;
  const o2x = 64 + Math.sin(frame / 95) * 5;
  const o2y = 55 + Math.cos(frame / 72) * 8;
  const orbAlpha = cfg.light ? 0.28 : 0.06;

  // ── Color tint overlay: warm pulse (very subtle) ──
  const tintAlpha = 0.06 + Math.sin(frame / 160) * 0.04;
  const tintColor = cfg.light
    ? `rgba(180,230,255,${tintAlpha})`       // cool blue shimmer on light bg
    : `rgba(0,200,200,${tintAlpha})`;        // teal shimmer on dark bg

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: bgOpacity,
      }}
    >
      {/* Background image with Ken Burns zoom + brightness */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',           // give zoom room without white edges
          backgroundImage: `url(${cfg.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${zoom})`,
          filter: `brightness(${brightness})`,
          transformOrigin: 'center center',
        }}
      />

      {/* Color tint overlay — pulses gently */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: tintColor,
          pointerEvents: 'none',
        }}
      />

      {/* Diagonal light rays */}
      <DiagonalRay frame={frame} period={270} offset={0}    opacity={cfg.light ? 0.18 : 0.04}  width={12} blur={cfg.light ? 10 : 18} />
      <DiagonalRay frame={frame} period={270} offset={0.45} opacity={cfg.light ? 0.12 : 0.025} width={8}  blur={cfg.light ? 8  : 14} />
      <DiagonalRay frame={frame} period={270} offset={0.72} opacity={cfg.light ? 0.10 : 0.02}  width={5}  blur={cfg.light ? 6  : 10} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: 560, height: 560,
        background: `rgba(255,255,255,${orbAlpha})`,
        top: `${o1y}%`, left: `${o1x}%`,
        transform: 'translate(-50%,-50%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: 380, height: 380,
        background: `rgba(255,255,255,${orbAlpha + 0.02})`,
        top: `${o2y}%`, left: `${o2x}%`,
        transform: 'translate(-50%,-50%)',
        filter: 'blur(55px)', pointerEvents: 'none',
      }} />
    </div>
  );
};
