import { describe, expect, test, vi } from "vitest";

import { createStore } from "../src/state/store.js";

describe("createStore", () => {
  test("returns the initial state", () => {
    const initialState = {
      count: 0,
    };

    function reducer(state, action) {
      return state;
    }

    const store = createStore(initialState, reducer);

    expect(store.getState()).toEqual({
      count: 0,
    });
  });

  test("dispatch updates the state", () => {
    const initialState = {
      count: 0,
    };

    function reducer(state, action) {
      if (action.type === "INCREMENT") {
        return {
          ...state,
          count: state.count + 1,
        };
      }

      return state;
    }

    const store = createStore(initialState, reducer);

    store.dispatch({
      type: "INCREMENT",
    });

    expect(store.getState().count).toBe(1);
  });

  test("subscriber is notified after dispatch", () => {
    const initialState = {
      count: 0,
    };

    function reducer(state, action) {
      if (action.type === "INCREMENT") {
        return {
          ...state,
          count: state.count + 1,
        };
      }

      return state;
    }

    const store = createStore(initialState, reducer);

    const listener = vi.fn();

    store.subscribe(listener);

    store.dispatch({
      type: "INCREMENT",
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("unsubscribe stops notifications", () => {
    const initialState = {
      count: 0,
    };

    function reducer(state, action) {
      if (action.type === "INCREMENT") {
        return {
          ...state,
          count: state.count + 1,
        };
      }

      return state;
    }

    const store = createStore(initialState, reducer);

    const listener = vi.fn();

    const unsubscribe = store.subscribe(listener);

    unsubscribe();

    store.dispatch({
      type: "INCREMENT",
    });

    expect(listener).not.toHaveBeenCalled();
  });
});
