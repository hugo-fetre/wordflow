// app/api/generate/keywords/route.ts
import { NextResponse } from 'next/server';
import { generateKeywords } from '@/lib/actions/ai.actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const workspaceObject = body.workspace;
    console.log("API Side - workspaceObject: "+workspaceObject)

    // On attend un objet `workspace` dans le body
    const result = await generateKeywords(workspaceObject);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Erreur génération mots-clés :", error);
    return NextResponse.json({ error: 'Échec génération' }, { status: 500 });
  }
}
