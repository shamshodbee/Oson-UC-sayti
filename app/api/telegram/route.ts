import { NextResponse } from "next/server";

const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "Server sozlanmagan" }, { status: 500 });
  }

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { name, email, pubgId, selectedPackage, orderId } = body ?? {};
  if (!name || String(name).trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email ?? ""))) {
    return NextResponse.json({ ok: false, error: "Ma'lumotlar noto'g'ri" }, { status: 400 });
  }
  if (selectedPackage && !/^\d{6,12}$/.test(String(pubgId ?? ""))) {
    return NextResponse.json({ ok: false, error: "PUBG ID noto'g'ri" }, { status: 400 });
  }

  const text = [
    `🔥 <b>Yangi buyurtma — Oson UC</b>`,
    ``,
    `🆔 <b>Buyurtma:</b> <code>${esc(orderId)}</code>`,
    `👤 <b>Ism:</b> ${esc(name)}`,
    `📧 <b>Gmail:</b> ${esc(email)}`,
    `🎮 <b>PUBG ID:</b> <code>${esc(pubgId || "Kiritilmagan")}</code>`,
    `💎 <b>Paket:</b> ${esc(selectedPackage || "Faqat ro'yxatdan o'tish")}`,
    `🕒 <b>Vaqt:</b> ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: "Telegram xatosi" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Tarmoq xatosi" }, { status: 502 });
  }
}
