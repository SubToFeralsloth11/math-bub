/**
 * Extract OneNote notebook content — self-contained with SSO login.
 *
 * Does its own login using 1Password credentials, no session file needed.
 *
 * Usage:
 *   export ONENOTE_USER=tgrim43
 *   export ONENOTE_PASS=$(op item get --vault Lem 'Department of Education and Training' --fields password --reveal)
 *   bun run extractWithLogin.ts
 *
 * @author John Grimes
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import type { Frame, Page } from "playwright";

const OUTPUT_DIR = "/tmp/onenote-extraction";
const NOTEBOOK_URL =
  "https://qedu-my.sharepoint.com/personal/dhive0_eq_edu_au/_layouts/15/Doc.aspx?sourcedoc={c8d53722-3c72-4046-9f6d-e71d54ddf069}&action=view";

const USER = process.env.ONENOTE_USER || "tgrim43";
const PASS = process.env.ONENOTE_PASS;
if (!PASS) {
  console.error(
    "ONENOTE_PASS not set. Use: op item get --vault Lem 'Department of Education and Training' --fields password --reveal",
  );
  process.exit(1);
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Types
interface ExtractedImage {
  filename: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}
interface ExtractedPage {
  sectionName: string;
  pageName: string;
  content: string;
  url: string;
  images: ExtractedImage[];
}
interface ExtractedNotebook {
  notebookUrl: string;
  notebookTitle: string;
  sections: { name: string; pages: ExtractedPage[] }[];
}

// Globals for dedup
const seenSrcs = new Map<string, number>();
const downloadedSrcs = new Set<string>();

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true, slowMo: 30 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  // ---- STEP 1: Login to Microsoft / OneNote ----
  console.log("Logging in via Microsoft SSO...");
  await page.goto("https://onenote.cloud.microsoft/notebooks", {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await sleep(2000);
  await handleMicrosoftLogin(page);
  console.log(
    "  Post-login:",
    await page.title(),
    "|",
    page.url().slice(0, 120),
  );

  // ---- STEP 2: Open the Class Notebook ----
  console.log("\nOpening Class Notebook...");
  await page.goto(NOTEBOOK_URL, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await sleep(3000);

  // The SharePoint URL may trigger another Microsoft login.
  await handleMicrosoftLogin(page);

  console.log("  Notebook:", await page.title(), "|", page.url().slice(0, 120));

  // ---- STEP 3: Wait for WOPI frame ----
  let wopiFrame = await getWopiFrame(page);
  if (!wopiFrame) {
    console.error("WOPI frame not found after login.");
    await browser.close();
    return;
  }
  console.log("  WOPI frame found.");

  // ---- STEP 4: Extract all sections and pages ----
  const result: ExtractedNotebook = {
    notebookUrl: NOTEBOOK_URL,
    notebookTitle: await page.title(),
    sections: [],
  };

  const sections = [
    "Welcome",
    "_Content Library",
    "General",
    "Questions",
    "Term 1",
    "Term 2",
    "Term 3",
    "Term 4",
    "Connect",
    "GRIMES, Thomas (tgrim43)",
  ];
  console.log(`\nSections: ${sections.join(", ")}`);

  for (const sectionName of sections) {
    console.log(`\n--- Section: ${sectionName} ---`);
    wopiFrame = await getWopiFrame(page);
    if (!wopiFrame) {
      console.log("  WOPI frame lost; stopping.");
      break;
    }

    const clicked = await clickSection(wopiFrame, sectionName);
    if (!clicked) {
      console.log("  Skipping.");
      continue;
    }
    await sleep(4000);

    wopiFrame = await getWopiFrame(page);
    if (!wopiFrame) {
      console.log("  Frame lost after click.");
      continue;
    }

    const pageNames = await getPages(wopiFrame);
    console.log(`  ${pageNames.length} pages:`, pageNames);

    const pages: ExtractedPage[] = [];
    for (const pageName of pageNames) {
      console.log(`    Extracting: "${pageName}"`);
      wopiFrame = await getWopiFrame(page);
      if (!wopiFrame) {
        console.log("      Frame lost.");
        break;
      }

      const pc = await clickPage(wopiFrame, pageName);
      if (!pc) {
        console.log("      Skipping.");
        continue;
      }
      await sleep(4000);

      wopiFrame = await getWopiFrame(page);
      if (!wopiFrame) {
        console.log("      Frame lost after page click.");
        continue;
      }

      const content = await getPageContent(wopiFrame);
      const images = await extractImages(
        wopiFrame,
        page,
        sectionName,
        pageName,
      );
      console.log(`      ${content.length} chars, ${images.length} images.`);
      pages.push({
        sectionName,
        pageName,
        content,
        url: wopiFrame.url(),
        images,
      });
    }
    result.sections.push({ name: sectionName, pages });
  }

  // ---- STEP 5: Save ----
  deduplicateAcrossPages(result);
  const outputPath = OUTPUT_DIR + "/extracted.json";
  writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`\n✅ Saved to ${outputPath}`);
  const totalPages = result.sections.reduce(
    (s, sec) => s + sec.pages.length,
    0,
  );
  const totalImages = result.sections.reduce(
    (s, sec) => s + sec.pages.reduce((p, pg) => p + pg.images.length, 0),
    0,
  );
  console.log(
    `   ${result.sections.length} sections, ${totalPages} pages, ${totalImages} images.`,
  );

  await browser.close();
}

// ---- Login helpers ----

async function handleMicrosoftLogin(page: Page) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const url = page.url();
    const title = await page.title().catch(() => "");
    console.log(`    [login check ${attempt}] ${title} | ${url.slice(0, 100)}`);

    // Already at the notebook — done.
    if (url.includes("sharepoint.com") && title.includes("Year 8 Maths"))
      return;
    if (url.includes("onenote.cloud.microsoft") && title.includes("OneNote"))
      return;

    // Microsoft login: enter email
    if (url.includes("login.microsoftonline.com") && !url.includes("fed.")) {
      // Check for email input.
      const emailVisible = await page
        .locator('input[type="email"]')
        .isVisible()
        .catch(() => false);
      if (emailVisible) {
        console.log("    Filling email...");
        await page.locator('input[type="email"]').fill(`${USER}@eq.edu.au`);
        await page.locator('input[type="submit"]').click();
        await sleep(5000);
        continue;
      }
      // Check for "Stay signed in?" prompt.
      if (title.includes("Stay signed in") || title.includes("Do you trust")) {
        console.log("    Clicking Yes/Continue...");
        try {
          await page.locator("#idSIButton9").click({ timeout: 5000 });
        } catch {
          await page.evaluate(() => {
            (document.querySelector("#idSIButton9") as HTMLElement)?.click();
          });
        }
        await sleep(5000);
        continue;
      }
      // Device auth reprocess — wait.
      if (url.includes("DeviceAuthTls") || url.includes("reprocess")) {
        await sleep(5000);
        continue;
      }
      await sleep(3000);
      continue;
    }

    // QLD SSO page.
    if (url.includes("fed.education.qld.gov.au")) {
      console.log("    Filling SSO form...");
      try {
        await page.waitForSelector("#username", { timeout: 10_000 });
        await page.locator("#username").fill(USER);
        await page.evaluate(() => {
          const u = document.querySelector("#username") as HTMLInputElement;
          if (u) {
            u.dispatchEvent(new Event("input", { bubbles: true }));
            u.dispatchEvent(new Event("change", { bubbles: true }));
          }
          const cb = document.querySelector("#sso-cou") as HTMLInputElement;
          if (cb) {
            cb.checked = true;
            cb.value = "on";
            cb.dispatchEvent(new Event("input", { bubbles: true }));
            cb.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        await page.locator("#password").fill(PASS);
        await page.evaluate(() => {
          const p = document.querySelector("#password") as HTMLInputElement;
          if (p) {
            p.dispatchEvent(new Event("input", { bubbles: true }));
            p.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        await page.locator("#sso-signin").click();
        await sleep(5000);
        continue;
      } catch (e) {
        console.log("    SSO error:", e);
        await sleep(3000);
        continue;
      }
    }

    await sleep(3000);
  }
}

// ---- Frame helpers ----

async function getWopiFrame(mainPage: Page): Promise<Frame | null> {
  for (let i = 0; i < 15; i++) {
    const wf = mainPage
      .frames()
      .find((f: Frame) => f.url().includes("officeapps.live.com"));
    if (wf) {
      try {
        await wf.evaluate(() => document.title);
        return wf;
      } catch {
        /* detached, retry */
      }
    }
    await sleep(1500);
  }
  return null;
}

// ---- Section/page navigation ----

async function clickSection(frame: Frame, name: string): Promise<boolean> {
  try {
    const clicked = await frame.evaluate((sectionName: string) => {
      const trees = document.querySelectorAll(
        '[role="navigation"] [role="tree"]',
      );
      const sectionTree = trees[0];
      if (!sectionTree) return false;
      for (const item of sectionTree.querySelectorAll('[role="treeitem"]')) {
        if (item.textContent?.trim() === sectionName) {
          (item as HTMLElement).click();
          return true;
        }
      }
      return false;
    }, name);
    if (clicked) return true;
  } catch {}
  try {
    const el = await frame.$(`[role="treeitem"]:has-text("${name}")`);
    if (el) {
      await el.click({ timeout: 5000 });
      return true;
    }
  } catch {}
  return false;
}

async function getPages(frame: Frame): Promise<string[]> {
  try {
    const pages = await frame.evaluate(() => {
      const trees = document.querySelectorAll(
        '[role="navigation"] [role="tree"]',
      );
      const pageTree = trees[1];
      if (!pageTree) return [] as string[];
      return [...pageTree.querySelectorAll('[role="treeitem"]')]
        .map((el) => (el.textContent || "").trim())
        .filter((t) => t.length > 0 && t.length < 120);
    });
    if (pages.length > 0) return pages;
  } catch {}
  try {
    const all = await frame.$$eval('[role="treeitem"]', (els: Element[]) =>
      els
        .map((el) => (el.textContent || "").trim())
        .filter((t) => t.length > 1 && t.length < 120),
    );
    const exclude = new Set([
      "Welcome",
      "_Content Library",
      "Collaboration Space",
      "GRIMES, Thomas (tgrim43)",
    ]);
    return all.filter((n) => !exclude.has(n));
  } catch {
    return [];
  }
}

async function clickPage(frame: Frame, name: string): Promise<boolean> {
  for (const sel of [
    `[role="tree"]:nth-of-type(2) [role="treeitem"]:has-text("${name}")`,
    `[role="treeitem"]:has-text("${name}")`,
  ]) {
    try {
      const el = await frame.$(sel);
      if (el) {
        await el.click({ timeout: 5000 });
        return true;
      }
    } catch {}
  }
  try {
    await frame.evaluate((targetName: string) => {
      for (const item of document.querySelectorAll('[role="treeitem"]')) {
        if (item.textContent?.trim() === targetName) {
          (item as HTMLElement).click();
          return;
        }
      }
    }, name);
    return true;
  } catch {
    return false;
  }
}

// ---- Content extraction ----

async function getPageContent(frame: Frame): Promise<string> {
  try {
    const rawText = await frame.evaluate(() => {
      const selects = [
        ".OutlineElement",
        "#PageContent",
        "#WACPageContent",
        ".PageContent",
        '[data-id="pageContent"]',
        ".page-canvas",
      ];
      for (const sel of selects) {
        const el = document.querySelector(sel);
        if (el) {
          const t = el.textContent?.trim();
          if (t && t.length > 50) return t;
        }
      }
      const editables = document.querySelectorAll('[contenteditable="true"]');
      const texts: string[] = [];
      for (const el of editables) {
        const t = el.textContent?.trim();
        if (t && t.length > 30) texts.push(t);
      }
      if (texts.length > 0) return texts.join("\n\n");
      return document.body.innerText;
    });
    const prefixesToStrip = [
      /^2026 - Year 8 Maths[\s\S]*?Share\s*\(Ctrl\+Alt\+C,[\s\S]*?\)/,
      /^\s*Page Contents\s*/,
    ];
    let cleaned = rawText;
    for (const p of prefixesToStrip) cleaned = cleaned.replace(p, "").trim();
    return cleaned.slice(0, 8000);
  } catch {
    return "(error)";
  }
}

// ---- Image extraction ----

async function extractImages(
  frame: Frame,
  mainPage: Page,
  sectionName: string,
  pageName: string,
): Promise<ExtractedImage[]> {
  let imageData: { src: string; alt: string; width: number; height: number }[];
  try {
    imageData = await frame.$$eval(
      'img:not([class*="icon"]):not([class*="ribbon"]):not([class*="toolbar"]):not([class*="nav"]):not([class*="brand"]):not([class*="logo"])',
      (imgs: HTMLImageElement[]) =>
        imgs
          .filter(
            (img) =>
              img.naturalWidth > 60 &&
              img.naturalHeight > 60 &&
              !(img.src.startsWith("data:image/svg") && img.naturalWidth < 100),
          )
          .map((img) => ({
            src: img.src,
            alt: img.alt || "",
            width: img.naturalWidth,
            height: img.naturalHeight,
          })),
    );
  } catch {
    return [];
  }
  if (imageData.length === 0) return [];

  for (const img of imageData)
    seenSrcs.set(img.src, (seenSrcs.get(img.src) || 0) + 1);

  const images: ExtractedImage[] = [];
  const safeSection = sectionName.replaceAll(/[^a-zA-Z0-9_-]/g, "_");
  const safePage = pageName.replaceAll(/[^a-zA-Z0-9_-]/g, "_");
  const prefix = `${safeSection}__${safePage}`;

  for (const [i, img] of imageData.entries()) {
    const ext = guessExtension(img.src);
    const filename = `${prefix}__img${String(i).padStart(3, "0")}.${ext}`;
    const filepath = `${OUTPUT_DIR}/${filename}`;
    try {
      if (img.src.startsWith("data:")) {
        const b64 = img.src.split(",")[1];
        if (b64) {
          const buf = Buffer.from(b64, "base64");
          if (buf.length >= 500) {
            writeFileSync(filepath, buf);
            images.push({
              filename,
              src: img.src.slice(0, 80),
              alt: img.alt,
              width: img.width,
              height: img.height,
            });
            downloadedSrcs.add(img.src);
          }
        }
      } else if (img.src.startsWith("blob:")) {
        try {
          const buf = await frame.evaluate(async (blobUrl: string) => {
            const resp = await fetch(blobUrl);
            const blob = await resp.blob();
            const arr = await blob.arrayBuffer();
            return [...new Uint8Array(arr)];
          }, img.src);
          if (buf && buf.length >= 500) {
            writeFileSync(filepath, Buffer.from(buf));
            images.push({
              filename,
              src: img.src.slice(0, 80),
              alt: img.alt,
              width: img.width,
              height: img.height,
            });
            downloadedSrcs.add(img.src);
          }
        } catch {}
      } else {
        if (downloadedSrcs.has(img.src)) continue;
        try {
          const resp = await mainPage.request.get(img.src, { timeout: 10_000 });
          if (resp.ok()) {
            const buf = await resp.body();
            if (buf.length >= 500) {
              writeFileSync(filepath, buf);
              images.push({
                filename,
                src: img.src.slice(0, 120),
                alt: img.alt,
                width: img.width,
                height: img.height,
              });
              downloadedSrcs.add(img.src);
            }
          }
        } catch {}
      }
    } catch {}
  }
  return images;
}

function deduplicateAcrossPages(result: ExtractedNotebook) {
  const multiPageSrcs = new Set<string>();
  for (const [s, c] of seenSrcs) {
    if (c > 1) multiPageSrcs.add(s);
  }
  const firstSeen = new Set<string>();
  let removed = 0;
  for (const sec of result.sections) {
    for (const pg of sec.pages) {
      const before = pg.images.length;
      pg.images = pg.images.filter((img) => {
        if (!multiPageSrcs.has(img.src)) return true;
        if (firstSeen.has(img.src)) return false;
        firstSeen.add(img.src);
        return true;
      });
      removed += before - pg.images.length;
    }
  }
  if (removed > 0)
    console.log(`  Deduplicated: removed ${removed} duplicate images.`);
}

function guessExtension(src: string): string {
  if (src.startsWith("data:image/png")) return "png";
  if (src.startsWith("data:image/jpeg") || src.startsWith("data:image/jpg"))
    return "jpg";
  if (src.startsWith("data:image/gif")) return "gif";
  if (src.startsWith("data:image/webp")) return "webp";
  if (src.startsWith("data:image/svg")) return "svg";
  const m = src.match(/\.(\w+)(?:\?|$)/);
  if (m) {
    const e = m[1].toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp"].includes(e))
      return e;
  }
  return "png";
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
