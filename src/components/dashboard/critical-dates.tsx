// =============================================================================
// LEASEGUARD B2B - Critical Dates Component
// =============================================================================
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CalendarClock } from "lucide-react";
import { format } from "date-fns";

export function CriticalDates() {
  const criticalDates = [
    { label: "Disdetta PEC - Corso Italia 45", date: "2026-10-31", overdue: false, leaseCode: "LG-002" },
    { label: "Rinnovo automatico - Piazza Duomo 1", date: "2027-03-15", overdue: false, leaseCode: "LG-003" },
    { label: "Adeguamento ISTAT 2026", date: "2026-09-30", overdue: true, leaseCode: "LG-002" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Scadenze Critiche
        </CardTitle>
        <CardDescription>Prossime attività importanti</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalDates.map((item) => (
            <div key={item.leaseCode + item.date} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.leaseCode}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${item.overdue ? "text-destructive" : ""}`}>
                  {format(new Date(item.date), "dd/MM/yyyy")}
                </p>
                {item.overdue && <span className="text-[10px] text-destructive">Scaduto!</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
