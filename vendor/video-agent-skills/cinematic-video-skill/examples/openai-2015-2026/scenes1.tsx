import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {C, MONO, R, Eyebrow, Title, Body, G, Split, Stack, Card, Window, Typed, Bloom, useSec, prog, lin, Count} from './lib';
import {Icon} from './icons';

// ============ PROLOGUE
export const Cold = () => {
  const t = useSec();
  return (
    <Stack gap={0}>
      <div data-qa="title" style={{fontSize: 76, fontWeight: 600, color: C.white}}><Typed text="如果机器能够思考……" t0={1.0} cps={4.5} cursor={t < 5.1} /></div>
      <R at={3.4} style={{marginTop: 18}}><div data-qa="body" style={{fontFamily: MONO, fontSize: 28, color: C.dim}}>What if machines could think?</div></R>
      <div style={{height: 70}} />
      <div data-qa="title" style={{fontSize: 76, fontWeight: 600, color: C.white}}><Typed text="它会为人类解锁什么？" t0={5.6} cps={4.5} /></div>
      <R at={8.0} style={{marginTop: 18}}><div data-qa="body" style={{fontFamily: MONO, fontSize: 28, color: C.dim}}>And what would it unlock for humanity?</div></R>
    </Stack>
  );
};
export const TitleCard = () => {
  const t = useSec();
  return (
    <Stack gap={0}>
      <Bloom size={180} t={t} t0={0.2} />
      <R at={1.3} style={{marginTop: 40}}><div data-qa="title" style={{fontSize: 150, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, color: C.white}}>OpenAI</div></R>
      <R at={2.5} style={{marginTop: 34}}><div data-qa="body" style={{fontSize: 46, color: C.text, fontWeight: 500, letterSpacing: 2}}>确保通用人工智能造福全人类</div></R>
      <R at={3.1} style={{marginTop: 14}}><div data-qa="body" style={{fontSize: 26, color: C.dim}}>Ensure that artificial general intelligence benefits all of humanity</div></R>
      <R at={4.2} style={{marginTop: 44}}><div data-qa="eyebrow" style={{fontFamily: MONO, fontSize: 26, color: C.mint, letterSpacing: 4}}>2015 — 2026 · 一段改变世界的旅程</div></R>
    </Stack>
  );
};
export const ActCard: React.FC<{n: string; title: string; en: string; years: string}> = ({n, title, en, years}) => {
  const t = useSec(); const w = 90 * prog(t, 0.1, 1.2);
  return (
    <Stack gap={0}>
      <R at={0.1}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{width: w, height: 2, background: C.green2}} />
          <div data-qa="eyebrow" style={{fontFamily: MONO, fontSize: 30, color: C.green2, letterSpacing: 6}}>{n}</div>
          <div style={{width: w, height: 2, background: C.green2}} />
        </div>
      </R>
      <R at={0.45} style={{marginTop: 34}}><div data-qa="title" style={{fontSize: 108, fontWeight: 800, color: C.white, letterSpacing: 4}}>{title}</div></R>
      <R at={0.9} style={{marginTop: 22}}><div data-qa="body" style={{fontSize: 30, color: C.dim, letterSpacing: 3}}>{en}</div></R>
      <R at={1.3} style={{marginTop: 40}}><div data-qa="eyebrow" style={{fontFamily: MONO, fontSize: 34, color: C.mint}}>{years}</div></R>
    </Stack>
  );
};

// ============ ACT I
const FeatureRow: React.FC<{icon: string; title: string; desc: string; at: number; color?: string}> = ({icon, title, desc, at, color = C.green2}) => (
  <R at={at} x={30} y={0}>
    <Card style={{display: 'flex', gap: 26, alignItems: 'center', width: 740, padding: '26px 30px'}}>
      <div style={{width: 76, height: 76, borderRadius: 18, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Icon name={icon} size={42} color={color} /></div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={{fontSize: 32, fontWeight: 700, color: C.white}}>{title}</div>
        <div style={{fontSize: 25, color: C.text2, lineHeight: 1.5}}>{desc}</div>
      </div>
    </Card>
  </R>
);
export const Found = () => (
  <Split
    left={<>
      <Eyebrow at={0.3}>2015.12 · 旧金山</Eyebrow>
      <Title at={0.7}>一个近乎疯狂的<br />远大目标</Title>
      <Body at={1.3}>一群研究者与工程师聚在一起，以<G>非营利研究实验室</G>的形式创立 OpenAI，决心打造安全、有益的通用人工智能（AGI），并让它的红利惠及每一个人。</Body>
    </>}
    right={<div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      <FeatureRow at={2.8} icon="target" title="使命" desc="确保 AGI 造福全人类" />
      <FeatureRow at={3.8} icon="book" title="开放" desc="论文、代码与工具向全世界公开" />
      <FeatureRow at={4.8} icon="infinity" title="长期主义" desc="为十年之后的技术提前做准备" />
    </div>}
  />
);
const EnvTile: React.FC<{label: string; at: number; children: React.ReactNode}> = ({label, at, children}) => (
  <R at={at} y={20}>
    <div data-qa="card" style={{width: 370, height: 256, background: C.card, border: `1px solid ${C.line}`, borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
      <svg width={370} height={200} viewBox="0 0 370 200">{children}</svg>
      <div style={{fontFamily: MONO, fontSize: 22, color: C.dim, padding: '0 22px', lineHeight: '44px', borderTop: `1px solid ${C.line}`}}>{label}</div>
    </div>
  </R>
);
export const Gym = () => {
  const t = useSec();
  const cx = 185 + 70 * Math.sin(t * 1.3); const ang = 0.28 * Math.sin(t * 2.3 + 1);
  const pa = 1.1 * Math.cos(t * 1.9);
  const path = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [3, 3]]; const step = Math.floor((t * 1.6) % (path.length + 2));
  const [ax, ay] = path[Math.min(step, path.length - 1)];
  const holes = [[1, 1], [3, 1], [3, 0], [0, 3]];
  const amp = Math.min(1, 0.3 + (t % 6) / 6); const mx = 0.5 + 0.42 * amp * Math.sin(t * 2.2);
  const hy = (x: number) => 150 - 70 * Math.sin(3 * x) * 0.5 - 30; const mxP = 30 + mx * 310;
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2016.04 · OpenAI Gym</Eyebrow>
        <Title at={0.7}>给智能体<br />一座公共练习场</Title>
        <Body at={1.3}>统一的标准环境，让全世界的研究者都能用同一把尺子<G>训练、比较、复现</G>强化学习算法。</Body>
        <R at={4.4}><Card style={{padding: '20px 26px'}} glow={C.green}><div style={{fontSize: 26, color: C.text, lineHeight: 1.55}}><span style={{fontFamily: MONO, color: C.mint}}>2017 · PPO</span>　算法问世，<br />日后成为 RLHF 训练的核心引擎</div></Card></R>
      </>}
      right={<div style={{display: 'grid', gridTemplateColumns: '370px 370px', gap: 24}}>
        <EnvTile at={2.0} label="CartPole">
          <line x1={30} x2={340} y1={150} y2={150} stroke={C.faint} strokeWidth={3} />
          <rect x={cx - 34} y={132} width={68} height={24} rx={6} fill={C.green2} />
          <line x1={cx} y1={134} x2={cx + 110 * Math.sin(ang)} y2={134 - 110 * Math.cos(ang)} stroke="#fff" strokeWidth={7} strokeLinecap="round" />
        </EnvTile>
        <EnvTile at={2.5} label="Pendulum">
          <circle cx={185} cy={40} r={6} fill={C.dim} />
          <line x1={185} y1={40} x2={185 + 120 * Math.sin(pa)} y2={40 + 120 * Math.cos(pa)} stroke="#fff" strokeWidth={5} />
          <circle cx={185 + 120 * Math.sin(pa)} cy={40 + 120 * Math.cos(pa)} r={16} fill={C.mint} />
        </EnvTile>
        <EnvTile at={3.0} label="FrozenLake">
          {Array.from({length: 16}).map((_, i) => {
            const gx = i % 4, gy = Math.floor(i / 4); const hole = holes.some(([a, b]) => a === gx && b === gy); const goal = gx === 3 && gy === 3;
            return <rect key={i} x={105 + gx * 40} y={20 + gy * 40} width={36} height={36} rx={5} fill={goal ? C.green : hole ? '#1B2B4A' : '#2A3342'} />;
          })}
          <circle cx={105 + ax * 40 + 18} cy={20 + ay * 40 + 18} r={11} fill="#fff" />
        </EnvTile>
        <EnvTile at={3.5} label="MountainCar">
          <path d={Array.from({length: 60}).map((_, i) => { const x = i / 59; return `${i ? 'L' : 'M'}${30 + x * 310},${hy(x * 1.9 - 0.3)}`; }).join(' ')} stroke={C.faint} strokeWidth={4} fill="none" />
          <circle cx={mxP} cy={hy(mx * 1.9 - 0.3) - 12} r={12} fill={C.amber} />
          <line x1={322} y1={hy(1.6) - 4} x2={322} y2={hy(1.6) - 44} stroke="#fff" strokeWidth={3} />
          <path d={`M322 ${hy(1.6) - 44} L344 ${hy(1.6) - 37} L322 ${hy(1.6) - 30}`} fill={C.green2} />
        </EnvTile>
      </div>}
    />
  );
};
export const Dota = () => {
  const t = useSec();
  const nodes = Array.from({length: 5}).map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [190 + 140 * Math.cos(a), 170 + 140 * Math.sin(a)]; });
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2017 – 2019 · OpenAI Five</Eyebrow>
        <Title at={0.7}>在最复杂的游戏里<br />击败世界冠军</Title>
        <Body at={1.3}>五个神经网络从零开始<G>自我对弈</G>，学会了长期规划与团队协作。2019 年 4 月，OpenAI Five 以 2 : 0 击败 Dota 2 世界冠军 OG 战队。</Body>
      </>}
      right={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
        <R at={1.8}>
          <svg width={380} height={340} viewBox="0 0 380 340">
            {nodes.map(([x1, y1], i) => nodes.map(([x2, y2], j) => j > i && <line key={i + '-' + j} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.green2} strokeOpacity={0.25 + 0.35 * Math.max(0, Math.sin(t * 3 + i + j))} strokeWidth={2} />))}
            {nodes.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={30 + 4 * Math.sin(t * 4 + i)} fill={C.green} fillOpacity={0.18} /><circle cx={x} cy={y} r={16} fill={C.green2} /></g>)}
          </svg>
        </R>
        <div style={{display: 'flex', gap: 28}}>
          <R at={3.2}><Card style={{width: 360, textAlign: 'center'}} glow={C.green}>
            <div style={{fontSize: 76, fontWeight: 800, color: C.white, fontFamily: MONO}}>2 : 0</div>
            <div style={{fontSize: 25, color: C.text2, marginTop: 6}}>击败世界冠军 OG</div>
          </Card></R>
          <R at={3.8}><Card style={{width: 360, textAlign: 'center'}}>
            <div style={{fontSize: 76, fontWeight: 800, color: C.mint, fontFamily: MONO}}><Count to={45000} t0={3.8} d={2.2} /></div>
            <div style={{fontSize: 25, color: C.text2, marginTop: 6}}>年 · 自我对弈积累的经验</div>
          </Card></R>
        </div>
      </div>}
    />
  );
};

// ============ ACT II
export const Gpt1 = () => {
  const t = useSec();
  const cands: [string, number][] = [['改变', 62], ['帮助', 21], ['重塑', 11], ['加速', 6]];
  const chosen = prog(t, 5.8, 0.6);
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2018.06 · GPT</Eyebrow>
        <Title at={0.7}>生成式预训练：<br />先读万卷书</Title>
        <Body at={1.3}>先在海量文本上学习“<G>预测下一个词</G>”，再针对具体任务微调。这个简洁的想法，成为此后一切的起点。</Body>
        <R at={2.2}><div data-qa="chip" style={{display: 'inline-block', fontFamily: MONO, fontSize: 25, color: C.mint, border: `1px solid ${C.mint}66`, borderRadius: 40, padding: '8px 22px'}}>1.17 亿参数</div></R>
      </>}
      right={<R at={1.8}><Window w={760} title="next-token prediction">
        <div data-qa="body" style={{fontSize: 44, fontWeight: 600, color: C.white, display: 'flex', alignItems: 'center', gap: 14}}>
          人工智能将会
          <span style={{display: 'inline-block', minWidth: 110, padding: '0 12px', borderRadius: 10, border: `2px dashed ${chosen > 0.5 ? C.green2 : C.dim}`, color: C.green2, textAlign: 'center', opacity: 0.6 + 0.4 * Math.abs(Math.sin(t * 3))}}>{chosen > 0.5 ? '改变' : '？'}</span>
          世界
        </div>
        <div style={{height: 34}} />
        {cands.map(([w, p], i) => (
          <div key={w} data-qa="row" style={{display: 'flex', alignItems: 'center', gap: 18, height: 56}}>
            <div style={{width: 80, fontSize: 30, color: i === 0 ? C.white : C.text2}}>{w}</div>
            <div style={{width: 470, height: 22, background: 'rgba(255,255,255,0.06)', borderRadius: 11}}>
              <div style={{width: 470 * p / 100 * prog(t, 3 + i * 0.35, 1.4), height: 22, borderRadius: 11, background: i === 0 ? C.green2 : C.faint}} />
            </div>
            <div style={{width: 80, fontFamily: MONO, fontSize: 25, color: C.dim, textAlign: 'right'}}>{Math.round(p * prog(t, 3 + i * 0.35, 1.4))}%</div>
          </div>
        ))}
      </Window></R>}
    />
  );
};
export const Gpt2 = () => (
  <Split
    left={<>
      <Eyebrow at={0.3}>2019.02 · GPT-2</Eyebrow>
      <Title at={0.7}>机器第一次写出<br />令人信服的文章</Title>
      <Body at={1.3}><G>15 亿参数</G>，无需专门训练即可续写、翻译、摘要与问答。OpenAI 选择分阶段发布，开启了全球关于<G>负责任发布 AI</G> 的讨论。</Body>
    </>}
    right={<R at={1.8}><Window w={760} title="GPT-2 · 续写">
      <div style={{fontFamily: MONO, fontSize: 21, color: C.dim, marginBottom: 10}}>人类输入</div>
      <div data-qa="body" style={{fontSize: 29, color: C.white, lineHeight: 1.6}}>科学家们在安第斯山脉一处偏远的山谷里，发现了一群会说英语的独角兽……</div>
      <div style={{height: 1, background: C.line, margin: '24px 0'}} />
      <div style={{fontFamily: MONO, fontSize: 21, color: C.green2, marginBottom: 10}}>模型续写</div>
      <div data-qa="body" style={{fontSize: 29, color: C.text2, lineHeight: 1.6}}><Typed text="这些独角兽长着银白色的角，生活在一片从未被人类探索过的山谷中。研究团队的负责人表示，它们的语言听起来竟然像是某种古老的方言……" t0={3.0} cps={12} /></div>
    </Window></R>}
  />
);
const FACE_COLORS = ['#FFFFFF', '#10A37F', '#5B8CFF', '#F5B45B', '#FF7AB8', '#A67CFF'];
export const Dactyl = () => {
  const t = useSec();
  const s = 62; const cx = 280, cy = 250;
  const iso = (x: number, y: number, z: number) => [cx + (x - y) * s * 0.866, cy + (x + y) * s * 0.5 - z * s];
  const poly = (pts: number[][]) => pts.map((p) => p.join(',')).join(' ');
  const faces: {pts: number[][]; solved: string; k: string}[] = [];
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
    faces.push({k: `t${a}${b}`, solved: FACE_COLORS[0], pts: [iso(a, b, 3), iso(a + 1, b, 3), iso(a + 1, b + 1, 3), iso(a, b + 1, 3)]});
    faces.push({k: `l${a}${b}`, solved: FACE_COLORS[1], pts: [iso(a, 3, 3 - b), iso(a + 1, 3, 3 - b), iso(a + 1, 3, 2 - b), iso(a, 3, 2 - b)]});
    faces.push({k: `r${a}${b}`, solved: FACE_COLORS[2], pts: [iso(3, a, 3 - b), iso(3, a + 1, 3 - b), iso(3, a + 1, 2 - b), iso(3, a, 2 - b)]});
  }
  const solvedAll = prog(t, 6.5, 0.6);
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2019.10 · Dactyl</Eyebrow>
        <Title at={0.7}>一只机械手，<br />单手还原魔方</Title>
        <Body at={1.3}>完全在<G>模拟世界</G>中训练，通过海量随机变化的环境学会随机应变，再把技能带进真实世界。</Body>
      </>}
      right={<R at={1.5}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
        <svg width={560} height={470} viewBox="0 0 560 470" style={{transform: `translateY(${Math.sin(t * 1.5) * 8}px)`}}>
          <ellipse cx={280} cy={440} rx={180 + 30 * solvedAll} ry={18} fill={C.green} opacity={0.15 + 0.25 * solvedAll} />
          {faces.map((f) => {
            const sw = 1.6 + random(f.k) * 4.6; const done = t > sw;
            const col = done ? f.solved : FACE_COLORS[Math.floor(random(f.k + 'c') * 6)];
            return <polygon key={f.k} points={poly(f.pts)} fill={col} stroke="#050507" strokeWidth={5} strokeLinejoin="round" opacity={f.k[0] === 't' ? 1 : f.k[0] === 'l' ? 0.85 : 0.75} />;
          })}
        </svg>
        <div data-qa="chip" style={{fontFamily: MONO, fontSize: 24, color: solvedAll > 0.5 ? C.mint : C.dim}}>{solvedAll > 0.5 ? '✓ 还原完成 · Sim → Real' : '训练于模拟 · 执行于现实'}</div>
      </div></R>}
    />
  );
};
export const Gpt3 = () => (
  <Split
    left={<>
      <Eyebrow at={0.3}>2020.05 · GPT-3</Eyebrow>
      <Title at={0.7}>1750 亿参数，<br />学会举一反三</Title>
      <Body at={1.3}>只需在提示中给出几个例子，它就能完成从未专门训练过的任务 —— <G>少样本学习</G>。论文荣获 NeurIPS 2020 最佳论文奖。</Body>
    </>}
    right={<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
      <R at={1.8}><Window w={760} title="few-shot prompt">
        <div data-qa="body" style={{fontFamily: MONO, fontSize: 28, lineHeight: 1.7, color: C.text}}>
          <div style={{color: C.dim}}>英译中：</div>
          <div>sea otter  → 海獭</div>
          <div>peppermint → 薄荷</div>
          <div>cheese     → <Typed text="奶酪" t0={4.2} cps={3} style={{color: C.green2, fontWeight: 700}} /></div>
        </div>
      </Window></R>
      <R at={5.6}><Card style={{width: 760}} glow={C.green}>
        <div style={{fontFamily: MONO, fontSize: 24, color: C.green2}}>2020.06 · OpenAI API</div>
        <div data-qa="body" style={{fontFamily: MONO, fontSize: 23, color: C.text2, lineHeight: 1.55, marginTop: 12, whiteSpace: 'pre'}}>{'openai.Completion.create(\n    engine="davinci",\n    prompt="…")'}</div>
        <div style={{fontSize: 26, color: C.text, marginTop: 14}}>开发者只需几行代码，就能把大模型接入产品</div>
      </Card></R>
    </div>}
  />
);
export const ScaleChart = () => {
  const t = useSec();
  const data: [string, string, number, string][] = [['GPT', '2018', 1.17e8, '1.17 亿'], ['GPT-2', '2019', 1.5e9, '15 亿'], ['GPT-3', '2020', 1.75e11, '1750 亿']];
  const hOf = (v: number) => 30 + (Math.log10(v) - 8) / (11.3 - 8) * 380;
  const base = 470;
  return (
    <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap: 44}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Eyebrow at={0.3}>2018 → 2020 · SCALING</Eyebrow>
        <Title at={0.7}>规模，带来能力的涌现</Title>
      </div>
      <div style={{display: 'flex', gap: 80, alignItems: 'center'}}>
        <div style={{position: 'relative', width: 860, height: 560, flexShrink: 0}}>
          <svg width={860} height={560} style={{position: 'absolute'}}>
            <line x1={20} x2={840} y1={base} y2={base} stroke={C.faint} strokeWidth={2} />
            {data.map(([n, y, v], i) => {
              const h = hOf(v) * prog(t, 1.5 + i * 1.4, 1.6); const x = 90 + i * 260;
              return <rect key={n} x={x} y={base - h} width={160} height={h} rx={10} fill={i === 2 ? 'url(#gg)' : i === 1 ? '#1C6E58' : '#1A3D34'} />;
            })}
            <defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.mint} /><stop offset="1" stopColor={C.green} /></linearGradient></defs>
          </svg>
          {data.map(([n, y, v, lab], i) => {
            const x = 90 + i * 260; const on = prog(t, 2.3 + i * 1.4, 0.8);
            return (
              <React.Fragment key={n}>
                <div data-qa="label" style={{position: 'absolute', left: x - 30, width: 220, top: base - hOf(v) - 62, textAlign: 'center', fontSize: 36, fontWeight: 700, color: i === 2 ? C.mint : C.white, opacity: on}}>{lab}</div>
                <div data-qa="label" style={{position: 'absolute', left: x - 30, width: 220, top: base + 18, textAlign: 'center', opacity: prog(t, 1.2 + i * 1.4, 0.6)}}>
                  <div style={{fontSize: 30, fontWeight: 600, color: C.text}}>{n}</div>
                  <div style={{fontFamily: MONO, fontSize: 22, color: C.dim}}>{y}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24, width: 640}}>
          <R at={6.2}><div data-qa="title" style={{fontSize: 120, fontWeight: 800, lineHeight: 1.05, background: `linear-gradient(90deg, ${C.white}, ${C.mint})`, WebkitBackgroundClip: 'text', color: 'transparent'}}>≈1500×</div></R>
          <Body at={6.8}>短短两年，模型参数规模扩大了约 <G>1500 倍</G>。</Body>
          <R at={7.8}><Card glow={C.green}>
            <div style={{fontFamily: MONO, fontSize: 24, color: C.green2}}>Scaling Laws · 2020</div>
            <div style={{fontSize: 27, color: C.text, lineHeight: 1.6, marginTop: 10}}>OpenAI 的研究发现：算力、数据与参数同步扩大，模型能力就会<G>可预测地</G>持续提升。</div>
          </Card></R>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ ACT III
export const Dalle = () => {
  const t = useSec();
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2021.01 · DALL·E & CLIP</Eyebrow>
        <Title at={0.7}>用语言，<br />画出想象</Title>
        <Body at={1.3}><G>DALL·E</G> 能根据文字描述生成图像；<G>CLIP</G> 从 4 亿对图文中学习，让 AI 第一次同时读懂画面与语言。</Body>
      </>}
      right={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
        <R at={1.6}><div data-qa="chip" style={{fontSize: 30, color: C.white, background: C.cardHi, border: `1px solid ${C.line}`, borderRadius: 40, padding: '12px 30px'}}><Typed text="“一把牛油果形状的扶手椅”" t0={2.0} cps={8} /></div></R>
        <R at={2.4}><div data-qa="card" style={{width: 560, height: 460, borderRadius: 24, overflow: 'hidden', position: 'relative', border: `1px solid ${C.line}`}}>
          <svg width={560} height={460} viewBox="0 0 560 460" style={{position: 'absolute'}}>
            <defs>
              <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F4EBDD" /><stop offset="1" stopColor="#E3D3BC" /></linearGradient>
              <radialGradient id="flesh" cx="0.5" cy="0.55" r="0.6"><stop offset="0" stopColor="#F2F0A8" /><stop offset="1" stopColor="#B8D46A" /></radialGradient>
            </defs>
            <rect width={560} height={460} fill="url(#wall)" />
            <rect y={360} width={560} height={100} fill="#CDB89A" />
            <ellipse cx={280} cy={392} rx={170} ry={22} fill="#000" opacity={0.18} />
            <path d="M280 60 C200 60 160 130 150 190 C135 270 150 360 280 372 C410 360 425 270 410 190 C400 130 360 60 280 60 Z" fill="#3F6B21" />
            <path d="M280 88 C218 88 186 145 178 196 C166 262 182 338 280 346 C378 338 394 262 382 196 C374 145 342 88 280 88 Z" fill="url(#flesh)" />
            <circle cx={280} cy={262} r={58} fill="#8A5A2E" /><circle cx={265} cy={246} r={16} fill="#A87444" opacity={0.7} />
            <rect x={160} y={318} width={240} height={52} rx={26} fill="#9CC455" stroke="#3F6B21" strokeWidth={6} />
            <rect x={196} y={370} width={14} height={24} rx={4} fill="#5B3A1E" /><rect x={350} y={370} width={14} height={24} rx={4} fill="#5B3A1E" />
          </svg>
          <svg width={560} height={460} style={{position: 'absolute'}}>
            {Array.from({length: 14 * 12}).map((_, i) => {
              const gx = i % 14, gy = Math.floor(i / 14); const th = 3.2 + random('m' + i) * 3.8;
              const o = 1 - prog(t, th, 0.7);
              const col = ['#2B3A2E', '#46604A', '#8A7C5E', '#5A4A3A', '#2E4F3F', '#B5A583'][Math.floor(random('c' + i) * 6)];
              return o > 0.01 ? <rect key={i} x={gx * 40} y={gy * 40} width={40} height={40} fill={col} opacity={o} /> : null;
            })}
          </svg>
        </div></R>
      </div>}
    />
  );
};
export const Codex = () => {
  const t = useSec();
  const lines = ['def average(nums):', '    vals = [n for n in nums if n is not None]', '    return sum(vals) / len(vals) if vals else 0'];
  const starts = [3.6, 4.6, 6.4];
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2021.08 · Codex</Eyebrow>
        <Title at={0.7}>用自然语言<br />编写代码</Title>
        <Body at={1.3}>Codex 把人类的描述直接翻译成可运行的代码，并驱动了 <G>GitHub Copilot</G> —— 数百万开发者从此拥有了 AI 结对程序员。</Body>
      </>}
      right={<R at={1.6}><Window w={780} title="average.py">
        <div data-qa="body" style={{fontFamily: MONO, fontSize: 24, lineHeight: 1.9, whiteSpace: 'pre', color: C.text}}>
          <div style={{color: '#6A9955'}}><Typed text="# 计算平均值，自动忽略空值" t0={1.8} cps={9} cursor={t < 3.4} /></div>
          {lines.map((l, i) => <div key={i} style={{color: i === 0 ? '#79B8FF' : C.text}}><Typed text={l} t0={starts[i]} cps={26} cursor={t >= starts[i] && t < starts[i] + l.length / 26 + 0.2} /></div>)}
        </div>
        <R at={8.2}><div style={{marginTop: 20, borderTop: `1px solid ${C.line}`, paddingTop: 18, fontFamily: MONO, fontSize: 24, lineHeight: 1.7}}>
          <div style={{color: C.dim}}>{'>>> average([3, None, 5, 10])'}</div>
          <div style={{color: C.green2}}>6.0</div>
        </div></R>
      </Window></R>}
    />
  );
};
export const Instruct = () => {
  const t = useSec();
  const cx = 360, cy = 300, rx = 235, ry = 205;
  const nodes: [string, number, number][] = [['模型生成回答', cx, cy - ry], ['人类比较与排序', cx + rx, cy], ['训练奖励模型', cx, cy + ry], ['强化学习优化', cx - rx, cy]];
  const ang = (t - 2) * 1.25 - Math.PI / 2;
  const dot = [cx + rx * Math.cos(ang), cy + ry * Math.sin(ang)];
  return (
    <Split
      left={<>
        <Eyebrow at={0.3}>2022.01 · InstructGPT</Eyebrow>
        <Title at={0.7}>从人类反馈中学习</Title>
        <Body at={1.3}><G>RLHF</G> 让模型不仅知识渊博，更能理解意图、遵循指令，给出真正有帮助、也更安全的回答。</Body>
      </>}
      right={<R at={1.5}><div style={{position: 'relative', width: 720, height: 600}}>
        <svg width={720} height={600} style={{position: 'absolute'}}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={C.faint} strokeWidth={3} strokeDasharray="8 10" />
          {t > 2 && <circle cx={dot[0]} cy={dot[1]} r={11} fill={C.mint} style={{filter: `drop-shadow(0 0 10px ${C.mint})`}} />}
        </svg>
        <div data-qa="label" style={{position: 'absolute', left: cx - 90, top: cy - 36, width: 180, textAlign: 'center', fontFamily: MONO, fontSize: 48, fontWeight: 700, color: C.green2}}>RLHF</div>
        {nodes.map(([lab, x, y], i) => {
          const a = -Math.PI / 2 + i * Math.PI / 2; const diff = Math.atan2(Math.sin(ang - a), Math.cos(ang - a));
          const hot = t > 2 && Math.abs(diff) < 0.5;
          return <div key={lab} data-qa="card" style={{position: 'absolute', left: x - 120, top: y - 42, width: 240, height: 84, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 27, fontWeight: 600, background: hot ? C.green : 'rgba(22,22,28,0.95)', border: `1px solid ${hot ? C.mint : C.line}`, color: C.white, opacity: prog(t, 1.8 + i * 0.3, 0.6)}}>{lab}</div>;
        })}
      </div></R>}
    />
  );
};
export const Dalle2 = () => {
  const t = useSec();
  const sharp = prog(t, 2.5, 3.5);
  return (
    <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap: 40}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Eyebrow at={0.3}>2022 · SEE & HEAR</Eyebrow>
        <Title at={0.7}>更逼真的画面，更准确的聆听</Title>
      </div>
      <div style={{display: 'flex', gap: 30}}>
        <R at={1.4} style={{flex: 1}}><Card style={{padding: 26}}>
          <svg width={763} height={290} viewBox="0 0 763 290" style={{borderRadius: 14, display: 'block', filter: `blur(${(1 - sharp) * 14}px) saturate(${0.3 + 0.7 * sharp})`}}>
            <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B1446" /><stop offset="0.55" stopColor="#B04A7A" /><stop offset="1" stopColor="#F7A35C" /></linearGradient></defs>
            <rect width={763} height={290} fill="url(#sky)" />
            <circle cx={500} cy={170} r={46} fill="#FFD9A0" />
            <path d="M0 200 L120 120 L230 190 L360 100 L480 185 L600 130 L763 200 V290 H0 Z" fill="#2A1C4A" />
            <path d="M0 230 L160 170 L300 225 L450 165 L620 225 L763 190 V290 H0 Z" fill="#150F2E" />
            <rect y={250} width={763} height={40} fill="#3A2A5E" opacity={0.7} />
            <rect x={470} y={255} width={60} height={4} fill="#FFD9A0" opacity={0.7} /><rect x={480} y={268} width={40} height={3} fill="#FFD9A0" opacity={0.5} />
          </svg>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>2022.04 · DALL·E 2</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.white, marginTop: 8}}>更高清、更逼真的图像生成</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55}}>分辨率提升 4 倍，还能对图像局部进行编辑与扩展。</div>
        </Card></R>
        <R at={2.4} style={{flex: 1}}><Card style={{padding: 26}}>
          <div style={{width: 763, height: 290, borderRadius: 14, background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26}}>
            <svg width={680} height={130}>
              {Array.from({length: 68}).map((_, i) => { const h = 10 + 110 * Math.abs(Math.sin(i * 0.45 + t * 5) * Math.sin(i * 0.13 + t * 1.7)); return <rect key={i} x={i * 10} y={65 - h / 2} width={6} height={h} rx={3} fill={i % 9 === 0 ? C.mint : C.green2} opacity={0.85} />; })}
            </svg>
            <div style={{display: 'flex', gap: 14}}>
              {['你好，世界', 'Hello, world', 'Bonjour', 'こんにちは'].map((w, i) => <div key={w} style={{fontSize: 24, color: C.white, border: `1px solid ${C.line}`, borderRadius: 30, padding: '6px 18px', opacity: prog(t, 4 + i * 0.6, 0.6)}}>{w}</div>)}
            </div>
          </div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>2022.09 · Whisper</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.white, marginTop: 8}}>开源的通用语音识别</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55}}>基于 68 万小时多语种数据训练，支持近百种语言的转写与翻译。</div>
        </Card></R>
      </div>
    </AbsoluteFill>
  );
};
export const ChatGPT = () => {
  const t = useSec();
  return (
    <Split lw={720}
      left={<>
        <Eyebrow at={0.3}>2022.11.30</Eyebrow>
        <R at={0.7}><div data-qa="title" style={{fontSize: 124, fontWeight: 800, color: C.white, letterSpacing: -3, lineHeight: 1.05}}>ChatGPT</div></R>
        <R at={1.4}><div data-qa="title" style={{fontSize: 44, fontWeight: 600, color: C.white}}>一个聊天框，<G>改变了世界</G>。</div></R>
        <Body at={2.4}>它以“免费研究预览”的形式悄然上线。人们第一次可以用最自然的方式 —— <G>对话</G> —— 与 AI 一起思考和创造。</Body>
      </>}
      right={<R at={3.0}><div data-qa="window" style={{width: 800, height: 580, borderRadius: 22, background: 'rgba(33,33,40,0.95)', border: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <div style={{height: 64, display: 'flex', alignItems: 'center', padding: '0 26px', gap: 12, borderBottom: `1px solid ${C.line}`, fontSize: 26, fontWeight: 600, color: C.white}}>ChatGPT <span style={{fontSize: 20, color: C.dim, fontWeight: 400}}>Research Preview</span></div>
        <div style={{flex: 1, padding: 30, display: 'flex', flexDirection: 'column', gap: 26}}>
          <R at={4.2}><div style={{display: 'flex', justifyContent: 'flex-end'}}><div data-qa="bubble" style={{maxWidth: 560, background: '#3A3A46', borderRadius: 24, padding: '16px 24px', fontSize: 28, color: C.white, lineHeight: 1.5}}>给十岁的孩子解释一下，什么是黑洞？</div></div></R>
          <R at={5.4}><div style={{display: 'flex', gap: 18}}>
            <div style={{width: 46, height: 46, borderRadius: 23, background: C.green, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="spark" size={26} color="#fff" sw={3} /></div>
            <div data-qa="bubble" style={{fontSize: 28, color: C.text, lineHeight: 1.65, width: 640}}><Typed text="想象一个超级强大的“宇宙吸尘器”。黑洞的引力大到连光都跑不出来，所以它看起来是一片漆黑。它通常是巨大的恒星燃尽之后，坍缩形成的……" t0={5.8} cps={13} /></div>
          </div></R>
        </div>
        <div style={{margin: '0 26px 26px', height: 62, borderRadius: 31, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 26px', fontSize: 23, color: C.dim}}>给 ChatGPT 发送消息</div>
      </div></R>}
    />
  );
};
export const Growth = () => {
  const t = useSec();
  const rows: [string, number, string][] = [['ChatGPT', 2, '约 2 个月'], ['TikTok', 9, '约 9 个月'], ['Instagram', 30, '约 30 个月']];
  return (
    <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap: 44}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Eyebrow at={0.3}>2022.12 – 2023.01 · GROWTH</Eyebrow>
        <Title at={0.7}>史上增长最快的消费级应用之一</Title>
      </div>
      <div style={{display: 'flex', gap: 60, alignItems: 'stretch'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26, width: 520}}>
          <R at={1.6}><Card glow={C.green}><div style={{fontFamily: MONO, fontSize: 24, color: C.dim}}>上线 5 天</div><div style={{fontSize: 70, fontWeight: 800, color: C.white, marginTop: 4}}><Count to={100} t0={1.8} d={1.6} /> 万<span style={{fontSize: 30, color: C.text2, fontWeight: 500}}> 用户</span></div></Card></R>
          <R at={2.8}><Card glow={C.green}><div style={{fontFamily: MONO, fontSize: 24, color: C.dim}}>约 2 个月</div><div style={{fontSize: 70, fontWeight: 800, color: C.mint, marginTop: 4}}><Count to={1} t0={3.0} d={1.2} /> 亿<span style={{fontSize: 30, color: C.text2, fontWeight: 500}}> 月活跃用户</span></div></Card></R>
        </div>
        <R at={4.2} style={{flex: 1}}><Card style={{height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, padding: '30px 36px'}}>
          <div style={{fontSize: 28, fontWeight: 600, color: C.white}}>达到 1 亿用户所用的时间</div>
          {rows.map(([n, m, lab], i) => (
            <div key={n} style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 160, fontSize: 27, color: i === 0 ? C.white : C.text2, fontWeight: i === 0 ? 700 : 400}}>{n}</div>
              <div style={{width: 20 + 16 * m * prog(t, 5 + i * 0.6, 1.8), height: 34, borderRadius: 8, background: i === 0 ? C.green2 : C.faint}} />
              <div style={{fontFamily: MONO, fontSize: 24, color: i === 0 ? C.mint : C.dim, opacity: prog(t, 5.8 + i * 0.6, 0.6), whiteSpace: 'nowrap'}}>{lab}</div>
            </div>
          ))}
          <div style={{fontSize: 20, color: C.dim}}>数据：UBS / Similarweb 估算（2023 年 2 月）</div>
        </Card></R>
      </div>
    </AbsoluteFill>
  );
};
