import BusinessInfoForm from '@/components/shared/business_info_form'
import LogoComponent from '@/components/shared/logo'
import { getUserById } from '@/lib/actions/user.actions'
import { getWorkspacesList } from '@/lib/actions/workspace.actions'
import { IWorkspace } from '@/lib/database/models/workspace.model'
import { SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import React from 'react'

const Home = async () => {
    
    const { userId }= await auth();
        
    var workspaces: IWorkspace[] = [];
    var currentWorkspace = undefined;
    if(userId){
        const user = await getUserById(userId);
        workspaces = await getWorkspacesList(user._id);
        currentWorkspace = workspaces[0]; //workspaces.find(w => w.publicId === params.workspaceId);
        redirect('/app/'+workspaces[0]._id);
    }
    return (
    <div>
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
    </div>
  )
}

export default Home