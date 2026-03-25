import yaml from 'js-yaml';
import scenesRaw from '../../scenes.yaml';

// ─── Constants ────────────────────────────────────────────────────────────────

export const FPS = 30;
export const TRANSITION_FRAMES = 30; // 1 s fade between slides

// ─── Content shapes ───────────────────────────────────────────────────────────

export type HeadlineContent = {
  title: string;
  subtitle?: string;
  textColor?: 'light' | 'dark';
};

export type HeroContent = {
  headline: string;
  image: string;
};

export type BrandContent = {
  line1: string;
  line2: string;
  trademark?: boolean;
};

export type QuoteContent = {
  text: string;
};

export type AnimatedLinesContent = {
  lines: string[];
};

export type BulletsContent = {
  title: string;
  items: string[];
};

export type BadgeContent = {
  label: string;
  subtitle: string;
};

export type LogoBadgeContent = {
  name: string;
  tagline: string;
  years: string;
};

export type PersonPhotoContent = {
  name: string;
  credentials: string;
  title: string;
  bio?: string;
};

export type InstructorContent = {
  leftTitle: string;
  leftSubtitle: string;
  rightTitle: string;
  rightSubtitle: string;
  name?: string; // label shown below the photo, e.g. "Harold Averkamp, CPA, MBA"
};

export type SocialProofContent = {
  stat: string;
  label: string;
  reviews: Array<{ text: string; name: string }>;
};

export type TestimonialContent = {
  quote: string;
  name: string;
  role: string;
  stars?: number;
};

export type SceneContent =
  | HeadlineContent
  | HeroContent
  | BrandContent
  | QuoteContent
  | AnimatedLinesContent
  | BulletsContent
  | BadgeContent
  | LogoBadgeContent
  | PersonPhotoContent
  | InstructorContent
  | SocialProofContent
  | TestimonialContent;

export type SceneType =
  | 'headline'
  | 'hero'
  | 'brand'
  | 'quote'
  | 'animated-lines'
  | 'bullets'
  | 'badge'
  | 'logo-badge'
  | 'person-photo'
  | 'instructor'
  | 'social-proof'
  | 'testimonial';

export type BackgroundVariant =
  | 'gradient-dark'
  | 'gradient-teal'
  | 'gradient-teal-dark'
  | 'gradient-teal-bright'
  | 'gradient-very-dark'
  | 'light-blue'
  | 'white';

export type Caption = {
  text: string;
  at: number;
};

// ─── Public config ────────────────────────────────────────────────────────────

export type SceneConfig = {
  id: string;
  type: SceneType;
  durationInFrames: number;
  background: BackgroundVariant;
  showBadges: boolean;
  timerLabel?: string;
  content: SceneContent;
  captions: Caption[];
};

// ─── Raw YAML shape ───────────────────────────────────────────────────────────

type RawScene = {
  id: string;
  type: SceneType;
  start: number;
  end: number;
  background: BackgroundVariant;
  showBadges?: boolean;
  timerLabel?: string;
  content: SceneContent;
  captions?: Caption[];
};

type ScenesFile = { scenes: RawScene[] };

// ─── Parse ────────────────────────────────────────────────────────────────────

const raw = yaml.load(scenesRaw as string) as ScenesFile;

export const scenes: SceneConfig[] = raw.scenes.map((s) => ({
  id: s.id,
  type: s.type,
  durationInFrames: Math.round((s.end - s.start) * FPS),
  background: s.background,
  showBadges: s.showBadges ?? true,
  timerLabel: s.timerLabel,
  content: s.content,
  captions: s.captions ?? [],
}));

export const totalDurationInFrames =
  scenes.reduce((acc, s) => acc + s.durationInFrames, 0) -
  (scenes.length - 1) * TRANSITION_FRAMES;
