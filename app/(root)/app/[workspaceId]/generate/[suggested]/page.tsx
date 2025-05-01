import ArticleForm from '@/components/shared/article_form';
import React from 'react'

const suggestedGenerationPage = async ({params}: { params: Promise<{ workspaceId: string, suggested: string }> }) => {
    const workspaceId = (await params).workspaceId;
    const suggestion = decodeURIComponent((await params).suggested);
    return (
      <ArticleForm id={workspaceId} suggestion={suggestion}></ArticleForm>
    )
}

export default suggestedGenerationPage