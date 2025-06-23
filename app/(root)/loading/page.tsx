"use client"
import LogoComponent from '@/components/shared/logo'
import { LoadingDots } from '@/components/ui/loadingdots'
import Image from 'next/image'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='loading--wrapper'>
        <Image src={"/logo/rich-logo-full-black.png"} alt="Logo wordflow" width={200} height={50}></Image>
        <h1 className='t40px b40px'>Votre profil est en cours de création</h1>
        <LoadingDots color='#000' message=''/>
    </div>
  )
}

export default LoadingPage