"use server"
import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import User from '@/lib/database/models/user.model'
import NewUserPlanSelection from '@/components/shared/new_user_plan_selection'

const CreditsPage = async () => {

  const { userId }= await auth();

  let user_id = "";
  if(!userId){
    redirect('/auth-redirect');
  } else {
    const user = await User.findOne({ clerkId: userId });
    user_id = user._id.toString();
    if(user.isActive == true){
      redirect('/auth-redirect');
    }
  }

  return (
    <div>
      <NewUserPlanSelection userId={user_id}></NewUserPlanSelection>
    </div>
  )
}

export default CreditsPage