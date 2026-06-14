---
name: openai-image
description: Generate and edit images with OpenAI's gpt-image models (gpt-image-2 and family) via the OpenAI API. Use when asked to create, generate, render, edit, inpaint, or produce an image, picture, illustration, logo, or icon from a text prompt. Trigger keywords include "generate an image", "create a picture", "gpt-image", "OpenAI image", "edit this image", "inpaint".
---

# OpenAI image generation

Generate images from a text prompt, or edit existing images, using OpenAI's
gpt-image models. The model always returns base64 data, which the script
decodes and writes to disk for you.

## Setup

Requires an OpenAI API key with access to the gpt-image models.

1. Create a key at https://platform.openai.com/api-keys
2. Add it to your shell profile (`~/.profile`, or `~/.zprofile` for zsh):
   ```bash
   export OPENAI_API_KEY="sk-..."
   ```

`uv` runs the script and installs its dependencies automatically on first use;
no manual `pip install` step is needed.

## Generate

```bash
{baseDir}/scripts/generate.py "a watercolour fox in a snowy forest"
{baseDir}/scripts/generate.py "company logo, minimal, flat" -o logo.png --size 1024x1024 --quality high
{baseDir}/scripts/generate.py "app icon, rounded" -o icon.png --background transparent
{baseDir}/scripts/generate.py "concept sketch" -n 4 -o sketch.png   # writes sketch-1.png ... sketch-4.png
```

## Edit

Pass one or more input images with `--edit`. Add a `--mask` (a PNG whose fully
transparent areas mark the region to change) for inpainting.

```bash
{baseDir}/scripts/generate.py "add a red scarf" --edit photo.png -o edited.png
{baseDir}/scripts/generate.py "replace the sky with a sunset" --edit photo.png --mask sky-mask.png -o edited.png
{baseDir}/scripts/generate.py "combine these into one scene" --edit a.png b.png c.png -o combined.png
```

The mask must have the same dimensions as the first input image. Up to 16 input
images are supported.

## Options

- `--model` - default `gpt-image-2`. Alternatives: `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`.
- `--size` - `auto` (default), `1024x1024`, `1536x1024` (landscape), `1024x1536` (portrait), or any size meeting the model constraints (edges multiples of 16, ≤ 3840px, aspect ratio ≤ 3:1).
- `--quality` - `auto` (default), `low`, `medium`, `high`. Higher quality costs more and is slower.
- `-n` - number of images (default 1).
- `--background` - `auto`, `transparent`, or `opaque`. Transparency requires png or webp output.
- `--output-format` - `png` (default), `jpeg`, `webp`. Inferred from the `-o` extension if not set.
- `--compression` - 0 to 100, for jpeg or webp output only.
- `--moderation` - `auto` (default) or `low` (generation only).

## Timeouts

Generation can be slow — always use a generous timeout when invoking the script
via `bash`:

- `--quality low`: 60 seconds.
- `--quality medium`: 180 seconds (3 minutes).
- `--quality high`: 300 seconds (5 minutes).

Higher resolutions (above 1024x1024) and complex prompts can push these higher.
If a command times out, retry with `--quality medium` which usually completes
within 2–3 minutes with good results.

## Post-generation optimisation

Images from gpt-image models are PNGs that are often 3–4 MB each — too large for
web delivery. Always run an optimisation step after generation.

### Lossless PNG compression

For PNG output, use `optipng` at its highest optimisation level:

```bash
optipng -o5 output.png
```

This typically saves 7–11% with no quality loss.

### WebP conversion (recommended)

For web delivery, convert to WebP which is typically 85–90% smaller than the
original PNG with negligible quality loss:

```bash
cwebp -q 80 input.png -o output.webp
```

The `-q` flag sets quality (0–100). Use 80 as a good balance of size and
fidelity; use 90 for high-detail illustrations.

When using WebP, ensure the consuming code tries `.webp` first with a `.png`
fallback so existing PNG assets remain supported.

### Batch optimisation

To convert a set of PNGs to optimised WebP in one pass:

```bash
for f in *.png; do
  cwebp -q 80 "$f" -o "${f%.png}.webp"
done
rm *.png  # remove originals after verifying the WebP output
```

## 1Password integration

If the `OPENAI_API_KEY` environment variable holds an `op://` reference (e.g.
`op://Lem/OpenAI API Key/password`), wrap invocations with `op run`. You may
need to blank out other `op://` variables that reference vaults not present on
the current machine:

```bash
SONAR_TOKEN="" OTHER_VAR="" op run -- uv run {baseDir}/scripts/generate.py "prompt" -o output.png
```

## Notes

- Output format is taken from the `-o` file extension unless `--output-format` is given.
- Be specific in prompts: subject, style, composition, lighting, and colour palette all steer the result.
- Generation can take from a few seconds to over a minute at high quality; the script prints the saved path on completion.
