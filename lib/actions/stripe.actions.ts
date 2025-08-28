'use server'

import { headers } from 'next/headers'
import Stripe from 'stripe'
import { hasBeenSuspended } from './user.actions';

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
  const userSuspended = await hasBeenSuspended(userId);
  const subscriptionData: any = {};
  if (!userSuspended) {
    subscriptionData.trial_period_days = 15;
  }

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
    subscription_data: subscriptionData,
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
    ],
    proration_behavior: "create_prorations"
  })

  return JSON.parse(JSON.stringify(updatedSubsrciption));
}

export async function deleteStripeCustomer(customerId: string) {
  const deleted = await stripe.customers.del(customerId)
  return deleted // retourne { id, deleted: true }
}