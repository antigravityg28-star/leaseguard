// =============================================================================
// LEASEGUARD B2B - Generatore Lettere & PEC Legali Dashboard Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LegalLetterGenerator } from "@/components/letters/legal-letter-generator";

export default async function LettersPage() {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Generatore Lettere Legali & PEC</h1>
          <p className="text-muted-foreground">
            Crea comunicazioni formali con valore legale: contestazione ISTAT, disdette 6+6, diffide per manutenzioni e svincolo depositi.
          </p>
        </div>
        <LegalLetterGenerator />
      </div>
    </DashboardLayout>
  );
}
