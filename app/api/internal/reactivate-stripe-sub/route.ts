// app/api/stripe/cancel-subscription/route.ts

import { NextResponse } from 'next/server'
import { reactivateStripeSubscription } from '@/lib/actions/stripe.actions' // ou l'endroit où tu l’as définie

export async function POST(req: Request) {
  const { subscriptionId } = await req.json()

  try {
    await reactivateStripeSubscription(subscriptionId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 })
  }
}
