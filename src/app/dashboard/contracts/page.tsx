// =============================================================================
// LEASEGUARD B2B - Contracts Management Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeaseList } from "@/components/leases/lease-list";
import { CriticalDates } from "@/components/dashboard/critical-dates";

export default async function ContractsPage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scadenze & Contratti</h1>
          <p className="text-muted-foreground">
            Monitoraggio scadenze vincolanti, finestre di disdetta PEC e calcolo ISTAT.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <CriticalDates />
          <LeaseList />
        </div>
      </div>
    </DashboardLayout>
  );
}
