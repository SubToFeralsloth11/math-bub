# Figures

This directory holds the generated figure images for every subject, named by
figure id (for example `animal-cell-diagram.webp`,
`tenochtitlan.webp`, `congruent-triangles-sss.webp`).

The images are produced externally by the gpt-image OpenAI model using the
`openai-image` skill at `.agents/skills/openai-image/`. Each figure is then
converted from PNG to WebP at quality 80 (via `cwebp`) for web delivery, giving
roughly a 90% size reduction with no visible quality loss.

The `Figure` component tries `<id>.webp` first and falls back to `<id>.png`, then
to a labelled text description, so lessons and questions remain fully usable
even when the artwork is missing.

## Authoring a new figure

1. Add a `Figure` entry to the relevant track file in `src/content/tracks/`.
   The `id` becomes the asset filename stem.
2. Reference it from a `learnCard.figure` (or `question.figure`) field.
3. Generate the image with the openai-image skill. Aim for a white background,
   bold labels, and a clean textbook style consistent with the existing
   figures.
4. Convert the PNG to WebP with `cwebp -q 80 input.png -o <id>.webp` and copy
   the result here.
5. Add the new `Figure` to the track's exported `*Figures` array (e.g.
   `biologyFigures`) so the content test's manifest check passes.
