---
name: comfyui-2d-character-pipeline
description: >
  Drive the mor-o/comfyui-2d-character-pipeline on a local ComfyUI install to produce
  2D game sprite sheets: mannequin base motion (W2/W3) plus layered cosmetics (W4/W5).
  Prefer the layered path over full-character i2v for production quality. Use when the
  user asks for 2D sprites, character animation sheets, idle/walk/run/attack sprites,
  cosmetic layers (hair/eyes/clothes), ComfyUI character pipeline, WAN i2v sprite
  extraction, or /comfyui-2d-character-pipeline. Also use when validating sprite quality
  or converting a single character image into aligned base + layer sheets.
metadata:
  origin: custom (validated on local ComfyUI_windows_portable)
  license: MIT (upstream pipeline)
  upstream: https://github.com/mor-o/comfyui-2d-character-pipeline
---

# ComfyUI 2D Character Animation Pipeline

Harness-driven **API workflows** that turn a character setup into **horizontal greyscale RGBA sprite sheets** suitable for 2D game runtime composition.

Upstream repo (often already cloned next to ComfyUI):

- `https://github.com/mor-o/comfyui-2d-character-pipeline`
- Local clone (this machine): `F:\ComfyUI_windows_portable\comfyui-2d-character-pipeline`

## When to use

- 2D sprite animation (idle / walk / run / attack / jump)
- Layered character customization (hair, eyes, clothes, armor)
- “Make a game-ready sprite sheet from one image”
- Quality research comparing full-character i2v vs layered base+cosmetics

## When NOT to use

- Photoreal video / cinematic shots → use video-direction / WAN/LTX skills instead
- One-off concept art stills without sheet layout → T2I skills only
- 3D mesh / rig export

## Mental model (read this first)

```
Pipeline 1 — BASE MOTION (featureless mannequin)
  source body still → [W2 WAN i2v] → base.mp4 → [W3 BiRefNet+strip] → base_spritesheet.png (greyscale RGBA)

Pipeline 2 — COSMETIC LAYERS (one feature at a time)
  base.mp4 + cosmetic_ref still → [W4 VACE inpaint] → cosmetic.mp4 → [W5 SAM3 sheet] → layer_spritesheet.png

Runtime: draw base sheet, then stack layers (same cell size / frame count).
```

### Why layers beat “full character i2v”

| Full-character i2v | Layered (recommended) |
|---|---|
| Every frame re-invents face/weapon/armor → identity drift | Motion only on simple body → hard to collapse |
| New outfit = re-generate all anims | Reuse base motion; only redo that layer |
| Hard to tint skin/eyes at runtime | Greyscale base + separate iris/hair sheets |

**Validated finding (this machine):** Official WAN lightx2v Q5 is *slightly* sharper than Q4+LoRA, but does **not** fix identity collapse on full knights. Collapse is architectural (i2v), not mainly quant choice. Prefer layers for production.

## Environment (this workstation)

| Item | Path / value |
|---|---|
| ComfyUI portable | `F:\ComfyUI_windows_portable` |
| Python | `F:\ComfyUI_windows_portable\python_embeded\python.exe` |
| ComfyUI URL | `http://127.0.0.1:8188` |
| Input | `F:\ComfyUI_data\input` |
| Output | `F:\ComfyUI_data\output` |
| Pipeline repo | `F:\ComfyUI_windows_portable\comfyui-2d-character-pipeline` |
| Shared models (extra_model_paths) | `F:\model` + `ComfyUI\models\...` |
| GPU | RTX 4090 24GB (pipeline tuned for ~24GB) |

Launch ComfyUI with I/O dirs (example already used locally):

```text
python_embeded\python.exe -s ComfyUI\main.py --windows-standalone-build
  --output-directory F:\ComfyUI_data\output
  --input-directory F:\ComfyUI_data\input
  --temp-directory F:\ComfyUI_data\temp
  --reserve-vram 1
```

## Required software pieces

1. ComfyUI running and reachable on 8188
2. Custom nodes (see `docs/custom-nodes.md` in pipeline repo):
   - `comfyui_vram_helpers` (in pipeline repo → copy into `custom_nodes/`)
   - `ComfyUI-GGUF`
   - `comfyui_controlnet_aux` (W1)
   - `ComfyUI-RMBG` (BiRefNet + **SAM3Segment**)
3. **`pycocotools`** installed into embedded Python (SAM3Segment fails to load without it):
   ```powershell
   F:\ComfyUI_windows_portable\python_embeded\python.exe -m pip install pycocotools
   ```
4. Models — prefer **official** names (see `references/models-and-paths.md`)

## Default model stack (prefer this)

### W2 video (official)

| Role | File |
|---|---|
| High UNET | `wan2.2_i2v_high_noise_lightx2v_Q5_K_M.gguf` |
| Low UNET | `wan2.2_i2v_low_noise_lightx2v_Q5_K_M.gguf` |
| CLIP | `umt5-xxl-encoder-Q5_K_M.gguf` via `CLIPLoaderGGUF` type=`wan` |
| VAE | `wan_2.1_vae.safetensors` |

Workflow file should match upstream (no separate lightx2v LoRA when using baked GGUFs).

Local workflow (already patched to official):

`comfyui-2d-character-pipeline\workflows\w2-video-gen\workflow_api.json`

### W3 spritesheet

- `BiRefNet_toonout` (auto via RMBG)

### W4 cosmetic inpaint

| Role | File |
|---|---|
| DiT | `Wan2.1_14B_VACE-Q5_K_M.gguf` |
| LoRA | `Wan21_CausVid_14B_T2V_lora_rank32_v2.safetensors` |
| CLIP/VAE | shared with W2 |

### W5 cosmetic sheet

- SAM3 via `SAM3Segment`

Download helper:

```powershell
cd F:\ComfyUI_windows_portable\comfyui-2d-character-pipeline
..\python_embeded\python.exe drivers\download_models.py --comfyui-root F:\ComfyUI_windows_portable\ComfyUI --w2
..\python_embeded\python.exe drivers\download_models.py --comfyui-root F:\ComfyUI_windows_portable\ComfyUI --w4
```

## Agent operating protocol

### 0) Preconditions

1. `GET http://127.0.0.1:8188/system_stats` succeeds
2. Confirm nodes exist: `VRAMUnloadModel`, `UnetLoaderGGUF`, `BiRefNetRMBG`, `SAM3Segment`, `WanVaceToVideo`
3. Free VRAM before heavy jobs: `POST /free` `{"unload_models":true,"free_memory":true}`

### 1) Production path (recommended)

**Goal:** base walk/run/attack mannequin sheets + at least one cosmetic layer.

1. **Keyframe** = featureless body still, 512×512 PNG white bg  
   Sample: `comfyui-2d-character-pipeline\samples\inputs\source_idle_breathing.png`
2. Stage under `F:\ComfyUI_data\input\keyframe_<anim>.png` and  
   `output\character_pipeline\base_animations\<anim>\poses\posed_<anim>_1.png`
3. **W2** — edit knobs at top of `drivers\run_w2_video_gen.py` (`ANIMATION_NAME_BASE`, seed, prompts)  
   - Positive: motion description for mannequin  
   - Negative: **include** face/hair/clothes (keep body featureless)  
   - `NUM_FRAMES` must be `4n+1` (33 default)
4. Run:
   ```powershell
   cd F:\ComfyUI_windows_portable\comfyui-2d-character-pipeline
   ..\python_embeded\python.exe drivers\run_w2_video_gen.py
   ..\python_embeded\python.exe drivers\run_w3_spritesheet.py
   ```
5. **Cosmetic ref** still: same mannequin + ONE feature (e.g. hair only), **512×512 PNG**  
   Do not use JPEG as final ref if avoidable.
6. **W4** — set `SOURCE_VIDEO`, `COSMETIC_REF`, `COSMETIC_NAME`, `ANIMATION_NAME`, `COSMETIC_DESCRIPTION` in `drivers\run_w4_cosmetic_inpaint.py`  
   Start with `RUN_PASS2 = False`; enable pass2 only if pass1 bleeds.
7. **W5** — set matching names + SAM prompt (e.g. `"hair"`) in `drivers\run_w5_cosmetic_spritesheet.py`
8. Deliver:
   - base sheet: `output\character_pipeline\base_animations\<anim>\*_spritesheet_*.png`
   - layer sheet: `output\character_pipeline\cosmetics\<cosmetic>\<anim>\*_spritesheet_*.png`
   - optional composite preview for the user

### 2) Stress-test path (full character) — optional only

Allowed for demos (“does walk look alive?”) but **not** the production default:

- Combat-ready keyframe (sword raised) via Qwen Image Edit if needed
- Identity-preserving prompts (do **not** negative face/armor)
- Expect residual drift; report honestly

Demo driver (knight combat set): `drivers\run_knight_combat_set.py`  
Layered demo driver: `drivers\run_demo_layered.py`  
Model A/B walk: `drivers\run_ab_models_walk.py`

### 3) Output layout

```
F:\ComfyUI_data\output\character_pipeline\
  base_animations\<anim>\
    poses\posed_*.png
    <anim>_NNNNN_.mp4
    <anim>_spritesheet_NNNNN_.png
  cosmetics\<cosmetic>\<anim>\
    pass1\*.mp4
    pass2\*.mp4          # if run
    masks\*.png
    <cosmetic>_<anim>_spritesheet_*.png
```

## Prompt rules

### Base mannequin (W2)

- Positive: pose + motion + “featureless / no face / no clothes” + white bg + line art
- Negative: face, eyes, hair, clothing, props, ground shadow, camera move, leaving frame

### Full character demo (W2)

- Positive: identity lock (colors, props) + motion
- Negative: **do not** ban face/clothes; ban warp, extra limbs, identity change, ground clutter

### Cosmetic (W4 text / SAM)

- SAM / description names the **region** (`hair`, `eyes`, `shirt`), not only the color
- VACE positive can mention color/style (`pink anime hair`)

## Known pitfalls (local validations)

1. **ComfyUI 0.28 RAMPressureCache crash** — `cache_entry is None` in `comfy_execution/caching.py`  
   Guard: skip `None` entries (local patch may already exist). Restart if `prompt_worker` dies.
2. **SAM3Segment missing** → install `pycocotools`, restart ComfyUI
3. **W3 SaveImage missing in JSON** → driver appends stitch chain dynamically; always run via driver
4. **Silhouette-dramatic cosmetics** (bald → waist-length hair) often fail with single still ref — pipeline docs note this; prefer modest silhouette change or pass2 + seed sweep
5. **Drivers point at `F:/ComfyUI_data`** — keep ComfyUI launched with matching input/output dirs
6. **NUM_FRAMES** must match between W2/W3/W4/W5 and satisfy WAN `4n+1`
7. After large model downloads, confirm files appear in `object_info` lists (restart if not)

## Quality bar for “done”

- Sheet size: `NUM_FRAMES * 128` × `128` (default 4224×128)
- Base: greyscale RGBA, character alpha clean on white-removed bg
- Layers: same dimensions as paired base; stack without re-align
- Show user: mp4 (motion) + spritesheet + optional composite
- Prefer layered results for “game ready”; full-character only as motion reference

## References

- `references/models-and-paths.md` — model files, download commands, local layout
- `references/layered-workflow.md` — why layers, pass1/pass2 notes, demo paths
- Upstream docs in pipeline clone: `docs/pipeline-overview.md`, `docs/workflow-*.md`

## Agent checklist (copy)

```
[ ] ComfyUI up on 8188
[ ] Official W2 GGUFs + umt5 GGUF visible
[ ] SAM3Segment loads (pycocotools)
[ ] Mannequin keyframe 512 PNG staged
[ ] W2 → W3 base sheet OK
[ ] Cosmetic ref 512 PNG (one feature)
[ ] W4 pass1 (pass2 if bleed)
[ ] W5 layer sheet aligned
[ ] Paths reported to user under F:\ComfyUI_data\output\character_pipeline\
```
