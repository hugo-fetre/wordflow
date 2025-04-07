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

const formSchema = z.object({
  title: z.string().max(50),
  description: z.string(),
  website: z.string().optional(),
})


const BusinessInfoForm = ({ data=null}: BusinessInfoFormProps) => {
  /*return (
    <div className='content--wrapper'>
      <label htmlFor="title_input">Titre de votre business</label>
      <input type="text" name='title_input' id='title_input' className='in--text--big' placeholder='Workspace name'/>
      <label htmlFor="caption_input" className='t40px'>Description de votre business</label>
      <textarea cols={50} rows={7} name="caption_input" id="caption_input" className='in--text--narrative' placeholder='Decrivez votre business ici...'></textarea>
      <label htmlFor="website_input">Site web</label>
      <input type="text" name='website_input' id='website_input' className='in--text--link' placeholder='www.votresite.xyz'/>
    </div>
  )*/
    const initialValues = data ? {
        title: data?.title,
        description: data?.description,
        website: data?.website,
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
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Titre de votre business</FormLabel>
                    <FormControl>
                        <Input placeholder="Workspace name" {...field} className='in--text--big'/>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default BusinessInfoForm