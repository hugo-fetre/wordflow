import Checkout from '@/components/checkout/checkout'
import { prices } from '@/constants'
import User from '@/lib/database/models/user.model';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'


const page = async ({params}: { params: Promise<{ plan_type: string, user_id: string }> }) => {

  const { plan_type, user_id } = await params;
  
  if(!user_id){
    redirect('/auth-redirect');
  } 
  if(!(plan_type == "pro" || plan_type == "light")){
    redirect('/auth-redirect');
  }

  let priceId = prices[0].pro;
  if(plan_type == "light"){
    priceId = prices[0].light;
  }
  return (
    <div>
      <Checkout priceId={priceId} userId={user_id}></Checkout>
    </div>
  )
}

export default page