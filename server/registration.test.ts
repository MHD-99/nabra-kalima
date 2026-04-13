import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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
  });

  it("submits registration with all required fields and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.submit({
      fullName: "محمد الشبيلي",
      phone: "0536946260",
      email: "test@example.com",
      city: "أبها",
      interest: "برامج تدريبية للكبار",
      message: "أريد الانضمام للبرنامج",
    });

    expect(result).toEqual({ success: true });
  });

  it("submits registration without optional message field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.submit({
      fullName: "سارة أحمد",
      phone: "0501234567",
      email: "sara@example.com",
      city: "الرياض",
      interest: "استشارات تطويرية وشخصية",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.submit({
        fullName: "محمد",
        phone: "0536946260",
        email: "invalid-email",
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
        city: "أبها",
        interest: "برامج تدريبية للكبار",
      })
    ).rejects.toThrow();
  });
});
