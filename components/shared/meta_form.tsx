"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Form } from "@/components/ui/form"; // ou selon ton architecture
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image'
import { LoadingDots } from '../ui/loadingdots';
import { RotateCcw } from 'lucide-react';

export const imageFormSchema = z.object({
  image: z.any().refine((file) => file instanceof File && file.size > 0, {
      message: "Une image est requise",
    }),
});


const MetaForm = () => {
    
    type FormValues = z.infer<typeof imageFormSchema>;
    const [loading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [meta, setMeta] = useState<null | {
        title?: string;
        description?: string;
        caption?: string;
        alt?: string;
        suggestedName?: string;
    }>(null);
      
    
    // 1. Define your form.
    const form = useForm<FormValues>({
        resolver: zodResolver(imageFormSchema),
        defaultValues: {
          image: undefined,
        },
      });
    
    // 2. Define a submit handler.
    async function onSubmit(values: FormValues) {
        if (!values.image) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("image", values.image);

        const res = await fetch("/api/internal/meta-description", {
            method: "POST",
            body: formData,
        });

        const raw = await res.text();

        // Étape 1 : parser la réponse JSON contenant la chaîne markdown
        const { result } = JSON.parse(raw);

        // Étape 2 : nettoyer la string pour enlever ```json et ```
        const withoutJsonTag = result.replace('```json', '').replace('```', '').trim();
       
        // Étape 3 : parser enfin la vraie liste JSON
        const meta = JSON.parse(withoutJsonTag)[0];
        setMeta(meta);
        setLoading(false);
    }

    function resetForm(){
        form.reset();
        setLoading(false);
        setSelectedFileName(null);
        setPreviewUrl(null);
        setMeta(null);
    }

    return (
        <div className="space-y-4">
            <h2>Générateur de méta-données</h2>
            <sub>Améliorez votre visibilité en décrivant avec précision vos images grâce aux méta-données</sub>
            { (!meta || meta == null) && (
            <div className='t40px'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choisissez votre image</FormLabel>
                                        <div className='button--image--selector secondaryButton cursor-pointer'>
                                            <span>{selectedFileName || "Sélectionner"}</span>
                                            <Input 
                                                type="file" 
                                                accept="image/*" 
                                                className="opacity-0 w-full h-full input--image--selector" 
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                    if (file) {
                                                      setSelectedFileName(file.name);
                                                      setPreviewUrl(URL.createObjectURL(file));
                                                    } else {
                                                      setSelectedFileName(null);
                                                      setPreviewUrl(null);
                                                    }
                                                }}
                                            />
                                        </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.formState.isDirty && (
                            <Button type="submit" className='primaryButton button--main--submit' disabled={loading}>{loading ? <LoadingDots color='#fff' message='Analyse'/> : "Générer"}</Button>
                        )}
                    </form>
                </Form>
            </div>
            )}
            {(meta && meta != null) && (
                <div className='meta--result--wrapper'>
                    <div className='meta--result--column'>
                        {previewUrl && (
                            <div className="mt-4 w-[350px] h-[350px] rounded overflow-hidden">
                                <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>
                    <div className='meta--result--column'>
                        <sub>Titre</sub>
                        <p>{meta?.title || "—"}</p>
                        <sub>Description</sub>
                        <p>{meta?.description || "—"}</p>
                        <sub>Légende</sub>
                        <p>{meta?.caption || "—"}</p>
                        <sub>Alt</sub>
                        <p>{meta?.alt || "—"}</p>
                        <sub>Nom suggéré</sub>
                        <p>{meta?.suggestedName || "—"}</p>
                    </div>
                    <Button type='button' onClick={resetForm} className='button--main--submit'><span>Nouveau</span><RotateCcw /></Button>
                </div>
            )}
        </div>
    )
}

export default MetaForm