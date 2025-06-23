'use server'

import { headers } from 'next/headers'
import Stripe from 'stripe'

if(process.env.STRIPE_TEST_SECRET_KEY === undefined){
    throw new Error("No Stripe key in .env")
}
let stripeKey = process.env.STRIPE_TEST_SECRET_KEY as string;
let defaultUrl = "http://localhost:3000"
if(process.env.ENV_MODE !== "DEV" && process.env.STRIPE_SECRET_KEY !== undefined){
    stripeKey = process.env.STRIPE_SECRET_KEY as string;
    defaultUrl = "https://www.wordflowseo.ai"
}

const stripe = new Stripe(stripeKey);

export async function fetchClientSecret(priceId: string, userId: string) {
  const origin = (await headers()).get('origin')

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: priceId,
        quantity: 1
      }
    ],
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    mode: 'subscription',
    subscription_data: {
        trial_period_days: 15,
    },
    client_reference_id: userId,
    return_url: `${origin}/payment_completed/{CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}

export async function cancelStripeSubscription(subscriptionId: string) {
  const canceled = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true, // Annulation à la période de fin
  });

  return canceled;
}

export async function reactivateStripeSubscription(subscriptionId: string) {
  const reactivated = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false, // Annulation à la période de fin: non
  });

  return reactivated;
}

export async function updateStripeSubscription(subscriptionId: string, newPriceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const currentItem = subscription.items.data[0].id; // Item = cycle de facturation (dans notre cas 1 par user, mais on pourrait en avoir plusieurs)

  const updatedSubsrciption = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: currentItem,
        price: newPriceId
      }
    ]
  })

  return updatedSubsrciption;
}