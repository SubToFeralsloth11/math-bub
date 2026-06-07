/**
 * Authored Time track content (Year 4, worksheet 4J).
 *
 * Re-authored from the `source/` worksheet into clean, structured data: reading
 * and converting units of time, and 12- and 24-hour time.
 *
 * @author John Grimes
 * @module content/tracks/time
 */

import { t } from "../blocks";
import { timeChallengeQuestions } from "../challenges/time";

import type { Lesson, Track } from "../../domain/content/types";

const unitsOfTime: Lesson = {
  id: "time-4j-units",
  order: 1,
  title: "4J Units of time",
  sourceRef: "4J",
  learnCards: [
    {
      id: "4j-units-key",
      heading: "Key idea: units of time",
      body: [
        t(
          "Time is measured in seconds, minutes, hours and days. There are 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day.",
        ),
        t(
          "To change hours into minutes, multiply by 60. To change minutes into seconds, multiply by 60.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4j-u-p1",
      type: "numeric",
      prompt: [t("How many minutes are there in 2 hours?")],
      explanation: [t("2 hours × 60 minutes = 120 minutes.")],
      xp: 10,
      accepted: ["120"],
      unit: "minutes",
    },
    {
      id: "4j-u-p2",
      type: "numeric",
      prompt: [t("How many seconds are there in 3 minutes?")],
      explanation: [t("3 minutes × 60 seconds = 180 seconds.")],
      xp: 10,
      accepted: ["180"],
      unit: "seconds",
    },
  ],
  mastery: [
    {
      id: "4j-u-m1",
      type: "numeric",
      prompt: [t("How many hours are there in 2 days?")],
      explanation: [t("2 days × 24 hours = 48 hours.")],
      xp: 15,
      accepted: ["48"],
      unit: "hours",
    },
    {
      id: "4j-u-m2",
      type: "numeric",
      prompt: [t("How many minutes are there in half an hour?")],
      explanation: [t("Half of 60 minutes is 30 minutes.")],
      xp: 15,
      accepted: ["30"],
      unit: "minutes",
    },
    {
      id: "4j-u-m3",
      type: "mcq",
      prompt: [t("Which is the longest amount of time?")],
      explanation: [
        t(
          "1 day is 24 hours, which is longer than 100 minutes, 90 seconds, or 1 hour.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("100 minutes")] },
        { id: "b", label: [t("1 day")] },
        { id: "c", label: [t("90 seconds")] },
        { id: "d", label: [t("1 hour")] },
      ],
      correctOptionId: "b",
    },
  ],
};

const tellingTime: Lesson = {
  id: "time-4j-clock",
  order: 2,
  title: "4J Reading the clock",
  sourceRef: "4J",
  learnCards: [
    {
      id: "4j-clock-key",
      heading: "Key idea: 12-hour and 24-hour time",
      body: [
        t(
          "In 12-hour time we use am (before midday) and pm (after midday). In 24-hour time the hours run from 00 to 23, so the date never needs am or pm.",
        ),
        t(
          "To change a pm time to 24-hour time, add 12 to the hours. For example, 3 pm becomes 15:00.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4j-c-p1",
      type: "mcq",
      prompt: [t("What is 7 pm in 24-hour time?")],
      explanation: [t("Add 12 to the hours: 7 + 12 = 19, so 19:00.")],
      xp: 10,
      options: [
        { id: "a", label: [t("07:00")] },
        { id: "b", label: [t("17:00")] },
        { id: "c", label: [t("19:00")] },
        { id: "d", label: [t("21:00")] },
      ],
      correctOptionId: "c",
    },
    {
      id: "4j-c-p2",
      type: "numeric",
      prompt: [t("How many minutes are there from 9:00 to 9:45?")],
      explanation: [t("From 9:00 to 9:45 is 45 minutes.")],
      xp: 10,
      accepted: ["45"],
      unit: "minutes",
    },
  ],
  mastery: [
    {
      id: "4j-c-m1",
      type: "mcq",
      prompt: [t("What is 14:00 in 12-hour time?")],
      explanation: [t("Subtract 12 from the hours: 14 − 12 = 2, so 2 pm.")],
      xp: 15,
      options: [
        { id: "a", label: [t("2 am")] },
        { id: "b", label: [t("2 pm")] },
        { id: "c", label: [t("4 pm")] },
        { id: "d", label: [t("12 pm")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "4j-c-m2",
      type: "numeric",
      prompt: [t("How many minutes are there from 10:15 to 11:00?")],
      explanation: [t("From 10:15 to 11:00 is 45 minutes.")],
      xp: 15,
      accepted: ["45"],
      unit: "minutes",
    },
    {
      id: "4j-c-m3",
      type: "mcq",
      prompt: [t("Midnight is written in 24-hour time as...")],
      explanation: [t("Midnight is the start of the day, written 00:00.")],
      xp: 15,
      options: [
        { id: "a", label: [t("00:00")] },
        { id: "b", label: [t("12:00")] },
        { id: "c", label: [t("24:00")] },
        { id: "d", label: [t("23:00")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** The Time track. */
export const timeTrack: Track = {
  id: "time",
  title: "Time (Year 4)",
  description: "Units of time, and reading 12- and 24-hour clocks.",
  lessons: [unitsOfTime, tellingTime],
  challenge: {
    id: "time-boss",
    title: "Boss challenge: Time review",
    sourceRef: "4J Time - Extra Questions",
    questions: timeChallengeQuestions,
    bonusXp: 80,
    passBadgeId: "boss-time",
  },
};
