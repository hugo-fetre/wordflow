// page.tsx
import BusinessInfoForm from '@/components/shared/business_info_form'
import MainNav from '@/components/shared/nav'
import React from 'react'

// Correction : Le type 'params' doit être défini comme un objet de type { workspaceId: string }
// et non comme une promesse ou une structure incorrecte.

type SearchParamProps = {
  params: { workspaceId: string }
}

const DashboardPage = ({ params }: SearchParamProps) => {
  const workspaceId = params.workspaceId.toString();
  
  return (
    <div>
      <div className="mainWindow">
        <BusinessInfoForm id={workspaceId}></BusinessInfoForm>                     
      </div>
      <MainNav currentWorkspaceId={workspaceId} />
    </div>
  )
}

export default DashboardPage
