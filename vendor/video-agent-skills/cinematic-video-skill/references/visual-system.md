# Visual System

## Canvas and safe area

- 1920×1080 at 30 fps. Content box: left/right 130 px, top 90 px, bottom 130 px
  (the bottom band 975–1050 is reserved for the progress bar HUD).
- Every scene gets a slow camera push (scale 1.00 → 1.03 over the scene) and a 0.7 s fade in and out.
  Scenes never cross-dissolve text into text: the outgoing scene is gone before the incoming text appears.
- The backdrop is global and continuous across cuts (glows, particles, perspective grid, vignette). It reacts
  to the level and pulses on the kick once drums are in (every 15 frames at 120 BPM / 30 fps).

## Layout primitives (template/video/src/lib.tsx)

| Primitive | Use |
|---|---|
| `Split left right lw gap` | text column (default 760 px) + visual column (≈810 px) |
| `Stack` | centered vertical stack (cold open, title, hero, manifesto) |
| `Card`, `Window` | content containers; `Window` has traffic lights + title |
| `R at d y x` | reveal wrapper (fade + rise + de-blur) at scene time `at` |
| `Eyebrow`, `Title`, `Body`, `G` | typography atoms with `data-qa` built in |
| `Typed` | typewriter that never reflows (untyped text is laid out invisibly) |
| `Count` | animated number |
| `Bloom` | abstract emblem; never reproduce a real logo or trademark |
| `Hud` | 2015 ──●── 今天 progress bar with the current year |
| `QAProbe` | layout checker, active only with `inputProps {qa: true}` |

Right-column visuals should be ≤ 820 px wide. Full-width pages (grid, chart) use the whole 1660 px.
For rows of equal cards, wrap each in `R style={{flex: 1, display: 'flex'}}` and give the Card `flex: 1`.
That gives equal heights with no empty bottoms.

## Typography

- Latin: Inter. CJK: Noto Sans SC. Mono (dates, code, labels): JetBrains Mono. All three are subset to used
  characters and loaded through `FontFace` + `delayRender` before any frame.
- Sizes at 1080p: eyebrow 26 mono; headline 68 (hero 110–230); body 30–32; card title 32–36;
  card text 23–25; the minimum readable size is 20. Line height 1.2 for headlines, 1.55–1.7 for body.

## Color

- Base: near-black `#050507`, text `#ECECF1`, secondary `#B4B4C6`, dim `#8E8EA0`, hairlines `rgba(255,255,255,0.12)`.
- Accent: the subject's brand color (OpenAI used `#10A37F` / `#19C37D` / mint `#74F2C6`).
- Escalation colors join the glow as levels rise (blue at L4, violet at L5+). Gradient text is kept for
  hero words only.
- Swap the `C` token object in lib.tsx for a new brand. Everything else reads from it.

## Scene visual ideas that worked

Chat window typing an answer; code editor typing plus a REPL result; next-token probability bars;
a log-scale bar chart; an isometric cube resolving colors; a mosaic dissolving into an illustration;
a waveform with transcribed chips; an RLHF loop with a travelling dot; a night city with parallax;
a voice orb with a radial waveform; "thinking" steps ticking in; a browser agent with a moving cursor;
parallel task list with spinners turning into checks; a rotating Fibonacci dot globe; a 2-lane
full-duplex waveform; a checked 10-cell grid; an animated spiral vortex; an exponential curve drawing
itself with milestone labels placed below-right of each point (never collides with a rising curve).
