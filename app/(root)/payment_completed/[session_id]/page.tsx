import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const PaymentCompleted = () => {
  return (
    <div className='suspendedPage'>
          <Image src={"/logo/logo-full-white.png"} alt="Logo wordflow" width={200} height={50} className='topLogo'></Image>
          <h1 className=''>Paiement confirmé</h1>
          <p className='mainSub'>Vous êtes prêts pour conquérir le web !</p>
          <Link href={"/"} className='mainCTA'><span>Continuer</span><ArrowRight size={20} color='#fff'/></Link>
      </div>
  )
}

export default PaymentCompleted