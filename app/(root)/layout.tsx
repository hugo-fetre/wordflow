import LogoComponent from '@/components/shared/logo'
import MainNav from '@/components/shared/nav'
import { getUserById } from '@/lib/actions/user.actions'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {

    const { userId }= await auth();
    var user = null;
    var selected_workspace = null;
    if(userId) {
    user = await getUserById(userId);
    console.log(user);
    }

    return(
        <main className='root'>
            <div className='root-container'>
                <div className='wrapper'>
                    <SignedOut>
                        <header className="flex justify-end items-center p-4 gap-4 h-16">
                            <SignInButton forceRedirectUrl={'/'}>
                                <button className='secondaryButton'>Se connecter</button>
                            </SignInButton>
                            <SignUpButton forceRedirectUrl={'/'}>
                                <button className='secondaryButton'>S'inscrire</button>
                            </SignUpButton>
                        </header>
                    </SignedOut>
                    <LogoComponent/>
                    <div className='mainWindow'>
                        {children}
                    </div>
                    <MainNav />
                </div>
            </div>
        </main>
    )
}

export default Layout