import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";

// Brand colors
const C = {
  darkBg: "#0F2B22",
  dark2: "#163A2D",
  dark3: "#1E4A38",
  greenDark: "#1B503E",
  greenMid: "#67AE6E",
  greenTeal: "#6DC2B7",
  white: "#FFFFFF",
};

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663245268173/4epBMqsQxCQ6Bj7qS23jEL/nabra-logo_5aeb3600.png";

// ── Logo ──────────────────────────────────────────────────
function LogoIcon({ size = 80 }: { size?: number; inverted?: boolean }) {
  return (
    <img src={LOGO_URL} alt="شعار نبرة كلمة" width={size} height={size} style={{ objectFit: "contain", display: "block", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }} />
  );
}

// ── Reveal hook ───────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Nav ───────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "من نحن" },
    { href: "#programs", label: "البرامج" },
    { href: "#testimonials", label: "قصص النجاح" },
    { href: "#comments", label: "التعليقات" },
  ];

  return (
    <>
      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: C.greenDark, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, left: 24, background: "none", border: "none", color: C.greenTeal, fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ color: C.white, textDecoration: "none", fontSize: "1.5rem", fontWeight: 500 }}>{l.label}</a>
          ))}
          <a href="#register" onClick={() => setMobileOpen(false)} style={{ background: C.greenMid, color: C.white, padding: "12px 32px", borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: "1.1rem" }}>سجّل الآن</a>
        </div>
      )}

      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        padding: "14px 5%", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(15,43,34,0.96)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "rgba(109,194,183,0.25)" : "rgba(109,194,183,0.15)"}`,
        transition: "all 0.3s", fontFamily: "'Tajawal', sans-serif",
      }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <LogoIcon size={80} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "1.35rem", fontWeight: 700, color: C.white }}>نبرة كلمة</span>
            <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "0.78rem", fontWeight: 400, color: C.greenTeal, letterSpacing: "0.5px" }}>Nabrat Kalima</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="hidden-mobile">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 400, fontFamily: "'Tajawal', sans-serif", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.greenTeal)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              >{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#register" style={{ background: C.greenMid, color: C.white, padding: "9px 22px", borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: "0.95rem", fontFamily: "'Tajawal', sans-serif", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.greenTeal; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.greenMid; }}
            >سجّل الآن</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(true)} className="show-mobile" style={{ background: "none", border: "none", display: "none", flexDirection: "column", gap: 5, cursor: "pointer" }}>
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 24, height: 2, background: C.greenTeal, borderRadius: 2 }} />)}
        </button>
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 5% 80px", background: C.darkBg }}>
      {/* Background elements */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(103,174,110,0.06) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(109,194,183,0.04) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(109,194,183,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(109,194,183,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }} />

      {/* Brand circles */}
      <svg style={{ position: "absolute", left: "3%", top: "50%", transform: "translateY(-50%)", width: 420, height: 420, opacity: 0.45, pointerEvents: "none" }} viewBox="0 0 420 420" fill="none">
        <circle cx="120" cy="210" r="160" fill="#6DC2B7" opacity="0.55" />
        <circle cx="210" cy="150" r="120" fill="#67AE6E" opacity="0.5" />
        <path d="M60 80 Q180 200 80 360" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M100 60 Q240 200 120 380" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" />
      </svg>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(109,194,183,0.1)", border: "1px solid rgba(109,194,183,0.3)", color: C.greenTeal, fontSize: "0.85rem", padding: "6px 16px", borderRadius: 50, marginBottom: 28, fontWeight: 500 }}>
          <span style={{ fontSize: "0.6rem" }}>◆</span> صناعة القادة المتحدثين المؤثرين
        </div>
        <h1 className="fade-up" style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.25, marginBottom: 10, color: C.white, animationDelay: "0.1s" }}>
          كل صوت<br /><span style={{ color: C.greenTeal }}>يستحق أن يُسمع</span>
        </h1>
        <p className="fade-up" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: 30, animationDelay: "0.2s" }}>
          حين تتكلم… يتوقف العالم ليسمعك
        </p>
        <p className="fade-up" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: 44, maxWidth: 560, animationDelay: "0.3s" }}>
          نبرة كلمة مشروع سعودي يطوّر مهارات القيادة والإلقاء والخطابة عبر برامج تدريبية تطبيقية، وينظم أمسيات ثقافية وفكرية تبرز أفكار ومواهب أبناء وبنات المنطقة.
        </p>
        <div className="fade-up" style={{ display: "flex", gap: 16, flexWrap: "wrap", animationDelay: "0.4s" }}>
          <BtnPrimary href="#register">ابدأ رحلتك الآن ←</BtnPrimary>
          <BtnSecondary href="#programs">اكتشف البرامج</BtnSecondary>
        </div>
        <div className="fade-up" style={{ display: "flex", gap: 40, marginTop: 60, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap", animationDelay: "0.5s" }}>
          {[["50+", "متحدث تم تطويره"], ["10+", "ورشة عمل منفّذة"], ["97%", "نسبة رضا المتدربين"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "2.2rem", fontWeight: 800, color: C.greenTeal, display: "block" }}>{num}</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", marginTop: 2, display: "block" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Button helpers ────────────────────────────────────────────
function BtnPrimary({ href, children, onClick, style: extraStyle }: { href?: string; children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  const s: React.CSSProperties = { background: C.greenMid, color: C.white, padding: "14px 32px", borderRadius: 6, fontSize: "1rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", fontFamily: "'Tajawal', sans-serif", transition: "all 0.3s", ...extraStyle };
  if (href) return <a href={href} style={s} onMouseEnter={e => { e.currentTarget.style.background = C.greenTeal; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = C.greenMid; e.currentTarget.style.transform = ""; }}>{children}</a>;
  return <button style={s} onClick={onClick} onMouseEnter={e => { e.currentTarget.style.background = C.greenTeal; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = C.greenMid; e.currentTarget.style.transform = ""; }}>{children}</button>;
}

function BtnSecondary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{ background: "transparent", color: C.white, padding: "14px 32px", borderRadius: 6, fontSize: "1rem", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Tajawal', sans-serif", transition: "all 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.greenTeal; e.currentTarget.style.color = C.greenTeal; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = C.white; }}
    >{children}</a>
  );
}

// ── Marquee ───────────────────────────────────────────────────
function Marquee() {
  const items = [
    "إلى زوار نبرة كلمة الأعزاء...",
    "بعض الأثر لا يُقال...",
    "بل يُشعر",
    "ونبرة كلمة...",
    "كان فيها من سجى... ما يكفي ليبقى",
    "إلى زوار نبرة كلمة الأعزاء...",
    "بعض الأثر لا يُقال...",
    "بل يُشعر",
    "ونبرة كلمة...",
    "كان فيها من سجى... ما يكفي ليبقى",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: C.greenMid, padding: "14px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div className="marquee-animate" style={{ display: "inline-flex", gap: 60 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ color: C.white, fontSize: "0.95rem", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 20, fontStyle: "italic", fontFamily: "'Tajawal', sans-serif" }}>
            {item}<span style={{ fontSize: "0.55rem", opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section helpers ───────────────────────────────────────────
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.greenTeal, fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, fontWeight: 600, fontFamily: "'Tajawal', sans-serif" }}>
      <span style={{ display: "block", width: 24, height: 1, background: C.greenTeal }} />{children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.3, marginBottom: 16, color: C.white }}>{children}</h2>;
}

function Divider() {
  return <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, ${C.greenTeal}, transparent)`, margin: "20px 0" }} />;
}

// ── About ─────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "100px 5%", background: C.dark2 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        <div className="reveal">
          <SectionTag>من نحن</SectionTag>
          <SectionTitle>نبرة كلمة…<br /><span style={{ color: C.greenTeal }}>حيث يُولد المتحدثون</span></SectionTitle>
          <Divider />
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 600, marginBottom: 20 }}>
            <strong style={{ color: C.greenTeal }}>رؤيتنا:</strong> أن تصنع نبرة جيلاً واثقًا ومؤثرًا، من الطفولة إلى القيادة — عبر تطوير الصوت والحضور والكلمة، وتقديم تجارب تجمع بين التحفيز والفكر بروح عربية أصيلة.
          </p>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 600, marginBottom: 28 }}>
            <strong style={{ color: C.greenTeal }}>من نحن؟</strong> نبرة كلمة مشروع سعودي يطوّر مهارات القيادة والإلقاء والخطابة عبر برامج تدريبية تطبيقية، وينظم أمسيات ثقافية وفكرية تبرز أفكار ومواهب أبناء وبنات المنطقة.
          </p>
          {[
            ["◈", "تدريب تطبيقي أمام الجمهور", "برامجنا مبنية على التطبيق الفعلي المباشر أمام الجمهور لضمان تغيير حقيقي ومستدام."],
            ["◈", "أمسيات ثقافية وفكرية", "نظّم فعاليات خطابية وثقافية تحفيزية تهدف إلى نشر رسائل الإلهام والتمكين المجتمعي."],
            ["◈", "روح عربية أصيلة", "نقدّم تجارب تجمع بين التحفيز والفكر بروح عربية أصيلة تعكس هوية المنطقة وأبنائها."],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 42, height: 42, background: "rgba(109,194,183,0.1)", border: "1px solid rgba(109,194,183,0.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.greenTeal, fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: C.white, marginBottom: 4, fontSize: "1rem" }}>{title}</div>
                <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <div style={{ background: C.dark3, border: "1px solid rgba(109,194,183,0.15)", borderRadius: 8, padding: 40, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: 3, background: `linear-gradient(90deg, transparent, ${C.greenTeal}, transparent)` }} />
            <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "1.35rem", fontStyle: "italic", color: "rgba(109,194,183,0.9)", lineHeight: 1.75, marginBottom: 20, fontWeight: 500 }}>
              "لم تُغيِّر الكلمةُ التاريخَ فحسب، بل غيّرت مصائر الناس — وصوتك هو مفتاح ذلك التغيير."
            </p>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>— فلسفة نبرة كلمة</div>
          </div>
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["٢٠٢٥", "سنة التأسيس"], ["+١٢", "مدرب متخصص"]].map(([num, label]) => (
              <div key={label} style={{ background: C.dark3, border: "1px solid rgba(109,194,183,0.12)", borderRadius: 8, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: C.greenTeal, marginBottom: 4, fontFamily: "'Tajawal', sans-serif" }}>{num}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

// ── Programs ──────────────────────────────────────────────────
const PROGRAMS = [
  { num: "01", tag: "للكبار", title: "برامج تدريبية للكبار", desc: "تدريب عملي تطبيقي أمام الجمهور مباشرةً لتطوير مهارات القيادة والخطابة والإلقاء والتأثير والكاريزما.", features: ["تدريب أمام الجمهور مباشرةً", "مهارات القيادة والخطابة", "بناء الكاريزما والتأثير", "جلسات تطبيقية مكثّفة"], link: "اشترك في البرنامج ←" },
  { num: "02", tag: "للصغار ✦", title: "برامج تدريبية للصغار", desc: "تدريب تفاعلي على مهارات الإلقاء والخطابة باستخدام تقنيات الواقع المعزز الافتراضي لبناء الثقة والتعبير منذ الصغر.", features: ["تقنيات الواقع المعزز الافتراضي", "بناء الثقة بالنفس منذ الصغر", "مهارات التعبير والإلقاء", "أساليب تفاعلية وممتعة"], link: "اشترك في البرنامج ←", featured: true },
  { num: "03", tag: "فعاليات", title: "تنظيم أمسيات وفعاليات تحفيزية", desc: "فعاليات خطابية وثقافية تحفيزية تهدف إلى نشر رسائل الإلهام والتمكين المجتمعي ولبيئات العمل.", features: ["أمسيات خطابية وثقافية", "فعاليات تحفيزية مجتمعية", "تمكين بيئات العمل", "إبراز المواهب المحلية"], link: "احجز فعاليتك ←" },
  { num: "04", tag: "فردي", title: "استشارات تطويرية وشخصية", desc: "جلسات مرافقة وتوجيه فردي لبناء الحضور والكاريزما الشخصية والصوتية والقيادية للفرد وداخل بيئة العمل.", features: ["جلسات مرافقة وتوجيه فردي", "بناء الحضور والكاريزما", "تطوير الصوت والأداء", "قيادة فعّالة في بيئة العمل"], link: "احجز جلستك ←" },
  { num: "05", tag: "للجهات", title: "توفير متحدثين للجهات", desc: "اختيار وتدريب متحدثين لتمثيل الشركات والمؤسسات في الفعاليات والبرامج بأعلى مستوى من الاحترافية.", features: ["اختيار متحدثين مؤهّلين", "تدريب مخصص للجهة", "تمثيل في الفعاليات والمؤتمرات", "متابعة وتقييم الأداء"], link: "طلب متحدث ←" },
  { num: "06", tag: "محتوى", title: "صناعة المحتوى والكتابة الإبداعية", desc: "صياغة وتطوير محتوى مؤثر للجهات والأفراد وبيئات العمل بأسلوب احترافي للكتابة الإبداعية والمحتوى الوظيفي والسرد القصصي.", features: ["كتابة إبداعية احترافية", "محتوى وظيفي مؤثر", "سرد قصصي وبناء الروايات", "تطوير محتوى الجهات والأفراد"], link: "اطلب الخدمة ←" },
  { num: "07", tag: "ريادة أعمال", title: "فن إيصال الفكرة للمستثمر والجمهور", desc: "هذه الخدمة مخصصة لتأهيل رواد الأعمال وصناع المشاريع على تقديم أفكارهم بوضوح وثقة وكاريزما عالية.", features: ["تأهيل رواد الأعمال", "تقديم الأفكار بثقة وكاريزما", "مهارات Pitch للمستثمرين", "إقناع الجمهور والشركاء"], link: "اشترك في البرنامج ←" },
];

function Programs() {
  return (
    <section id="programs" style={{ padding: "100px 5%", background: C.darkBg }}>
      <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, gap: 30, flexWrap: "wrap" }}>
        <div>
          <SectionTag>البرامج والخدمات</SectionTag>
          <SectionTitle>برامج <span style={{ color: C.greenTeal }}>صنعت لتأثيرك</span></SectionTitle>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 600 }}>من الطفولة إلى القيادة، لدينا البرنامج المناسب لرحلتك نحو الإلقاء المؤثر.</p>
        </div>
        <BtnPrimary href="#register">سجّل الآن</BtnPrimary>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {PROGRAMS.map((p, i) => (
          <ProgramCard key={p.num} {...p} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}

function ProgramCard({ num, tag, title, desc, features, link, featured, delay }: { num: string; tag: string; title: string; desc: string; features: string[]; link: string; featured?: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="reveal" style={{ transitionDelay: `${delay}s`, background: featured ? `linear-gradient(135deg, rgba(27,80,62,0.5) 0%, ${C.dark2} 60%)` : C.dark2, border: `1px solid ${hovered ? "rgba(109,194,183,0.35)" : "rgba(109,194,183,0.1)"}`, borderRadius: 8, padding: "36px 32px", position: "relative", overflow: "hidden", transition: "all 0.4s", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.4)" : "none", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "absolute", top: 24, left: 28, fontSize: "3rem", fontWeight: 800, color: "rgba(109,194,183,0.1)", fontFamily: "'Tajawal', sans-serif", lineHeight: 1 }}>{num}</div>
      <div style={{ display: "inline-block", background: featured ? C.greenMid : "rgba(109,194,183,0.12)", color: featured ? C.white : C.greenTeal, fontSize: "0.75rem", padding: "4px 12px", borderRadius: 50, marginBottom: 20, fontWeight: 600 }}>{tag}</div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: C.white, marginBottom: 12, fontFamily: "'Tajawal', sans-serif" }}>{title}</h3>
      <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 20 }}>{desc}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {features.map(f => (
          <li key={f} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "0.5rem", color: C.greenTeal, flexShrink: 0 }}>◆</span>{f}
          </li>
        ))}
      </ul>
      <a href="#register" style={{ color: C.greenTeal, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Tajawal', sans-serif" }}>{link}</a>
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "100px 5%", background: C.dark2 }}>
      <div className="reveal" style={{ maxWidth: 600, marginBottom: 60 }}>
        <SectionTag>قصص النجاح</SectionTag>
        <SectionTitle><span style={{ color: C.greenTeal }}>قصة نجاح</span></SectionTitle>
      </div>
      <div className="reveal" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg, rgba(27,80,62,0.45) 0%, ${C.dark3} 60%)`, border: "1px solid rgba(109,194,183,0.2)", borderRadius: 8, padding: "48px 52px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.greenDark}, ${C.greenMid}, ${C.greenTeal})`, borderRadius: "8px 8px 0 0" }} />
          <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "5rem", color: "rgba(109,194,183,0.15)", lineHeight: 0.7, marginBottom: 20, display: "block" }}>"</span>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 2, marginBottom: 32, fontStyle: "italic" }}>
            بدأت نبرة كفكرة بسيطة تحمل شغفًا بالكلمة والتأثير، ورغبة في صناعة مساحات تُنمي الصوت والحضور. مع الوقت، تشكلت الرؤية وبدأت الملامح تتضح، وكان للدعم دور كبير في تحويلها من فكرة إلى واقع.
          </p>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 2, marginBottom: 40, fontStyle: "italic" }}>
            وكانت سجى من أوائل من آمن بالفكرة وساندها، فكان حضورها ودعمها جزءًا من رحلة التأسيس والنجاح. اليوم، نبرة ليست مجرد مشروع، بل تجربة تصنع الأثر وتمنح كل صوت فرصته ليُسمع.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.greenMid, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.1rem", color: C.white, flexShrink: 0 }}>مش</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", color: C.white }}>محمد الشبيلي</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: 3 }}>مؤسس نبرة كلمة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Comments ──────────────────────────────────────────────────
interface Comment { name: string; city: string; text: string; rating: number; date: string; }

function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    { name: "محمد العسيري", city: "أبها", text: "تجربة رائعة جداً مع نبرة كلمة. البرنامج غيّر نظرتي لنفسي وطريقة تواصلي مع الآخرين. أنصح به بشدة لكل من يريد تطوير نفسه.", rating: 5, date: "منذ أسبوعين" },
    { name: "سلمى القحطاني", city: "خميس مشيط", text: "الأمسيات الثقافية التي تنظمها نبرة كلمة استثنائية. شعرت بالفخر وأنا أرى أبناء منطقتنا يتألقون على المنصة.", rating: 5, date: "منذ شهر" },
  ]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const now = new Date();
    setComments(prev => [{ name: name.trim(), city: city.trim(), text: text.trim(), rating, date: now.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }) }, ...prev]);
    setName(""); setCity(""); setText(""); setRating(5);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "12px 16px", color: C.white, fontSize: "0.95rem", fontFamily: "'Tajawal', sans-serif", outline: "none", direction: "rtl" };

  return (
    <section id="comments" style={{ padding: "80px 5%", background: C.darkBg }}>
      <div className="reveal" style={{ maxWidth: 600, marginBottom: 50 }}>
        <SectionTag>آراء الزوار</SectionTag>
        <SectionTitle>شاركنا <span style={{ color: C.greenTeal }}>رأيك</span></SectionTitle>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>نسعد بسماع تجربتك مع نبرة كلمة — كلمتك تهمّنا.</p>
      </div>

      <div className="reveal" style={{ background: C.dark2, border: "1px solid rgba(109,194,183,0.15)", borderRadius: 8, padding: 40, marginBottom: 50, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.greenDark}, ${C.greenMid}, ${C.greenTeal})`, borderRadius: "8px 8px 0 0" }} />
        <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: C.white, marginBottom: 24 }}>أضف تعليقك</div>
        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="comment-row">
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: 7, fontWeight: 500 }}>الاسم</label>
              <input style={inputStyle} placeholder="اسمك الكريم" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: 7, fontWeight: 500 }}>المدينة (اختياري)</label>
              <input style={inputStyle} placeholder="مدينتك" value={city} onChange={e => setCity(e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: 7, fontWeight: 500 }}>تقييمك</label>
            <div style={{ display: "flex", gap: 6 }}>
              {[5,4,3,2,1].map(s => (
                <button key={s} type="button" onClick={() => setRating(s)} style={{ background: "none", border: "none", fontSize: "1.6rem", cursor: "pointer", color: s <= rating ? C.greenTeal : "rgba(255,255,255,0.2)", transition: "color 0.2s" }}>★</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: 7, fontWeight: 500 }}>تعليقك</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} placeholder="شاركنا تجربتك أو رأيك في نبرة كلمة…" value={text} onChange={e => setText(e.target.value)} required />
          </div>
          <BtnPrimary onClick={undefined}>أرسل تعليقك ←</BtnPrimary>
          {success && <div style={{ marginTop: 16, background: "rgba(109,194,183,0.1)", border: "1px solid rgba(109,194,183,0.35)", borderRadius: 6, padding: "14px 20px", color: C.greenTeal, fontSize: "0.95rem", textAlign: "center" }}>✓ تم إرسال تعليقك بنجاح! شكرًا لمشاركتنا رأيك.</div>}
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {comments.map((c, i) => (
          <div key={i} className="reveal" style={{ background: C.dark2, border: "1px solid rgba(109,194,183,0.1)", borderRadius: 8, padding: "24px 28px", transition: "border-color 0.3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.greenDark, border: "2px solid rgba(109,194,183,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", color: C.greenTeal, flexShrink: 0 }}>{c.name.substring(0, 2)}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: C.white }}>{c.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{c.city ? `${c.city} — ` : ""}{c.date}</div>
                </div>
              </div>
              <div style={{ color: C.greenTeal, fontSize: "0.8rem", letterSpacing: 2 }}>{"★".repeat(c.rating)}</div>
            </div>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{c.text}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){.comment-row{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

// ── Register ──────────────────────────────────────────────────
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", city: "", interest: "", message: "" });
  const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "12px 16px", color: C.white, fontSize: "0.95rem", fontFamily: "'Tajawal', sans-serif", outline: "none", direction: "rtl" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: 7, fontWeight: 500 };

  const submitMutation = trpc.registration.submit.useMutation({
    onSuccess: () => { setSubmitted(true); },
    onError: (err) => { alert("حدث خطأ أثناء الإرسال: " + err.message); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <section id="register" style={{ padding: "100px 5%", background: C.dark2, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(27,80,62,0.3) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start", position: "relative", zIndex: 1 }} className="register-grid">
        <div className="reveal" style={{ paddingTop: 20 }}>
          <SectionTag>سجّل الآن</SectionTag>
          <SectionTitle>ابدأ رحلتك<br /><span style={{ color: C.greenTeal }}>نحو الكلمة المؤثرة</span></SectionTitle>
          <Divider />
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 600, marginBottom: 44 }}>سجّل بياناتك وسيتواصل معك فريقنا خلال 24 ساعة لمساعدتك في اختيار البرنامج المناسب لك.</p>
          {["استشارة مجانية قبل الالتحاق لضمان أن البرنامج يناسب أهدافك", "ضمان الرضا التام أو استعادة كاملة لقيمة الاشتراك خلال 7 أيام", "دعم مستمر بعد انتهاء البرنامج ومتابعة لمدة 3 أشهر", "شهادة معتمدة من نبرة كلمة تُعزّز سيرتك الذاتية"].map(p => (
            <div key={p} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 28, height: 28, background: "rgba(109,194,183,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.greenTeal, fontSize: "0.75rem", flexShrink: 0, marginTop: 2 }}>✓</div>
              <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{p}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ transitionDelay: "0.15s", background: C.dark3, border: "1px solid rgba(109,194,183,0.15)", borderRadius: 8, padding: "44px 40px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.greenDark}, ${C.greenMid}, ${C.greenTeal})`, borderRadius: "8px 8px 0 0" }} />
          <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: C.white, marginBottom: 6 }}>سجّل اهتمامك الآن</div>
          <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>جميع الحقول إلزامية — سيتصل بك فريقنا في أقرب وقت</div>
          {submitted ? (
            <div style={{ background: "rgba(109,194,183,0.1)", border: "1px solid rgba(109,194,183,0.35)", borderRadius: 6, padding: "24px 20px", color: C.greenTeal, fontSize: "1.05rem", textAlign: "center", lineHeight: 1.8 }}>
              ✓ تم استلام طلبك بنجاح!<br /><span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>سيتواصل معك فريقنا خلال 24 ساعة.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 0 }} className="form-row">
                <div style={{ marginBottom: 16 }}><label style={labelStyle}>الاسم الكامل</label><input style={inputStyle} placeholder="محمد أحمد" required value={formData.fullName} onChange={e => setFormData(p => ({ ...p, fullName: e.target.value }))} /></div>
                <div style={{ marginBottom: 16 }}><label style={labelStyle}>رقم الجوال</label><input style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} type="tel" placeholder="05XXXXXXXX" required value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                <div style={{ marginBottom: 16 }}><label style={labelStyle}>البريد الإلكتروني</label><input style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} type="email" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} /></div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>المدينة</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} required value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}>
                    <option value="" disabled>اختر مدينتك</option>
                    {["أبها", "خميس مشيط", "الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "تبوك", "مدينة أخرى"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>نوع الاهتمام</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} required value={formData.interest} onChange={e => setFormData(p => ({ ...p, interest: e.target.value }))}>
                  <option value="" disabled>ما الذي تبحث عنه؟</option>
                  {["برامج تدريبية للكبار", "برامج تدريبية للصغار", "تنظيم أمسيات وفعاليات", "استشارات تطويرية وشخصية", "توفير متحدثين للجهات", "صناعة المحتوى والكتابة الإبداعية", "فن إيصال الفكرة للمستثمر", "لست متأكدًا — أريد استشارة"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>رسالتك (اختياري)</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 90 }} placeholder="أخبرنا عن هدفك أو أي سؤال لديك…" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
              </div>
              <button type="submit" disabled={submitMutation.isPending} style={{ width: "100%", background: submitMutation.isPending ? C.greenDark : C.greenMid, color: C.white, border: "none", padding: 16, borderRadius: 6, fontSize: "1.05rem", fontWeight: 700, fontFamily: "'Tajawal', sans-serif", cursor: submitMutation.isPending ? "not-allowed" : "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {submitMutation.isPending ? "...جاري الإرسال" : "سجّل الآن — ابدأ التحوّل ←"}
              </button>
              <p style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", marginTop: 14 }}>بياناتك محمية تمامًا ولن تُشارك مع أي طرف ثالث</p>
            </form>
          )}
        </div>
      </div>
      <style>{`@media(max-width:900px){.register-grid{grid-template-columns:1fr!important;gap:48px!important;}.form-row{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding: "80px 5%", background: C.darkBg }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="contact-grid">
        <div className="reveal">
          <SectionTag>تواصل معنا</SectionTag>
          <SectionTitle>نحن هنا<br /><span style={{ color: C.greenTeal }}>لنسمعك</span></SectionTitle>
          <Divider />
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 600, marginBottom: 36 }}>سواء كانت لديك استفسارات أو تريد مزيدًا من المعلومات، فريقنا جاهز للرد في أي وقت.</p>
          {[
            { href: "tel:+966536946260", icon: "☏", label: "الهاتف والواتساب", value: "+966 53 694 6260", ltr: true },
            { href: "mailto:info@nabra-sa.com", icon: "✉", label: "البريد الإلكتروني", value: "info@nabra-sa.com", ltr: true },
            { href: undefined, icon: "◎", label: "الموقع", value: "أبها — حي المنهل، المملكة العربية السعودية" },
          ].map((item, i) => {
            const inner = (
              <>
                <div style={{ width: 44, height: 44, background: "rgba(109,194,183,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.greenTeal, fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 500, direction: item.ltr ? "ltr" : "rtl", textAlign: "right" }}>{item.value}</div>
                </div>
              </>
            );
            const s: React.CSSProperties = { display: "flex", gap: 16, alignItems: "center", padding: "18px 22px", background: C.dark2, border: "1px solid rgba(109,194,183,0.08)", borderRadius: 8, transition: "all 0.3s", textDecoration: "none", color: C.white, marginBottom: 16 };
            return item.href ? <a key={i} href={item.href} style={s} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(109,194,183,0.3)"; e.currentTarget.style.transform = "translateX(-4px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(109,194,183,0.08)"; e.currentTarget.style.transform = ""; }}>{inner}</a>
              : <div key={i} style={s}>{inner}</div>;
          })}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: 16, letterSpacing: 1 }}>تابعنا على</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { href: "https://x.com/nabratkalima?s=21", label: "X", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: "https://www.instagram.com/nabrat.kalima?igsh=MWJqaXQwNmhyc2dpaA%3D%3D", label: "Instagram", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                { href: "https://www.tiktok.com/@nabratkalima?_r=1&_t=ZS-95Va5gYEWaj", label: "TikTok", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg> },
                { href: "https://wa.me/966536946260", label: "WhatsApp", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} style={{ width: 46, height: 46, background: C.dark2, border: "1px solid rgba(109,194,183,0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.greenMid; e.currentTarget.style.color = C.white; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.dark2; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = ""; }}
                >{s.svg}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <div style={{ background: C.dark2, border: "1px solid rgba(109,194,183,0.1)", borderRadius: 8, overflow: "hidden", height: 280 }}>
            <iframe src="https://maps.google.com/maps?q=أبها+حي+المنهل&output=embed&hl=ar&z=14" style={{ width: "100%", height: "100%", border: "none", filter: "grayscale(30%) brightness(0.85)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="موقع نبرة كلمة" />
          </div>
          <div style={{ marginTop: 24, background: C.dark2, border: "1px solid rgba(109,194,183,0.12)", borderRadius: 8, padding: 28 }}>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: C.white, marginBottom: 14 }}>ساعات الدوام</div>
            {[["السبت — الأربعاء", "٩:٠٠ ص — ٦:٠٠ م", false], ["الخميس", "٩:٠٠ ص — ٢:٠٠ م", false], ["الجمعة", "إجازة", true]].map(([day, time, red]) => (
              <div key={day as string} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                <span>{day}</span><span style={{ color: red ? "rgba(255,100,100,0.7)" : C.greenTeal }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.greenDark, borderTop: "1px solid rgba(109,194,183,0.15)", padding: "48px 5% 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(109,194,183,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(103,174,110,0.06)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, marginBottom: 40, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <LogoIcon size={70} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: C.white }}>نبرة كلمة</span>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: "0.65rem", fontWeight: 400, color: C.greenTeal, letterSpacing: "0.5px" }}>Nabrat Kalima</span>
            </div>
          </div>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>نحوّلك من متحدث عادي إلى صوت لا يُنسى. لأن كل كلمة تقولها… تصنع ميراثك.</p>
        </div>
        {[
          { title: "روابط سريعة", links: [["من نحن", "#about"], ["البرامج والخدمات", "#programs"], ["قصص النجاح", "#testimonials"], ["التعليقات", "#comments"], ["سجّل الآن", "#register"]] },
          { title: "البرامج", links: [["برامج الكبار", "#programs"], ["برامج الصغار", "#programs"], ["الأمسيات والفعاليات", "#programs"], ["استشارات تطويرية", "#programs"], ["صناعة المحتوى", "#programs"]] },
          { title: "تواصل", links: [["info@nabra-sa.com", "mailto:info@nabra-sa.com"], ["واتساب: 0536946260", "https://wa.me/966536946260"], ["X: @nabratkalima", "https://x.com/nabratkalima?s=21"], ["Instagram: @nabrat.kalima", "https://www.instagram.com/nabrat.kalima"], ["TikTok: @nabratkalima", "https://www.tiktok.com/@nabratkalima"]] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>{col.title}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map(([label, href]) => (
                <li key={label}><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.3s", fontFamily: "'Tajawal', sans-serif" }} onMouseEnter={e => e.currentTarget.style.color = C.greenTeal} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>© 2025 <span style={{ color: C.greenTeal }}>نبرة كلمة</span>. جميع الحقوق محفوظة.</div>
        <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>أبها — حي المنهل، المملكة العربية السعودية</div>
      </div>
    </footer>
  );
}

// ── Scroll to top ─────────────────────────────────────────────
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return show ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 28, left: 28, width: 44, height: 44, background: C.greenMid, color: C.white, border: "none", borderRadius: 8, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, fontWeight: 700, transition: "all 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.background = C.greenTeal; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.greenMid; e.currentTarget.style.transform = ""; }}
    >↑</button>
  ) : null;
}

// ── Main ──────────────────────────────────────────────────────
export default function Home() {
  useReveal();
  return (
    <div style={{ fontFamily: "'Tajawal', sans-serif", background: C.darkBg, color: C.white, direction: "rtl" }}>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Programs />
      <Testimonials />
      <Comments />
      <Register />
      <Contact />
      <Footer />
      <ScrollTop />
    </div>
  );
}
