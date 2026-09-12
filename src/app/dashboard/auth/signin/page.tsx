// =============================================================================
// LEASEGUARD B2B - Sign In Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { SignInForm } from "@/components/auth/signin-form";
import { Shield } from "lucide-react";

export default async function SignInPage() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/30 to-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md mb-3">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">LeaseGuard B2B</h1>
          <p className="text-muted-foreground text-sm mt-1">Accedi al tuo cruscotto aziendale</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
