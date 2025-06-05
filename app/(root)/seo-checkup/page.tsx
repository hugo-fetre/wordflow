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
  if(userId){
      const user = await getUserById(userId);
      workspaces = await getWorkspacesList(user._id);
      currentWorkspace = workspaces[0];
      workspaceId = currentWorkspace._id;
  }

  return (
    <div>
        <SEOAnalyzer></SEOAnalyzer>
        {userId && (
          <SideNav currentWorkspaceId={workspaceId}/>
        )}
        
    </div>    
  )
}

export default SeoCheckUpPage