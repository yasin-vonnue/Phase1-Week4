import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Accordion", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="accordion">
        <button
          class="accordion-btn"
          aria-expanded="false"
        >
          Question 1
        </button>

        <div class="content" hidden>
          Answer 1
        </div>

        <button
          class="accordion-btn"
          aria-expanded="false"
        >
          Question 2
        </button>

        <div class="content" hidden>
          Answer 2
        </div>
      </div>
    `;

    sessionStorage.clear();

    vi.resetModules();
  });

  it("should open the panel when the header is clicked", async () => {
    await import("../js/accordion.js");

    const button = document.querySelector(".accordion-btn");
    const panel = document.querySelector(".content");

    button.click();

    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(panel.hidden).toBe(false);
    expect(panel.classList.contains("open")).toBe(true);
  });
});
