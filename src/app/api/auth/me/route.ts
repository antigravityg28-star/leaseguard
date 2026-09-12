// =============================================================================
// LEASEGUARD B2B - API: Get Current User
// =============================================================================
import { NextResponse } from "next/server";
import { createClientServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, company_id, full_name, role")
    .eq("auth_user_id", user.id)
    .single();

  const { data: company } = await supabase
    .from("companies")
    .select("id, name, subscription_status, subscription_plan, max_leases")
    .eq("id", profile?.company_id)
    .single();

  return NextResponse.json({ user, profile, company });
}
