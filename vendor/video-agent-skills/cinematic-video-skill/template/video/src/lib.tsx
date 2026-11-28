import React, {createContext, useContext, useEffect} from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame, delayRender, continueRender} from 'remotion';
import timeline from './timeline.json';

export const FPS = 30;
export const W = 1920, H_ = 1080;
export const C = {
  bg: '#050507', white: '#FFFFFF', text: '#ECECF1', text2: '#B4B4C6', dim: '#8E8EA0', faint: '#3B3B48',
  green: '#10A37F', green2: '#19C37D', mint: '#74F2C6', blue: '#5B8CFF', violet: '#A67CFF', amber: '#F5B45B', pink: '#FF7AB8',
  card: 'rgba(255,255,255,0.045)', cardHi: 'rgba(255,255,255,0.075)', line: 'rgba(255,255,255,0.12)',
};
export const FONT = "'Inter','NotoSC',sans-serif";
export const MONO = "'JBMono','NotoSC',monospace";
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const prog = (t: number, a: number, d = 0.9) => interpolate(t, [a, a + d], [0, 1], {...clamp, easing: ease});
export const lin = (t: number, a: number, d: number) => interpolate(t, [a, a + d], [0, 1], clamp);

// ---------- scene timing
export type SceneDef = {id: string; dur: number; level: number; card?: boolean; hud?: boolean; year?: number; impact?: boolean; start: number};
export const SCENES: SceneDef[] = (() => {let t = 0; return timeline.scenes.map((s: any) => {const o = {...s, start: t}; t += s.dur; return o;});})();
export const TOTAL = SCENES.reduce((a, s) => a + s.dur, 0);
const SceneCtx = createContext({dur: 10, start: 0, level: 0});
export const useScene = () => useContext(SceneCtx);
export const useSec = () => useCurrentFrame() / FPS;
export const useGlobalFrame = () => useCurrentFrame() + useScene().start * FPS;

export const Scene: React.FC<{def: SceneDef; children: React.ReactNode}> = ({def, children}) => {
  const t = useSec();
  const fin = prog(t, 0, 0.7);
  const fout = 1 - interpolate(t, [def.dur - 0.75, def.dur - 0.05], [0, 1], clamp);
  const push = interpolate(t, [0, def.dur], [1.0, 1.03]);
  return (
    <SceneCtx.Provider value={{dur: def.dur, start: def.start, level: def.level}}>
      <AbsoluteFill style={{opacity: Math.min(fin, fout), transform: `scale(${push})`, fontFamily: FONT, color: C.text}}>
        {children}
      </AbsoluteFill>
    </SceneCtx.Provider>
  );
};

// ---------- reveal primitive
export const R: React.FC<{at?: number; d?: number; y?: number; x?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({at = 0, d = 0.9, y = 26, x = 0, style, children}) => {
  const t = useSec(); const p = prog(t, at, d);
  return <div style={{opacity: p, transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px)`, filter: p < 0.999 ? `blur(${(1 - p) * 6}px)` : undefined, ...style}}>{children}</div>;
};

// ---------- text atoms (all carry data-qa for the layout probe)
export const Eyebrow: React.FC<{at?: number; children: React.ReactNode; color?: string}> = ({at = 0, children, color = C.green2}) => (
  <R at={at}><div data-qa="eyebrow" style={{fontFamily: MONO, fontSize: 26, letterSpacing: 3, color, fontWeight: 500, whiteSpace: 'nowrap'}}>{children}</div></R>
);
export const Title: React.FC<{at?: number; size?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at = 0, size = 68, children, style}) => (
  <R at={at}><div data-qa="title" style={{fontSize: size, fontWeight: 700, lineHeight: 1.22, color: C.white, letterSpacing: -0.5, ...style}}>{children}</div></R>
);
export const Body: React.FC<{at?: number; size?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at = 0, size = 31, children, style}) => (
  <R at={at}><div data-qa="body" style={{fontSize: size, lineHeight: 1.7, color: C.text2, fontWeight: 400, ...style}}>{children}</div></R>
);
export const G: React.FC<{children: React.ReactNode; c?: string}> = ({children, c = C.green2}) => <span style={{color: c, fontWeight: 600, whiteSpace: 'nowrap'}}>{children}</span>;

// Standard split layout: text column left, visual right. All content lives in the safe box.
export const SAFE = {left: 130, right: 130, top: 90, bottom: 130};
export const Split: React.FC<{left: React.ReactNode; right: React.ReactNode; lw?: number; gap?: number}> = ({left, right, lw = 760, gap = 90}) => (
  <AbsoluteFill style={{padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom}px ${SAFE.left}px`, flexDirection: 'row', alignItems: 'center', gap}}>
    <div style={{width: lw, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 26}}>{left}</div>
    <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>{right}</div>
  </AbsoluteFill>
);
export const Stack: React.FC<{children: React.ReactNode; gap?: number; align?: any; style?: React.CSSProperties}> = ({children, gap = 28, align = 'center', style}) => (
  <AbsoluteFill style={{padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom}px ${SAFE.left}px`, flexDirection: 'column', alignItems: align, justifyContent: 'center', gap, ...style}}>{children}</AbsoluteFill>
);
export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties; glow?: string; qa?: string}> = ({children, style, glow, qa = 'card'}) => (
  <div data-qa={qa} style={{background: C.card, border: `1px solid ${C.line}`, borderRadius: 22, padding: '26px 30px', boxShadow: glow ? `0 0 60px ${glow}33, inset 0 0 0 1px ${glow}55` : undefined, overflow: 'hidden', ...style}}>{children}</div>
);
export const Window: React.FC<{title?: string; children: React.ReactNode; w: number; style?: React.CSSProperties}> = ({title, children, w, style}) => (
  <div data-qa="window" style={{width: w, background: 'rgba(20,20,26,0.92)', border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6)', ...style}}>
    <div style={{height: 46, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px', borderBottom: `1px solid ${C.line}`}}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 13, height: 13, borderRadius: 7, background: c, opacity: 0.8}} />)}
      {title && <div style={{marginLeft: 12, fontFamily: MONO, fontSize: 20, color: C.dim}}>{title}</div>}
    </div>
    <div style={{padding: 28}}>{children}</div>
  </div>
);
// typewriter that never reflows: untyped remainder is laid out but invisible
export const Typed: React.FC<{text: string; t0: number; cps?: number; cursor?: boolean; style?: React.CSSProperties; cursorColor?: string}> = ({text, t0, cps = 14, cursor = true, style, cursorColor = C.green2}) => {
  const t = useSec(); const chars = Array.from(text);
  const n = Math.max(0, Math.min(chars.length, Math.floor((t - t0) * cps)));
  const typing = t >= t0 - 0.6 && (n < chars.length || Math.floor(t * 2) % 2 === 0);
  return (
    <span style={style}>
      <span>{chars.slice(0, n).join('')}</span>
      <span style={{position: 'relative', display: 'inline-block', width: 0, height: '1em', verticalAlign: '-0.14em'}}>
        {cursor && typing && <span style={{position: 'absolute', left: 3, top: 0, width: '0.07em', minWidth: 3, height: '1.05em', background: cursorColor}} />}
      </span>
      <span style={{opacity: 0}}>{chars.slice(n).join('')}</span>
    </span>
  );
};
export const Count: React.FC<{to: number; t0: number; d?: number; fmt?: (v: number) => string}> = ({to, t0, d = 2, fmt}) => {
  const t = useSec(); const v = to * prog(t, t0, d);
  return <>{fmt ? fmt(v) : Math.round(v).toLocaleString('en-US')}</>;
};

// Abstract bloom emblem (original motif, not a trademark reproduction)
export const Bloom: React.FC<{size: number; t: number; t0?: number; color?: string}> = ({size, t, t0 = 0, color = C.white}) => {
  const p = prog(t, t0, 2.4); const rot = t * 6;
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{overflow: 'visible'}}>
      <g transform={`rotate(${rot})`}>
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <ellipse key={a} cx={0} cy={-38} rx={24} ry={52} transform={`rotate(${a})`} fill="none" stroke={color} strokeWidth={7}
            strokeDasharray={260} strokeDashoffset={260 * (1 - prog(t, t0 + i * 0.18, 1.6))} opacity={0.35 + 0.65 * p} />
        ))}
      </g>
      <circle r={10 * p} fill={C.green2} opacity={p} />
    </svg>
  );
};

// ---------- global backdrop (continuous across cuts, reacts to the beat once drums enter)
const levelAt = (sec: number) => {
  const s = SCENES.find((d) => sec >= d.start && sec < d.start + d.dur) || SCENES[SCENES.length - 1];
  return s;
};
export const Backdrop: React.FC = () => {
  const f = useCurrentFrame(); const sec = f / FPS;
  // smoothed level
  let lv = 0; const K = 5;
  for (let i = 0; i < K; i++) lv += levelAt(Math.max(0, sec - i * 0.3)).level / K;
  const s = levelAt(sec);
  const drums = s.level >= 2 && !s.card && s.level < 8;
  const beatF = f % 15; const pulse = drums ? Math.exp(-beatF / 4) : 0;
  const endFade = s.id === 'end' ? 1 - lin(sec, s.start + s.dur - 3, 3) : 1;
  const glowA = (0.10 + lv * 0.035 + pulse * 0.06) * endFade;
  const hue2 = lv >= 4 ? C.blue : C.green; const hue3 = lv >= 5 ? C.violet : '#0E6E5A';
  const n = Math.floor(40 + lv * 22);
  const pts = [];
  for (let i = 0; i < 180 && i < n; i++) {
    const x = random('x' + i) * W; const sp = 8 + random('s' + i) * 30 * (1 + lv * 0.5);
    const y = ((random('y' + i) * (H_ + 40) - sec * sp) % (H_ + 40) + H_ + 40) % (H_ + 40) - 20;
    const r = 0.8 + random('r' + i) * 1.8; const tw = 0.15 + 0.35 * random('o' + i);
    pts.push(<circle key={i} cx={x} cy={y} r={r} fill={i % 7 === 0 ? C.mint : '#fff'} opacity={tw * endFade} />);
  }
  const gx = Math.sin(sec * 0.07) * 180, gy = Math.cos(sec * 0.05) * 90;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill style={{opacity: glowA * 2.2, background: `radial-gradient(ellipse 60% 55% at ${30 + gx / 40}% ${35 + gy / 30}%, ${C.green}66, transparent 70%)`}} />
      <AbsoluteFill style={{opacity: glowA * 1.8, background: `radial-gradient(ellipse 55% 50% at ${75 - gx / 50}% ${70 - gy / 40}%, ${hue2}55, transparent 70%)`}} />
      <AbsoluteFill style={{opacity: glowA * 1.4, background: `radial-gradient(ellipse 40% 40% at 60% 20%, ${hue3}55, transparent 70%)`}} />
      {lv >= 2.5 && (
        <svg width={W} height={H_} style={{position: 'absolute', opacity: Math.min(1, (lv - 2.5)) * 0.5 * endFade}}>
          {Array.from({length: 14}).map((_, i) => {
            const z = ((i + (sec * (0.35 + lv * 0.08)) % 1) / 14); const yy = 700 + Math.pow(z, 2.2) * 420;
            return <line key={i} x1={0} x2={W} y1={yy} y2={yy} stroke={C.green2} strokeOpacity={z * z * 0.16} />;
          })}
          {Array.from({length: 25}).map((_, i) => {
            const x0 = W / 2 + (i - 12) * 60; const x1 = W / 2 + (i - 12) * 420;
            return <line key={'v' + i} x1={x0} y1={700} x2={x1} y2={H_ + 40} stroke="url(#vfade)" />;
          })}
          <defs><linearGradient id="vfade" gradientUnits="userSpaceOnUse" x1="0" y1="700" x2="0" y2="1100"><stop offset="0" stopColor={C.green2} stopOpacity={0} /><stop offset="1" stopColor={C.green2} stopOpacity={0.12} /></linearGradient></defs>
        </svg>
      )}
      <svg width={W} height={H_} style={{position: 'absolute'}}>{pts}</svg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)'}} />
    </AbsoluteFill>
  );
};

// ---------- timeline HUD in the reserved bottom band
export const Hud: React.FC = () => {
  const f = useCurrentFrame(); const sec = f / FPS;
  const s = levelAt(sec);
  const vis = (d: SceneDef) => d.hud !== false && d.year !== undefined;
  const on = vis(s) ? Math.min(lin(sec, s.start, 0.6), 1 - lin(sec, s.start + s.dur - 0.6, 0.6)) : 0;
  const prevs = SCENES.filter((d) => vis(d) && d.start <= sec);
  // year eases from previous scene's year
  const idx = SCENES.indexOf(s); const prev = SCENES.slice(0, idx).reverse().find(vis);
  const y0 = prev?.year ?? s.year ?? 2015.8; const y1 = s.year ?? y0;
  const yr = y0 + (y1 - y0) * prog(sec - s.start, 0, 1.5);
  const x0 = 300, x1 = 1620; const px = x0 + ((yr - 2015.5) / (2026.85 - 2015.5)) * (x1 - x0);
  if (!prevs.length) return null;
  return (
    <AbsoluteFill style={{opacity: on * 0.95, fontFamily: MONO}}>
      <div data-qa="hud" style={{position: 'absolute', left: 170, top: 1003, width: 110, textAlign: 'right', fontSize: 20, color: C.dim}}>2015</div>
      <div data-qa="hud" style={{position: 'absolute', left: 1640, top: 1003, width: 110, fontSize: 20, color: C.dim}}>今天</div>
      <div style={{position: 'absolute', left: x0, top: 1016, width: x1 - x0, height: 2, background: C.faint}} />
      <div style={{position: 'absolute', left: x0, top: 1016, width: px - x0, height: 2, background: `linear-gradient(90deg, ${C.green}, ${C.mint})`}} />
      <div style={{position: 'absolute', left: px - 7, top: 1010, width: 14, height: 14, borderRadius: 7, background: C.mint, boxShadow: `0 0 18px ${C.mint}`}} />
      <div data-qa="hud" style={{position: 'absolute', left: px - 60, top: 972, width: 120, textAlign: 'center', fontSize: 22, color: C.mint, fontWeight: 600}}>{Math.floor(yr)}</div>
    </AbsoluteFill>
  );
};

// ---------- layout QA probe: logs QA_FAIL lines when text is cropped, out of frame, or overlapping
export const QAProbe: React.FC<{on: boolean}> = ({on}) => {
  const f = useCurrentFrame();
  useEffect(() => {
    if (!on) return;
    const h = delayRender('qa');
    requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll('[data-qa]')) as HTMLElement[];
      const effOp = (el: HTMLElement) => {let o = 1; let e: HTMLElement | null = el; while (e) {o *= parseFloat(getComputedStyle(e).opacity || '1'); e = e.parentElement;} return o;};
      const vis = els.filter((e) => effOp(e) > 0.9).map((e) => ({e, r: e.getBoundingClientRect(), k: e.dataset.qa || ''}));
      const sc = (window as any).__scale || 1;
      const issues: string[] = [];
      const label = (e: HTMLElement) => (e.dataset.qa + ':' + (e.innerText || '').replace(/\s+/g, ' ').slice(0, 28));
      for (const {e, r, k} of vis) {
        const bottomLimit = k === 'hud' ? 1050 : 975;
        if (r.left < 50 || r.right > W - 50 || r.top < 40 || r.bottom > bottomLimit) issues.push(`OUT ${label(e)} [${r.left | 0},${r.top | 0},${r.right | 0},${r.bottom | 0}]`);
        const cs = getComputedStyle(e);
        if (e.scrollWidth > e.clientWidth + 2 && cs.overflowX !== 'visible' || e.scrollHeight > e.clientHeight + 2 && cs.overflowY !== 'visible')
          issues.push(`CLIP ${label(e)} sw=${e.scrollWidth}/${e.clientWidth} sh=${e.scrollHeight}/${e.clientHeight}`);
        // text children overflowing their qa box
        e.querySelectorAll('*').forEach((c: any) => {
          const cr = c.getBoundingClientRect(); if (!cr.width || !cr.height) return;
          if (c.closest('[data-qa-free]')) return;
          if (cr.right > r.right + 3 || cr.left < r.left - 3 || cr.bottom > r.bottom + 3 || cr.top < r.top - 3)
            if ((c.innerText || '').trim()) issues.push(`SPILL ${label(e)} <- ${(c.innerText || '').slice(0, 20)}`);
        });
      }
      for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
        const a = vis[i], b = vis[j];
        if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
        const ix = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
        const iy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
        if (ix > 2 && iy > 2) issues.push(`OVERLAP ${label(a.e)} x ${label(b.e)} (${ix | 0}x${iy | 0})`);
      }
      console.log('QA_FRAME ' + f + ' n=' + vis.length + (issues.length ? ' QA_FAIL ' + JSON.stringify(issues) : ' OK'));
      continueRender(h);
    });
  }, [f, on]);
  return null;
};
