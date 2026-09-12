// =============================================================================
// LEASEGUARD B2B - Sign Up Page
// =============================================================================
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabase/server";
import { SignUpForm } from "@/components/auth/signup-form";

export default async function SignUpPage() {
  const supabase = await createClientServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/30 to-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">LeaseGuard B2B</h1>
          <p className="text-muted-foreground mt-2">Crea il tuo account gratuito</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
