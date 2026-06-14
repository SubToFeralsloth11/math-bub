import { describe, expect, it } from "vitest";

import { validateContent } from "./validateContent";

import type {
  AppContent,
  Badge,
  Lesson,
  McqQuestion,
  Question,
  Subject,
  Track,
} from "./types";

// --- Fixture builders: start from valid content, then mutate per test. ---

function subject(id: string): Subject {
  return {
    id,
    title: `${id} subject`,
    description: "A subject",
    icon: "📘",
    accent: "#6D4AFF",
  };
}

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

function track(id: string, subjId = "maths"): Track {
  return {
    id,
    subjectId: subjId,
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
  return {
    subjects: [subject("maths")],
    tracks: [track("algebra")],
    badges: badges(),
  };
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
    expect(validateContent(content).join("\n")).toMatch(
      /references unknown track "geometry"/,
    );
  });
});

// --- T004: Subject validation ---

describe("validateContent - subject validation", () => {
  it("flags duplicate subject ids", () => {
    const content = validContent();
    content.subjects.push(subject("maths"));
    expect(validateContent(content).join("\n")).toMatch(
      /Duplicate subject ids/,
    );
  });

  it("flags a track with subjectId referencing an unknown subject", () => {
    const content = validContent();
    content.tracks[0].subjectId = "nonexistent";
    expect(validateContent(content).join("\n")).toMatch(
      /unknown subject "nonexistent"/,
    );
  });

  it("flags when there are no subjects", () => {
    const content = validContent();
    content.subjects = [];
    expect(validateContent(content).join("\n")).toMatch(
      /must have at least one subject/i,
    );
  });

  it("flags a subject with an empty title", () => {
    const content = validContent();
    content.subjects[0].title = "";
    expect(validateContent(content).join("\n")).toMatch(/empty title/i);
  });
});

// --- T005: New question type validation ---

describe("validateContent - shortText question validation", () => {
  it("flags a shortText question with only empty accepted answers", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "What is the capital?" }],
      explanation: [{ kind: "text", text: "Paris is the capital." }],
      xp: 10,
      accepted: ["  ", ""],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    expect(validateContent(content).join("\n")).toMatch(
      /no non-empty accepted/,
    );
  });

  it("accepts a well-formed shortText question", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "What is the capital?" }],
      explanation: [{ kind: "text", text: "Paris is the capital." }],
      xp: 10,
      accepted: ["Paris", "paris"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    expect(validateContent(content)).toEqual([]);
  });
});

describe("validateContent - shortText numeric-only accepted lists", () => {
  it("flags when all accepted values look numeric (integers)", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "How many?" }],
      explanation: [{ kind: "text", text: "Four." }],
      xp: 10,
      accepted: ["4", "8", "12"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    const issues = validateContent(content);
    expect(issues.join("\n")).toMatch(/numeric/);
  });

  it("flags decimals with leading digits", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "Size?" }],
      explanation: [{ kind: "text", text: "0.5 mm." }],
      xp: 10,
      accepted: ["0.5", "0.5 mm", ".5"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    const issues = validateContent(content);
    expect(issues.join("\n")).toMatch(/numeric/);
  });

  it("flags numbers with unit suffixes", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "Area?" }],
      explanation: [{ kind: "text", text: "46 m." }],
      xp: 10,
      accepted: ["46 m", "46m"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    const issues = validateContent(content);
    expect(issues.join("\n")).toMatch(/numeric/);
  });

  it("flags numbers with 'x' suffix", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "Magnification?" }],
      explanation: [{ kind: "text", text: "1000x." }],
      xp: 10,
      accepted: ["1000x"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    const issues = validateContent(content);
    expect(issues.join("\n")).toMatch(/numeric/);
  });

  it("does not flag mixed text-and-numeric lists", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "Experiment?" }],
      explanation: [{ kind: "text", text: "Tests." }],
      xp: 10,
      accepted: ["experiment", "experiments"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    expect(validateContent(content)).toEqual([]);
  });

  it("does not flag mixed text-and-numeric like ['4', '4 times', 'four']", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "How many times?" }],
      explanation: [{ kind: "text", text: "Four times." }],
      xp: 10,
      accepted: ["4", "4 times", "four"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    expect(validateContent(content)).toEqual([]);
  });
});

describe("validateContent - shortText long accepted list", () => {
  it("flags when accepted list has more than 8 items", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "Name European capitals." }],
      explanation: [{ kind: "text", text: "Many." }],
      xp: 10,
      accepted: [
        "Paris",
        "Berlin",
        "London",
        "Madrid",
        "Rome",
        "Vienna",
        "Prague",
        "Warsaw",
        "Lisbon",
      ],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    const issues = validateContent(content);
    expect(issues.join("\n")).toMatch(/9 accepted items/);
  });

  it("does not flag accepted list with exactly 8 items", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "Name capitals." }],
      explanation: [{ kind: "text", text: "Eight." }],
      xp: 10,
      accepted: [
        "Paris",
        "Berlin",
        "London",
        "Madrid",
        "Rome",
        "Vienna",
        "Prague",
        "Warsaw",
      ],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    expect(validateContent(content)).toEqual([]);
  });

  it("does not flag accepted list with fewer than 8 items", () => {
    const content = validContent();
    const shortText: Question = {
      id: "s1",
      type: "shortText",
      prompt: [{ kind: "text", text: "What organism?" }],
      explanation: [{ kind: "text", text: "Things." }],
      xp: 10,
      accepted: ["experiment", "experiments"],
    };
    content.tracks[0].lessons[0].practice = [shortText];
    expect(validateContent(content)).toEqual([]);
  });
});

describe("validateContent - fillInTheBlank question validation", () => {
  it("flags a fillInTheBlank question with no ___ in template", () => {
    const content = validContent();
    const fitb: Question = {
      id: "f1",
      type: "fillInTheBlank",
      prompt: [{ kind: "text", text: "Complete the sentence" }],
      explanation: [{ kind: "text", text: "Water is the answer." }],
      xp: 10,
      template: [{ kind: "text", text: "No gap here" }],
      accepted: ["water"],
    };
    content.tracks[0].lessons[0].practice = [fitb];
    expect(validateContent(content).join("\n")).toMatch(
      /must contain "___" marker/,
    );
  });

  it("flags a fillInTheBlank question with empty accepted answers", () => {
    const content = validContent();
    const fitb: Question = {
      id: "f1",
      type: "fillInTheBlank",
      prompt: [{ kind: "text", text: "Complete the sentence" }],
      explanation: [{ kind: "text", text: "Water is the answer." }],
      xp: 10,
      template: [{ kind: "text", text: "The ___ is the powerhouse." }],
      accepted: [""],
    };
    content.tracks[0].lessons[0].practice = [fitb];
    expect(validateContent(content).join("\n")).toMatch(
      /no non-empty accepted/,
    );
  });

  it("flags a fillInTheBlank with empty template", () => {
    const content = validContent();
    const fitb: Question = {
      id: "f1",
      type: "fillInTheBlank",
      prompt: [{ kind: "text", text: "Complete the sentence" }],
      explanation: [{ kind: "text", text: "Water is the answer." }],
      xp: 10,
      template: [],
      accepted: ["water"],
    };
    content.tracks[0].lessons[0].practice = [fitb];
    expect(validateContent(content).join("\n")).toMatch(
      /must contain "___" marker/,
    );
  });

  it("accepts a well-formed fillInTheBlank question", () => {
    const content = validContent();
    const fitb: Question = {
      id: "f1",
      type: "fillInTheBlank",
      prompt: [{ kind: "text", text: "Complete the sentence" }],
      explanation: [{ kind: "text", text: "Mitochondria is correct." }],
      xp: 10,
      template: [{ kind: "text", text: "The ___ is the powerhouse." }],
      accepted: ["mitochondria"],
    };
    content.tracks[0].lessons[0].practice = [fitb];
    expect(validateContent(content)).toEqual([]);
  });
});

describe("validateContent - matching question validation", () => {
  it("flags a matching question with fewer than 2 pairs", () => {
    const content = validContent();
    const match: Question = {
      id: "m1",
      type: "matching",
      prompt: [{ kind: "text", text: "Match items" }],
      explanation: [{ kind: "text", text: "A goes with B." }],
      xp: 10,
      pairs: [
        {
          id: "p1",
          left: [{ kind: "text", text: "H2O" }],
          right: [{ kind: "text", text: "Water" }],
        },
      ],
    };
    content.tracks[0].lessons[0].practice = [match];
    expect(validateContent(content).join("\n")).toMatch(
      /must have at least 2 pairs/,
    );
  });

  it("flags a matching question with duplicate pair ids", () => {
    const content = validContent();
    const match: Question = {
      id: "m1",
      type: "matching",
      prompt: [{ kind: "text", text: "Match items" }],
      explanation: [{ kind: "text", text: "A goes with B." }],
      xp: 10,
      pairs: [
        {
          id: "p1",
          left: [{ kind: "text", text: "H2O" }],
          right: [{ kind: "text", text: "Water" }],
        },
        {
          id: "p1",
          left: [{ kind: "text", text: "CO2" }],
          right: [{ kind: "text", text: "Carbon dioxide" }],
        },
      ],
    };
    content.tracks[0].lessons[0].practice = [match];
    expect(validateContent(content).join("\n")).toMatch(/duplicate pair id/);
  });

  it("flags a matching question with empty pair content", () => {
    const content = validContent();
    const match: Question = {
      id: "m1",
      type: "matching",
      prompt: [{ kind: "text", text: "Match items" }],
      explanation: [{ kind: "text", text: "A goes with B." }],
      xp: 10,
      pairs: [
        {
          id: "p1",
          left: [],
          right: [{ kind: "text", text: "Water" }],
        },
        {
          id: "p2",
          left: [{ kind: "text", text: "CO2" }],
          right: [{ kind: "text", text: "Carbon dioxide" }],
        },
      ],
    };
    content.tracks[0].lessons[0].practice = [match];
    expect(validateContent(content).join("\n")).toMatch(
      /empty (left|right) content/,
    );
  });

  it("accepts a well-formed matching question", () => {
    const content = validContent();
    const match: Question = {
      id: "m1",
      type: "matching",
      prompt: [{ kind: "text", text: "Match chemical formulas to names" }],
      explanation: [
        { kind: "text", text: "H2O is water, CO2 is carbon dioxide." },
      ],
      xp: 10,
      pairs: [
        {
          id: "p1",
          left: [{ kind: "text", text: "H2O" }],
          right: [{ kind: "text", text: "Water" }],
        },
        {
          id: "p2",
          left: [{ kind: "text", text: "CO2" }],
          right: [{ kind: "text", text: "Carbon dioxide" }],
        },
      ],
    };
    content.tracks[0].lessons[0].practice = [match];
    expect(validateContent(content)).toEqual([]);
  });
});

// --- T047-T050: AI provenance validation (from US4, written here with Foundational) ---

describe("validateContent - aiProvenance validation", () => {
  it("accepts a lesson with well-formed aiProvenance", () => {
    const content = validContent();
    content.tracks[0].lessons[0].aiProvenance = {
      tool: "Claude",
      sources: ["worksheet.pdf"],
      role: "generated",
    };
    expect(validateContent(content)).toEqual([]);
  });

  it("rejects aiProvenance with empty tool", () => {
    const content = validContent();
    content.tracks[0].lessons[0].aiProvenance = {
      tool: "",
      sources: ["worksheet.pdf"],
      role: "checked",
    };
    expect(validateContent(content).join("\n")).toMatch(
      /empty (tool|provenance)/i,
    );
  });

  it("rejects aiProvenance with invalid role", () => {
    const content = validContent();
    content.tracks[0].lessons[0].aiProvenance = {
      tool: "Claude",
      sources: ["worksheet.pdf"],
      role: "invalid" as "generated",
    };
    expect(validateContent(content).join("\n")).toMatch(
      /invalid (role|provenance)/i,
    );
  });

  it("accepts a lesson with no aiProvenance at all", () => {
    const content = validContent();
    expect(validateContent(content)).toEqual([]);
  });

  it("accepts a boss challenge with well-formed aiProvenance", () => {
    const content = validContent();
    content.tracks[0].challenge.aiProvenance = {
      tool: "ChatGPT",
      sources: [],
      role: "both",
    };
    expect(validateContent(content)).toEqual([]);
  });
});
