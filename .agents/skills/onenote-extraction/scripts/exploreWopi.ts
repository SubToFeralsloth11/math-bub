/**
 * Explore OneNote WOPI viewer via Playwright.
 *
 * Uses agent-browser's session file for authentication, then enumerates all
 * frames to find the WOPI editor and interact with its File > Export menu.
 *
 * Prerequisites:
 *   1. Log into OneNote via agent-browser first:
 *        agent-browser open https://onenote.cloud.microsoft/notebooks --session-name onenote
 *        (then complete login manually in the headed browser)
 *   2. Run this script:
 *        bun run experiments/onenote-extraction/exploreWopi.ts
 *
 * @author John Grimes
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const SESSION_FILE =
  process.env.HOME + "/.agent-browser/sessions/onenote-default.json";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  // -----------------------------------------------------------------------
  // Load session state
  // -----------------------------------------------------------------------
  let storageState;
  try {
    const raw = readFileSync(SESSION_FILE, "utf-8");
    storageState = JSON.parse(raw);
    console.log(
      `Session: ${storageState.cookies?.length || 0} cookies, ${storageState.origins?.length || 0} origins`,
    );
  } catch (error) {
    console.error("Failed to load session:", error);
    console.log(
      "Run agent-browser with --session-name onenote and log in first.",
    );
    process.exit(1);
  }

  // -----------------------------------------------------------------------
  // Launch browser with saved session
  // -----------------------------------------------------------------------
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    storageState,
  });
  const page = await context.newPage();

  // -----------------------------------------------------------------------
  // Open the Class Notebook for content-rich pages.
  const notebookUrl =
    "https://qedu-my.sharepoint.com/personal/dhive0_eq_edu_au/_layouts/15/Doc.aspx?sourcedoc={c8d53722-3c72-4046-9f6d-e71d54ddf069}&action=view";
  console.log("\nOpening notebook...");
  // Use domcontentloaded instead of networkidle; SharePoint never idles.
  await page.goto(notebookUrl, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  console.log("Title:", await page.title());

  // -----------------------------------------------------------------------
  // Wait for WOPI frame to load
  // -----------------------------------------------------------------------
  console.log("Waiting for WOPI frame (polling up to 30s)...");
  for (let index = 0; index < 30; index++) {
    await sleep(1000);
    const wf = page
      .frames()
      .filter((f) => f.url().includes("officeapps.live.com"));
    if (wf.length > 0) {
      console.log(`  WOPI frame appeared after ${index + 1}s`);
      break;
    }
    if (index % 5 === 4) process.stdout.write(`  ${index + 1}s...`);
  }
  process.stdout.write("\n");

  // -----------------------------------------------------------------------
  // Enumerate all frames
  // -----------------------------------------------------------------------
  const frames = page.frames();
  console.log(`\nTotal frames: ${frames.length}`);
  const wopiFrames = frames.filter((f) =>
    f.url().includes("officeapps.live.com"),
  );

  if (wopiFrames.length === 0) {
    console.log("\n⚠️  No WOPI frame found yet.");
    console.log("Frame URLs:");
    for (const f of frames) {
      console.log(`  ${f.name() || "(unnamed)"}: ${f.url().slice(0, 120)}`);
    }
    console.log("\nWaiting longer for dynamic frame creation...");
    await sleep(10_000);
    const frames2 = page.frames();
    for (const f of frames2) {
      console.log(`  ${f.name() || "(unnamed)"}: ${f.url().slice(0, 120)}`);
      if (f.url().includes("officeapps.live.com")) {
        wopiFrames.push(f);
      }
    }
  }

  if (wopiFrames.length === 0) {
    console.log("\n❌ Still no WOPI frame. Session may be expired.");
    console.log("Re-login with agent-browser and try again.");
    await sleep(10_000);
    await browser.close();
    return;
  }

  const wopiFrame = wopiFrames[0];
  console.log(`\n✅ Found WOPI frame: ${wopiFrame.url().slice(0, 120)}`);

  // -----------------------------------------------------------------------
  // Explore the WOPI toolbar
  // -----------------------------------------------------------------------
  console.log("\n=== WOPI Toolbar ===");

  // Get all buttons and interactive elements in the WOPI frame.
  const toolbarElements = await wopiFrame.$$eval(
    'button, [role="button"], [role="tab"], [role="menuitem"], a, [role="link"]',
    (els) =>
      els.map((element) => ({
        tag: element.tagName.toLowerCase(),
        text: (element.textContent || "").trim().slice(0, 60),
        role: element.getAttribute("role") || "",
        ariaLabel: element.getAttribute("aria-label") || "",
        title: element.getAttribute("title") || "",
        className: element.className?.toString().slice(0, 60) || "",
        visible: element.offsetParent !== null,
      })),
  );

  // Filter to likely toolbar elements (visible and have text).
  const visible = toolbarElements.filter((e) => e.visible && e.text);
  console.log(`Visible elements with text: ${visible.length}`);

  // Show the first 30 for orientation.
  for (const element of visible.slice(0, 30)) {
    console.log(
      `  [${element.tag}] ${element.role || ""} "${element.text}" ${element.ariaLabel ? `aria="${element.ariaLabel}"` : ""}`,
    );
  }

  // -----------------------------------------------------------------------
  // Try to find and click the File tab
  // -----------------------------------------------------------------------
  console.log("\n=== Looking for File tab ===");

  // Try multiple selectors for the File button (Office Online uses various structures).
  const fileSelectors = [
    'button:has-text("File")',
    '[role="tab"]:has-text("File")',
    '[role="menubar"] >> text="File"',
    "#FileTabButton",
    '[aria-label*="File"]',
    '[title="File"]',
    ".o365cs-nav-fileButton",
  ];

  let fileButton = null;
  for (const sel of fileSelectors) {
    fileButton = await wopiFrame.$(sel);
    if (fileButton) {
      console.log(`Found File button with selector: ${sel}`);
      break;
    }
  }

  if (!fileButton) {
    console.log("File button not found. Exiting.");
    await browser.close();
    return;
  }

  // -----------------------------------------------------------------------
  // Click File to open the backstage menu
  // -----------------------------------------------------------------------
  console.log("\nClicking File tab...");
  await fileButton.click();
  await sleep(2000);

  // The File backstage has: Close, Info, Print, Share, About, Edit in Desktop App.
  // Click "Print" to open the print panel.
  console.log("\n=== Looking for Print in File backstage ===");
  const printButton = await wopiFrame.$(':has-text("Print") >> visible=true');
  if (printButton) {
    console.log("Clicking Print...");
    await printButton.click();
    await sleep(4000);

    // The print panel should now be visible. Look for download/export buttons.
    const printItems = await wopiFrame.$$eval(
      '[role="dialog"] *, [role="tabpanel"] *, button, a',
      (els) => {
        const seen = new Set<string>();
        return els
          .filter((e) => e.offsetParent !== null && e.children.length === 0)
          .map((e) => e.textContent?.trim())
          .filter(
            (t): t is string =>
              !!t &&
              t.length > 1 &&
              t.length < 80 &&
              !seen.has(t) &&
              (seen.add(t), true),
          )
          .slice(0, 40);
      },
    );
    console.log("Print panel items:", printItems);

    // Try to trigger download
    for (const kw of [
      "Download as PDF",
      "Export to PDF",
      "PDF",
      "Download",
      "Export",
      "Create PDF",
    ]) {
      const dlButton = await wopiFrame.$(`:has-text("${kw}") >> visible=true`);
      if (dlButton) {
        console.log(`Found "${kw}", clicking...`);
        const [download] = await Promise.all([
          page.waitForEvent("download", { timeout: 15_000 }).catch(() => null),
          dlButton.click(),
        ]);
        if (download) {
          const path = `/tmp/onenote-export.${download.suggestedFilename().split(".").pop()}`;
          await download.saveAs(path);
          console.log(`✅ Downloaded: ${path}`);
          break;
        }
      }
    }
  } else {
    console.log("Print button not found in File backstage.");
  }

  // -----------------------------------------------------------------------
  // Save updated session
  // -----------------------------------------------------------------------
  const newState = await context.storageState();
  writeFileSync(SESSION_FILE, JSON.stringify(newState, null, 2));
  console.log("\nSession saved back to:", SESSION_FILE);

  // -----------------------------------------------------------------------
  // Keep browser open for inspection
  // -----------------------------------------------------------------------
  console.log("\nKeeping browser open 15s for inspection...");
  await sleep(15_000);
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
