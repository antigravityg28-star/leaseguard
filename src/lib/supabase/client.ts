// =============================================================================
// LEASEGUARD B2B - Supabase Browser Client (@supabase/ssr)
// =============================================================================
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hxgexpphftykeieviruc.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ci4MAv6GQwPK2PhoFpFluQ_5NUb2z2M"
  );
}
