import { describe, expect, it, vi } from "vitest";
import { memoize } from "../js/memoize.js";

describe("memoize", () => {
  it("should call the wrapped function once for repeated input", () => {
    const fn = vi.fn((value) => value * 2);
    const memoizedFn = memoize(fn);

    const firstResult = memoizedFn(5);
    const secondResult = memoizedFn(5);

    expect(firstResult).toBe(10);
    expect(secondResult).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should call the wrapped function twice for two different inputs", () => {
    const fn = vi.fn((value) => value * 2);
    const memoizedFn = memoize(fn);

    const firstResult = memoizedFn(5);
    const secondResult = memoizedFn(10);

    expect(firstResult).toBe(10);
    expect(secondResult).toBe(20);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
