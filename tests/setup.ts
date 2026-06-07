import "@testing-library/jest-dom/vitest";

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
