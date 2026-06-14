/**
 * Volume track content (Year 8, chapter 4).
 *
 * Covers volume and capacity, and volume of prisms and cylinders - based on
 * the 2026 Year 8 Maths Class Notebook curriculum plan (Term 1, Week 5).
 *
 * @author John Grimes
 * @module content/tracks/volume
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// 4H - Volume and capacity
// ---------------------------------------------------------------------------

const volumeAndCapacity: Lesson = {
  id: "vol-4h-volume-capacity",
  order: 1,
  title: "4H Volume and capacity",
  sourceRef: "4H",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4h-key",
      heading: "Key idea: volume",
      body: [
        t(
          "Volume measures the amount of space inside a three-dimensional object. It is measured in cubic units such as cubic centimetres (cm³) and cubic metres (m³).",
        ),
        t("For a rectangular prism (box), the volume is:"),
        m(String.raw`V = l \times w \times h`),
        t("where l is the length, w is the width, and h is the height."),
        t(
          "Capacity is the amount a container can hold. It is measured in millilitres (mL) and litres (L).",
        ),
        t("The key conversion between volume and capacity is:"),
        m(String.raw`1 \text{ cm}^3 = 1 \text{ mL}`),
        m(String.raw`1000 \text{ cm}^3 = 1 \text{ L}`),
        m(String.raw`1 \text{ m}^3 = 1000 \text{ L} = 1 \text{ kL}`),
      ],
    },
    {
      id: "4h-worked",
      heading: "Worked example",
      body: [
        t(
          "A box is 10 cm long, 5 cm wide and 4 cm high. Find its volume and capacity.",
        ),
        m(String.raw`V = 10 \times 5 \times 4 = 200 \text{ cm}^3`),
        t("Since 1 cm³ = 1 mL, the capacity is 200 mL, or 0.2 L."),
      ],
    },
    {
      id: "4h-mistake",
      heading: "Common mistake: confusing volume with surface area",
      body: [
        t(
          "Volume measures the space inside a shape (in cubic units). Surface area measures the total area of all outside faces (in square units).",
        ),
        t(
          "For a box 10 cm × 5 cm × 4 cm, the volume is 200 cm³. The surface area is 2(10×5 + 10×4 + 5×4) = 2(50 + 40 + 20) = 220 cm².",
        ),
        t(
          "Always check: does the question ask for volume (cm³) or surface area (cm²)? They are completely different measurements.",
        ),
        t(
          "Also be careful with unit conversions - 1 cm³ = 1 mL, but 1 cm² is a unit of area, not capacity.",
        ),
      ],
    },
  ],
  practice: [
    // -- Fluency (10 XP) --
    {
      id: "4h-p1",
      type: "numeric",
      prompt: [
        t(
          "A box is 12 cm long, 8 cm wide and 5 cm high. What is its volume, in cm³?",
        ),
      ],
      explanation: [m(String.raw`V = 12 \times 8 \times 5 = 480 \text{ cm}^3`)],
      xp: 10,
      accepted: ["480"],
    },
    {
      id: "4h-p2",
      type: "numeric",
      prompt: [
        t("How many litres can a container hold if its volume is 3500 cm³?"),
      ],
      explanation: [
        t("Divide by 1000 to convert cm³ to litres:"),
        m(String.raw`3500 \div 1000 = 3.5 \text{ L}`),
      ],
      xp: 10,
      accepted: ["3.5"],
      unit: "L",
    },
    {
      id: "4h-p3",
      type: "mcq",
      prompt: [t("Which of the following is the correct relationship?")],
      explanation: [
        t(
          "1 cm³ is defined as the volume of a cube with 1 cm sides. This cube holds exactly 1 mL of water, so 1 cm³ = 1 mL. The other options confuse units or use the wrong conversion factor.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`1 \text{ cm}^3 = 1 \text{ mL}`)] },
        { id: "b", label: [m(String.raw`1 \text{ cm}^3 = 1 \text{ L}`)] },
        { id: "c", label: [m(String.raw`1 \text{ m}^3 = 1 \text{ mL}`)] },
        { id: "d", label: [m(String.raw`1 \text{ L} = 1 \text{ m}^3`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4h-p4",
      type: "fillInTheBlank",
      prompt: [
        t("Complete the formula for the volume of a rectangular prism."),
      ],
      explanation: [
        t(
          "The volume of a rectangular prism is the product of its length, width and height: V = l × w × h.",
        ),
      ],
      xp: 10,
      template: [t("V = ___")],
      accepted: ["l × w × h", "lwh", "length × width × height", "l * w * h"],
    },
    // -- Problem solving (15 XP) --
    {
      id: "4h-p5",
      type: "numeric",
      prompt: [
        t(
          "A rectangular prism has volume 240 cm³. Its length is 10 cm and its width is 6 cm. Find its height, in cm.",
        ),
      ],
      explanation: [
        m(String.raw`h = 240 \div (10 \times 6)`),
        m(String.raw`h = 240 \div 60 = 4 \text{ cm}`),
        t("Check: 10 × 6 × 4 = 240 cm³."),
      ],
      xp: 15,
      accepted: ["4"],
      unit: "cm",
    },
    {
      id: "4h-p6",
      type: "mcq",
      prompt: [
        t(
          "If you double all three dimensions of a box (length, width and height), its volume becomes:",
        ),
      ],
      explanation: [
        t("Original volume = l × w × h."),
        t("After doubling: (2l) × (2w) × (2h) = 8 × lwh."),
        t(
          "So the volume becomes 8 times larger - each doubling contributes a factor of 2, and 2 × 2 × 2 = 8.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("8 times larger")] },
        { id: "b", label: [t("2 times larger")] },
        { id: "c", label: [t("4 times larger")] },
        { id: "d", label: [t("6 times larger")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4h-p7",
      type: "numeric",
      prompt: [
        t(
          "A fish tank is 60 cm long, 30 cm wide and 40 cm high. What is its capacity in litres? Give your answer to the nearest litre.",
        ),
      ],
      explanation: [
        m(String.raw`V = 60 \times 30 \times 40 = 72000 \text{ cm}^3`),
        t("Divide by 1000 to convert to litres:"),
        m(String.raw`72000 \div 1000 = 72 \text{ L}`),
      ],
      xp: 15,
      accepted: ["72"],
      unit: "L",
    },
    {
      id: "4h-p8",
      type: "mcq",
      prompt: [
        t(
          "A rectangular prism has volume 540 cm³. Its base measures 12 cm by 9 cm. What is its height?",
        ),
      ],
      explanation: [
        t("Base area = 12 × 9 = 108 cm²."),
        m(String.raw`h = 540 \div 108 = 5 \text{ cm}`),
        t("Check: 12 × 9 × 5 = 540 cm³."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("5 cm")] },
        { id: "b", label: [t("6 cm")] },
        { id: "c", label: [t("4 cm")] },
        { id: "d", label: [t("7 cm")] },
      ],
      correctOptionId: "a",
    },
    // -- Enrichment (20 XP) --
    {
      id: "4h-p9",
      type: "shortText",
      prompt: [t("Explain why 1 cm³ equals 1 mL.")],
      explanation: [
        t(
          "By definition, 1 millilitre is the volume of water that fills a cube with 1 cm sides. A cube of side 1 cm has volume 1 cm³. Therefore, 1 cm³ = 1 mL. This is a deliberate match between the metric units of volume and capacity.",
        ),
      ],
      xp: 20,
      accepted: [
        "by definition",
        "a cube of side 1 cm holds exactly 1 mL",
        "1 cubic centimetre is defined as 1 millilitre",
        "they are defined to be equal",
      ],
    },
    {
      id: "4h-p10",
      type: "numeric",
      prompt: [
        t(
          "A swimming pool is 25 m long, 10 m wide, and has an average depth of 2 m. What is its capacity in kilolitres? (1 m³ = 1 kL)",
        ),
      ],
      explanation: [
        m(String.raw`V = 25 \times 10 \times 2 = 500 \text{ m}^3`),
        t("Since 1 m³ = 1000 L = 1 kL:"),
        m(String.raw`500 \text{ m}^3 = 500 \text{ kL}`),
      ],
      xp: 20,
      accepted: ["500"],
      unit: "kL",
    },
  ],
  mastery: [
    {
      id: "4h-m1",
      type: "numeric",
      prompt: [t("A cube has side length 7 cm. What is its volume, in cm³?")],
      explanation: [
        m(String.raw`V = 7 \times 7 \times 7 = 7^3 = 343 \text{ cm}^3`),
        t(
          "A cube is a special case of a rectangular prism where all three dimensions are equal.",
        ),
      ],
      xp: 15,
      accepted: ["343"],
    },
    {
      id: "4h-m2",
      type: "numeric",
      prompt: [
        t(
          "A rectangular prism has volume 360 cm³. Its length is 12 cm and its height is 5 cm. Find the width, in cm.",
        ),
      ],
      explanation: [
        m(String.raw`w = 360 \div (12 \times 5)`),
        m(String.raw`w = 360 \div 60 = 6 \text{ cm}`),
        t("Check: 12 × 6 × 5 = 360 cm³."),
      ],
      xp: 15,
      accepted: ["6"],
      unit: "cm",
    },
    {
      id: "4h-m3",
      type: "mcq",
      prompt: [
        t("A cube with sides of 1 m has volume 1 m³. This is equal to:"),
      ],
      explanation: [
        t(
          "1 m³ = 100 × 100 × 100 = 1,000,000 cm³. Since 1000 cm³ = 1 L, then 1,000,000 ÷ 1000 = 1000 L.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("1000 L")] },
        { id: "b", label: [t("100 L")] },
        { id: "c", label: [t("10 L")] },
        { id: "d", label: [t("1 L")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4h-m4",
      type: "numeric",
      prompt: [
        t(
          "A rectangular water tank is 2 m long, 1.5 m wide and 0.8 m deep. What is its capacity in litres?",
        ),
      ],
      explanation: [
        m(String.raw`V = 2 \times 1.5 \times 0.8 = 2.4 \text{ m}^3`),
        t("Convert to litres:"),
        m(String.raw`2.4 \times 1000 = 2400 \text{ L}`),
      ],
      xp: 15,
      accepted: ["2400"],
      unit: "L",
    },
  ],
};

// ---------------------------------------------------------------------------
// 4I - Volume of prisms and cylinders
// ---------------------------------------------------------------------------

const volumePrismsCylinders: Lesson = {
  id: "vol-4i-prisms-cylinders",
  order: 2,
  title: "4I Volume of prisms and cylinders",
  sourceRef: "4I",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4i-key",
      heading: "Key idea: prism and cylinder volume",
      body: [
        t(
          "A prism is a 3D shape with two identical, parallel ends and a uniform cross-section along its length. Examples include rectangular prisms, triangular prisms and hexagonal prisms.",
        ),
        t(
          "The volume of any prism is the area of its cross-section multiplied by its length (or height):",
        ),
        m("V = A h"),
        t(
          "where A is the cross-sectional area and h is the length (the distance between the two parallel ends).",
        ),
        t("For a cylinder, the cross-section is a circle, so:"),
        m(String.raw`V = \pi r^2 h`),
        t("where r is the radius of the circular end."),
        t("For a triangular prism with base b and triangle height hₜ:"),
        m(String.raw`V = \frac{1}{2} b h_t \times \text{length}`),
      ],
    },
    {
      id: "4i-worked",
      heading: "Worked example",
      body: [
        t(
          "Find the volume of a cylinder with radius 3 cm and height 10 cm. Use π ≈ 3.14.",
        ),
        m(
          String.raw`A = \pi r^2 = 3.14 \times 3^2 = 3.14 \times 9 = 28.26 \text{ cm}^2`,
        ),
        m(String.raw`V = A \times h = 28.26 \times 10 = 282.6 \text{ cm}^3`),
      ],
    },
    {
      id: "4i-mistake",
      heading: "Common mistake: using diameter instead of radius",
      body: [
        t(
          "The formula for the volume of a cylinder uses the radius r, not the diameter.",
        ),
        m(String.raw`V = \pi r^2 h`),
        t(
          "If you are given the diameter, you must halve it first to find the radius:",
        ),
        m(String.raw`r = d \div 2`),
        t(
          "For example, a cylinder with diameter 10 cm and height 8 cm has radius 5 cm, so:",
        ),
        m(
          String.raw`V = 3.14 \times 5^2 \times 8 = 3.14 \times 25 \times 8 = 628 \text{ cm}^3`,
        ),
        t(
          "If you mistakenly use d = 10 in the formula, you would get 3.14 × 100 × 8 = 2512 cm³, which is 4 times too large.",
        ),
      ],
    },
  ],
  practice: [
    // -- Fluency (10 XP) --
    {
      id: "4i-p1",
      type: "numeric",
      prompt: [
        t(
          "Find the volume of a cylinder with radius 5 cm and height 12 cm. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and give your answer in cm³."),
      ],
      explanation: [
        m(String.raw`A = 3.14 \times 5^2 = 3.14 \times 25 = 78.5 \text{ cm}^2`),
        m(String.raw`V = 78.5 \times 12 = 942 \text{ cm}^3`),
      ],
      xp: 10,
      accepted: ["942"],
    },
    {
      id: "4i-p2",
      type: "numeric",
      prompt: [
        t(
          "A triangular prism has a triangular end with base 6 cm and height 4 cm. The prism is 10 cm long. Find its volume, in cm³.",
        ),
      ],
      explanation: [
        t("Cross-sectional area (triangle):"),
        m(String.raw`A = \frac{1}{2} \times 6 \times 4 = 12 \text{ cm}^2`),
        m(String.raw`V = 12 \times 10 = 120 \text{ cm}^3`),
      ],
      xp: 10,
      accepted: ["120"],
    },
    {
      id: "4i-p3",
      type: "mcq",
      prompt: [
        t(
          "Which formula gives the volume of a cylinder with radius r and height h?",
        ),
      ],
      explanation: [
        t(
          "A cylinder is a prism with a circular cross-section. The area of the circular end is πr². Multiplying by the height h gives V = πr²h. The other options are either missing the square on r, are for surface area (2πrh), or are just the area of a circle (πr²).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`V = \pi r^2 h`)] },
        { id: "b", label: [m(String.raw`V = 2 \pi r h`)] },
        { id: "c", label: [m(String.raw`V = \pi r h`)] },
        { id: "d", label: [m(String.raw`V = \pi r^2`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4i-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the general formula for the volume of any prism.")],
      explanation: [
        t(
          "The volume of any prism is the cross-sectional area multiplied by the length. This works for rectangular prisms, triangular prisms, cylinders, and any shape with a uniform cross-section.",
        ),
      ],
      xp: 10,
      template: [t("V = ___ × h")],
      accepted: [
        "A",
        "area of cross-section",
        "cross-sectional area",
        "the cross-sectional area",
        "area",
      ],
    },
    // -- Problem solving (15 XP) --
    {
      id: "4i-p5",
      type: "numeric",
      prompt: [
        t(
          "A cylinder has volume 785 cm³ and radius 5 cm. Find its height using",
        ),
        m(String.raw`\pi \approx 3.14`),
        t(". Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`\pi r^2 = 3.14 \times 25 = 78.5 \text{ cm}^2`),
        m(String.raw`h = 785 \div 78.5 = 10 \text{ cm}`),
        t("Check: 3.14 × 25 × 10 = 785 cm³."),
      ],
      xp: 15,
      accepted: ["10"],
      unit: "cm",
    },
    {
      id: "4i-p6",
      type: "shortText",
      prompt: [
        t(
          "In the formula V = Ah for a triangular prism, the h refers to the length of the prism, while the triangle itself has its own height. Explain how to tell these two heights apart.",
        ),
      ],
      explanation: [
        t(
          "The triangle height (used in ½ × base × height to find A) is the perpendicular distance from the base of the triangle to its opposite vertex. It lies within the triangular end face. The prism length h (in V = Ah) is the distance between the two triangular ends, running along the length of the prism. They are completely different measurements.",
        ),
      ],
      xp: 15,
      accepted: [
        "the length of the prism",
        "the length",
        "the distance between the triangular ends",
        "the distance between the two ends",
      ],
    },
    {
      id: "4i-p7",
      type: "numeric",
      prompt: [
        t(
          "A triangular prism has a right-angled triangle at each end with legs of 8 cm and 6 cm. The prism is 15 cm long. Find its volume, in cm³.",
        ),
      ],
      explanation: [
        t("Area of right-angled triangle:"),
        m(String.raw`A = \frac{1}{2} \times 8 \times 6 = 24 \text{ cm}^2`),
        m(String.raw`V = 24 \times 15 = 360 \text{ cm}^3`),
      ],
      xp: 15,
      accepted: ["360"],
    },
    {
      id: "4i-p8",
      type: "numeric",
      prompt: [
        t(
          "A trapezoidal prism has a cross-sectional area of 18 cm² and a length of 25 cm. What is its volume, in cm³?",
        ),
      ],
      explanation: [
        t("Using V = Ah:"),
        m(String.raw`V = 18 \times 25 = 450 \text{ cm}^3`),
        t(
          "The shape of the cross-section does not matter, as long as it is uniform - the formula V = Ah always applies.",
        ),
      ],
      xp: 15,
      accepted: ["450"],
    },
    // -- Enrichment (20 XP) --
    {
      id: "4i-p9",
      type: "shortText",
      prompt: [
        t(
          "Explain why the formula V = Ah works for any prism, regardless of the shape of the cross-section.",
        ),
      ],
      explanation: [
        t(
          "A prism has the same cross-sectional shape all the way along its length. You can think of it as stacking identical slices of area A on top of each other. If there are h slices, the total volume is A × h. This is similar to how the area of a rectangle is base × height - you are stacking line segments of length b, h times.",
        ),
      ],
      xp: 20,
      accepted: [
        "the cross-section is uniform throughout",
        "all cross-sections have the same area",
        "the shape is the same all the way through",
        "it has a constant cross-section",
        "identical slices stacked together",
      ],
    },
    {
      id: "4i-p10",
      type: "matching",
      prompt: [t("Match each 3D shape to its volume formula.")],
      explanation: [
        t("Cylinder: V = πr²h - a circle cross-section with radius r."),
        t(
          "Triangular prism: V = ½ × b × hₜ × length - half the base times triangle height times length.",
        ),
        t(
          "Rectangular prism: V = l × w × h - all three dimensions multiplied.",
        ),
        t(
          "Any prism: V = A × h - the general formula from which all others are derived.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Cylinder")],
          right: [m(String.raw`V = \pi r^2 h`)],
        },
        {
          id: "b",
          left: [t("Triangular prism")],
          right: [m(String.raw`V = \frac{1}{2} b h_t \times \text{length}`)],
        },
        {
          id: "c",
          left: [t("Rectangular prism")],
          right: [m(String.raw`V = l \times w \times h`)],
        },
        {
          id: "d",
          left: [t("Any prism")],
          right: [m("V = A h")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "4i-m1",
      type: "numeric",
      prompt: [
        t(
          "A hexagonal prism has a cross-sectional area of 42 cm² and a length of 15 cm. What is its volume, in cm³?",
        ),
      ],
      explanation: [
        t("Using V = Ah:"),
        m(String.raw`V = 42 \times 15 = 630 \text{ cm}^3`),
        t(
          "The shape of the cross-section does not matter - the general prism formula always applies.",
        ),
      ],
      xp: 15,
      accepted: ["630"],
    },
    {
      id: "4i-m2",
      type: "numeric",
      prompt: [
        t(
          "Find the volume of a cylinder with diameter 10 cm and height 20 cm. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and give your answer in cm³."),
      ],
      explanation: [
        t("First find the radius: r = 10 ÷ 2 = 5 cm."),
        m(String.raw`V = 3.14 \times 5^2 \times 20 = 3.14 \times 25 \times 20`),
        m(String.raw`V = 3.14 \times 500 = 1570 \text{ cm}^3`),
        t("Always halve the diameter to get the radius before using V = πr²h."),
      ],
      xp: 15,
      accepted: ["1570"],
    },
    {
      id: "4i-m3",
      type: "mcq",
      prompt: [
        t(
          "A cylinder's radius is doubled while its height is halved. Its volume:",
        ),
      ],
      explanation: [
        t("Original: V = πr²h."),
        t("After changes: r → 2r and h → h/2, so:"),
        m(String.raw`V_{\text{new}} = \pi \times (2r)^2 \times \frac{h}{2}`),
        m(String.raw`= \pi \times 4r^2 \times \frac{h}{2} = 2 \pi r^2 h`),
        t(
          "The new volume is 2πr²h, which is twice the original volume. The radius has a squared effect, so doubling it multiplies the volume by 4, but halving the height divides it by 2. The net effect is 4 × ½ = 2.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("doubles")] },
        { id: "b", label: [t("stays the same")] },
        { id: "c", label: [t("quadruples")] },
        { id: "d", label: [t("halves")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4i-m4",
      type: "numeric",
      prompt: [
        t(
          "A cylindrical water tank has a radius of 1.5 m and a height of 4 m. What is its capacity in litres? Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to the nearest litre. (1 m³ = 1000 L)"),
      ],
      explanation: [
        m(String.raw`V = 3.14 \times 1.5^2 \times 4`),
        m(String.raw`= 3.14 \times 2.25 \times 4`),
        m(String.raw`= 3.14 \times 9 = 28.26 \text{ m}^3`),
        t("Convert to litres:"),
        m(String.raw`28.26 \times 1000 = 28260 \text{ L}`),
      ],
      xp: 15,
      accepted: ["28260"],
      unit: "L",
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge
// ---------------------------------------------------------------------------

const volumeChallengeQuestions: Question[] = [
  {
    id: "vol-boss-q1",
    type: "numeric",
    prompt: [
      t(
        "A cylinder and a rectangular prism have equal volumes. The prism measures 10 cm × 8 cm × 15 cm. If the cylinder has radius 5 cm, find its height using",
      ),
      m(String.raw`\pi \approx 3.14`),
      t(". Round your answer to 2 decimal places."),
    ],
    explanation: [
      t("First, find the volume of the rectangular prism:"),
      m(String.raw`V = 10 \times 8 \times 15 = 1200 \text{ cm}^3`),
      t("The cylinder has the same volume. Use V = πr²h to find h:"),
      m(String.raw`1200 = 3.14 \times 5^2 \times h`),
      m(String.raw`1200 = 3.14 \times 25 \times h`),
      m(String.raw`1200 = 78.5 \times h`),
      m(String.raw`h = 1200 \div 78.5 = 15.2866... \approx 15.29 \text{ cm}`),
    ],
    xp: 20,
    accepted: ["15.29"],
    unit: "cm",
  },
  {
    id: "vol-boss-q2",
    type: "numeric",
    prompt: [
      t(
        "A swimming pool is 50 m long, 20 m wide, and its depth slopes linearly from 1 m at the shallow end to 3 m at the deep end. Find the pool's capacity in kilolitres. (1 m³ = 1 kL)",
      ),
    ],
    explanation: [
      t("For a pool with a linear slope, use the average depth:"),
      m(String.raw`\text{average depth} = \frac{1 + 3}{2} = 2 \text{ m}`),
      m(String.raw`V = 50 \times 20 \times 2 = 2000 \text{ m}^3`),
      t("Since 1 m³ = 1 kL:"),
      m(String.raw`2000 \text{ m}^3 = 2000 \text{ kL}`),
    ],
    xp: 20,
    accepted: ["2000"],
    unit: "kL",
  },
  {
    id: "vol-boss-q3",
    type: "numeric",
    prompt: [
      t(
        "A metal pipe is a hollow cylinder 3 m long, with an outer radius of 6 cm and an inner radius of 5 cm. Find the volume of metal in the pipe, in cm³. Use",
      ),
      m(String.raw`\pi \approx 3.14`),
      t(". (Note: the length is 300 cm.)"),
    ],
    explanation: [
      t(
        "The volume of material is the difference between the outer and inner cylinder volumes.",
      ),
      t("Outer volume:"),
      m(
        String.raw`V_{\text{outer}} = 3.14 \times 6^2 \times 300 = 3.14 \times 36 \times 300 = 33912 \text{ cm}^3`,
      ),
      t("Inner volume:"),
      m(
        String.raw`V_{\text{inner}} = 3.14 \times 5^2 \times 300 = 3.14 \times 25 \times 300 = 23550 \text{ cm}^3`,
      ),
      t("Volume of metal:"),
      m(String.raw`V = 33912 - 23550 = 10362 \text{ cm}^3`),
      t("Alternatively, use the difference of squares:"),
      m(
        String.raw`V = 3.14 \times (6^2 - 5^2) \times 300 = 3.14 \times 11 \times 300 = 10362 \text{ cm}^3`,
      ),
    ],
    xp: 25,
    accepted: ["10362"],
  },
  {
    id: "vol-boss-q4",
    type: "numeric",
    prompt: [
      t(
        "A triangular prism has right-angled triangle ends with legs of 6 cm and 8 cm. The prism is 20 cm long. Find its volume, in cm³.",
      ),
    ],
    explanation: [
      t("Area of the right-angled triangle:"),
      m(String.raw`A = \frac{1}{2} \times 6 \times 8 = 24 \text{ cm}^2`),
      t("Volume:"),
      m(String.raw`V = 24 \times 20 = 480 \text{ cm}^3`),
      t(
        "Note: the legs of the right-angled triangle (6 cm and 8 cm) are perpendicular to each other, so either can be the base and the other the height.",
      ),
    ],
    xp: 25,
    accepted: ["480"],
  },
  {
    id: "vol-boss-q5",
    type: "mcq",
    prompt: [
      t(
        "A cylinder's radius is doubled while its height is halved. What happens to its volume?",
      ),
    ],
    explanation: [
      t("Original volume: V = πr²h."),
      t("After the change: r → 2r, h → h/2."),
      m(String.raw`V_{\text{new}} = \pi \times (2r)^2 \times \frac{h}{2}`),
      m(String.raw`= \pi \times 4r^2 \times \frac{h}{2}`),
      m(String.raw`= 2 \pi r^2 h = 2V`),
      t(
        "The radius is squared, so doubling it multiplies the volume by 4. However, halving the height divides the volume by 2. The net effect is 4 × ½ = 2, so the volume doubles.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("It doubles")] },
      { id: "b", label: [t("It stays the same")] },
      { id: "c", label: [t("It quadruples")] },
      { id: "d", label: [t("It halves")] },
    ],
    correctOptionId: "a",
  },
];

// ---------------------------------------------------------------------------
// Track export
// ---------------------------------------------------------------------------

export const volumeTrack: Track = {
  id: "volume",
  subjectId: "maths",
  title: "Volume (Year 8)",
  description:
    "Calculating volume and capacity of prisms and cylinders, including unit conversions.",
  lessons: [volumeAndCapacity, volumePrismsCylinders],
  challenge: {
    id: "volume-boss",
    title: "Boss challenge: Volume",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 5",
    questions: volumeChallengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-volume",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
