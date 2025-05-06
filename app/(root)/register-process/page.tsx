"use client"
import { checkUser } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const RegisterProcesspage = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const isUserCreated = await checkUser()
            if (isUserCreated) {
              router.push(`/select-plan`);
            } else {
              setTimeout(fetchUser, 1000)
            }
          } catch (err) {
            console.error("Erreur récupération user", err)
          }
        }
    
        fetchUser()
    }, [])

    return (
        <div className='loader--register'>Porecessing register...</div>
    )
}

export default RegisterProcesspage