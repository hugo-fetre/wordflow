import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.actions'

const AccessSuspendedPage = async () => {

  const { userId } = await auth()
  let user_id = "";
  if(userId){
    const user = await getUserById(userId)
    user_id = user._id.toString();
    if(user.isActive === true){
      redirect('/auth-redirect');
    }
  }

  return (
    <div className='suspendedPage'>
        <Image src={"/logo/logo-full-white.png"} alt="Logo wordflow" width={200} height={50} className='topLogo'></Image>
        <h1 className=''>Votre compte est suspendu</h1>
        <p className='mainSub'>Vous avez annulé votre abonnement ou un paiement a été refusé.</p>
        <Link href={"/select-plan"} className='mainCTA'><span>Réactiver maintenant</span><ArrowRight size={20} color='#fff'/></Link>
    </div>
  )
}

export default AccessSuspendedPage