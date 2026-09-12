// =============================================================================
// LEASEGUARD B2B - Supabase SSR-Compliant Client Configuration
// =============================================================================
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hxgexpphftykeieviruc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ci4MAv6GQwPK2PhoFpFluQ_5NUb2z2M";

// Browser Client con salvataggio cookie per SSR
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
