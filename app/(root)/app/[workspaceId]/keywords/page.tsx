import KeywordsManager from '@/components/shared/keywords_manager'
import React from 'react'


const KeywordsPage = async ({params}: { params: Promise<{ workspaceId: string }> }) => {
  const workspaceId = (await params).workspaceId;
  return (
    <div>
      <KeywordsManager id={workspaceId}></KeywordsManager>
    </div>
  )
}

export default KeywordsPage