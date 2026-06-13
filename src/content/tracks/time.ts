/**
 * Time track content (Year 8, chapter 4J).
 *
 * Covers time unit conversions, 12-hour and 24-hour time formats,
 * reading timetables, calculating elapsed time (including across
 * midnight), average speed from distance and time, and multi-step time
 * problems. Based on the 2026 Year 8 Maths Class Notebook curriculum
 * plan (Term 2, Weeks 6-7).
 *
 * @author John Grimes
 * @module content/tracks/time
 */

import { m, t } from "../blocks";
import type { Lesson, Track, Question } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Lesson 1 – 4J Time units and conversions
// ---------------------------------------------------------------------------

const timeUnitsConversion: Lesson = {
  id: "time-4j-units-conversion",
  order: 1,
  title: "4J Time units and conversions",
  sourceRef: "4J",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4j-key-units",
      heading: "Key idea: time units",
      body: [
        t(
          "Time is measured using a base-60 (sexagesimal) system inherited from the ancient Babylonians. The standard units and their relationships are:",
        ),
        m("1 \\text{ minute} = 60 \\text{ seconds}"),
        m(
          "1 \\text{ hour} = 60 \\text{ minutes} = 3600 \\text{ seconds}",
        ),
        m(
          "1 \\text{ day} = 24 \\text{ hours} = 1440 \\text{ minutes}",
        ),
        m("1 \\text{ week} = 7 \\text{ days} = 168 \\text{ hours}"),
        t(
          "Months and years are not fixed conversions: 1 year = 12 months = 365 days (or 366 in a leap year). For problems, assume 1 year = 365 days unless told otherwise.",
        ),
      ],
    },
    {
      id: "4j-conversion-chart",
      heading: "Key idea: converting between time units",
      body: [
        t(
          "To convert between time units, multiply or divide by the conversion factor:",
        ),
        t(
          "To go from a larger unit to a smaller unit, multiply. Example: 3 hours = 3 × 60 = 180 minutes. Example: 2.5 days = 2.5 × 24 = 60 hours.",
        ),
        t(
          "To go from a smaller unit to a larger unit, divide. Example: 270 seconds = 270 ÷ 60 = 4.5 minutes. Example: 150 minutes = 150 ÷ 60 = 2.5 hours.",
        ),
        t(
          "When converting seconds to hours, you can do it in one step (divide by 3600) or two steps (seconds → minutes → hours): 7200 s = 7200 ÷ 60 = 120 min, then 120 ÷ 60 = 2 h.",
        ),
      ],
    },
    {
      id: "4j-12-24-time",
      heading: "Key idea: 12-hour and 24-hour time",
      body: [
        t("There are two common ways to write the time of day:"),
        t(
          "12-hour time uses AM (midnight to noon) and PM (noon to midnight). Examples: 7:30 AM, 2:15 PM, 11:45 PM.",
        ),
        t(
          "24-hour time counts hours from 0 to 23. Examples: 0730, 1415, 2345.",
        ),
        t("Conversion rules:"),
        t("12:00 AM (midnight) = 0000. 12:00 PM (noon) = 1200."),
        t(
          "For AM times (except 12 AM): keep the hour as is, add a leading zero if needed. 7:30 AM → 0730, 11:45 AM → 1145.",
        ),
        t(
          "For PM times (except 12 PM): add 12 to the hour. 2:15 PM → 2 + 12 = 14 → 1415. 11:45 PM → 11 + 12 = 23 → 2345.",
        ),
        t(
          "To convert 24-hour back: if hour > 12, subtract 12 and add PM. 1430 → 14 − 12 = 2 → 2:30 PM. If hour = 12, it is 12:00 PM. If hour = 0, it is 12:00 AM.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "4j-p1",
      type: "numeric",
      prompt: [t("How many minutes are in 3 hours?")],
      explanation: [
        t(
          "To convert hours to minutes, multiply by 60:",
        ),
        m("3 \\times 60 = 180"),
        t(
          ". There are 60 minutes in each hour, so 3 hours contains 180 minutes.",
        ),
      ],
      xp: 10,
      accepted: ["180"],
    },
    {
      id: "4j-p2",
      type: "numeric",
      prompt: [t("Convert 450 seconds to minutes.")],
      explanation: [
        t("To convert seconds to minutes, divide by 60:"),
        m("450 \\div 60 = 7.5"),
        t(
          ". There are 60 seconds in each minute, so 450 seconds equals 7 minutes and 30 seconds, or 7.5 minutes.",
        ),
      ],
      xp: 10,
      accepted: ["7.5"],
    },
    {
      id: "4j-p3",
      type: "mcq",
      prompt: [t("Which of these conversions is correct?")],
      explanation: [
        t("1 day = 24 hours = 24 × 60 = 1440 minutes."),
        t(
          "Check each option: 1 hour = 3600 seconds (60 × 60) is correct. 2 days = 2880 minutes (2 × 24 × 60) not 1440. 1 week = 168 hours (7 × 24) not 148. 1 month is approximately 30 days, not exactly 28 (only February has 28, and even February varies in leap years). The only correct statement is 1 hour = 3600 seconds.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("1 hour = 3600 seconds")] },
        { id: "b", label: [t("2 days = 1440 minutes")] },
        { id: "c", label: [t("1 week = 148 hours")] },
        { id: "d", label: [t("1 month = 28 days")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4j-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about time conversions.")],
      template: [
        t(
          "To convert from hours to minutes, you ___ by 60.",
        ),
      ],
      explanation: [
        t(
          "When converting from a larger unit (hours) to a smaller unit (minutes), you multiply by the conversion factor. Since 1 hour = 60 minutes, you multiply the number of hours by 60. For example, 2.5 hours = 2.5 × 60 = 150 minutes.",
        ),
      ],
      xp: 10,
      accepted: ["multiply"],
    },
    {
      id: "4j-p5",
      type: "numeric",
      prompt: [
        t("How many hours are in 2 days and 5 hours?"),
      ],
      explanation: [
        t(
          "First convert days to hours: 2 days = 2 × 24 = 48 hours. Then add the extra 5 hours: 48 + 5 = 53 hours. Always convert all parts to the same unit before adding.",
        ),
      ],
      xp: 10,
      accepted: ["53"],
    },
    {
      id: "4j-p6",
      type: "shortText",
      prompt: [
        t(
          "Write 2:30 PM in 24-hour time format (four digits, e.g. 1430).",
        ),
      ],
      explanation: [
        t(
          "For PM times (except 12 PM), add 12 to the hour: 2 + 12 = 14. Keep the minutes as 30. So 2:30 PM in 24-hour time is 1430. The four-digit format has the first two digits for the hour and the last two for the minutes.",
        ),
      ],
      xp: 10,
      accepted: ["1430", "14:30"],
    },
    {
      id: "4j-p7",
      type: "numeric",
      prompt: [
        t(
          "Write 9:15 PM in 24-hour time format (four digits).",
        ),
      ],
      explanation: [
        t(
          "For PM times, add 12 to the hour: 9 + 12 = 21. The minutes stay 15. So 9:15 PM in 24-hour time is 2115.",
        ),
      ],
      xp: 10,
      accepted: ["2115"],
    },
    {
      id: "4j-p8",
      type: "matching",
      prompt: [
        t(
          "Match each 12-hour time to its 24-hour equivalent.",
        ),
      ],
      explanation: [
        t(
          "7:30 AM → 0730 (AM times keep the hour, adding a leading zero if needed). 2:15 PM → 1415 (PM: add 12 to the hour). 12:00 PM (noon) → 1200 (12 PM stays as 12). 11:45 PM → 2345 (11 + 12 = 23). 12:00 AM (midnight) → 0000 (12 AM becomes 00).",
        ),
      ],
      xp: 15,
      pairs: [
        { id: "a", left: [t("7:30 AM")], right: [m("0730")] },
        { id: "b", left: [t("2:15 PM")], right: [m("1415")] },
        { id: "c", left: [t("12:00 PM")], right: [m("1200")] },
        { id: "d", left: [t("11:45 PM")], right: [m("2345")] },
        { id: "e", left: [t("12:00 AM")], right: [m("0000")] },
      ],
    },
    {
      id: "4j-p9",
      type: "mcq",
      prompt: [t("How many minutes are in 2.5 hours?")],
      explanation: [
        t("Multiply the number of hours by 60:"),
        m("2.5 \\times 60 = 150"),
        t(
          " minutes. The two full hours give 2 × 60 = 120 minutes, and the half hour gives 0.5 × 60 = 30 minutes, totalling 150 minutes. A common mistake is to multiply by 100 instead of 60, which would incorrectly give 250.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("120")] },
        { id: "b", label: [m("150")] },
        { id: "c", label: [m("180")] },
        { id: "d", label: [m("250")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "4j-p10",
      type: "numeric",
      prompt: [
        t(
          "A TV series has 8 episodes of 45 minutes each. What is the total running time in hours?",
        ),
      ],
      explanation: [
        t(
          "Total minutes: 8 × 45 = 360 minutes. Convert to hours by dividing by 60:",
        ),
        m("360 \\div 60 = 6"),
        t(
          " hours. Alternatively, two 45-minute episodes make 90 minutes (1.5 hours), so 8 episodes = 4 × 1.5 = 6 hours.",
        ),
      ],
      xp: 15,
      accepted: ["6"],
    },
  ],
  mastery: [
    {
      id: "4j-m1",
      type: "numeric",
      prompt: [t("Convert 7200 seconds to hours.")],
      explanation: [
        t(
          "Convert in one step by dividing by 3600, since 1 hour = 3600 seconds:",
        ),
        m("7200 \\div 3600 = 2"),
        t(
          " hours. Alternatively, in two steps: 7200 ÷ 60 = 120 minutes, then 120 ÷ 60 = 2 hours. Both approaches give the same result.",
        ),
      ],
      xp: 15,
      accepted: ["2"],
    },
    {
      id: "4j-m2",
      type: "mcq",
      prompt: [
        t(
          "Which of these correctly shows the conversion of 3 hours 24 minutes to minutes?",
        ),
      ],
      explanation: [
        t(
          "Convert hours to minutes: 3 × 60 = 180. Then add the extra minutes: 180 + 24 = 204 minutes. The other options contain common errors: forgetting to convert hours to minutes (3 + 24 = 27), arithmetic mistakes (3 × 60 + 24 = 184), or multiplying by 100 instead of 60 (3 × 100 + 24 = 324).",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [m("3 \\times 60 + 24 = 204")],
        },
        { id: "b", label: [m("3 + 24 = 27")] },
        {
          id: "c",
          label: [m("3 \\times 60 + 24 = 184")],
        },
        {
          id: "d",
          label: [m("3 \\times 100 + 24 = 324")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "4j-m3",
      type: "fillInTheBlank",
      prompt: [
        t("Complete the sentence about 24-hour time."),
      ],
      template: [
        t(
          "In 24-hour time format, midnight is written as ___.",
        ),
      ],
      explanation: [
        t(
          "Midnight marks the beginning of a new day, so the hour is 00. In 24-hour time, midnight is 0000 (or 00:00). Note that 12:00 AM in 12-hour time equals 0000 in 24-hour time, while noon (12:00 PM) is written as 1200 in 24-hour time.",
        ),
      ],
      xp: 15,
      accepted: ["0000", "00:00"],
    },
    {
      id: "4j-m4",
      type: "numeric",
      prompt: [
        t(
          "A swimming squad trains for 2 hours and 15 minutes per session, 4 times per week. How many minutes do they train per week?",
        ),
      ],
      explanation: [
        t(
          "Convert per-session time to minutes: 2 hours = 120 minutes, plus 15 minutes = 135 minutes per session. Multiply by 4 sessions: 135 × 4 = 540 minutes per week. You can verify: 540 minutes = 540 ÷ 60 = 9 hours of training per week.",
        ),
      ],
      xp: 15,
      accepted: ["540"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2 – Reading timetables and calculating duration
// ---------------------------------------------------------------------------

const timetablesAndDuration: Lesson = {
  id: "time-timetables",
  order: 2,
  title: "Reading timetables and calculating duration",
  sourceRef: "4J",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "tt-key-elapsed",
      heading: "Key idea: calculating elapsed time",
      body: [
        t(
          "Elapsed time is the amount of time that passes from the start of an event to its end. To calculate it:",
        ),
        t(
          "1. Write both times in 24-hour format for easier calculation.",
        ),
        t(
          "2. If the end time is on the same day, subtract the start time from the end time.",
        ),
        t(
          "Example: 9:15 AM to 2:30 PM. In 24-hour: 0915 to 1430. Hours: 14 − 9 = 5. Minutes: 30 − 15 = 15. Elapsed time = 5 hours 15 minutes.",
        ),
        t(
          "3. If the end time crosses midnight, calculate the time to midnight plus the time after midnight.",
        ),
        t(
          "Example: 10:30 PM to 1:45 AM next day. 10:30 PM = 2230. Time to midnight: 24:00 − 22:30 = 1 hour 30 minutes. Time after midnight: 1 hour 45 minutes. Total: 1:30 + 1:45 = 3 hours 15 minutes.",
        ),
        t(
          "Trick: add 24 hours to the end time so both times are on the same 'extended day'. 1:45 AM becomes 25:45, then 25:45 − 22:30 = 3 hours 15 minutes. This avoids splitting the calculation.",
        ),
      ],
    },
    {
      id: "tt-timetable-reading",
      heading: "Key idea: reading timetables",
      body: [
        t(
          "A timetable (bus, train, flight schedule) is a table showing departure and arrival times. To use a timetable:",
        ),
        t(
          "1. Find your departure location (stop or station) and read the departure time.",
        ),
        t(
          "2. Find your destination and read across to the arrival time.",
        ),
        t(
          "3. Calculate journey duration by subtracting departure time from arrival time.",
        ),
        t(
          "4. If changing services, remember to add the waiting time between connections.",
        ),
        t(
          "Example: A bus leaves Central Station at 0845 and arrives at Parramatta at 0935. Duration = 0935 − 0845 = 50 minutes.",
        ),
        t(
          "Timetables often use 24-hour time to avoid AM/PM confusion. Always check which format the timetable uses before calculating.",
        ),
      ],
    },
    {
      id: "tt-common-mistakes",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Forgetting there are 60 minutes in an hour, not 100. When subtracting times, you cannot simply subtract digit by digit because you may need to borrow 60 minutes. Example: 0830 to 0915: 9 − 8 = 1 hour, but 15 − 30 requires borrowing. Correct: 0915 − 0830 = 45 minutes.",
        ),
        t(
          "Mistake 2: Confusing AM and PM when calculating across midday. 11:30 AM to 2:00 PM is 2.5 hours (1130 to 1400 = 2h 30m), not 14.5 hours.",
        ),
        t(
          "Mistake 3: Forgetting to add waiting time when a journey involves multiple legs or a transfer.",
        ),
        t(
          "Tip: convert both times to minutes past midnight (hours × 60 + minutes) before subtracting. This eliminates borrowing issues. 8:30 AM = 510 min, 9:15 AM = 555 min, difference = 45 minutes. The same trick works across midnight by adding 1440 to the end-time minutes when the end time is earlier than the start time.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "tt-p1",
      type: "numeric",
      prompt: [
        t(
          "A bus departs at 9:20 AM and arrives at 10:05 AM. How many minutes does the journey take?",
        ),
      ],
      explanation: [
        t(
          "Convert both times to minutes past midnight: 9:20 AM = 9 × 60 + 20 = 560 minutes. 10:05 AM = 10 × 60 + 5 = 605 minutes. Subtract: 605 − 560 = 45 minutes. The bus journey takes 45 minutes.",
        ),
      ],
      xp: 10,
      accepted: ["45"],
    },
    {
      id: "tt-p2",
      type: "numeric",
      prompt: [
        t(
          "A train departs at 0815 and arrives at 1230. What is the journey duration in hours as a decimal?",
        ),
      ],
      explanation: [
        t(
          "Convert to minutes past midnight: 0815 = 8 × 60 + 15 = 495 minutes. 1230 = 12 × 60 + 30 = 750 minutes. Duration: 750 − 495 = 255 minutes. Convert to hours: 255 ÷ 60 = 4.25 hours (4 hours and 15 minutes).",
        ),
      ],
      xp: 10,
      accepted: ["4.25"],
    },
    {
      id: "tt-p3",
      type: "mcq",
      prompt: [
        t(
          "A bus timetable shows these departures from Central Station: 7:15 AM, 7:45 AM, 8:15 AM, 8:45 AM. If you arrive at the station at 7:50 AM, how many minutes must you wait for the next bus?",
        ),
      ],
      explanation: [
        t(
          "The next bus after 7:50 AM departs at 8:15 AM. Waiting time = 8:15 AM − 7:50 AM = 25 minutes. The 7:45 AM bus has already departed. Always look for the first departure time after your arrival time.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("15")] },
        { id: "b", label: [m("25")] },
        { id: "c", label: [m("35")] },
        { id: "d", label: [m("45")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "tt-p4",
      type: "numeric",
      prompt: [
        t(
          "A film starts at 1415 (2:15 PM) and runs for 1 hour and 50 minutes. What is the finish time in 24-hour format (four digits)?",
        ),
      ],
      explanation: [
        t(
          "Add the duration: 1415 + 1 hour = 1515, plus 50 minutes = 1605. So the film finishes at 1605 (4:05 PM). Verify: 1415 to 1515 is 1 hour, and 1515 to 1605 is 50 minutes.",
        ),
      ],
      xp: 10,
      accepted: ["1605", "16:05"],
    },
    {
      id: "tt-p5",
      type: "numeric",
      prompt: [
        t(
          "A flight departs at 2245 (10:45 PM) and the flight duration is 2 hours and 30 minutes. What is the arrival time in 24-hour format (four digits)?",
        ),
      ],
      explanation: [
        t(
          "Add the duration: 2245 + 2 hours = 0045 the next day (since 22 + 2 = 24, which is midnight). Plus 30 minutes = 0115. The flight arrives at 0115 (1:15 AM the next day).",
        ),
      ],
      xp: 15,
      accepted: ["0115", "01:15"],
    },
    {
      id: "tt-p6",
      type: "fillInTheBlank",
      prompt: [
        t("Complete the sentence about calculating duration."),
      ],
      template: [
        t(
          "To calculate the duration of an event, you subtract the ___ time from the end time.",
        ),
      ],
      explanation: [
        t(
          "Elapsed time = end time − start time. For example, if school starts at 8:45 AM and finishes at 3:15 PM, the duration is 1515 − 0845 = 6 hours 30 minutes (using 24-hour time to simplify the subtraction).",
        ),
      ],
      xp: 10,
      accepted: ["start", "starting", "beginning", "departure"],
    },
    {
      id: "tt-p7",
      type: "shortText",
      prompt: [
        t(
          "Briefly explain the method for calculating elapsed time when the end time is on the next day (i.e. across midnight).",
        ),
      ],
      explanation: [
        t(
          "One reliable method is to add 24 hours to the end time, effectively putting it on the same extended day as the start time. For example, for 10:30 PM to 1:15 AM: 1:15 AM becomes 25:15 (1 + 24 = 25). Then subtract normally: 25:15 − 22:30 = 2 hours 45 minutes. This avoids having to split the calculation into separate before-midnight and after-midnight parts.",
        ),
      ],
      xp: 15,
      accepted: [
        "add 24 hours",
        "add 24",
        "add 24 hours to end time",
        "add 1440 minutes",
        "add 24h",
      ],
    },
    {
      id: "tt-p8",
      type: "mcq",
      prompt: [
        t(
          "A train timetable shows: Depart Redfern 2:15 PM, Arrive Strathfield 2:28 PM, Arrive Parramatta 2:47 PM. How long is the journey from Redfern to Parramatta?",
        ),
      ],
      explanation: [
        t(
          "Departure from Redfern: 2:15 PM. Arrival at Parramatta: 2:47 PM. Duration = 2:47 − 2:15 = 32 minutes. Note that Strathfield is an intermediate stop — for the full journey, use the departure from your starting station and the arrival at your final destination.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("13 minutes")] },
        { id: "b", label: [m("19 minutes")] },
        { id: "c", label: [m("32 minutes")] },
        { id: "d", label: [m("47 minutes")] },
      ],
      correctOptionId: "c",
    },
    {
      id: "tt-p9",
      type: "matching",
      prompt: [
        t("Match each journey to its duration."),
      ],
      explanation: [
        t(
          "8:00 AM to 12:00 PM: 1200 − 0800 = 4 hours (in 24-hour time). 9:15 AM to 10:45 AM: 1045 − 0915 = 1 hour 30 minutes. 11:30 PM to 2:00 AM: using the add-24 trick, 0200 becomes 2600, then 2600 − 2330 = 2 hours 30 minutes. 3:20 PM to 5:05 PM: 1705 − 1520 = 1 hour 45 minutes.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("8:00 AM to 12:00 PM")],
          right: [t("4 hours")],
        },
        {
          id: "b",
          left: [t("9:15 AM to 10:45 AM")],
          right: [t("1 hour 30 min")],
        },
        {
          id: "c",
          left: [t("11:30 PM to 2:00 AM")],
          right: [t("2 hours 30 min")],
        },
        {
          id: "d",
          left: [t("3:20 PM to 5:05 PM")],
          right: [t("1 hour 45 min")],
        },
      ],
    },
    {
      id: "tt-p10",
      type: "numeric",
      prompt: [
        t(
          "A student leaves home at 7:45 AM. They walk for 15 minutes to the station, wait 8 minutes for the train, and the train journey takes 42 minutes. What time do they arrive? Write the answer in 24-hour format (four digits).",
        ),
      ],
      explanation: [
        t(
          "Total travel time = 15 + 8 + 42 = 65 minutes = 1 hour 5 minutes. Start time: 0745. Add 1 hour: 0845. Add 5 minutes: 0850. The student arrives at 0850. Always sum all time segments first, convert the total to hours and minutes, then add to the start time.",
        ),
      ],
      xp: 20,
      accepted: ["0850", "08:50"],
    },
  ],
  mastery: [
    {
      id: "tt-m1",
      type: "mcq",
      prompt: [
        t(
          "A bus leaves Town Hall at 6:45 PM and arrives at Bondi Beach at 7:22 PM. A second bus leaves Town Hall at 7:10 PM on the same route and arrives at 7:42 PM. Which journey is faster, and by how many minutes?",
        ),
      ],
      explanation: [
        t(
          "First bus duration: 7:22 PM − 6:45 PM = 37 minutes (1922 − 1845 = 37 min). Second bus duration: 7:42 PM − 7:10 PM = 32 minutes. The second bus is faster by 37 − 32 = 5 minutes. Even though it departs later, it takes less time overall.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [t("First bus, 5 min faster")],
        },
        {
          id: "b",
          label: [t("Second bus, 5 min faster")],
        },
        {
          id: "c",
          label: [t("First bus, 13 min faster")],
        },
        { id: "d", label: [t("Same duration")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "tt-m2",
      type: "numeric",
      prompt: [
        t(
          "A long-distance coach departs at 2345 (11:45 PM) and arrives at 0615 (6:15 AM) the next morning. What is the journey duration in hours as a decimal?",
        ),
      ],
      explanation: [
        t(
          "Using the add-24 trick: 0615 becomes 3015 (6 + 24 = 30). Duration = 3015 − 2345. Minutes: 15 − 45 requires borrowing 60 from the hours. 30 becomes 29, and 15 + 60 = 75. Hours: 29 − 23 = 6. Minutes: 75 − 45 = 30. Duration = 6 hours 30 minutes = 6.5 hours. Alternatively: 2345 to 2400 = 15 min, plus 0000 to 0615 = 6h 15m. Total = 6h 30m = 6.5 h.",
        ),
      ],
      xp: 15,
      accepted: ["6.5"],
    },
    {
      id: "tt-m3",
      type: "shortText",
      prompt: [
        t(
          "Why is 24-hour time preferred over 12-hour time for bus and train timetables? Give at least one reason.",
        ),
      ],
      explanation: [
        t(
          "24-hour time eliminates the ambiguity between AM and PM, which is essential for transport timetables where journeys can span the midday boundary. It also makes duration calculations simpler because you can subtract times directly without first determining whether each time is AM or PM. For example, 1430 − 0915 = 5h 15m is straightforward; 2:30 PM − 9:15 AM requires converting to a common format first. 24-hour time is the international standard for timetabling.",
        ),
      ],
      xp: 15,
      accepted: [
        "no am/pm confusion",
        "avoids ambiguity",
        "easier to calculate",
        "eliminates ambiguity",
        "no confusion between am and pm",
        "clearer",
        "international standard",
        "subtraction is easier",
      ],
    },
    {
      id: "tt-m4",
      type: "numeric",
      prompt: [
        t(
          "A plane lands at Sydney Airport at 0630 on Monday morning. The flight departed from Dubai 14 hours and 15 minutes earlier (in Sydney time). At what time and day (in 24-hour format, Sydney time) did the flight depart?",
        ),
      ],
      explanation: [
        t(
          "Work backwards from arrival: 0630 Monday minus 14 hours 15 minutes. Subtract 14 hours: 0630 Monday − 14h = 0630 − 6h = 0030 Monday, minus another 8h = 1630 Sunday. Then subtract the 15 minutes: 1630 − 15m = 1615 Sunday. So the departure time was 1615 on Sunday. Check: 1615 Sunday + 14h 15m = 1615 + 14h = 0615 Monday, + 15m = 0630 Monday. Correct.",
        ),
      ],
      xp: 20,
      accepted: ["1615", "16:15"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3 – Time problem solving
// ---------------------------------------------------------------------------

const timeProblemSolving: Lesson = {
  id: "time-problem-solving",
  order: 3,
  title: "Time problem solving",
  sourceRef: "4J",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "ps-speed-formula",
      heading: "Key idea: speed, distance and time",
      body: [
        t(
          "The relationship between speed, distance and time is given by the formula:",
        ),
        m("\\text{speed} = \\frac{\\text{distance}}{\\text{time}}"),
        t("which is often written as"),
        m("v = \\frac{d}{t}"),
        t(", where v is average speed, d is distance, and t is time."),
        t("From this formula we can derive two others:"),
        m("d = v \\times t \\quad \\text{(distance = speed × time)}"),
        m("t = \\frac{d}{v} \\quad \\text{(time = distance ÷ speed)}"),
        t(
          "The unit of speed depends on the units of distance and time. If distance is in kilometres and time is in hours, speed is in kilometres per hour (km/h). If distance is in metres and time is in seconds, speed is in metres per second (m/s).",
        ),
        t(
          "To convert between km/h and m/s: multiply km/h by 1000/3600 = 5/18 to get m/s. Or divide m/s by 5/18 (multiply by 3.6) to get km/h.",
        ),
      ],
    },
    {
      id: "ps-worked-examples",
      heading: "Worked examples",
      body: [
        t("Example 1: A car travels 150 km in 3 hours. Find the average speed."),
        m("v = \\frac{150}{3} = 50 \\text{ km/h}"),
        t(
          "Example 2: A cyclist rides at 20 km/h for 2.5 hours. How far do they travel?",
        ),
        m("d = 20 \\times 2.5 = 50 \\text{ km}"),
        t(
          "Example 3: How long does it take to drive 240 km at an average speed of 80 km/h?",
        ),
        m("t = \\frac{240}{80} = 3 \\text{ hours}"),
        t(
          "Example 4 (mixed units): A runner covers 400 metres in 50 seconds. Find the average speed in m/s.",
        ),
        m("v = \\frac{400}{50} = 8 \\text{ m/s}"),
      ],
    },
    {
      id: "ps-multi-step",
      heading: "Key idea: multi-step time problems",
      body: [
        t(
          "Many real-world problems require combining time calculations with other operations. A systematic approach helps:",
        ),
        t(
          "1. Identify what you are being asked to find (arrival time, duration, speed, etc.).",
        ),
        t(
          "2. List the given information and convert all times to a consistent format (24-hour time or minutes past midnight).",
        ),
        t(
          "3. Break the problem into steps: find intermediate times, distances, or speeds one at a time.",
        ),
        t(
          "4. For journey problems, separate the travel into segments (e.g. walk → wait → train → walk) and calculate each segment's time separately, then sum them.",
        ),
        t(
          "5. Always check that your answer makes sense in the context (e.g. an arrival time cannot be before the departure time, and a speed should be reasonable for the mode of transport).",
        ),
        t("Example: A student leaves home at 8:10 AM. They walk 12 minutes to the bus stop, wait 5 minutes, ride the bus for 28 minutes, then walk another 8 minutes to school. What time do they arrive?"),
        t(
          "Solution: Total travel time = 12 + 5 + 28 + 8 = 53 minutes. 8:10 AM + 53 min = 9:03 AM.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "ps-p1",
      type: "numeric",
      prompt: [
        t(
          "A car travels 150 km in 3 hours. What is the average speed in km/h?",
        ),
      ],
      explanation: [
        t("Use the formula"),
        m("v = d / t"),
        t(":"),
        m("v = \\frac{150}{3} = 50"),
        t(
          " km/h. The car covers 50 kilometres each hour on average. The term 'average' speed acknowledges that the car may have travelled faster or slower at different points during the journey.",
        ),
      ],
      xp: 10,
      accepted: ["50"],
    },
    {
      id: "ps-p2",
      type: "numeric",
      prompt: [
        t(
          "A cyclist rides at an average speed of 20 km/h for 2.5 hours. How far does the cyclist travel?",
        ),
      ],
      explanation: [
        t("Use the formula"),
        m("d = v \\times t"),
        t(":"),
        m("d = 20 \\times 2.5 = 50"),
        t(
          " km. The cyclist covers 20 km in the first hour, another 20 km in the second hour, and 10 km in the final half hour, totalling 50 km.",
        ),
      ],
      xp: 10,
      accepted: ["50"],
    },
    {
      id: "ps-p3",
      type: "mcq",
      prompt: [
        t(
          "Which formula correctly gives the time taken for a journey of distance d at speed v?",
        ),
      ],
      explanation: [
        t("Starting from"),
        m("v = \\frac{d}{t}"),
        t(", multiply both sides by t and divide by v to isolate t:"),
        m("t = \\frac{d}{v}"),
        t(
          ". The other options are incorrect rearrangements: d × v would give the wrong units, v ÷ d inverts the relationship, and d + v simply adds the values. Always check the units: time (hours) = distance (km) ÷ speed (km/h).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("t = d \\times v")] },
        { id: "b", label: [m("t = \\frac{d}{v}")] },
        { id: "c", label: [m("t = \\frac{v}{d}")] },
        { id: "d", label: [m("t = d + v")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "ps-p4",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete the formula for average speed. Use v, d and t.",
        ),
      ],
      template: [
        m("v ="),
        t("___"),
      ],
      explanation: [
        t("Average speed equals distance divided by time:"),
        m("v = \\frac{d}{t}"),
        t(
          ". The letter v stands for velocity or speed, d for distance, and t for time. This is one of the most important formulas in physics and everyday problem solving.",
        ),
      ],
      xp: 10,
      accepted: ["d/t", "d ÷ t"],
    },
    {
      id: "ps-p5",
      type: "numeric",
      prompt: [
        t(
          "How long does it take to drive 240 km at an average speed of 80 km/h? Give your answer in hours.",
        ),
      ],
      explanation: [
        t("Use"),
        m("t = d / v"),
        t(":"),
        m("t = \\frac{240}{80} = 3"),
        t(
          " hours. At 80 km each hour, it takes exactly 3 hours to cover 240 km. The units work out because km ÷ (km/h) = h.",
        ),
      ],
      xp: 10,
      accepted: ["3"],
    },
    {
      id: "ps-p6",
      type: "shortText",
      prompt: [
        t(
          "Explain why a car that travels at 100 km/h for 30 minutes does not cover 100 km. How far does it actually travel?",
        ),
      ],
      explanation: [
        t(
          "Speed is measured per hour, but the car only travels for half an hour (30 minutes = 0.5 hours). Distance = speed × time = 100 × 0.5 = 50 km. The common error is forgetting to convert the time to hours before multiplying. Always ensure the time unit matches the speed unit — if speed is in km/h, time must be in hours.",
        ),
      ],
      xp: 15,
      accepted: [
        "50 km",
        "50km",
        "50 kilometres",
        "50",
        "half an hour",
        "0.5 hours",
        "only 30 minutes",
        "30 minutes is 0.5 hours",
      ],
    },
    {
      id: "ps-p7",
      type: "mcq",
      prompt: [
        t(
          "A train travels 180 km in 2 hours and 15 minutes. What is its average speed in km/h?",
        ),
      ],
      explanation: [
        t(
          "First, convert 2 hours 15 minutes to hours: 15 minutes = 15/60 = 0.25 hours, so 2 hours 15 minutes = 2.25 hours. Then use the speed formula:",
        ),
        m("v = \\frac{180}{2.25} = 80"),
        t(
          " km/h. A common mistake is to use 2.15 hours (treating minutes as decimals), which would give 180 ÷ 2.15 ≈ 83.7 km/h — incorrect because 15 minutes is 0.25 hours, not 0.15 hours.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("80 \\text{ km/h}")] },
        { id: "b", label: [m("90 \\text{ km/h}")] },
        { id: "c", label: [m("83.7 \\text{ km/h}")] },
        { id: "d", label: [m("72 \\text{ km/h}")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "ps-p8",
      type: "matching",
      prompt: [
        t(
          "Match each scenario to the correct calculation of the unknown quantity.",
        ),
      ],
      explanation: [
        t(
          "Scenario 1 (find distance): 60 km/h × 3h = 180 km. Scenario 2 (find time): 200 km ÷ 50 km/h = 4 hours. Scenario 3 (find speed): 90 km ÷ 1.5 h = 60 km/h. Scenario 4 (find distance with mixed units): 45 min = 0.75 h, so 80 km/h × 0.75 h = 60 km. Always identify which variable is unknown before selecting the correct rearrangement of v = d/t.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("Car travelling at 60 km/h for 3 hours. Distance?")],
          right: [m("180 \\text{ km}")],
        },
        {
          id: "b",
          left: [t("Journey of 200 km at 50 km/h. Time?")],
          right: [t("4 hours")],
        },
        {
          id: "c",
          left: [t("Covered 90 km in 1.5 hours. Speed?")],
          right: [m("60 \\text{ km/h}")],
        },
        {
          id: "d",
          left: [t("Travelled at 80 km/h for 45 minutes. Distance?")],
          right: [m("60 \\text{ km}")],
        },
      ],
    },
    {
      id: "ps-p9",
      type: "numeric",
      prompt: [
        t(
          "A student leaves home at 8:10 AM. They walk 12 minutes to the bus stop, wait 5 minutes, ride the bus for 28 minutes, then walk another 8 minutes to school. What time do they arrive? Write in 24-hour format (four digits).",
        ),
      ],
      explanation: [
        t(
          "Total travel time: 12 + 5 + 28 + 8 = 53 minutes. Start time 8:10 AM = 0810. Add 53 minutes: 0810 + 53 = 0903. The student arrives at 9:03 AM (0903). Breaking the journey into segments and summing the times first avoids repeated additions to the clock time.",
        ),
      ],
      xp: 15,
      accepted: ["0903", "09:03"],
    },
    {
      id: "ps-p10",
      type: "numeric",
      prompt: [
        t(
          "A driver covers the first 120 km of a trip at 80 km/h, then stops for a 30-minute break, then covers the remaining 180 km at 90 km/h. What is the total journey time in hours (as a decimal)?",
        ),
      ],
      explanation: [
        t(
          "First segment time: 120 ÷ 80 = 1.5 hours. Break: 30 minutes = 0.5 hours. Second segment time: 180 ÷ 90 = 2 hours. Total time = 1.5 + 0.5 + 2 = 4 hours. Note that the break time must be included in the total journey time even though no distance is covered during the break.",
        ),
      ],
      xp: 20,
      accepted: ["4"],
    },
  ],
  mastery: [
    {
      id: "ps-m1",
      type: "mcq",
      prompt: [
        t(
          "A driver covers the first 150 km of a trip at 75 km/h and the next 150 km at 100 km/h. What is the average speed for the entire 300 km journey?",
        ),
      ],
      explanation: [
        t(
          "Average speed = total distance ÷ total time, NOT the average of the two speeds. First segment time: 150 ÷ 75 = 2 hours. Second segment time: 150 ÷ 100 = 1.5 hours. Total time = 3.5 hours. Average speed = 300 ÷ 3.5 ≈ 85.7 km/h. The common mistake is to average 75 and 100 to get 87.5 km/h — this is incorrect because the car spends more time at the slower speed.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [m("87.5 \\text{ km/h}")],
        },
        {
          id: "b",
          label: [m("85.7 \\text{ km/h}")],
        },
        {
          id: "c",
          label: [m("80 \\text{ km/h}")],
        },
        {
          id: "d",
          label: [m("90 \\text{ km/h}")],
        },
      ],
      correctOptionId: "b",
    },
    {
      id: "ps-m2",
      type: "numeric",
      prompt: [
        t(
          "A family drives from Sydney to Canberra, a distance of 286 km. They leave at 7:45 AM and arrive at 11:03 AM, including a 20-minute rest stop. What was their average driving speed in km/h (excluding the rest stop)? Round to one decimal place.",
        ),
      ],
      explanation: [
        t(
          "Total journey time: 11:03 AM − 7:45 AM = 1103 − 0745 = 3 hours 18 minutes = 3.3 hours. Excluding the 20-minute (0.333... hour) rest stop: driving time = 3.3 − 0.333... = 3.0 − 0.0333... — let's recalculate precisely. 3h 18m = 198 min. Driving time = 198 − 20 = 178 min = 178/60 = 2.966... hours. Average driving speed = 286 ÷ 2.966... = 96.4 km/h.",
        ),
      ],
      xp: 15,
      accepted: ["96.4"],
    },
    {
      id: "ps-m3",
      type: "shortText",
      prompt: [
        t(
          "Why can you not simply average two speeds (e.g. 60 km/h and 100 km/h) to get the average speed for a journey where you spend different amounts of time at each speed? Explain in 1-2 sentences.",
        ),
      ],
      explanation: [
        t(
          "Average speed is total distance divided by total time. If you spend more time at the slower speed, that speed contributes more to the overall average. Simply averaging the two speeds assumes equal time at each speed, which is rarely true. For example, travelling 60 km at 60 km/h (1 hour) then 60 km at 100 km/h (0.6 hours) gives an average speed of 120 km ÷ 1.6 h = 75 km/h, not the simple average of 80 km/h.",
        ),
      ],
      xp: 15,
      accepted: [
        "total distance divided by total time",
        "more time at slower speed",
        "weighs the average",
        "weighted by time",
        "not equal time",
        "time-weighted",
        "spend different time",
      ],
    },
    {
      id: "ps-m4",
      type: "numeric",
      prompt: [
        t(
          "Ruby's piano lesson starts at 3:45 PM and finishes at 4:30 PM. Her next activity, a swimming lesson, starts at 5:15 PM. The swimming pool is a 25-minute drive from the piano teacher's house. How many minutes of free time does Ruby have between the end of her piano lesson and when she must leave for swimming?",
        ),
      ],
      explanation: [
        t(
          "Piano lesson duration: 4:30 PM − 3:45 PM = 45 minutes (confirming, it ends at 4:30 PM). Leave-by time for swimming: 5:15 PM − 25 min drive = 4:50 PM. Free time = 4:50 PM − 4:30 PM = 20 minutes. Ruby has 20 minutes between the end of piano and when she must depart for swimming. Always work backwards from the next commitment to find the latest departure time, then find the gap.",
        ),
      ],
      xp: 20,
      accepted: ["20"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge — Time
// ---------------------------------------------------------------------------

const timeBossQuestions: Question[] = [
  {
    id: "time-boss-q1",
    type: "numeric",
    prompt: [
      t(
        "A train leaves Central Station at 0815 and arrives at Newcastle at 1103. Another train leaves Central at 0830, making an additional stop, and arrives at Newcastle at 1121. How many minutes longer does the second train take?",
      ),
    ],
    explanation: [
      t(
        "First train duration: 1103 − 0815 = 168 minutes (1103 = 11×60+3 = 663 min past midnight; 0815 = 8×60+15 = 495 min; 663 − 495 = 168 min). Second train duration: 1121 − 0830 = 171 minutes (1121 = 681 min; 0830 = 510 min; 681 − 510 = 171 min). Difference = 171 − 168 = 3 minutes longer. The first train takes 2 hours 48 minutes; the second takes 2 hours 51 minutes.",
      ),
    ],
    xp: 20,
    accepted: ["3"],
  },
  {
    id: "time-boss-q2",
    type: "numeric",
    prompt: [
      t(
        "A driver sets off at 0630 and travels at an average speed of 90 km/h for the first 180 km. After a 40-minute break, they continue at 100 km/h for another 200 km. At what time (24-hour format, four digits) do they arrive at their destination?",
      ),
    ],
    explanation: [
      t(
        "First segment: 180 km ÷ 90 km/h = 2 hours, arriving at 0630 + 2h = 0830. Break: 40 minutes, departing at 0910. Second segment: 200 km ÷ 100 km/h = 2 hours. Arrival: 0910 + 2h = 1110. Total journey time = 2h + 40m + 2h = 4h 40m. Arrival at 1110.",
      ),
    ],
    xp: 25,
    accepted: ["1110", "11:10"],
  },
  {
    id: "time-boss-q3",
    type: "numeric",
    prompt: [
      t(
        "An international flight departs Sydney at 0945 on Monday (Sydney time, UTC+10) and flies for 13 hours and 30 minutes to Los Angeles (UTC−7, but UTC−8 without daylight saving). Simply assume LA is 18 hours behind Sydney. What is the local arrival time in LA, in 24-hour format (four digits), and on which day? Give just the time as four digits.",
      ),
    ],
    explanation: [
      t(
        "Sydney departure: 0945 Monday (Sydney time). Add flight duration: 0945 + 13h 30m = 2315 Monday (Sydney time). Now convert to LA local time: LA is 18 hours behind, so subtract 18 hours to get LA time: 2315 Monday − 18h = 0515 Monday (same day! Because LA is behind). Actually: 2315 − 18h = 2315 − 12h = 1115, minus 6h = 0515. So the flight arrives at 0515 on Monday in LA — the same calendar day because LA's clock is 18 hours behind Sydney. The flight arrives before it departed in terms of local date!",
      ),
    ],
    xp: 25,
    accepted: ["0515", "05:15"],
  },
  {
    id: "time-boss-q4",
    type: "numeric",
    prompt: [
      t(
        "A car and a truck both travel a 360 km route. The car averages 90 km/h. The truck averages 60 km/h. If the car departs at 0800, at what time (24-hour format) must the truck depart so that both vehicles arrive at the same time?",
      ),
    ],
    explanation: [
      t(
        "Car travel time: 360 ÷ 90 = 4 hours, so car arrives at 1200. Truck travel time: 360 ÷ 60 = 6 hours. For the truck to arrive at 1200, it must depart 6 hours earlier: 1200 − 6h = 0600. The truck must depart at 0600. Even though the truck is slower, by leaving 2 hours earlier it can arrive at the same time as the car.",
      ),
    ],
    xp: 25,
    accepted: ["0600", "06:00"],
  },
  {
    id: "time-boss-q5",
    type: "mcq",
    prompt: [
      t(
        "A runner completes a 10 km race. They run the first 5 km at 12 km/h and the second 5 km at 15 km/h. Which statement about their average speed is correct?",
      ),
    ],
    explanation: [
      t(
        "First 5 km time: 5 ÷ 12 = 5/12 hours ≈ 0.4167 h (25 minutes). Second 5 km time: 5 ÷ 15 = 1/3 hours ≈ 0.3333 h (20 minutes). Total time = 5/12 + 1/3 = 5/12 + 4/12 = 9/12 = 0.75 hours (45 minutes). Average speed = total distance ÷ total time = 10 ÷ 0.75 = 13.33... km/h.",
      ),
      t(
        "This is NOT the simple average of 12 and 15 (which would be 13.5 km/h). The actual average (13.3 km/h) is closer to 12 km/h than 15 km/h because the runner spends more time at the slower speed. This illustrates why average speed must be calculated as total distance ÷ total time.",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [
          t(
            "The average speed is 13.5 km/h (the mean of 12 and 15).",
          ),
        ],
      },
      {
        id: "b",
        label: [
          t(
            "The average speed is about 13.3 km/h, closer to 12 km/h because more time was spent at the slower speed.",
          ),
        ],
      },
      {
        id: "c",
        label: [
          t(
            "The average speed is 15 km/h because the second half was faster.",
          ),
        ],
      },
      {
        id: "d",
        label: [
          t(
            "The average speed is 12 km/h because the first half determines the pace.",
          ),
        ],
      },
    ],
    correctOptionId: "b",
  },
];

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/** The Time track (Year 8, chapter 4J). */
export const timeTrack: Track = {
  id: "time",
  subjectId: "maths",
  title: "Time (Year 8)",
  description:
    "Converting between time units, reading timetables, calculating elapsed time, and solving time-related problems.",
  lessons: [
    timeUnitsConversion,
    timetablesAndDuration,
    timeProblemSolving,
  ],
  challenge: {
    id: "time-boss",
    title: "Boss challenge: Time",
    sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Weeks 6-7",
    questions: timeBossQuestions,
    bonusXp: 100,
    passBadgeId: "boss-time",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
