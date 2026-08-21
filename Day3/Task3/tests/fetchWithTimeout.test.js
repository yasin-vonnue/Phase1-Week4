import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithTimeout } from "../js/fetchWithTimeout.js";

describe("fetchWithTimeout", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should abort the request after the configured timeout", async () => {
    vi.useFakeTimers();

    let receivedSignal;

    vi.spyOn(global, "fetch").mockImplementation((_url, options) => {
      receivedSignal = options.signal;

      return new Promise(() => {});
    });

    fetchWithTimeout("/slow-request", 5000);

    expect(receivedSignal.aborted).toBe(false);

    vi.advanceTimersByTime(4999);

    expect(receivedSignal.aborted).toBe(false);

    vi.advanceTimersByTime(1);

    expect(receivedSignal.aborted).toBe(true);
  });
});
