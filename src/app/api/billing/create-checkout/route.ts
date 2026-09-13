// =============================================================================
// LEASEGUARD B2B - API: Create Stripe Checkout Session (Live Ready)
// =============================================================================
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { createClientServer } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: Request) {
  try {
    const { plan = "professional", isAnnual = false } = await req.json();

    const supabase = await createClientServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autenticato. Effettua il login per procedere." }, { status: 401 });
    }

    // Recupera il profilo dell'utente
    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("auth_user_id", user.id)
      .single();

    if (!profile?.company_id) {
      return NextResponse.json({ error: "Profilo azienda non trovato." }, { status: 400 });
    }

    const { data: company } = await supabase
      .from("companies")
      .select("id, name, stripe_customer_id")
      .eq("id", profile.company_id)
      .single();

    let customerId = company?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: company?.name || undefined,
        metadata: {
          supabase_user_id: user.id,
          company_id: company?.id || profile.company_id,
        },
      });
      customerId = customer.id;

      await supabase
        .from("companies")
        .update({ stripe_customer_id: customerId })
        .eq("id", company?.id || profile.company_id);
    }

    // Calcolo del prezzo in base al piano scelto (in centesimi di euro)
    let unitAmount = 4900; // Default Professional €49/mese
    let productName = "LeaseGuard Professional";
    let productDesc = "Gestione completa fino a 15 locativi commerciali con alert e PEC.";
    let trialDays: number | undefined = undefined;

    if (plan === "starter") {
      unitAmount = isAnnual ? 2400 : 2900; // €29/mese (o €24/m annuale)
      productName = "LeaseGuard Starter";
      productDesc = "Monitoraggio fino a 3 locativi con 14 giorni di prova gratuita.";
      trialDays = 14;
    } else if (plan === "enterprise") {
      unitAmount = isAnnual ? 7900 : 9900; // €99/mese (o €79/m annuale)
      productName = "LeaseGuard Enterprise";
      productDesc = "Locativi commerciali illimitati, multi-utente e consulenza dedicata.";
    } else {
      // Professional
      unitAmount = isAnnual ? 3900 : 4900; // €49/mese (o €39/m annuale)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${productName} (${isAnnual ? "Annuale" : "Mensile"})`,
              description: productDesc,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: isAnnual ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: trialDays ? { trial_period_days: trialDays } : undefined,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      tax_id_collection: { enabled: true }, // Raccoglie P.IVA / Codice Fiscale del cliente per fattura
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://leaseguard-nu.vercel.app"}/dashboard?payment=success&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://leaseguard-nu.vercel.app"}/dashboard/billing?payment=canceled`,
      metadata: {
        plan,
        company_id: company?.id || profile.company_id,
        user_id: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Errore creazione sessione Stripe Checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
