export type Pkg = { id: string; uc: number; base: number; bonus: number; price: number; badge?: string };

export const PACKAGES: Pkg[] = [
  { id: "60", uc: 60, base: 60, bonus: 0, price: 13000 },
  { id: "120", uc: 120, base: 120, bonus: 0, price: 26000 },
  { id: "180", uc: 180, base: 180, bonus: 0, price: 39000 },
  { id: "240", uc: 240, base: 240, bonus: 0, price: 52000 },
  { id: "325", uc: 325, base: 325, bonus: 0, price: 60000, badge: "Ommabop" },
  { id: "385", uc: 385, base: 385, bonus: 0, price: 73000 },
  { id: "445", uc: 445, base: 445, bonus: 0, price: 85000 },
  { id: "505", uc: 505, base: 505, bonus: 0, price: 99000 },
  { id: "660", uc: 660, base: 660, bonus: 0, price: 118000, badge: "Top tanlov" },
  { id: "720", uc: 720, base: 720, bonus: 0, price: 131000 },
  { id: "780", uc: 780, base: 780, bonus: 0, price: 144000 },
  { id: "985", uc: 985, base: 985, bonus: 0, price: 177000 },
  { id: "1320", uc: 1320, base: 1320, bonus: 0, price: 236000 },
  { id: "1800", uc: 1800, base: 1800, bonus: 0, price: 300000 },
  { id: "2125", uc: 2125, base: 2125, bonus: 0, price: 360000 },
  { id: "2460", uc: 2460, base: 2460, bonus: 0, price: 418000 },
  { id: "3850", uc: 3850, base: 3850, bonus: 0, price: 575000, badge: "Foydali" },
  { id: "4175", uc: 4175, base: 4175, bonus: 0, price: 635000 },
  { id: "4510", uc: 4510, base: 4510, bonus: 0, price: 693000 },
  { id: "5650", uc: 5650, base: 5650, bonus: 0, price: 875000 },
  { id: "8100", uc: 8100, base: 8100, bonus: 0, price: 1125000 },
  { id: "9900", uc: 9900, base: 9900, bonus: 0, price: 1425000 },
  { id: "11950", uc: 11950, base: 11950, bonus: 0, price: 1700000 },
  { id: "16200", uc: 16200, base: 16200, bonus: 0, price: 2240000 },
  { id: "20050", uc: 20050, base: 20050, bonus: 0, price: 2815000 },
  { id: "24300", uc: 24300, base: 24300, bonus: 0, price: 3360000 },
  { id: "32400", uc: 32400, base: 32400, bonus: 0, price: 4480000 },
  { id: "40500", uc: 40500, base: 40500, bonus: 0, price: 5600000 },
  { id: "48600", uc: 48600, base: 48600, bonus: 0, price: 6720000 },
  { id: "56700", uc: 56700, base: 56700, bonus: 0, price: 7840000 },
];

export const fmt = (n: number) => n.toLocaleString("en-US").replace(/,/g, " ");

export const FAQ = [
  { q: "UC qancha vaqtda tushadi?", a: "Buyurtma tasdiqlangach, UC odatda 1-5 daqiqa ichida hisobingizga tushadi. Xizmat 24/7 ishlaydi." },
  { q: "Hisobim xavfsizmi? Parol kerakmi?", a: "Parol umuman kerak emas. Faqat PUBG Mobile ID raqamingiz yetarli, shuning uchun hisobingiz to'liq xavfsiz." },
  { q: "To'lov va aloqa qanday amalga oshadi?", a: "Buyurtmadan so'ng ko'rsatilgan Gmail manzilingizga to'lov bo'yicha ko'rsatma va tasdiq xabari yuboriladi." },
  { q: "Muammo bo'lsa kimga murojaat qilaman?", a: "Buyurtma raqamingiz (masalan, #FUC-8492) bilan Gmail orqali yozing yoki Telegram'dagi qo'llab-quvvatlash xizmatiga murojaat qiling. Biz tezda javob beramiz." },
];
