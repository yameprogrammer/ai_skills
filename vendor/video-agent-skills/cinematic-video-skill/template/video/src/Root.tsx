import React from 'react';
import {AbsoluteFill, Composition, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {Backdrop, Hud, QAProbe, Scene, SCENES, TOTAL, FPS} from './lib';
import {SCENE_MAP} from './scenes';

// Fonts are subset to the characters actually used (tools/subset_fonts.sh) and loaded before any frame renders.
if (typeof document !== 'undefined') {
  const h = delayRender('fonts');
  const faces = [
    new FontFace('Inter', `url(${staticFile('fonts/Inter.woff2')})`, {weight: '100 900'}),
    new FontFace('NotoSC', `url(${staticFile('fonts/NotoSC.woff2')})`, {weight: '100 900'}),
    new FontFace('JBMono', `url(${staticFile('fonts/JBMono.woff2')})`, {weight: '100 800'}),
  ];
  Promise.all(faces.map((f) => f.load())).then((fs) => {fs.forEach((f) => (document as any).fonts.add(f)); continueRender(h);})
    .catch((e) => {console.error('FONT_FAIL', e); continueRender(h);});
}

const Film: React.FC<{qa?: boolean}> = ({qa}) => (
  <AbsoluteFill style={{background: '#050507'}}>
    <Backdrop />
    {SCENES.map((s) => {
      const Comp = SCENE_MAP[s.id];
      if (!Comp) throw new Error('No component for scene id ' + s.id);
      return <Sequence key={s.id} from={s.start * FPS} durationInFrames={s.dur * FPS} name={s.id}><Scene def={s}><Comp /></Scene></Sequence>;
    })}
    <Hud />
    <QAProbe on={!!qa} />
  </AbsoluteFill>
);

export const RemotionRoot = () => (
  <Composition id="Film" component={Film as any} durationInFrames={TOTAL * FPS} fps={FPS} width={1920} height={1080} defaultProps={{qa: false}} />
);
