# Brief, Research and Fact-Checking

## Reading the brief

Map loose wording to concrete decisions:

| User says | Decision |
|---|---|
| "节奏和强度不断递增" / escalating | Intensity levels only rise per act; music adds a layer per act; loudness climbs ~1 dB per act |
| "电影导演的视角" / cinematic | Cold open question → title → acts with chapter cards → finale montage → manifesto → outro |
| "超级技术乐观主义" | Achievement framing, forward-looking verbs, a closing line like "而这，才刚刚开始" |
| "更丰满、更详细、时长长一点" | 7–8 min, ~40 scenes, every scene has a concrete proof visual and a number |
| "节奏不要太快，看得完" | Reveal early, hold 3–5 s after the last element; do not exceed that either |
| "主题配色" | Use the subject's real brand colors (look them up) as the accent on a dark neutral base |
| "截止到当前时间" | End date = today's date from the environment, research everything after your cutoff |

If a point would change the work materially and cannot be defaulted, ask once. Otherwise state the
assumption in the final report.

## Research procedure

1. **Seed list from memory.** Write the milestone list you already know, with a date and one-line claim each.
   Mark each item: `sure`, `check`, `unknown after cutoff`.
2. **Verify every item.** One search or fetch per cluster. Sources in order of trust:
   the subject's official announcement or blog → Wikipedia (topic page and "YEAR in X" pages) →
   major press (Reuters, CNBC, TechCrunch, Quanta, MIT Tech Review) → aggregators (leads only).
   Summarizer fetches can hallucinate; for any claim that goes on screen, confirm with a second source
   or an official page title/URL in search results.
3. **Fill the gap to today.** Search `"<subject> <month> <year>"`, `"<subject> announces"`,
   `"<year> in <field>" wikipedia`. Check model/product pages for exact dates.
4. **Numbers.** Prefer officially stated figures with a date ("900M weekly users, 2026-02-27").
   Estimates from third parties get a source line on screen ("数据：UBS / Similarweb 估算").
5. **Contested or self-reported claims.** Attribute ("OpenAI 公布…"), and tell the user they are
   not peer reviewed or independently confirmed.
6. **Omissions.** Negative events (shutdowns, lawsuits, incidents) usually do not fit an anthem film.
   Leave them out deliberately and list them in the report so the user can decide.

## Precision rules

- Use the precision you can defend: `2015.12` when sources disagree about the day
  (announcement vs incorporation), full dates only when the official page shows them.
- Eyebrow format: `YYYY.MM · Name` or `YYYY.MM.DD · Name`; ranges `2017 – 2019`, `2025.11 → 2026.04`.
- The progress bar's `year` per scene must be monotonic and match the eyebrow.

## Deliverable: the timeline document

Write `output/时间线_vN.md`: a table with film timecode, event date, on-screen claim, source URL.
Generate the timecodes from `timeline.json` with a short script so they never drift from the cut.
Paste the table into the final reply as well when the user asked about the timeline.
