import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Caption } from '../lib/sceneLoader';

// Shows ONE caption line at a time — slides from bottom, exits upward.

type CaptionOverlayProps = { captions: Caption[] };

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!captions || captions.length === 0) return null;
 
  // Which caption is currently active?
  let activeIndex = -1;
  for (let i = 0; i < captions.length; i++) {
    if (frame >= captions[i].at * fps) activeIndex = i;
  }
  if (activeIndex === -1) return null;

  // Only render the active line and the one before it (for exit animation).
  // This ensures at most ONE visible line at any moment.
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {captions.map((caption, i) => {
        const isActive   = i === activeIndex;
        const isExiting  = i === activeIndex - 1;
        if (!isActive && !isExiting) return null;

        const captionStartFrame = Math.round(caption.at * fps);
        if (frame < captionStartFrame) return null;

        const localFrame = frame - captionStartFrame;

        if (isActive) {
          // Enter: slide up from 28px below, fade in
          const enter = spring({
            frame: localFrame,
            fps,
            config: { damping: 200 },
            durationInFrames: 15,
          });
          const y = interpolate(enter, [0, 1], [28, 0]);
          const op = interpolate(enter, [0, 1], [0, 1]);

          return (
            <CaptionLine key={caption.text} text={caption.text} y={y} opacity={op} />
          );
        }

        // Exiting: next caption's start frame is when this one leaves
        const nextStart = Math.round(captions[activeIndex].at * fps);
        const exitFrame = frame - nextStart;
        const exit = spring({
          frame: exitFrame,
          fps,
          config: { damping: 200 },
          durationInFrames: 12,
        });
        const y = interpolate(exit, [0, 1], [0, -22]);
        const op = interpolate(exit, [0, 1], [1, 0]);

        return (
          <CaptionLine key={caption.text} text={caption.text} y={y} opacity={op} />
        );
      })}
    </div>
  );
};

const CaptionLine: React.FC<{ text: string; y: number; opacity: number }> = ({
  text, y, opacity,
}) => (
  <div
    style={{
      transform: `translateY(${y}px)`,
      opacity,
      background: 'rgba(0,0,0,0.52)',
      backdropFilter: 'blur(4px)',
      borderRadius: 5,
      padding: '7px 22px',
      maxWidth: 860,
      textAlign: 'center',
    }}
  >
    <span
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 21,
        fontWeight: 500,
        color: '#ffffff',
        lineHeight: 1.4,
      }}
    >
      {text}
    </span>
  </div>
);
