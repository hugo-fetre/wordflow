import ArticleForm from '@/components/shared/article_form'
import React from 'react'

interface Props {
  params: {
    workspaceId: string
  }
}

const GeneratePage = async ({params}: { params: Promise<{ workspaceId: string }> }) => {
  const workspaceId = (await params).workspaceId;
  return (
    <ArticleForm id={workspaceId} suggestion=''></ArticleForm>
  )
}

export default GeneratePage