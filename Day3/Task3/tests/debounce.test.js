import { afterEach, describe, expect, it, vi } from "vitest";

import { debounce } from "../js/debounce.js";

describe("debounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call the underlying function once after the delay", () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debouncedCallback = debounce(callback, 300);

    for (let i = 0; i < 10; i++) {
      debouncedCallback();
    }

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
