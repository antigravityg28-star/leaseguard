// =============================================================================
// LEASEGUARD B2B - Dashboard Layout Wrapper
// =============================================================================
"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/layout/sidebar-provider";
import { Sidebar } from "@/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicPath = pathname === "/" || pathname.startsWith("/dashboard/auth");

  if (isPublicPath) return <>{children}</>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-auto bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
