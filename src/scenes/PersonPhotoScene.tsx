import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { PersonPhotoContent } from '../lib/sceneLoader';

export const PersonPhotoScene: React.FC<{ content: PersonPhotoContent }> = ({ content }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const photoOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const photoX = spring({ frame, fps, from: -44, to: 0, config: { damping: 200 }, durationInFrames: 28 });

  const nameOpacity = interpolate(frame, [16, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nameY = spring({ frame: Math.max(0, frame - 16), fps, from: 30, to: 0, config: { damping: 200 }, durationInFrames: 22 });

  const bioOpacity = interpolate(frame, [34, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bioY = spring({ frame: Math.max(0, frame - 34), fps, from: 22, to: 0, config: { damping: 200 }, durationInFrames: 20 });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '100px 100px 100px 110px',
        gap: 72,
      }}
    >
      {/* Photo placeholder */}
      <div
        style={{
          opacity: photoOpacity,
          transform: `translateX(${photoX}px)`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 280,
            height: 340,
            borderRadius: 18,
            background: 'linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)',
            border: '2px solid rgba(255,255,255,0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)',
            }}
          />
          <span
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Photo
          </span>
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        {/* Name + credentials */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 50,
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 12px',
              lineHeight: 1.1,
              textShadow: '0 2px 16px rgba(0,0,0,0.2)',
            }}
          >
            {content.name}
          </h2>

          {/* Credentials pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.28)',
              borderRadius: 36,
              padding: '7px 22px',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#f9c74f',
              }}
            >
              {content.credentials}
            </span>
          </div>

          <p
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 19,
              color: 'rgba(255,255,255,0.65)',
              margin: 0,
            }}
          >
            {content.title}
          </p>
        </div>

        {/* Bio */}
        {content.bio && (
          <div
            style={{
              opacity: bioOpacity,
              transform: `translateY(${bioY}px)`,
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 26,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.88)',
                margin: 0,
                lineHeight: 1.6,
                maxWidth: 500,
              }}
            >
              {content.bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
