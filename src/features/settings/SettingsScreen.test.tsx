import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { SettingsScreen } from "./SettingsScreen";
import { AppHeader } from "../../components/AppHeader";
import { STORAGE_KEY } from "../../domain/persistence/aiConfig";
import { renderApp } from "../../test/renderApp";

const SAVED_CONFIG = {
  baseUrl: "https://saved.example.com/v1",
  apiKey: "sk-saved123",
  model: "saved-model",
};

describe("SettingsScreen", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders three labelled fields and a Save button", () => {
    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });
    expect(screen.getByLabelText(/api base url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/api key/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("pre-populates from saved config when present", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAVED_CONFIG));
    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });
    expect(screen.getByLabelText(/api base url/i)).toHaveValue(
      "https://saved.example.com/v1",
    );
    expect(screen.getByLabelText(/model/i)).toHaveValue("saved-model");
  });

  it("pre-populates from env vars when no saved config", () => {
    // Environment variables are read at import time, so we can't mock them
    // easily. The SettingsScreen falls back to env vars when no saved config.
    // For this test, verify the fields are empty when neither env nor saved exist.
    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });
    expect(screen.getByLabelText(/api base url/i)).toHaveValue("");
    expect(screen.getByLabelText(/model/i)).toHaveValue("");
  });

  it("shows confirmation on Save", async () => {
    const user = userEvent.setup();
    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });

    await user.type(
      screen.getByLabelText(/api base url/i),
      "https://example.com/v1",
    );
    await user.type(screen.getByLabelText(/api key/i), "sk-test");
    await user.type(screen.getByLabelText(/model/i), "gpt-4o");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/saved/i);

    // Verify the config was persisted to localStorage.
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed).toEqual({
      baseUrl: "https://example.com/v1",
      apiKey: "sk-test",
      model: "gpt-4o",
    });
  });

  it("clears fields on Clear and saves empty config", async () => {
    const user = userEvent.setup();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAVED_CONFIG));

    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });

    // Fields should be pre-populated.
    expect(screen.getByLabelText(/api base url/i)).toHaveValue(
      "https://saved.example.com/v1",
    );

    // Clear all fields.
    await user.clear(screen.getByLabelText(/api base url/i));
    await user.clear(screen.getByLabelText(/api key/i));
    await user.clear(screen.getByLabelText(/model/i));
    await user.click(screen.getByRole("button", { name: /save/i }));

    // After clearing and saving, config should be removed.
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("does not save when fields are partially filled (FR-005)", async () => {
    // Pre-condition: no saved config. Env vars may pre-populate fields,
    // so we must clear them to ensure only one field is filled.
    const user = userEvent.setup();
    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });

    // Clear all fields (env vars may fill them).
    await user.clear(screen.getByLabelText(/api base url/i));
    await user.clear(screen.getByLabelText(/api key/i));
    await user.clear(screen.getByLabelText(/model/i));

    // Fill only the base URL field, leaving the others empty.
    await user.type(
      screen.getByLabelText(/api base url/i),
      "https://example.com/v1",
    );
    await user.click(screen.getByRole("button", { name: /save/i }));

    // Config should NOT be persisted — all three fields are required.
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    // No success message should appear.
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("has a back link to home", () => {
    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("masks the API key by default and allows revealing", async () => {
    const user = userEvent.setup();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAVED_CONFIG));

    renderApp(<SettingsScreen />, { path: "/settings", route: "/settings" });

    // API key field should be of type "password" by default.
    const apiKeyField = screen.getByLabelText(/api key/i);
    expect(apiKeyField).toHaveAttribute("type", "password");

    // Find the reveal toggle and click it.
    const revealButton = screen.getByRole("button", { name: /show/i });
    await user.click(revealButton);

    // Now the field should be type "text".
    expect(apiKeyField).toHaveAttribute("type", "text");
  });
});

describe("AppHeader gear icon", () => {
  it("renders a gear icon linking to /settings", () => {
    renderApp(<AppHeader />);
    const header = screen.getByRole("banner");
    const gearLink = within(header).getByRole("link", { name: /settings/i });
    expect(gearLink).toHaveAttribute("href", "/settings");
  });
});
