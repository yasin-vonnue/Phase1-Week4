import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchJSON } from "../js/fetchJSON.js";
import { HttpError } from "../js/HttpError.js";

describe("fetchJSON async behaviour", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should resolve with data on a successful response", async () => {
    const mockData = {
      id: 1,
      name: "Arthur",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const data = await fetchJSON("/users/1");

    expect(data).toEqual(mockData);
  });

  it("should reject with HttpError on a non-200 response", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    });

    try {
      await fetchJSON("/users/999");
      throw new Error("Expected fetchJSON to reject");
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(404);
    }
  });
});
