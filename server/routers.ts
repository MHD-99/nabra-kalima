import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { z } from "zod";
import { Resend } from "resend";

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

  // Registration form submission — sends email to info@nabra-sa.com + owner notification
  registration: router({
    submit: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(2, "الاسم مطلوب"),
          phone: z.string().min(9, "رقم الجوال مطلوب"),
          email: z.string().email("البريد الإلكتروني غير صحيح"),
          age: z.coerce.number().min(5, "الحد الأدنى للعمر 5 سنوات").max(100, "الحد الأقصى للعمر 100 سنة"),
          city: z.string().min(1, "المدينة مطلوبة"),
          interest: z.string().min(1, "نوع الاهتمام مطلوب"),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const arabicDate = new Date().toLocaleString("ar-SA", {
          timeZone: "Asia/Riyadh",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; direction: rtl; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1B503E, #67AE6E); padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 36px 40px; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px; }
    .field:last-child { border-bottom: none; }
    .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .value { font-size: 16px; color: #222; font-weight: 500; }
    .message-box { background: #f8f9fa; border-right: 4px solid #67AE6E; padding: 16px 20px; border-radius: 4px; font-size: 15px; color: #444; line-height: 1.7; }
    .footer { background: #1B503E; padding: 20px 40px; text-align: center; }
    .footer p { color: rgba(255,255,255,0.6); margin: 0; font-size: 12px; }
    .badge { display: inline-block; background: rgba(109,194,183,0.15); color: #6DC2B7; border: 1px solid rgba(109,194,183,0.3); padding: 4px 14px; border-radius: 50px; font-size: 13px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 طلب تسجيل جديد</h1>
      <p>نبرة كلمة — أكاديمية صناعة المتحدثين المؤثرين</p>
      <div class="badge">${arabicDate}</div>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">الاسم الكامل</div>
        <div class="value">👤 ${input.fullName}</div>
      </div>
      <div class="field">
        <div class="label">رقم الجوال</div>
        <div class="value">📱 ${input.phone}</div>
      </div>
      <div class="field">
        <div class="label">البريد الإلكتروني</div>
        <div class="value">📧 ${input.email}</div>
      </div>
      <div class="field">
        <div class="label">العمر</div>
        <div class="value">👤 ${input.age} سنة</div>
      </div>
      <div class="field">
        <div class="label">المدينة</div>
        <div class="value">🏙️ ${input.city}</div>
      </div>
      <div class="field">
        <div class="label">نوع الاهتمام</div>
        <div class="value">🎯 ${input.interest}</div>
      </div>
      ${input.message ? `
      <div class="field">
        <div class="label">رسالة المتقدم</div>
        <div class="message-box">💬 ${input.message}</div>
      </div>
      ` : ""}
    </div>
    <div class="footer">
      <p>هذا الإيميل مُرسَل تلقائياً من موقع نبرة كلمة</p>
      <p style="margin-top: 6px;">nabra-sa.com</p>
    </div>
  </div>
</body>
</html>
        `.trim();

        const textContent = `
طلب تسجيل جديد من موقع نبرة كلمة

الاسم: ${input.fullName}
الجوال: ${input.phone}
البريد: ${input.email}
العمر: ${input.age} سنة
المدينة: ${input.city}
نوع الاهتمام: ${input.interest}
${input.message ? `الرسالة: ${input.message}` : ""}

وقت الطلب: ${arabicDate}
        `.trim();

        // Send email via Resend if API key is available
        if (ENV.resendApiKey) {
          try {
            const resend = new Resend(ENV.resendApiKey);
            await resend.emails.send({
              from: "نبرة <info@nabra-sa.com>",
              to: ["hmoody0990@gmail.com"],
              subject: "تسجيل جديد - نبرة",
              html: htmlContent,
              text: textContent,
            });
          } catch (emailError) {
            console.error("[Resend] Failed to send email:", emailError);
            // Don't throw — still notify owner even if email fails
          }
        }

        // Also send owner notification as backup
        await notifyOwner({
          title: `📝 تسجيل جديد — ${input.fullName} (${input.city})`,
          content: textContent,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
