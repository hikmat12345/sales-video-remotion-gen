import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

const FADE_FRAMES = 10;

type SceneWrapperProps = {
  durationInFrames: number;
  children: React.ReactNode;
};

export const SceneWrapper: React.FC<SceneWrapperProps> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
      }}
    >
      {children}
    </div>
  );
};
