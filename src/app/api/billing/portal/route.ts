// =============================================================================
// LEASEGUARD B2B - API: Create Stripe Customer Portal Session
// =============================================================================
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { createClientServer } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST() {
  try {
    const supabase = await createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("auth_user_id", user.id)
      .single();

    if (!profile?.company_id) {
      return NextResponse.json({ error: "Profilo azienda non trovato" }, { status: 400 });
    }

    const { data: company } = await supabase
      .from("companies")
      .select("stripe_customer_id")
      .eq("id", profile.company_id)
      .single();

    if (!company?.stripe_customer_id) {
      return NextResponse.json({ error: "Nessun account di pagamento Stripe trovato." }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: company.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
