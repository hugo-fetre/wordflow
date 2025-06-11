import { SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <SignIn 
      appearance={{
        elements: {
          rootBox: {
          width: "60%",
          maxWidth: "none", // utile pour éviter qu'un max-width par défaut réduise la carte
          background: "#fff",
        },
        cardBox: {
          width: "100%",
          height: "95vh",
          maxWidth: "none", // utile pour éviter qu'un max-width par défaut réduise la carte
          boxShadow: "none",
        },
        card: {
          width: "100%",
          maxWidth: "none", // utile pour éviter qu'un max-width par défaut réduise la carte
          border: "none",
          boxShadow: "none",
        },
        footer: {
          background: "#fff"
        }
      },
      }}
    />
  )
}

export default SignInPage