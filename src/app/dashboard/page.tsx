// =============================================================================
// LEASEGUARD B2B - Dashboard Home Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentLeases } from "@/components/dashboard/recent-leases";
import { CriticalDates } from "@/components/dashboard/critical-dates";
import { OnboardingBanner } from "@/components/dashboard/onboarding-banner";

export default async function DashboardPage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Benvenuto nel tuo cruscotto LeaseGuard B2B. Monitora i tuoi affitti commerciali.
          </p>
        </div>
        <OnboardingBanner />
        <StatsCards />
        <div className="grid gap-6 sm:grid-cols-2">
          <RecentLeases />
          <CriticalDates />
        </div>
      </div>
    </DashboardLayout>
  );
}
