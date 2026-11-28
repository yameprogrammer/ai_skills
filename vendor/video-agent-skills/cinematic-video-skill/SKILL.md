---
name: cinematic-video
description: Direct and produce a complete cinematic motion-graphics video (company or product history, milestone retrospective, brand anthem, explainer, 宣传片, 发展史, 纪录短片) with an original synthesized score, rendered to MP4 from code. Use whenever the user asks to make, produce, or revise a video, film, or animated piece, especially one that must escalate in pace and intensity, match a brand palette, have its own music, and be fact-checked. Covers story design, fact verification, the scene/beat timeline, visual system, score, layout QA against cropped or overlapping content, rendering, and delivery.
---

# Cinematic Video Production

Direct a video like a film director, then build it like an engineer: every frame is rendered from
React (Remotion), the music is synthesized from the same timeline, and nothing ships until an automated
layout probe and a human-eye pass agree that no text is cropped, clipped, or covered.

This is a workflow skill. Read this file first, then open the reference for the phase you are in.

| Phase | Reference |
|---|---|
| 1–2 Brief, research, fact-checking | [references/research.md](references/research.md) |
| 3 Story, acts, pacing | [references/story-and-pacing.md](references/story-and-pacing.md) |
| 4 Visual system and scene archetypes | [references/visual-system.md](references/visual-system.md) |
| 5 Score and sound design | [references/music.md](references/music.md) |
| 6 Layout QA (cropping and overlap) | [references/qa.md](references/qa.md) |
| 7 Render, deliver, revise, pitfalls | [references/render-and-ops.md](references/render-and-ops.md) |

The working project skeleton is in `template/`. A complete finished film (six acts, 41 scenes) is in
`examples/openai-2015-2026/`: read its scene files when you need a concrete pattern.

## The pipeline at a glance

```
brief ─► research & verified timeline ─► story (acts, scenes, beats) ─► timeline.json
                                                                        │
                        ┌───────────────────────────────────────────────┤
                        ▼                                               ▼
               scenes (React/Remotion)                        score (numpy synth)
                        │                                               │
                        ▼                                               │
     layout QA probe (0 fails) + contact-sheet eye pass                 │
                        │                                               │
                        ▼                                               ▼
                 render video (no audio) ──────────► mux ─► verify frames ─► deliver + timeline doc
```

`timeline.json` is the single source of truth. Scene order, durations (seconds), intensity level,
act cards, and the year shown on the progress bar all live there. The video engine and the music
generator both read it, so cuts land on bar lines and the score escalates exactly when the picture does.

## Phase 1: Understand the brief

Before writing anything, pin down these points. Ask the user only about the ones that change the work,
and default the rest.

- **Subject and end date.** Cover everything up to *today's date*, not up to your knowledge cutoff.
  If today is past your cutoff, you must research the gap (Phase 2). A user once had to correct a film
  that stopped a year early.
- **Tone.** The default for "inspiring" briefs is a director's techno-optimism: build, never plateau.
- **Language.** Match the user's language for on-screen copy. Keep product names in their original form.
- **Palette.** Use the subject's real brand colors, and look them up rather than guessing.
- **Length and density.** "More detailed, longer" means 7–8 minutes and about 40 scenes. "Punchy" means
  2–3 minutes. Pacing rules are in the story reference.
- **Deliverables.** Always produce a 1080p master, a 720p share copy under 50 MB (chat bots often cap
  uploads), and a timeline document with sources.

## Phase 2: Research and verify every fact

- Build a dated event list. Every date, number and claim on screen needs a source you actually checked.
  Prefer the subject's own announcement pages, Wikipedia and reputable press. Treat aggregator and SEO sites
  as leads only.
- For anything after your knowledge cutoff, search the web. Never extrapolate model names or dates.
- Choose precision you can defend. Use a month (`2015.12`) when sources disagree on the day.
- Company claims that are not independently verified get attribution in the copy ("X 公布…"), and you
  flag them to the user.
- Decide deliberately what to leave out. For example, an optimistic film may skip lawsuits or shut-down
  products. Tell the user what you excluded so they can reverse it.
- Save the verified list as `output/时间线_vN.md` with film timecodes and source URLs.

## Phase 3: Write the story

Details are in [story-and-pacing.md](references/story-and-pacing.md). The core rules:

- **Structure.** Use a cold open, a title, 4–6 acts with 4-second act cards, a finale (impact grid,
  a recap curve, a manifesto) and an outro. Each act is one idea ("规模的启示") rather than a year range.
- **One scene, one message.** Give each scene a date eyebrow, a headline with a picture in it, 2–3 sentences
  of body, and one animated proof visual on the right: a chat UI, code typing, a chart, an interface.
- **Escalation.** Assign an intensity level (0 = ambient … 7 = finale, 8 = outro) that only rises across acts.
  Picture energy (glow, particles, grid, beat pulses) and music density both follow the level.
- **Pacing formula.** All text reveals finish by about 40–60% of the scene. After the last element appears,
  hold 3–5 seconds, which is enough to read everything once and no more. Content scenes run 10–14 s, act cards
  4 s, and the finale grid 16 s. The first cut was judged too slow at 12–16 s holds. Trimming about 2 s per
  scene was the fix.
- **Durations are even integers.** At 120 BPM a bar is 2 s, so every cut lands on a downbeat.

## Phase 4: Build the scenes

1. Copy `template/` to a new project folder. Run `tools/setup.sh`, setting `REUSE_NODE_MODULES` to hard-link
   an existing Remotion install.
2. Write `video/src/timeline.json`, then implement scenes in `scenes.tsx` from the archetypes: cold open,
   title, act card, split, grid, hero, outro. See [visual-system.md](references/visual-system.md) for
   the layout grid, safe area, typography and palette tokens.
3. Put every readable block inside the primitives (`Eyebrow`, `Title`, `Body`, `Card`, `Window`) or give it
   `data-qa`, so the probe can see it.
4. Run `tools/subset_fonts.sh` after every copy change. Characters missing from the subset render as
   fallback glyphs.

## Phase 5: Compose the score

`template/tools/music.py` is a complete, rhythm-first generator: 120 BPM, a I–V–vi–IV family progression,
one layer per level, a 3-3-2 syncopation, an offbeat pumping bass, snare-roll builds into acts, fills on
cuts, sidechain, reverb and loudness automation. Adapt the key, progression, melody and palette of sounds
to the subject. Then run `tools/audio_check.py`: loudness must climb scene by scene, crest factor should
stay at or above about 9 dB in loud sections, and transients must sit on the 16th grid. You cannot listen,
so say so in your report and ask the user to judge the feel. Details are in [music.md](references/music.md).

## Phase 6: Layout QA (non-negotiable)

Users notice cropped pages and overlapping text immediately. There are two gates, and both must pass:

1. **Automated probe.** Run `cd video && node qa.mjs` to render two stills per scene: one mid-reveal, and one
   fully revealed 1 s before the cut. The in-page probe logs `OUT`, `CLIP`, `SPILL` and `OVERLAP`, and the
   result must be `FAILS 0 / N`. Run `node qa.mjs id1,id2` to re-check only the scenes you touched.
2. **Eye pass.** Run `.venv/bin/python tools/contact_sheet.py b` and `… a`, then open every sheet. The probe
   cannot see these defects, but you must hunt for them: a cursor off the baseline, a decorative line
   crossing text, a single orphaned character on its own line, a number split from its unit, unequal
   paired cards, a pointer covering a button label, background bands, empty half-screens.

The checklist and fixes are in [qa.md](references/qa.md).

## Phase 7: Render, verify, deliver

- Render in the background and wait on the PID. Never use `pgrep -f`/`pkill -f` with a pattern that also
  appears in your own command line: it matches your shell and kills it, or it reports a finished render as
  still running.
- Mux the music, make the 720p copy, then pull 6–8 frames from the *final file* and look at them.
- Copy the deliverables to the chat output folder when one exists. Report the full absolute paths, the
  timeline table, what you verified, what you could not verify (the music feel), and what you excluded.
- On revision requests, keep a versioned backup (`build/src_vN_backup`), bump output names (`_v2`), and
  re-run the full QA even for "small" copy changes, because a line that becomes one character longer can wrap.

Everything operational (timeouts, fonts, JSX newlines, render speed) is in
[render-and-ops.md](references/render-and-ops.md).

## Template contents

```
template/
  tools/setup.sh           one-time: node deps (or hard-link), venv, source fonts
  tools/subset_fonts.sh    subset fonts to used characters; re-run after copy edits
  tools/music.py           rhythm-first score generator driven by timeline.json
  tools/audio_check.py     loudness / crest / band balance / beat-grid analysis
  tools/contact_sheet.py   2×2 sheets of QA stills for the eye pass
  tools/build.sh NAME      fonts → music → QA gate → render → mux → 720p copy
  video/qa.mjs             layout probe runner (node qa.mjs [id,id])
  video/src/lib.tsx        engine: timing, reveal, typography, layouts, backdrop, HUD, QA probe
  video/src/scenes.tsx     7 scene archetypes to copy from
  video/src/timeline.json  the single source of truth (id, dur, level, card, year, hud, impact)
```

Validated end to end: a fresh copy of the template passes QA (0 fails), renders, and muxes into a
72-second film with `tools/build.sh`.
