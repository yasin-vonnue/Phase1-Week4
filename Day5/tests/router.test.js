import { describe, expect, test, beforeEach } from "vitest";

import { register, navigate, initRouter } from "../src/router.js";

describe("Router", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';

    const store = {
      state: {
        route: {
          path: "/home",
          params: {},
        },
      },

      getState() {
        return this.state;
      },

      dispatch(action) {
        this.state = {
          ...this.state,
          route: action.payload,
        };
      },

      subscribe() {
        return () => {};
      },
    };

    const app = document.querySelector("#app");

    initRouter({
      root: app,
      stateStore: store,
    });
  });

  test("navigates to a registered route and renders its component", () => {
    const homeComponent = () => {
      const element = document.createElement("div");

      element.textContent = "Home Page";

      return element;
    };

    register("/home", homeComponent);

    navigate("/home");

    const app = document.querySelector("#app");

    expect(app.textContent).toContain("Home Page");
  });

  test("updates the URL when navigating", () => {
    const listComponent = () => {
      const element = document.createElement("div");

      element.textContent = "List Page";

      return element;
    };

    register("/list", listComponent);

    navigate("/list");

    expect(window.location.pathname).toBe("/list");
  });

  test("extracts dynamic route parameters", () => {
    const detailComponent = (params) => {
      const element = document.createElement("div");

      element.textContent = `Task ${params.id}`;

      return element;
    };

    register("/detail/:id", detailComponent);

    navigate("/detail/42");

    const app = document.querySelector("#app");

    expect(app.textContent).toContain("Task 42");

    expect(window.location.pathname).toBe("/detail/42");
  });
});
