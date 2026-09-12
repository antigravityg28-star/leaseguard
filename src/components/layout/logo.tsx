// =============================================================================
// LEASEGUARD B2B - Logo Component
// =============================================================================
import { Shield } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Shield className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight">LeaseGuard</span>
        <span className="text-[10px] text-muted-foreground">B2B Premium</span>
      </div>
    </div>
  );
}
