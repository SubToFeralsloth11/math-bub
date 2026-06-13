/**
 * Perimeter and Area track content (Year 8, chapter 4).
 *
 * Covers length and perimeter, circumference of a circle, area of basic
 * shapes, area of circles, and area of sectors and composite shapes -
 * based on the 2026 Year 8 Maths Class Notebook curriculum plan
 * (Term 1, Weeks 3-4).
 *
 * @author John Grimes
 * @module content/tracks/perimeterAndArea
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

/** 4A - Length and perimeter. */
const lengthAndPerimeter: Lesson = {
  id: "pa-4a-length-perimeter",
  order: 1,
  title: "4A Length and perimeter",
  sourceRef: "4A",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4a-key",
      heading: "Key idea: perimeter",
      body: [
        t("The perimeter is the total distance around the outside of a shape. Add all side lengths together."),
        t("For a rectangle with length l and width w:"),
        m("P = 2l + 2w"),
        t("Always include units (cm, m, km) in your answer."),
      ],
    },
    {
      id: "4a-worked",
      heading: "Worked example",
      body: [
        t("A rectangle is 8 cm long and 5 cm wide. Find its perimeter."),
        m(String.raw`P = 2 \times 8 + 2 \times 5 = 16 + 10 = 26 \text{ cm}`),
      ],
    },
  ],
  practice: [
    {
      id: "4a-p1",
      type: "numeric",
      prompt: [t("A rectangle is 12 cm long and 7 cm wide. What is its perimeter, in cm?")],
      explanation: [m(String.raw`2 \times 12 + 2 \times 7 = 24 + 14 = 38`)],
      xp: 10,
      accepted: ["38"],
      unit: "cm",
    },
    {
      id: "4a-p2",
      type: "numeric",
      prompt: [t("A square has sides of 9 cm. What is its perimeter, in cm?")],
      explanation: [m(String.raw`4 \times 9 = 36`)],
      xp: 10,
      accepted: ["36"],
      unit: "cm",
    },
    {
      id: "4a-p3",
      type: "numeric",
      prompt: [t("A triangle has sides of 5 cm, 6 cm and 8 cm. What is its perimeter, in cm?")],
      explanation: [m("5 + 6 + 8 = 19")],
      xp: 10,
      accepted: ["19"],
      unit: "cm",
    },
    {
      id: "4a-p4",
      type: "mcq",
      prompt: [t("A rectangle has perimeter 30 cm. Its length is 10 cm. What is its width, in cm?")],
      explanation: [
        m(String.raw`2 \times 10 + 2w = 30`),
        m(String.raw`2w = 10`),
        m("w = 5"),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("5")] },
        { id: "b", label: [t("10")] },
        { id: "c", label: [t("15")] },
        { id: "d", label: [t("20")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4a-m1",
      type: "numeric",
      prompt: [t("A regular hexagon has sides of 4.5 cm. What is its perimeter, in cm?")],
      explanation: [m(String.raw`6 \times 4.5 = 27`)],
      xp: 15,
      accepted: ["27"],
      unit: "cm",
    },
    {
      id: "4a-m2",
      type: "numeric",
      prompt: [t("A rectangle is 15 m long and 8 m wide. What is its perimeter, in m?")],
      explanation: [m(String.raw`2 \times 15 + 2 \times 8 = 30 + 16 = 46`)],
      xp: 15,
      accepted: ["46"],
      unit: "m",
    },
    {
      id: "4a-m3",
      type: "numeric",
      prompt: [t("The perimeter of a square is 48 cm. What is the length of one side, in cm?")],
      explanation: [m(String.raw`48 \div 4 = 12`)],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "4a-m4",
      type: "mcq",
      prompt: [t("Which has the largest perimeter?")],
      explanation: [
        t("Square: 4 × 10 = 40 cm. Rectangle: 2(12+8) = 40 cm. Triangle: 15+12+9 = 36 cm. Circle's circumference is 2π × 6 ≈ 37.7 cm."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("A square of side 10 cm")] },
        { id: "b", label: [t("A 12 cm × 8 cm rectangle")] },
        { id: "c", label: [t("A triangle with sides 15, 12, 9 cm")] },
        { id: "d", label: [t("A circle of radius 6 cm")] },
      ],
      correctOptionId: "b",
    },
  ],
};

/** 4B - Circumference of a circle. */
const circumference: Lesson = {
  id: "pa-4b-circumference",
  order: 2,
  title: "4B Circumference of a circle",
  sourceRef: "4B",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4b-key",
      heading: "Key idea: circumference",
      body: [
        t("The circumference C is the perimeter of a circle."),
        t("If you know the diameter d:"),
        m("C = \\pi d"),
        t("If you know the radius r:"),
        m("C = 2 \\pi r"),
        m(String.raw`\pi \approx 3.14`),
        t("Round your answer to 2 decimal places unless told otherwise."),
      ],
    },
  ],
  practice: [
    {
      id: "4b-p1",
      type: "numeric",
      prompt: [t("Find the circumference of a circle with radius 7 cm. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [m(String.raw`C = 2 \times 3.14 \times 7 = 43.96 \text{ cm}`)],
      xp: 10,
      accepted: ["43.96"],
      unit: "cm",
    },
    {
      id: "4b-p2",
      type: "numeric",
      prompt: [t("A circle has diameter 10 cm. Find its circumference using"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [m(String.raw`C = 3.14 \times 10 = 31.4 \text{ cm}`)],
      xp: 10,
      accepted: ["31.4"],
      unit: "cm",
    },
    {
      id: "4b-p3",
      type: "mcq",
      prompt: [t("If you double the radius of a circle, what happens to the circumference?")],
      explanation: [
        t("Circumference is proportional to radius:"),
        m("C = 2 \\pi r"),
        t(", so doubling r doubles C."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("It doubles")] },
        { id: "b", label: [t("It quadruples")] },
        { id: "c", label: [t("It stays the same")] },
        { id: "d", label: [t("It halves")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4b-m1",
      type: "numeric",
      prompt: [t("Find the circumference of a circle with diameter 14 m. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [m(String.raw`C = 3.14 \times 14 = 43.96 \text{ m}`)],
      xp: 15,
      accepted: ["43.96"],
      unit: "m",
    },
    {
      id: "4b-m2",
      type: "numeric",
      prompt: [t("A circular running track has circumference 314 m. What is its diameter? Use"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [m(String.raw`d = 314 \div 3.14 = 100 \text{ m}`)],
      xp: 15,
      accepted: ["100"],
      unit: "m",
    },
    {
      id: "4b-m3",
      type: "numeric",
      prompt: [t("A bicycle wheel has radius 35 cm. How far does it travel in one full rotation? Use"), m(String.raw`\pi \approx 3.14`), t("and give cm.")],
      explanation: [m(String.raw`C = 2 \times 3.14 \times 35 = 219.8 \text{ cm}`)],
      xp: 15,
      accepted: ["219.8"],
      unit: "cm",
    },
    {
      id: "4b-m4",
      type: "mcq",
      prompt: [t("The circumference of a circle is proportional to its...")],
      explanation: [m("C = \\pi d"), t(", so circumference is proportional to diameter (and also radius).")],
      xp: 15,
      options: [
        { id: "a", label: [t("diameter")] },
        { id: "b", label: [t("area")] },
        { id: "c", label: [t("radius squared")] },
        { id: "d", label: [t("colour")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 4C - Area of basic shapes. */
const area: Lesson = {
  id: "pa-4c-area",
  order: 3,
  title: "4C Area",
  sourceRef: "4C",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4c-key",
      heading: "Key idea: area formulas",
      body: [
        t("Area is measured in square units (cm², m², km²)."),
        t("Rectangle: A = length × width."),
        t("Triangle:"),
        m(String.raw`A = \frac{1}{2} \times \text{base} \times \text{height}`),
        t("Parallelogram: A = base × perpendicular height."),
        t("The height must be perpendicular (at right angles) to the base."),
      ],
    },
  ],
  practice: [
    {
      id: "4c-p1",
      type: "numeric",
      prompt: [t("A rectangle is 12 cm by 5 cm. What is its area, in cm²?")],
      explanation: [m(String.raw`A = 12 \times 5 = 60 \text{ cm}^2`)],
      xp: 10,
      accepted: ["60"],
    },
    {
      id: "4c-p2",
      type: "numeric",
      prompt: [t("A triangle has base 10 cm and height 6 cm. What is its area, in cm²?")],
      explanation: [m(String.raw`A = \frac{1}{2} \times 10 \times 6 = 30 \text{ cm}^2`)],
      xp: 10,
      accepted: ["30"],
    },
    {
      id: "4c-p3",
      type: "numeric",
      prompt: [t("A parallelogram has base 8 cm and perpendicular height 5 cm. What is its area, in cm²?")],
      explanation: [m(String.raw`A = 8 \times 5 = 40 \text{ cm}^2`)],
      xp: 10,
      accepted: ["40"],
    },
    {
      id: "4c-p4",
      type: "mcq",
      prompt: [t("If you double the base of a triangle but keep the height the same, what happens to the area?")],
      explanation: [
        t("Area is proportional to base:"),
        m("A = \\frac{1}{2}bh"),
        t(", so doubling b doubles A."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("It doubles")] },
        { id: "b", label: [t("It quadruples")] },
        { id: "c", label: [t("It stays the same")] },
        { id: "d", label: [t("It triples")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4c-m1",
      type: "numeric",
      prompt: [t("A square has side length 9 cm. What is its area, in cm²?")],
      explanation: [m(String.raw`A = 9 \times 9 = 81 \text{ cm}^2`)],
      xp: 15,
      accepted: ["81"],
    },
    {
      id: "4c-m2",
      type: "numeric",
      prompt: [t("A triangle has area 24 cm² and height 6 cm. What is its base, in cm?")],
      explanation: [
        m(String.raw`24 = \frac{1}{2} \times b \times 6`),
        m(String.raw`b = 24 \times 2 \div 6 = 8`),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "cm",
    },
    {
      id: "4c-m3",
      type: "numeric",
      prompt: [t("A rectangle has area 72 m² and width 8 m. What is its length, in m?")],
      explanation: [m(String.raw`l = 72 \div 8 = 9 \text{ m}`)],
      xp: 15,
      accepted: ["9"],
      unit: "m",
    },
    {
      id: "4c-m4",
      type: "numeric",
      prompt: [t("A trapezium has parallel sides 6 cm and 10 cm, and height 4 cm. Area = ½(a + b)h. What is its area, in cm²?")],
      explanation: [m(String.raw`A = \frac{1}{2} \times (6 + 10) \times 4 = 32 \text{ cm}^2`)],
      xp: 15,
      accepted: ["32"],
    },
  ],
};

/** 4E - Area of circles. */
const areaOfCircles: Lesson = {
  id: "pa-4e-area-circles",
  order: 4,
  title: "4E Area of circles",
  sourceRef: "4E",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4e-key",
      heading: "Key idea: area of a circle",
      body: [
        t("The area A of a circle with radius r is:"),
        m("A = \\pi r^2"),
        t("(Square the radius first, then multiply by π.)"),
        t("Use the diameter to find the radius: r = d ÷ 2."),
        t("Round to 2 decimal places unless told otherwise."),
      ],
    },
  ],
  practice: [
    {
      id: "4e-p1",
      type: "numeric",
      prompt: [t("Find the area of a circle with radius 5 cm. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [m(String.raw`A = 3.14 \times 5^2 = 3.14 \times 25 = 78.5 \text{ cm}^2`)],
      xp: 10,
      accepted: ["78.5"],
    },
    {
      id: "4e-p2",
      type: "numeric",
      prompt: [t("A circle has diameter 10 cm. Find its area. Use"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        t("Radius is 10 ÷ 2 = 5 cm."),
        m(String.raw`A = 3.14 \times 5^2 = 3.14 \times 25 = 78.5 \text{ cm}^2`),
      ],
      xp: 10,
      accepted: ["78.5"],
    },
    {
      id: "4e-p3",
      type: "mcq",
      prompt: [t("If you double the radius of a circle, its area becomes...")],
      explanation: [
        t("Area has r², so (2r)² = 4r². The area quadruples."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("4 times larger")] },
        { id: "b", label: [t("2 times larger")] },
        { id: "c", label: [t("8 times larger")] },
        { id: "d", label: [t("the same")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4e-m1",
      type: "numeric",
      prompt: [t("Find the area of a circle with radius 3.5 cm. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [m(String.raw`A = 3.14 \times 3.5^2 = 3.14 \times 12.25 = 38.465 \approx 38.47 \text{ cm}^2`)],
      xp: 15,
      accepted: ["38.47", "38.465"],
    },
    {
      id: "4e-m2",
      type: "numeric",
      prompt: [t("A circular pond has area 78.5 m². Find its radius using"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        m(String.raw`r^2 = 78.5 \div 3.14 = 25`),
        m(String.raw`r = 5 \text{ m}`),
      ],
      xp: 15,
      accepted: ["5"],
      unit: "m",
    },
    {
      id: "4e-m3",
      type: "numeric",
      prompt: [t("A semicircle has radius 6 cm. Find its area. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [
        t("Full circle area:"),
        m(String.raw`3.14 \times 36 = 113.04`),
        t("Half:"),
        m(String.raw`113.04 \div 2 = 56.52 \text{ cm}^2`),
      ],
      xp: 15,
      accepted: ["56.52"],
    },
    {
      id: "4e-m4",
      type: "mcq",
      prompt: [t("A circle has circumference 31.4 cm. What is its area? Use"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        t("Find radius first: r = 31.4 ÷ (2 × 3.14) = 5 cm. Then:"),
        m(String.raw`A = 3.14 \times 25 = 78.5 \text{ cm}^2`),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("78.5 cm²")] },
        { id: "b", label: [t("31.4 cm²")] },
        { id: "c", label: [t("157 cm²")] },
        { id: "d", label: [t("15.7 cm²")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 4F - Area of sectors and composite shapes. */
const sectorsAndComposite: Lesson = {
  id: "pa-4f-sectors-composite",
  order: 5,
  title: "4F Area of sectors and composite shapes",
  sourceRef: "4F",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4f-key",
      heading: "Key idea: sectors and composites",
      body: [
        t("A sector is a fraction of a circle. For a sector with angle θ (in degrees):"),
        m(String.raw`\text{Sector area} = \frac{\theta}{360} \times \pi r^2`),
        t("For composite shapes, split into basic shapes (rectangles, triangles, circles), find each area, then add or subtract."),
        t("A quarter circle has θ = 90°, a semicircle has θ = 180°."),
      ],
    },
  ],
  practice: [
    {
      id: "4f-p1",
      type: "numeric",
      prompt: [t("Find the area of a quarter circle with radius 4 cm. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [
        m(String.raw`A = \frac{90}{360} \times 3.14 \times 4^2 = \frac{1}{4} \times 3.14 \times 16 = 12.56 \text{ cm}^2`),
      ],
      xp: 10,
      accepted: ["12.56"],
    },
    {
      id: "4f-p2",
      type: "numeric",
      prompt: [t("A shape is a 5 cm by 8 cm rectangle with a semicircle of diameter 5 cm on one end. Find the total area using"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        t("Rectangle: 5 × 8 = 40. Semicircle radius: 2.5 cm."),
        m(String.raw`\frac{1}{2} \times 3.14 \times 2.5^2 = 9.8125`),
        t("Total:"),
        m("40 + 9.8125 = 49.8125 \\approx 49.81"),
      ],
      xp: 15,
      accepted: ["49.81", "49.8125"],
    },
    {
      id: "4f-p3",
      type: "mcq",
      prompt: [t("To find the area of this L-shape, what is the best approach?")],
      explanation: [
        t("Split the L-shape into two rectangles, find each area, and add them."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Split into two rectangles and add")] },
        { id: "b", label: [t("Use the formula for a triangle")] },
        { id: "c", label: [t("Multiply length by width directly")] },
        { id: "d", label: [t("Ignore the missing corner")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4f-m1",
      type: "numeric",
      prompt: [t("Find the area of a sector with radius 6 cm and angle 60°. Use"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [
        m(String.raw`A = \frac{60}{360} \times 3.14 \times 36 = \frac{1}{6} \times 113.04 = 18.84 \text{ cm}^2`),
      ],
      xp: 15,
      accepted: ["18.84"],
    },
    {
      id: "4f-m2",
      type: "numeric",
      prompt: [t("A composite shape consists of a 10 cm square with a quarter circle cut from one corner (radius 4 cm). Find the remaining area using"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        t("Square: 10 × 10 = 100."),
        t("Quarter circle:"),
        m(String.raw`\frac{1}{4} \times 3.14 \times 16 = 12.56`),
        t("Remaining: 100 - 12.56 = 87.44 cm²."),
      ],
      xp: 15,
      accepted: ["87.44"],
    },
    {
      id: "4f-m3",
      type: "numeric",
      prompt: [t("An annulus (ring) has outer radius 7 cm and inner radius 4 cm. Find its area using"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
      explanation: [
        t("Area = outer circle - inner circle:"),
        m(String.raw`3.14 \times 49 - 3.14 \times 16 = 153.86 - 50.24 = 103.62 \text{ cm}^2`),
      ],
      xp: 15,
      accepted: ["103.62"],
    },
    {
      id: "4f-m4",
      type: "numeric",
      prompt: [t("A shape is made of a semicircle on top of an 8 cm by 4 cm rectangle. The semicircle's diameter equals the rectangle's width (8 cm). Find the total area using"), m(String.raw`\pi \approx 3.14`), t(".")],
      explanation: [
        t("Rectangle: 8 × 4 = 32. Semicircle radius: 4 cm."),
        m(String.raw`\frac{1}{2} \times 3.14 \times 16 = 25.12`),
        t("Total: 32 + 25.12 = 57.12 cm²."),
      ],
      xp: 15,
      accepted: ["57.12"],
    },
  ],
};

/** Boss challenge for the Perimeter and Area track. */
const perimeterAreaChallengeQuestions: Question[] = [
  {
    id: "pa-boss-q1",
    type: "numeric",
    prompt: [t("A circle has circumference 62.8 cm. Find its area using"), m(String.raw`\pi \approx 3.14`), t(".")],
    explanation: [
      t("r = 62.8 ÷ (2 × 3.14) = 10 cm."),
      m(String.raw`A = 3.14 \times 100 = 314 \text{ cm}^2`),
    ],
    xp: 20,
    accepted: ["314"],
  },
  {
    id: "pa-boss-q2",
    type: "numeric",
    prompt: [t("A running track has two straight sides of 100 m each, and two semicircular ends of radius 31.83 m. Find its perimeter, rounded to the nearest metre. Use"), m(String.raw`\pi \approx 3.14`), t(".")],
    explanation: [
      t("Straight parts: 2 × 100 = 200 m."),
      t("Semicircles: 2 × π × 31.83 ≈ 199.9 m."),
      t("Total ≈ 200 + 200 = 400 m."),
    ],
    xp: 25,
    accepted: ["400"],
    unit: "m",
  },
  {
    id: "pa-boss-q3",
    type: "numeric",
    prompt: [t("A shape is a right-angled triangle of base 12 cm and height 5 cm, with a semicircle of diameter 5 cm on the height side. Find the total area using"), m(String.raw`\pi \approx 3.14`), t("and round to 2 dp.")],
    explanation: [
      t("Triangle:"),
      m(String.raw`\frac{1}{2} \times 12 \times 5 = 30`),
      t("Semicircle radius: 2.5, area:"),
      m(String.raw`\frac{1}{2} \times 3.14 \times 6.25 = 9.8125`),
      t("Total: 39.81 cm²."),
    ],
    xp: 25,
    accepted: ["39.81", "39.8125"],
  },
  {
    id: "pa-boss-q4",
    type: "mcq",
    prompt: [t("A square and a circle have the same perimeter. Which has the larger area?")],
    explanation: [
      t("For a given perimeter, the circle encloses the maximum area. E.g., if both have perimeter 40 units, square area = 100, circle area ≈ 127.3."),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("The circle")] },
      { id: "b", label: [t("The square")] },
      { id: "c", label: [t("They are equal")] },
      { id: "d", label: [t("It depends on the radius")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "pa-boss-q5",
    type: "numeric",
    prompt: [t("A composite shape is made of a 20 cm × 10 cm rectangle with two quarter-circle cutouts (radius 5 cm each) from two corners. Find the remaining area using"), m(String.raw`\pi \approx 3.14`), t(".")],
    explanation: [
      t("Rectangle: 200. Two quarter circles = one half circle:"),
      m(String.raw`\frac{1}{2} \times 3.14 \times 25 = 39.25`),
      t("Remaining: 200 - 39.25 = 160.75 cm²."),
    ],
    xp: 25,
    accepted: ["160.75"],
  },
];

/** The Perimeter and Area track. */
export const perimeterAndAreaTrack: Track = {
  id: "perimeter-and-area",
  subjectId: "maths",
  title: "Perimeter and Area (Year 8)",
  description:
    "Length, perimeter, circumference of circles, area of basic shapes, area of circles, sectors and composite shapes.",
  lessons: [lengthAndPerimeter, circumference, area, areaOfCircles, sectorsAndComposite],
  challenge: {
    id: "perimeter-and-area-boss",
    title: "Boss challenge: Perimeter and area",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Weeks 3-4",
    questions: perimeterAreaChallengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-perimeter-and-area",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
