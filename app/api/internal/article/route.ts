// /app/api/generate/article/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { IWorkspace } from '@/lib/database/models/workspace.model';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { workspace, article } = await req.json();

    const prompt_output_format = "Format: un code HTML hyper optimisé pour le SEO avec une hiérarchies des titres et paragraphes claire.";
    const articleLength = article.output_format === "LinkedIn" ? "Format LinkedIn" : `${article.output_format} mots`;

    const prompt = `Génère une article hyper optimisé pour le SEO du site de l'entreprise suivante. Utilise les mots clés du titre et la liste des mots clés que je te fournis pour générer l'article. N'inclus pas d'élément image. Rappel: nous sommes en 2025.
Titre de l'article: ${article.title}
Consignes supplémentaires: ${article.description}
Nom de l'entreprise: ${workspace.name}
Description de l'entreprise: ${workspace.description}
Mots clés: ${workspace.keywords}
Output: Français
Tonalité: ${article.output_style}
Longueur du texte: ${articleLength} mots, hors balise html
${prompt_output_format}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return NextResponse.json({ content: response.text }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur de génération" }, { status: 500 });
  }
}
