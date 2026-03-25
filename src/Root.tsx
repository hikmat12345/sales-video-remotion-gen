import './index.css';
import { Composition } from 'remotion';
import { SalesVideo, totalDurationInFrames } from './compositions/SalesVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SalesVideo"
        component={SalesVideo}
        durationInFrames={totalDurationInFrames}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
