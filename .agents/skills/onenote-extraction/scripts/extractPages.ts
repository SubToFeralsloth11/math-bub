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

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    storageState,
  });
  const page = await context.newPage();

  // -----------------------------------------------------------------------
  // Open notebook
  // -----------------------------------------------------------------------
  console.log("Opening notebook...");
  await page.goto(NOTEBOOK_URL, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  console.log("Title:", await page.title());

  await sleep(3000);
  const wopiFrame = await waitForWopiFrame(page);
  if (!wopiFrame) {
    console.error("WOPI frame not found.");
    await browser.close();
    return;
  }
  console.log("WOPI frame found.");

  // -----------------------------------------------------------------------
  // Diagnostic
  // -----------------------------------------------------------------------
  await dumpStructure(wopiFrame);

  // -----------------------------------------------------------------------
  // Extract all sections and pages
  // -----------------------------------------------------------------------
  const result: ExtractedNotebook = {
    notebookUrl: NOTEBOOK_URL,
    notebookTitle: await page.title(),
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
    const clicked = await clickSection(wopiFrame, sectionName);
    if (!clicked) {
      console.log("  Skipping (could not click).");
      continue;
    }
    await sleep(3000);

    const pageNames = await getPages(wopiFrame);
    console.log(`  ${pageNames.length} pages:`, pageNames);

    const pages: ExtractedPage[] = [];

    for (const pageName of pageNames) {
      console.log(`    Extracting: "${pageName}"`);
      const pageClicked = await clickPage(wopiFrame, pageName);
      if (!pageClicked) {
        console.log("      Skipping (could not click).");
        continue;
      }
      await sleep(3000);

      const content = await getPageContent(wopiFrame);
      const images = await extractImages(
        wopiFrame,
        page,
        sectionName,
        pageName,
      );
      const url = wopiFrame.url();

      console.log(
        `      ${content.length} chars, ${images.length} images. URL: ${url.slice(0, 80)}`,
      );

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

async function waitForWopiFrame(page: any) {
  for (let index = 0; index < 20; index++) {
    await sleep(1000);
    const wf = page
      .frames()
      .find((f: any) => f.url().includes("officeapps.live.com"));
    if (wf) return wf;
  }
  return null;
}

async function dumpStructure(frame: any) {
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

async function getSections(frame: any): Promise<string[]> {
  const names = await frame.$$eval(
    '[role="navigation"] [role="tab"], [role="tree"] [role="treeitem"], [role="navigation"] [role="treeitem"]',
    (els: Element[]) => [
      ...new Set(
        els
          .map((element) => (element.textContent || "").trim())
          .filter((t) => t.length > 1 && t.length < 80),
      ),
    ],
  );
  if (names.length > 0) return names;
  return [];
}

async function clickSection(frame: any, name: string): Promise<boolean> {
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
  try {
    const element = await frame.$(`[role="treeitem"]:has-text("${name}")`);
    if (element) {
      await element.click({ timeout: 3000 });
      return true;
    }
  } catch {}
  return false;
}

async function getPages(frame: any): Promise<string[]> {
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
}

async function clickPage(frame: any, name: string): Promise<boolean> {
  const selectors = [
    `[role="tree"]:nth-of-type(2) [role="treeitem"]:has-text("${name}")`,
    `[role="treeitem"]:has-text("${name}")`,
    `:has-text("${name}")`,
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
    await frame.evaluate((name: string) => {
      const items = document.querySelectorAll('[role="treeitem"]');
      for (const item of items) {
        if (item.textContent?.trim() === name) {
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

async function getPageContent(frame: any): Promise<string> {
  try {
    // Get text from contenteditable regions (OneNote's page canvas).
    // Then clean up toolbar/header text that bleeds into the full body text.
    const rawText = await frame.evaluate(() => {
      // Get content from the page canvas area first.
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
      // Fallback: all contenteditable regions.
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
      /^2026 - Year 8 Maths[\s\S]*?Share\s*\(Ctrl\+Alt\+C,[\s\S]*?\)/, // Header block
      /^\s*Page Contents\s*/, // Navigation header
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

/** Global set of seen image src URLs for cross-page deduplication. */
const seenSrcs = new Map<string, number>(); // src → count of pages it appears on.
const downloadedSrcs = new Set<string>(); // src → already downloaded.

/**
 * Finds all images visible in the current OneNote page, downloads them,
 * and returns metadata for each. Filters out WOPI UI chrome that appears
 * on every page.
 */
async function extractImages(
  wopiFrame: any,
  page: any,
  sectionName: string,
  pageName: string,
): Promise<ExtractedImage[]> {
  // Find <img> elements, excluding known UI classes and inline icon patterns.
  const imageData = await wopiFrame.$$eval(
    'img:not([class*="icon"]):not([class*="ribbon"]):not([class*="toolbar"]):not([class*="nav"]):not([class*="brand"]):not([class*="logo"])',
    (imgs: HTMLImageElement[]) =>
      imgs
        .filter(
          (img) =>
            img.naturalWidth > 60 &&
            img.naturalHeight > 60 &&
            // Exclude inline data URIs that are tiny (UI sprites).
            !(img.src.startsWith("data:image/svg") && img.naturalWidth < 100),
        )
        .map((img) => ({
          src: img.src,
          alt: img.alt || "",
          width: img.naturalWidth,
          height: img.naturalHeight,
        })),
  );

  if (imageData.length === 0) return [];

  // Mark all src URLs as seen for deduplication.
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

    // Skip if this src appears too many times (likely UI chrome that's copied
    // into every page's DOM, like the OneNote sidebar decoration).
    // We evaluate this AFTER all pages are processed in finalDeduplicate.

    try {
      if (img.src.startsWith("data:")) {
        const base64 = img.src.split(",")[1];
        if (base64) {
          const buf = Buffer.from(base64, "base64");
          // Skip data URIs that are too small (UI sprites).
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
        // Skip if already downloaded (dedup).
        if (downloadedSrcs.has(img.src)) continue;
        try {
          const resp = await page.request.get(img.src, { timeout: 10_000 });
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

/**
 * After all pages are processed, deduplicates images whose src URL appears
 * on multiple pages. Keeps the first occurrence, removes subsequent copies.
 * These are typically WOPI UI chrome rendered redundantly in the DOM.
 */
function deduplicateAcrossPages(result: ExtractedNotebook) {
  // src URLs that appear on more than 1 page = duplicated across pages.
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
        if (!multiPageSrcs.has(img.src)) return true; // Unique - keep.
        if (firstSeen.has(img.src)) return false; // Already kept - remove.
        firstSeen.add(img.src);
        return true; // First occurrence - keep.
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

/**
 * Guesses a file extension from an image URL.
 */
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
  // Try URL path extension.
  const m = source.match(/\.(\w+)(?:\?|$)/);
  if (m) {
    const e = m[1].toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp"].includes(e))
      return e;
  }
  return "png"; // Default.
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
