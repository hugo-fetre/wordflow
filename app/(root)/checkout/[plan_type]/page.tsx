import Checkout from '@/components/checkout/checkout'
import { prices } from '@/constants'
import User from '@/lib/database/models/user.model';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'


const page = async ({params}: { params: Promise<{ plan_type: string }> }) => {

  const { userId }= await auth();
  const { plan_type } = await params;
  
  let user_id = "";
  if(!userId){
    redirect('/auth-redirect');
  } else {
    const user = await User.findOne({ clerkId: userId });
    user_id = user._id.toString();
  }
  
  console.log(plan_type);

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