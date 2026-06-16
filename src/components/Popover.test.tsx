import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders children when open", () => {
    render(
      <Popover open onClose={() => {}}>
        <div data-testid="popover-content">Hello</div>
      </Popover>,
    );
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();
  });

  it("does not render children when closed", () => {
    render(
      <Popover open={false} onClose={() => {}}>
        <div data-testid="popover-content">Hello</div>
      </Popover>,
    );
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed while open", async () => {
    const user = userEvent.setup();
    let closed = false;
    render(
      <Popover
        open
        onClose={() => {
          closed = true;
        }}
      >
        <div>Content</div>
      </Popover>,
    );
    await user.keyboard("{Escape}");
    expect(closed).toBe(true);
  });

  it("does not call onClose when Escape is pressed while closed", async () => {
    const user = userEvent.setup();
    let closed = false;
    render(
      <Popover
        open={false}
        onClose={() => {
          closed = true;
        }}
      >
        <div>Content</div>
      </Popover>,
    );
    await user.keyboard("{Escape}");
    expect(closed).toBe(false);
  });

  it("calls onClose when clicking outside the popover", async () => {
    const user = userEvent.setup();
    let closed = false;
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Popover
          open
          onClose={() => {
            closed = true;
          }}
        >
          <div>Content</div>
        </Popover>
      </div>,
    );
    await user.click(screen.getByTestId("outside"));
    expect(closed).toBe(true);
  });

  it("renders the anchor element when provided", () => {
    render(
      <Popover
        open
        onClose={() => {}}
        anchor={<button data-testid="anchor-btn">Click me</button>}
      >
        <div>Content</div>
      </Popover>,
    );
    expect(screen.getByTestId("anchor-btn")).toBeInTheDocument();
  });
});
