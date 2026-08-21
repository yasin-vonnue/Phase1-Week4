import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { setupDarkMode } from "../js/darkMode.js";

describe("setupDarkMode", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <button class="dark-mode-toggle"></button>
      </div>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should apply dark mode when localStorage has a dark preference", () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue("dark");

    setupDarkMode();

    expect(getItemSpy).toHaveBeenCalledWith("theme");
    expect(document.body.classList.contains("dark-mode")).toBe(true);

    const toggleButton = document.querySelector(".dark-mode-toggle");

    expect(toggleButton.getAttribute("aria-label")).toBe(
      "Switch to light mode",
    );
  });
});
