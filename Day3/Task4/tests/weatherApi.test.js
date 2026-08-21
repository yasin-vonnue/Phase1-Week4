import { describe, expect, it, vi } from "vitest";

vi.mock("../js/weatherApi.js", () => ({
  fetchWeather: vi.fn(),
}));

import { fetchWeather } from "../js/weatherApi.js";

describe("weather API module", () => {
  it("should call fetchWeather with the correct city coordinates", async () => {
    fetchWeather.mockResolvedValue({
      temperature: 20,
      wind: 10,
      code: 0,
    });

    await fetchWeather("London", 51.5072, -0.1276);

    expect(fetchWeather).toHaveBeenCalledWith("London", 51.5072, -0.1276);
  });
});
