"""Original score v2 — driven by the shared timeline. 120 BPM, D major (Bm-G-D-A).
Rhythm-first arrangement: 16th-note grid, light swing, syncopated 3-3-2 patterns, offbeat pumping bass,
accented hats, snare-roll builds into every act, fills on scene cuts."""
import json, wave, numpy as np
from scipy.signal import butter, sosfilt, oaconvolve
SR = 44100
rng = np.random.default_rng(11)
tl = json.load(open('video/src/timeline.json'))
BEAT = 60 / tl['bpm']; BAR = 4 * BEAT; S16 = BEAT / 4
SWING = 0.018  # seconds added to odd 16ths (hats/perc/arp only)
scenes = []; t = 0
for s in tl['scenes']:
    scenes.append(dict(s, start=t)); t += s['dur']
TOTAL = t; N = int(TOTAL * SR) + 2 * SR
B = {k: np.zeros((N, 2)) for k in ['pad', 'keys', 'arp', 'bass', 'kick', 'snare', 'hats', 'perc', 'lead', 'fx']}
def m2f(m): return 440 * 2 ** ((m - 69) / 12)
def lp(x, fc, o=2): return sosfilt(butter(o, min(fc, SR * 0.45), 'low', fs=SR, output='sos'), x, axis=0)
def hp(x, fc, o=2): return sosfilt(butter(o, fc, 'high', fs=SR, output='sos'), x, axis=0)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x, axis=0)
def add(name, t0, sig, pan=0.0, gain=1.0):
    i = int(round(t0 * SR))
    if i >= N or i < 0: return
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l, sig * r], 1) * 1.414
    n = min(len(sig), N - i); B[name][i:i + n] += sig[:n] * gain
def saw(f, n, ph=0.0): return 2 * ((f * np.arange(n) / SR + ph) % 1.0) - 1
def ar(n, a, r):
    tt = np.arange(n) / SR; return np.minimum(1, tt / max(a, 1e-4)) * np.clip((n / SR - tt) / r, 0, 1)
def dec(n, tau): return np.exp(-np.arange(n) / SR / tau)
def sw(step): return SWING if step % 2 == 1 else 0.0

# ---------- one-shot drum voices (pre-rendered)
def mk_kick():
    n = int(0.5 * SR); tt = np.arange(n) / SR
    f = 48 + 150 * np.exp(-tt / 0.028) + 40 * np.exp(-tt / 0.004)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.22)
    click = hp(rng.standard_normal(n), 2500) * np.exp(-tt / 0.003) * 0.5
    return np.tanh((body + click) * 2.2) / np.tanh(2.2)
def mk_snare():
    n = int(0.4 * SR); tt = np.arange(n) / SR
    body = np.sin(2 * np.pi * np.cumsum(180 + 60 * np.exp(-tt / 0.02)) / SR) * np.exp(-tt / 0.06)
    nz = bp(rng.standard_normal(n), 1500, 9000) * np.exp(-tt / 0.13)
    clap = np.zeros(n)
    for k, off in enumerate([0, 0.011, 0.022]):
        i = int(off * SR); m = n - i; clap[i:] += bp(rng.standard_normal(m), 900, 4000) * np.exp(-np.arange(m) / SR / (0.012 if k < 2 else 0.09))
    return body * 0.7 + nz * 0.8 + clap * 0.6
def mk_hat(open_=False):
    n = int((0.32 if open_ else 0.07) * SR); tt = np.arange(n) / SR
    x = hp(rng.standard_normal(n), 7500, 4) * np.exp(-tt / (0.12 if open_ else 0.022))
    return x
def mk_shaker():
    n = int(0.09 * SR); tt = np.arange(n) / SR
    return bp(rng.standard_normal(n), 4500, 11000) * np.minimum(1, tt / 0.012) * np.exp(-tt / 0.03)
def mk_tom(f0):
    n = int(0.45 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(f0 * (1 + 0.5 * np.exp(-tt / 0.03))) / SR) * np.exp(-tt / 0.18)
KICK, SNARE, HAT, OHAT, SHAKER = mk_kick(), mk_snare(), mk_hat(), mk_hat(True), mk_shaker()
TOMS = [mk_tom(f) for f in (180, 140, 105)]

PROG = [dict(pad=[47, 59, 62, 66], bass=35, arp=[71, 74, 78, 83]),   # Bm
        dict(pad=[43, 59, 62, 67], bass=31, arp=[67, 71, 74, 79]),   # G
        dict(pad=[50, 57, 62, 66], bass=38, arp=[69, 74, 78, 81]),   # D
        dict(pad=[45, 57, 61, 64], bass=33, arp=[69, 73, 76, 81])]   # A
MEL = [[(0, 78, 1.5), (1.5, 76, .5), (2, 74, 1), (3, 71, .75), (3.75, 73, .25)],
       [(0, 74, 1.5), (1.5, 76, .5), (2, 79, .75), (2.75, 78, .75), (3.5, 76, .5)],
       [(0, 81, 1.5), (1.5, 78, .5), (2, 74, .75), (2.75, 76, .75), (3.5, 78, .5)],
       [(0, 76, 1.5), (1.5, 73, .5), (2, 69, 1), (3, 73, .5), (3.5, 76, .5)]]
# 16-step patterns (1 = hit), velocity lists
ARP_332 = [0, 3, 6, 8, 11, 14]                       # 3-3-2 syncopation
HAT_VEL = [0.42, 0.3, 0.95, 0.32] * 4                # offbeat-accented 16ths
SHAKER_VEL = [0.5, 0.25, 0.8, 0.3] * 4

def scene_at(ts):
    for s in scenes:
        if s['start'] <= ts < s['start'] + s['dur']: return s
    return scenes[-1]
END = scenes[-1]['start']
nbars = int(END / BAR)
kicks = []
for b in range(nbars):
    t0 = b * BAR; s = scene_at(t0 + 0.01); L = s['level']; card = s.get('card', False)
    s_end = s['start'] + s['dur']; last_bar_of_scene = abs((t0 + BAR) - s_end) < 1e-6
    nxt = scene_at(s_end + 0.01) if s_end < END else None
    into_card = last_bar_of_scene and nxt is not None and nxt.get('card')
    slow = L <= 2; ci = (b // 2) % 4 if slow else b % 4; ch = PROG[ci]
    new_chord = (not slow) or b % 2 == 0; clen = (2 if slow else 1) * BAR
    drums = L >= 2 and not card
    # ---- pad
    if new_chord:
        n = int((clen + 1.0) * SR); cut = [700, 900, 1200, 1600, 2100, 2600, 3100, 3500, 3500][L]
        for m in ch['pad']:
            f = m2f(m); sig = sum(saw(f * 2 ** (d / 12), n, rng.random()) * 0.25 for d in (-0.11, -0.04, 0.04, 0.11))
            sig = lp(sig, cut) + 0.35 * np.sin(2 * np.pi * f * np.arange(n) / SR)
            add('pad', t0, sig * ar(n, 0.5 if L < 3 else 0.12, 1.0), pan=rng.uniform(-.5, .5), gain=0.11)
    # ---- piano ostinato: rhythmic 8ths from the very first bar (gives pulse to the prologue)
    if L <= 3:
        tones = [ch['pad'][1] + 12, ch['pad'][2] + 12, ch['pad'][3] + 12, ch['pad'][2] + 24]
        pat = [0, 2, 1, 3, 0, 2, 1, 2]
        for k in range(8):
            if L == 0 and k % 2 == 1 and b < 2: continue
            m = tones[pat[k]]; n = int(1.6 * SR); f = m2f(m); tt = np.arange(n) / SR
            sig = sum(np.sin(2 * np.pi * f * h * tt) * a * np.exp(-tt * (2.2 + h * 1.2)) for h, a in ((1, 1), (2, .4), (3, .18), (4, .08)))
            sig *= np.minimum(1, tt / 0.003)
            vel = 1.0 if k in (0, 3, 6) else 0.6        # 3-3-2 accent feel
            add('keys', t0 + k * 2 * S16, sig, pan=-0.25 + 0.07 * k, gain=0.075 * vel * (0.8 if L == 0 else 1))
    # ---- arp (syncopated 3-3-2 at L1-2, driving 16ths with accents at L3+)
    if L >= 1 and not (card and L < 4):
        cut = [0, 1500, 2000, 2700, 3300, 3900, 4400, 4800, 4800][L]
        steps = ARP_332 if L <= 2 else range(16)
        for j, st in enumerate(steps):
            m = ch['arp'][(j if L <= 2 else [0, 2, 1, 3, 2, 3, 1, 2][st % 8]) % 4] + (12 if (L >= 5 and st in (7, 15)) else 0)
            n = int(0.3 * SR); f = m2f(m); tt = np.arange(n) / SR
            env = np.exp(-tt / (0.10 if L <= 2 else 0.065))
            sig = saw(f, n) * 0.6 + np.sign(np.sin(2 * np.pi * f * 1.004 * tt)) * 0.3
            sig = lp(sig * env, cut)
            vel = 1.0 if (L <= 2 or st in ARP_332) else 0.55   # 3-3-2 accents inside the 16ths
            tt0 = t0 + st * S16 + sw(st)
            add('arp', tt0, sig, pan=0.35 if st % 2 else -0.35, gain=0.075 * vel)
            add('arp', tt0 + 3 * S16, sig * 0.3, pan=-0.6 if st % 2 else 0.6, gain=0.075 * vel)
    # ---- kick
    if L == 1 and not card:
        for st in (0, 6, 10): kicks.append((t0 + st * S16, 0.5 if st else 0.6))
    if drums:
        for st in (0, 4, 8, 12): kicks.append((t0 + st * S16, 1.0))
        if L >= 3 and b % 4 == 3: kicks.append((t0 + 14 * S16, 0.55))   # pickup kick every 4 bars
    # ---- bass: offbeat pump (L2), rolling 16ths "da-da-DUM" (L3+), octave jumps (L5+)
    if L >= 2 and not (card and L < 4) and L < 8:
        f = m2f(ch['bass'])
        if L == 2: sts = [2, 6, 10, 14]
        else: sts = [st for st in range(16) if st % 4 != 0]
        for st in sts:
            oct_ = 2 if (L >= 5 and st % 4 == 2) else 1
            n = int(S16 * SR * (1.9 if L == 2 else 0.9)); tt = np.arange(n) / SR
            ff = f * oct_
            sig = np.sin(2 * np.pi * ff * tt) * 0.7 + lp(saw(ff * 2, n), 420 + 160 * L) * 0.5
            vel = 1.0 if st % 4 == 2 else 0.7
            add('bass', t0 + st * S16, sig * ar(n, 0.004, 0.03), gain=0.14 * vel)
    # ---- hats / shaker / open hats / ride
    if L == 1 and not card:
        for st in range(16):
            add('perc', t0 + st * S16 + sw(st), SHAKER, pan=0.3, gain=0.05 * SHAKER_VEL[st])
    if drums:
        for st in range(16):
            if L == 2 and st % 2 == 0: continue
            if L == 2 and st % 4 == 2: add('hats', t0 + st * S16, OHAT[:int(0.12 * SR)], pan=0.2, gain=0.05); continue
            add('hats', t0 + st * S16 + sw(st), HAT, pan=0.2, gain=0.075 * HAT_VEL[st])
        if L >= 4:
            for st in (2, 6, 10, 14): add('hats', t0 + st * S16, OHAT, pan=-0.2, gain=0.04)
        if L >= 5:
            for st in range(16):
                add('perc', t0 + st * S16 + sw(st), SHAKER, pan=-0.4, gain=0.035 * SHAKER_VEL[st])
    # ---- snare/clap on 2 & 4, ghost notes at L4+
    if drums and L >= 3:
        for st in (4, 12): add('snare', t0 + st * S16, SNARE, gain=0.30)
        if L >= 4:
            for st in (7, 10, 15):
                if st == 15 and last_bar_of_scene: continue
                add('snare', t0 + st * S16 + sw(st), SNARE, gain=0.06)
    elif drums and L == 2:
        for st in (4, 12): add('snare', t0 + st * S16, SNARE * 0.5, gain=0.18)
    # ---- fills on scene cuts (phrase punctuation) at L3+
    if drums and L >= 3 and last_bar_of_scene and not into_card:
        for k, st in enumerate((12, 13, 14, 15)):
            add('perc', t0 + st * S16, TOMS[min(k, 2)] if k < 3 else SNARE, gain=0.18 if k < 3 else 0.2)
    # ---- snare-roll build: bar before each act card (& inside card) — accelerating, rising
    if into_card or (card and t0 + BAR >= s_end - 1e-6):
        hits = [st * S16 for st in range(0, 16, 2)] if not card else [k * S16 / 2 for k in range(32)]
        for k, ht in enumerate(hits):
            v = 0.08 + 0.25 * (k / len(hits))
            add('snare', t0 + ht, SNARE * (0.6 + 0.4 * k / len(hits)), gain=v)
    # ---- anthem lead
    if L >= 4 and not card and L < 8:
        for (bt, m, d) in MEL[ci]:
            for octv in ([0, 12] if L >= 6 else [0]):
                n = int((d * BEAT + 0.2) * SR); f = m2f(m + octv - 12 * (L == 4))
                sig = sum(saw(f * 2 ** (dt / 12), n, rng.random()) for dt in np.linspace(-0.16, 0.16, 7)) / 7
                sig = lp(sig, 3000 if L == 4 else 4300) * ar(n, 0.012, 0.18)
                add('lead', t0 + bt * BEAT, sig, pan=rng.uniform(-.3, .3), gain=0.17 * (0.6 if octv else 1))

for (tk, v) in kicks: add('kick', tk, KICK, gain=0.52 * v)
# sidechain pump from kicks
sc = np.ones(N)
for (tk, v) in kicks:
    i = int(tk * SR); n = min(int(0.42 * SR), N - i)
    if n > 0: sc[i:i + n] = np.minimum(sc[i:i + n], 1 - 0.72 * v * np.exp(-np.arange(n) / SR / 0.13))
for k, depth in (('pad', 1.0), ('bass', 1.0), ('arp', 0.6), ('lead', 0.35), ('keys', 0.3)):
    B[k] *= (1 - depth + depth * sc)[:, None]

# FX: risers + impacts
def riser(t_end, dur, gain=0.11):
    n = int(dur * SR); nz = rng.standard_normal(n); out = np.zeros(n); C = 40
    for c in range(C):
        a, b2 = c * n // C, (c + 1) * n // C; fc = 300 * (40 ** (c / C))
        out[a:b2] = bp(nz, fc * 0.6, min(fc * 1.6, 18000))[a:b2]
    tt = np.arange(n) / SR
    add('fx', t_end - dur, (out + np.sin(2 * np.pi * np.cumsum(200 * 4 ** (tt / dur)) / SR) * 0.12) * (tt / dur) ** 2, gain=gain)
def impact(t0, big=1.0):
    n = int(3.5 * SR); tt = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(32 + 45 * np.exp(-tt / 0.25)) / SR) * np.exp(-tt / 1.0)
    crash = hp(rng.standard_normal(n), 3500) * np.exp(-tt / 1.1) * 0.35
    add('fx', t0, (boom * 0.6 + crash) * big, gain=0.45)
for i, s in enumerate(scenes):
    if s.get('card') or s.get('impact'):
        impact(s['start'], 1.15 if s['level'] >= 5 else 0.9)
        if s['start'] > 4: riser(s['start'], 3)
    if s.get('card'):
        nxt = scenes[i + 1]; riser(nxt['start'], s['dur'] * 0.9, 0.12); impact(nxt['start'], 0.7)
# every 8 bars at L4+: crash on the downbeat
for b in range(nbars):
    s = scene_at(b * BAR + 0.01)
    if s['level'] >= 4 and not s.get('card') and b % 8 == 0:
        n = int(2 * SR); add('fx', b * BAR, hp(rng.standard_normal(n), 4000) * dec(n, 0.8) * 0.3, gain=0.4)

# finale chord
n = int((TOTAL - END + 1.5) * SR)
for m in [38, 50, 57, 62, 66, 69, 74, 78]:
    f = m2f(m); tt = np.arange(n) / SR
    sig = lp(sum(saw(f * 2 ** (d / 12), n, rng.random()) for d in np.linspace(-0.12, 0.12, 5)) / 5, 2500) * np.exp(-tt / 4.0)
    add('pad', END, sig, pan=rng.uniform(-.6, .6), gain=0.11)
    add('keys', END, np.sin(2 * np.pi * f * 2 * tt) * np.exp(-tt / 3.0), gain=0.05)

# reverb send
def ir(sec, seed):
    r = np.random.default_rng(seed); n = int(sec * SR); tt = np.arange(n) / SR
    return lp(r.standard_normal(n) * np.exp(-tt / (sec / 5)), 6000)
IRL, IRR = ir(2.0, 1), ir(2.0, 2)
send = B['pad'] * 0.4 + B['keys'] * 0.6 + B['arp'] * 0.5 + B['lead'] * 0.45 + B['snare'] * 0.2 + B['fx'] * 0.3
wet = np.stack([oaconvolve(send[:, 0], IRL)[:N], oaconvolve(send[:, 1], IRR)[:N]], 1)
wet *= 0.9 / (np.abs(wet).max() + 1e-9) * np.abs(send).max()
mix = sum(B.values()) + wet * 0.32
mix = hp(mix, 32)
g = np.zeros(N)
for s in scenes:
    a, b2 = int(s['start'] * SR), int((s['start'] + s['dur']) * SR)
    g[a:b2] = [0.55, 0.62, 0.7, 0.78, 0.86, 0.94, 1.02, 1.1, 1.1][s['level']] * (0.9 if s.get('card') else 1)
g[int(TOTAL * SR):] = g[int(TOTAL * SR) - 1]
k = int(1.0 * SR); cs = np.cumsum(np.pad(g, (k, k), mode='edge')); g = ((cs[2 * k:] - cs[:-2 * k]) / (2 * k))[:N]
mix *= g[:, None]
pk = np.percentile(np.abs(mix), 99.95); mix = mix / pk
mix = np.tanh(mix * 1.15) / np.tanh(1.15)
tt = np.arange(N) / SR
mix *= np.clip((TOTAL - tt) / 3.0, 0, 1)[:, None] * np.clip(tt / 0.05, 0, 1)[:, None]
mix = mix[:int(TOTAL * SR)]; mix *= 0.93 / np.abs(mix).max()
with wave.open('build/music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
for s in scenes:
    a, b2 = int(s['start'] * SR), int((s['start'] + s['dur']) * SR)
    print(f"{s['id']:<11} L{s['level']} rms={20*np.log10(np.sqrt((mix[a:b2]**2).mean())+1e-9):6.1f}")
