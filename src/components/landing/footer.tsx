// =============================================================================
// LEASEGUARD B2B - Professional Footer
// =============================================================================
import { Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12 px-4 sm:px-8 text-muted-foreground">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-foreground">LeaseGuard B2B</span>
          <span className="text-xs">· Tutela Locazioni Commerciali Italia</span>
        </div>

        <div className="flex flex-wrap gap-6 text-xs font-medium">
          <a href="#come-funziona" className="hover:text-foreground transition-colors">Come Funziona</a>
          <a href="#calcolatore" className="hover:text-foreground transition-colors">Calcolatore ISTAT</a>
          <a href="#funzionalita" className="hover:text-foreground transition-colors">Funzionalità</a>
          <a href="#prezzi" className="hover:text-foreground transition-colors">Prezzi</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <Link href="/dashboard/auth/signin" className="hover:text-foreground transition-colors">Area Riservata</Link>
        </div>

        <p className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} LeaseGuard B2B. Tutti i diritti riservati. Made with 🛡️ in Italia.
        </p>
      </div>
    </footer>
  );
}
