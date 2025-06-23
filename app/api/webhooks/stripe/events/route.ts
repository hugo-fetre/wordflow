//app/api/webhooks/stripe/events/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { blockUserAccess, findUserByStripeCustomerId, updateUserSubscription } from '@/lib/actions/user.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET! as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error('Erreur signature webhook :', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id as string;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      const updatedUserData: updateUserSubscriptionParams = {
        stripeCustomerId: customerId,
        stripeSubsriptionId: subscriptionId,
        isActive: true,
      }

      const res = await updateUserSubscription(userId, updatedUserData);

      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      console.warn('⚠️ Paiement échoué pour customer :', customerId);

      // Optionnel : gère l'échec (notifie, désactive l’accès, etc.)
      break;
    }

    // voir si c'est utile ici ou utiliser en local
    case 'customer.subscription.deleted' : {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const user = await findUserByStripeCustomerId(customerId);

      if (user) {
        const cancelData: blockUserAccessParams = {
          isActive: false,
          planId: 0,
          isCancelPlanned: false,
        }
        await blockUserAccess(user._id, cancelData);
      }
      break;
    }

    // Ajoute d’autres cas si besoin
    default:
      console.log(`🔔 Événement reçu : ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
