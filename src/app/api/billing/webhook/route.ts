// =============================================================================
// LEASEGUARD B2B - Stripe Webhook Handler (Automatic Subscription Sync)
// =============================================================================
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Stripe } from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Service role client to bypass RLS for webhook updates
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Fallback if webhook secret is not configured in local dev
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error("❌ Errore verifica firma Stripe webhook:", err.message);
    return NextResponse.json({ error: `Webhook signature error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      // 1. Cliente completa con successo il checkout
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const plan = session.metadata?.plan || "professional";

        if (customerId) {
          // Trova l'azienda associata al customer Stripe
          const { data: company } = await supabaseAdmin
            .from("companies")
            .select("id")
            .eq("stripe_customer_id", customerId)
            .single();

          if (company) {
            const maxLeases = plan === "enterprise" ? 999 : plan === "professional" ? 15 : 3;

            await supabaseAdmin
              .from("companies")
              .update({
                subscription_status: "active",
                subscription_plan: plan,
                max_leases: maxLeases,
                updated_at: new Date().toISOString(),
              })
              .eq("id", company.id);

            console.log(`✅ Abbonamento attivato per azienda ${company.id}: piano ${plan}`);
          }
        }
        break;
      }

      // 2. Pagamento ricorrente mensile/annuale riuscito
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        if (customerId) {
          await supabaseAdmin
            .from("companies")
            .update({
              subscription_status: "active",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }

      // 3. Pagamento fallito (carta scaduta o senza fondi)
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        if (customerId) {
          await supabaseAdmin
            .from("companies")
            .update({
              subscription_status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
          console.warn(`⚠️ Pagamento fallito per cliente ${customerId}`);
        }
        break;
      }

      // 4. Abbonamento cancellato o scaduto
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        if (customerId) {
          await supabaseAdmin
            .from("companies")
            .update({
              subscription_status: "canceled",
              subscription_plan: "starter",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
          console.log(`🛑 Abbonamento cancellato per cliente ${customerId}`);
        }
        break;
      }

      default:
        // Evento non gestito esplicitamente
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Errore elaborazione evento Stripe:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
