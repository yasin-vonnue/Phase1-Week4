import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Accordion", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="accordion-btn" aria-expanded="false">
        Question 1
      </button>

      <div class="content" hidden>Answer 1</div>

      <button class="accordion-btn" aria-expanded="false">
        Question 2
      </button>

      <div class="content" hidden>Answer 2</div>
    `;

    sessionStorage.clear();
    vi.resetModules();
  });

  it("should open and close a panel", async () => {
    await import("../js/accordion.js");

    const buttons = document.querySelectorAll(".accordion-btn");
    const panels = document.querySelectorAll(".content");

    buttons[0].click();

    expect(buttons[0].getAttribute("aria-expanded")).toBe("true");
    expect(panels[0].hidden).toBe(false);
    expect(panels[0].classList.contains("open")).toBe(true);

    buttons[0].click();

    expect(buttons[0].getAttribute("aria-expanded")).toBe("false");
    expect(panels[0].hidden).toBe(true);
  });

  it("should close the previous panel when another opens", async () => {
    await import("../js/accordion.js");

    const buttons = document.querySelectorAll(".accordion-btn");
    const panels = document.querySelectorAll(".content");

    buttons[0].click();
    buttons[1].click();

    expect(buttons[0].getAttribute("aria-expanded")).toBe("false");
    expect(buttons[1].getAttribute("aria-expanded")).toBe("true");

    expect(panels[0].hidden).toBe(true);
    expect(panels[1].hidden).toBe(false);
  });

  it("should support keyboard navigation", async () => {
    await import("../js/accordion.js");

    const buttons = document.querySelectorAll(".accordion-btn");

    buttons[0].focus();

    buttons[0].dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown" }),
    );
    expect(document.activeElement).toBe(buttons[1]);

    buttons[1].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    expect(document.activeElement).toBe(buttons[0]);

    buttons[0].dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    expect(document.activeElement).toBe(buttons[1]);

    buttons[1].dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("should toggle with Enter and restore saved panel", async () => {
    sessionStorage.setItem("openAccordion", "1");

    await import("../js/accordion.js");

    const buttons = document.querySelectorAll(".accordion-btn");
    const panels = document.querySelectorAll(".content");

    expect(buttons[1].getAttribute("aria-expanded")).toBe("true");
    expect(panels[1].hidden).toBe(false);

    buttons[0].dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(buttons[0].getAttribute("aria-expanded")).toBe("true");
  });
});
