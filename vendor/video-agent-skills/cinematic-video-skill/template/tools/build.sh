#!/bin/bash
# Full pipeline: fonts -> music -> layout QA (must be 0 fails) -> render -> mux -> share copy.
# Long steps: run this with nohup / in background and wait on the PID, never on `pgrep -f` of the command text.
set -e
cd "$(dirname "$0")/.."
NAME=${1:-film}
bash tools/subset_fonts.sh
.venv/bin/python tools/music.py
(cd video && node qa.mjs | grep -v "^\[Tab" | tee ../build/qa.log)
grep -q "FAILS 0 /" build/qa.log || { echo "LAYOUT QA FAILED - fix before rendering"; exit 1; }
(cd video && npx remotion render src/index.ts Film ../build/video_noaudio.mp4 --concurrency=4 --timeout=120000)
ffmpeg -v error -y -i build/video_noaudio.mp4 -i build/music.wav -map 0:v -map 1:a -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart output/$NAME.mp4
ffmpeg -v error -y -i output/$NAME.mp4 -vf scale=1280:720:flags=lanczos -c:v libx264 -preset slow -b:v 650k -maxrate 1000k -bufsize 2000k -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output/${NAME}_720p.mp4
for f in output/$NAME.mp4 output/${NAME}_720p.mp4; do ffprobe -v error -show_entries format=duration,size -of compact "$f"; done
