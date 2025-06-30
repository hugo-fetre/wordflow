import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const LandingFooter = () => {
  return (
    <div className='landing--footer'>
        <Image src={"/logo/logo-full-white.png"} alt="Logo wordflow" width={150} height={25}></Image>
        <div className='column'>
            <Link href={'/legal'}>Mentions légales</Link>
            <Link href={'/legal'}>Conditions générales de vente</Link>
        </div>
    </div>
  )
}

export default LandingFooter