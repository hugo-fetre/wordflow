import LogoComponent from '@/components/shared/logo'
import { SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import React from 'react'

const Home = async () => {    
    
    const { userId }= await auth();
    if(userId){
        redirect('/auth-redirect');
    }
    /*var workspaces: IWorkspace[] = [];
    var currentWorkspace = undefined;
    if(userId){
        const user = await getUserById(userId);
        workspaces = await getWorkspacesList(user._id);
        currentWorkspace = workspaces[0]; //workspaces.find(w => w.publicId === params.workspaceId);
        console.log("Home page: workspaces loaded, try to redirect");
        window.location.replace('/app/'+currentWorkspace._id);
    }*/
    
    return (
    <div>
        
        <SignedOut>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
                <SignInButton forceRedirectUrl={'/auth-redirect'}>
                    <button className='secondaryButton'>Se connecter</button>
                </SignInButton>
                <SignUpButton forceRedirectUrl={'/register-process'}>
                    <button className='secondaryButton'>S'inscrire</button>
                </SignUpButton>
            </header>
        </SignedOut>
        <LogoComponent/>
    </div>
  )
}

export default Home