import { expect, test, type Locator, type Page } from "@playwright/test";

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

/**
 * Clicks a popover trigger and waits for the popover body to appear, retrying
 * the click until it takes effect.
 *
 * The app renders its default (empty) state first and swaps in the seeded
 * state after the client hydrates from localStorage. A click fired at a
 * control before React attaches its event handlers is silently lost, so the
 * click is retried until the popover actually opens. This also covers the
 * "No streak yet" case where the seeded label is identical to the default and
 * therefore gives no implicit hydration signal.
 *
 * @param trigger - Locator for the clickable trigger control.
 * @param expected - Locator for content that proves the popover opened.
 */
async function openPopover(trigger: Locator, expected: Locator): Promise<void> {
  await expect(async () => {
    await trigger.click();
    await expect(expected).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10_000 });
}

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

  await openPopover(
    page.getByLabel("3 day streak"),
    page.getByText("🔥 3-day streak"),
  );
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

  await openPopover(
    page.getByLabel("5 day streak"),
    page.getByText("🔥 5-day streak"),
  );
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

  // The "No streak yet" label is identical before and after hydration, so the
  // retrying openPopover helper is essential here to avoid a lost click.
  await openPopover(
    page.getByLabel("No streak yet"),
    page.getByText("Complete a lesson to start your streak!"),
  );
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

  // The server renders the default "Level 1" badge; the seeded "Level 2" only
  // appears after hydration. The exact label avoids matching the default, and
  // openPopover retries past any hydration click race.
  await openPopover(
    page.getByLabel("Level 2", { exact: true }),
    page.getByText("70 / 100 XP"),
  );
  // At 120 XP: level 2, span 100, intoLevel 70, toNext 30.
  await expect(page.getByText(/Level 2/)).toBeVisible();
  await expect(page.getByText("30 XP to Level 3")).toBeVisible();
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

  await openPopover(
    page.getByLabel("3 day streak"),
    page.getByText("🔥 3-day streak"),
  );

  // Click the header banner's empty area to trigger outside-press dismissal
  // without navigating or hitting another interactive control.
  await page.getByRole("banner").click();
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

  await openPopover(
    page.getByLabel("3 day streak"),
    page.getByText("🔥 3-day streak"),
  );

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

  await openPopover(
    page.getByLabel("3 day streak"),
    page.getByText("🔥 3-day streak"),
  );

  // 50 XP is also level 2. The exact label avoids matching the pre-hydration
  // "Level 1" default rendered by the server.
  await page.getByLabel("Level 2", { exact: true }).click();
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

  await openPopover(
    page.getByLabel("3 day streak"),
    page.getByText("🔥 3-day streak"),
  );

  const popover = page.getByText("🔥 3-day streak");

  // floating-ui repositions asynchronously (flip/shift) after the popover
  // mounts, so poll until it has settled fully inside the narrow viewport
  // rather than snapshotting a pre-shift position.
  await expect
    .poll(async () => {
      const box = await popover.boundingBox();
      if (!box) return false;
      return box.x >= -0.5 && box.y >= -0.5 && box.x + box.width <= 320.5;
    })
    .toBe(true);
});
