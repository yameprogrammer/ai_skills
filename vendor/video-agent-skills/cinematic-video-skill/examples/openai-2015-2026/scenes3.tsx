import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {C, MONO, R, Eyebrow, Title, Body, G, Split, Stack, Card, useSec, prog} from './lib';
import {Icon} from './icons';

const Header: React.FC<{eb: string; title: string}> = ({eb, title}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 18}}><Eyebrow at={0.3}>{eb}</Eyebrow><Title at={0.7}>{title}</Title></div>
);
const Page: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 44}) => (
  <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap}}>{children}</AbsoluteFill>
);

// ============ ACT VI
export const Cadence = () => {
  const steps: [string, string, string][] = [
    ['2025.11.12', 'GPT-5.1', '更温暖自然的对话\n可选多种个性风格'],
    ['2025.12.11', 'GPT-5.2', '专业知识工作\n比肩行业专家'],
    ['2026.02.05', 'GPT-5.3-Codex', '更快的编程智能体\n检索、运行、调试'],
    ['2026.03.05', 'GPT-5.4', '内置电脑操作能力\nOSWorld 达 75%'],
    ['2026.04.23', 'GPT-5.5', '智能体编程与\n科研能力再上台阶'],
  ];
  const t = useSec();
  return (
    <Page gap={50}>
      <Header eb="2025.11 → 2026.04 · ITERATION" title="迭代的节奏，越来越快" />
      <div style={{position: 'relative', display: 'flex', gap: 20, alignItems: 'flex-end', height: 420}}>
        {steps.map(([d, n, desc], i) => (
          <R key={n} at={1.4 + i * 1.1} y={40} style={{marginBottom: i * 42}}>
            <Card style={{width: 300, boxSizing: 'border-box', padding: '24px 26px'}} glow={i === 4 ? C.mint : undefined}>
              <div style={{fontFamily: MONO, fontSize: 21, color: C.green2}}>{d}</div>
              <div style={{fontSize: n.length > 8 ? 34 : 40, fontWeight: 800, color: i === 4 ? C.mint : C.white, marginTop: 8, whiteSpace: 'nowrap'}}>{n}</div>
              <div style={{fontSize: 23, color: C.text2, marginTop: 10, lineHeight: 1.55, whiteSpace: 'pre-line'}}>{desc}</div>
            </Card>
          </R>
        ))}
      </div>
    </Page>
  );
};

export const Live = () => {
  const t = useSec();
  // full-duplex lanes: user speech and assistant speech overlapping in time
  const lane = (who: 'u' | 'a') => {
    const bars = [];
    for (let i = 0; i < 64; i++) {
      const x = i * 10; const tt = t * 1.4 - i * 0.08; const ph = ((tt % 6) + 6) % 6;
      let on = 0;
      if (who === 'u') on = ph < 2.6 ? 1 : ph > 4.8 ? 0.8 : 0;
      else on = (ph > 1.0 && ph < 1.35) || (ph > 2.3 && ph < 5.2) ? 1 : 0;
      const h = on ? 8 + 58 * Math.abs(Math.sin(i * 0.6 + t * (who === 'u' ? 6 : 8)) * Math.sin(i * 0.17 + t * 2)) : 4;
      bars.push(<rect key={i} x={x} y={40 - h / 2} width={6} height={h} rx={3} fill={who === 'u' ? C.blue : C.mint} opacity={on ? 0.9 : 0.25} />);
    }
    return bars;
  };
  return (
    <Split lw={720}
      left={<>
        <Eyebrow at={0.3}>2026.07.08 · GPT-Live</Eyebrow>
        <Title at={0.7}>边听边说，<br />像真人一样对话</Title>
        <Body at={1.3}><G>全双工</G>语音模型：能同时聆听与说话，自然地回应“嗯”、适时接话，还能在后台调用 GPT-5.5 完成搜索与推理，再把结果带回对话。</Body>
      </>}
      right={<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
        <R at={1.8}><Card style={{width: 820, padding: '30px 34px'}}>
          {(['u', 'a'] as const).map((w) => (
            <div key={w} style={{display: 'flex', alignItems: 'center', gap: 24, height: 110}}>
              <div style={{width: 120, fontSize: 26, fontWeight: 600, color: w === 'u' ? C.blue : C.mint}}>{w === 'u' ? '你' : 'ChatGPT'}</div>
              <svg width={620} height={80}>{lane(w)}</svg>
            </div>
          ))}
          <div style={{fontFamily: MONO, fontSize: 20, color: C.dim, marginTop: 8}}>听 · 说 · 思考，同时发生</div>
        </Card></R>
        <div style={{display: 'flex', gap: 18}}>
          {['同时听与说', '自然接话', '后台深度推理'].map((c, i) => (
            <R key={c} at={3.4 + i * 0.6}><div data-qa="chip" style={{fontSize: 25, color: C.white, border: `1px solid ${C.green2}88`, background: C.green + '22', borderRadius: 40, padding: '10px 26px', whiteSpace: 'nowrap'}}>{c}</div></R>
          ))}
        </div>
      </div>}
    />
  );
};

export const MathScene = () => {
  const t = useSec();
  const spiral = Array.from({length: 240}).map((_, i) => {
    const a = i * 0.12 + t * (1.2 + i * 0.004); const r = 6 + i * 0.52;
    return `${i ? 'L' : 'M'}${380 + Math.cos(a) * r},${110 + Math.sin(a) * r * 0.62}`;
  }).join(' ');
  return (
    <Page gap={40}>
      <Header eb="2026.08 → 2026.09 · DISCOVERY" title="AI 开始攻克悬而未决的数学难题" />
      <div style={{display: 'flex', gap: 30}}>
        <R at={1.4} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}} glow={C.green}>
          <div style={{height: 220, borderRadius: 14, background: 'rgba(255,255,255,0.03)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, padding: 20, boxSizing: 'border-box'}}>
            {Array.from({length: 10}).map((_, i) => { const on = prog(t, 2.2 + i * 0.35, 0.4); return (
              <div key={i} style={{borderRadius: 12, border: `2px solid ${on > 0.5 ? C.green2 : C.faint}`, background: on > 0.5 ? C.green + '33' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {on > 0.5 ? <Icon name="check" size={34} color={C.mint} sw={5} /> : <span style={{fontFamily: MONO, fontSize: 22, color: C.dim}}>?</span>}
              </div>); })}
          </div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>2026.08 · 十项数学进展</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.white, marginTop: 8}}>十个悬置十年以上的难题</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55, whiteSpace: 'pre-line'}}>{'OpenAI 公布内部模型给出的新成果，\n每一项都附带 Lean 4 机器可验证证明。'}</div>
        </Card></R>
        <R at={2.8} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}} glow={C.blue}>
          <div style={{height: 220, borderRadius: 14, background: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden'}}>
            <svg width={763} height={220} style={{position: 'absolute'}}>
              <path d={spiral} stroke="url(#vx)" strokeWidth={3} fill="none" opacity={0.9} />
              <defs><linearGradient id="vx" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.blue} /><stop offset="1" stopColor={C.mint} /></linearGradient></defs>
            </svg>
          </div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>2026.09.08 · 千禧年大奖难题</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.white, marginTop: 8}}>纳维–斯托克斯方程</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55, whiteSpace: 'pre-line'}}>{'OpenAI 公布这一百万美元级难题的解答，\n并附上完整的形式化证明。'}</div>
        </Card></R>
      </div>
    </Page>
  );
};

export const Gpt6 = () => {
  const t = useSec();
  const chips = ['电脑操作', '编程', '网络安全', '科学研究'];
  return (
    <Stack gap={0}>
      <Eyebrow at={0.3}>2026.09.03 · GPT-6 Astra</Eyebrow>
      <R at={0.8} style={{marginTop: 16}}><div data-qa="title" style={{fontSize: 230, fontWeight: 800, letterSpacing: -6, lineHeight: 1.1, background: `linear-gradient(100deg, #FFFFFF 15%, ${C.mint} 50%, ${C.violet})`, WebkitBackgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 ${34 + 22 * Math.sin(t * 4)}px ${C.violet}77)`}}>GPT-6</div></R>
      <R at={1.8} style={{marginTop: 10}}><div data-qa="title" style={{fontSize: 48, fontWeight: 700, color: C.white}}>迄今最智能、对齐程度最高的模型</div></R>
      <R at={2.6} style={{marginTop: 26}}><div style={{display: 'flex', gap: 18}}>
        {chips.map((c, i) => <R key={c} at={2.6 + i * 0.4}><div data-qa="chip" style={{fontSize: 26, color: C.white, border: `1px solid ${C.green2}88`, background: C.green + '22', borderRadius: 40, padding: '10px 28px', whiteSpace: 'nowrap'}}>{c} · 业界领先</div></R>)}
      </div></R>
      <R at={5.4} style={{marginTop: 44}}><Card glow={C.violet} style={{padding: '22px 34px', display: 'flex', alignItems: 'center', gap: 26}}>
        <div style={{fontFamily: MONO, fontSize: 24, color: C.green2, whiteSpace: 'nowrap'}}>2026.09.22</div>
        <div style={{fontSize: 30, color: C.white, fontWeight: 600, whiteSpace: 'nowrap'}}>GPT-6 Sol 与 Luna 发布</div>
        <div style={{fontSize: 26, color: C.text2, whiteSpace: 'nowrap'}}>前沿智能走进日常工作，<G>成本减半</G></div>
      </Card></R>
    </Stack>
  );
};
