// =============================================================================
// LEASEGUARD B2B - Recent Leases Component
// =============================================================================
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const mockLeases = [
  { code: "LG-001", property: "Via Roma 123 - Negozio", city: "Roma", status: "active", endDate: "2028-06-30", rent: "€1.200" },
  { code: "LG-002", property: "Corso Italia 45 - Ristorante", city: "Milano", status: "expiring_soon", endDate: "2026-12-31", rent: "€2.800" },
  { code: "LG-003", property: "Piazza del Duomo 1 - Franchising", city: "Firenze", status: "active", endDate: "2030-03-15", rent: "€3.500" },
];

export function RecentLeases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>I tuoi Locativi Recenti</CardTitle>
        <CardDescription>Ultimi contratti registrati</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Codice</TableHead>
              <TableHead>Immobile</TableHead>
              <TableHead>Città</TableHead>
              <TableHead>Scadenza</TableHead>
              <TableHead>Canone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeases.map((lease) => (
              <TableRow key={lease.code}>
                <TableCell className="font-medium">{lease.code}</TableCell>
                <TableCell>{lease.property}</TableCell>
                <TableCell>{lease.city}</TableCell>
                <TableCell>{lease.endDate}</TableCell>
                <TableCell>{lease.rent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href="/dashboard/leases" className="text-primary text-sm hover:underline mt-4 inline-flex items-center">
          Vedi tutti <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
