import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Mobile Navigation", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="menu-btn" aria-expanded="false">
        Menu
      </button>

      <div id="overlay"></div>

      <nav id="drawer">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    `;

    vi.resetModules();
  });

  it("should open the drawer and focus the first link", async () => {
    await import("../js/nav.js");

    const menuButton = document.querySelector("#menu-btn");
    const drawer = document.querySelector("#drawer");
    const firstLink = drawer.querySelector("a");

    menuButton.click();

    expect(drawer.classList.contains("open")).toBe(true);
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(firstLink);
  });

  it("should trap focus from the last link to the first link", async () => {
    await import("../js/nav.js");

    const menuButton = document.querySelector("#menu-btn");
    const drawer = document.querySelector("#drawer");
    const links = drawer.querySelectorAll("a");

    menuButton.click();

    const firstLink = links[0];
    const lastLink = links[links.length - 1];

    lastLink.focus();

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
      }),
    );

    expect(document.activeElement).toBe(firstLink);
  });

  it("should trap reverse focus from the first link to the last link", async () => {
    await import("../js/nav.js");

    const menuButton = document.querySelector("#menu-btn");
    const drawer = document.querySelector("#drawer");
    const links = drawer.querySelectorAll("a");

    menuButton.click();

    const firstLink = links[0];
    const lastLink = links[links.length - 1];

    firstLink.focus();

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        shiftKey: true,
        bubbles: true,
      }),
    );

    expect(document.activeElement).toBe(lastLink);
  });
});
