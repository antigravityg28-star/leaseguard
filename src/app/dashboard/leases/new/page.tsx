// =============================================================================
// LEASEGUARD B2B - New Lease Form Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeaseForm } from "@/components/leases/lease-form";

export default async function NewLeasePage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nuovo Contratto</h1>
          <p className="text-muted-foreground">
            Registra un nuovo locativo commerciale nel sistema.
          </p>
        </div>
        <LeaseForm />
      </div>
    </DashboardLayout>
  );
}
