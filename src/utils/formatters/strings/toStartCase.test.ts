import { describe, expect, it } from "vitest";

import { toStartCase } from "./toStartCase";

describe("toStartCase", () => {
  it("converts underscore_case to Start Case", () => {
    expect(toStartCase("hello_world")).toBe("Hello World");
    expect(toStartCase("multiple_word_string")).toBe("Multiple Word String");
    expect(toStartCase("with_numbers_123")).toBe("With Numbers 123");
  });

  it("converts camelCase to Start Case", () => {
    expect(toStartCase("helloWorld")).toBe("Hello World");
    expect(toStartCase("multipleWordString")).toBe("Multiple Word String");
    expect(toStartCase("withNumbers123")).toBe("With Numbers123");
  });

  it("handles already capitalized words", () => {
    expect(toStartCase("Hello World")).toBe("Hello World");
    expect(toStartCase("HELLO WORLD")).toBe("HELLO WORLD");
  });

  it("capitalizes first letter of each word", () => {
    expect(toStartCase("hello world")).toBe("Hello World");
    expect(toStartCase("a small sentence")).toBe("A Small Sentence");
  });

  it("handles empty string", () => {
    expect(toStartCase("")).toBe("");
  });

  it("handles single word", () => {
    expect(toStartCase("hello")).toBe("Hello");
    expect(toStartCase("a")).toBe("A");
  });

  it("handles mixed formats", () => {
    expect(toStartCase("hello_camelCased-string")).toBe(
      "Hello Camel Cased-string",
    );
    expect(toStartCase("mixed_case-with SPACES")).toBe(
      "Mixed Case-with SPACES",
    );
  });
});
