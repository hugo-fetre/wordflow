import BusinessInfoForm from '@/components/shared/business_info_form'
import MainNav from '@/components/shared/nav';
import React from 'react'

const dashboardPage = ({ params }: { params: { workspaceId: string } }) => {

  return (
    <div>
      <div className="mainWindow">
        <BusinessInfoForm id={params.workspaceId}></BusinessInfoForm>                     
      </div>
      <MainNav currentWorkspaceId={params.workspaceId} />
    </div>
  )
}

export default dashboardPage