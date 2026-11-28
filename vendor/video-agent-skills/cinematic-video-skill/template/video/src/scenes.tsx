// Scene archetypes. Copy, rename and fill. Every text block that must stay readable carries data-qa
// (Eyebrow/Title/Body/Card/Window already do) so the layout probe can check it.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, R, Eyebrow, Title, Body, G, Split, Stack, Card, Window, Typed, Bloom, Count, useSec, useScene, prog, lin} from './lib';
import {Icon} from './icons';

// 1. Cold open: a question typed on black. Cursor stops blinking when the next line starts.
const Cold = () => {
  const t = useSec();
  return (
    <Stack gap={0}>
      <div data-qa="title" style={{fontSize: 76, fontWeight: 600, color: C.white}}><Typed text="如果……" t0={1.0} cps={4.5} cursor={t < 5.1} /></div>
      <R at={3.2} style={{marginTop: 18}}><div data-qa="body" style={{fontFamily: MONO, fontSize: 28, color: C.dim}}>What if…?</div></R>
      <div style={{height: 70}} />
      <div data-qa="title" style={{fontSize: 76, fontWeight: 600, color: C.white}}><Typed text="……会怎样？" t0={5.4} cps={4.5} /></div>
    </Stack>
  );
};

// 2. Title card: emblem + name + mission line.
const TitleCard = () => {
  const t = useSec();
  return (
    <Stack gap={0}>
      <Bloom size={180} t={t} t0={0.2} />
      <R at={1.3} style={{marginTop: 40}}><div data-qa="title" style={{fontSize: 150, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, color: C.white}}>主体名称</div></R>
      <R at={2.5} style={{marginTop: 30}}><div data-qa="body" style={{fontSize: 44, color: C.text}}>一句话使命</div></R>
    </Stack>
  );
};

// 3. Act card: chapter number, title, English subtitle, years. 4 s is enough.
export const ActCard: React.FC<{n: string; title: string; en: string; years: string}> = ({n, title, en, years}) => {
  const t = useSec(); const w = 90 * prog(t, 0.1, 1.2);
  return (
    <Stack gap={0}>
      <R at={0.1}><div style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <div style={{width: w, height: 2, background: C.green2}} />
        <div data-qa="eyebrow" style={{fontFamily: MONO, fontSize: 30, color: C.green2, letterSpacing: 6}}>{n}</div>
        <div style={{width: w, height: 2, background: C.green2}} />
      </div></R>
      <R at={0.45} style={{marginTop: 34}}><div data-qa="title" style={{fontSize: 108, fontWeight: 800, color: C.white, letterSpacing: 4}}>{title}</div></R>
      <R at={0.9} style={{marginTop: 22}}><div data-qa="body" style={{fontSize: 30, color: C.dim, letterSpacing: 3}}>{en}</div></R>
      <R at={1.3} style={{marginTop: 40}}><div data-qa="eyebrow" style={{fontFamily: MONO, fontSize: 34, color: C.mint}}>{years}</div></R>
    </Stack>
  );
};

// 4. Split scene: date eyebrow + headline + body on the left, one animated proof visual on the right.
const SplitScene = () => (
  <Split
    left={<>
      <Eyebrow at={0.3}>2016.04 · 事件名</Eyebrow>
      <Title at={0.7}>一句有画面感的<br />标题</Title>
      <Body at={1.3}>两到三句说明：发生了什么、为什么重要。关键词用 <G>高亮</G>，高亮词组不会被拆行。</Body>
    </>}
    right={<R at={1.8}><Window w={760} title="demo">
      <div data-qa="body" style={{fontSize: 30, color: C.text}}><Typed text="右侧放能“证明”这件事的动画：对话、代码、图表、界面……" t0={2.4} cps={13} /></div>
    </Window></R>}
  />
);

// 5. Grid scene: header + N equal cards revealed one by one (stretch = equal heights).
const GridScene = () => {
  const items: [string, string, string][] = [['book', '标题一', '两行说明\n手动断行避免孤字'], ['heart', '标题二', '第二张卡片\n的说明文字'], ['flask', '标题三', '第三张卡片\n的说明文字']];
  return (
    <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap: 40}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}><Eyebrow at={0.3}>SECTION</Eyebrow><Title at={0.7}>分组展示的标题</Title></div>
      <div style={{display: 'flex', gap: 30}}>
        {items.map(([ic, n, d], i) => (
          <R key={n} at={1.4 + i * 1.1} style={{flex: 1, display: 'flex'}}><Card style={{flex: 1}} glow={C.green}>
            <Icon name={ic} size={44} color={C.green2} />
            <div style={{fontSize: 36, fontWeight: 700, color: C.white, marginTop: 16}}>{n}</div>
            <div style={{fontSize: 25, color: C.text2, marginTop: 10, lineHeight: 1.55, whiteSpace: 'pre-line'}}>{d}</div>
          </Card></R>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 6. Hero scene: one giant word with gradient glow, a subtitle and chips.
const Hero = () => {
  const t = useSec();
  return (
    <Stack gap={0}>
      <Eyebrow at={0.3}>2024.01.01</Eyebrow>
      <R at={0.8} style={{marginTop: 16}}><div data-qa="title" style={{fontSize: 220, fontWeight: 800, letterSpacing: -6, lineHeight: 1.1, background: `linear-gradient(100deg,#fff 20%,${C.mint} 60%,${C.blue})`, WebkitBackgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 ${30 + 20 * Math.sin(t * 4)}px ${C.green}88)`}}>HERO</div></R>
      <R at={1.8} style={{marginTop: 10}}><div data-qa="title" style={{fontSize: 48, fontWeight: 700, color: C.white}}>一句定位</div></R>
      <R at={2.8} style={{marginTop: 26}}><div data-qa="body" style={{fontSize: 30, color: C.text2}}>数字要能被核实：<Count to={900} t0={2.8} d={2} /> 百万</div></R>
    </Stack>
  );
};

// 7. Outro: slower custom fade to black over the last ~3 s.
const Outro = () => {
  const t = useSec(); const {dur} = useScene(); const out = 1 - lin(t, dur - 3.0, 2.7);
  return <AbsoluteFill style={{opacity: out}}><Stack gap={0}>
    <Bloom size={180} t={t} t0={0.1} />
    <R at={1.0} style={{marginTop: 40}}><div data-qa="title" style={{fontSize: 120, fontWeight: 700, color: C.white}}>主体名称</div></R>
    <R at={3.0} style={{marginTop: 50}}><div data-qa="eyebrow" style={{fontSize: 36, color: C.mint, letterSpacing: 8}}>最好的，还在前方。</div></R>
  </Stack></AbsoluteFill>;
};

export const SCENE_MAP: Record<string, React.FC> = {
  cold: Cold, title: TitleCard,
  act1: () => <ActCard n="第一幕" title="幕标题" en="ACT TITLE" years="2015 — 2017" />,
  split1: SplitScene, grid1: GridScene, hero1: Hero, outro: Outro,
};
