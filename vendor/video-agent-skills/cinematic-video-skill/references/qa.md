# Layout QA: No Cropping, No Overlap

Users judge the whole film by one clipped headline. QA is two gates. Both must pass before a full render,
and again after every change.

## Gate 1: automated probe

`QAProbe` in lib.tsx runs inside the page when rendered with `inputProps {qa: true}`. For every visible
(effective opacity > 0.9) `[data-qa]` element it logs:

| Code | Meaning | Typical fix |
|---|---|---|
| `OUT` | box outside the safe frame (50 px margins, bottom 975 for content) | smaller type, tighter layout, fewer items |
| `CLIP` | content taller or wider than its own box (overflow hidden cuts it) | raise the fixed height, or remove it and use flex stretch |
| `SPILL` | a text child pokes outside its `data-qa` box | line-height too tight for inline spans, nowrap text too long |
| `OVERLAP` | two unrelated boxes intersect | re-space, narrow label boxes, move absolutely-positioned labels |

`video/qa.mjs` bundles once and renders 2 stills per scene: `_a` at 55% of the scene (mid-reveal) and
`_b` 1 s before the cut (everything revealed, before the exit fade). It prints `FAILS n / N`.
Run `node qa.mjs id1,id2` to re-check selected scenes quickly (about 1 s per still).

Mark new readable elements with `data-qa="…"`. Only decorative art may go without it.

## Gate 2: eye pass on contact sheets

`python tools/contact_sheet.py b` (and `a`) → open every `build/qa/sheet*_N.jpg`. The probe cannot catch these,
so check each sheet for:

- [ ] a typing cursor sitting below the baseline or floating after the text ends
- [ ] a decorative line, arrow or path running through text (remove it or route it behind empty space)
- [ ] a single orphaned character, or a 2-character tail, on the last line
- [ ] a number separated from its unit across lines
- [ ] paired or row cards with unequal heights, or big empty bottoms
- [ ] an animated pointer or particle resting on a label
- [ ] a visible horizontal band or seam in the background (from an opaque gradient rect)
- [ ] an empty half-screen, or content crowded into one corner
- [ ] text over busy art without enough contrast
- [ ] labels of a chart or curve colliding with the line or with each other

## Known pitfalls and fixes

- **Typewriter reflow.** Lay out the untyped remainder invisibly (`Typed` does this). Put the cursor in a
  zero-width inline-block with `height: 1em; verticalAlign: -0.14em`.
- **JSX newlines are whitespace.** `\n` inside raw JSX text does nothing. Use `{'line1\nline2'}` together
  with `whiteSpace: 'pre-line'`.
- **Highlight splitting.** `G` uses `whiteSpace: 'nowrap'`, so keep highlighted phrases short.
- **Absolute labels near a curve.** Put labels below-right of each point on a rising curve, with fixed
  widths under the point spacing and explicit line splits.
- **Camera push.** The 3% scale makes edge content grow by about 30 px. The probe measures the scaled boxes,
  so it accounts for this.

## Final-file check

After muxing, grab 6–8 frames from the finished MP4 (`ffmpeg -ss T -i film.mp4 -frames:v 1`),
tile them, and look. This catches font-loading failures and encoding problems that stills from the bundle
would miss.
