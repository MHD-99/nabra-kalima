import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock Resend to capture sent email parameters
const mockSend = vi.fn().mockResolvedValue({ id: "test-email-id" });
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("registration.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_placeholder";
  });

  it("submits registration with all required fields including age and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.submit({
      fullName: "محمد الشبيلي",
      phone: "0536946260",
      email: "test@example.com",
      age: 28,
      city: "أبها",
      interest: "برامج تدريبية للكبار",
      message: "أريد الانضمام للبرنامج",
    });

    expect(result).toEqual({ success: true });
  });

  it("sends email with correct from, to, subject, and includes age", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.registration.submit({
      fullName: "سارة أحمد",
      phone: "0501234567",
      email: "sara@example.com",
      age: 22,
      city: "الرياض",
      interest: "استشارات تطويرية وشخصية",
    });

    expect(mockSend).toHaveBeenCalledOnce();
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.from).toBe("نبرة <info@nabra-sa.com>");
    expect(callArgs.to).toEqual(["hmoody0990@gmail.com"]);
    expect(callArgs.subject).toBe("تسجيل جديد - نبرة");
    expect(callArgs.html).toContain("22");
    expect(callArgs.text).toContain("22 سنة");
  });

  it("submits registration without optional message field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.submit({
      fullName: "سارة أحمد",
      phone: "0501234567",
      email: "sara@example.com",
      age: 35,
      city: "الرياض",
      interest: "استشارات تطويرية وشخصية",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with age below minimum (4)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.submit({
        fullName: "محمد",
        phone: "0536946260",
        email: "test@example.com",
        age: 4,
        city: "أبها",
        interest: "برامج تدريبية للكبار",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with age above maximum (101)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.submit({
        fullName: "محمد",
        phone: "0536946260",
        email: "test@example.com",
        age: 101,
        city: "أبها",
        interest: "برامج تدريبية للكبار",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.submit({
        fullName: "محمد",
        phone: "0536946260",
        email: "invalid-email",
        age: 25,
        city: "أبها",
        interest: "برامج تدريبية للكبار",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with short name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.submit({
        fullName: "م",
        phone: "0536946260",
        email: "test@example.com",
        age: 25,
        city: "أبها",
        interest: "برامج تدريبية للكبار",
      })
    ).rejects.toThrow();
  });
});
