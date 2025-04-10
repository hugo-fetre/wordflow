import WorkspacesProvider from '@/components/providers/workspacesProvider'
import LogoComponent from '@/components/shared/logo'
import MainNav from '@/components/shared/nav'
import { WorkspacesContext } from '@/context/WorkspacesContext'
import { getUserById } from '@/lib/actions/user.actions'
import { getWorkspacesList } from '@/lib/actions/workspace.actions'
import { IWorkspace } from '@/lib/database/models/workspace.model'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import React, { ReactNode } from 'react'

type LayoutProps = {
    children: ReactNode
    params: {
      workspaceId: string
    }
}

const Layout = async ({ children, params }: { children: React.ReactNode; params: { workspaceId: string }; }) => {

    const { userId }= await auth();
        
    var workspacesList:IWorkspace[] = [];
    var currentWorkspace = undefined;
    if(userId){
        const user = await getUserById(userId);
        workspacesList = await getWorkspacesList(user._id);
    }
    var currentWorkspaceId = params.workspaceId;

    return(
        <main className='root'>
            <div className='root-container'>
                <div className='wrapper'>
                <LogoComponent/>
                <WorkspacesProvider workspaces={workspacesList}>
                    <div className="mainWindow">{children}</div>
                    <MainNav currentWorkspaceId={currentWorkspaceId}></MainNav>
                </WorkspacesProvider>
                </div>
            </div>
        </main>
    )
}

export default Layout