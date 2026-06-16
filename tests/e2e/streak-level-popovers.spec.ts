import { expect, test, type Page } from "@playwright/test";

/**
 * Seeds the saved-progress key before the app loads with the given saved state.
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
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 50,
    streak: { count: 3, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
  });
  await page.goto("/");

  const chip = page.getByLabel("3 day streak");
  await chip.click();

  // Popover content should be visible.
  await expect(page.getByText("3-day streak")).toBeVisible();
  await expect(page.getByText("Recent activity")).toBeVisible();
  // Seven day cells should be present.
  await expect(page.getByLabel(/Mon/)).toBeVisible();
  await expect(page.getByLabel(/Sun/)).toBeVisible();
});

test("streak popover shows contextual message for active today", async ({
  page,
}) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 5, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: [
      "2026-06-12",
      "2026-06-13",
      "2026-06-14",
      "2026-06-15",
      "2026-06-16",
    ],
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
  await expect(page.getByText(/Level 2/)).toBeVisible();
  await expect(page.getByText("70 / 100 XP")).toBeVisible();
  await expect(page.getByText(/30 XP to Level 3/)).toBeVisible();
});

test("streak popover dismisses on click outside", async ({ page }) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 3, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
  });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();
  await expect(page.getByText("3-day streak")).toBeVisible();

  // Click outside (on the StudyBub logo).
  await page.getByText("StudyBub").click();
  await expect(page.getByText("3-day streak")).not.toBeVisible();
});

test("streak popover dismisses on Escape key", async ({ page }) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 3, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
  });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();
  await expect(page.getByText("3-day streak")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByText("3-day streak")).not.toBeVisible();
});

test("mutual exclusion: opening level popover closes streak popover", async ({
  page,
}) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 50,
    streak: { count: 3, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
  });
  await page.goto("/");

  // Open streak popover.
  await page.getByLabel("3 day streak").click();
  await expect(page.getByText("3-day streak")).toBeVisible();

  // Open level popover.
  await page.getByLabel(/Level/).click();
  // Streak popover should be gone, level popover visible.
  await expect(page.getByText("3-day streak")).not.toBeVisible();
  await expect(page.getByText(/XP to Level/)).toBeVisible();
});

test("popovers remain visible at 320 px viewport width", async ({ page }) => {
  await seedProgress(page, {
    version: 1,
    lessons: {},
    challenges: {},
    xp: 50,
    streak: { count: 3, lastActiveDate: "2026-06-16" },
    badges: [],
    activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
  });
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto("/");

  await page.getByLabel("3 day streak").click();

  // The popover should be visible within the viewport.
  const popover = page.getByText("3-day streak");
  await expect(popover).toBeVisible();

  // The popover box should be within the viewport bounds.
  const box = await popover.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
  }
});
