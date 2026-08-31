import { describe, expect, test, beforeEach, vi } from "vitest";

import { renderListPage } from "../src/pages/List.js";

describe("List Page", () => {
  let store;

  beforeEach(() => {
    document.body.innerHTML = "";

    store = {
      getState: vi.fn(() => ({
        tasks: [
          {
            id: "1",
            title: "Learn JavaScript",
            description: "Practice DOM manipulation and modules.",
            completed: false,
          },
        ],
      })),
      dispatch: vi.fn(),
      subscribe: vi.fn(() => vi.fn()),
    };
  });

  test("renders the task list page", () => {
    const page = renderListPage({}, store);

    document.body.append(page);

    expect(page.tagName).toBe("SECTION");
    expect(page.className).toBe("page");

    expect(page.querySelector("h1").textContent).toBe("Task List");
  });

  test("renders the task form", () => {
    const page = renderListPage({}, store);

    document.body.append(page);

    const form = page.querySelector("form");
    const input = page.querySelector('input[name="title"]');
    const button = page.querySelector('button[type="submit"]');

    expect(form).not.toBeNull();
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe("Enter task title");
    expect(input.required).toBe(true);
    expect(button.textContent).toBe("Add Task");
  });

  test("renders the task card and actions", () => {
    const page = renderListPage({}, store);

    document.body.append(page);

    expect(page.textContent).toContain("Learn JavaScript");
    expect(page.textContent).toContain(
      "Practice DOM manipulation and modules.",
    );

    expect(page.textContent).toContain("Completed");
    expect(page.textContent).toContain("View");
    expect(page.textContent).toContain("Edit");
    expect(page.textContent).toContain("Delete");
  });

  test("dispatches ADD_TASK when a valid task is submitted", () => {
    const page = renderListPage({}, store);

    document.body.append(page);

    const input = page.querySelector('input[name="title"]');
    const form = page.querySelector("form");

    input.value = "Test Task";

    form.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "ADD_TASK",
      payload: expect.objectContaining({
        title: "Test Task",
        description: "Added from task form",
        completed: false,
      }),
    });

    expect(input.value).toBe("");
  });
});
