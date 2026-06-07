/**
 * Time boss-challenge questions, drawn from the 4J extra questions.
 *
 * @author John Grimes
 * @module content/challenges/time
 */

import { t } from "../blocks";

import type { Question } from "../../domain/content/types";

/** The Time boss-challenge question set. */
export const timeChallengeQuestions: Question[] = [
  {
    id: "time-boss-q1",
    type: "numeric",
    prompt: [t("How many minutes are there in 3 hours?")],
    explanation: [t("3 × 60 = 180 minutes.")],
    xp: 10,
    accepted: ["180"],
    unit: "minutes",
  },
  {
    id: "time-boss-q2",
    type: "mcq",
    prompt: [t("What is 9 pm in 24-hour time?")],
    explanation: [t("9 + 12 = 21, so 21:00.")],
    xp: 10,
    options: [
      { id: "a", label: [t("09:00")] },
      { id: "b", label: [t("19:00")] },
      { id: "c", label: [t("21:00")] },
      { id: "d", label: [t("23:00")] },
    ],
    correctOptionId: "c",
  },
  {
    id: "time-boss-q3",
    type: "numeric",
    prompt: [t("How many seconds are there in 2 minutes?")],
    explanation: [t("2 × 60 = 120 seconds.")],
    xp: 10,
    accepted: ["120"],
    unit: "seconds",
  },
  {
    id: "time-boss-q4",
    type: "numeric",
    prompt: [t("How many minutes are there from 8:20 to 9:00?")],
    explanation: [t("From 8:20 to 9:00 is 40 minutes.")],
    xp: 10,
    accepted: ["40"],
    unit: "minutes",
  },
  {
    id: "time-boss-q5",
    type: "mcq",
    prompt: [t("What is 16:00 in 12-hour time?")],
    explanation: [t("16 − 12 = 4, so 4 pm.")],
    xp: 10,
    options: [
      { id: "a", label: [t("4 am")] },
      { id: "b", label: [t("4 pm")] },
      { id: "c", label: [t("6 pm")] },
      { id: "d", label: [t("2 pm")] },
    ],
    correctOptionId: "b",
  },
];
