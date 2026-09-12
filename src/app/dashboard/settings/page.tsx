// =============================================================================
// LEASEGUARD B2B - Settings Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CompanySettings } from "@/components/settings/company-settings";

export default async function SettingsPage() {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Impostazioni</h1>
          <p className="text-muted-foreground">
            Gestisci il tuo profilo e le preferenze del tuo account.
          </p>
        </div>
        <CompanySettings />
      </div>
    </DashboardLayout>
  );
}
