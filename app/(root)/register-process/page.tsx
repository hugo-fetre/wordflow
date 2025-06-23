"use client"
import { LoadingDots } from '@/components/ui/loadingdots'
import { checkUser } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const RegisterProcesspage = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await checkUser()
            if (user !== false) {
              router.push(`/select-plan`);
            } else {
              setTimeout(fetchUser, 2000)
            }
          } catch (err) {
            console.error("Erreur récupération user", err)
          }
        }
    
        fetchUser()
    }, [])

    return (
        <div className='loading--wrapper'>
            <Image src={"/logo/rich-logo-full-black.png"} alt="Logo wordflow" width={200} height={50}></Image>
            <h1 className='t40px b40px'>Votre profil est en cours de création</h1>
            <LoadingDots color='#000' message=''/>
        </div>
    )
}

export default RegisterProcesspage