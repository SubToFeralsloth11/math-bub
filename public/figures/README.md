# Geometry figures

This directory holds the generated geometry figure images, named by figure id
(for example `congruent-triangles-sss.png`).

The images are produced externally from the prompt set in
`.local/specs/001-math-learning-platform/figures/prompts.md`. Run those prompts
through an image model and drop the resulting PNG files here, matching the target
filenames listed in the manifest.

Until an image is present, MathBub shows the figure's text-description fallback
in its place, so every lesson and question remains fully usable without the
artwork.
