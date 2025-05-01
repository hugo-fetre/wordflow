'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ClientRedirect = ({ to }: { to: string }) => {
  const router = useRouter()

  useEffect(() => {
    window.location.replace(to);
  }, [to])

  return <p>Redirection vers {to}...</p>
}

export default ClientRedirect
