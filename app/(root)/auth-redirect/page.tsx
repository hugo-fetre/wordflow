import ClientRedirect from '@/components/shared/auth_redirect';
import { getUserById } from '@/lib/actions/user.actions';
import { createWorkspace, getWorkspacesList } from '@/lib/actions/workspace.actions';
import { IWorkspace } from '@/lib/database/models/workspace.model';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AuthRedirectPage = async () => {

    const { userId }= await auth();
    var workspaces: IWorkspace[] = [];
    var currentWorkspace = undefined;
    var redirect_url = "/";
    if(userId){
        const user = await getUserById(userId);
        workspaces = await getWorkspacesList(user._id);
        currentWorkspace = workspaces[0]; //workspaces.find(w => w.publicId === params.workspaceId);
        if(currentWorkspace){
            redirect_url = '/app/'+currentWorkspace._id;
        } else {
            const workspace = {
                manager: user._id
            }
            const newWorkspace = await createWorkspace(workspace);
            redirect_url = '/app/'+newWorkspace._id;
        }
        
    }

    return (
        <div>
           <ClientRedirect to={redirect_url}/>
        </div>
       )
}

export default AuthRedirectPage