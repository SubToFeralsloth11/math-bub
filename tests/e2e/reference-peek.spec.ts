import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// E2E flows for the Reference peek surface (feature 009-reference-peek).
//
// These tests run serially in a single worker. Each navigates to the heavy
// lesson route (full app + mathjs bundle), and running them one at a time
// avoids spiking dev-server cold-start load enough to trip hydration races in
// the sibling spec files that share the server.
test.describe.configure({ mode: "serial" });

const LESSON = "/lesson/algebra/alg-5a-language";

// The algebra "language of algebra" lesson has three learn cards, so two
// "Next" presses reach the final card and expose "Start practice". The React
// app hydrates after first paint, so each activation is retried until the
// expected next state actually appears.
async function advanceToPractice(page: Page): Promise<void> {
  const startPractice = page.getByRole("button", { name: /start practice/i });
  for (let guard = 0; guard < 15; guard++) {
    if (await startPractice.isVisible({ timeout: 500 }).catch(() => false))
      break;
    const next = page.getByRole("button", { name: /^Next/ });
    if (await next.isVisible({ timeout: 500 }).catch(() => false)) {
      await next.click();
    }
    await page.waitForTimeout(150);
  }
  await startPractice.click({ timeout: 10_000 });
}

async function openReference(page: Page): Promise<void> {
  // The React app hydrates after first paint, so an immediate click can land
  // on un-hydrated markup. Retry the activation until the surface appears.
  const dialog = page.getByRole("dialog", { name: "Reference cards" });
  for (let attempt = 0; attempt < 5; attempt++) {
    await page.getByRole("button", { name: "Reference" }).click();
    if (await dialog.isVisible().catch(() => false)) break;
    await page.waitForTimeout(300);
  }
  await expect(dialog).toBeVisible();
}

test("peek from a practice question, browse, close, and answer with no state lost", async ({
  page,
}) => {
  await page.goto(LESSON);
  await page.waitForLoadState("networkidle");
  await advanceToPractice(page);
  // Land on the first practice question (an MCQ).
  await expect(page.getByText(/Practice 1/i)).toBeVisible();

  await openReference(page);
  // The dimmed underlying question becomes inert (the radio is hidden from the
  // accessibility tree while the surface is open).
  await expect(page.getByRole("radio")).toHaveCount(0);

  // Browse forward then backward across the three cards.
  await page.getByRole("button", { name: /next card/i }).click();
  await expect(page.getByText(/2 \/ 3 cards/i)).toBeVisible();
  await page.getByRole("button", { name: /previous card/i }).click();
  await expect(page.getByText(/1 \/ 3 cards/i)).toBeVisible();

  // Close via the close control; focus returns to the Reference control and
  // the question is interactive again.
  await page.getByRole("button", { name: /close reference/i }).click();
  await expect(
    page.getByRole("dialog", { name: "Reference cards" }),
  ).toBeHidden();
  // The underlying question is interactive again (its radios are back in the
  // accessibility tree) and focus returned to the Reference control.
  await expect(page.getByRole("radio").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Reference" })).toBeFocused();

  // Answer the original question and confirm the run advances normally.
  await page.locator('input[type=radio][value="a"]').check();
  await page.getByRole("button", { name: /check answer/i }).click();
  await page.getByRole("button", { name: /next/i }).click();
  await expect(page.getByText(/Practice 2/i)).toBeVisible();
});

test("peek during the learn phase and resume on the studied card", async ({
  page,
}) => {
  await page.goto(LESSON);
  await page.waitForLoadState("networkidle");
  // Studying learn card 1 ("Key idea: the building blocks").
  await expect(
    page.getByRole("heading", { name: /key idea: the building blocks/i }),
  ).toBeVisible();

  await openReference(page);
  // Browse to the last card and close.
  await page.getByRole("button", { name: /next card/i }).click();
  await page.getByRole("button", { name: /next card/i }).click();
  await expect(page.getByText(/3 \/ 3 cards/i)).toBeVisible();
  await page.getByRole("button", { name: /close reference/i }).click();

  // The run resumes on card 1 - the study position is unchanged by browsing.
  await expect(
    page.getByRole("heading", { name: /key idea: the building blocks/i }),
  ).toBeVisible();
});

test("reopening from the same question remembers the browsed card", async ({
  page,
}) => {
  await page.goto(LESSON);
  await page.waitForLoadState("networkidle");
  await advanceToPractice(page);

  await openReference(page);
  // Opens on card 1 (the question has no refersTo yet); browse to card 2.
  await expect(page.getByText(/1 \/ 3 cards/i)).toBeVisible();
  await page.getByRole("button", { name: /next card/i }).click();
  await expect(page.getByText(/2 \/ 3 cards/i)).toBeVisible();
  await page.getByRole("button", { name: /close reference/i }).click();

  // Reopen from the same question - it reopens on the remembered card 2.
  await openReference(page);
  await expect(page.getByText(/2 \/ 3 cards/i)).toBeVisible();
  await page.getByRole("button", { name: /close reference/i }).click();

  // Advance to the next question and reopen - the remembered position was
  // cleared, so it opens on the new question's default (card 1).
  await page.locator('input[type=radio][value="a"]').check();
  await page.getByRole("button", { name: /check answer/i }).click();
  await page.getByRole("button", { name: /next/i }).click();
  await openReference(page);
  await expect(page.getByText(/1 \/ 3 cards/i)).toBeVisible();
});

test("the open Reference surface has no critical axe violations", async ({
  page,
}) => {
  await page.goto(LESSON);
  await page.waitForLoadState("networkidle");
  await advanceToPractice(page);
  await openReference(page);

  const scan = await new AxeBuilder({ page }).analyze();
  expect(scan.violations.filter((v) => v.impact === "critical")).toEqual([]);
});
