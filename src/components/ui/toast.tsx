"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          error: "bg-destructive text-destructive-foreground",
          success: "bg-primary text-primary-foreground",
        },
      }}
    />
  );
}
