import { describe, expect, it } from "vitest";

import { formatNumberCurrency } from "../formatNumberCurrency.js";

describe("formatNumberCurrency", () => {
  it("should format a number to GBP currency", () => {
    expect(formatNumberCurrency(1.789, "GBP")).toBe("£1.79");
    expect(formatNumberCurrency(12.789, "GBP")).toBe("£12.79");
    expect(formatNumberCurrency(123.789, "GBP")).toBe("£123.79");
  });

  it("should format a number to USD currency", () => {
    expect(formatNumberCurrency(1.789, "USD")).toBe("$1.79");
    expect(formatNumberCurrency(12.789, "USD")).toBe("$12.79");
    expect(formatNumberCurrency(123.789, "USD")).toBe("$123.79");
  });

  it("should format a number to USD currency with specific number of decimal places", () => {
    expect(formatNumberCurrency(1.789, "USD", 1)).toBe("$1.8");
    expect(formatNumberCurrency(12.789, "USD", 2)).toBe("$12.79");
    expect(formatNumberCurrency(123.789, "USD", 5)).toBe("$123.789");
  });

  it("should format a number to GBP currency with custom number format options", () => {
    expect(
      formatNumberCurrency(1.789, "GBP", undefined, {
        maximumFractionDigits: 1,
      }),
    ).toBe("£1.8");
    expect(
      formatNumberCurrency(12.789, "GBP", undefined, {
        maximumFractionDigits: 1,
      }),
    ).toBe("£12.8");
    expect(
      formatNumberCurrency(123.789, "GBP", undefined, {
        maximumFractionDigits: 1,
      }),
    ).toBe("£123.8");
  });

  it("should throw if passing an invalid value", () => {
    expect(() => formatNumberCurrency("-", "GBP")).toThrowError(
      "formatNumber: Invalid number format",
    );
  });

  it("should throw if passing an invalid currency code", () => {
    expect(() => formatNumberCurrency(1.789, "DARE")).toThrowError(
      "Invalid currency code : DARE",
    );
  });

  it("should throw if missing a currency code", () => {
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberCurrency(1.789)).toThrowError(
      "Currency code is required with currency style.",
    );
  });
});
