# Models & paths (local + official)

## Official W2 (prefer)

Download into ComfyUI `models/`:

```powershell
cd F:\ComfyUI_windows_portable\comfyui-2d-character-pipeline
..\python_embeded\python.exe drivers\download_models.py `
  --comfyui-root F:\ComfyUI_windows_portable\ComfyUI --w2
```

| File | Folder |
|---|---|
| `wan2.2_i2v_high_noise_lightx2v_Q5_K_M.gguf` | `models/unet/` |
| `wan2.2_i2v_low_noise_lightx2v_Q5_K_M.gguf` | `models/unet/` |
| `umt5-xxl-encoder-Q5_K_M.gguf` | `models/clip/` or text_encoders |
| `wan_2.1_vae.safetensors` | `models/vae/` |

## Official W4

```powershell
..\python_embeded\python.exe drivers\download_models.py `
  --comfyui-root F:\ComfyUI_windows_portable\ComfyUI --w4
```

| File | Folder |
|---|---|
| `Wan2.1_14B_VACE-Q5_K_M.gguf` | `models/unet/` |
| `Wan21_CausVid_14B_T2V_lora_rank32_v2.safetensors` | `models/loras/` |

## Fallback stack (acceptable, slightly softer)

- UNET: `Wan2.2\Wan2.2-I2V-A14B-HighNoise-Q4_K_M.gguf` + matching Low
- LoRA: `Wan2.2\Wan_2_2_I2V_A14B_*_lightx2v_4step_lora_*.safetensors` strength 1.0
- CLIP: `umt5_xxl_fp8_e4m3fn_scaled.safetensors` via `CLIPLoader` type=`wan`

A/B on this machine: Q5 bake slightly sharper; identity collapse similar on full characters.

## Shared library

`F:\ComfyUI_windows_portable\ComfyUI\extra_model_paths.yaml` points at `F:\model`.
UnetLoaderGGUF / CLIP loaders see both portable `models/` and `F:\model\...`.

## I/O

| Role | Path |
|---|---|
| Input staging | `F:\ComfyUI_data\input` |
| Outputs | `F:\ComfyUI_data\output\character_pipeline\` |
| Pipeline clone | `F:\ComfyUI_windows_portable\comfyui-2d-character-pipeline` |
