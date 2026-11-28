# Story, Acts and Pacing

## Director's structure

```
COLD OPEN (10 s)   a question typed on black: "如果机器能够思考……"
TITLE (8 s)        emblem + name + mission line + span of years
ACT I … ACT N      4 s chapter card, then 3–6 content scenes (10–14 s each)
FINALE             impact grid (16 s) → recap curve (16 s) → manifesto (14 s)
OUTRO (12 s)       emblem + name + mission + closing line, 3 s fade to black
```

- An act is an *idea*, not a date bucket: "一个大胆的赌注 / 规模的启示 / 想象力被解锁 /
  能力的飞跃 / 从对话到行动 / 智能的新纪元". Each card shows 第N幕, the title, an English subtitle, and years.
- Order scenes chronologically inside acts. When a scene summarizes (a scaling chart), place it after
  the events it summarizes.
- The finale widens from the subject to the world (8 domains it changes), zooms out to the whole arc
  (an exponential curve with every milestone), then lands one emotional line.

## Scene anatomy (content scenes)

Left column: eyebrow (date · name, mono, accent color) → headline (2 short lines, has an image in it)
→ body (2–3 sentences: what happened, why it mattered, one highlighted phrase) → optional chip or card.
Right column: one *proof* visual that animates the claim, for example a chat window answering, code typing,
a bar chart growing, a Rubik's cube solving, a waveform, a checklist ticking, a dot globe lighting up.

Other layouts: a grid of 2–4 equal cards under a header, used when an act has several parallel launches.
Hero: one giant word, used for the flagship moments (the flagship product, the latest model).

Every scene carries at least one concrete number or date. Numbers count up (`Count`) to add motion.

## Intensity levels

| Level | Where | Picture | Music |
|---|---|---|---|
| 0 | prologue | dark, few particles | pad + piano ostinato |
| 1 | act I | green glow | + syncopated arp, soft kick, shaker |
| 2 | act II | beat pulse starts | four-on-floor, offbeat bass, hats |
| 3 | act III | perspective grid | + snare, rolling bass, 16th arp, fills |
| 4 | act IV | blue glow joins | + anthem lead, open hats, ghost snares |
| 5–6 | acts V–VI | violet glow, more particles | + octave jumps, shaker, fuller lead |
| 7 | finale | everything | lead doubled an octave up |
| 8 | outro | fade | final chord rings out |

Act cards drop the drums for 2 bars with a snare roll and riser, then the next scene hits with an impact.
This drop-and-slam every act is what makes the escalation feel physical.

## Pacing formula

- Reveal schedule inside a scene: eyebrow 0.3 s → headline 0.7 s → body 1.3 s → visual 1.6–1.8 s →
  secondary items staggered 0.6–1.2 s apart. **Everything visible by 40–60% of the scene.**
- **Hold after the last element: 3–5 s.** Estimate reading time at about 7 Chinese characters per second
  for the text that appears last. Longer holds feel slow (users complained at 12–16 s scenes); shorter
  holds feel rushed.
- Typing effects: 12–14 characters per second for body text, 4–5 characters per second for the cold-open
  question (drama). Typing must end at least 2 s before the cut.
- Durations are even integers (bars at 120 BPM). Typical values: act card 4, content 10–14,
  grid or finale 16, cold open 10, title 8, outro 12.
- Total runtime follows from the scene count. Do not pad scenes to reach a target length; add content instead.

## Copywriting rules (Chinese on screen)

- Headlines ≤ 2 lines, ≤ 10 characters per line, with an explicit `<br />` at a natural pause.
- Body ≤ about 60 characters. Wrap highlight phrases in `<G>` (they never break internally).
- Card descriptions: split into two balanced lines with an explicit break (`'…\n…'` with
  `whiteSpace: 'pre-line'`, as a JS string, not raw JSX text) to avoid a lonely last character.
- Numbers keep their unit on the same line ("7 亿张", "232 ms").
- Keep product names in original form; add the Chinese gloss once.
