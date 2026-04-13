import { describe, it, expect } from "vitest";
import { Resend } from "resend";

describe("Resend Email Integration", () => {
  it("should have RESEND_API_KEY set in environment", () => {
    const key = process.env.RESEND_API_KEY;
    expect(key).toBeDefined();
    expect(key).not.toBe("");
    expect(key?.startsWith("re_")).toBe(true);
  });

  it("should initialize Resend client without error", () => {
    const key = process.env.RESEND_API_KEY ?? "re_test_placeholder";
    expect(() => new Resend(key)).not.toThrow();
  });
});
