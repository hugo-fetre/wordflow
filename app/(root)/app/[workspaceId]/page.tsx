import BusinessInfoForm from '@/components/shared/business_info_form'
import MainNav from '@/components/shared/nav';
import React from 'react'

const dashboardPage = ({ params }: SearchParamProps) => {

  const p =  params;
  return (
    <div>
      <div className="mainWindow">
        <BusinessInfoForm id={p.workspaceId}></BusinessInfoForm>                     
      </div>
      <MainNav currentWorkspaceId={p.workspaceId} />
    </div>
  )
}

export default dashboardPage