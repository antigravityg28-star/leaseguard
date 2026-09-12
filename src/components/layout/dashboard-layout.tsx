// =============================================================================
// LEASEGUARD B2B - Dashboard Layout Wrapper
// =============================================================================
"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/layout/sidebar-provider";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicPath = pathname === "/" || pathname.startsWith("/dashboard/auth");

  if (isPublicPath) return <>{children}</>;

  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}
