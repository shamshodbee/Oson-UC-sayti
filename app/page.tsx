"use client";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Zap, ShieldCheck, Clock, PackageCheck, ChevronDown, MousePointerClick, KeyRound, Gift } from "lucide-react";
import OrderModal from "@/components/OrderModal";
import { FAQ, PACKAGES, Pkg, fmt } from "@/components/data";

const Logo = () => (
  <a href="#" className="flex items-center gap-2">
    <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold to-ember text-obsidian">
      <span className="absolute inset-0 rounded-lg bg-gold blur-md animate-glow" />
      <Crown size={20} className="relative" />
    </span>
    <span className="font-display text-xl font-bold tracking-wide text-white">OSON <span className="text-gold">UC</span></span>
  </a>
);

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Pkg | null>(null);
  const [faq, setFaq] = useState<number | null>(0);
  const close = useCallback(() => setOpen(false), []);
  const openModal = (p: Pkg | null = null) => { setSelected(p); setOpen(true); };

  return (
    <>
      <header className="glass sticky top-0 z-50 border-b border-line">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <div className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
            {[["#paketlar", "UC Paketlar"], ["#qanday", "Qanday ishlaydi?"], ["#savollar", "Savollar"]].map(([h, t]) => (
              <a key={h} href={h} className="transition hover:text-neon">{t}</a>
            ))}
          </div>
          <button onClick={() => openModal()} className="rounded-lg bg-gradient-to-r from-gold to-ember px-3.5 py-2 text-xs font-bold text-obsidian transition hover:brightness-110 sm:text-sm">
            Ro'yxatdan o'tish / Kirish
          </button>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />
          <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:pt-24">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              PUBG Mobile UC — <span className="bg-gradient-to-r from-gold to-ember bg-clip-text text-transparent">Tezkor, Ishonchli va Arzon!</span>
            </motion.h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
              Rasmiy ID orqali 1-5 daqiqada hisobingizga tushadi. 24/7 avtomatik xizmat.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#paketlar" className="rounded-xl bg-gradient-to-r from-gold to-ember px-7 py-3.5 font-bold text-obsidian shadow-lg shadow-ember/25 transition hover:brightness-110">UC sotib olish</a>
              <button onClick={() => openModal()} className="rounded-xl border border-line bg-slate2 px-7 py-3.5 font-semibold text-white transition hover:border-neon hover:text-neon">Ro'yxatdan o'tish</button>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[[PackageCheck, "10,000+", "Muvaffaqiyatli buyurtma"], [Clock, "1-5 daqiqa", "Yetkazib berish"], [ShieldCheck, "100%", "Xavfsiz kafolat"]].map(([I, n, l]: any) => (
                <div key={l} className="flex items-center gap-3 rounded-2xl border border-line bg-slate2/80 p-4 text-left">
                  <I className="shrink-0 text-gold" size={26} />
                  <div><div className="font-display text-2xl font-bold leading-none text-white">{n}</div><div className="mt-1 text-xs text-slate-400">{l}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="paketlar" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">UC Paketlar</h2>
          <p className="mt-2 text-slate-400">O'zingizga mos paketni tanlang — bonuslar narxga kiritilgan.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <div key={p.id} className="group relative flex flex-col rounded-2xl border border-line bg-slate2 p-5 transition hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,.4)]">
                {p.badge && <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-obsidian">{p.badge}</span>}
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-gold to-ember text-obsidian shadow-lg shadow-ember/30"><Crown size={28} /></span>
                <div className="mt-4 font-display text-4xl font-bold text-white">{fmt(p.uc)} <span className="text-gold">UC</span></div>
                <div className="mt-1 h-5 text-sm text-slate-400">{p.bonus ? <>{fmt(p.base)} + <span className="text-neon">{fmt(p.bonus)} Bonus</span></> : "Boshlang'ich paket"}</div>
                <div className="mb-5 mt-4 text-xl font-bold text-gold">{fmt(p.price)} so'm</div>
                <button onClick={() => openModal(p)} className="mt-auto rounded-xl border border-gold/50 py-2.5 font-bold text-gold transition hover:bg-gradient-to-r hover:from-gold hover:to-ember hover:text-obsidian">Tanlash</button>
              </div>
            ))}
          </div>
        </section>

        <section id="qanday" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Qanday ishlaydi?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [MousePointerClick, "Paketni tanlang", "O'zingizga kerakli UC miqdorini belgilang"],
              [KeyRound, "Ma'lumotlarni kiriting", "Ismingiz, Gmail va PUBG ID raqamingizni yozing"],
              [Gift, "UC qabul qiling", "Tasdiqlangach, 5 daqiqa ichida hisobingizga tushadi"],
            ].map(([I, t, d]: any, i) => (
              <div key={t} className="relative rounded-2xl border border-line bg-slate2 p-6">
                <span className="absolute right-5 top-4 font-display text-5xl font-bold text-line">{i + 1}</span>
                <I className="text-neon" size={30} />
                <h3 className="mt-4 font-display text-xl font-bold text-white">{t}</h3>
                <p className="mt-1 text-sm text-slate-400">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="savollar" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ko'p beriladigan savollar</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-line bg-slate2">
                <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-white">
                  {f.q}
                  <ChevronDown className={`shrink-0 text-gold transition-transform ${faq === i ? "rotate-180" : ""}`} size={20} />
                </button>
                <motion.div initial={false} animate={{ height: faq === i ? "auto" : 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-slate-400">{f.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-slate2/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start"><Logo /><span>© 2026 Oson UC. Barcha huquqlar himoyalangan.</span></div>
          <div className="flex gap-6">
            <a href="#paketlar" className="hover:text-neon">UC Paketlar</a>
            <a href="#qanday" className="hover:text-neon">Qanday ishlaydi?</a>
            <a href="#savollar" className="hover:text-neon">Savollar</a>
          </div>
        </div>
      </footer>

      <OrderModal open={open} onClose={close} initialPkg={selected} />
    </>
  );
}
