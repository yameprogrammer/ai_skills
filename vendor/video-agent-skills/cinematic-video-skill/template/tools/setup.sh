#!/bin/bash
# One-time project setup: node deps, python venv, source fonts.  Run from the project root.
set -e
export PATH=$HOME/.local/bin:$PATH
# Reuse an existing node_modules via hard links if one is around (638 MB, saves minutes); else npm i.
if [ -n "$REUSE_NODE_MODULES" ] && [ -d "$REUSE_NODE_MODULES" ]; then cp -al "$REUSE_NODE_MODULES" video/node_modules; else (cd video && npm i); fi
[ -x .venv/bin/python ] || { uv venv -q .venv && uv pip install -q -p .venv numpy scipy fonttools brotli pillow; }
mkdir -p fonts build output video/public/fonts
cd fonts
[ -f NotoSansSC.ttf ] || curl -sL -o NotoSansSC.ttf "https://github.com/google/fonts/raw/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf"
[ -f Inter.ttf ]      || curl -sL -o Inter.ttf "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf"
[ -f JBMono.ttf ]     || curl -sL -o JBMono.ttf "https://github.com/google/fonts/raw/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf"
file *.ttf
