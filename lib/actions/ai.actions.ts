"use server"

import { format } from "path";
import { IWorkspace } from "../database/models/workspace.model";
import { GoogleGenAI } from "@google/genai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export async function generateKeywords(workspace: IWorkspace) {

    const prompt = "Complète le liste de mots clés ou crées-en une pour atteindre 30 mots clés hyper optimisés pour le SEO de l'entreprise suivante."
    +"\n"+"Nom de l'entreprise :"+workspace.name+"\n"+"Description :"+workspace.description+"\n"+"Liste de mots clés existants (possiblement nulle):"+workspace.keywords
    +"\n"+"Output: Français"+"\n"+"Format: liste JSON de mots clés. Ex: [keyword 1, keyword 2, keyword 3, ...]";

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    //console.log(response.text);
    return response.text;
}

export async function generateArticleIdeas(workspace: IWorkspace) {

    const prompt = "Complète la liste d'idées d'articles ou crées-en une pour atteindre 5 idées d'articles hyper optimisés pour le SEO de l'entreprise suivante en te basant sur son nom, sa description et ses mots clés. Les idées d'article peuvent être très nichés ou s'attaquer au marché de manière très large."
    +"\n"+"Nom de l'entreprise :"+workspace.name+"\n"+"Description :"+workspace.description+"\n"+"Liste de mots clés existants:"+workspace.keywords+"\n"+"Liste des idées d'articles (possiblement nulle):"+workspace.articlesIdeas
    +"\n"+"Output: Français"+"\n"+"Format: liste JSON d'idées de titre d'articles. Ex: [titre 1, titre 2, titre 3, ...]";

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    //console.log(response.text);
    return response.text;
}

export async function generateArticle(workspace: IWorkspace, article: articlePrompt) {

    let prompt_output_format = "Format: un code HTML hyper optimisé pour le SEO avec une hiérarchies des titres et paragraphes claire."
    let articleLength = article.output_format+" mots";
    if(article.output_format == "LinkedIn"){
        articleLength = "Format LinkedIn";
    }
    
    const prompt = "Génère un article hyper optimisé pour le SEO du site de l'entreprise suivante. Utilise les mots clés du titre et la liste des mots clés que je te fournis pour générer l'article. N'inclus pas d'élément image."
    +"\n"+"Titre de l'article: "+article.title
    +"\n"+"Consignes supplémentaires (possiblement nulles): "+article.description
    +"\n"+"Nom de l'entreprise: "+workspace.name
    +"\n"+"Description de l'entreprise: "+workspace.description
    +"\n"+"Mots clés: "+workspace.keywords
    +"\n"+"Output: Français"
    +"\n"+"Tonalité: "+article.output_style
    +"\n"+"Longueur du texte: "+articleLength
    +"\n"+prompt_output_format;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    //console.log(response.text);
    return response.text;
}