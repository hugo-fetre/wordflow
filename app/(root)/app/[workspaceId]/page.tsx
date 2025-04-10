// page.tsx
import BusinessInfoForm from '@/components/shared/business_info_form'
import MainNav from '@/components/shared/nav'
import React from 'react'

// Correction : Le type 'params' doit être défini comme un objet de type { workspaceId: string }
// et non comme une promesse ou une structure incorrecte.

const DashboardPage = async ({params}: { params: Promise<{ workspaceId: string }> }) => {
  
  const workspaceId = (await params).workspaceId;
  
  return (
    <div>
        <BusinessInfoForm id={workspaceId}></BusinessInfoForm>
    </div>
  )
}

export default DashboardPage
