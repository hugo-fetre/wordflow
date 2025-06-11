'use server'
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

if(process.env.STRIPE_TEST_SECRET_KEY === undefined){
    throw new Error("No Stripe key in .env")
}
let stripeKey = process.env.STRIPE_TEST_SECRET_KEY;
let defaultUrl = "http://localhost:3000"
if(process.env.ENV_MODE !== "DEV" && process.env.STRIPE_SECRET_KEY !== undefined){
    stripeKey = process.env.STRIPE_SECRET_KEY as string;
    defaultUrl = "https://www.wordflowseo.ai"
}

const stripe = new Stripe(stripeKey);

export async function POST(req: NextRequest){

  try {
    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'priceId Missing: can\'t know which product to checkout for' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId, // reçu dynamiquement du frontend
          quantity: 1,
        },
      ],
      return_url: `${defaultUrl}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ session: session.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}