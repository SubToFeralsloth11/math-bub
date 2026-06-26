import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Seeds the saved-progress key before the app loads, so map and gating
// states can be set up without playing through every lesson.
async function seedProgress(
  page: Page,
  saved: Record<string, unknown>,
): Promise<void> {
  await page.addInitScript(
    ([key, value]) => {
      globalThis.localStorage.setItem(key as string, value as string);
    },
    ["studybub.progress.v1", JSON.stringify(saved)],
  );
}

// Submits a text-based answer (numeric, expression, fill-in-the-blank)
// and advances.
async function answerText(page: Page, value: string): Promise<void> {
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

// Advances through learn cards to reach the practice phase. Clicks
// "Next" up to 5 times (fewer if buttons disappear), then clicks
// "Start practice".
async function advanceToPractice(page: Page): Promise<void> {
  for (let index = 0; index < 5; index++) {
    const nextButton = page.getByRole("button", { name: /^Next/ });
    const visible = await nextButton
      .isVisible({ timeout: 1000 })
      .catch(() => false);
    if (!visible) break;
    await nextButton.click();
    // Small pause for the animation / state transition.
    await page.waitForTimeout(300);
  }
  await page
    .getByRole("button", { name: /start practice/i })
    .click({ timeout: 10_000 });
}

// Seeds the Time track as fully complete to unlock the boss challenge.
async function seedCompleteTimeTrack(
  page: Page,
  overrides?: Record<string, unknown>,
): Promise<void> {
  await seedProgress(page, {
    version: 1,
    lessons: {
      "time-4j-units-conversion": { completed: true, bestAccuracy: 1 },
      "time-timetables": { completed: true, bestAccuracy: 1 },
      "time-problem-solving": { completed: true, bestAccuracy: 1 },
    },
    challenges: {},
    xp: 0,
    streak: { count: 0, lastActiveDate: "" },
    badges: [],
    activeDates: [],
    ...overrides,
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("home shows subject cards and links to a subject", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: /choose a subject/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Maths/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Science/i })).toBeVisible();
  // Tap Maths to go to subject screen.
  await page.getByRole("link", { name: /Maths/i }).click();
  await expect(page).toHaveURL(/\/subject\/maths/);
  // Navigate directly to the Algebra track.
  await page.goto("/subject/maths/track/algebra");
  await expect(page).toHaveURL(/\/subject\/maths\/track\/algebra/);
  await expect(
    page.getByRole("link", {
      name: /5A The language of algebra.*available/i,
    }),
  ).toBeVisible({ timeout: 15_000 });
});

test("a fresh track shows only the first lesson available", async ({
  page,
}) => {
  await page.goto("/subject/maths/track/geometry");
  await expect(page).toHaveURL(/\/subject\/maths\/track\/geometry/);
  await expect(
    page.getByRole("link", {
      name: /10D Congruent figures.*available/i,
    }),
  ).toBeVisible({ timeout: 15_000 });
  // A later lesson is locked and not a link.
  await expect(
    page.getByRole("link", { name: /10E Congruent triangles/i }),
  ).toHaveCount(0);
  await expect(
    page.getByLabel(/10E Congruent triangles.*locked/i),
  ).toBeVisible();
});

test("complete the first lesson and have it persist across reload", async ({
  page,
}) => {
  // Navigate directly to the Algebra track, then click the first lesson.
  await page.goto("/subject/maths/track/algebra");
  await expect(page).toHaveURL(/\/subject\/maths\/track\/algebra/);
  await page
    .getByRole("link", {
      name: /5A The language of algebra.*available/i,
    })
    .click({ timeout: 15_000 });

  // Wait for the lesson page to fully hydrate.
  await page.waitForTimeout(1000);
  // Three learn cards, then practice and mastery.
  await advanceToPractice(page);

  // Practice questions.
  await answerMcq(page, "a"); // coefficient of x -> 4
  await answerText(page, "4"); // terms in 3a+2b-5+c -> 4
  await answerText(page, "-3"); // constant term -> -3
  await answerText(page, "x + 8"); // sum of x and 8
  await answerText(page, "6 * m"); // product of m and 6
  await answerText(page, "17"); // evaluate 4a-3, a=5
  await answerText(page, "14"); // evaluate 2x+3y, x=4, y=2
  await answerMcq(page, "b"); // which is an equation?
  await answerText(page, "2 * n - 5"); // 5 less than twice n
  await answerText(page, "18"); // evaluate a(b+2), a=3, b=4

  // Mastery questions.
  await answerText(page, "p / 5 + 3"); // quotient of p/5 + 3
  await answerText(page, "31"); // evaluate p^2+3q, p=4, q=5

  // Mastery matching: connect left ids to right ids in smallCaps.
  await page.getByText("Coefficient of x").click();
  await page.getByText("3", { exact: true }).click();
  await page.getByText("Coefficient of y").click();
  await page.getByText("-2", { exact: true }).click();
  await page.getByText("Constant term").click();
  await page.getByText("5", { exact: true }).click();
  await page.getByRole("button", { name: /check answer/i }).click();

  // Now advance to the next mastery question (the last one).
  await page.getByRole("button", { name: /next/i }).click();
  await answerText(page, "11"); // evaluate (3x+4)/2, x=6

  await expect(page.getByText(/lesson mastered/i)).toBeVisible();
  await page.getByRole("button", { name: /back to map/i }).click();

  await expect(
    page.getByRole("link", {
      name: /5A The language of algebra.*complete/i,
    }),
  ).toBeVisible();

  await page.reload();
  await expect(
    page.getByRole("link", {
      name: /5A The language of algebra.*complete/i,
    }),
  ).toBeVisible();
});

test("algebra expression answers are marked by equivalence", async ({
  page,
}) => {
  await page.goto("/lesson/algebra/alg-5g-expanding");
  await page.waitForLoadState("networkidle");
  await advanceToPractice(page);

  const input = page.getByRole("textbox");
  await input.fill("3x+6");
  await page.getByRole("button", { name: /check answer/i }).click();
  await expect(page.getByRole("status")).toContainText(/correct/i);
});

test("unreadable expression input is handled gently", async ({ page }) => {
  await page.goto("/lesson/algebra/alg-5g-expanding");
  await page.waitForLoadState("networkidle");
  await advanceToPractice(page);

  const input = page.getByRole("textbox");
  await input.fill("2a +");
  await page.getByRole("button", { name: /check answer/i }).click();
  await expect(page.getByText(/can't read that/i)).toBeVisible();
  await expect(input).toBeEnabled();
});

test("the boss challenge unlocks once every lesson is complete", async ({
  page,
}) => {
  await seedCompleteTimeTrack(page, {
    xp: 100,
    streak: { count: 2, lastActiveDate: "2026-06-07" },
  });
  await page.goto("/subject/maths/track/time");
  await expect(page).toHaveURL(/\/subject\/maths\/track\/time/);
  await page
    .getByRole("link", { name: /boss challenge \(available\)/i })
    .click({ timeout: 15_000 });
  await expect(
    page.getByRole("button", { name: /start challenge/i }),
  ).toBeVisible();
});

test("a boss challenge plays to completion and awards a score and rewards", async ({
  page,
}) => {
  await seedCompleteTimeTrack(page);
  await page.goto("/challenge/time");
  await page.getByRole("button", { name: /start challenge/i }).click();

  // Answer all five Time-review questions correctly.
  await page.getByRole("textbox").fill("3");
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.getByRole("textbox").fill("1110");
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.getByRole("textbox").fill("0515");
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.getByRole("textbox").fill("0600");
  await page.getByRole("button", { name: /submit answer/i }).click();
  await page.locator('input[value="b"]').check();
  await page.getByRole("button", { name: /finish/i }).click();

  await expect(page.getByText(/challenge complete/i)).toBeVisible();
  await expect(page.getByText("5 / 5")).toBeVisible();
  await expect(page.getByText(/\+100 bonus XP/i)).toBeVisible();
});

test("progress reset is guarded by a confirmation", async ({ page }) => {
  await seedProgress(page, {
    version: 1,
    lessons: { "alg-5a-language": { completed: true, bestAccuracy: 1 } },
    challenges: {},
    xp: 250,
    streak: { count: 4, lastActiveDate: "2026-06-07" },
    badges: ["first-steps"],
    activeDates: ["2026-06-07"],
  });
  await page.goto("/");
  // Wait for the page to fully hydrate before interacting.
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /reset progress/i }).click();
  await expect(
    page.getByRole("heading", { name: /Reset all progress/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /reset everything/i }).click();
  await expect(page.getByLabel("Level 1")).toBeVisible();
  await expect(page.getByLabel(/no streak yet/i)).toBeVisible();
});

test("the lesson flow has no critical accessibility violations", async ({
  page,
}) => {
  await page.goto("/lesson/algebra/alg-5a-language");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: /key idea/i })).toBeVisible();

  const learnScan = await new AxeBuilder({ page }).analyze();
  expect(learnScan.violations.filter((v) => v.impact === "critical")).toEqual(
    [],
  );

  await advanceToPractice(page);
  await expect(page.getByText(/Practice 1/i)).toBeVisible();

  const questionScan = await new AxeBuilder({ page }).analyze();
  expect(
    questionScan.violations.filter((v) => v.impact === "critical"),
  ).toEqual([]);
});
