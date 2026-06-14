#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["openai>=2.9"]
# ///
#
# Generate or edit images with OpenAI's gpt-image models.
#
# Author: John Grimes.

"""Command-line wrapper around the OpenAI Images API for gpt-image models.

The script generates images from a text prompt, or edits existing images
(optionally guided by a mask), and writes the decoded results to disk. The
gpt-image family always returns base64-encoded image data, so the response is
decoded locally rather than fetched from a URL.
"""

import argparse
import base64
import sys
from pathlib import Path

from openai import OpenAI, OpenAIError

# Formats inferred from common output file extensions.
EXTENSION_FORMATS = {
    ".png": "png",
    ".jpg": "jpeg",
    ".jpeg": "jpeg",
    ".webp": "webp",
}


def parse_args(argv: list[str]) -> argparse.Namespace:
    """Parse command-line arguments.

    :param argv: The argument list, excluding the program name.
    :returns: The parsed arguments namespace.
    """
    parser = argparse.ArgumentParser(
        description="Generate or edit images with OpenAI gpt-image models.",
    )
    parser.add_argument("prompt", help="Text description of the desired image.")
    parser.add_argument(
        "-o",
        "--output",
        default="image.png",
        help="Output file path. With -n > 1, an index is inserted before the "
        "extension (default: image.png).",
    )
    parser.add_argument(
        "--model",
        default="gpt-image-2",
        help="Model to use (default: gpt-image-2).",
    )
    parser.add_argument(
        "--size",
        default="auto",
        help="Image size such as 1024x1024, 1536x1024 or 1024x1536, or 'auto' "
        "(default: auto).",
    )
    parser.add_argument(
        "--quality",
        default="auto",
        choices=["auto", "low", "medium", "high"],
        help="Rendering quality (default: auto).",
    )
    parser.add_argument(
        "-n",
        "--number",
        type=int,
        default=1,
        help="Number of images to generate (default: 1).",
    )
    parser.add_argument(
        "--background",
        choices=["auto", "transparent", "opaque"],
        help="Background handling. Use 'transparent' with png or webp output.",
    )
    parser.add_argument(
        "--output-format",
        choices=["png", "jpeg", "webp"],
        help="Returned image format. Defaults to the format implied by the "
        "output file extension, else png.",
    )
    parser.add_argument(
        "--compression",
        type=int,
        help="Compression level from 0 to 100 for jpeg or webp output.",
    )
    parser.add_argument(
        "--moderation",
        choices=["auto", "low"],
        help="Content moderation strictness for generation (default: auto).",
    )
    parser.add_argument(
        "--edit",
        nargs="+",
        metavar="IMAGE",
        help="Switch to edit mode using one or more input images (up to 16).",
    )
    parser.add_argument(
        "--mask",
        help="Optional PNG mask for edit mode. Fully transparent areas mark "
        "where the first input image should be changed.",
    )
    return parser.parse_args(argv)


def resolve_output_format(args: argparse.Namespace) -> str:
    """Determine the returned image format.

    The explicit ``--output-format`` flag wins; otherwise the format is inferred
    from the output file extension, defaulting to png.

    :param args: The parsed arguments namespace.
    :returns: One of "png", "jpeg" or "webp".
    """
    if args.output_format:
        return args.output_format
    suffix = Path(args.output).suffix.lower()
    return EXTENSION_FORMATS.get(suffix, "png")


def build_request(args: argparse.Namespace, output_format: str) -> dict:
    """Assemble the keyword arguments common to generation and editing.

    Only non-default options are included so the API applies its own defaults
    for anything the caller did not set.

    :param args: The parsed arguments namespace.
    :param output_format: The resolved returned image format.
    :returns: A dictionary of request keyword arguments.
    """
    request: dict = {
        "model": args.model,
        "prompt": args.prompt,
        "n": args.number,
        "output_format": output_format,
    }
    if args.size != "auto":
        request["size"] = args.size
    if args.quality != "auto":
        request["quality"] = args.quality
    if args.background:
        request["background"] = args.background
    if args.compression is not None:
        request["output_compression"] = args.compression
    return request


def output_paths(template: str, count: int) -> list[Path]:
    """Compute the output file paths for the generated images.

    A single image keeps the template path unchanged. Multiple images insert a
    one-based index before the file extension (e.g. image-1.png, image-2.png).

    :param template: The output path template.
    :param count: The number of images being written.
    :returns: A list of paths, one per image.
    """
    path = Path(template)
    if count == 1:
        return [path]
    return [path.with_name(f"{path.stem}-{i + 1}{path.suffix}") for i in range(count)]


def run(args: argparse.Namespace) -> int:
    """Execute the request and write the resulting images to disk.

    :param args: The parsed arguments namespace.
    :returns: A process exit code (0 on success).
    """
    client = OpenAI()
    output_format = resolve_output_format(args)
    request = build_request(args, output_format)

    if args.edit:
        # Edit mode passes the input images as open file handles. The mask, when
        # supplied, marks the editable region of the first image.
        images = [open(p, "rb") for p in args.edit]
        try:
            if args.mask:
                request["mask"] = open(args.mask, "rb")
            response = client.images.edit(image=images, **request)
        finally:
            for handle in images:
                handle.close()
            if request.get("mask"):
                request["mask"].close()
    else:
        if args.moderation:
            request["moderation"] = args.moderation
        response = client.images.generate(**request)

    paths = output_paths(args.output, len(response.data))
    for item, path in zip(response.data, paths):
        path.write_bytes(base64.b64decode(item.b64_json))
        print(f"Saved {path.resolve()}")
    return 0


def main() -> int:
    """Entry point.

    :returns: A process exit code.
    """
    args = parse_args(sys.argv[1:])
    try:
        return run(args)
    except OpenAIError as error:
        print(f"OpenAI API error: {error}", file=sys.stderr)
        return 1
    except OSError as error:
        print(f"File error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
