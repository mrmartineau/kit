import { describe, expect, it } from "vitest";

import { formatNumberDecimalForceDecimalPlaces } from "../formatNumberDecimalForceDecimalPlaces.js";

describe("formattedNumberDecimalForceDecimalPlaces", () => {
  it("should format a number to 1 decimal place", () => {
    expect(formatNumberDecimalForceDecimalPlaces(123456.789, 1)).toBe(
      "123,456.8",
    );
  });

  it("should format a number to 2 decimal places", () => {
    expect(formatNumberDecimalForceDecimalPlaces(123456.789, 2)).toBe(
      "123,456.79",
    );
    expect(formatNumberDecimalForceDecimalPlaces(0.1, 2)).toBe("0.10");
  });

  it("should format a number to 3 decimal places", () => {
    expect(formatNumberDecimalForceDecimalPlaces(123456.789, 3)).toBe(
      "123,456.789",
    );
  });

  it("should format a number to 4 decimal places", () => {
    expect(formatNumberDecimalForceDecimalPlaces(123456.789, 4)).toBe(
      "123,456.7890",
    );
  });

  it("should format non-standard numbers", () => {
    expect(
      formatNumberDecimalForceDecimalPlaces(6.938893903907228e-18, 2),
    ).toBe("0.00");
  });

  it("should format with custom number format options", () => {
    expect(formatNumberDecimalForceDecimalPlaces(1.789, 3)).toBe("1.789");
  });
});
