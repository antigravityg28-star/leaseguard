// =============================================================================
// LEASEGUARD B2B - Root Layout (Hydration Safe & Responsive)
// =============================================================================
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeaseGuard B2B — Gestione Contratti di Locazione Commerciale & Scudo ISTAT",
  description: "Proteggi i tuoi negozi, ristoranti e franchising. Monitoraggio scadenze disdette PEC a 6/12 mesi, calcolo automatico ISTAT FOI 75% e tutela contrattuale completa.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
