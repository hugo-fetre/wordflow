import SEOAnalyzer from '@/components/shared/seo_analyzer'
import React from 'react'
import { SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

const SeoCheckUpPage = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 gap-4 h-16">
        <Image src={"/logo.png"} alt="Logo wordflow" width={200} height={32}></Image>
        <SignedOut>
            <div className='flex gap-4'>
                <SignInButton forceRedirectUrl={'/auth-redirect'}>
                    <button className='outlineWhite'>Se connecter</button>
                </SignInButton>
                <SignUpButton forceRedirectUrl={'/register-process'}>
                    <button className='outlineWhite'>S'inscrire</button>
                </SignUpButton>
            </div>
        </SignedOut>
      </header>
        <SEOAnalyzer></SEOAnalyzer>
    </div>    
  )
}

export default SeoCheckUpPage