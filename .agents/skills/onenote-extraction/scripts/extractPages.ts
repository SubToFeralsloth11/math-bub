/**
 * Extract OneNote page content via WOPI frame DOM access.
 *
 * Navigates notebook sections and pages, extracting text AND images from
 * each page. Images are downloaded and saved alongside the JSON output.
 *
 * Prerequisites: agent-browser session at ~/.agent-browser/sessions/onenote-default.json
 *
 * Usage: bun run experiments/onenote-extraction/extractPages.ts
 *
 * @author John Grimes
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import type { Frame } from "playwright";

const SESSION_FILE =
  process.env.HOME + "/.agent-browser/sessions/onenote-default.json";
const OUTPUT_DIR = "/tmp/onenote-extraction";

// The Class Notebook to extract.
const NOTEBOOK_URL =
  "https://qedu-my.sharepoint.com/personal/dhive0_eq_edu_au/_layouts/15/Doc.aspx?sourcedoc={c8d53722-3c72-4046-9f6d-e71d54ddf069}&action=view";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

interface ExtractedImage {
  /** Filename saved to disk. */
  filename: string;
  /** Original src URL in the OneNote page. */
  src: string;
  /** Alt text if present. */
  alt: string;
  /** Width/height in pixels (natural dimensions). */
  width: number;
  height: number;
  /** Base64 data for small images that can't be fetched. */
  base64?: string;
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
  sections: {
    name: string;
    pages: ExtractedPage[];
  }[];
}

/** Global set of seen image src URLs for cross-page deduplication. */
const seenSrcs = new Map<string, number>();
const downloadedSrcs = new Set<string>();

/** Re-acquire the WOPI frame, with retries. */
async function getWopiFrame(mainPage: any): Promise<Frame | null> {
  for (let i = 0; i < 10; i++) {
    const wf = mainPage
      .frames()
      .find((f: Frame) => f.url().includes("officeapps.live.com"));
    if (wf) {
      try {
        // Verify the frame is alive with a simple eval.
        await wf.evaluate(() => document.title);
        return wf;
      } catch {
        // Frame detached; try again.
      }
    }
    await sleep(1500);
  }
  return null;
}

async function main() {
  // -----------------------------------------------------------------------
  // Setup
  // -----------------------------------------------------------------------
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  let storageState;
  try {
    storageState = JSON.parse(readFileSync(SESSION_FILE, "utf-8"));
    console.log(`Session: ${storageState.cookies?.length || 0} cookies`);
  } catch {
    console.error("No session. Run agent-browser login first.");
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true, slowMo: 50 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    storageState,
  });
  const mainPage = await context.newPage();

  // -----------------------------------------------------------------------
  // Open notebook
  // -----------------------------------------------------------------------
  console.log("Opening notebook...");
  await mainPage.goto(NOTEBOOK_URL, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  console.log("Title:", await mainPage.title());

  let wopiFrame = await getWopiFrame(mainPage);
  if (!wopiFrame) {
    console.error("WOPI frame not found.");
    await browser.close();
    return;
  }
  console.log("WOPI frame found.");

  // -----------------------------------------------------------------------
  // Diagnostic
  // -----------------------------------------------------------------------
  try {
    await dumpStructure(wopiFrame);
  } catch {
    console.log("  Diagnostic skipped (frame detached).");
  }

  // -----------------------------------------------------------------------
  // Extract all sections and pages
  // -----------------------------------------------------------------------
  const result: ExtractedNotebook = {
    notebookUrl: NOTEBOOK_URL,
    notebookTitle: await mainPage.title(),
    sections: [],
  };

  // Use known section names for this Class Notebook.
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

    // Re-acquire frame before each section.
    wopiFrame = await getWopiFrame(mainPage);
    if (!wopiFrame) {
      console.log("  WOPI frame lost; skipping remaining sections.");
      break;
    }

    const clicked = await clickSection(wopiFrame, sectionName);
    if (!clicked) {
      console.log("  Skipping (could not click).");
      continue;
    }
    await sleep(4000);

    // Re-acquire after clicking (the frame URL changes).
    wopiFrame = await getWopiFrame(mainPage);
    if (!wopiFrame) {
      console.log("  WOPI frame lost after section click.");
      continue;
    }

    const pageNames = await getPages(wopiFrame);
    console.log(`  ${pageNames.length} pages:`, pageNames);

    const pages: ExtractedPage[] = [];

    for (const pageName of pageNames) {
      console.log(`    Extracting: "${pageName}"`);

      wopiFrame = await getWopiFrame(mainPage);
      if (!wopiFrame) {
        console.log("      WOPI frame lost; skipping remaining pages.");
        break;
      }

      const pageClicked = await clickPage(wopiFrame, pageName);
      if (!pageClicked) {
        console.log("      Skipping (could not click).");
        continue;
      }
      await sleep(4000);

      wopiFrame = await getWopiFrame(mainPage);
      if (!wopiFrame) {
        console.log("      WOPI frame lost after page click.");
        continue;
      }

      const content = await getPageContent(wopiFrame);
      const images = await extractImages(
        wopiFrame,
        mainPage,
        sectionName,
        pageName,
      );
      const url = wopiFrame.url();

      console.log(`      ${content.length} chars, ${images.length} images.`);

      pages.push({
        sectionName,
        pageName,
        content,
        url,
        images,
      });
    }

    result.sections.push({ name: sectionName, pages });
  }

  // -----------------------------------------------------------------------
  // Save results
  // -----------------------------------------------------------------------
  // Remove images that appear on multiple pages (WOPI UI chrome).
  deduplicateAcrossPages(result);

  const outputPath = OUTPUT_DIR + "/extracted.json";
  writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`\n✅ Saved to ${outputPath}`);
  const totalPages = result.sections.reduce(
    (s, sec) => s + sec.pages.length,
    0,
  );
  const totalImages = result.sections.reduce(
    (s, sec) => s + sec.pages.reduce((p, page) => p + page.images.length, 0),
    0,
  );
  console.log(
    `   ${result.sections.length} sections, ${totalPages} pages, ${totalImages} images.`,
  );

  const newState = await context.storageState();
  writeFileSync(SESSION_FILE, JSON.stringify(newState, null, 2));

  await sleep(5000);
  await browser.close();
}

// ---------------------------------------------------------------------------
// Frame helpers
// ---------------------------------------------------------------------------

async function dumpStructure(frame: Frame) {
  console.log("\n=== Diagnostic: WOPI frame structure ===");
  const structure = await frame.$$eval(
    '[role="navigation"], [role="tablist"], [role="tree"], [role="tabpanel"]',
    (els: Element[]) =>
      els.map((element) => ({
        role:
          element.getAttribute("role") ||
          element.id ||
          element.tagName.toLowerCase(),
        children: element.children.length,
        text: element.textContent?.trim().slice(0, 200) || "",
      })),
  );
  for (const s of structure) {
    console.log(
      `  [${s.role}] (${s.children} children): "${s.text.slice(0, 100)}"`,
    );
  }
}

// ---------------------------------------------------------------------------
// Section/page navigation
// ---------------------------------------------------------------------------

async function clickSection(frame: Frame, name: string): Promise<boolean> {
  try {
    const clicked = await frame.evaluate((sectionName: string) => {
      const trees = document.querySelectorAll(
        '[role="navigation"] [role="tree"]',
      );
      const sectionTree = trees[0];
      if (!sectionTree) return false;
      const items = sectionTree.querySelectorAll('[role="treeitem"]');
      for (const item of items) {
        if (item.textContent?.trim() === sectionName) {
          (item as HTMLElement).click();
          return true;
        }
      }
      return false;
    }, name);
    if (clicked) return true;
  } catch {}

  // CSS selector fallback.
  try {
    const element = await frame.$(`[role="treeitem"]:has-text("${name}")`);
    if (element) {
      await element.click({ timeout: 5000 });
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
      const items = pageTree.querySelectorAll('[role="treeitem"]');
      return [...items]
        .map((element) => (element.textContent || "").trim())
        .filter((t) => t.length > 0 && t.length < 120);
    });
    if (pages.length > 0) return pages;
  } catch {}

  // Broad fallback.
  try {
    const allItems = await frame.$$eval('[role="treeitem"]', (els: Element[]) =>
      els
        .map((element) => (element.textContent || "").trim())
        .filter((t) => t.length > 1 && t.length < 120),
    );
    const exclude = new Set([
      "Welcome",
      "_Content Library",
      "Collaboration Space",
      "GRIMES, Thomas (tgrim43)",
    ]);
    return allItems.filter((n) => !exclude.has(n));
  } catch {
    return [];
  }
}

async function clickPage(frame: Frame, name: string): Promise<boolean> {
  const selectors = [
    `[role="tree"]:nth-of-type(2) [role="treeitem"]:has-text("${name}")`,
    `[role="treeitem"]:has-text("${name}")`,
  ];
  for (const sel of selectors) {
    try {
      const element = await frame.$(sel);
      if (element) {
        await element.click({ timeout: 5000 });
        return true;
      }
    } catch {}
  }

  // JS click fallback.
  try {
    await frame.evaluate((targetName: string) => {
      const items = document.querySelectorAll('[role="treeitem"]');
      for (const item of items) {
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

// ---------------------------------------------------------------------------
// Content extraction
// ---------------------------------------------------------------------------

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
        const element = document.querySelector(sel);
        if (element) {
          const text = element.textContent?.trim();
          if (text && text.length > 50) return text;
        }
      }
      const editables = document.querySelectorAll('[contenteditable="true"]');
      const texts: string[] = [];
      for (const element of editables) {
        const text = element.textContent?.trim();
        if (text && text.length > 30) texts.push(text);
      }
      if (texts.length > 0) return texts.join("\n\n");
      return document.body.innerText;
    });

    // Strip known toolbar/header prefixes that appear on every page.
    const prefixesToStrip = [
      /^2026 - Year 8 Maths[\s\S]*?Share\s*\(Ctrl\+Alt\+C,[\s\S]*?\)/,
      /^\s*Page Contents\s*/,
    ];
    let cleaned = rawText;
    for (const pattern of prefixesToStrip) {
      cleaned = cleaned.replace(pattern, "").trim();
    }
    return cleaned.slice(0, 8000);
  } catch {
    return "(error extracting content)";
  }
}

// ---------------------------------------------------------------------------
// Image extraction
// ---------------------------------------------------------------------------

async function extractImages(
  wopiFrame: Frame,
  mainPage: any,
  sectionName: string,
  pageName: string,
): Promise<ExtractedImage[]> {
  let imageData: { src: string; alt: string; width: number; height: number }[];
  try {
    imageData = await wopiFrame.$$eval(
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

  for (const img of imageData) {
    seenSrcs.set(img.src, (seenSrcs.get(img.src) || 0) + 1);
  }

  const images: ExtractedImage[] = [];
  const safeSection = sectionName.replaceAll(/[^a-zA-Z0-9_-]/g, "_");
  const safePage = pageName.replaceAll(/[^a-zA-Z0-9_-]/g, "_");
  const prefix = `${safeSection}__${safePage}`;

  for (const [index, img] of imageData.entries()) {
    const extension = guessExtension(img.src);
    const filename = `${prefix}__img${String(index).padStart(3, "0")}.${extension}`;
    const filepath = `${OUTPUT_DIR}/${filename}`;

    try {
      if (img.src.startsWith("data:")) {
        const base64 = img.src.split(",")[1];
        if (base64) {
          const buf = Buffer.from(base64, "base64");
          if (buf.length < 500) continue;
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
      } else if (img.src.startsWith("blob:")) {
        try {
          const buf = await wopiFrame.evaluate(async (blobUrl: string) => {
            const resp = await fetch(blobUrl);
            const blob = await resp.blob();
            const array = await blob.arrayBuffer();
            return [...new Uint8Array(array)];
          }, img.src);
          if (buf && buf.length > 500) {
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
            if (buf.length < 500) continue;
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
        } catch {
          try {
            const element = await wopiFrame.$(`img[src="${img.src}"]`);
            if (element) {
              await element.screenshot({ path: filepath });
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
        }
      }
    } catch {}
  }

  return images;
}

function deduplicateAcrossPages(result: ExtractedNotebook) {
  const multiPageSrcs = new Set<string>();
  for (const [source, count] of seenSrcs) {
    if (count > 1) multiPageSrcs.add(source);
  }

  const firstSeen = new Set<string>();
  let removed = 0;
  for (const section of result.sections) {
    for (const pageData of section.pages) {
      const before = pageData.images.length;
      pageData.images = pageData.images.filter((img) => {
        if (!multiPageSrcs.has(img.src)) return true;
        if (firstSeen.has(img.src)) return false;
        firstSeen.add(img.src);
        return true;
      });
      removed += before - pageData.images.length;
    }
  }
  if (removed > 0) {
    console.log(
      `  Deduplicated: removed ${removed} duplicate images (kept first occurrence of each).`,
    );
  }
}

function guessExtension(source: string): string {
  if (source.startsWith("data:image/png")) return "png";
  if (
    source.startsWith("data:image/jpeg") ||
    source.startsWith("data:image/jpg")
  )
    return "jpg";
  if (source.startsWith("data:image/gif")) return "gif";
  if (source.startsWith("data:image/webp")) return "webp";
  if (source.startsWith("data:image/svg")) return "svg";
  const m = source.match(/\.(\w+)(?:\?|$)/);
  if (m) {
    const e = m[1].toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp"].includes(e))
      return e;
  }
  return "png";
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
