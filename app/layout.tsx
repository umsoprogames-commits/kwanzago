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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className="scroll-smooth">
      <head>
        <meta name="codex-preview" content="development" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden text-body-lg font-sans relative bg-surface-bright">
        {children}
      </body>
    </html>
  );
}
