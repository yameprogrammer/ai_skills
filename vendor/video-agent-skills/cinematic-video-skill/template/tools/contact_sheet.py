"""Build 2x2 contact sheets from QA stills (build/qa/<id>_{a,b}.jpg) so every scene can be eyeballed.
Usage: .venv/bin/python tools/contact_sheet.py [a|b]   -> build/qa/sheet{suffix}_N.jpg"""
import json, subprocess, sys
suf = sys.argv[1] if len(sys.argv) > 1 else 'b'
ids = [s['id'] for s in json.load(open('video/src/timeline.json'))['scenes']]
for k in range(0, len(ids), 4):
    grp = ids[k:k + 4]; ins = []
    for g in grp: ins += ['-i', f'build/qa/{g}_{suf}.jpg']
    while len(grp) < 4: ins += ['-f', 'lavfi', '-i', 'color=black:s=1920x1080']; grp.append('x')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex',
        '[0]scale=960:540[a];[1]scale=960:540[b];[2]scale=960:540[c];[3]scale=960:540[d];[a][b][c][d]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0',
        f'build/qa/sheet{suf}_{k // 4}.jpg'], check=True)
print('sheets written to build/qa/')
