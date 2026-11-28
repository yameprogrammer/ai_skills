#!/bin/bash
# Re-run after ANY copy change: subsets fonts to exactly the characters used in the scenes (CJK font 17 MB -> ~250 KB).
set -e
cd "$(dirname "$0")/.."
cat video/src/*.tsx video/src/*.json | .venv/bin/python -c "
import sys; s=sys.stdin.read(); ch=set(c for c in s if ord(c)>127)
ch|=set(chr(i) for i in range(32,127)); ch|=set('，。、：；！？“”‘’（）…—–·→×✓●≈∞+%')
open('build/chars.txt','w').write(''.join(sorted(ch)))"
for f in NotoSansSC:NotoSC Inter:Inter JBMono:JBMono; do
  .venv/bin/pyftsubset fonts/${f%%:*}.ttf --text-file=build/chars.txt --flavor=woff2 --layout-features='*' --output-file=video/public/fonts/${f##*:}.woff2
done
ls -la video/public/fonts
