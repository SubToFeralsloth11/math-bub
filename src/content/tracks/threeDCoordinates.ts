/**
 * Three-Dimensional Coordinate Systems track content (Year 8, chapter 2).
 *
 * Covers plotting points in 3D using (x, y, z) coordinates, reading
 * coordinates from diagrams, finding midpoints, and identifying vertices
 * of 3D shapes such as cubes and rectangular prisms — based on the 2026
 * Year 8 Maths Class Notebook curriculum plan (Term 2, Week 10).
 *
 * @author John Grimes
 * @module content/tracks/threeDCoordinates
 */

import { m, t } from "../blocks";

import type {
  AiProvenance,
  Figure,
  Lesson,
  Track,
} from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

const fig3DAxes: Figure = {
  id: "coordinate-3d-axes",
  alt: "Three-dimensional coordinate system with x-axis (left-right), y-axis (forward-back into page), and z-axis (up-down). A point labelled P(2, 3, 4) is plotted with dashed guide lines to each axis.",
  textFallback:
    "[Diagram: 3D coordinate axes labelled x, y, z with a point P(2, 3, 4) plotted and guide lines to each axis]",
};

const fig3DCube: Figure = {
  id: "coordinate-3d-cube",
  alt: "A 2 by 2 by 2 cube in three-dimensional space with one vertex at the origin O(0, 0, 0). All eight vertices are labelled with their (x, y, z) coordinates, showing the opposite vertex at (2, 2, 2).",
  textFallback:
    "[Diagram: A 2×2×2 cube with vertex O at the origin (0,0,0) and the opposite vertex at (2,2,2); all eight vertices labelled with coordinates]",
};

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Shared AI provenance for every lesson and the boss challenge.
// ---------------------------------------------------------------------------

const provenance: AiProvenance = {
  tool: "Claude",
  sources: ["2026 - Year 8 Maths Class Notebook"],
  role: "generated",
};

// ===========================================================================
// Lesson 1 — 2G Introduction to 3D coordinates
// ===========================================================================

const lesson1: Lesson = {
  id: "3d-introduction",
  order: 1,
  title: "2G Introduction to three-dimensional coordinates",
  sourceRef: "2G",
  aiProvenance: provenance,
  learnCards: [
    {
      id: "3d1-key",
      heading: "Key idea: from 2D to 3D",
      figure: fig3DAxes,
      body: [
        t(
          "In Year 7 you worked with the Cartesian plane, using an x-coordinate and a y-coordinate to describe a point in two dimensions. In three dimensions, we add a third axis — the z-axis — to describe height (up and down).",
        ),
        t(
          "A point in 3D is written as an ordered triple (x, y, z). The first number is the x-coordinate (left-right), the second is the y-coordinate (forward-back into the page), and the third is the z-coordinate (up-down).",
        ),
        t(
          "The three axes are mutually perpendicular — each is at 90° to the other two. The point where all three axes meet is the origin, O(0, 0, 0).",
        ),
        t(
          "A handy way to remember the order: think of walking to a point in a room. First walk along the floor in the x-direction, then across the floor in the y-direction, then climb up the z-direction. The coordinates are the number of steps in each direction.",
        ),
        t(
          "When drawing 3D axes on paper, we use an oblique (slanted) view. The x-axis points to the right, the z-axis points up, and the y-axis is drawn at about 45° going back into the page. Dashed guide lines help show where a point sits relative to each axis.",
        ),
      ],
    },
    {
      id: "3d1-worked",
      heading: "Worked example: plotting a point in 3D",
      body: [
        t("Question: Plot the point P(3, 4, 2) on a 3D coordinate system."),
        t("Step 1: Start at the origin O(0, 0, 0)."),
        t("Step 2: Move 3 units along the x-axis (to the right)."),
        t(
          "Step 3: From there, move 4 units parallel to the y-axis (back into the page).",
        ),
        t(
          "Step 4: From that position, move 2 units up parallel to the z-axis.",
        ),
        t(
          "Step 5: Mark point P and draw dashed guide lines connecting it back to the axes to show the path you took.",
        ),
        t(
          "The guide lines should show: a line from P straight down to the xy-plane at (3, 4, 0), a line from (3, 4, 0) to (3, 0, 0) on the x-axis, and a line from (3, 0, 0) to the origin.",
        ),
      ],
    },
    {
      id: "3d1-mistake",
      heading: "Common mistake: confusing the coordinate order",
      body: [
        t(
          "Mistake 1: Swapping y and z. In 3D, the order is always (x, y, z). The point (3, 4, 2) is different from (3, 2, 4). The first is 3 right, 4 back, 2 up; the second is 3 right, 2 back, 4 up.",
        ),
        t(
          "Mistake 2: Forgetting that the y-axis goes INTO the page. On a 2D drawing, the y-axis looks like it is sloping down-left. It is important to read the diagram carefully — most diagrams mark the axes with labels so you know which is which.",
        ),
        t(
          "Mistake 3: Thinking that (0, 0, z) is the origin for any z. Only (0, 0, 0) is the origin. The point (0, 0, 5) sits on the z-axis, directly above the origin.",
        ),
        t(
          "Mistake 4: Mixing up the xy-plane, xz-plane, and yz-plane. A point with z = 0 lies on the xy-plane (the floor). A point with y = 0 lies on the xz-plane. A point with x = 0 lies on the yz-plane.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "3d1-p1",
      type: "fillInTheBlank",
      prompt: [t("Complete the definition of a 3D coordinate.")],
      explanation: [
        t(
          "A point in 3D space is described by three numbers: the x-coordinate (left-right), the y-coordinate (forward-back), and the z-coordinate (up-down). Together they form an ordered triple (x, y, z).",
        ),
      ],
      xp: 10,
      template: [
        t(
          "A point in three-dimensional space is written as an ordered ___ (x, y, z).",
        ),
      ],
      accepted: ["triple", "triplet", "set of three"],
    },
    {
      id: "3d1-p2",
      type: "mcq",
      prompt: [
        t("In a 3D coordinate system, what does the z-coordinate represent?"),
      ],
      explanation: [
        t(
          "The z-axis is perpendicular to both the x and y axes, pointing up and down. It represents height. The x-axis goes left-right and the y-axis goes forward-back (into the page in a 2D drawing).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Height (up-down)")] },
        { id: "b", label: [t("Left-right position")] },
        { id: "c", label: [t("Forward-back position")] },
        { id: "d", label: [t("Diagonal distance")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3d1-p3",
      type: "shortText",
      prompt: [t("Which coordinate plane does the point (4, 5, 0) lie on?")],
      explanation: [
        t(
          "A point with z = 0 lies on the xy-plane, sometimes called the floor plane. Every point on the xy-plane has a z-coordinate of zero. Points with x = 0 lie on the yz-plane, and points with y = 0 lie on the xz-plane.",
        ),
      ],
      xp: 10,
      accepted: ["xy-plane", "the xy-plane", "xy plane", "the xy plane"],
    },
    {
      id: "3d1-p4",
      type: "numeric",
      prompt: [
        t(
          "A point is located 5 units to the right of the origin, 3 units into the page, and 7 units up. What is its x-coordinate?",
        ),
      ],
      explanation: [
        t(
          "The x-coordinate describes left-right position. Since the point is 5 units to the right, the x-coordinate is 5. The full coordinates would be (5, 3, 7).",
        ),
      ],
      xp: 10,
      accepted: ["5"],
    },
    {
      id: "3d1-p5",
      type: "mcq",
      prompt: [t("The origin in a 3D coordinate system is written as:")],
      explanation: [
        t(
          "The origin is the point where all three axes intersect. This happens when x = 0, y = 0, and z = 0, so the origin is O(0, 0, 0).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("(0, 0, 0)")] },
        { id: "b", label: [t("(1, 1, 1)")] },
        { id: "c", label: [t("(0, 0)")] },
        { id: "d", label: [t("(0, 1, 0)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3d1-p6",
      type: "numeric",
      prompt: [
        t(
          "A point P has coordinates (6, 2, 9). How many units above the xy-plane is point P?",
        ),
      ],
      explanation: [
        t(
          "The height above the xy-plane is the z-coordinate. The xy-plane is the plane where z = 0. Since the point has z = 9, it is 9 units above the xy-plane.",
        ),
      ],
      xp: 15,
      accepted: ["9"],
    },
    {
      id: "3d1-p7",
      type: "matching",
      prompt: [t("Match each point to the plane it lies on.")],
      explanation: [
        t(
          "A point lies on the xy-plane when z = 0. It lies on the xz-plane when y = 0. It lies on the yz-plane when x = 0. A point on an axis has two coordinates equal to zero: the x-axis means y = z = 0, the y-axis means x = z = 0, and the z-axis means x = y = 0.",
        ),
      ],
      xp: 15,
      pairs: [
        { id: "a", left: [t("(3, 1, 0)")], right: [t("xy-plane")] },
        { id: "b", left: [t("(2, 0, 5)")], right: [t("xz-plane")] },
        { id: "c", left: [t("(0, 4, 3)")], right: [t("yz-plane")] },
        { id: "d", left: [t("(7, 0, 0)")], right: [t("x-axis")] },
      ],
    },
    {
      id: "3d1-p8",
      type: "mcq",
      prompt: [t("Which of these points is closest to the origin?")],
      explanation: [
        t(
          "The distance from the origin to a point (x, y, z) is √(x² + y² + z²). For (1, 1, 1): √(1 + 1 + 1) = √3 ≈ 1.73. For (0, 0, 3): √(0 + 0 + 9) = 3. For (2, 0, 0): √(4) = 2. For (0, 1, 1): √(0 + 1 + 1) = √2 ≈ 1.41. The smallest distance is √2, so (0, 1, 1) is closest.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("(1, 1, 1)")] },
        { id: "b", label: [t("(0, 0, 3)")] },
        { id: "c", label: [t("(2, 0, 0)")] },
        { id: "d", label: [t("(0, 1, 1)")] },
      ],
      correctOptionId: "d",
    },
    {
      id: "3d1-p9",
      type: "numeric",
      prompt: [
        t(
          "A point lies on the z-axis and is 8 units above the origin. What are its coordinates? Write as three numbers separated by commas, e.g. '1, 2, 3'.",
        ),
      ],
      explanation: [
        t(
          "A point on the z-axis has x = 0 and y = 0. If it is 8 units above the origin, its z-coordinate is 8. The coordinates are (0, 0, 8).",
        ),
      ],
      xp: 15,
      accepted: ["0,0,8", "0, 0, 8", "(0,0,8)", "(0, 0, 8)"],
    },
    {
      id: "3d1-p10",
      type: "shortText",
      prompt: [
        t(
          "Explain the difference between the points (4, 2, 5) and (4, 5, 2) in a 3D coordinate system.",
        ),
      ],
      explanation: [
        t(
          "In (4, 2, 5), the y-coordinate is 2 and the z-coordinate is 5, so the point is 4 right, 2 back, and 5 up. In (4, 5, 2), the y-coordinate is 5 and the z-coordinate is 2, so the point is 4 right, 5 back, and 2 up. The first point is higher but closer to the viewer in the y-direction; the second is further back but lower. They are completely different positions.",
        ),
      ],
      xp: 15,
      accepted: [
        "the y and z coordinates are swapped",
        "first point is 2 back and 5 up, second is 5 back and 2 up",
        "(4,2,5) has y=2 z=5, (4,5,2) has y=5 z=2",
        "they have different y and z values",
      ],
    },
  ],
  mastery: [
    {
      id: "3d1-m1",
      type: "numeric",
      prompt: [
        t(
          "A point P has coordinates (0, 5, 12). How far is it from the origin? Hint: use ",
        ),
        m(String.raw`d = \sqrt{x^2 + y^2 + z^2}`),
        t("."),
      ],
      explanation: [
        t(
          "Using the 3D distance formula: d = √(0² + 5² + 12²) = √(0 + 25 + 144) = √169 = 13. The point is 13 units from the origin. Notice that 5-12-13 is a Pythagorean triple in the yz-plane.",
        ),
      ],
      xp: 15,
      accepted: ["13"],
    },
    {
      id: "3d1-m2",
      type: "shortText",
      prompt: [
        t(
          "A student says: 'The point (0, 0, 0) is the only point on all three axes.' Is this correct? Explain.",
        ),
      ],
      explanation: [
        t(
          "Yes, this is correct. The origin O(0, 0, 0) is the intersection of all three axes. To be on the x-axis, a point must have y = 0 and z = 0; to be on the y-axis, x = 0 and z = 0; to be on the z-axis, x = 0 and y = 0. The only point that satisfies all three conditions simultaneously is (0, 0, 0).",
        ),
      ],
      xp: 15,
      accepted: [
        "yes",
        "yes, the origin is the only intersection point of all three axes",
        "correct, (0,0,0) is the only point where all three axes meet",
        "yes it is true",
      ],
    },
    {
      id: "3d1-m3",
      type: "mcq",
      prompt: [
        t("A point has coordinates "),
        m(String.raw`(a, b, 0)`),
        t(". Which of the following must be true?"),
      ],
      explanation: [
        t(
          "When z = 0, the point lies on the xy-plane. The values of x = a and y = b can be any numbers. The point could lie on the x-axis if b = 0, but this is not required because b could be non-zero. Since we do not know b, the only thing we know for certain is that z = 0, meaning the point is on the xy-plane.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("The point lies on the xy-plane")] },
        { id: "b", label: [t("The point lies on the x-axis")] },
        { id: "c", label: [t("The point is the origin")] },
        { id: "d", label: [t("The point lies on the z-axis")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3d1-m4",
      type: "numeric",
      prompt: [
        t(
          "The point P(6, 8, 0) is in the xy-plane. How far is P from the origin?",
        ),
      ],
      explanation: [
        t(
          "Since z = 0, the distance is the same as the 2D distance in the xy-plane: d = √(6² + 8²) = √(36 + 64) = √100 = 10. The 6-8-10 triangle is a scaled 3-4-5 Pythagorean triple.",
        ),
      ],
      xp: 15,
      accepted: ["10"],
    },
  ],
};

// ===========================================================================
// Lesson 2 — 2G Coordinates of 3D shapes
// ===========================================================================

const lesson2: Lesson = {
  id: "3d-shapes",
  order: 2,
  title: "2G Coordinates of three-dimensional shapes",
  sourceRef: "2G",
  aiProvenance: provenance,
  learnCards: [
    {
      id: "3d2-key",
      heading: "Key idea: vertices of cubes and rectangular prisms",
      figure: fig3DCube,
      body: [
        t(
          "When a 3D shape sits in a coordinate system, each vertex (corner) has its own (x, y, z) coordinates. By placing one vertex at the origin and aligning the edges with the axes, the coordinates become easy to read.",
        ),
        t(
          "For a cube with side length s, with one vertex at O(0, 0, 0) and edges along the positive axes, the opposite vertex is at (s, s, s). The other six vertices are found by setting one or two coordinates to zero and the others to s.",
        ),
        t(
          "For example, a 2 by 2 by 2 cube has vertices: (0,0,0), (2,0,0), (2,2,0), (0,2,0) on the bottom face, and (0,0,2), (2,0,2), (2,2,2), (0,2,2) on the top face.",
        ),
        t(
          "For a rectangular prism with length L, width W, and height H, the vertex opposite the origin is at (L, W, H). The bottom face has z = 0, and the top face has z = H.",
        ),
        t(
          "A key skill is identifying which vertex is which from a diagram. Look at the position along each axis: is the vertex at the front or back? Left or right? Top or bottom? Trace the edges back to the axes to determine each coordinate.",
        ),
      ],
    },
    {
      id: "3d2-worked",
      heading: "Worked example: coordinates of a rectangular prism",
      body: [
        t(
          "Question: A rectangular prism is 4 units long (x-direction), 3 units wide (y-direction), and 5 units high (z-direction). One vertex is at the origin. List the coordinates of all eight vertices.",
        ),
        t(
          "Step 1: Identify the bottom face (z = 0). The four vertices run through the x and y directions:",
        ),
        t("  A(0, 0, 0) — at the origin."),
        t("  B(4, 0, 0) — 4 along the x-axis."),
        t("  C(4, 3, 0) — 4 along x, 3 along y."),
        t("  D(0, 3, 0) — 3 along the y-axis."),
        t(
          "Step 2: The top face (z = 5) has the same x and y values but z = 5:",
        ),
        t("  E(0, 0, 5), F(4, 0, 5), G(4, 3, 5), H(0, 3, 5)."),
        t("Step 3: Check — the opposite vertex to the origin is G(4, 3, 5)."),
      ],
    },
    {
      id: "3d2-mistake",
      heading: "Common mistake: forgetting the y-direction direction",
      body: [
        t(
          "Mistake 1: Listing vertices of a cube in the wrong order. Always follow the same path around each face. For the bottom face, go from the origin → along x → across y → back to y-axis → close the rectangle.",
        ),
        t(
          "Mistake 2: Treating the 3D y-axis like the 2D y-axis. In 3D diagrams, the y-axis is usually drawn at an angle sloping down-left (into the page). This does not mean the y-coordinate is negative — it is just the perspective drawing convention.",
        ),
        t(
          "Mistake 3: Confusing width and depth. The y-axis represents depth (into the page). In problems, this might be called width, depth, or breadth — do not confuse it with the x-axis (length) or the z-axis (height).",
        ),
        t(
          "Mistake 4: Forgetting that coordinates can be negative. If a vertex is behind the origin or to the left, its coordinate in that direction is negative.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "3d2-p1",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about 3D shapes.")],
      explanation: [
        t(
          "A cube has eight vertices (corners). In a 3D coordinate system, each vertex has its own (x, y, z) coordinates. If one vertex is at the origin, the opposite vertex of a cube with side length s is at (s, s, s).",
        ),
      ],
      xp: 10,
      template: [
        t(
          "A 3 by 3 by 3 cube with one vertex at the origin has its opposite vertex at ___.",
        ),
      ],
      accepted: ["(3,3,3)", "3,3,3", "(3, 3, 3)", "3, 3, 3"],
    },
    {
      id: "3d2-p2",
      type: "numeric",
      prompt: [
        t(
          "A cube has side length 4. One vertex is at the origin and edges are along the positive axes. How many vertices does it have?",
        ),
      ],
      explanation: [
        t(
          "Every cube has 8 vertices (one at each corner), regardless of its size. This is true for any rectangular prism — it always has 8 vertices.",
        ),
      ],
      xp: 10,
      accepted: ["8", "eight"],
    },
    {
      id: "3d2-p3",
      type: "numeric",
      prompt: [
        t(
          "A cube of side length 5 sits with one vertex at the origin and edges along the axes. What is the z-coordinate of the top face?",
        ),
      ],
      explanation: [
        t(
          "The z-coordinate is the height. Since the cube has side length 5 and z is measured upward from the origin, the top face is at z = 5. The bottom face is at z = 0.",
        ),
      ],
      xp: 10,
      accepted: ["5"],
    },
    {
      id: "3d2-p4",
      type: "mcq",
      prompt: [
        t(
          "A rectangular prism is 6 units long, 4 units wide, and 3 units high, with one vertex at the origin. What are the coordinates of the vertex furthest from the origin?",
        ),
      ],
      explanation: [
        t(
          "The vertex opposite the origin is at the maximum value in each direction: (6, 4, 3). This is because the prism extends 6 in x, 4 in y, and 3 in z. Every other vertex has at least one smaller coordinate.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("(6, 4, 3)")] },
        { id: "b", label: [t("(6, 4, 0)")] },
        { id: "c", label: [t("(0, 0, 3)")] },
        { id: "d", label: [t("(6, 0, 3)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3d2-p5",
      type: "numeric",
      prompt: [
        t(
          "A cube has one vertex at O(0, 0, 0) and the opposite vertex at (3, 3, 3). What is the side length of the cube?",
        ),
      ],
      explanation: [
        t(
          "If the opposite vertex is at (3, 3, 3), the cube extends 3 units in each direction from the origin, so the side length is 3. The volume would be 3³ = 27 cubic units.",
        ),
      ],
      xp: 10,
      accepted: ["3"],
    },
    {
      id: "3d2-p6",
      type: "matching",
      prompt: [
        t(
          "A 2 by 2 by 2 cube has one vertex at the origin. Match each vertex to its coordinates.",
        ),
      ],
      explanation: [
        t(
          "The bottom face (z = 0) has vertices (0,0,0), (2,0,0), (2,2,0), (0,2,0). The top face (z = 2) has vertices (0,0,2), (2,0,2), (2,2,2), (0,2,2). The vertex (0,2,2) is at the back-left of the top face; (2,0,2) is at the front-right of the top face.",
        ),
      ],
      xp: 15,
      pairs: [
        { id: "a", left: [t("Origin")], right: [t("(0, 0, 0)")] },
        {
          id: "b",
          left: [t("Front-right on the top face")],
          right: [t("(2, 0, 2)")],
        },
        {
          id: "c",
          left: [t("Back-left on the top face")],
          right: [t("(0, 2, 2)")],
        },
        {
          id: "d",
          left: [t("Back-right on the bottom face")],
          right: [t("(2, 2, 0)")],
        },
      ],
    },
    {
      id: "3d2-p7",
      type: "shortText",
      prompt: [
        t(
          "A rectangular prism has vertices at (0,0,0), (5,0,0), (5,3,0), (0,3,0), and four more vertices directly above these at z = 4. Write the coordinates of the vertex directly above (5,3,0).",
        ),
      ],
      explanation: [
        t(
          "The vertex directly above (5, 3, 0) has the same x and y coordinates, but z = 4 instead of z = 0. So it is (5, 3, 4). The top face has the same x and y values as the bottom face, just with z = 4.",
        ),
      ],
      xp: 15,
      accepted: ["(5,3,4)", "(5, 3, 4)", "5,3,4", "5, 3, 4"],
    },
    {
      id: "3d2-p8",
      type: "numeric",
      prompt: [
        t(
          "A rectangular prism has one vertex at the origin. The opposite vertex is at (6, 4, 3). What is the volume of the prism, in cubic units?",
        ),
      ],
      explanation: [
        t(
          "The prism extends 6 units in the x-direction, 4 units in the y-direction, and 3 units in the z-direction. Volume = length × width × height = 6 × 4 × 3 = 72 cubic units.",
        ),
      ],
      xp: 15,
      accepted: ["72"],
    },
    {
      id: "3d2-p9",
      type: "mcq",
      prompt: [
        t(
          "A cube has vertices at (1, 1, 1) and (4, 4, 4). What is the side length of this cube?",
        ),
      ],
      explanation: [
        t(
          "The difference in each coordinate is 4 - 1 = 3, so the side length is 3. This cube has its origin-corner at (1, 1, 1) and its opposite corner at (4, 4, 4), meaning it is shifted 1 unit in each direction from the true origin. Every edge is 3 units long.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("3")] },
        { id: "b", label: [t("4")] },
        { id: "c", label: [t("1")] },
        { id: "d", label: [t("6")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3d2-p10",
      type: "numeric",
      prompt: [
        t(
          "A rectangular prism has its bottom face on the xy-plane. The vertices of this face are (0, 0, 0), (6, 0, 0), (6, 4, 0), and (0, 4, 0). The top face is at z = 5. How many of the vertices have at least one coordinate equal to zero?",
        ),
      ],
      explanation: [
        t(
          "The bottom face vertices all have z = 0: (0,0,0), (6,0,0), (6,4,0), (0,4,0). The top face vertices are (0,0,5), (6,0,5), (6,4,5), (0,4,5). Among the top four, (0,0,5) has x = 0 and y = 0, (6,0,5) has y = 0, (0,4,5) has x = 0, and (6,4,5) has no zero coordinate. So among the 8 vertices, the ones with at least one zero coordinate are: all 4 bottom vertices plus 3 of the top vertices (all except (6,4,5)), making 7 vertices total.",
        ),
      ],
      xp: 20,
      accepted: ["7", "seven"],
    },
  ],
  mastery: [
    {
      id: "3d2-m1",
      type: "numeric",
      prompt: [
        t(
          "A cube has side length 6. One vertex is at the origin and edges are along the axes. What is the distance from the origin to the opposite vertex? Round to one decimal place.",
        ),
      ],
      explanation: [
        t(
          "The opposite vertex is at (6, 6, 6). Using the 3D distance formula: d = √(6² + 6² + 6²) = √(36 + 36 + 36) = √108. Simplifying: √108 = √(36 × 3) = 6√3 ≈ 6 × 1.732 = 10.4 (to 1 d.p.).",
        ),
      ],
      xp: 15,
      accepted: ["10.4", "10.39", "6√3", "6 sqrt 3", "6√3"],
    },
    {
      id: "3d2-m2",
      type: "shortText",
      prompt: [
        t(
          "A rectangular prism has vertices at (0,0,0) and (L,W,H). Explain how you could find the midpoint of the main diagonal (the line connecting these two opposite vertices).",
        ),
      ],
      explanation: [
        t(
          "The midpoint of a segment in 3D is found by averaging the coordinates of the endpoints: ((0+L)/2, (0+W)/2, (0+H)/2) = (L/2, W/2, H/2). For example, if L = 6, W = 4, H = 2, the midpoint of the main diagonal is (3, 2, 1).",
        ),
      ],
      xp: 15,
      accepted: [
        "average the coordinates",
        "find the average of each coordinate",
        "take the mean of x y z",
        "midpoint is (L/2, W/2, H/2)",
        "add the coordinates and divide by 2",
      ],
    },
    {
      id: "3d2-m3",
      type: "numeric",
      prompt: [
        t(
          "A cube has one vertex at (2, 2, 2) and the opposite vertex at (5, 5, 5). What is the volume of the cube?",
        ),
      ],
      explanation: [
        t(
          "The side length is the difference in any coordinate: 5 - 2 = 3. The volume is side³ = 3³ = 27 cubic units. The cube is centred away from the origin — its lowest corner is at (2, 2, 2) instead of (0, 0, 0).",
        ),
      ],
      xp: 15,
      accepted: ["27"],
    },
    {
      id: "3d2-m4",
      type: "mcq",
      prompt: [
        t(
          "A rectangular prism has bottom face vertices (1, 0, 0), (5, 0, 0), (5, 3, 0), and (1, 3, 0). The top face is at z = 4. Which vertex is furthest from the origin?",
        ),
      ],
      explanation: [
        t(
          "The furthest vertex from the origin is the one with the largest coordinates: (5, 3, 4). This is the vertex opposite the corner that is closest to the origin. The closest vertex to the origin among these is (1, 0, 0). Distances: √(1² + 0² + 0²) = 1 for the closest; √(5² + 3² + 4²) = √(25 + 9 + 16) = √50 ≈ 7.07 for the furthest.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("(5, 3, 4)")] },
        { id: "b", label: [t("(5, 3, 0)")] },
        { id: "c", label: [t("(5, 0, 4)")] },
        { id: "d", label: [t("(1, 3, 4)")] },
      ],
      correctOptionId: "a",
    },
  ],
};

// ===========================================================================
// Boss challenge — Three-Dimensional Coordinates
// ===========================================================================

const bossQuestions = [
  {
    id: "3d-boss-q1",
    type: "numeric" as const,
    prompt: [
      t(
        "A cube has side length 4, with one vertex at the origin and edges along the axes. What is the x-coordinate of the midpoint of the edge connecting (4, 0, 4) and (4, 4, 4)?",
      ),
    ],
    explanation: [
      t(
        "The edge is on the top face (z = 4) along the y-direction from x = 4. The midpoint's x-coordinate is the average of the two x-values: (4 + 4)/2 = 4. The full midpoint is (4, 2, 4).",
      ),
    ],
    xp: 20,
    accepted: ["4"],
  },
  {
    id: "3d-boss-q2",
    type: "mcq" as const,
    prompt: [
      t(
        "A point P has coordinates (3, 4, 12). Which of the following points is the foot of the perpendicular from P to the xy-plane?",
      ),
    ],
    explanation: [
      t(
        "The foot of the perpendicular from a point to the xy-plane is the point directly below it, obtained by setting z = 0 while keeping x and y unchanged. For P(3, 4, 12), the foot is (3, 4, 0).",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("(3, 4, 0)")] },
      { id: "b", label: [t("(3, 0, 12)")] },
      { id: "c", label: [t("(0, 4, 12)")] },
      { id: "d", label: [t("(0, 0, 12)")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "3d-boss-q3",
    type: "numeric" as const,
    prompt: [
      t(
        "A rectangular prism has vertices at (1, 1, 1) and (7, 5, 4) as opposite corners. Find the volume of the prism.",
      ),
    ],
    explanation: [
      t(
        "Length (x) = 7 - 1 = 6. Width (y) = 5 - 1 = 4. Height (z) = 4 - 1 = 3. Volume = 6 × 4 × 3 = 72 cubic units.",
      ),
    ],
    xp: 25,
    accepted: ["72"],
  },
  {
    id: "3d-boss-q4",
    type: "numeric" as const,
    prompt: [
      t(
        "Find the distance between the points A(1, 2, 3) and B(4, 6, 15). Round to one decimal place.",
      ),
    ],
    explanation: [
      t(
        "d = √((4-1)² + (6-2)² + (15-3)²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13. The differences are 3, 4, and 12 — a 3-4-5 triple scaled by 1, 1, and 3, but the overall result is exactly 13.",
      ),
    ],
    xp: 25,
    accepted: ["13"],
  },
  {
    id: "3d-boss-q5",
    type: "mcq" as const,
    prompt: [
      t(
        "A cube of side length s has one vertex at the origin and edges along the axes. What are the coordinates of the midpoint of the main diagonal?",
      ),
    ],
    explanation: [
      t(
        "The main diagonal connects (0, 0, 0) to (s, s, s). The midpoint is ((0+s)/2, (0+s)/2, (0+s)/2) = (s/2, s/2, s/2). This point is the centre of the cube.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("(s/2, s/2, s/2)")] },
      { id: "b", label: [t("(s, s, s)")] },
      { id: "c", label: [t("(s/3, s/3, s/3)")] },
      { id: "d", label: [t("(0, 0, s/2)")] },
    ],
    correctOptionId: "a",
  },
];

// ===========================================================================
// Track export
// ===========================================================================

/** Figures referenced by the 3D coordinates track. */
export const threeDCoordinatesFigures: Figure[] = [fig3DAxes, fig3DCube];

/** The Three-Dimensional Coordinate Systems track for Year 8 maths. */
export const threeDCoordinatesTrack: Track = {
  id: "three-d-coordinates",
  subjectId: "maths",
  title: "3D Coordinate Systems (Year 8)",
  description:
    "Plotting points in three dimensions, identifying coordinates of vertices of 3D shapes such as cubes and rectangular prisms, and finding midpoints and distances.",
  lessons: [lesson1, lesson2],
  challenge: {
    id: "three-d-coordinates-boss",
    title: "Boss challenge: 3D coordinates",
    sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Week 10",
    questions: bossQuestions,
    bonusXp: 110,
    passBadgeId: "boss-three-d-coordinates",
    aiProvenance: provenance,
  },
};
