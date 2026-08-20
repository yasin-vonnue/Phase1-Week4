import { describe, expect, it, vi } from "vitest";
import { retryFetch } from "../js/retryFetch.js";

describe("retryFetch", () => {
  it("should retry when the first attempt fails and the second succeeds", async () => {
    const fetchFunction = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("First attempt failed");
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          data: "Success",
        });
      });

    const result = await retryFetch(fetchFunction);

    expect(result).toEqual({
      ok: true,
      data: "Success",
    });

    expect(fetchFunction).toHaveBeenCalledTimes(2);
  });
});
