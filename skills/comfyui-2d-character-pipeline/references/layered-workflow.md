# Layered workflow notes

## Why split base vs cosmetics

- **Base** carries motion only (idle/walk/run/attack) on a featureless body.
- **Cosmetics** are still-image-defined features painted/extracted per layer.
- Runtime stacks equal-layout sheets → customization without re-animating.

## W4 two-pass bootstrap (summary)

1. **Pass 1:** SAM3 on cosmetic **still** → static mask → VACE inpaint base video (rough OK).
2. **Pass 2 (optional):** SAM3 per-frame on pass1 video → tight masks → VACE on original base (clean).

Skip pass2 when pass1 has no color bleed. Enable when halo/bleed visible.

## Hard limits

- Cosmetic ref must be **512×512 PNG** when possible.
- One feature per layer (hair **or** shirt **or** eyes).
- Large silhouette change (no hair → waist-length) is poorly supported with a single still.
- SAM3 and VACE must not both sit in VRAM; workflows use unload nodes + `/free` between passes.

## Demo artifacts from validation

```
F:\ComfyUI_data\output\character_pipeline\cosmetics\_demo_layered\
  0_hair_reference_still.png
  1_base_mannequin_sheet.png
  2_hair_layer_sheet.png
  base_plus_hair_preview.png
  base_walk.mp4
  walk_with_hair_pass1.mp4
```

```
F:\ComfyUI_data\output\character_pipeline\base_animations\
  mannequin_walk\
  knight_combat_walk|run|attack\   # full-character stress tests
  ab_q4_lora\  ab_q5_official\     # model A/B
```

## Drivers

| Script | Purpose |
|---|---|
| `drivers/run_w2_video_gen.py` | Base i2v |
| `drivers/run_w3_spritesheet.py` | Base greyscale strip |
| `drivers/run_w4_cosmetic_inpaint.py` | Cosmetic paint (pass1/2) |
| `drivers/run_w5_cosmetic_spritesheet.py` | Cosmetic-only strip |
| `drivers/run_demo_layered.py` | End-to-end layered demo |
| `drivers/run_knight_combat_set.py` | Full-character combat set |
| `drivers/run_ab_models_walk.py` | Q4+LoRA vs official Q5 A/B |
