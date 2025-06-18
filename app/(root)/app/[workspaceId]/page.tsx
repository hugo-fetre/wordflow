// page.tsx
import BusinessInfoForm from '@/components/shared/business_info_form'
import MainNav from '@/components/shared/nav'
import { getUserById } from '@/lib/actions/user.actions'
import { deleteWorkspaces } from '@/lib/actions/workspace.actions'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

// Correction : Le type 'params' doit être défini comme un objet de type { workspaceId: string }
// et non comme une promesse ou une structure incorrecte.


const DashboardPage = async ({params}: { params: Promise<{ workspaceId: string }> }) => {
  
  const { workspaceId } = await params;
  const { userId }= await auth();
  const user = await getUserById(userId || "");
  
  return (
    <div>
        <BusinessInfoForm id={workspaceId} userId={user ? user._id : "no user"}></BusinessInfoForm>
    </div>
  )
}

export default DashboardPage
