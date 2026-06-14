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

// ---------------------------------------------------------------------------
// Lesson 1: 4A Length and perimeter
// ---------------------------------------------------------------------------

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
        t(
          "The perimeter is the total distance around the outside of a shape. To find it, add all side lengths together.",
        ),
        t("For a rectangle with length l and width w:"),
        m(String.raw`P = 2l + 2w \quad \text{or} \quad P = 2(l + w)`),
        t("For a square with side length s:"),
        m("P = 4s"),
        t(
          "Always include units (cm, m, km) in your final answer. Make sure all side lengths use the same unit before adding.",
        ),
      ],
    },
    {
      id: "4a-worked",
      heading: "Worked example: rectangle",
      body: [
        t("A rectangle is 8 cm long and 5 cm wide. Find its perimeter."),
        m(String.raw`P = 2 \times 8 + 2 \times 5 = 16 + 10 = 26 \text{ cm}`),
        t(
          "Always write the formula first, substitute the numbers, then calculate.",
        ),
      ],
    },
    {
      id: "4a-mistake",
      heading: "Common mistake: missing sides",
      body: [
        t(
          "A common mistake is adding only the visible sides or mixing up length and width.",
        ),
        t(
          "For a rectangle, make sure you add all four sides. Another common mistake is confusing perimeter (length around) with area (space inside).",
        ),
        t(
          "Perimeter is measured in linear units (cm, m); area is measured in square units (cm², m²).",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4a-p1",
      type: "numeric",
      prompt: [
        t(
          "A rectangle is 12 cm long and 7 cm wide. What is its perimeter, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`P = 2 \times 12 + 2 \times 7 = 24 + 14 = 38 \text{ cm}`),
        t("Substitute l = 12 and w = 7 into P = 2l + 2w."),
      ],
      xp: 10,
      accepted: ["38"],
      unit: "cm",
    },
    {
      id: "4a-p2",
      type: "numeric",
      prompt: [t("A square has sides of 9 cm. What is its perimeter, in cm?")],
      explanation: [
        m(String.raw`P = 4 \times 9 = 36 \text{ cm}`),
        t("A square has four equal sides, so multiply the side length by 4."),
      ],
      xp: 10,
      accepted: ["36"],
      unit: "cm",
    },
    {
      id: "4a-p3",
      type: "numeric",
      prompt: [
        t(
          "A triangle has sides of 5 cm, 6 cm and 8 cm. What is its perimeter, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`P = 5 + 6 + 8 = 19 \text{ cm}`),
        t("For any polygon, add all side lengths."),
      ],
      xp: 10,
      accepted: ["19"],
      unit: "cm",
    },
    {
      id: "4a-p4",
      type: "mcq",
      prompt: [
        t(
          "A rectangle has perimeter 30 cm. Its length is 10 cm. What is its width, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`2 \times 10 + 2w = 30`),
        m(String.raw`20 + 2w = 30 \implies 2w = 10 \implies w = 5 \text{ cm}`),
        t(
          "Work backwards: subtract the known length contribution, then divide by 2.",
        ),
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
    {
      id: "4a-p5",
      type: "shortText",
      prompt: [
        t(
          "A rectangle is 15 m long and 8 m wide. What is its perimeter? Give the number with units.",
        ),
      ],
      explanation: [
        m(String.raw`P = 2(15 + 8) = 2 \times 23 = 46 \text{ m}`),
        t("Using P = 2(l + w) can be faster: add first, then double."),
      ],
      xp: 15,
      accepted: ["46 m", "46m", "46"],
    },
    {
      id: "4a-p6",
      type: "numeric",
      prompt: [
        t(
          "A regular pentagon has sides of 6 cm. What is its perimeter, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`P = 5 \times 6 = 30 \text{ cm}`),
        t(
          "A regular pentagon has five equal sides. Multiply the side length by 5.",
        ),
      ],
      xp: 15,
      accepted: ["30"],
      unit: "cm",
    },
    {
      id: "4a-p7",
      type: "shortText",
      prompt: [
        t(
          "A rectangle has perimeter 56 cm and width 12 cm. What is its length? Give a number with units.",
        ),
      ],
      explanation: [
        m(String.raw`2l + 2 \times 12 = 56`),
        m(String.raw`2l + 24 = 56 \implies 2l = 32 \implies l = 16 \text{ cm}`),
      ],
      xp: 15,
      accepted: ["16 cm", "16cm", "16"],
    },
    {
      id: "4a-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [
        m(String.raw`48 \div 4 = 12`),
        t("Since all four sides are equal, divide the perimeter by 4."),
      ],
      xp: 15,
      template: [
        t("The perimeter of a square is 48 cm. Each side is ___ cm long."),
      ],
      accepted: ["12"],
    },
    {
      id: "4a-p9",
      type: "numeric",
      prompt: [
        t(
          "A rectangular field is 85 m long and 47 m wide. What is the perimeter of the field, in m?",
        ),
      ],
      explanation: [
        m(String.raw`P = 2(85 + 47) = 2 \times 132 = 264 \text{ m}`),
        t("Use P = 2(l + w) for efficiency with larger numbers."),
      ],
      xp: 15,
      accepted: ["264"],
      unit: "m",
    },
    {
      id: "4a-p10",
      type: "mcq",
      prompt: [t("Which of these shapes has the largest perimeter?")],
      explanation: [
        t("Square:"),
        m(String.raw`4 \times 9 = 36 \text{ cm}`),
        t("Rectangle:"),
        m(String.raw`2(13 + 7) = 40 \text{ cm}`),
        t("Triangle:"),
        m(String.raw`14 + 13 + 9 = 36 \text{ cm}`),
        t("Regular hexagon:"),
        m(String.raw`6 \times 6 = 36 \text{ cm}`),
        t("The rectangle at 40 cm has the largest perimeter."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("A square of side 9 cm")] },
        { id: "b", label: [t("A 13 cm by 7 cm rectangle")] },
        { id: "c", label: [t("A triangle with sides 14, 13, 9 cm")] },
        { id: "d", label: [t("A regular hexagon of side 6 cm")] },
      ],
      correctOptionId: "b",
    },
  ],
  mastery: [
    {
      id: "4a-m1",
      type: "numeric",
      prompt: [
        t(
          "A regular hexagon has sides of 4.5 cm. What is its perimeter, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`P = 6 \times 4.5 = 27 \text{ cm}`),
        t("A regular hexagon has six equal sides. Multiply 4.5 by 6."),
      ],
      xp: 15,
      accepted: ["27"],
      unit: "cm",
    },
    {
      id: "4a-m2",
      type: "numeric",
      prompt: [
        t(
          "A rectangle has perimeter 72 cm. Its length is 20 cm. What is its width, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`2(20 + w) = 72`),
        m(String.raw`40 + 2w = 72 \implies 2w = 32 \implies w = 16 \text{ cm}`),
        t("Form an equation using P = 2(l + w) and solve for w."),
      ],
      xp: 15,
      accepted: ["16"],
      unit: "cm",
    },
    {
      id: "4a-m3",
      type: "mcq",
      prompt: [
        t(
          "A rectangle's length is three times its width. The perimeter is 64 cm. What is the width?",
        ),
      ],
      explanation: [
        t("Let width = w, length = 3w."),
        m(String.raw`2(3w + w) = 64`),
        m(String.raw`2(4w) = 64 \implies 8w = 64 \implies w = 8 \text{ cm}`),
        t("The length would be 24 cm. Check: P = 2(24+8) = 64."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("8 cm")] },
        { id: "b", label: [t("16 cm")] },
        { id: "c", label: [t("21 cm")] },
        { id: "d", label: [t("4 cm")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4a-m4",
      type: "numeric",
      prompt: [
        t(
          "An L-shaped figure is formed from two rectangles: one is 10 cm by 4 cm, the other is 6 cm by 5 cm, joined along the 4 cm side. What is the perimeter of the L-shape, in cm?",
        ),
      ],
      explanation: [
        t(
          "Tracing around the outside: start at top-left. Go right 10 cm, down 5 cm, right 6 cm, down 4 cm, left 16 cm (back to left edge), up 9 cm.",
        ),
        m(String.raw`P = 10 + 5 + 6 + 4 + 16 + 9 = 50 \text{ cm}`),
        t(
          "Alternatively, the L-shape outside path is equivalent to the perimeter of the bounding 16 cm × 9 cm rectangle.",
        ),
      ],
      xp: 20,
      accepted: ["50"],
      unit: "cm",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2: 4B Circumference of a circle
// ---------------------------------------------------------------------------

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
        t("The circumference C is the perimeter (distance around) a circle."),
        t("If you know the diameter d:"),
        m(String.raw`C = \pi d`),
        t("If you know the radius r:"),
        m(String.raw`C = 2\pi r`),
        m(
          String.raw`\pi \approx 3.14 \quad (\text{or use the } \pi \text{ button on your calculator})`,
        ),
        t(
          "Always round your answer to 2 decimal places unless the question says otherwise.",
        ),
      ],
    },
    {
      id: "4b-worked",
      heading: "Worked example: radius to circumference",
      body: [
        t("Find the circumference of a circle with radius 7 cm. Use π ≈ 3.14."),
        m(
          String.raw`C = 2 \times 3.14 \times 7 = 6.28 \times 7 = 43.96 \text{ cm}`,
        ),
        t("Multiply 2, π, and r together. The order does not matter."),
      ],
    },
    {
      id: "4b-reverse",
      heading: "Extension: finding radius from circumference",
      body: [
        t(
          "If you know the circumference and need the radius, rearrange the formula:",
        ),
        m(String.raw`r = \frac{C}{2\pi}`),
        t("For example, if C = 31.4 cm and π ≈ 3.14:"),
        m(
          String.raw`r = \frac{31.4}{2 \times 3.14} = \frac{31.4}{6.28} = 5 \text{ cm}`,
        ),
        t("Always check your answer by plugging it back into C = 2πr."),
      ],
    },
  ],
  practice: [
    {
      id: "4b-p1",
      type: "numeric",
      prompt: [
        t("Find the circumference of a circle with radius 7 cm. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and give your answer to 2 dp."),
      ],
      explanation: [
        m(String.raw`C = 2 \times 3.14 \times 7 = 43.96 \text{ cm}`),
      ],
      xp: 10,
      accepted: ["43.96"],
      unit: "cm",
    },
    {
      id: "4b-p2",
      type: "numeric",
      prompt: [
        t("A circle has diameter 10 cm. Find its circumference. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("."),
      ],
      explanation: [
        m(String.raw`C = 3.14 \times 10 = 31.4 \text{ cm}`),
        t(
          "When given the diameter, use C = πd directly - no need to find the radius first.",
        ),
      ],
      xp: 10,
      accepted: ["31.4"],
      unit: "cm",
    },
    {
      id: "4b-p3",
      type: "numeric",
      prompt: [
        t("A circle has radius 3.5 cm. Find its circumference. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        m(
          String.raw`C = 2 \times 3.14 \times 3.5 = 6.28 \times 3.5 = 21.98 \text{ cm}`,
        ),
      ],
      xp: 10,
      accepted: ["21.98"],
      unit: "cm",
    },
    {
      id: "4b-p4",
      type: "mcq",
      prompt: [
        t(
          "If you double the radius of a circle, what happens to its circumference?",
        ),
      ],
      explanation: [
        t("Circumference is directly proportional to radius:"),
        m(String.raw`C = 2\pi r`),
        t(
          "If r becomes 2r, then C becomes 2π(2r) = 4πr = 2C. So the circumference doubles.",
        ),
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
    {
      id: "4b-p5",
      type: "numeric",
      prompt: [
        t("A circle has circumference 62.8 cm. What is its diameter? Use"),
        m(String.raw`\pi \approx 3.14`),
        t("."),
      ],
      explanation: [
        m(String.raw`d = \frac{C}{\pi} = \frac{62.8}{3.14} = 20 \text{ cm}`),
        t("Rearrange C = πd to get d = C ÷ π."),
      ],
      xp: 15,
      accepted: ["20"],
      unit: "cm",
    },
    {
      id: "4b-p6",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [
        m(String.raw`C = 2 \times 3.14 \times 35 = 219.8 \text{ cm}`),
        t(
          "One rotation covers a distance equal to the circumference. Convert to metres: 219.8 cm = 2.198 m.",
        ),
      ],
      xp: 15,
      template: [
        t(
          "A bicycle wheel has radius 35 cm. In one full rotation it travels ___ cm. (Use π ≈ 3.14)",
        ),
      ],
      accepted: ["219.8"],
    },
    {
      id: "4b-p7",
      type: "shortText",
      prompt: [
        t(
          "The circumference of a circle is proportional to its radius. What is the constant of proportionality? Write the Greek letter or its name.",
        ),
      ],
      explanation: [
        t(
          "From C = 2πr, the constant of proportionality is 2π. This is approximately 6.28.",
        ),
        t(
          "When a quantity y is proportional to x (y = kx), the constant k is the ratio y/x. Here k = C/r = 2π.",
        ),
      ],
      xp: 15,
      accepted: ["2pi", "2π", "2 pi", "2π", "2*pi", "6.28"],
    },
    {
      id: "4b-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [t("From C = πd: d = 94.2 ÷ 3.14 = 30 cm.")],
      xp: 15,
      template: [
        t(
          "A circle has a circumference of 94.2 cm. Its diameter is ___ cm. (Use π ≈ 3.14)",
        ),
      ],
      accepted: ["30"],
    },
    {
      id: "4b-p9",
      type: "mcq",
      prompt: [t("Which statement about circumference is correct?")],
      explanation: [
        t(
          "C = πd, so circumference equals π times diameter. C = 2πr, so circumference equals 2π times radius.",
        ),
        t(
          "The first option is incorrect (π × radius gives half the circumference). The third is incorrect (π is about 3.14, not 2). The fourth is nonsense.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("C = πr (circumference equals π times radius)")] },
        {
          id: "b",
          label: [t("C = πd (circumference equals π times diameter)")],
        },
        { id: "c", label: [t("π is exactly equal to 2")] },
        { id: "d", label: [t("Circumference does not depend on radius")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "4b-p10",
      type: "numeric",
      prompt: [
        t(
          "A circular garden bed has circumference 47.1 m. What is its radius? Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 1 dp."),
      ],
      explanation: [
        m(
          String.raw`r = \frac{47.1}{2 \times 3.14} = \frac{47.1}{6.28} = 7.5 \text{ m}`,
        ),
        t(
          "Divide the circumference by 2π to find the radius. Check: 2 × 3.14 × 7.5 = 47.1.",
        ),
      ],
      xp: 20,
      accepted: ["7.5"],
      unit: "m",
    },
  ],
  mastery: [
    {
      id: "4b-m1",
      type: "numeric",
      prompt: [
        t("Find the circumference of a circle with diameter 14 m. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and give your answer to 2 dp."),
      ],
      explanation: [m(String.raw`C = 3.14 \times 14 = 43.96 \text{ m}`)],
      xp: 15,
      accepted: ["43.96"],
      unit: "m",
    },
    {
      id: "4b-m2",
      type: "numeric",
      prompt: [
        t(
          "A circular running track has circumference 314 m. What is its diameter? Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("."),
      ],
      explanation: [
        m(String.raw`d = \frac{314}{3.14} = 100 \text{ m}`),
        t("The diameter is exactly 100 m when π is approximated as 3.14."),
      ],
      xp: 15,
      accepted: ["100"],
      unit: "m",
    },
    {
      id: "4b-m3",
      type: "mcq",
      prompt: [
        t(
          "Circle A has radius 4 cm. Circle B has radius 8 cm. How many times larger is the circumference of Circle B? Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("."),
      ],
      explanation: [
        t("Circle A: C = 2π × 4 = 8π ≈ 25.12 cm."),
        t("Circle B: C = 2π × 8 = 16π ≈ 50.24 cm."),
        t(
          "Ratio: 50.24 ÷ 25.12 = 2. When you double the radius, you double the circumference.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("2 times")] },
        { id: "b", label: [t("4 times")] },
        { id: "c", label: [t("8 times")] },
        { id: "d", label: [t("The same")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4b-m4",
      type: "numeric",
      prompt: [
        t(
          "A semicircle (half a circle) has a straight edge of 10 cm (this is its diameter). What is the perimeter of the semicircle, including the straight edge? Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("The curved arc is half the circumference:"),
        m(String.raw`\frac{1}{2} \times \pi \times 10 = 15.7 \text{ cm}`),
        t("Add the straight diameter: 15.7 + 10 = 25.7 cm."),
        t(
          "The perimeter of a closed shape includes all boundary edges - the arc and the diameter.",
        ),
      ],
      xp: 20,
      accepted: ["25.7"],
      unit: "cm",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3: 4C Area of rectangles and triangles
// ---------------------------------------------------------------------------

/** 4C - Area of rectangles and triangles. */
const area: Lesson = {
  id: "pa-4c-area",
  order: 3,
  title: "4C Area of rectangles and triangles",
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
        t(
          "Area measures the space inside a flat shape. It is measured in square units (cm², m², km²).",
        ),
        t("Rectangle: multiply length by width."),
        m(String.raw`A = l \times w`),
        t("Triangle: half of base times perpendicular height."),
        m(String.raw`A = \frac{1}{2} \times b \times h`),
        t(
          "The height must be perpendicular (at right angles) to the base. You can choose any side as the base - just make sure you use the height measured from that base.",
        ),
      ],
    },
    {
      id: "4c-worked-rect",
      heading: "Worked example: rectangle",
      body: [
        t("A rectangle is 12 cm long and 5 cm wide. Find its area."),
        m(String.raw`A = 12 \times 5 = 60 \text{ cm}^2`),
        t("Notice the units: cm × cm = cm²."),
      ],
    },
    {
      id: "4c-worked-tri",
      heading: "Worked example: triangle",
      body: [
        t(
          "A triangle has base 10 cm and perpendicular height 6 cm. Find its area.",
        ),
        m(
          String.raw`A = \frac{1}{2} \times 10 \times 6 = 5 \times 6 = 30 \text{ cm}^2`,
        ),
        t(
          "The ½ and the base multiply first (giving 5), then multiply by height.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4c-p1",
      type: "numeric",
      prompt: [
        t("A rectangle is 12 cm long and 5 cm wide. What is its area, in cm²?"),
      ],
      explanation: [m(String.raw`A = 12 \times 5 = 60 \text{ cm}^2`)],
      xp: 10,
      accepted: ["60"],
    },
    {
      id: "4c-p2",
      type: "numeric",
      prompt: [
        t(
          "A triangle has base 10 cm and perpendicular height 6 cm. What is its area, in cm²?",
        ),
      ],
      explanation: [
        m(String.raw`A = \frac{1}{2} \times 10 \times 6 = 30 \text{ cm}^2`),
      ],
      xp: 10,
      accepted: ["30"],
    },
    {
      id: "4c-p3",
      type: "numeric",
      prompt: [t("A square has side length 9 cm. What is its area, in cm²?")],
      explanation: [
        m(String.raw`A = 9 \times 9 = 81 \text{ cm}^2`),
        t("A square is a special rectangle where length equals width."),
      ],
      xp: 10,
      accepted: ["81"],
    },
    {
      id: "4c-p4",
      type: "mcq",
      prompt: [
        t(
          "If you double the base of a triangle but keep the height the same, what happens to the area?",
        ),
      ],
      explanation: [
        m(String.raw`A = \frac{1}{2}bh`),
        t(
          "If b becomes 2b, then A becomes ½(2b)h = bh = 2 × (½bh). So the area doubles.",
        ),
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
    {
      id: "4c-p5",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [
        m(String.raw`l = \frac{72}{8} = 9 \text{ m}`),
        t("Rearrange A = l × w to l = A ÷ w."),
      ],
      xp: 15,
      template: [
        t("A rectangle has area 72 m² and width 8 m. Its length is ___ m."),
      ],
      accepted: ["9"],
    },
    {
      id: "4c-p6",
      type: "numeric",
      prompt: [
        t(
          "A triangle has area 24 cm² and height 6 cm. What is its base, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`24 = \frac{1}{2} \times b \times 6`),
        m(String.raw`24 = 3b \implies b = \frac{24}{3} = 8 \text{ cm}`),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "cm",
    },
    {
      id: "4c-p7",
      type: "shortText",
      prompt: [
        t(
          "A rectangle is 6 m long and 4 m wide. What is its area? Give the number with units.",
        ),
      ],
      explanation: [m(String.raw`A = 6 \times 4 = 24 \text{ m}^2`)],
      xp: 15,
      accepted: ["24 m2", "24 m^2", "24m2", "24m^2", "24"],
    },
    {
      id: "4c-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [
        m(
          String.raw`A = \frac{1}{2} \times (6 + 10) \times 4 = \frac{1}{2} \times 16 \times 4 = 32 \text{ cm}^2`,
        ),
        t(
          "A trapezium's area is half the sum of the parallel sides multiplied by the perpendicular height.",
        ),
      ],
      xp: 15,
      template: [
        t(
          "A trapezium has parallel sides 6 cm and 10 cm, with perpendicular height 4 cm. Its area is ___ cm².",
        ),
      ],
      accepted: ["32"],
    },
    {
      id: "4c-p9",
      type: "numeric",
      prompt: [
        t(
          "A rectangular garden bed is 5.5 m long and 3.2 m wide. What is its area, in m²? Give your answer to 1 dp.",
        ),
      ],
      explanation: [
        m(String.raw`A = 5.5 \times 3.2 = 17.6 \text{ m}^2`),
        t("5.5 × 3.2 = (55 × 32) ÷ 100 = 1760 ÷ 100 = 17.6."),
      ],
      xp: 15,
      accepted: ["17.6"],
    },
    {
      id: "4c-p10",
      type: "mcq",
      prompt: [
        t(
          "A rectangle's length is doubled and its width is halved. What happens to its area?",
        ),
      ],
      explanation: [
        t("Original area: l × w. New area: (2l) × (w/2) = 2l × w/2 = l × w."),
        t("The two changes cancel out. The area stays the same."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("It stays the same")] },
        { id: "b", label: [t("It doubles")] },
        { id: "c", label: [t("It halves")] },
        { id: "d", label: [t("It quadruples")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4c-p11",
      type: "numeric",
      prompt: [
        t(
          "A right-angled triangle has legs of 9 cm and 12 cm (these form the right angle). What is its area, in cm²?",
        ),
      ],
      explanation: [
        t(
          "In a right-angled triangle, the two legs are perpendicular. Use one as base and the other as height:",
        ),
        m(String.raw`A = \frac{1}{2} \times 9 \times 12 = 54 \text{ cm}^2`),
      ],
      xp: 20,
      accepted: ["54"],
    },
  ],
  mastery: [
    {
      id: "4c-m1",
      type: "numeric",
      prompt: [
        t(
          "A rectangle has area 96 cm² and length 12 cm. What is its width, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`w = \frac{96}{12} = 8 \text{ cm}`),
        t("Rearrange A = l × w to w = A ÷ l."),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "cm",
    },
    {
      id: "4c-m2",
      type: "numeric",
      prompt: [
        t(
          "A triangle has area 45 cm² and base 15 cm. What is its perpendicular height, in cm?",
        ),
      ],
      explanation: [
        m(String.raw`45 = \frac{1}{2} \times 15 \times h`),
        m(String.raw`45 = 7.5h \implies h = \frac{45}{7.5} = 6 \text{ cm}`),
        t(
          "Double the area and divide by base: h = (2 × 45) ÷ 15 = 90 ÷ 15 = 6.",
        ),
      ],
      xp: 15,
      accepted: ["6"],
      unit: "cm",
    },
    {
      id: "4c-m3",
      type: "mcq",
      prompt: [
        t(
          "Triangle T has base 8 cm and height 5 cm. Triangle U has base 4 cm and height 10 cm. How do their areas compare?",
        ),
      ],
      explanation: [
        t("Triangle T:"),
        m(String.raw`A = \frac{1}{2} \times 8 \times 5 = 20 \text{ cm}^2`),
        t("Triangle U:"),
        m(String.raw`A = \frac{1}{2} \times 4 \times 10 = 20 \text{ cm}^2`),
        t("Both have area 20 cm², so their areas are equal."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They are equal")] },
        { id: "b", label: [t("Triangle T is larger")] },
        { id: "c", label: [t("Triangle U is larger")] },
        { id: "d", label: [t("Cannot be determined")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4c-m4",
      type: "numeric",
      prompt: [
        t(
          "A parallelogram has base 12 cm and perpendicular height 7 cm. Its area formula is A = b × h (same as a rectangle). What is its area, in cm²?",
        ),
      ],
      explanation: [
        m(String.raw`A = 12 \times 7 = 84 \text{ cm}^2`),
        t(
          "A parallelogram's area is base × perpendicular height. The slanted sides do not affect the area - only the perpendicular distance between the parallel sides matters.",
        ),
      ],
      xp: 20,
      accepted: ["84"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 4: 4E Area of circles
// ---------------------------------------------------------------------------

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
        m(String.raw`A = \pi r^2`),
        t("Remember: square the radius first, then multiply by π."),
        m(String.raw`A = \pi \times r \times r`),
        t("If you are given the diameter d, find the radius first: r = d ÷ 2."),
        t("Round to 2 decimal places unless told otherwise."),
      ],
    },
    {
      id: "4e-worked",
      heading: "Worked example: area from radius",
      body: [
        t("Find the area of a circle with radius 5 cm. Use π ≈ 3.14."),
        m(String.raw`A = 3.14 \times 5^2 = 3.14 \times 25 = 78.5 \text{ cm}^2`),
        t("Square the radius (5² = 25), then multiply by 3.14."),
      ],
    },
    {
      id: "4e-compare",
      heading: "Common mistake: radius vs diameter",
      body: [
        t(
          "A very common mistake is using the diameter instead of the radius in A = πr².",
        ),
        t(
          "If the diameter is 10 cm, the radius is 5 cm. Using d = 10 directly gives A = π × 10² = π × 100 ≈ 314 cm², which is four times the correct answer.",
        ),
        t("Correct: r = 5 cm, A = π × 5² = π × 25 ≈ 78.5 cm²."),
        t(
          "Always check: are you using the radius or the diameter? The formula uses r, not d.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4e-p1",
      type: "numeric",
      prompt: [
        t("Find the area of a circle with radius 5 cm. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        m(String.raw`A = 3.14 \times 5^2 = 3.14 \times 25 = 78.5 \text{ cm}^2`),
      ],
      xp: 10,
      accepted: ["78.5"],
    },
    {
      id: "4e-p2",
      type: "numeric",
      prompt: [
        t("A circle has diameter 12 cm. Find its area. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Radius = 12 ÷ 2 = 6 cm."),
        m(
          String.raw`A = 3.14 \times 6^2 = 3.14 \times 36 = 113.04 \text{ cm}^2`,
        ),
      ],
      xp: 10,
      accepted: ["113.04"],
    },
    {
      id: "4e-p3",
      type: "numeric",
      prompt: [
        t("Find the area of a circle with radius 3.5 cm. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        m(
          String.raw`A = 3.14 \times 3.5^2 = 3.14 \times 12.25 = 38.465 \approx 38.47 \text{ cm}^2`,
        ),
        t(
          "3.5² = 3.5 × 3.5 = 12.25. Then 3.14 × 12.25 = 38.465, rounded to 38.47.",
        ),
      ],
      xp: 10,
      accepted: ["38.47", "38.465"],
    },
    {
      id: "4e-p4",
      type: "mcq",
      prompt: [t("If you double the radius of a circle, its area becomes:")],
      explanation: [
        t(
          "If r doubles to 2r, then (2r)² = 4r². The area becomes π × 4r² = 4πr², which is 4 times the original area.",
        ),
        t(
          "Because area depends on r², doubling the radius quadruples the area.",
        ),
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
    {
      id: "4e-p5",
      type: "numeric",
      prompt: [
        t("A circular pond has area 78.5 m². Find its radius. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("."),
      ],
      explanation: [
        m(String.raw`r^2 = \frac{78.5}{3.14} = 25`),
        m(String.raw`r = \sqrt{25} = 5 \text{ m}`),
        t("Rearrange A = πr² to r² = A ÷ π, then take the square root."),
      ],
      xp: 15,
      accepted: ["5"],
      unit: "m",
    },
    {
      id: "4e-p6",
      type: "shortText",
      prompt: [
        t("A circle has circumference 31.4 cm. Find its area. Use"),
        m(String.raw`\pi \approx 3.14`),
        t(". Give the number with units."),
      ],
      explanation: [
        t("First find r: r = C ÷ (2π) = 31.4 ÷ 6.28 = 5 cm."),
        m(String.raw`A = 3.14 \times 5^2 = 78.5 \text{ cm}^2`),
        t("When given circumference, find the radius first, then use A = πr²."),
      ],
      xp: 15,
      accepted: ["78.5 cm2", "78.5 cm^2", "78.5cm2", "78.5"],
    },
    {
      id: "4e-p7",
      type: "shortText",
      prompt: [
        t(
          "What happens to the area of a circle if you triple the radius? Write your answer as a number followed by 'times'.",
        ),
      ],
      explanation: [
        t("If r → 3r, then r² → 9r². The area becomes 9 times the original."),
        t("The area scales with the square of the scale factor: 3² = 9."),
      ],
      xp: 15,
      accepted: ["9 times", "9times", "9", "nine times"],
    },
    {
      id: "4e-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [
        t("Diameter = 8, so radius = 4. A = 3.14 × 16 = 50.24 cm²."),
      ],
      xp: 15,
      template: [
        t("A circle has diameter 8 cm. Its area is ___ cm². (Use π ≈ 3.14)"),
      ],
      accepted: ["50.24"],
    },
    {
      id: "4e-p9",
      type: "mcq",
      prompt: [
        t(
          "Circle P has radius 4 cm. Circle Q has radius 12 cm. How many times larger is the area of Circle Q?",
        ),
      ],
      explanation: [
        t("Area scales with r². Scale factor for radius: 12 ÷ 4 = 3."),
        t("Area scale factor: 3² = 9. Circle Q is 9 times larger in area."),
        t("Check: P area = π × 16, Q area = π × 144. 144 ÷ 16 = 9."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("9 times")] },
        { id: "b", label: [t("3 times")] },
        { id: "c", label: [t("6 times")] },
        { id: "d", label: [t("27 times")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4e-p10",
      type: "numeric",
      prompt: [
        t("A semicircle has radius 6 cm. Find its area. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Full circle:"),
        m(String.raw`A = 3.14 \times 36 = 113.04 \text{ cm}^2`),
        t("Half:"),
        m(String.raw`113.04 \div 2 = 56.52 \text{ cm}^2`),
        t("A semicircle is exactly half of a full circle."),
      ],
      xp: 20,
      accepted: ["56.52"],
    },
  ],
  mastery: [
    {
      id: "4e-m1",
      type: "numeric",
      prompt: [
        t("Find the area of a circle with diameter 16 cm. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Radius = 16 ÷ 2 = 8 cm."),
        m(
          String.raw`A = 3.14 \times 8^2 = 3.14 \times 64 = 200.96 \text{ cm}^2`,
        ),
      ],
      xp: 15,
      accepted: ["200.96"],
    },
    {
      id: "4e-m2",
      type: "numeric",
      prompt: [
        t("A circular pizza has area 153.86 cm². What is its diameter? Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to the nearest cm."),
      ],
      explanation: [
        m(String.raw`r^2 = \frac{153.86}{3.14} = 49`),
        m(String.raw`r = 7 \text{ cm}`),
        t("Diameter = 2 × 7 = 14 cm."),
      ],
      xp: 15,
      accepted: ["14"],
      unit: "cm",
    },
    {
      id: "4e-m3",
      type: "mcq",
      prompt: [
        t(
          "A circle and a square have the same perimeter of 40 cm. Which has the larger area? Use π ≈ 3.14.",
        ),
      ],
      explanation: [
        t("Square: side = 40 ÷ 4 = 10 cm, area = 10² = 100 cm²."),
        t(
          "Circle: C = 2πr = 40, so r = 40 ÷ 6.28 ≈ 6.37 cm. Area = π × 6.37² ≈ 127.4 cm².",
        ),
        t(
          "For a given perimeter, a circle encloses more area than any other shape. The circle wins.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("The circle")] },
        { id: "b", label: [t("The square")] },
        { id: "c", label: [t("They are equal")] },
        { id: "d", label: [t("Not enough information")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4e-m4",
      type: "numeric",
      prompt: [
        t("A quarter circle has radius 8 cm. Find its area. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Full circle: A = 3.14 × 64 = 200.96 cm²."),
        t("Quarter: 200.96 ÷ 4 = 50.24 cm²."),
      ],
      xp: 20,
      accepted: ["50.24"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 5: 4F Area of sectors and composite shapes
// ---------------------------------------------------------------------------

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
      heading: "Key idea: sector area",
      body: [
        t(
          "A sector is a slice of a circle, like a pizza slice. Its area is a fraction of the full circle's area.",
        ),
        t("For a sector with angle θ (in degrees):"),
        m(String.raw`\text{Sector area} = \frac{\theta}{360} \times \pi r^2`),
        t("Common fractions:"),
        t("• Quarter circle: θ = 90°, fraction = 90/360 = 1/4."),
        t("• Semicircle: θ = 180°, fraction = 180/360 = 1/2."),
        t("• One-third circle: θ = 120°, fraction = 120/360 = 1/3."),
      ],
    },
    {
      id: "4f-composite",
      heading: "Key idea: composite shapes",
      body: [
        t("A composite shape is made by combining two or more basic shapes."),
        t(
          "Strategy: split the shape into rectangles, triangles, circles, or semicircles. Find each individual area, then add (or subtract) them.",
        ),
        t(
          "For shapes with holes or cutouts, subtract the cutout area from the larger shape.",
        ),
        t("Always draw a sketch and label any dimensions you calculate."),
      ],
    },
    {
      id: "4f-worked",
      heading: "Worked example: L-shape",
      body: [
        t(
          "An L-shape can be split into two rectangles: a 10 cm by 4 cm rectangle on top, and a 6 cm by 5 cm rectangle on the bottom.",
        ),
        t("Top rectangle: A = 10 × 4 = 40 cm²."),
        t("Bottom rectangle: A = 6 × 5 = 30 cm²."),
        t("Total area: 40 + 30 = 70 cm²."),
        t(
          "Do not double-count the overlapping region - make sure you split cleanly along a boundary.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4f-p1",
      type: "numeric",
      prompt: [
        t("Find the area of a quarter circle with radius 4 cm. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        m(
          String.raw`A = \frac{90}{360} \times 3.14 \times 4^2 = \frac{1}{4} \times 3.14 \times 16 = 12.56 \text{ cm}^2`,
        ),
        t(
          "A quarter circle is a sector with θ = 90°, which is 1/4 of the full circle.",
        ),
      ],
      xp: 10,
      accepted: ["12.56"],
    },
    {
      id: "4f-p2",
      type: "numeric",
      prompt: [
        t("Find the area of a sector with radius 6 cm and angle 60°. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        m(
          String.raw`A = \frac{60}{360} \times 3.14 \times 6^2 = \frac{1}{6} \times 3.14 \times 36 = 3.14 \times 6 = 18.84 \text{ cm}^2`,
        ),
        t(
          "60° is 1/6 of a full circle. Simpler to compute as (3.14 × 36) ÷ 6 = 113.04 ÷ 6 = 18.84.",
        ),
      ],
      xp: 10,
      accepted: ["18.84"],
    },
    {
      id: "4f-p3",
      type: "numeric",
      prompt: [
        t(
          "A shape consists of a 10 cm by 6 cm rectangle with a semicircle of diameter 6 cm attached to one of the 6 cm sides. Find the total area. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Rectangle: 10 × 6 = 60 cm²."),
        t("Semicircle radius: 3 cm."),
        m(
          String.raw`\text{Semicircle area} = \frac{1}{2} \times 3.14 \times 9 = 14.13 \text{ cm}^2`,
        ),
        t("Total: 60 + 14.13 = 74.13 cm²."),
      ],
      xp: 10,
      accepted: ["74.13"],
    },
    {
      id: "4f-p4",
      type: "mcq",
      prompt: [
        t("What is the best method to find the area of an L-shaped figure?"),
      ],
      explanation: [
        t(
          "Split the L-shape into two non-overlapping rectangles, find each area, and add them.",
        ),
        t(
          "Alternatively, find the area of the bounding rectangle and subtract the missing rectangular corner. Both methods give the same result.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [t("Split into two rectangles and add their areas")],
        },
        { id: "b", label: [t("Use the formula for a triangle")] },
        {
          id: "c",
          label: [t("Multiply the longest side by the shortest side")],
        },
        { id: "d", label: [t("Guess based on similar shapes")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4f-p5",
      type: "shortText",
      prompt: [
        t("A sector has radius 5 cm and angle 120°. Find its area. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp. Give the number with units."),
      ],
      explanation: [
        m(
          String.raw`A = \frac{120}{360} \times 3.14 \times 25 = \frac{1}{3} \times 78.5 = 26.17 \text{ cm}^2`,
        ),
        t(
          "120° is one third of 360°. Full circle area: 78.5. One third: 26.17 (rounded).",
        ),
      ],
      xp: 15,
      accepted: ["26.17 cm2", "26.17 cm^2", "26.17cm2", "26.17"],
    },
    {
      id: "4f-p6",
      type: "numeric",
      prompt: [
        t(
          "A composite shape is made from a 12 cm by 8 cm rectangle, with a quarter circle of radius 4 cm cut out from one corner. Find the remaining area. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Rectangle: 12 × 8 = 96 cm²."),
        t("Quarter circle:"),
        m(String.raw`\frac{1}{4} \times 3.14 \times 16 = 12.56 \text{ cm}^2`),
        t("Remaining: 96 - 12.56 = 83.44 cm²."),
        t("When a shape is cut out, subtract its area."),
      ],
      xp: 15,
      accepted: ["83.44"],
    },
    {
      id: "4f-p7",
      type: "shortText",
      prompt: [
        t(
          "A composite shape is formed by joining a triangle and a semicircle. The triangle has base 8 cm and height 6 cm. The semicircle sits on the base and has diameter 8 cm. Which basic area formulas do you need? List them.",
        ),
      ],
      explanation: [
        t(
          "You need the triangle area formula (A = ½bh) and the circle area formula (A = πr²), then halve the circle result for the semicircle.",
        ),
        t(
          "Triangle: ½ × 8 × 6 = 24 cm². Semicircle: ½ × π × 4² = ½ × 3.14 × 16 = 25.12 cm². Total: 49.12 cm².",
        ),
      ],
      xp: 15,
      accepted: [
        "triangle and circle",
        "triangle formula and circle formula",
        "½bh and πr²",
        "1/2bh and πr2",
        "triangle, circle",
      ],
    },
    {
      id: "4f-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      explanation: [
        t(
          "Outer: 3.14 × 25 = 78.5. Inner: 3.14 × 9 = 28.26. Ring area: 78.5 - 28.26 = 50.24 cm².",
        ),
      ],
      xp: 15,
      template: [
        t(
          "An annulus (flat ring) has outer radius 5 cm and inner radius 3 cm. Its area is ___ cm². (Use π ≈ 3.14)",
        ),
      ],
      accepted: ["50.24"],
    },
    {
      id: "4f-p9",
      type: "numeric",
      prompt: [
        t(
          "A running track has two straight sides of 100 m each, and two semicircular ends each of radius 31.83 m. Find the area enclosed by the track. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to the nearest whole m²."),
      ],
      explanation: [
        t(
          "The track encloses a rectangle (100 m × 63.66 m) plus two semicircles (together making one full circle of r = 31.83 m).",
        ),
        t("Rectangle: 100 × 63.66 = 6366."),
        t("Circle: 3.14 × 31.83² = 3.14 × 1013.15 ≈ 3181.3."),
        t("Total ≈ 6366 + 3181 = 9547 m²."),
      ],
      xp: 15,
      accepted: ["9547", "9548"],
    },
    {
      id: "4f-p10",
      type: "mcq",
      prompt: [
        t("A sector with angle 45° is what fraction of the full circle?"),
      ],
      explanation: [
        t("45 ÷ 360 = 1/8. The sector is one eighth of the full circle."),
        t("The area of the sector = (1/8) × πr²."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("1/8")] },
        { id: "b", label: [t("1/4")] },
        { id: "c", label: [t("1/6")] },
        { id: "d", label: [t("1/3")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4f-m1",
      type: "numeric",
      prompt: [
        t("A sector has angle 150° and radius 10 cm. Find its area. Use"),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        m(
          String.raw`A = \frac{150}{360} \times 3.14 \times 100 = \frac{5}{12} \times 314`,
        ),
        m(String.raw`= \frac{1570}{12} = 130.83 \text{ cm}^2`),
        t(
          "Full circle: 314 cm². Fraction: 150/360 = 5/12. 314 × 5 ÷ 12 = 130.83.",
        ),
      ],
      xp: 15,
      accepted: ["130.83"],
    },
    {
      id: "4f-m2",
      type: "numeric",
      prompt: [
        t(
          "A composite shape is a 15 cm by 10 cm rectangle with a semicircle of diameter 10 cm cut from one of the longer sides, curving inward. Find the remaining area. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Rectangle: 15 × 10 = 150 cm²."),
        t("Semicircle (radius 5): ½ × 3.14 × 25 = 39.25 cm²."),
        t("Remaining: 150 - 39.25 = 110.75 cm²."),
      ],
      xp: 15,
      accepted: ["110.75"],
    },
    {
      id: "4f-m3",
      type: "numeric",
      prompt: [
        t(
          "An annulus has outer radius 8 cm and inner radius 5 cm. Find its area. Use",
        ),
        m(String.raw`\pi \approx 3.14`),
        t("and round to 2 dp."),
      ],
      explanation: [
        t("Outer: 3.14 × 64 = 200.96 cm²."),
        t("Inner: 3.14 × 25 = 78.5 cm²."),
        t("Annulus: 200.96 - 78.5 = 122.46 cm²."),
        t("An annulus is the region between two concentric circles."),
      ],
      xp: 15,
      accepted: ["122.46"],
    },
    {
      id: "4f-m4",
      type: "mcq",
      prompt: [
        t(
          "A shape is made of a square of side 10 cm, with a quarter circle of radius 10 cm in one corner. The quarter circle area is:",
        ),
      ],
      explanation: [
        t("Full circle: 3.14 × 100 = 314 cm². Quarter: 314 ÷ 4 = 78.5 cm²."),
        t("The quarter circle occupies one corner of the square."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("78.5 cm²")] },
        { id: "b", label: [t("31.4 cm²")] },
        { id: "c", label: [t("157 cm²")] },
        { id: "d", label: [t("100 cm²")] },
      ],
      correctOptionId: "a",
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge — Perimeter and Area
// ---------------------------------------------------------------------------

/** Boss challenge questions for the Perimeter and Area track. */
const perimeterAreaChallengeQuestions: Question[] = [
  {
    id: "pa-boss-q1",
    type: "numeric",
    prompt: [
      t("A circle has circumference 62.8 cm. Find its area. Use"),
      m(String.raw`\pi \approx 3.14`),
      t("and round to 2 dp."),
    ],
    explanation: [
      t("Find radius first:"),
      m(
        String.raw`r = \frac{62.8}{2 \times 3.14} = \frac{62.8}{6.28} = 10 \text{ cm}`,
      ),
      m(String.raw`A = 3.14 \times 10^2 = 3.14 \times 100 = 314 \text{ cm}^2`),
      t(
        "When given circumference, always find the radius first before computing area.",
      ),
    ],
    xp: 20,
    accepted: ["314"],
  },
  {
    id: "pa-boss-q2",
    type: "numeric",
    prompt: [
      t(
        "A running track has two straight sides of 100 m each, and two semicircular ends each of radius 31.83 m. Find the perimeter of the track, rounded to the nearest metre. Use",
      ),
      m(String.raw`\pi \approx 3.14`),
      t("."),
    ],
    explanation: [
      t("Two straight sides: 2 × 100 = 200 m."),
      t(
        "Two semicircles form one full circle: C = 2 × 3.14 × 31.83 ≈ 199.89 m.",
      ),
      t("Total perimeter ≈ 200 + 200 = 400 m."),
      t("The two semicircular ends together make one complete circle."),
    ],
    xp: 25,
    accepted: ["400"],
    unit: "m",
  },
  {
    id: "pa-boss-q3",
    type: "numeric",
    prompt: [
      t(
        "A composite shape consists of a right-angled triangle (base 12 cm, height 5 cm) and a semicircle of diameter 5 cm attached to the height side. Find the total area. Use",
      ),
      m(String.raw`\pi \approx 3.14`),
      t("and round to 2 dp."),
    ],
    explanation: [
      t("Triangle:"),
      m(String.raw`\frac{1}{2} \times 12 \times 5 = 30 \text{ cm}^2`),
      t("Semicircle (radius 2.5 cm):"),
      m(
        String.raw`\frac{1}{2} \times 3.14 \times (2.5)^2 = \frac{1}{2} \times 3.14 \times 6.25 = 9.8125 \text{ cm}^2`,
      ),
      t("Total: 30 + 9.8125 = 39.8125 ≈ 39.81 cm²."),
    ],
    xp: 25,
    accepted: ["39.81", "39.8125"],
  },
  {
    id: "pa-boss-q4",
    type: "mcq",
    prompt: [
      t(
        "A square and a circle have the same perimeter of 40 units. Which has the larger area, and by how much? Use π ≈ 3.14.",
      ),
    ],
    explanation: [
      t("Square: side = 40 ÷ 4 = 10. Area = 10² = 100 square units."),
      t(
        "Circle: C = 2πr = 40 → r = 40 ÷ 6.28 ≈ 6.369. Area = π × 6.369² ≈ 127.4 square units.",
      ),
      t(
        "The circle's area is about 27% larger. For any given perimeter, the circle encloses the maximum possible area.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("The circle, by about 27 square units")] },
      { id: "b", label: [t("The square, by about 27 square units")] },
      { id: "c", label: [t("They are exactly equal")] },
      { id: "d", label: [t("The circle, by about 50 square units")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "pa-boss-q5",
    type: "numeric",
    prompt: [
      t(
        "A composite shape is made from a 20 cm by 10 cm rectangle with two identical quarter circles (radius 5 cm each) cut from two adjacent corners. Find the remaining area. Use",
      ),
      m(String.raw`\pi \approx 3.14`),
      t("."),
    ],
    explanation: [
      t("Rectangle: 20 × 10 = 200 cm²."),
      t("Two quarter circles together make one half circle:"),
      m(
        String.raw`\frac{1}{2} \times 3.14 \times 5^2 = \frac{1}{2} \times 3.14 \times 25 = 39.25 \text{ cm}^2`,
      ),
      t("Remaining area: 200 - 39.25 = 160.75 cm²."),
      t(
        "When two cutouts are quarter circles of the same radius on adjacent corners, their total is a half circle.",
      ),
    ],
    xp: 20,
    accepted: ["160.75"],
  },
];

// ---------------------------------------------------------------------------
// Track export
// ---------------------------------------------------------------------------

/** The Perimeter and Area track (Year 8, chapter 4). */
export const perimeterAndAreaTrack: Track = {
  id: "perimeter-and-area",
  subjectId: "maths",
  title: "Perimeter and Area (Year 8)",
  description:
    "Calculating perimeter, circumference, and area of shapes including rectangles, triangles, circles, sectors and composite figures.",
  lessons: [
    lengthAndPerimeter,
    circumference,
    area,
    areaOfCircles,
    sectorsAndComposite,
  ],
  challenge: {
    id: "perimeter-and-area-boss",
    title: "Boss challenge: Perimeter and area",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Weeks 3-4",
    questions: perimeterAreaChallengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-perimeter-and-area",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
