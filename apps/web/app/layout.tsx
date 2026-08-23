import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KwanzaGo | Toca, paga, segue",
  description: "Protótipo da carteira digital KwanzaGo para pagamentos seguros nos táxis azuis e brancos.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "KwanzaGo | Toca, paga, segue",
    description: "Pagamentos simples, receita comprovada e liquidação controlada.",
    images: ["/kwanzago-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KwanzaGo | Toca, paga, segue",
    description: "Pagamentos simples, receita comprovada e liquidação controlada.",
    images: ["/kwanzago-og.png"],
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-AO"><body>{children}</body></html>;
}
