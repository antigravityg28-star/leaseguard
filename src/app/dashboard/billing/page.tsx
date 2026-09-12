// =============================================================================
// LEASEGUARD B2B - Billing Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BillingOverview } from "@/components/billing/billing-overview";

export default async function BillingPage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fatturazione</h1>
          <p className="text-muted-foreground">
            Gestisci il tuo piano di abbonamento e i pagamenti.
          </p>
        </div>
        <BillingOverview />
      </div>
    </DashboardLayout>
  );
}
