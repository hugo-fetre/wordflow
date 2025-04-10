import BusinessInfoForm from '@/components/shared/business_info_form'
import React from 'react'

const dashboardPage = async ({ params }: { params: { workspaceId: string }; }) => {

  const p = (await params)
  return (
    <div>
      <BusinessInfoForm id={p.workspaceId}></BusinessInfoForm>
    </div>
  )
}

export default dashboardPage