// =============================================================================
// LEASEGUARD B2B - API: Create Stripe Checkout Session
// =============================================================================
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { createClientServer } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy_key");

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    const supabase = await createClientServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    // Get or create Stripe customer
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
      .select("id, stripe_customer_id")
      .eq("id", profile.company_id)
      .single();

    let customerId = company?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("companies")
        .update({ stripe_customer_id: customerId })
        .eq("id", company?.id || profile.company_id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `LeaseGuard ${plan} - Abbonamento Mensile`,
              description: `Piano ${plan} - Gestione contratti di locazione commerciale`,
            },
            unit_amount: plan === "starter" ? 0 : plan === "professional" ? 4900 : 3900,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?canceled=true`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
