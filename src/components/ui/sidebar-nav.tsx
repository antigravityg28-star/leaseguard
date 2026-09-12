// =============================================================================
// LEASEGUARD B2B - Sidebar Nav Item Component
// =============================================================================
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
  badge?: string;
}

export function NavItem({ title, url, icon: Icon, isActive, badge }: NavItemProps) {
  const pathname = usePathname();
  const active = isActive || pathname === url;

  return (
    <Link
      href={url}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="truncate">{title}</span>
      {badge && <span className="ml-auto text-[10px]">{badge}</span>}
    </Link>
  );
}
