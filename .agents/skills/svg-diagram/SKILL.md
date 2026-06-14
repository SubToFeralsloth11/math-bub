---
name: svg-diagram
description: Create architecture diagrams, flowcharts, system diagrams, and technical illustrations as SVG files. Use when asked to create a diagram, draw an architecture, illustrate a system, or produce a flowchart. Trigger keywords include diagram, flowchart, architecture diagram, system diagram, draw, illustrate, SVG diagram.
---

# SVG diagram creation

Create technical diagrams as standalone SVG files. Produce clean, hand-crafted
SVG markup — do not use external libraries or tools.

## Colour palette

Use this pastel rainbow palette for all diagrams:

| Colour        | Hex       | Use for                              |
| ------------- | --------- | ------------------------------------ |
| Pastel red    | `#ffb3ba` | Alerts, errors, destructive actions  |
| Pastel orange | `#ffdfba` | Warnings, external systems, APIs     |
| Pastel yellow | `#ffffba` | Highlights, notes, decisions         |
| Pastel green  | `#baffc9` | Success, data stores, outputs        |
| Pastel blue   | `#bae1ff` | Primary components, services, inputs |

Additional colours:

- **Stroke/border:** `#2d2d2d`
- **Text:** `#1a1a1a`
- **Edge labels / background:** `#ffffff`
- **Connector lines:** `#686868`
- **Arrow heads:** `#2d2d2d`

Assign colours semantically based on component role. Use the pastel blue as the
default when no particular semantic applies.

## Typography

Use Open Sans throughout. Specify it with a sans-serif fallback.

- **Node labels:** `font-family="Open Sans, sans-serif"`,
  `font-weight="bold"`, `font-size="14"`
- **Edge labels:** `font-family="Open Sans, sans-serif"`, `font-size="11"`
- **Group titles:** `font-family="Open Sans, sans-serif"`,
  `font-weight="bold"`, `font-size="16"`

## SVG structure

Follow this structure for every diagram. See
[`assets/example.svg`](assets/example.svg) for a complete reference.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
     viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <!-- Reusable markers, e.g. arrowheads. -->
  </defs>
  <g id="diagram" fill="none" stroke="none">
    <title>{Diagram title}</title>
    <!-- Groups, nodes, connectors, labels. -->
  </g>
</svg>
```

## Node shapes

Render each node as a pair of elements: a filled `<path>` or `<rect>` followed
by an identical stroke-only `<path>` or `<rect>`, then a `<text>` element.

```xml
<g id="Graphic_{id}">
  <!-- Fill. -->
  <rect x="50" y="50" width="180" height="55" rx="6" ry="6"
        fill="#bae1ff"/>
  <!-- Stroke. -->
  <rect x="50" y="50" width="180" height="55" rx="6" ry="6"
        stroke="#2d2d2d" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round"/>
  <!-- Label. -->
  <text x="140" y="83" text-anchor="middle"
        font-family="Open Sans, sans-serif" font-weight="bold" font-size="14"
        fill="#1a1a1a">Component name</text>
</g>
```

For multi-line labels, use multiple `<tspan>` elements with `dy` offsets:

```xml
<text x="140" y="72" text-anchor="middle"
      font-family="Open Sans, sans-serif" font-weight="bold" font-size="14"
      fill="#1a1a1a">
  <tspan x="140" dy="0">First line</tspan>
  <tspan x="140" dy="20">Second line</tspan>
</text>
```

## Connectors

Use `<line>` for straight connectors and `<path>` for curved ones.

### Arrowhead marker

Define once in `<defs>`:

```xml
<marker id="arrowhead" orient="auto" overflow="visible"
        markerUnits="strokeWidth" viewBox="-1 -3 7 6"
        markerWidth="7" markerHeight="6">
  <path d="M 4.8 0 L 0 0 M 0 -1.8 L 4.8 0 L 0 1.8"
        fill="none" stroke="#2d2d2d" stroke-width="1"/>
</marker>
```

### Straight connector

```xml
<line x1="230" y1="77" x2="320" y2="77"
      marker-end="url(#arrowhead)"
      stroke="#686868" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"/>
```

### Curved connector

```xml
<path d="M 230 77 C 275 77, 275 150, 320 150"
      marker-end="url(#arrowhead)"
      stroke="#686868" stroke-width="2" fill="none"
      stroke-linecap="round" stroke-linejoin="round"/>
```

### Edge labels

Place a white background `<rect>` behind each label for readability:

```xml
<g id="Label_{id}">
  <rect x="250" y="65" width="80" height="20" fill="#ffffff"/>
  <text x="290" y="79" text-anchor="middle"
        font-family="Open Sans, sans-serif" font-size="11"
        fill="#1a1a1a">label text</text>
</g>
```

## Grouping (bounding boxes)

Use a stroked `<rect>` with a bold title for logical groups:

```xml
<g id="Group_{id}">
  <rect x="30" y="30" width="400" height="300" rx="6" ry="6"
        stroke="#2d2d2d" stroke-width="2" fill="none"
        stroke-linecap="round" stroke-linejoin="round"/>
  <text x="40" y="50"
        font-family="Open Sans, sans-serif" font-weight="bold" font-size="16"
        fill="#1a1a1a">Group title</text>
</g>
```

## Layout guidelines

- Use a consistent grid. Align node centres to multiples of 20 px.
- Maintain at least 40 px padding between nodes.
- Keep connector paths clear of overlapping nodes.
- Place edge labels at the midpoint of each connector.
- Size the `viewBox` to tightly fit all content with 20 px margin on each side.

## Legend

When a diagram uses more than two colours from the palette, add a legend in the
bottom-left corner showing the colour-to-meaning mapping.

```xml
<g id="Legend" transform="translate(20, {y})">
  <text x="0" y="0" font-family="Open Sans, sans-serif" font-weight="bold"
        font-size="12" fill="#1a1a1a">Legend</text>
  <rect x="0" y="8" width="14" height="14" rx="2" fill="#bae1ff"
        stroke="#2d2d2d" stroke-width="1"/>
  <text x="20" y="20" font-family="Open Sans, sans-serif" font-size="11"
        fill="#1a1a1a">Services</text>
  <!-- Additional legend entries with y offset +22 each. -->
</g>
```

## Rendering a preview

Convert an SVG to a PNG for visual inspection:

```bash
rsvg-convert -w 1600 diagram.svg -o /tmp/diagram-preview.png
```

Install with `brew install librsvg` if not available.

## Workflow

1. Clarify the components, relationships, and flow direction with the user if
   not already clear.
2. Sketch the layout: decide on a grid, assign positions to nodes, and plan
   connector routes.
3. Write the SVG markup following the structure and conventions above.
4. Write the SVG to a file.
5. Render a PNG preview and visually inspect it. Check for:
   - Overlapping nodes or labels.
   - Text cut off or misaligned.
   - Connectors crossing through nodes.
   - Uneven spacing or misaligned elements.
     If issues are found, fix the SVG and re-render until the diagram is correct.
