# Score and Sound Design

The score is synthesized in numpy (`template/tools/music.py`), driven by `video/src/timeline.json`.
It produces `build/music.wav` (44.1 kHz stereo) with exactly the film's length.

## Harmonic and tempo frame

- 120 BPM so one bar is exactly 2 s and every even-second cut lands on a downbeat.
- Key D major, loop Bm–G–D–A (vi–IV–I–V: uplifting, "anthem"). Two bars per chord at levels ≤ 2,
  one bar per chord from level 3 (harmonic rhythm accelerates with the story).
- Anthem lead: one 4-beat phrase per chord with dotted and pickup rhythms, enters at level 4, doubled
  an octave up at level 6+.

## Rhythm-first arrangement

A flat, all-downbeats arrangement reads as "no groove". The rhythm has to be built deliberately:

- **Syncopation.** A 3-3-2 pattern on the 16th grid (steps 0, 3, 6, 8, 11, 14) for the arp at L1–2,
  and as accents inside the 16th arp at L3+. The piano ostinato accents 8ths 0, 3, 6.
- **Kick.** L1 uses a half-time heartbeat (steps 0, 6, 10). L2+ is four-on-the-floor, with a pickup kick
  on step 14 every 4 bars at L3+.
- **Bass.** L2 is an offbeat pump (steps 2, 6, 10, 14), L3+ a rolling "da-da-DUM" (every 16th except the
  downbeat), L5+ adds octave jumps on the "and".
- **Hats.** 16ths with an offbeat-accent velocity curve `[0.42, 0.3, 0.95, 0.32]`, plus light swing
  (+18 ms on odd 16ths). Open hats on the offbeats from L4, a shaker from L5.
- **Backbeat.** Snare and clap layered on 2 and 4 from L3, and ghost snares on steps 7, 10, 15 at L4+.
- **Punctuation.** A tom-and-snare fill in the last beat of every scene (L3+) marks each cut. The bar
  before an act card has an 8th-note snare roll, and the card itself has an accelerating 32nd roll with
  a riser, then an impact (boom + crash) on the next scene's downbeat.
- **Sidechain pump.** Pad and bass duck up to about 72% on each kick (τ ≈ 0.13 s), the arp partly.

## Mix and master

- Sends: short noise-IR reverb (2 s). Keep the snare send small or the backbeat smears.
- Loudness automation per level, smoothed over 1 s: 0.55 → 1.10 gain across levels 0–7, with cards at 0.9×.
- Normalize to the 99.95th percentile, then gentle `tanh` (drive 1.15). Heavy saturation (drive 1.7)
  squashed the crest factor to about 8 dB and killed the punch.
- Fade the last 3 s. The outro rings a big D-major chord for about 12 s.

## Objective checks (you cannot listen)

Run `.venv/bin/python tools/audio_check.py` and check:

- Scene RMS climbs act by act (for example −22 dB prologue → −9 dB finale), and dips on act cards.
- Crest factor is ≥ about 9 dB in loud sections. Lower means over-compressed.
- Band balance: sub (<150 Hz) should not dwarf everything. If the low band is within 1–2 dB of the
  total, the mids will be thin on laptop speakers, so cut the kick and sub and raise the pad, arp and lead.
- The beat-folded high-frequency envelope peaks on the 16th grid, with the strongest peak on the offbeat 8th.

Report honestly that the feel was verified by analysis only, and invite the user to judge it by ear.
Avoid `np.convolve` with long kernels on full-length audio (it hangs for minutes). Use a cumulative-sum
moving average or `scipy.signal.oaconvolve`.
