// =============================================================================
// LEASEGUARD B2B - User Navigation (Sidebar Footer)
// =============================================================================
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    toast({ title: "Disconnesso", description: "Sei stato disconnesso correttamente." });
  };

  return (
    <div className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent text-left">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-[10px]">LG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start truncate">
            <span className="text-xs font-medium truncate">Account Azienda</span>
            <span className="text-[10px] text-muted-foreground truncate">Gestisci</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="text-xs font-medium">LeaseGuard Account</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            <Settings className="mr-2 h-3.5 w-3.5" />
            Impostazioni
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Esci
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
