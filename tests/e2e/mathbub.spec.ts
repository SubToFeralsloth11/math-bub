import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Seeds the saved-progress key before the app loads, so map and gating states
// can be set up without playing through every lesson.
async function seedProgress(
  page: Page,
  saved: Record<string, unknown>,
): Promise<void> {
  await page.addInitScript(
    ([key, value]) => {
      globalThis.localStorage.setItem(key as string, value as string);
    },
    ["mathbub.progress.v1", JSON.stringify(saved)],
  );
}

// Answers the current numeric question and advances.
async function answerNumeric(page: Page, value: string): Promise<void> {
  await page.getByRole("textbox").fill(value);
  await page.getByRole("button", { name: /check answer/i }).click();
  await page.getByRole("button", { name: /next|finish/i }).click();
}

// Selects an MCQ option by its option id and advances.
async function answerMcq(page: Page, optionId: string): Promise<void> {
  await page.locator(`input[type=radio][value="${optionId}"]`).check();
  await page.getByRole("button", { name: /check answer/i }).click();
  await page.getByRole("button", { name: /next|finish/i }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("home shows the three tracks and links to a track map", async ({
  page,
}) => {
  await expect(
    page.getByRole("heading", { name: /choose a track/i }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Algebra \(Year 8\)/i }).click();
  await expect(page).toHaveURL(/\/track\/algebra/);
  await expect(
    page.getByRole("link", {
      name: /5A The language of algebra \(available\)/i,
    }),
  ).toBeVisible();
});

test("a fresh track shows only the first lesson available", async ({
  page,
}) => {
  await page.goto("/track/geometry");
  await expect(
    page.getByRole("link", { name: /10D Congruent figures \(available\)/i }),
  ).toBeVisible();
  // A later lesson is locked and not a link.
  await expect(
    page.getByRole("link", { name: /10E Congruent triangles/i }),
  ).toHaveCount(0);
  await expect(
    page.getByLabel(/10E Congruent triangles \(locked\)/i),
  ).toBeVisible();
});

test("complete the first lesson and have it persist across reload", async ({
  page,
}) => {
  await page.getByRole("link", { name: /Algebra \(Year 8\)/i }).click();
  await page
    .getByRole("link", { name: /5A The language of algebra \(available\)/i })
    .click();

  // One learn card, then practice and mastery.
  await page.getByRole("button", { name: /start practice/i }).click();
  await answerNumeric(page, "7"); // coefficient of x in 7x
  await answerNumeric(page, "3"); // terms in 4a + 2b - 5
  await answerNumeric(page, "9"); // constant term in 6x + 9
  await answerNumeric(page, "8"); // coefficient of y in 8y
  await answerMcq(page, "a"); // a variable is "n"

  await expect(page.getByText(/lesson mastered/i)).toBeVisible();
  await page.getByRole("button", { name: /back to map/i }).click();

  await expect(
    page.getByRole("link", {
      name: /5A The language of algebra \(complete\)/i,
    }),
  ).toBeVisible();

  await page.reload();
  await expect(
    page.getByRole("link", {
      name: /5A The language of algebra \(complete\)/i,
    }),
  ).toBeVisible();
});

test("algebra expression answers are marked by equivalence", async ({
  page,
}) => {
  // Navigate directly to the expanding-brackets lesson and reach its
  // expression question (two learn cards, then practice 1-3, then the
  // expression at practice 4).
  await page.goto("/lesson/algebra/alg-5g-expanding-brackets");
  await page.getByRole("button", { name: /next/i }).click();
  await page.getByRole("button", { name: /start practice/i }).click();
  await answerMcq(page, "b"); // 3(x+4) -> 3x+12
  await answerNumeric(page, "10"); // constant term of 2(x+5)
  await answerMcq(page, "a"); // 4(2x+1) -> 8x+4

  // Expression question: a factorised form of 2(a+b) is accepted.
  const input = page.getByRole("textbox");
  await input.fill("2(a+b)");
  await page.getByRole("button", { name: /check answer/i }).click();
  await expect(page.getByRole("status")).toContainText(/correct/i);
});

test("unreadable expression input is handled gently", async ({ page }) => {
  await page.goto("/lesson/algebra/alg-5g-expanding-brackets");
  await page.getByRole("button", { name: /next/i }).click();
  await page.getByRole("button", { name: /start practice/i }).click();
  await answerMcq(page, "b");
  await answerNumeric(page, "10");
  await answerMcq(page, "a");

  const input = page.getByRole("textbox");
  await input.fill("2a +");
  await expect(page.getByText(/can't read that/i)).toBeVisible();
  // The field stays editable so the learner can fix it.
  await expect(input).toBeEnabled();
});

test("the boss challenge unlocks once every lesson is complete", async ({
  page,
}) => {
  // Seed the Time track fully complete (both lessons).
  await seedProgress(page, {
    version: 1,
    lessons: {
      "time-4j-units": { completed: true, bestAccuracy: 1 },
      "time-4j-clock": { completed: true, bestAccuracy: 1 },
    },
    challenges: {},
    xp: 100,
    streak: { count: 2, lastActiveDate: "2026-06-07" },
    badges: [],
  });
  await page.goto("/track/time");
  await page
    .getByRole("link", { name: /boss challenge \(available\)/i })
    .click();
  await expect(
    page.getByRole("button", { name: /start challenge/i }),
  ).toBeVisible();
});

test("a boss challenge plays to completion and awards a score and rewards", async ({
  page,
}) => {
  await seedProgress(page, {
    version: 1,
    lessons: {
      "time-4j-units": { completed: true, bestAccuracy: 1 },
      "time-4j-clock": { completed: true, bestAccuracy: 1 },
    },
    challenges: {},
    xp: 0,
    streak: { count: 0, lastActiveDate: "" },
    badges: [],
  });
  await page.goto("/challenge/time");
  await page.getByRole("button", { name: /start challenge/i }).click();

  // Answer all five Time-review questions correctly.
  await page.getByRole("textbox").fill("180"); // minutes in 3 hours
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.locator('input[value="c"]').check(); // 9 pm -> 21:00
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.getByRole("textbox").fill("120"); // seconds in 2 minutes
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.getByRole("textbox").fill("40"); // 8:20 to 9:00
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.locator('input[value="b"]').check(); // 16:00 -> 4 pm
  await page.getByRole("button", { name: /finish/i }).click();

  await expect(page.getByText(/challenge complete/i)).toBeVisible();
  await expect(page.getByText("5 / 5")).toBeVisible();
  await expect(page.getByText(/\+80 bonus XP/i)).toBeVisible();
});

test("progress reset is guarded by a confirmation", async ({ page }) => {
  await seedProgress(page, {
    version: 1,
    lessons: { "alg-5a-language": { completed: true, bestAccuracy: 1 } },
    challenges: {},
    xp: 250,
    streak: { count: 4, lastActiveDate: "2026-06-07" },
    badges: ["first-steps"],
  });
  await page.goto("/");
  await page.getByRole("button", { name: /reset progress/i }).click();
  await expect(
    page.getByRole("heading", { name: /reset all progress/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /reset everything/i }).click();
  // The indicators return to their fresh state: level 1 and no active streak.
  await expect(page.getByLabel("Level 1")).toBeVisible();
  await expect(page.getByLabel(/no streak yet/i)).toBeVisible();
});

test("the lesson flow has no critical accessibility violations", async ({
  page,
}) => {
  await page.goto("/lesson/algebra/alg-5a-language");
  await expect(page.getByRole("heading", { name: /key idea/i })).toBeVisible();

  const learnScan = await new AxeBuilder({ page }).analyze();
  expect(learnScan.violations.filter((v) => v.impact === "critical")).toEqual(
    [],
  );

  await page.getByRole("button", { name: /start practice/i }).click();
  await expect(page.getByRole("textbox")).toBeVisible();

  const questionScan = await new AxeBuilder({ page }).analyze();
  expect(
    questionScan.violations.filter((v) => v.impact === "critical"),
  ).toEqual([]);
});
