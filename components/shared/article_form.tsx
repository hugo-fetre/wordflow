"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useWorkspaces } from '@/context/WorkspacesContext';
import { generateArticle } from '@/lib/actions/ai.actions';
import { IWorkspace } from '@/lib/database/models/workspace.model';
import Image from 'next/image';
import { LoadingDots } from '../ui/loadingdots';

const formSchema = z.object({
  title: z.string().max(150),
  description: z.string(),
  output_format: z.enum(["500", "1000", "1500", "LinkedIn"]),
  output_style: z.enum(["formel", "decontract", "amical"]),
  //website: z.string().optional(),
})

const ArticleForm = ({ id, suggestion }: { id: string, suggestion: string }) => {
    
    const workspaces = useWorkspaces();
    const currentWorkspace = workspaces.find(w => w._id == id);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showPreviewButton, setShowPreviewButton] = useState(false);
    const [AiAnswer, setAiAnswer] = useState('');
    const [previewContent, setPreviewContent] = useState(''); // Version croped de la réponse HTML

    
    const initialValues = {
        title: suggestion,
        description: "",
        output_format: undefined,
        output_style: undefined,
        //website: currentWorkspace.website,
    }

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        //console.log("AI Call - gen article. Values check "+values);
        setLoading(true);
        if(values && currentWorkspace){
            const prompt = {
                title: values.title,
                description: values.description,
                output_format: values.output_format,
                output_style: values.output_style,
            }
            createArticle(currentWorkspace, prompt);
        }
        
    }

    /*const createArticle = async (workspace: IWorkspace, prompt: articlePrompt) => {
        console.log("Create article called");
        const answer = await generateArticle(workspace, prompt);
        const bodyMatch = answer?.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const answer_preview = bodyMatch ? bodyMatch[1] : '';
        setAiAnswer(answer ? answer : "Generation failed"); // Stockage de la réponse complète
        setPreviewContent(answer_preview); // Stockage du contenu HTML
        setShowPreview(true); // Affichage de la pop-up
        setShowPreviewButton(true);
    }*/

    const createArticle = async (workspace: IWorkspace, prompt: articlePrompt) => {
        try {
            const res = await fetch("/api/internal/article", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workspace, article: prompt }),
            });
        
            const data = await res.json();
            if (res.ok && data.content) {
                let cleanedContent = data.content.replace(/```html|```/g, '').trim();
                const bodyMatch = data.content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                const answer_preview = bodyMatch ? bodyMatch[1] : '';
                setAiAnswer(cleanedContent);
                setPreviewContent(answer_preview);
                setShowPreview(true);
                setShowPreviewButton(true);
            } else {
                console.error("Erreur :", data.error);
            }
        } catch (err) {
            console.error("Erreur de fetch IA :", err);
        }
        setLoading(false);
    };

    function resetForm(){
        form.reset();
        setShowPreview(false);
        setShowPreviewButton(false);
        setAiAnswer('');
        setPreviewContent('');
    }

    function downloadContent(){
        const blob = new Blob([AiAnswer], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "article.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function copyContent(){
        const blob = new Blob([previewContent], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ "text/html": blob });

        navigator.clipboard.write([clipboardItem])
        .then(() => {
            alert("Contenu formaté copié !");
        })
        .catch((err) => {
            console.error("Erreur de copie :", err);
        });
    }

  return (
    <div>
    {!showPreview && (        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='in--label'>Titre de votre article</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className='in--text--big no-shadow'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className='in--label'>Consignes de rédaction (optionnel)</FormLabel>
                    <FormDescription className='in--sub'>Decrivez en précision ce que vous souhaitez voir dans votre article.</FormDescription>
                    <FormControl>
                        <Textarea spellCheck={false} cols={50} rows={7} placeholder="" {...field} className='in--text--narrative no-shadow'/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name="output_format"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="in--label">Taille de l'article</FormLabel>
                        <FormControl>
                            <div className="flex items-center">
                                <label htmlFor="500" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="500" value="500" checked={field.value === "500"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">Court ~500 mots</span>
                                </label>
                                <label htmlFor="1000" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="1000" value="1000" checked={field.value === "1000"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">Moyen ~1000 mots</span>
                                </label>
                                <label htmlFor="1500" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="1500" value="1500" checked={field.value === "1500"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">Long ~1500 mots</span>
                                </label>
                                <label htmlFor="LinkedIn" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="LinkedIn" value="LinkedIn" checked={field.value === "LinkedIn"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">LinkedIn</span>
                                </label>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name="output_style"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="in--label">Ton d'écriture</FormLabel>
                        <FormControl>
                            <div className="flex items-center">
                                <label htmlFor="formel" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="formel" value="formel" checked={field.value === "formel"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">Formel</span>
                                </label>
                                <label htmlFor="decontract" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="decontract" value="decontract" checked={field.value === "decontract"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">Décontracté</span>
                                </label>
                                <label htmlFor="amical" className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id="amical" value="amical" checked={field.value === "amical"} onChange={field.onChange} className="radio--hidden"/>
                                    <span className="radio--label">Amical</span>
                                </label>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                {(form.formState.isDirty && !showPreviewButton) &&(
                    <Button type="submit" className='primaryButton button--main--submit' disabled={loading}>{loading ? <LoadingDots color='#fff' message='Génération'/> : "Générer"}</Button>
                )}
                <div className='button--main--container'>
                    {showPreviewButton && (
                        <Button type='button' onClick={resetForm} className='primaryButton'><span>Nouvel article</span><RotateCcw /></Button>
                    )}
                    {showPreviewButton && (
                        <Button type="button" className='outlineBlack' onClick={() => setShowPreview(true)}>Afficher le résultat</Button>
                    )}
                </div>
            </form>
        </Form>
    )}
    {showPreview && (
        <div className="">
            <div className="textPreviewer">
                <button type="button" className="absolute top-4 right-4 text-gray-600 hover:text-black" onClick={() => setShowPreview(false)}><X size={24} /></button>
                <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            </div>
            <div className='preview--button--container'>
                <button type="button" className='primaryButton' onClick={downloadContent}>
                    Télécharger
                     <Image width={16} height={12} src={"/download-icon.png"} alt='télécharger'/>
                </button>
                <button type="button" className='primaryButton'onClick={copyContent}>
                    Copier
                    <Image width={16} height={16} src={"/copy-icon.png"} alt='copier'/>
                    </button>
            </div>
        </div>
    )}
    </div>
  )
}

export default ArticleForm