import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucune image fournie." }, { status: 400 });
    }

    const base64Image = await fileToBase64(file); // Sans en-tête data:image/...

    // No call to AI actions because of complexity to pass image file
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: file.type,
                data: base64Image,
              },
            },
            {
              text: "À partir de cette image, génère un titre, une légende, une description, un texte alternatif et un nom approprié."
              +"\n Output: Français"
              +"\n Format: liste JSON avec les attributs title, caption, description, alt et suggestedName pour le contenu cité ci-dessus. Ex: [title: ..., caption ..., description ..., ...]. Pas de texte superflus pour présenter la réponse, juste la liste brute.",
            },
          ],
        },
      ],
    });

    const result = await response.text;

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Erreur Gemini:", err);
    return NextResponse.json({ error: "Erreur traitement Gemini" }, { status: 500 });
  }
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString("base64"); // pas de préfixe "data:image/..."
}
