// =============================================================================
// LEASEGUARD B2B - Sidebar Provider & Navigation Context
// =============================================================================
"use client";

import * as React from "react";
import { useState } from "react";
import { NavMain } from "@/components/layout/nav-main";
import { UserNav } from "@/components/layout/user-nav";
import { Logo } from "@/components/layout/logo";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
});

export function useSidebar() {
  return React.useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      <div className="flex min-h-screen">
        <aside className={`border-r bg-card flex flex-col transition-all duration-200 ${isOpen ? "w-64" : "w-16"}`}>
          <div className="border-b">
            <Logo />
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavMain />
          </div>
          <div className="border-t">
            <UserNav />
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </SidebarContext.Provider>
  );
}
