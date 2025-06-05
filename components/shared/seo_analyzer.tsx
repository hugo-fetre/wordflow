"use client"
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./rich_text";
import Image from 'next/image'
import ScoreChart from "./score_chart";
import { LoadingDots } from "../ui/loadingdots";
import { analyzeArticleSEO } from "@/lib/actions/local.actions";
import { analyzeArticle } from "@/lib/actions/ai.actions";

const seoFormSchema = z.object({
  html: z.string().min(10, "Le contenu HTML est requis")
});

type FormValues = z.infer<typeof seoFormSchema>;

const SEOAnalyzer = () => {
  
    const [analysis, setAnalysis] = useState<any | null>(null);
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [analysisWarnings, setAnalysisWarnings] = useState<string[]>([]);
    const [aiWarnings, setAiWarnings] = useState<string[]>([]);
    const [aiScore, setAiScore] = useState<number>(0);
    const [editorMode, setEditorMode] = useState<"rich" | "code">("rich");
    const [loading, setLoading] = useState(false);


  const form = useForm<FormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: { html: "" }
  });

    // Define add keyword function
    const handleAddKeyword = () => {
        const trimmed = newKeyword.trim();
        console.log(trimmed);
        if (trimmed && !keywords.includes(trimmed)) {
            setKeywords((prev) => [...prev, trimmed]);
            setNewKeyword("");
        }
        console.log(keywords);
    };

    // Define delete keyword function
    const handleDeleteKeyword = (indexToDelete: number) => {
        setKeywords(prev => prev.filter((_, i) => i !== indexToDelete))
    }

    // Handle submit
    const analyzeHTML = async (html: string) => {
        setLoading(true);
        // Check if user is connected
        const result = await analyzeArticleSEO(html, keywords, false);
        const aiResult = await analyzeArticle(html);
        let aiScore = 0;
        if(aiResult != undefined){
            // Étape 1 : nettoyer la string pour enlever ```json et ```
            const withoutJsonTag = aiResult.replace('```json', '').replace('```', '').trim();

            // Étape 2 : parser enfin la vraie liste JSON
            const response = JSON.parse(withoutJsonTag);
            
            Object.entries(response.rating).forEach(([key, value]) => {
                aiScore += value as number;
            });
            setAiScore(aiScore);
            setAiWarnings(response.warnings);
        } else {
            // Remplacer par erreur Toaster/sonner
            console.log("Erreur de génération");
        }

        setLoading(false);
        setAnalysisWarnings(result.warnings);
        const wordCount = result.wordCount;
        const score = result.score;
        return {
            wordCount,
            score
        };
        
    };

  const onSubmit = async (values: FormValues) => {
    const result = await analyzeHTML(values.html);
    setAnalysis(result);
  };

  return (
    <div className="seo-analyzer-wrapper general--page">
        <div className="space-y-6 seo-analyzer">
        <h1 className="text-xl font-bold">Analyseur SEO</h1>
        <h2>Analysez votre Score SEO grâce à l'IA</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <sub>Mot-clés à vérifier</sub>
            <div className="text--editor--keywords">
                <input
                    type="text"
                    placeholder="Ajouter un mot-clé"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // ⛔️ empêche la soumission du formulaire
                                handleAddKeyword(); // ✅ ajoute le mot-clé
                            }
                        }
                    }
                    className='in--keyword'
                />
                <button type="button" onClick={handleAddKeyword} className='smallColorButton'>Ajouter</button>
            </div>
            <div className='keywords--wrapper'>
                {keywords.length > 0 ? 
                    (keywords.map((k, i) => (
                        <span key={i} className='keyword--unit'>
                            {k}
                            <button className='keyword--delete--btn' onClick={() => handleDeleteKeyword(i)}><Image width={14} height={14} src={"/delete-icon.png"} alt='fermer'/></button>
                        </span>
                    ))) 
                    : ( <div></div>)
                }
            </div>
            <div className="editor-mode-toggle flex gap-2">
                <Button type="button" className={editorMode === "rich" ? "blueButton" : "unselectedButton"} onClick={() => setEditorMode("rich")}>Texte</Button>
                <Button type="button" className={editorMode === "code" ? "blueButton" : "unselectedButton"} onClick={() => setEditorMode("code")}>{"<html/>"}</Button>
            </div>
            {editorMode === "rich" ? 
                (<RichTextEditor value={form.watch("html")} onChange={(val) => form.setValue("html", val)}/>) 
                : (<Textarea value={form.watch("html")} onChange={(e) => form.setValue("html", e.target.value)} className="text--editor" placeholder="Collez ici votre HTML"/>
            )}
            <Button type="submit" className='secondaryButton button--main--submit' disabled={loading}>{loading ? <LoadingDots color='#000' message='Analyse'/> : "Analyser"}</Button> 
        </form>

        {analysis && (
            <div className="seo--analyzer--result">
                <h3 className="b15px">Votre score SEO</h3>
                {aiScore && (
                    <div className="flex flex-col items-center justify-center">
                        <ScoreChart score={(analysis.score+aiScore)/2} size={200}></ScoreChart>
                        <span className="t80px b15px score--title">Score de structure</span>
                    </div>
                )}
                <ScoreChart score={analysis.score} size={150}></ScoreChart>
                {analysisWarnings.length > 0 ? 
                    (<ul className="t40px">
                        {analysisWarnings.map((k, i) => (
                            <li key={i} className=''>
                                {k}
                            </li>
                        ))}
                    </ul>) 
                    : ( <div>Aucune erreur</div>)
                }
                {aiScore && (
                    <div className="flex flex-col items-center justify-center t40px">
                        <span className="b15px score--title">Score de contenu</span>
                        <ScoreChart score={aiScore} size={150}></ScoreChart>
                        {aiWarnings.length > 0 ? 
                            (<ul className="t40px">
                                {aiWarnings.map((k, i) => (
                                    <li key={i} className=''>
                                        {k}
                                    </li>
                                ))}
                            </ul>) 
                            : ( <div>Aucune erreur</div>)
                        }
                    </div>
                )}
            </div>
        )}
        </div>
    </div>
  );
};

export default SEOAnalyzer;
