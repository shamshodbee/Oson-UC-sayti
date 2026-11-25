import type { Metadata } from "next";
import { Rajdhani, Manrope } from "next/font/google";
import "./globals.css";

const display = Rajdhani({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Oson UC — PUBG Mobile UC tezkor va arzon",
  description: "PUBG Mobile UC ni ID orqali 1-5 daqiqada oling. 24/7 xizmat, xavfsiz va ishonchli.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
