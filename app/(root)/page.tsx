import BusinessInfoForm from '@/components/shared/business_info_form'
import { getUserById } from '@/lib/actions/user.actions'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import React from 'react'

const Home = async () => {

    return (
    <div>
      <BusinessInfoForm/>
    </div>
  )
}

export default Home