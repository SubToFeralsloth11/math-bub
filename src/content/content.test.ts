import { describe, expect, it } from "vitest";

import {
  appContent,
  findBadge,
  findChallenge,
  findLesson,
  findSubject,
  findSubjectForTrack,
  findTrack,
  tracksForSubject,
} from "./index";
import { geometryFigures } from "./tracks/geometry";
import { validateContent } from "../domain/content/validateContent";

// Collects every figure id referenced anywhere in the authored content.
function referencedFigureIds(): Set<string> {
  const ids = new Set<string>();
  for (const track of appContent.tracks) {
    for (const lesson of track.lessons) {
      for (const card of lesson.learnCards) {
        if (card.figure) ids.add(card.figure.id);
      }
      for (const question of [...lesson.practice, ...lesson.mastery]) {
        if (question.figure) ids.add(question.figure.id);
      }
    }
  }
  return ids;
}

describe("authored content", () => {
  it("passes content validation with no issues", () => {
    expect(validateContent(appContent)).toEqual([]);
  });

  it("exposes the algebra track and its first lesson", () => {
    expect(findTrack("algebra")?.title).toBe("Algebra (Year 8)");
    expect(findLesson("algebra", "alg-5a-language")?.order).toBe(1);
    expect(findLesson("algebra", "alg-5g-expanding")?.order).toBe(4);
  });

  it("returns undefined for unknown ids", () => {
    expect(findTrack("nope")).toBeUndefined();
    expect(findLesson("algebra", "nope")).toBeUndefined();
  });

  it("exposes each track's boss challenge and referenced badges", () => {
    const challenge = findChallenge("algebra");
    expect(challenge).toBeDefined();
    expect(findBadge(challenge!.passBadgeId)).toBeDefined();
  });

  it("resolves every referenced figure id to a manifest entry", () => {
    const manifestIds = new Set(geometryFigures.map((figure) => figure.id));
    for (const id of referencedFigureIds()) {
      expect(manifestIds).toContain(id);
    }
  });

  it("exposes the maths subject", () => {
    const ids = appContent.subjects.map((s) => s.id);
    expect(ids).toContain("maths");
  });

  it("findSubject returns a subject by id", () => {
    const maths = findSubject("maths");
    expect(maths).toBeDefined();
    expect(maths?.title).toBe("Maths");
    expect(maths?.icon).toBe("🧮");
  });

  it("findSubject returns undefined for unknown id", () => {
    expect(findSubject("nope")).toBeUndefined();
  });

  it("tracksForSubject returns tracks belonging to a subject", () => {
    const mathsTracks = tracksForSubject("maths");
    expect(mathsTracks.length).toBe(9);
    const ids = mathsTracks.map((t) => t.id);
    expect(ids).toContain("algebra");
  });

  it("tracksForSubject returns empty array for subject with no tracks", () => {
    expect(tracksForSubject("science")).toEqual([]);
  });

  it("findSubjectForTrack returns the subject a track belongs to", () => {
    const subj = findSubjectForTrack("algebra");
    expect(subj).toBeDefined();
    expect(subj?.id).toBe("maths");
  });

  it("findSubjectForTrack returns undefined for unknown track", () => {
    expect(findSubjectForTrack("nope")).toBeUndefined();
  });
});
