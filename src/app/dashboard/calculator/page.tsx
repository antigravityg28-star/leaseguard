// =============================================================================
// LEASEGUARD B2B - Calcolatore ISTAT Dashboard Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { IstatCalculatorTool } from "@/components/calculator/istat-calculator-tool";

export default async function CalculatorPage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calcolatore & Scudo ISTAT FOI</h1>
          <p className="text-muted-foreground">
            Verifica la legittimità degli aumenti applicati dai locatori e calcola gli arretrati recuperabili ex lege 392/78.
          </p>
        </div>
        <IstatCalculatorTool />
      </div>
    </DashboardLayout>
  );
}
