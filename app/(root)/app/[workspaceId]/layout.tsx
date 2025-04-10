import WorkspacesProvider from '@/components/providers/workspacesProvider'
import LogoComponent from '@/components/shared/logo'
import MainNav from '@/components/shared/nav'
import { getUserById } from '@/lib/actions/user.actions'
import { getWorkspacesList } from '@/lib/actions/workspace.actions'
import { IWorkspace } from '@/lib/database/models/workspace.model'
import { auth } from '@clerk/nextjs/server'
import { ReactNode } from 'react'

const Layout = async ({ children, params }: { children: ReactNode, params: { workspaceId: string } }) => {
    // Authentification de l'utilisateur (attente de la promesse)
    const { userId } = await auth()

    if (!userId) {
        return { notFound: true }  // Si pas d'utilisateur authentifié, on retourne un 404
    }

    // Récupération des workspaces
    const user = await getUserById(userId)
    const workspacesList = await getWorkspacesList(user._id)
    
    const currentWorkspaceId = params.workspaceId  // Le workspaceId est obtenu directement depuis `params`

    return (
        <main className='root'>
            <div className='root-container'>
                <div className='wrapper'>
                    <LogoComponent />
                    <WorkspacesProvider workspaces={workspacesList}>
                        <div className="mainWindow">
                            {children}
                        </div>
                        <MainNav currentWorkspaceId={currentWorkspaceId} />
                    </WorkspacesProvider>
                </div>
            </div>
        </main>
    )
}

export default Layout
