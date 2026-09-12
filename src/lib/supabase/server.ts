// =============================================================================
// LEASEGUARD B2B - Supabase Server Client (@supabase/ssr)
// =============================================================================
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClientServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Can happen in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Can happen in Server Components
          }
        },
      },
    }
  );
}
