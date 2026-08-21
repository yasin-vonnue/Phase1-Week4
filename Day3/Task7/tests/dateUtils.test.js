import { describe, expect, it } from "vitest";
import { formatDate } from "../js/dateUtils.js";

describe("formatDate", () => {
  it("should format date as DD/MM/YYYY", () => {
    expect(formatDate(new Date(2026, 7, 21), "DD/MM/YYYY")).toBe("21/08/2026");
  });

  it("should format date as YYYY-MM-DD", () => {
    expect(formatDate(new Date(2026, 7, 21), "YYYY-MM-DD")).toBe("2026-08-21");
  });

  it("should format date as Month DD, YYYY", () => {
    expect(formatDate(new Date(2026, 7, 21), "Month DD, YYYY")).toBe(
      "August 21, 2026",
    );
  });

  it("should calculate relative days", () => {
    const now = new Date();
    const date = new Date(now);
    date.setDate(now.getDate() - 3);

    expect(formatDate(date, "relative")).toBe("3 days ago");
  });

  it("should handle one day ago", () => {
    const now = new Date();
    const date = new Date(now);
    date.setDate(now.getDate() - 1);

    expect(formatDate(date, "relative")).toBe("1 day ago");
  });

  it("should handle leap day", () => {
    expect(formatDate(new Date(2024, 1, 29), "DD/MM/YYYY")).toBe("29/02/2024");
  });

  it("should handle December 31", () => {
    expect(formatDate(new Date(2026, 11, 31), "YYYY-MM-DD")).toBe("2026-12-31");
  });

  it("should reject an invalid date", () => {
    expect(() => formatDate(new Date("invalid"), "DD/MM/YYYY")).toThrow(
      "Invalid date",
    );
  });
});
