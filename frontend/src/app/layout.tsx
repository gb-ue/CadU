import "./globals.css";
import { Ubuntu } from "next/font/google";
import type { Metadata } from "next";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "CadU",
  description: "calendário universitário",
  icons: "/logo.svg",
};

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang='pt-BR' className={ubuntu.className}>
      <body className="min-h-screen h-screen bg-[var(--background)]">
        {children}
      </body>
    </html>
  );
}
