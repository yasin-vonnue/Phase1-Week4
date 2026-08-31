import { describe, expect, test, beforeEach } from "vitest";

import { renderHomePage } from "../src/pages/Home.js";

describe("Home Page", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders the home page", () => {
    const page = renderHomePage();

    document.body.append(page);

    expect(page.tagName).toBe("SECTION");
    expect(page.className).toBe("page");
  });

  test("renders the heading and welcome message", () => {
    const page = renderHomePage();

    document.body.append(page);

    expect(page.querySelector("h1").textContent).toBe("Home");

    expect(page.querySelector("p").textContent).toBe(
      "Welcome to the Task Manager.",
    );
  });
});
