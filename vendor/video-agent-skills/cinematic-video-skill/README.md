# cinematic-video · a Claude Code skill

[中文导读](README.zh.md)

A [Claude Code](https://claude.com/claude-code) skill that turns a one-line brief ("make a video about
company X's history, escalating, in its brand colors, with original music") into a finished,
fact-checked, cinematic motion-graphics film with an original score, rendered to MP4 from code.

It captures a full production workflow: brief → research → story → scenes → score → layout QA → render → delivery.
It also ships a working project template that builds a film with one command.

## What the skill does

| Phase | What happens |
|---|---|
| Brief | Pins down subject, end date (today, not the model's cutoff), tone, language, palette, length, deliverables |
| Research | Every on-screen date and number is verified; post-cutoff events are searched; self-reported claims are attributed |
| Story | Cold open → title → 4–6 acts with chapter cards → finale (impact grid, recap curve, manifesto) → outro |
| Pacing | Text fully revealed by 40–60% of each scene, then a 3–5 s hold; cuts land on bar lines |
| Visuals | React/Remotion scene archetypes, safe-area grid, brand tokens, continuous reactive backdrop |
| Score | numpy-synthesized, rhythm-first music (3-3-2 syncopation, offbeat bass, fills, snare-roll builds) driven by the same timeline |
| QA | An in-page layout probe (out of frame / clipped / spilled / overlapping text must be 0) plus a contact-sheet eye pass |
| Delivery | 1080p master, a 720p share copy under 50 MB, and a timeline document with sources |

## Install

```bash
git clone https://github.com/mylxsw/cinematic-video-skill ~/.claude/skills/cinematic-video
```

Claude Code picks it up automatically. Ask for a video, or invoke `/cinematic-video`.

## Use the template directly

Requirements: Node 18+, ffmpeg, Python 3.10+ with [uv](https://github.com/astral-sh/uv), Chromium
(Remotion downloads one).

```bash
cp -r ~/.claude/skills/cinematic-video/template my-film && cd my-film
bash tools/setup.sh            # node deps, venv, fonts (Noto Sans SC, Inter, JetBrains Mono)
# edit video/src/timeline.json and video/src/scenes.tsx
bash tools/build.sh my-film    # fonts → music → layout QA gate → render → mux → 720p copy
```

`video/src/timeline.json` is the single source of truth. The picture and the music both read it, so cuts
land on the beat and the score escalates with the story.

## Layout

```
SKILL.md                  workflow the agent follows
references/               one deep-dive per phase (research, story & pacing, visuals, music, QA, ops)
template/                 runnable project skeleton (Remotion + numpy score + QA tools)
examples/openai-2015-2026 scene code and sourced timeline of a complete 7.5-minute film
```

## Notes

- Rendering uses [Remotion](https://www.remotion.dev/), which has its own license: free for individuals
  and small teams, while larger companies need a company license. Check it before commercial use.
- Fonts are downloaded from Google Fonts (SIL Open Font License) at setup time and are not redistributed here.
- The example film is an independent, unofficial retrospective. Company and product names belong to their
  owners, and the emblem in the template is an original abstract shape, not a logo.

## License

MIT
