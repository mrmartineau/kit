import { describe, expect, it } from "bun:test";

import { formatList } from "./formatList";

describe("formatList", () => {
  it("formats list with default options (long conjunction)", () => {
    const input = ["apple", "banana", "orange"];
    expect(formatList(input)).toBe("apple, banana, and orange");
  });

  it("formats list with disjunction type", () => {
    const input = ["apple", "banana", "orange"];
    expect(formatList(input, { type: "disjunction" })).toBe(
      "apple, banana, or orange",
    );
  });

  it("formats list with unit type", () => {
    const input = ["apple", "banana", "orange"];
    expect(formatList(input, { type: "unit" })).toBe("apple, banana, orange");
  });

  it("formats list with short style", () => {
    const input = ["apple", "banana", "orange"];
    expect(formatList(input, { style: "short", type: "conjunction" })).toBe(
      "apple, banana, & orange",
    );
  });

  it("formats list with narrow style", () => {
    const input = ["apple", "banana", "orange"];
    expect(formatList(input, { style: "narrow", type: "conjunction" })).toBe(
      "apple, banana, orange",
    );
  });

  it("handles single item list", () => {
    const input = ["apple"];
    expect(formatList(input)).toBe("apple");
  });

  it("handles two item list", () => {
    const input = ["apple", "banana"];
    expect(formatList(input)).toBe("apple and banana");
  });

  it("handles empty list", () => {
    const input: string[] = [];
    expect(formatList(input)).toBe("");
  });
});
