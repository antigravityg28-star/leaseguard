// =============================================================================
// LEASEGUARD B2B - Navigation Menu
// =============================================================================
"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Building2,
  CalendarClock,
  FileText,
  AlertTriangle,
  CreditCard,
  Settings,
  LogOut,
  PieChart,
  Plus,
  Scale,
  MailCheck,
} from "lucide-react";
import { NavItem } from "@/components/layout/sidebar-nav";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function NavMain() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [signingOut, setSigningOut] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: pathname === "/dashboard",
    },
    {
      title: "I miei Locativi",
      url: "/dashboard/leases",
      icon: Building2,
      isActive: pathname.startsWith("/dashboard/leases"),
    },
    {
      title: "Scadenze Contratti",
      url: "/dashboard/contracts",
      icon: CalendarClock,
      isActive: pathname.startsWith("/dashboard/contracts"),
    },
    {
      title: "Calcolatore ISTAT",
      url: "/dashboard/calculator",
      icon: Scale,
      isActive: pathname.startsWith("/dashboard/calculator"),
    },
    {
      title: "Generatore PEC",
      url: "/dashboard/letters",
      icon: MailCheck,
      isActive: pathname.startsWith("/dashboard/letters"),
    },
    {
      title: "Fatturazione",
      url: "/dashboard/billing",
      icon: CreditCard,
      isActive: pathname.startsWith("/dashboard/billing"),
    },
    {
      title: "Impostazioni",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: pathname.startsWith("/dashboard/settings"),
    },
  ];

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
      toast({ title: "Disconnesso", description: "Sei stato disconnesso correttamente." });
    } catch (error) {
      toast({ title: "Errore", description: "Impossibile disconnettersi.", variant: "destructive" });
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <nav className="flex flex-col gap-1 p-2">
      <div className="mb-2 flex items-center justify-between px-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          Menu Principale
        </span>
        <a
          href="/dashboard/leases/new"
          className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Nuovo contratto"
        >
          <Plus className="h-4 w-4" />
        </a>
      </div>
      {navItems.map((item) => (
        <NavItem key={item.title} {...item} />
      ))}
      <div className="mt-auto pt-4 border-t">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          {signingOut ? "Disconnessione..." : "Esci"}
        </button>
      </div>
    </nav>
  );
}
