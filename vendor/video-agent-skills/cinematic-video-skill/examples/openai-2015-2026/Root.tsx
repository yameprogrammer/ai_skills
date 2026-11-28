import React from 'react';
import {AbsoluteFill, Composition, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {Backdrop, Hud, QAProbe, Scene, SCENES, TOTAL, FPS} from './lib';
import * as A from './scenes1';
import * as B from './scenes2';
import * as D from './scenes3';

if (typeof document !== 'undefined') {
  const h = delayRender('fonts');
  const faces = [
    new FontFace('Inter', `url(${staticFile('fonts/Inter.woff2')})`, {weight: '100 900'}),
    new FontFace('NotoSC', `url(${staticFile('fonts/NotoSC.woff2')})`, {weight: '100 900'}),
    new FontFace('JBMono', `url(${staticFile('fonts/JBMono.woff2')})`, {weight: '100 800'}),
  ];
  Promise.all(faces.map((f) => f.load())).then((fs) => {fs.forEach((f) => (document as any).fonts.add(f)); continueRender(h);}).catch((e) => {console.error('FONT_FAIL', e); continueRender(h);});
}

const MAP: Record<string, React.FC> = {
  cold: A.Cold, title: A.TitleCard,
  act1: () => <A.ActCard n="第一幕" title="一个大胆的赌注" en="A BOLD BET" years="2015 — 2017" />,
  found: A.Found, gym: A.Gym, dota: A.Dota,
  act2: () => <A.ActCard n="第二幕" title="规模的启示" en="THE REVELATION OF SCALE" years="2018 — 2020" />,
  gpt1: A.Gpt1, gpt2: A.Gpt2, dactyl: A.Dactyl, gpt3: A.Gpt3, scale: A.ScaleChart,
  act3: () => <A.ActCard n="第三幕" title="想象力被解锁" en="IMAGINATION, UNLOCKED" years="2021 — 2022" />,
  dalle: A.Dalle, codex: A.Codex, instruct: A.Instruct, dalle2: A.Dalle2, chatgpt: A.ChatGPT, growth: A.Growth,
  act4: () => <A.ActCard n="第四幕" title="能力的飞跃" en="A LEAP IN CAPABILITY" years="2023 — 2024" />,
  gpt4: B.Gpt4, vision: B.Vision, sora: B.Sora, gpt4o: B.Gpt4o, o1: B.O1,
  act5: () => <A.ActCard n="第五幕" title="从对话到行动" en="FROM CONVERSATION TO ACTION" years="2025" />,
  agents: B.Agents, codexagent: B.CodexAgent, images: B.Images, gpt5: B.Gpt5, science: B.Science,
  act6: () => <A.ActCard n="第六幕" title="智能的新纪元" en="A NEW ERA OF INTELLIGENCE" years="2025.11 — 2026.09" />,
  cadence: D.Cadence, reach: B.Reach, live: D.Live, math: D.MathScene, gpt6: D.Gpt6,
  impact: B.Impact, recap: B.Recap, manifesto: B.Manifesto, end: B.End,
};

const Film: React.FC<{qa?: boolean}> = ({qa}) => (
  <AbsoluteFill style={{background: '#050507'}}>
    <Backdrop />
    {SCENES.map((s) => {
      const Comp = MAP[s.id];
      return <Sequence key={s.id} from={s.start * FPS} durationInFrames={s.dur * FPS} name={s.id}><Scene def={s}><Comp /></Scene></Sequence>;
    })}
    <Hud />
    <QAProbe on={!!qa} />
  </AbsoluteFill>
);

export const RemotionRoot = () => (
  <Composition id="OpenAI" component={Film as any} durationInFrames={TOTAL * FPS} fps={FPS} width={1920} height={1080} defaultProps={{qa: false}} />
);
