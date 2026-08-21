import { describe, expect, it, vi, afterEach } from "vitest";

import { fetchJSON } from "../js/fetchJSON";

describe("fetchJSON", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return parsed JSON on success", async () => {
    const mockData = {
      id: 1,
      name: "Arthur",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await fetchJSON("https://example.com/users/1");

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith("https://example.com/users/1");
  });

  it("should throw an error when response.ok is false", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchJSON("https://example.com/users/999")).rejects.toThrow(
      "HTTP error: 404",
    );
  });

  it("should throw when fetch fails due to a network error", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network failure"));

    await expect(fetchJSON("https://example.com/users")).rejects.toThrow(
      "Network failure",
    );
  });
});
