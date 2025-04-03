import LogoComponent from '@/components/shared/logo'
import MainNav from '@/components/shared/nav'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <main className='root'>
            <div className='root-container'>
                <div className='wrapper'>
                    <SignedOut>
                        <header className="flex justify-end items-center p-4 gap-4 h-16">
                            <SignInButton>
                                <button className='secondaryButton'>Se connecter</button>
                            </SignInButton>
                            <SignUpButton>
                                <button className='secondaryButton'>S'inscrire</button>
                            </SignUpButton>
                        </header>
                    </SignedOut>
                    <LogoComponent/>
                    <div className='mainWindow'></div>
                    {children}
                    <MainNav />
                </div>
            </div>
        </main>
    )
}

export default Layout