"use server"
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import User from '@/lib/database/models/user.model'
import NewUserPlanSelection from '@/components/shared/new_user_plan_selection'
import { checkUser } from '@/lib/actions/user.actions'

const CreditsPage = async () => {

  const user = await checkUser();
  let user_id = "";

  if(user === false){
    redirect('/auth-redirect');
  } else {
    user_id = user._id.toString();
    if(user.isActive === true){
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