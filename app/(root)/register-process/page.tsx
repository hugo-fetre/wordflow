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
        <div className='loader--register'>Porecessing register...</div>
    )
}

export default RegisterProcesspage