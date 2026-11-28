"""Objective checks on build/music.wav, since the score cannot be listened to:
per-scene loudness (must climb with the story), crest factor (punch; <8 dB = over-squashed),
band balance, and a beat-folded envelope showing where transients land on the 16th grid."""
import json, wave, numpy as np
from scipy.signal import butter, sosfilt
w = wave.open('build/music.wav'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2).mean(1) / 32768
tl = json.load(open('video/src/timeline.json')); beat = 60 / tl['bpm']; t = 0
print(f"{'scene':<12}lvl  rms   crest | <150Hz 150-600 600-2.5k 2.5-8k >8k (dB rel.)")
for s in tl['scenes']:
    seg = x[int(t * sr):int((t + s['dur']) * sr)]
    S = np.abs(np.fft.rfft(seg * np.hanning(len(seg)))) ** 2; f = np.fft.rfftfreq(len(seg), 1 / sr); tot = S.sum()
    bands = ' '.join(f"{10 * np.log10(S[(f >= a) & (f < b)].sum() / tot):6.1f}" for a, b in [(20, 150), (150, 600), (600, 2500), (2500, 8000), (8000, 20000)])
    rms = np.sqrt((seg ** 2).mean())
    print(f"{s['id']:<12}L{s['level']} {20 * np.log10(rms):6.1f} {20 * np.log10(np.abs(seg).max() / rms):5.1f} | {bands}")
    t += s['dur']
xh = np.abs(sosfilt(butter(2, 3000, 'high', fs=sr, output='sos'), x)); P = int(beat * sr)
mid = int(round(t * 0.7 / (4 * beat)) * 4 * beat * sr); seg = xh[mid:mid + 24 * P]; prof = seg[:len(seg) // P * P].reshape(-1, P).mean(0)
nb = 16; prof = prof[:len(prof) // nb * nb].reshape(nb, -1).mean(1)
print('\nHF envelope folded on one beat (16 bins; expect the biggest peaks on bin 0 = downbeat and bin 8 = offbeat 8th, smaller ones on 4 and 12):')
print(' '.join(f"{v * 1000:4.0f}" for v in prof))
