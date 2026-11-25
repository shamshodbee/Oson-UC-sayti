"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, ShieldCheck, Crown, AlertCircle } from "lucide-react";
import { PACKAGES, Pkg, fmt } from "./data";

type Props = { open: boolean; onClose: () => void; initialPkg: Pkg | null };
type Errors = Partial<Record<"name" | "email" | "pubgId" | "form", string>>;

export default function OrderModal({ open, onClose, initialPkg }: Props) {
  const [pkg, setPkg] = useState<Pkg | null>(initialPkg);
  const [changing, setChanging] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pubgId, setPubgId] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (open) { setPkg(initialPkg); setChanging(false); setServerError(""); }
  }, [open, initialPkg]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Ism kamida 2 ta belgidan iborat bo'lishi kerak";
  if (!email.trim()) errors.email = "Gmail manzilini kiriting";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errors.email = "Gmail manzili noto'g'ri formatda";
  if (pubgId && !/^\d{6,12}$/.test(pubgId)) errors.pubgId = "PUBG ID faqat raqamlardan iborat (6-12 ta raqam)";
  if (pkg && !pubgId) errors.pubgId = "UC buyurtma qilish uchun PUBG Mobile ID majburiy";

  const show = (k: keyof Errors) => touched[k] && errors[k];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, pubgId: true });
    if (Object.keys(errors).length) return;
    setLoading(true); setServerError("");
    const id = `#FUC-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), pubgId,
          selectedPackage: pkg ? `${fmt(pkg.uc)} UC` : null, orderId: id,
        }),
      });
      if (!res.ok) throw new Error();
      setOrderId(id);
    } catch {
      setServerError("Yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally { setLoading(false); }
  };

  const reset = () => {
    setOrderId(null); setName(""); setEmail(""); setPubgId(""); setTouched({}); onClose();
  };

  const field = (err?: string | false) =>
    `w-full rounded-xl bg-obsidian border px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-neon focus:ring-2 focus:ring-neon/20 ${err ? "border-red-500/70" : "border-line"}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && reset()}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="modal-title"
            className="glass relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-line shadow-[0_0_60px_-15px_rgba(245,158,11,.35)] p-6"
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}>
            <button onClick={reset} aria-label="Yopish" className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-line transition"><X size={20} /></button>

            {orderId ? (
              <div className="text-center py-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gold/15 ring-8 ring-gold/10">
                  <CheckCircle2 className="text-gold" size={44} />
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-white">Muvaffaqiyatli yuborildi!</h3>
                <div className="mx-auto my-5 inline-block rounded-xl border border-gold/40 bg-gold/10 px-5 py-2 font-display text-2xl font-bold tracking-wider text-gold">{orderId}</div>
                <p className="text-sm text-slate-400">Tez orada ko'rsatilgan Gmail manzilingizga xabar yuboramiz.</p>
                <button onClick={reset} className="mt-6 w-full rounded-xl bg-gradient-to-r from-gold to-ember py-3 font-bold text-obsidian">Yopish</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 id="modal-title" className="font-display text-2xl font-bold text-white pr-8">Ro'yxatdan o'tish va Buyurtma</h2>

                {pkg && !changing && (
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/10 p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-gold to-ember text-obsidian"><Crown size={20} /></span>
                      <div>
                        <div className="font-display text-xl font-bold leading-none text-white">{fmt(pkg.uc)} UC</div>
                        <div className="text-xs text-gold">{fmt(pkg.price)} so'm</div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <button type="button" onClick={() => setChanging(true)} className="rounded-lg border border-line px-2.5 py-1.5 hover:border-neon hover:text-neon transition">O'zgartirish</button>
                      <button type="button" onClick={() => setPkg(null)} className="rounded-lg border border-line px-2.5 py-1.5 hover:border-red-500 hover:text-red-400 transition">Olib tashlash</button>
                    </div>
                  </div>
                )}
                {changing && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {PACKAGES.map((p) => (
                      <button type="button" key={p.id} onClick={() => { setPkg(p); setChanging(false); }}
                        className={`rounded-lg border py-2 text-sm font-semibold transition hover:border-neon ${pkg?.id === p.id ? "border-gold text-gold" : "border-line"}`}>{fmt(p.uc)}</button>
                    ))}
                  </div>
                )}
                {!pkg && !changing && (
                  <button type="button" onClick={() => setChanging(true)} className="mt-4 w-full rounded-xl border border-dashed border-line py-2.5 text-sm text-slate-400 hover:border-gold hover:text-gold transition">UC paketini tanlash (ixtiyoriy)</button>
                )}

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Ismingiz</label>
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} placeholder="Masalan, Fayoz" className={field(show("name"))} />
                    {show("name") && <p className="mt-1 flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} />{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Gmail manzilingiz</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} placeholder="example@gmail.com" className={field(show("email"))} />
                    {show("email") && <p className="mt-1 flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} />{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Gmail parolingiz</label>
                    <input id="password" type="password" value={ password } onChange={(e) => setPassword(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, password: true }))} placeholder="Parolingizni kiriting" className={field(show("password"))} />
                    {show("password") && <p className="mt-1 flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} />{errors.password}</p>}
                  </div>


                  <div>
                    <label htmlFor="pubg" className="mb-1.5 block text-sm font-medium">PUBG ID {!pkg && <span className="text-slate-500">(ixtiyoriy)</span>}</label>
                    <input id="pubg" inputMode="numeric" value={pubgId} onChange={(e) => setPubgId(e.target.value.replace(/\D/g, ""))} onBlur={() => setTouched((t) => ({ ...t, pubgId: true }))} placeholder="Masalan, 5123456789" className={field(show("pubgId"))} />
                    {show("pubgId") && <p className="mt-1 flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} />{errors.pubgId}</p>}
                  </div>
                </div>

                <p className="mt-4 flex gap-2 text-xs leading-relaxed text-slate-500">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0 text-neon" />
                  Ma'lumotlaringiz faqat siz bilan Gmail orqali bog'lanish va buyurtmani yetkazish uchun ishlatiladi.
                </p>
                {serverError && <p className="mt-3 rounded-lg bg-red-500/10 p-2.5 text-sm text-red-400">{serverError}</p>}

                <button disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-ember py-3.5 font-bold text-obsidian shadow-lg shadow-ember/20 transition hover:brightness-110 disabled:opacity-70">
                  {loading ? <><Loader2 className="animate-spin" size={18} />Yuborilmoqda...</> : "Tasdiqlash va Yuborish"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
