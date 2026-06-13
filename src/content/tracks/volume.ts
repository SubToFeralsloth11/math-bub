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

/** 4H - Volume and capacity. */
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
        t("Volume measures the space inside a 3D object. It is measured in cubic units (cm³, m³, km³)."),
        t("For a rectangular prism (box):"),
        m("V = \\text{length} \\times \\text{width} \\times \\text{height}"),
        t("Capacity is the amount a container can hold, measured in millilitres (mL) or litres (L)."),
        t("Key conversion: 1 cm³ = 1 mL, and 1000 cm³ = 1 L."),
      ],
    },
    {
      id: "4h-worked",
      heading: "Worked example",
      body: [
        t("A box is 10 cm long, 5 cm wide and 4 cm high. Find its volume and capacity."),
        m(String.raw`V = 10 \times 5 \times 4 = 200 \text{ cm}^3`),
        t("Capacity: 200 cm³ = 200 mL = 0.2 L."),
      ],
    },
  ],
  practice: [
    {
      id: "4h-p1",
      type: "numeric",
      prompt: [t("A box is 12 cm long, 8 cm wide and 5 cm high. What is its volume, in cm³?")],
      explanation: [m(String.raw`V = 12 \times 8 \times 5 = 480 \text{ cm}^3`)],
      xp: 10,
      accepted: ["480"],
    },
    {
      id: "4h-p2",
      type: "numeric",
      prompt: [t("How many litres can a container hold if its volume is 3500 cm³?")],
      explanation: [t("3500 ÷ 1000 = 3.5 L.")],
      xp: 10,
      accepted: ["3.5"],
      unit: "L",
    },
    {
      id: "4h-p3",
      type: "numeric",
      prompt: [t("A fish tank is 60 cm long, 30 cm wide and 40 cm high. What is its capacity in litres?")],
      explanation: [
        m(String.raw`V = 60 \times 30 \times 40 = 72000 \text{ cm}^3`),
        t("72000 ÷ 1000 = 72 L."),
      ],
      xp: 10,
      accepted: ["72"],
      unit: "L",
    },
    {
      id: "4h-p4",
      type: "mcq",
      prompt: [t("Which is the correct relationship?")],
      explanation: [t("1 cm³ = 1 mL, so 1 m³ = 1,000,000 mL = 1000 L.")],
      xp: 10,
      options: [
        { id: "a", label: [t("1 cm³ = 1 mL")] },
        { id: "b", label: [t("1 cm³ = 1 L")] },
        { id: "c", label: [t("1 m³ = 1 mL")] },
        { id: "d", label: [t("1 L = 1 m³")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4h-m1",
      type: "numeric",
      prompt: [t("A cube has side length 7 cm. What is its volume, in cm³?")],
      explanation: [m(String.raw`V = 7 \times 7 \times 7 = 343 \text{ cm}^3`)],
      xp: 15,
      accepted: ["343"],
    },
    {
      id: "4h-m2",
      type: "numeric",
      prompt: [t("A rectangular prism has volume 240 cm³, length 10 cm and width 6 cm. Find its height, in cm.")],
      explanation: [m(String.raw`h = 240 \div (10 \times 6) = 240 \div 60 = 4 \text{ cm}`)],
      xp: 15,
      accepted: ["4"],
      unit: "cm",
    },
    {
      id: "4h-m3",
      type: "numeric",
      prompt: [t("A swimming pool is 25 m by 10 m and averages 2 m deep. What is its capacity in kilolitres? (1 m³ = 1 kL)")],
      explanation: [
        m(String.raw`V = 25 \times 10 \times 2 = 500 \text{ m}^3`),
        t("500 m³ = 500 kL."),
      ],
      xp: 15,
      accepted: ["500"],
      unit: "kL",
    },
    {
      id: "4h-m4",
      type: "mcq",
      prompt: [t("If you double all three dimensions of a box, its volume becomes:")],
      explanation: [
        t("Volume = l × w × h. Doubling each dimension: (2l) × (2w) × (2h) = 8lwh, so volume increases 8 times."),
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
  ],
};

/** 4I - Volume of prisms and cylinders. */
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
        t("The volume of any prism is the area of its cross-section multiplied by its length (or height):"),
        m("V = Ah"),
        t("For a cylinder, the cross-section is a circle:"),
        m("V = \\pi r^2 h"),
        t("For a triangular prism:"),
        m(String.raw`V = \frac{1}{2} b h_{\text{triangle}} \times \text{length}`),
      ],
    },
    {
      id: "4i-worked",
      heading: "Worked example",
      body: [
        t("Find the volume of a cylinder with radius 3 cm and height 10 cm. Use π ≈ 3.14."),
        m(String.raw`V = 3.14 \times 3^2 \times 10 = 3.14 \times 9 \times 10 = 282.6 \text{ cm}^3`),
      ],
    },
  ],
  practice: [
    {
      id: "4i-p1",
      type: "numeric",
      prompt: [t("Find the volume of a cylinder with radius 5 cm and height 12 cm. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [m(String.raw`V = 3.14 \times 25 \times 12 = 942 \text{ cm}^3`)],
      xp: 10,
      accepted: ["942"],
    },
    {
      id: "4i-p2",
      type: "numeric",
      prompt: [t("A triangular prism has a triangular end with base 6 cm and height 4 cm. The prism is 10 cm long. Find its volume, in cm³.")],
      explanation: [
        t("Area of triangle:"),
        m(String.raw`\frac{1}{2} \times 6 \times 4 = 12`),
        t("Volume:"),
        m(String.raw`12 \times 10 = 120 \text{ cm}^3`),
      ],
      xp: 10,
      accepted: ["120"],
    },
    {
      id: "4i-p3",
      type: "numeric",
      prompt: [t("A cylinder has volume 785 cm³ and radius 5 cm. Find its height using"), m(String.raw`\pi \approx 3.14`), t(". Round to the nearest cm.")],
      explanation: [
        m(String.raw`h = 785 \div (3.14 \times 25) = 785 \div 78.5 = 10 \text{ cm}`),
      ],
      xp: 15,
      accepted: ["10"],
      unit: "cm",
    },
    {
      id: "4i-p4",
      type: "mcq",
      prompt: [t("Which formula gives the volume of a cylinder?")],
      explanation: [
        t("A cylinder is a prism with a circular cross-section of area πr², multiplied by height h."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("V = \\pi r^2 h")] },
        { id: "b", label: [m("V = 2 \\pi r h")] },
        { id: "c", label: [m("V = \\pi r h")] },
        { id: "d", label: [m("V = \\pi r^2")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4i-m1",
      type: "numeric",
      prompt: [t("Find the volume of a cylinder with diameter 10 cm and height 20 cm. Use"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        t("Radius = 10 ÷ 2 = 5 cm."),
        m(String.raw`V = 3.14 \times 25 \times 20 = 1570 \text{ cm}^3`),
      ],
      xp: 15,
      accepted: ["1570"],
    },
    {
      id: "4i-m2",
      type: "numeric",
      prompt: [t("A hexagonal prism has a cross-sectional area of 42 cm² and a length of 15 cm. What is its volume, in cm³?")],
      explanation: [m(String.raw`V = 42 \times 15 = 630 \text{ cm}^3`)],
      xp: 15,
      accepted: ["630"],
    },
    {
      id: "4i-m3",
      type: "numeric",
      prompt: [t("A cylindrical water tank has radius 1.5 m and height 4 m. What is its capacity in litres? Use"), m(String.raw`\pi \approx 3.14`), t("and round to the nearest litre. (1 m³ = 1000 L)")],
      explanation: [
        m(String.raw`V = 3.14 \times 1.5^2 \times 4 = 3.14 \times 2.25 \times 4 = 28.26 \text{ m}^3`),
        t("28.26 × 1000 = 28260 L."),
      ],
      xp: 15,
      accepted: ["28260"],
      unit: "L",
    },
    {
      id: "4i-m4",
      type: "numeric",
      prompt: [t("A trapezoidal prism has cross-sectional area 18 cm² and length 25 cm. What is its volume, in cm³?")],
      explanation: [m(String.raw`V = 18 \times 25 = 450 \text{ cm}^3`)],
      xp: 15,
      accepted: ["450"],
    },
  ],
};

/** Boss challenge for the Volume track. */
const volumeChallengeQuestions: Question[] = [
  {
    id: "vol-boss-q1",
    type: "numeric",
    prompt: [t("A cylinder and a rectangular prism have equal volumes. The prism is 10 cm × 8 cm × 15 cm. If the cylinder has radius 5 cm, find its height using"), m(String.raw`\pi \approx 3.14`), t(". Round to 2 dp.")],
    explanation: [
      t("Prism volume: 10 × 8 × 15 = 1200 cm³."),
      m(String.raw`h = 1200 \div (3.14 \times 25) = 1200 \div 78.5 = 15.29 \text{ cm}`),
    ],
    xp: 25,
    accepted: ["15.29"],
    unit: "cm",
  },
  {
    id: "vol-boss-q2",
    type: "numeric",
    prompt: [t("A swimming pool is 50 m long, 20 m wide, and ranges from 1 m to 3 m in depth (linear slope). Find its capacity in kilolitres.")],
    explanation: [
      t("Average depth: (1 + 3) ÷ 2 = 2 m."),
      m(String.raw`V = 50 \times 20 \times 2 = 2000 \text{ m}^3`),
      t("2000 m³ = 2000 kL."),
    ],
    xp: 25,
    accepted: ["2000"],
    unit: "kL",
  },
  {
    id: "vol-boss-q3",
    type: "numeric",
    prompt: [t("A pipe is a hollow cylinder of length 3 m, outer radius 6 cm and inner radius 5 cm. Find the volume of material in the pipe in cm³ using"), m(String.raw`\pi \approx 3.14`), t(". The length is 300 cm.")],
    explanation: [
      t("Volume = (outer area - inner area) × length"),
      m(String.raw`= 3.14 \times (6^2 - 5^2) \times 300 = 3.14 \times (36 - 25) \times 300`),
      m(String.raw`= 3.14 \times 11 \times 300 = 10362 \text{ cm}^3`),
    ],
    xp: 25,
    accepted: ["10362"],
  },
  {
    id: "vol-boss-q4",
    type: "numeric",
    prompt: [t("A triangular prism has a right-angled triangle end with legs 6 cm and 8 cm. Its length is 20 cm. Find its volume, in cm³.")],
    explanation: [
      t("Triangle area:"),
      m(String.raw`\frac{1}{2} \times 6 \times 8 = 24`),
      t("Volume:"),
      m(String.raw`24 \times 20 = 480 \text{ cm}^3`),
    ],
    xp: 20,
    accepted: ["480"],
  },
  {
    id: "vol-boss-q5",
    type: "mcq",
    prompt: [t("A cylinder's radius is doubled while its height is halved. Its volume:")],
    explanation: [
      t("V = πr²h. With r → 2r and h → h/2:"),
      m(String.raw`V_{\text{new}} = \pi \times (2r)^2 \times \frac{h}{2} = \pi \times 4r^2 \times \frac{h}{2} = 2\pi r^2 h = 2V`),
      t("The volume doubles."),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("doubles")] },
      { id: "b", label: [t("stays the same")] },
      { id: "c", label: [t("quadruples")] },
      { id: "d", label: [t("halves")] },
    ],
    correctOptionId: "a",
  },
];

/** The Volume track. */
export const volumeTrack: Track = {
  id: "volume",
  subjectId: "maths",
  title: "Volume (Year 8)",
  description:
    "Volume and capacity, and finding the volume of prisms and cylinders.",
  lessons: [volumeAndCapacity, volumePrismsCylinders],
  challenge: {
    id: "volume-boss",
    title: "Boss challenge: Volume and capacity",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 5",
    questions: volumeChallengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-volume",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
