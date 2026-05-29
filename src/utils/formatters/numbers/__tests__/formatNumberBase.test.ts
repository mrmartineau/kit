import { describe, expect, it } from "vitest";

import { formatNumberBase } from "../formatNumberBase.js";

describe("formatNumberBase", () => {
  it("should throw if no value provided", () => {
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberBase()).toThrowError(
      "formatNumber: Value is not defined",
    );
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberBase(undefined)).toThrowError(
      "formatNumber: Value is not defined",
    ); // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberBase(null)).toThrowError(
      "formatNumber: Value is not defined",
    );
  });

  it("should throw if value is invalid", () => {
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberBase(false)).toThrowError(
      "formatNumber: Invalid number format",
    );
    // @ts-expect-error - Testing for invalid input
    expect(() => formatNumberBase([false])).toThrowError(
      "formatNumber: Invalid number format",
    );
  });

  it("should throw if string passed is invalid", () => {
    expect(() => formatNumberBase("-")).toThrowError(
      "formatNumber: Invalid number format",
    );
  });

  it("should used the Intl.NumberFormat defaults and format a number to the default number of decimal places (3) when no options are passed", () => {
    expect(formatNumberBase(123456.789456456)).toBe("123,456.789");
    expect(formatNumberBase(0.0)).toBe("0");
  });

  it("should used the Intl.NumberFormat defaults and format a number to the default number of decimal places (3) when an empty options object is passed", () => {
    expect(formatNumberBase(123456.789456456, {})).toBe("123,456.789");
    expect(formatNumberBase(0, {})).toBe("0");
  });

  it("should format a number to 0 decimal places", () => {
    expect(
      formatNumberBase(123456.789, {
        maximumFractionDigits: 0,
      }),
    ).toBe("123,457");
    expect(
      formatNumberBase(0, {
        maximumFractionDigits: 0,
      }),
    ).toBe("0");
  });

  it("should format a number based on the options passed", () => {
    expect(
      formatNumberBase(123456.789, {
        style: "currency",
        currency: "EUR",
      }),
    ).toBe("€123,456.79");
  });
});
