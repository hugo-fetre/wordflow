"use server"
import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions'
import ChangePlanForm from '@/components/shared/change-plan'

const ChangePlanPage = async () => {

  const { userId } = await auth()
  let user_id = "";
  let currentPlan = 0;
  let subsriptionId = "";
  if(!userId){
    redirect('/auth-redirect');
  } else {
    const user = await getUserById(userId)
    user_id = user._id.toString();
    currentPlan = user.planId;
    subsriptionId = user.stripeSubsriptionId;
  }
  
  return (
    <div>
      <ChangePlanForm userId={user_id} planId={currentPlan} stripeSubsriptionId={subsriptionId}></ChangePlanForm>
    </div>
  )
}

export default ChangePlanPage