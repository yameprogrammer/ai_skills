import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {C, MONO, R, Eyebrow, Title, Body, G, Split, Stack, Card, Window, Typed, Bloom, useSec, prog, lin, Count, useScene} from './lib';
import {Icon} from './icons';

const Header: React.FC<{eb: string; title: string}> = ({eb, title}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 18}}><Eyebrow at={0.3}>{eb}</Eyebrow><Title at={0.7}>{title}</Title></div>
);
const Page: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 44}) => (
  <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap}}>{children}</AbsoluteFill>
);

// ============ ACT IV
export const Gpt4 = () => {
  const t = useSec();
  const rows: [string, number, number][] = [['美国律师资格考试（UBE）', 10, 90], ['美国生物奥林匹克（USABO）', 31, 99], ['SAT 阅读与写作', 87, 93]];
  return (
    <Split lw={740}
      left={<>
        <Eyebrow at={0.3}>2023.03.14 · GPT-4</Eyebrow>
        <Title at={0.7}>在人类的专业考试中<br />名列前茅</Title>
        <Body at={1.3}>更强的推理、更可靠的回答、更长的上下文，并且首次具备<G>理解图像</G>的能力。</Body>
      </>}
      right={<R at={1.8}><Card style={{width: 800, padding: '30px 36px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 28, fontWeight: 600, color: C.white}}>考试成绩百分位</div>
          <div style={{display: 'flex', gap: 22, fontSize: 22, color: C.dim}}>
            <span><span style={{display: 'inline-block', width: 16, height: 16, borderRadius: 4, background: C.faint, marginRight: 8}} />GPT-3.5</span>
            <span><span style={{display: 'inline-block', width: 16, height: 16, borderRadius: 4, background: C.green2, marginRight: 8}} />GPT-4</span>
          </div>
        </div>
        {rows.map(([n, a, b], i) => {
          const p = prog(t, 2.8 + i * 1.1, 1.6);
          return (
            <div key={n} style={{marginTop: 30}}>
              <div style={{fontSize: 26, color: C.text, marginBottom: 12}}>{n}</div>
              {[[a, C.faint, C.dim], [b, C.green2, C.mint]].map(([v, col, tc]: any, k) => (
                <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, height: 34}}>
                  <div style={{width: 5.4 * v * p, height: 22, borderRadius: 6, background: col}} />
                  <div style={{fontFamily: MONO, fontSize: 23, color: tc, fontWeight: k ? 700 : 400}}>{Math.round(v * p)}</div>
                </div>
              ))}
            </div>
          );
        })}
      </Card></R>}
    />
  );
};
export const Vision = () => {
  const t = useSec(); const scan = (t * 0.5) % 1;
  const apps: [string, string][] = [['写作教练', 'pen'], ['数学导师', 'book'], ['旅行规划', 'compass'], ['代码审查', 'code'], ['健康助手', 'heart'], ['论文助手', 'doc']];
  return (
    <Page>
      <Header eb="2023 · VISION & GPTs" title="AI 学会了“看”，也学会了为你定制" />
      <div style={{display: 'flex', gap: 30}}>
        <R at={1.4} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}}>
          <div style={{position: 'relative', width: 763, height: 280, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(180deg,#2A2320,#3B2E26)'}}>
            <svg width={763} height={280} style={{position: 'absolute'}}>
              <rect x={0} y={190} width={763} height={90} fill="#5A4130" />
              <path d="M300 120 H400 L392 196 H308 Z" fill="#EDE6DA" /><path d="M400 138 C428 138 428 172 398 174" stroke="#EDE6DA" strokeWidth={9} fill="none" />
              <ellipse cx={350} cy={122} rx={48} ry={9} fill="#6B4226" />
              {[0, 1, 2].map((i) => <path key={i} d={`M${333 + i * 16} 110 C${325 + i * 16} 95 ${343 + i * 16} 88 ${335 + i * 16} 72`} stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none" />)}
              <circle cx={200} cy={200} r={18} fill="none" stroke="#C9B37A" strokeWidth={6} /><rect x={214} y={196} width={50} height={9} rx={3} fill="#C9B37A" /><rect x={250} y={196} width={6} height={18} fill="#C9B37A" />
              <rect x={0} y={scan * 280} width={763} height={3} fill={C.mint} opacity={0.8} />
              <rect x={290} y={62} width={150} height={144} fill="none" stroke={C.mint} strokeWidth={3} strokeDasharray="10 8" opacity={prog(t, 3, 0.5)} />
              <rect x={172} y={170} width={100} height={60} fill="none" stroke={C.mint} strokeWidth={3} strokeDasharray="10 8" opacity={prog(t, 3.6, 0.5)} />
            </svg>
          </div>
          <div data-qa="bubble" style={{marginTop: 18, fontSize: 26, color: C.white, background: C.green + '33', border: `1px solid ${C.green2}66`, borderRadius: 16, padding: '12px 20px', lineHeight: 1.5}}><Typed text="桌上有一杯热咖啡，钥匙就在杯子的左边。" t0={4.2} cps={9} /></div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 18}}>2023 · GPT-4 视觉 × Be My Eyes</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55}}>为视障人士描述周围的世界，读出标签、辨认物品。</div>
        </Card></R>
        <R at={2.6} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}}>
          <div style={{width: 763, height: 280 + 18 + 51, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18}}>
            {apps.map(([n, ic], i) => (
              <div key={n} style={{borderRadius: 16, background: C.cardHi, border: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: prog(t, 3.4 + i * 0.35, 0.5), transform: `scale(${0.85 + 0.15 * prog(t, 3.4 + i * 0.35, 0.5)})`}}>
                <div style={{width: 64, height: 64, borderRadius: 16, background: [C.green, C.blue, C.amber, C.violet, C.pink, '#0E8A8A'][i], display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name={ic} size={36} color="#fff" /></div>
                <div style={{fontSize: 24, color: C.text}}>{n}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 18}}>2023.11 · GPTs</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55}}>无需编程，人人都能用自然语言打造专属的 ChatGPT。</div>
        </Card></R>
      </div>
    </Page>
  );
};
export const Sora = () => {
  const t = useSec(); const pan = t * 6;
  return (
    <Split lw={700}
      left={<>
        <Eyebrow at={0.3}>2024.02 · Sora</Eyebrow>
        <Title at={0.7}>用文字，<br />生成世界</Title>
        <Body at={1.3}>输入一段描述，就能生成长达<G>一分钟</G>、细节丰富的视频。AI 开始学习理解并模拟运动中的物理世界。</Body>
      </>}
      right={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
        <R at={1.6}><div data-qa="chip" style={{fontSize: 26, color: C.white, background: C.cardHi, border: `1px solid ${C.line}`, borderRadius: 40, padding: '12px 28px', maxWidth: 820}}><Typed text="“一位女士走在东京街头，霓虹灯倒映在潮湿的路面上”" t0={2.0} cps={10} /></div></R>
        <R at={3.2}><div data-qa="card" style={{width: 820, height: 462, borderRadius: 20, overflow: 'hidden', position: 'relative', border: `1px solid ${C.line}`, boxShadow: `0 0 80px ${C.violet}33`}}>
          <svg width={820} height={462} viewBox="0 0 820 462" style={{position: 'absolute'}}>
            <defs>
              <linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070818" /><stop offset="1" stopColor="#23184A" /></linearGradient>
              <linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1530" /><stop offset="1" stopColor="#0A0A14" /></linearGradient>
            </defs>
            <rect width={820} height={462} fill="url(#nsky)" />
            <g transform={`translate(${-pan * 0.4},0)`}>{Array.from({length: 14}).map((_, i) => { const h = 120 + random('bh' + i) * 150; return <rect key={i} x={i * 70 - 20} y={300 - h} width={62} height={h} fill="#141230" />; })}</g>
            <g transform={`translate(${-pan},0)`}>
              {Array.from({length: 10}).map((_, i) => { const h = 160 + random('fh' + i) * 110; const x = i * 110 - 30; return (
                <g key={i}>
                  <rect x={x} y={300 - h} width={96} height={h} fill="#0D0B1F" />
                  {Array.from({length: 12}).map((__, k) => random('w' + i + k) > 0.55 && <rect key={k} x={x + 12 + (k % 3) * 26} y={300 - h + 16 + Math.floor(k / 3) * 30} width={14} height={16} fill="#F5C77A" opacity={0.6} />)}
                  {i % 3 === 1 && <rect x={x + 20} y={300 - h + 140} width={56} height={22} rx={4} fill={i % 2 ? C.pink : C.blue} opacity={0.75 + 0.25 * Math.sin(t * 6 + i)} style={{filter: 'blur(1px)'}} />}
                </g>); })}
            </g>
            <rect y={300} width={820} height={162} fill="url(#road)" />
            <g transform={`translate(${-pan},0) scale(1,-1) translate(0,-600)`} opacity={0.35} style={{filter: 'blur(3px)'}}>
              {Array.from({length: 10}).map((_, i) => i % 3 === 1 && <rect key={i} x={i * 110 - 10} y={300 - (160 + random('fh' + i) * 110) + 140} width={56} height={22} fill={i % 2 ? C.pink : C.blue} />)}
            </g>
            <g transform={`translate(${250 + t * 14},0)`}>
              <ellipse cx={0} cy={392} rx={26} ry={5} fill="#000" opacity={0.5} />
              <circle cx={0} cy={300} r={11} fill="#1A1020" /><path d={`M-14 314 H14 L18 360 H-18 Z`} fill="#3A0F1E" />
              <line x1={-7} y1={360} x2={-7 + 7 * Math.sin(t * 5)} y2={390} stroke="#1A1020" strokeWidth={7} /><line x1={7} y1={360} x2={7 - 7 * Math.sin(t * 5)} y2={390} stroke="#1A1020" strokeWidth={7} />
            </g>
          </svg>
          <div style={{position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontSize: 19, color: '#fff', opacity: 0.7}}>● REC  00:00:{String(Math.floor(t)).padStart(2, '0')}</div>
        </div></R>
      </div>}
    />
  );
};
export const Gpt4o = () => {
  const t = useSec();
  return (
    <Split lw={740}
      left={<>
        <Eyebrow at={0.3}>2024.05 · GPT-4o</Eyebrow>
        <Title at={0.7}>像人一样<br />实时交谈</Title>
        <Body at={1.3}>“o” 代表 <G>omni（全能）</G>：同一个模型同时听、看、说。语音响应最快仅 232 毫秒，平均约 320 毫秒，接近人类对话的节奏。</Body>
      </>}
      right={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
        <R at={1.6}><svg width={460} height={460} viewBox="-230 -230 460 460">
          <defs><radialGradient id="orb" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stopColor="#E9FFF7" /><stop offset="0.45" stopColor={C.mint} /><stop offset="1" stopColor={C.blue} /></radialGradient></defs>
          {Array.from({length: 90}).map((_, i) => {
            const a = i / 90 * Math.PI * 2; const talk = 0.5 + 0.5 * Math.sin(t * 1.6);
            const l = 14 + 46 * talk * Math.abs(Math.sin(i * 0.7 + t * 7) * Math.sin(i * 0.23 - t * 3));
            return <line key={i} x1={Math.cos(a) * 150} y1={Math.sin(a) * 150} x2={Math.cos(a) * (150 + l)} y2={Math.sin(a) * (150 + l)} stroke={i % 2 ? C.mint : C.blue} strokeWidth={4} strokeLinecap="round" opacity={0.85} />;
          })}
          <circle r={128 + 6 * Math.sin(t * 4)} fill="url(#orb)" />
        </svg></R>
        <div style={{display: 'flex', gap: 24}}>
          <R at={3.2}><Card style={{width: 300, textAlign: 'center', padding: '20px 24px'}} glow={C.green}><div style={{fontFamily: MONO, fontSize: 56, fontWeight: 800, color: C.white}}><Count to={232} t0={3.2} d={1.2} /> ms</div><div style={{fontSize: 23, color: C.text2, marginTop: 4}}>最快语音响应</div></Card></R>
          <R at={4.0}><Card style={{width: 300, textAlign: 'center', padding: '20px 24px'}}><div style={{fontSize: 44, fontWeight: 800, color: C.mint, lineHeight: '68px'}}>文 · 声 · 图</div><div style={{fontSize: 23, color: C.text2, marginTop: 4}}>端到端统一模型</div></Card></R>
        </div>
      </div>}
    />
  );
};
export const O1 = () => {
  const t = useSec();
  const steps = ['拆解题目：把问题分成三种情况', '尝试方法：先用代数推导第一种情况', '自我检查：发现第二种情况漏掉了边界', '修正思路，得出正确答案'];
  return (
    <Split lw={700}
      left={<>
        <Eyebrow at={0.3}>2024.09 · OpenAI o1</Eyebrow>
        <Title at={0.7}>先思考，<br />再回答</Title>
        <Body at={1.3}>通过强化学习掌握<G>“思维链”推理</G>：拆解问题、尝试不同方法、发现并纠正自己的错误。一种全新的扩展范式由此开启。</Body>
      </>}
      right={<div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
        <R at={1.6}><Window w={820} title={t < 7.6 ? '正在思考' + '...'.slice(0, 1 + Math.floor(t * 2) % 3) : '已思考 38 秒'}>
          {steps.map((s, i) => {
            const on = prog(t, 2.2 + i * 1.4, 0.6); const last = i === 3;
            return (
              <div key={i} data-qa="row" style={{display: 'flex', alignItems: 'center', gap: 18, height: 56, opacity: on}}>
                <div style={{width: 34, height: 34, borderRadius: 17, border: `2px solid ${last ? C.green2 : C.dim}`, background: last ? C.green2 : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{last ? <Icon name="check" size={22} color="#fff" sw={5} /> : <span style={{fontFamily: MONO, fontSize: 18, color: C.dim}}>{i + 1}</span>}</div>
                <div style={{fontSize: 27, color: last ? C.white : i === 2 ? C.amber : C.text2, fontWeight: last ? 700 : 400}}>{s}</div>
              </div>
            );
          })}
        </Window></R>
        <R at={8.2}><Card style={{width: 820, padding: '24px 30px'}} glow={C.green}>
          <div style={{fontSize: 26, fontWeight: 600, color: C.white, marginBottom: 16}}>AIME 美国数学邀请赛 · 正确率</div>
          {[['GPT-4o', 12, C.faint, C.dim], ['o1', 83, C.green2, C.mint]].map(([n, v, col, tc]: any, i) => (
            <div key={n} style={{display: 'flex', alignItems: 'center', gap: 16, height: 44}}>
              <div style={{width: 100, fontFamily: MONO, fontSize: 24, color: tc}}>{n}</div>
              <div style={{width: 5.6 * v * prog(t, 8.8 + i * 0.5, 1.6), height: 24, borderRadius: 6, background: col}} />
              <div style={{fontFamily: MONO, fontSize: 25, fontWeight: 700, color: tc}}>{Math.round(v * prog(t, 8.8 + i * 0.5, 1.6))}%</div>
            </div>
          ))}
        </Card></R>
      </div>}
    />
  );
};

// ============ ACT V
const AgentCard: React.FC<{at: number; date: string; title: string; desc: string; children: React.ReactNode}> = ({at, date, title, desc, children}) => (
  <R at={at} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}}>
    <div style={{height: 230, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.line}`, position: 'relative', overflow: 'hidden'}}>{children}</div>
    <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 24}}>{date}</div>
    <div style={{fontSize: 36, fontWeight: 700, color: C.white, marginTop: 8}}>{title}</div>
    <div style={{fontSize: 25, color: C.text2, marginTop: 10, lineHeight: 1.6}}>{desc}</div>
  </Card></R>
);
export const Agents = () => {
  const t = useSec();
  const cur = [[120, 40], [250, 74], [250, 122], [418, 198]]; const ci = Math.min(3, Math.floor(Math.max(0, t - 3) / 1.3)); const cp = prog(t, 3 + ci * 1.3, 0.8);
  const prev = cur[Math.max(0, ci - 1)]; const cx = prev[0] + (cur[ci][0] - prev[0]) * cp, cy = prev[1] + (cur[ci][1] - prev[1]) * cp;
  const todo = ['搜索航班', '比较价格', '生成行程表', '发送确认邮件'];
  return (
    <Page gap={40}>
      <Header eb="2025 · AGENTS" title="AI 开始替你完成工作" />
      <div style={{display: 'flex', gap: 34}}>
        <AgentCard at={1.4} date="2025.01 · Operator" title="会用浏览器的 AI" desc="像人一样浏览、点击、填写表单，替你完成网上的各种任务。">
          <div style={{height: 36, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 14px', fontFamily: MONO, fontSize: 17, color: C.dim}}>booking.example.com</div>
          <div style={{position: 'absolute', left: 30, top: 60, width: 250, height: 36, borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 19, color: C.text, padding: '6px 12px', boxSizing: 'border-box'}}>{t > 4.2 ? '上海 → 东京' : ''}</div>
          <div style={{position: 'absolute', left: 30, top: 108, width: 250, height: 36, borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 19, color: C.text, padding: '6px 12px', boxSizing: 'border-box'}}>{t > 5.5 ? '10 月 1 日' : ''}</div>
          <div style={{position: 'absolute', left: 300, top: 160, width: 130, height: 44, borderRadius: 10, background: t > 7 ? C.green2 : C.green, fontSize: 21, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 7 ? '✓ 已预订' : '预订'}</div>
          <div style={{position: 'absolute', left: cx, top: cy}}><Icon name="cursor" size={34} color="#fff" sw={2.5} /></div>
        </AgentCard>
        <AgentCard at={2.6} date="2025.02 · Deep Research" title="深度研究" desc="自主搜索并研读海量资料，数十分钟写出附有引用的深度报告。">
          {Array.from({length: 7}).map((_, i) => { const p = ((t * 0.6 + i / 7) % 1); return <div key={i} style={{position: 'absolute', left: 40 + p * 300, top: 30 + Math.sin(i * 2) * 25 + p * 20, width: 70, height: 90, borderRadius: 8, background: '#fff', opacity: 0.12 + 0.3 * Math.sin(p * Math.PI), transform: `rotate(${(i - 3) * 8}deg)`}} />; })}
          <div style={{position: 'absolute', right: 30, top: 50, width: 110, height: 140, borderRadius: 10, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="doc" size={60} color="#fff" /></div>
          <div style={{position: 'absolute', left: 24, bottom: 16, fontFamily: MONO, fontSize: 19, color: C.mint}}>已阅读 <Count to={142} t0={3} d={8} /> 个来源</div>
        </AgentCard>
        <AgentCard at={3.8} date="2025.07 · ChatGPT Agent" title="端到端的执行者" desc="拥有自己的虚拟电脑，从调研到执行，一步步完成复杂任务。">
          <div style={{padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 14}}>
            {todo.map((s, i) => { const done = t > 5 + i * 1.5; const active = !done && t > 3.8 + i * 1.5; return (
              <div key={s} style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 23, color: done ? C.white : C.dim}}>
                <div style={{width: 26, height: 26, borderRadius: 13, background: done ? C.green2 : 'transparent', border: `2px solid ${done ? C.green2 : active ? C.mint : C.faint}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{done && <Icon name="check" size={16} color="#fff" sw={6} />}</div>{s}
              </div>); })}
          </div>
        </AgentCard>
      </div>
    </Page>
  );
};
export const CodexAgent = () => {
  const t = useSec();
  const tasks = ['修复登录页面的空指针异常', '为支付模块补充单元测试', '重构数据导出接口', '升级依赖并通过全部测试', '撰写 API 使用文档'];
  return (
    <Split lw={700}
      left={<>
        <Eyebrow at={0.3}>2025.05 · Codex</Eyebrow>
        <Title at={0.7}>云端的<br />软件工程智能体</Title>
        <Body at={1.3}>在云端<G>并行处理</G>多项任务：修复缺陷、开发功能、运行测试、提交代码审查。一位工程师，也能指挥一支 AI 团队。</Body>
      </>}
      right={<R at={1.6}><Window w={840} title="Codex · 任务">
        {tasks.map((s, i) => {
          const done = t > 3.6 + i * 0.9; const sp = (t * 360 + i * 60) % 360;
          return (
            <div key={s} data-qa="row" style={{display: 'flex', alignItems: 'center', gap: 18, height: 74, borderBottom: i < 4 ? `1px solid ${C.line}` : undefined, opacity: prog(t, 1.9 + i * 0.25, 0.5)}}>
              {done ? <div style={{width: 34, height: 34, borderRadius: 17, background: C.green2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Icon name="check" size={20} color="#fff" sw={6} /></div>
                : <svg width={34} height={34} style={{flexShrink: 0}}><circle cx={17} cy={17} r={13} stroke={C.faint} strokeWidth={4} fill="none" /><circle cx={17} cy={17} r={13} stroke={C.mint} strokeWidth={4} fill="none" strokeDasharray="20 62" transform={`rotate(${sp} 17 17)`} /></svg>}
              <div style={{flex: 1, fontSize: 27, color: done ? C.white : C.text2}}>{s}</div>
              <div style={{fontFamily: MONO, fontSize: 20, color: done ? C.mint : C.dim, width: 150, textAlign: 'right'}}>{done ? `PR #${214 + i * 3}` : '运行中'}</div>
            </div>
          );
        })}
      </Window></R>}
    />
  );
};
export const Images = () => {
  const t = useSec();
  const grads = [[C.pink, C.amber], [C.blue, C.violet], [C.green, C.mint], [C.amber, '#FF5F57'], [C.violet, C.pink], ['#0E8A8A', C.blue], [C.mint, C.blue], ['#FF5F57', C.violet], [C.green2, C.amber]];
  return (
    <Page>
      <Header eb="2025 · CREATE & OPEN" title="创造力与开放，同时释放" />
      <div style={{display: 'flex', gap: 30}}>
        <R at={1.4} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}}>
          <div style={{width: 763, height: 300, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 10}}>
            {Array.from({length: 27}).map((_, i) => { const g = grads[i % 9]; const p = prog(t, 2 + random('im' + i) * 4, 0.5); return (
              <div key={i} style={{borderRadius: 10, background: `linear-gradient(${random('a' + i) * 360}deg, ${g[0]}, ${g[1]})`, opacity: p, transform: `scale(${0.6 + 0.4 * p})`}} />); })}
          </div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>2025.03 · GPT-4o 图像生成</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.white, marginTop: 8}}>人人都是视觉创作者</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55}}>精准渲染文字、理解复杂指令。上线首周，全球用户就创作了超过 <G>7 亿张</G>图片。</div>
        </Card></R>
        <R at={2.6} style={{flex: 1, display: 'flex'}}><Card style={{padding: 26, flex: 1}}>
          <div style={{width: 763, height: 300, borderRadius: 14, background: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden'}}>
            <svg width={763} height={300} style={{position: 'absolute'}}>
              {Array.from({length: 24 * 9}).map((_, i) => { const x = i % 24, y = Math.floor(i / 24); const v = 0.5 + 0.5 * Math.sin(x * 0.7 + y * 1.3 + t * 3 + random('w' + i) * 6); return <rect key={i} x={30 + x * 20} y={30 + y * 27} width={14} height={20} rx={3} fill={C.green2} opacity={0.08 + 0.5 * v} />; })}
            </svg>
            <div style={{position: 'absolute', right: 34, top: 60, width: 170, height: 170, borderRadius: 85, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 50px ${C.green}`, transform: `translateY(${Math.sin(t * 3) * 6}px)`}}><Icon name="download" size={84} color="#fff" sw={4} /></div>
          </div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>2025.08 · gpt-oss</div>
          <div style={{fontSize: 34, fontWeight: 700, color: C.white, marginTop: 8}}>开放权重，回馈社区</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 8, lineHeight: 1.55}}>以 Apache 2.0 许可发布开放权重推理模型，任何人都能下载、本地运行并自由改进。</div>
        </Card></R>
      </div>
    </Page>
  );
};
export const Gpt5 = () => {
  const t = useSec();
  const chips = ['编程能力大幅跃升', '写作更有表现力', '健康问答更可靠', '幻觉显著减少'];
  return (
    <Stack gap={0}>
      <Eyebrow at={0.3}>2025.08.07</Eyebrow>
      <R at={0.8} style={{marginTop: 16}}><div data-qa="title" style={{fontSize: 230, fontWeight: 800, letterSpacing: -6, lineHeight: 1.1, background: `linear-gradient(100deg, #FFFFFF 20%, ${C.mint} 60%, ${C.blue})`, WebkitBackgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 ${30 + 20 * Math.sin(t * 4)}px ${C.green}88)`}}>GPT-5</div></R>
      <R at={1.8} style={{marginTop: 10}}><div data-qa="title" style={{fontSize: 48, fontWeight: 700, color: C.white}}>迄今最聪明、最快、最有用的模型</div></R>
      <R at={2.8} style={{marginTop: 22}}><div data-qa="body" style={{fontSize: 30, color: C.text2}}>一个统一的系统：简单问题即时回答，复杂问题<G>自动深入思考</G>。</div></R>
      <div style={{display: 'flex', gap: 20, marginTop: 48}}>
        {chips.map((c, i) => <R key={c} at={4.4 + i * 0.6}><div data-qa="chip" style={{fontSize: 26, color: C.white, border: `1px solid ${C.green2}88`, background: C.green + '22', borderRadius: 40, padding: '12px 28px', whiteSpace: 'nowrap'}}>{c}</div></R>)}
      </div>
    </Stack>
  );
};
export const Science = () => (
  <Page gap={40}>
    <Header eb="2025 · FRONTIER" title="AI 开始攻克人类最难的智力挑战" />
    <div style={{display: 'flex', gap: 34}}>
      {[
        {at: 1.6, big: '35/42', date: '2025.07 · IMO', title: '国际数学奥林匹克金牌水平', desc: '实验性推理模型在与人类选手相同的考试条件下，写出完整证明。'},
        {at: 3.0, big: '12/12', date: '2025.09 · ICPC', title: '编程竞赛世界总决赛全部解出', desc: 'OpenAI 的推理系统解出全部 12 道题，表现超过所有人类参赛队伍。'},
        {at: 4.4, big: '科研伙伴', date: '2025.09 · OpenAI for Science', title: '加速科学发现', desc: '组建专门团队，打造加速科学发现的 AI 平台，与研究者并肩探索前沿。'},
      ].map((c, i) => (
        <R key={i} at={c.at} style={{flex: 1, display: 'flex'}}><Card style={{padding: '34px 32px', flex: 1}} glow={i < 2 ? C.green : C.blue}>
          <div style={{fontSize: i < 2 ? 100 : 80, fontWeight: 800, lineHeight: '120px', color: i < 2 ? C.white : C.mint, fontFamily: i < 2 ? MONO : undefined, letterSpacing: i < 2 ? -3 : 2}}>{c.big}</div>
          <div style={{fontFamily: MONO, fontSize: 23, color: C.green2, marginTop: 22}}>{c.date}</div>
          <div style={{fontSize: 32, fontWeight: 700, color: C.white, marginTop: 10}}>{c.title}</div>
          <div style={{fontSize: 25, color: C.text2, marginTop: 12, lineHeight: 1.6}}>{c.desc}</div>
        </Card></R>
      ))}
    </div>
  </Page>
);
export const Reach = () => {
  const t = useSec();
  const pts = [];
  const Npts = 520; const rot = t * 0.25;
  for (let i = 0; i < Npts; i++) {
    const y = 1 - (i / (Npts - 1)) * 2; const r = Math.sqrt(1 - y * y); const th = i * 2.39996 + rot;
    const x = Math.cos(th) * r, z = Math.sin(th) * r; if (z < -0.1) continue;
    const lit = random('lit' + i) < prog(t, 1.5, 9);
    pts.push(<circle key={i} cx={x * 250} cy={y * 250} r={2 + 2.2 * (z + 1) / 2} fill={lit ? C.mint : '#fff'} opacity={lit ? 0.5 + 0.5 * z : 0.12 + 0.2 * z} />);
  }
  return (
    <Split lw={780}
      left={<>
        <Eyebrow at={0.3}>2026.02 · REACH</Eyebrow>
        <R at={0.8}><div data-qa="title" style={{fontSize: 150, fontWeight: 800, color: C.white, lineHeight: 1.25, letterSpacing: -3}}><Count to={9} t0={1.0} d={3} fmt={(v) => (v > 8.95 ? '9' : v.toFixed(1))} /> 亿<span style={{color: C.mint}}>+</span></div></R>
        <Body at={1.6} size={32}>每周使用 ChatGPT 的人数。从上线到接近十亿人级别的普及，只用了<G>三年多</G>。</Body>
        <R at={4.4}><Card glow={C.blue} style={{marginTop: 10}}>
          <div style={{fontFamily: MONO, fontSize: 24, color: C.green2}}>2025.01 起 · Stargate</div>
          <div style={{fontSize: 27, color: C.text, lineHeight: 1.6, marginTop: 10}}>与合作伙伴共同建设超大规模 AI 算力基础设施，为下一代智能打下地基。</div>
        </Card></R>
      </>}
      right={<R at={1.0}><svg width={600} height={600} viewBox="-300 -300 600 600">
        <circle r={262} fill={C.green} opacity={0.06} />{pts}
      </svg></R>}
    />
  );
};

// ============ FINALE
export const Impact = () => {
  const tiles: [string, string, string][] = [
    ['book', '教育', '为每一位学习者\n配一位耐心的私人导师'],
    ['heart', '医疗', '帮助人们读懂健康信息\n为医生减轻文书负担'],
    ['flask', '科研', '加速文献梳理\n实验设计与数学推理'],
    ['code', '编程', '让每一位开发者的\n生产力成倍提升'],
    ['pen', '创作', '写作、图像、视频\n人人都能成为创作者'],
    ['eye', '无障碍', '为视障者描述世界\n为听障者转写声音'],
    ['lang', '语言', '跨越语言的边界\n让交流不再有隔阂'],
    ['briefcase', '商业', '从初创团队到跨国企业\n重塑工作的方式'],
  ];
  const cols = [C.green2, C.pink, C.blue, C.mint, C.amber, C.violet, '#4FD1E8', C.green2];
  return (
    <Page gap={40}>
      <Header eb="IMPACT" title="它正在改变每一个领域" />
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26}}>
        {tiles.map(([ic, n, d], i) => (
          <R key={n} at={1.4 + i * 1.1} y={30}><Card style={{height: 296, boxSizing: 'border-box', padding: '28px 28px'}} glow={cols[i]}>
            <div style={{width: 64, height: 64, borderRadius: 16, background: cols[i] + '26', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name={ic} size={38} color={cols[i]} /></div>
            <div style={{fontSize: 36, fontWeight: 700, color: C.white, marginTop: 18}}>{n}</div>
            <div style={{fontSize: 24, color: C.text2, marginTop: 10, lineHeight: 1.55, whiteSpace: 'pre-line'}}>{d}</div>
          </Card></R>
        ))}
      </div>
    </Page>
  );
};
export const Recap = () => {
  const t = useSec();
  const ms: [string, string[]][] = [['2015', ['OpenAI 成立']], ['2016', ['OpenAI Gym']], ['2018', ['GPT']], ['2019', ['GPT-2', 'OpenAI Five']], ['2020', ['GPT-3', 'API']], ['2021', ['DALL·E', 'Codex']], ['2022', ['ChatGPT']], ['2023', ['GPT-4']], ['2024', ['GPT-4o · o1', 'Sora']], ['2025', ['GPT-5', '智能体']], ['2026', ['GPT-6', '数学突破']]];
  const k = 3.0; const NM = 10; const X = (i: number) => 40 + i * 141; const Y = (i: number) => 540 - 450 * (Math.exp(k * i / NM) - 1) / (Math.exp(k) - 1);
  const path = Array.from({length: 101}).map((_, j) => { const i = j / 10; return `${j ? 'L' : 'M'}${X(i)},${Y(i)}`; }).join(' ');
  const draw = prog(t, 1.2, 9.5);
  return (
    <AbsoluteFill style={{padding: '90px 130px 130px 130px', flexDirection: 'column', justifyContent: 'center', gap: 20}}>
      <Header eb="2015 → 2026" title="从 2015 到 2026，一条指数曲线" />
      <div style={{position: 'relative', width: 1660, height: 640}}>
        <svg width={1660} height={640} style={{position: 'absolute', overflow: 'visible'}}>
          <defs><linearGradient id="cv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.green} /><stop offset="0.6" stopColor={C.mint} /><stop offset="1" stopColor={C.blue} /></linearGradient></defs>
          <path d={path} stroke="url(#cv)" strokeWidth={6} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} style={{filter: `drop-shadow(0 0 12px ${C.mint}88)`}} />
          {ms.map((_, i) => { const on = draw * NM >= i - 0.05 ? 1 : 0; return <circle key={i} cx={X(i)} cy={Y(i)} r={9} fill={i === NM ? C.white : C.mint} opacity={on} style={{filter: `drop-shadow(0 0 8px ${C.mint})`}} />; })}
        </svg>
        {ms.map(([y, n], i) => {
          const on = prog(t, 1.2 + (i / NM) * 9.5 * 0.92, 0.6);
          return (
            <div key={y} data-qa="label" style={{position: 'absolute', left: X(i) + 14, top: Y(i) + 16, width: 130, opacity: on}}>
              <div style={{fontFamily: MONO, fontSize: 26, color: i === NM ? C.white : C.mint, fontWeight: 700}}>{y}</div>
              {n.map((l) => <div key={l} style={{fontSize: 21, color: C.text, lineHeight: 1.4, whiteSpace: 'nowrap'}}>{l}</div>)}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export const Manifesto = () => (
  <Stack gap={44}>
    <R at={0.8}><div data-qa="title" style={{fontSize: 60, fontWeight: 600, color: C.text2}}>2015 年，这还只是一个大胆的想法。</div></R>
    <R at={4.2}><div data-qa="title" style={{fontSize: 60, fontWeight: 600, color: C.white}}>今天，它每周帮助超过 9 亿人学习、创造与探索。</div></R>
    <R at={8.2} y={40}><div data-qa="title" style={{fontSize: 110, fontWeight: 800, marginTop: 20, background: `linear-gradient(90deg, #FFFFFF, ${C.mint}, ${C.blue})`, WebkitBackgroundClip: 'text', color: 'transparent', letterSpacing: 6}}>而这，才刚刚开始。</div></R>
  </Stack>
);
export const End = () => {
  const t = useSec(); const {dur} = useScene();
  const out = 1 - lin(t, dur - 3.0, 2.7);
  return (
    <AbsoluteFill style={{opacity: out}}>
      <Stack gap={0}>
        <Bloom size={180} t={t} t0={0.1} />
        <R at={0.9} style={{marginTop: 40}}><div data-qa="title" style={{fontSize: 140, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, color: C.white}}>OpenAI</div></R>
        <R at={1.8} style={{marginTop: 30}}><div data-qa="body" style={{fontSize: 44, color: C.text, fontWeight: 500, letterSpacing: 2}}>确保通用人工智能造福全人类</div></R>
        <R at={2.4} style={{marginTop: 14}}><div data-qa="body" style={{fontSize: 26, color: C.dim}}>Ensure that artificial general intelligence benefits all of humanity</div></R>
        <R at={4.2} style={{marginTop: 60}}><div data-qa="eyebrow" style={{fontSize: 36, color: C.mint, fontWeight: 600, letterSpacing: 8}}>最好的，还在前方。</div></R>
      </Stack>
    </AbsoluteFill>
  );
};
