'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { LoadingDots } from '../ui/loadingdots'

const ClientRedirect = ({ to }: { to: string }) => {
  const router = useRouter()

  useEffect(() => {
    window.location.replace(to);
  }, [to])

  return (
    <div className='loading--wrapper'>
        <Image src={"/logo/rich-logo-full-black.png"} alt="Logo wordflow" width={200} height={50}></Image>
        <h1 className='t40px b40px'>Redirection en cours</h1>
        <LoadingDots color='#000' message=''/>
    </div>
  )
}

export default ClientRedirect
