// =============================================================================
// LEASEGUARD B2B - Lease List Table Component
// =============================================================================
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Search, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

type Lease = {
  id: string;
  code: string;
  property_name: string;
  property_address: string;
  property_city: string;
  property_type: string;
  lease_start_date: string;
  lease_end_date: string;
  base_rent_monthly: number;
  current_status: string;
};

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  expiring_soon: "bg-yellow-500",
  expired: "bg-red-500",
  terminated: "bg-gray-500",
  renewed: "bg-blue-500",
  cancelled: "bg-gray-400",
};

export function LeaseList() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const { data: leases, isLoading, error } = useQuery({
    queryKey: ["leases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leases")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lease[];
    },
  });

  if (isLoading) return <div className="text-center py-8">Caricamento...</div>;
  if (error) {
    toast({ title: "Errore", description: "Impossibile caricare i locativi.", variant: "destructive" });
    return <div className="text-center py-8 text-destructive">Errore di caricamento</div>;
  }

  const filtered = (leases || []).filter(
    (l) =>
      l.property_name.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.property_city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Elenco Locativi</CardTitle>
        <CardDescription>Tutti i tuoi contratti registrati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome, codice o città..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Codice</TableHead>
              <TableHead>Immobile</TableHead>
              <TableHead>Città</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Canone</TableHead>
              <TableHead>Scadenza</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nessun locativo registrato. Crea il tuo primo contratto!
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((lease) => (
                <TableRow key={lease.id}>
                  <TableCell className="font-medium">{lease.code}</TableCell>
                  <TableCell>{lease.property_name}</TableCell>
                  <TableCell>{lease.property_city}</TableCell>
                  <TableCell>{lease.property_type}</TableCell>
                  <TableCell>{formatCurrency(lease.base_rent_monthly)}/mese</TableCell>
                  <TableCell>{format(new Date(lease.lease_end_date), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[lease.current_status]} text-white`}>
                      {lease.current_status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/leases/${lease.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href={`/dashboard/leases/${lease.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
