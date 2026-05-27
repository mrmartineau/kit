import { describe, expect, it } from "vitest";

import { formatNumberDecimal } from "../formatNumberDecimal.js";

describe("formatNumberDecimal", () => {
  it("should throw if no value provided", () => {
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberDecimal()).toThrowError(
      "formatNumber: Value is not defined",
    );
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberDecimal(undefined)).toThrowError(
      "formatNumber: Value is not defined",
    );
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberDecimal(null)).toThrowError(
      "formatNumber: Value is not defined",
    );
  });

  it("should throw if value is invalid", () => {
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberDecimal(false)).toThrowError(
      "formatNumber: Invalid number format",
    );
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberDecimal([false])).toThrowError(
      "formatNumber: Invalid number format",
    );
  });

  it("should throw if string passed is invalid", () => {
    expect(() => formatNumberDecimal("-")).toThrowError(
      "formatNumber: Invalid number format",
    );
  });

  it("should format a number to the default number of decimal places (2)", () => {
    expect(formatNumberDecimal(123456.789)).toBe("123,456.79");
    expect(formatNumberDecimal(0)).toBe("0");
  });

  it("should format a number to 0 decimal places", () => {
    expect(formatNumberDecimal(123456.789, 0)).toBe("123,457");
    expect(formatNumberDecimal(0, 0)).toBe("0");
  });

  it("should format a number to 1 decimal place", () => {
    expect(formatNumberDecimal(123456.789, 1)).toBe("123,456.8");
  });

  it("should format a number to 2 decimal places", () => {
    expect(formatNumberDecimal(123456.789, 2)).toBe("123,456.79");
    expect(formatNumberDecimal(0.1, 2)).toBe("0.1");
  });

  it("should format a number to 3 decimal places", () => {
    expect(formatNumberDecimal(123456.789, 3)).toBe("123,456.789");
  });

  it("should format a number to 4 decimal places", () => {
    expect(formatNumberDecimal(123456.789, 4)).toBe("123,456.789");
  });

  it("should format non-standard numbers", () => {
    expect(formatNumberDecimal(6.938893903907228e-18, 2)).toBe("0");
  });

  it("should format with custom number format options", () => {
    expect(
      formatNumberDecimal(1.789, 3, {
        maximumFractionDigits: 1, // this will override the decimalCount parameter
      }),
    ).toBe("1.8");
  });
});
