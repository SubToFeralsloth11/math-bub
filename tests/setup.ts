import "@testing-library/jest-dom/vitest";

// jsdom does not implement window.matchMedia, so provide a stub that returns
// no-preference by default. Individual tests can override it to simulate
// reduced-motion or other media-query preferences.
if (
  globalThis.window !== undefined &&
  typeof globalThis.window.matchMedia !== "function"
) {
  Object.defineProperty(globalThis.window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// jsdom does not fully implement the native <dialog> modal methods, so provide
// minimal stand-ins that toggle the `open` state for component tests.
if (typeof HTMLDialogElement !== "undefined") {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.open = true;
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close() {
      this.open = false;
    };
  }
}
