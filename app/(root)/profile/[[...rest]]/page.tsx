import SideNav from '@/components/shared/sidenav'
import { getUserById } from '@/lib/actions/user.actions';
import { getWorkspacesList } from '@/lib/actions/workspace.actions';
import { IWorkspace } from '@/lib/database/models/workspace.model';
import { PricingTable, UserProfile } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const ProfilePage = async () => {
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
      <SideNav currentWorkspaceId={workspaceId}/>
      <div className='profileWrapper'>
        <UserProfile 
          routing="path" 
          path="/profile" 
          appearance={{
            elements: {
              // Cible la carte principale du composant
              scrollBox: {
                background: "rgba(255,255,255,1)",
              },
              cardBox: {
                height: "70vh"
              }
            },
          }}
        />
      </div>
    </div>
  )
}

export default ProfilePage