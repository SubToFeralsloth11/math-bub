import { expect, test, type Page } from "@playwright/test";

/**
 * Returns a local-date string (YYYY-MM-DD) offset by the given number of
 * days from today. Negative values produce past dates.
 *
 * @param offset - Days from today (0 = today, -1 = yesterday, etc.).
 * @returns The local date string.
 */
function relativeDate(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear().toString().padStart(4, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Produces an array of consecutive active-date strings ending at today for
 * the given number of days.
 *
 * @param days - How many consecutive days to include.
 * @returns Sorted YYYY-MM-DD strings.
 */
function consecutiveDates(days: number): string[] {
  return Array.from({ length: days }, (_, index) =>
    relativeDate(index - days + 1),
  );
}

/**
 * Seeds the saved-progress key before the app loads with the given saved
 * state.
 *
 * @param page - The Playwright page.
 * @param saved - The saved state to seed.
 */
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

test.beforeEach(async () => {
  // Navigation is handled per-test after seeding progress.
});

test("streak popover opens on chip click and shows the 7-day strip", async ({
  page,
}) => {
  const yesterday = relativeDate(-1);
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 50,
    streak: { count: 3, lastActiveDate: yesterday },
    badges: [],
    activeDates: consecutiveDates(7),
  });
  await page.goto("/");

  const chip = page.getByLabel("3 day streak");
  await chip.click();

  await expect(page.getByText("🔥 3-day streak")).toBeVisible();
  await expect(page.getByText("Recent activity")).toBeVisible();
  await expect(page.getByLabel(/Mon/)).toBeVisible();
  await expect(page.getByLabel(/Sun/)).toBeVisible();
});

test("streak popover shows contextual message for active today", async ({
  page,
}) => {
  const today = relativeDate(0);
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 5, lastActiveDate: today },
    badges: [],
    activeDates: consecutiveDates(5),
  });
  await page.goto("/");

  await page.getByLabel("5 day streak").click();
  await expect(
    page.getByText("Active today — come back tomorrow to keep it going!"),
  ).toBeVisible();
});

test("streak popover shows start prompt for no streak", async ({ page }) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 0, lastActiveDate: "" },
    badges: [],
    activeDates: [],
  });
  await page.goto("/");

  await page.getByLabel("No streak yet").click();
  await expect(
    page.getByText("Complete a lesson to start your streak!"),
  ).toBeVisible();
});

test("level popover opens on badge click and shows XP progress", async ({
  page,
}) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 120,
    streak: { count: 1, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: ["2026-06-16"],
  });
  await page.goto("/");

  const badge = page.getByLabel(/Level/);
  await badge.click();

  // At 120 XP, level 2: span = 100, intoLevel = 70, toNext = 30.
  // Wait for the popover to appear, then verify the heading text.
  await page.waitForTimeout(500);
  await expect(page.getByText(/Level 2/).first()).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByText("70 / 100 XP")).toBeVisible();
  await expect(page.getByText(/30 XP to Level 3/)).toBeVisible();
});

test("streak popover dismisses on click outside", async ({ page }) => {
  const yesterday = relativeDate(-1);
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 3, lastActiveDate: yesterday },
    badges: [],
    activeDates: consecutiveDates(7),
  });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();
  await expect(page.getByText("🔥 3-day streak")).toBeVisible();

  await page.getByText("StudyBub").click();
  await expect(page.getByText("🔥 3-day streak")).not.toBeVisible();
});

test("streak popover dismisses on Escape key", async ({ page }) => {
  const yesterday = relativeDate(-1);
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 3, lastActiveDate: yesterday },
    badges: [],
    activeDates: consecutiveDates(7),
  });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();
  await expect(page.getByText("🔥 3-day streak")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByText("🔥 3-day streak")).not.toBeVisible();
});

test("mutual exclusion: opening level popover closes streak popover", async ({
  page,
}) => {
  const yesterday = relativeDate(-1);
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 50,
    streak: { count: 3, lastActiveDate: yesterday },
    badges: [],
    activeDates: consecutiveDates(7),
  });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();
  await expect(page.getByText("🔥 3-day streak")).toBeVisible();

  await page.getByLabel(/Level/).click();
  await expect(page.getByText("🔥 3-day streak")).not.toBeVisible();
  await expect(page.getByText(/XP to Level/)).toBeVisible();
});

test("popovers remain visible at 320 px viewport width", async ({ page }) => {
  const yesterday = relativeDate(-1);
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 50,
    streak: { count: 3, lastActiveDate: yesterday },
    badges: [],
    activeDates: consecutiveDates(7),
  });
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();

  const popover = page.getByText("🔥 3-day streak");
  await expect(popover).toBeVisible();

  const box = await popover.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
  }
});
