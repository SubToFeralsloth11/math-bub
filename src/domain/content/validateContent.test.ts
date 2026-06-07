import { describe, expect, it } from "vitest";

import { validateContent } from "./validateContent";

import type {
  AppContent,
  Badge,
  Lesson,
  McqQuestion,
  Question,
  Track,
} from "./types";

// --- Fixture builders: start from valid content, then mutate per test. ---

function mcq(id: string): McqQuestion {
  return {
    id,
    type: "mcq",
    prompt: [{ kind: "text", text: "Pick one" }],
    explanation: [{ kind: "text", text: "Because." }],
    xp: 10,
    options: [
      { id: "a", label: [{ kind: "text", text: "A" }] },
      { id: "b", label: [{ kind: "text", text: "B" }] },
    ],
    correctOptionId: "a",
  };
}

function lesson(order: number, id: string): Lesson {
  return {
    id,
    order,
    title: `Lesson ${order}`,
    sourceRef: "X",
    learnCards: [
      {
        id: `${id}-c1`,
        heading: "Key idea",
        body: [{ kind: "text", text: "Idea" }],
      },
    ],
    practice: [mcq(`${id}-p1`)],
    mastery: [mcq(`${id}-m1`)],
  };
}

function track(id: Track["id"]): Track {
  return {
    id,
    title: `Track ${id}`,
    description: "desc",
    lessons: [lesson(1, `${id}-l1`), lesson(2, `${id}-l2`)],
    challenge: {
      id: `${id}-boss`,
      title: "Boss",
      sourceRef: "Paper",
      questions: [mcq(`${id}-boss-q1`)],
      bonusXp: 100,
      passBadgeId: "boss-pass",
    },
  };
}

function badges(): Badge[] {
  return [
    {
      id: "boss-pass",
      title: "Boss",
      description: "Pass a boss",
      criterion: "boss-pass:algebra",
      icon: "🏆",
    },
  ];
}

function validContent(): AppContent {
  return { tracks: [track("algebra")], badges: badges() };
}

describe("validateContent - valid content", () => {
  it("returns no issues for well-formed content", () => {
    expect(validateContent(validContent())).toEqual([]);
  });
});

describe("validateContent - id uniqueness", () => {
  it("flags duplicate track ids", () => {
    const content = validContent();
    content.tracks.push(track("algebra"));
    expect(validateContent(content).join("\n")).toMatch(/Duplicate track ids/);
  });

  it("flags duplicate lesson ids within a track", () => {
    const content = validContent();
    content.tracks[0].lessons[1].id = content.tracks[0].lessons[0].id;
    expect(validateContent(content).join("\n")).toMatch(
      /duplicate lesson ids/i,
    );
  });

  it("flags duplicate question ids within a lesson", () => {
    const content = validContent();
    content.tracks[0].lessons[0].mastery[0].id =
      content.tracks[0].lessons[0].practice[0].id;
    expect(validateContent(content).join("\n")).toMatch(
      /duplicate question ids/i,
    );
  });
});

describe("validateContent - lesson order", () => {
  it("flags non-contiguous lesson order", () => {
    const content = validContent();
    content.tracks[0].lessons[1].order = 3;
    expect(validateContent(content).join("\n")).toMatch(/contiguous 1\.\.n/);
  });

  it("flags a track with no lessons", () => {
    const content = validContent();
    content.tracks[0].lessons = [];
    expect(validateContent(content).length).toBeGreaterThan(0);
  });
});

describe("validateContent - MCQ integrity", () => {
  it("flags an MCQ with fewer than two options", () => {
    const content = validContent();
    (content.tracks[0].lessons[0].practice[0] as McqQuestion).options = [
      { id: "a", label: [{ kind: "text", text: "A" }] },
    ];
    expect(validateContent(content).join("\n")).toMatch(
      /must have 2-5 options/,
    );
  });

  it("flags an MCQ whose correctOptionId matches no option", () => {
    const content = validContent();
    (content.tracks[0].lessons[0].practice[0] as McqQuestion).correctOptionId =
      "zzz";
    expect(validateContent(content).join("\n")).toMatch(/matches no option/);
  });
});

describe("validateContent - numeric integrity", () => {
  it("flags numeric questions with only empty accepted answers", () => {
    const content = validContent();
    const numeric: Question = {
      id: "n1",
      type: "numeric",
      prompt: [{ kind: "text", text: "?" }],
      explanation: [{ kind: "text", text: "e" }],
      xp: 10,
      accepted: ["  ", ""],
    };
    content.tracks[0].lessons[0].practice = [numeric];
    expect(validateContent(content).join("\n")).toMatch(
      /no non-empty accepted/,
    );
  });
});

describe("validateContent - expression integrity", () => {
  it("accepts a parseable target using only declared variables", () => {
    const content = validContent();
    const expression: Question = {
      id: "e1",
      type: "expression",
      prompt: [{ kind: "text", text: "Expand" }],
      explanation: [{ kind: "text", text: "e" }],
      xp: 10,
      target: "2*a + 2*b",
      variables: ["a", "b"],
    };
    content.tracks[0].lessons[0].practice = [expression];
    expect(validateContent(content)).toEqual([]);
  });

  it("flags a target using an undeclared symbol", () => {
    const content = validContent();
    const expression: Question = {
      id: "e1",
      type: "expression",
      prompt: [{ kind: "text", text: "Expand" }],
      explanation: [{ kind: "text", text: "e" }],
      xp: 10,
      target: "2*a + 2*c",
      variables: ["a", "b"],
    };
    content.tracks[0].lessons[0].practice = [expression];
    expect(validateContent(content).join("\n")).toMatch(
      /undeclared symbol "c"/,
    );
  });

  it("flags an unparseable target", () => {
    const content = validContent();
    const expression: Question = {
      id: "e1",
      type: "expression",
      prompt: [{ kind: "text", text: "Expand" }],
      explanation: [{ kind: "text", text: "e" }],
      xp: 10,
      target: "2a +",
      variables: ["a"],
    };
    content.tracks[0].lessons[0].practice = [expression];
    expect(validateContent(content).join("\n")).toMatch(/does not parse/);
  });

  it("does not flag a recognised function name as undeclared", () => {
    const content = validContent();
    const expression: Question = {
      id: "e1",
      type: "expression",
      prompt: [{ kind: "text", text: "Simplify" }],
      explanation: [{ kind: "text", text: "e" }],
      xp: 10,
      target: "sqrt(x)",
      variables: ["x"],
    };
    content.tracks[0].lessons[0].practice = [expression];
    expect(validateContent(content)).toEqual([]);
  });
});

describe("validateContent - explanations", () => {
  it("flags a question with an empty explanation", () => {
    const content = validContent();
    content.tracks[0].lessons[0].practice[0].explanation = [];
    expect(validateContent(content).join("\n")).toMatch(/empty explanation/);
  });
});

describe("validateContent - badge references", () => {
  it("flags a challenge referencing an unknown badge", () => {
    const content = validContent();
    content.tracks[0].challenge.passBadgeId = "ghost";
    expect(validateContent(content).join("\n")).toMatch(
      /references unknown badge/,
    );
  });

  it("flags a track-scoped badge criterion referencing an unknown track", () => {
    const content = validContent();
    content.badges.push({
      id: "geo-master",
      title: "Geometer",
      description: "Finish geometry",
      criterion: "track-complete:geometry",
      icon: "📐",
    });
    // geometry track is absent, so the criterion is dangling.
    expect(validateContent(content).join("\n")).toMatch(
      /references unknown track "geometry"/,
    );
  });
});
