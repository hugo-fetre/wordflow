import WorkspacesProvider from '@/components/providers/workspacesProvider'
import LogoComponent from '@/components/shared/logo'
import MainNav from '@/components/shared/nav'
import { getUserById } from '@/lib/actions/user.actions'
import { getWorkspacesList } from '@/lib/actions/workspace.actions'
import { IWorkspace } from '@/lib/database/models/workspace.model'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const Layout = async ({ children, params }: { children: ReactNode, params: Promise<{ workspaceId: string }> }) => {

    const { userId } = await auth()

    if (!userId) {
        return { notFound: true }  // Si pas d'utilisateur authentifié, on retourne un 404
    }

    // Check si user autorisé
    const user = await getUserById(userId)
    if(user.isActive === false){
        redirect('/access-suspended');
    }

    // Récupération des workspaces
    const workspacesList = await getWorkspacesList(user._id)
    const workspaceId = (await params).workspaceId;

    return (
        <main className='root'>
            <div className='root-container'>
                <div className='wrapper'>
                    <LogoComponent />
                    <WorkspacesProvider workspaces={workspacesList}>
                        <div className="mainWindow">
                            {children}                
                        </div>
                        <MainNav currentWorkspaceId={workspaceId} user={user}/>
                    </WorkspacesProvider>
                </div>
            </div>
        </main>
    )
}

export default Layout
