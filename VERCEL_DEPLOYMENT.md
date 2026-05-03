# نشر نبرة كلمة على Vercel

دليل شامل لنشر مشروع نبرة كلمة على منصة Vercel.

---

## المتطلبات الأساسية

- حساب GitHub
- حساب Vercel (يمكن الربط مع GitHub مباشرة)
- مستودع GitHub للمشروع

---

## الخطوة 1: إعداد مستودع GitHub

### 1.1 إنشاء مستودع جديد

```bash
# في جهازك المحلي أو عبر GitHub
# اسم المستودع: nabra-kalima
# الخصوصية: Private (اختياري)
```

### 1.2 دفع الكود إلى GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/nabra-kalima.git
git branch -M main
git push -u origin main
```

---

## الخطوة 2: ربط Vercel مع GitHub

### 2.1 الدخول إلى Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **Sign Up** أو **Log In**
3. اختر **GitHub** للدخول/التسجيل

### 2.2 استيراد المشروع

1. اضغط **Add New** → **Project**
2. اختر **Import Git Repository**
3. ابحث عن `nabra-kalima` واختره
4. اضغط **Import**

---

## الخطوة 3: إعدادات البناء والنشر

### 3.1 إعدادات المشروع

في صفحة الاستيراد، تأكد من:

| الحقل | القيمة |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `pnpm build` |
| **Output Directory** | `dist` |
| **Install Command** | `pnpm install` |

### 3.2 متغيرات البيئة (Environment Variables)

اضغط **Environment Variables** وأضف جميع المتغيرات التالية:

```
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
VITE_APP_ID=<your-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_NAME=نبرة كلمة
OWNER_OPEN_ID=<your-open-id>
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=<your-forge-api-key>
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
VITE_FRONTEND_FORGE_API_KEY=<your-frontend-forge-api-key>
RESEND_API_KEY=<your-resend-api-key>
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=<your-website-id>
VITE_APP_TITLE=نبرة كلمة
VITE_APP_LOGO=<your-logo-url>
NODE_ENV=production
```

---

## الخطوة 4: النشر

### 4.1 النشر الأول

1. بعد تعيين جميع المتغيرات، اضغط **Deploy**
2. انتظر حتى ينتهي البناء (عادة 3-5 دقائق)
3. ستحصل على رابط Vercel مؤقت

### 4.2 ربط النطاق المخصص

1. اذهب إلى **Settings** → **Domains**
2. أضف نطاقك `nabra-sa.com`
3. اتبع التعليمات لتحديث DNS
4. تحقق من الربط (قد يستغرق 24 ساعة)

---

## الخطوة 5: الصيانة والتحديثات

### 5.1 النشر التلقائي

Vercel ينشر تلقائياً عند:
- دفع تحديثات إلى فرع `main`
- إنشاء Pull Request (نشر معاين)

### 5.2 المراقبة

في لوحة التحكم:
- **Deployments**: تاريخ جميع النشرات
- **Analytics**: عدد الزيارات والأداء
- **Logs**: سجلات الأخطاء والتحذيرات

---

## استكشاف الأخطاء

### خطأ: "Build failed"

1. تحقق من السجلات (Logs)
2. تأكد من جميع المتغيرات البيئية
3. جرب البناء محلياً: `pnpm build`

### خطأ: "Database connection failed"

1. تحقق من `DATABASE_URL` صحيح
2. تأكد من أن قاعدة البيانات متاحة من Vercel
3. أضف عنوان IP الخاص بـ Vercel إلى قائمة الوصول

### خطأ: "Email not sending"

1. تحقق من `RESEND_API_KEY` صحيح
2. تأكد من أن البريد المرسل مسجل في Resend
3. راجع سجلات Resend للتفاصيل

---

## نصائح الأداء

1. **استخدم CDN** — Vercel يستخدم CDN عالمي تلقائياً
2. **تحسين الصور** — استخدم WebP وتحسين الحجم
3. **Caching** — استخدم رؤوس Cache-Control
4. **Database** — استخدم اتصال Pool بدلاً من الاتصال المباشر

---

## الدعم والموارد

- [وثائق Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [GitHub Actions](https://github.com/features/actions)

---

**ملاحظة:** تأكد من أن جميع المتغيرات البيئية محفوظة بأمان ولا تُشارك علناً.
