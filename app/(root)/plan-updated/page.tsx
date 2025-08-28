import { ArrowRight, CircleCheckBig } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const PlanUpdatedPage = () => {
  return (
    <div className='suspendedPage'>
        <Image src={"/logo/logo-full-white.png"} alt="Logo wordflow" width={200} height={50} className='topLogo'></Image>
        <h1 className=''>Votre abonnement a été mis à jour avec succès !</h1>
        <p className='mainSub'>Vous êtes prêts pour explorer de nouveaux horizons !</p>
        <Link href={"/"} className='mainCTA'><span>Continuer</span><ArrowRight size={20} color='#fff'/></Link>
    </div>
  )
}

export default PlanUpdatedPage