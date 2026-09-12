// =============================================================================
// LEASEGUARD B2B - Leases List Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeaseList } from "@/components/leases/lease-list";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function LeasesPage() {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">I miei Locativi</h1>
            <p className="text-muted-foreground">
              Gestisci tutti i tuoi contratti di locazione commerciale.
            </p>
          </div>
          <Link
            href="/dashboard/leases/new"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Nuovo Locativo
          </Link>
        </div>
        <LeaseList />
      </div>
    </DashboardLayout>
  );
}
