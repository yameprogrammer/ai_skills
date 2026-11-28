# Render, Deliver, Revise: Operational Notes

## Environment setup

- Stack: Remotion 4 (React → frames → H.264), headless Chromium, ffmpeg, Python venv (`uv`) with numpy,
  scipy, fonttools and brotli.
- `tools/setup.sh` installs everything. Set `REUSE_NODE_MODULES=/path/to/node_modules` to hard-link an
  existing install (`cp -al`), which is instant.
- Fonts come from `github.com/google/fonts` (Noto Sans SC variable, Inter, JetBrains Mono) and are subset
  to used characters (`tools/subset_fonts.sh`). Re-run after copy changes.

## Rendering

- Speed: about 10 fps at concurrency 4 on a 4-core box, so a 7.5-minute film (13,500 frames) takes about
  22 minutes, plus about 5 minutes to mux.
- Run long steps in the background and wait on the **PID**:
  ```bash
  nohup npx remotion render src/index.ts Film ../build/video_noaudio.mp4 --concurrency=4 --timeout=120000 > ../build/render.log 2>&1 &
  echo $! > ../build/render.pid
  P=$(cat ../build/render.pid); while kill -0 $P 2>/dev/null; do sleep 15; done
  ```
  Tool calls time out at about 10 minutes, so wait in chunks of `timeout 590 bash -c "while kill -0 $P …"`.
- **Never** use `pgrep -f "remotion render"` or `pkill -f …` when that string also appears in your own
  command. It matches your own shell: it either kills your command (exit 144) or reports a finished render as
  still running. Both happened.
- A quick sanity check that a file is complete:
  `ffprobe -show_entries format=duration:stream=nb_frames` (the frame count must match `TOTAL*30`).
- `ffprobe` accepts one input at a time. Loop over files.

## Mux and share copies

```bash
ffmpeg -i build/video_noaudio.mp4 -i build/music.wav -map 0:v -map 1:a -c:v libx264 -crf 20 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -shortest -movflags +faststart output/NAME.mp4
ffmpeg -i output/NAME.mp4 -vf scale=1280:720:flags=lanczos -c:v libx264 -preset slow -b:v 650k -maxrate 1000k \
  -bufsize 2000k -c:a aac -b:a 128k -movflags +faststart output/NAME_720p.mp4   # ≈45 MB for 7.5 min
```

## Delivery

- Copy the master, the 720p copy and the timeline document to the chat output folder, if the environment
  provides one. Always also state the absolute paths on disk: users ask for them.
- The report leads with the outcome (file names, length) and then gives:
  - the structure by act
  - what QA verified (probe `0 / N` plus the eye pass)
  - facts that are self-reported, and deliberately excluded topics
  - that the music feel was checked by analysis, not by ear
- Use a table for the timeline (timecode, date, event) and list the web sources you used.

## Revisions

- Back up before editing: `cp -r video/src build/src_vN_backup; cp tools/music.py build/music_vN.py`.
- Version the output names (`_v2`) and never overwrite the previous delivery.
- Typical revision requests and where they land:
  - "too slow / too fast" → durations in timeline.json + reveal `at` times + typing cps
  - "timeline wrong / extend to today" → research, then timeline.json + new scenes + recap + HUD range + copy
  - "music lacks rhythm" → the arrangement in music.py (syncopation, bass pattern, fills), then less saturation
- After any change, run the full QA (probe + sheets for touched scenes), then a full render.
