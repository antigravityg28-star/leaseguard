// =============================================================================
// LEASEGUARD B2B - Lease Edit Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeaseEditForm } from "@/components/leases/lease-edit-form";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeaseEditPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/dashboard/auth/signin");
  }

  const { data: lease } = await supabase
    .from("leases")
    .select("*")
    .eq("id", id)
    .single();

  if (!lease) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <p className="text-muted-foreground">Contratto non trovato.</p>
          <Link
            href="/dashboard/leases"
            className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
          >
            Torna ai Locativi
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Modifica Contratto</h1>
          <p className="text-muted-foreground">
            Aggiorna i dati contrattuali di {lease.property_name} ({lease.code}).
          </p>
        </div>
        <LeaseEditForm lease={lease} />
      </div>
    </DashboardLayout>
  );
}
