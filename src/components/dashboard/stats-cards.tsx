// =============================================================================
// LEASEGUARD B2B - Dashboard Stats Cards
// =============================================================================
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, AlertTriangle, CalendarClock, DollarSign } from "lucide-react";

export function StatsCards() {
  const stats = [
    { title: "Locativi Attivi", value: "5", icon: Building2, description: "Totali registrati" },
    { title: "Scadenze Imminenti", value: "3", icon: AlertTriangle, description: "Prossimi 90 giorni" },
    { title: "Canoni mensili", value: "€4.580", icon: DollarSign, description: "Affitto medio mensile" },
    { title: "Adeguamenti ISTAT", value: "€650", icon: CalendarClock, description: "Risparmi stimati 2026" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
