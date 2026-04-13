import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Registration form submission — sends notification to owner
  registration: router({
    submit: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(2, "الاسم مطلوب"),
          phone: z.string().min(9, "رقم الجوال مطلوب"),
          email: z.string().email("البريد الإلكتروني غير صحيح"),
          city: z.string().min(1, "المدينة مطلوبة"),
          interest: z.string().min(1, "نوع الاهتمام مطلوب"),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const content = `
📋 طلب تسجيل جديد من موقع نبرة كلمة

👤 الاسم: ${input.fullName}
📱 الجوال: ${input.phone}
📧 البريد: ${input.email}
🏙️ المدينة: ${input.city}
🎯 نوع الاهتمام: ${input.interest}
${input.message ? `💬 الرسالة: ${input.message}` : ""}

⏰ وقت الطلب: ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}
        `.trim();

        await notifyOwner({
          title: `📝 تسجيل جديد — ${input.fullName} (${input.city})`,
          content,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
