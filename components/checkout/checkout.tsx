'use client'
import React, { useEffect, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret } from '@/lib/actions/stripe.actions';

if(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY === undefined){
    throw new Error("No Stripe key in .env")
}
let stripeKey = process.env.NEXT_PUBLIC_STRIPE_TEST_KEY;
let defaultUrl = "http://localhost:3000"
if(process.env.ENV_MODE !== "DEV" && process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY !== undefined){
    stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
    defaultUrl = "https://www.wordflowseo.ai"
}

const stripePromise = loadStripe(stripeKey);

const Checkout = ({priceId, userId} : {priceId: string, userId: string}) => {
    
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    console.log(userId);
    useEffect(() => {
        fetchClientSecret(priceId, userId).then((secret) => {
        setClientSecret(secret);
        });
    }, [priceId]);

    if (!clientSecret) {
        return <div>Chargement du paiement...</div>;
    }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret}}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Checkout