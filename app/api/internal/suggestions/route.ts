// app/api/generate/ideas/route.ts
import { NextResponse } from 'next/server';
import { generateArticleIdeas } from '@/lib/actions/ai.actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // On attend un objet `workspace` dans le body
    const result = await generateArticleIdeas(body.workspace);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erreur génération idées d'articles :", error);
    return NextResponse.json({ error: 'Échec génération' }, { status: 500 });
  }
}
