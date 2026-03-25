import { fade } from '@remotion/transitions/fade';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { BadgeRow } from '../components/BadgeRow';
import { TimerBadge } from '../components/TimerBadge';
import {
  AnimatedLinesContent,
  BadgeContent,
  BrandContent,
  BulletsContent,
  HeadlineContent,
  HeroContent,
  InstructorContent,
  LogoBadgeContent,
  PersonPhotoContent,
  QuoteContent,
  SceneConfig,
  SocialProofContent,
  TestimonialContent,
  TRANSITION_FRAMES,
  scenes,
  totalDurationInFrames,
} from '../lib/sceneLoader';
import { AnimatedLinesScene } from '../scenes/AnimatedLinesScene';
import { BadgeScene } from '../scenes/BadgeScene';
import { BrandScene } from '../scenes/BrandScene';
import { BulletListScene } from '../scenes/BulletListScene';
import { HeadlineScene } from '../scenes/HeadlineScene';
import { HeroScene } from '../scenes/HeroScene';
import { InstructorScene } from '../scenes/InstructorScene';
import { LogoBadgeScene } from '../scenes/LogoBadgeScene';
import { PersonPhotoScene } from '../scenes/PersonPhotoScene';
import { QuoteScene } from '../scenes/QuoteScene';
import { SocialProofScene } from '../scenes/SocialProofScene';
import { TestimonialScene } from '../scenes/TestimonialScene';

// ─── Scene content dispatcher ─────────────────────────────────────────────────

function renderContent(scene: SceneConfig): React.ReactNode {
  switch (scene.type) {
    case 'hero':           return <HeroScene          content={scene.content as HeroContent} />;
    case 'brand':          return <BrandScene          content={scene.content as BrandContent} />;
    case 'quote':          return <QuoteScene          content={scene.content as QuoteContent} />;
    case 'animated-lines': return <AnimatedLinesScene  content={scene.content as AnimatedLinesContent} />;
    case 'headline':       return <HeadlineScene       content={scene.content as HeadlineContent} />;
    case 'bullets':        return <BulletListScene     content={scene.content as BulletsContent} />;
    case 'badge':          return <BadgeScene          content={scene.content as BadgeContent} />;
    case 'logo-badge':     return <LogoBadgeScene      content={scene.content as LogoBadgeContent} />;
    case 'person-photo':   return <PersonPhotoScene    content={scene.content as PersonPhotoContent} />;
    case 'instructor':     return <InstructorScene     content={scene.content as InstructorContent} />;
    case 'social-proof':   return <SocialProofScene    content={scene.content as SocialProofContent} />;
    case 'testimonial':    return <TestimonialScene    content={scene.content as TestimonialContent} />;
    default:               return null;
  }
}

// Whether badges should render in dark teal (for light backgrounds)
function useDarkBadges(scene: SceneConfig): boolean {
  return scene.background === 'light-blue' || scene.background === 'white';
}

// ─── Composition ──────────────────────────────────────────────────────────────

export const SalesVideo: React.FC = () => {
  const seriesChildren = scenes.flatMap((scene, i) => {
    const sceneEl = (
      <TransitionSeries.Sequence
        key={`scene-${scene.id}`}
        durationInFrames={scene.durationInFrames}
      >
        <AbsoluteFill>
          <AnimatedBackground variant={scene.background} />
          {scene.showBadges && <BadgeRow darkText={useDarkBadges(scene)} />}
          {scene.timerLabel && <TimerBadge label={scene.timerLabel} />}
          {renderContent(scene)}
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );

    if (i < scenes.length - 1) {
      const transitionEl = (
        <TransitionSeries.Transition
          key={`t-${i}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
      );
      return [sceneEl, transitionEl];
    }

    return [sceneEl];
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('employee-bookkeeping.mp3')} />
      <TransitionSeries>{seriesChildren}</TransitionSeries>
    </AbsoluteFill>
  );
};

export { totalDurationInFrames };
