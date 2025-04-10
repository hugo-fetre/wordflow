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

const Layout = async ({ children, params: {workspaceId} }: { children: React.ReactNode; params: SearchParamProps; }) => {

    const { userId }= await auth();
    if (!userId) {
        return { notFound: true }  // Si pas d'utilisateur authentifié, on retourne un 404
    } 
    var workspacesList:IWorkspace[] = [];
    var currentWorkspace = undefined;
    if(userId){
        const user = await getUserById(userId);
        workspacesList = await getWorkspacesList(user._id);
    }
    var currentWorkspaceId = workspaceId;

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