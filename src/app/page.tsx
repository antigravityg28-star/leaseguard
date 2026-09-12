// =============================================================================
// LEASEGUARD B2B - Main Landing Page (Updated: 2026-09-12)
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "LeaseGuard B2B — Tutti i software aiutano il proprietario. Noi difendiamo chi paga l'affitto.",
  description: "La 1ª piattaforma in Italia per negozi, ristoranti e franchising. Monitoraggio disdette PEC 6+6, calcolo ISTAT FOI al 75% e recupero arretrati.",
};

export default async function HomePage() {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
