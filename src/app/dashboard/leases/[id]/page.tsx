// =============================================================================
// LEASEGUARD B2B - Lease Detail Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, calculateISTATAdeguamento } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, Building2, Calendar, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeaseDetailPage({ params }: PageProps) {
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

  const istatCalc = calculateISTATAdeguamento(
    Number(lease.base_rent_monthly),
    lease.base_index_year || 2024,
    2026,
    lease.index_percentage || 75
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/leases"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{lease.property_name}</h1>
                <Badge variant="outline">{lease.code}</Badge>
              </div>
              <p className="text-muted-foreground">{lease.property_address}, {lease.property_city}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/leases/${lease.id}/edit`}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
            >
              Modifica
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card Canone & ISTAT */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                Canone Mensile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold">{formatCurrency(lease.base_rent_monthly)}</div>
              <div className="rounded-lg bg-muted p-3 text-xs space-y-1">
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Adeguamento ISTAT FOI (75%)
                </p>
                <p className="text-muted-foreground">
                  Nuovo canone calcolato 2026: <strong className="text-foreground">{formatCurrency(istatCalc.adjustedRent)}</strong>
                </p>
                <p className="text-muted-foreground">
                  Aumento previsto: +{formatCurrency(istatCalc.increase)}/mese ({istatCalc.increasePercent.toFixed(2)}%)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card Scadenze */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                Date Chiave Contratto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Inizio:</span>
                <span className="font-medium">{format(new Date(lease.lease_start_date), "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Scadenza:</span>
                <span className="font-medium">
                  {lease.lease_end_date ? format(new Date(lease.lease_end_date), "dd/MM/yyyy") : "A tempo indet."}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Preavviso PEC:</span>
                <span className="font-medium text-destructive">{lease.notice_period_months || 6} mesi prima</span>
              </div>
            </CardContent>
          </Card>

          {/* Card Locatore */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4 text-primary" />
                Dati Locatore / Proprietario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{lease.landlord_name || "Non specificato"}</p>
              <p className="text-xs text-muted-foreground">{lease.landlord_address || "Indirizzo non inserito"}</p>
              {lease.landlord_pec && (
                <p className="text-xs font-mono bg-muted p-1 rounded inline-block">
                  PEC: {lease.landlord_pec}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
