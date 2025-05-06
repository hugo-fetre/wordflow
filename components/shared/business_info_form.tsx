"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { defaultValues } from '@/constants'
import { useWorkspaces } from '@/context/WorkspacesContext'
import { Textarea } from '../ui/textarea'
import { updateWorkspace } from '@/lib/actions/workspace.actions'
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().max(50),
  description: z.string(),
  website: z.string(),
})


const BusinessInfoForm = ({ id }: { id: string }) => {

    const router = useRouter()
    const workspaces = useWorkspaces();
    const currentWorkspace = workspaces.find(w => w._id == id); //params.workspaceId;
    
    const initialValues = currentWorkspace ? {
        title: currentWorkspace.name,
        description: currentWorkspace.description,
        website: currentWorkspace.website ?? "",
    } : defaultValues

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })
 
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // This will be type-safe and validated.

        const w = {
          name: values.title,
          description: values.description,
          website: values.website,
          keywords: currentWorkspace?.keywords ?? [""],
          articlesIdeas: currentWorkspace?.articlesIdeas ?? [""],
          //manager: string;
        };
        updateWorkspace(id, w).then(() => {
          router.refresh()  // 🔄 re-fetch les données côté serveur sans reload complet
          form.reset(values); // 🔁 remet isDirty à false → bouton disparaît
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className='in--label'>Titre de votre business</FormLabel>
                      <FormMessage />
                      <FormControl>
                          <Input placeholder="" {...field} className='in--text--big no-shadow'/>
                      </FormControl>
                    </FormItem>  
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className='in--label'>Décrivez votre business</FormLabel>
                    <FormDescription className='in--sub'>Expliquez-nous en détail votre produit, votre vision, vos cibles, vos atouts... et tout ce que vous jugerez utile de nous partager.</FormDescription>
                    <FormControl>
                        <Textarea spellCheck={false} placeholder="" {...field} className='in--text--narrative no-shadow'/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className='in--label'>Votre site web</FormLabel>
                      <FormControl>
                        <Input placeholder="votresite.com" {...field} className='in--text--link no-shadow'/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
                />
                {form.formState.isDirty && (
                  <Button type="submit" className='button--main--submit primaryButton'>Enregistrer</Button>
                )}
            </form>
        </Form>
    )
}

export default BusinessInfoForm