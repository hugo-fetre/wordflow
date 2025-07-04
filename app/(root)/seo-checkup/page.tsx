import SEOAnalyzer from '@/components/shared/seo_analyzer'
import React from 'react'
import { SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions'
import { getWorkspacesList } from '@/lib/actions/workspace.actions'
import { IWorkspace } from '@/lib/database/models/workspace.model'
import SideNav from '@/components/shared/sidenav'

const SeoCheckUpPage = async () => {

  const { userId }= await auth();
  var workspaces: IWorkspace[] = [];
  var currentWorkspace = undefined;
  var workspaceId = '';
  var userConnected = false;
  let isUserPro = false;
  if(userId){
      const user = await getUserById(userId);
      workspaces = await getWorkspacesList(user._id);
      currentWorkspace = workspaces[0];
      workspaceId = currentWorkspace._id;
      userConnected = true;
      if(user.planId > 1){
        isUserPro = true;
      }
      
  }

  return (
    <div>
        <a href="/"><Image src={"/logo/logo-full-white.png"} alt="Logo wordflow" width={200} height={32} className='absolute al5v at5v'></Image></a>
        <SEOAnalyzer userConnected={userConnected} isUserPro={isUserPro}></SEOAnalyzer>
        {userId && (
          <SideNav currentWorkspaceId={workspaceId}/>
        )}
        
    </div>    
  )
}

export default SeoCheckUpPage