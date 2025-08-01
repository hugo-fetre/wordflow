"use client"
import React, { useState } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { basicFeatures, proFeatures } from '@/constants'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { redirect } from 'next/navigation'
import { updateSelectedPlan } from '@/lib/actions/user.actions'
import { LoadingDots } from '../ui/loadingdots'

const formSchema = z.object({
  plan: z.enum(['light', 'pro', 'light_annual', 'pro_annual'], {
    required_error: 'Veuillez choisir un plan.',
  }),
})

const NewUserPlanSelection = ({ userId }:{ userId: string }) => {
    
    const [loading, setLoading] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
    
    const initialValues = {
        plan: 'pro' as const,
    }

    const prices = {
        monthly: {
            basic: "24,99€",
            pro: "24,99€",
        },
        yearly: {
            basic: "249€",
            pro: "349€",
        },
    }
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })
    
    // 2. Submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        let plan_id = 2;
        let isYearlyBilled = false;
        if(values.plan === "light" || values.plan === "light_annual"){
          plan_id = 1;
        }
        if(values.plan === "light_annual" || values.plan === "pro_annual"){
          isYearlyBilled = true;
        }
        const selectedPlan: updateUserSelectedPlanParams = {
          planId: plan_id,
          isYearlyBilled: isYearlyBilled
        }
        const res = updateSelectedPlan(userId, selectedPlan);
        const url = "/checkout/"+values.plan+"/"+userId;
        redirect(url);
    }
  
    return (
      <div className='plan--section'>
        <h1>Veuillez choisir votre plan</h1>
        <div className='flex justify-center t20px'>
            <div className="nav--small">
                <button
                onClick={() => setIsAnnual(false)}
                className={`${!isAnnual ? 'planSwitchButton' : 'planSwitchButtonDisabled'}`}
                >
                Mensuel
                </button>
                <button
                onClick={() => setIsAnnual(true)}
                className={`${isAnnual ? 'planSwitchButton' : 'planSwitchButtonDisabled'}`}
                >
                <span className=''>Annuel</span>
                <span className='price--info l5px'>(2 mois offerts)</span>
                </button>
            </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>  
              {/* Plan Pro */}
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='plan--wrapper'>
                        <label htmlFor="plan-pro" id='plan--pro--display'>
                          { isAnnual ? (
                            <input type="radio" id='plan-pro' className='radio--hidden' value="pro_annual" checked={field.value === "pro_annual"} onChange={field.onChange}/>
                          ) :
                          (
                            <input type="radio" id='plan-pro' className='radio--hidden' value="pro" checked={field.value === "pro"} onChange={field.onChange}/>
                          )}
                          
                          <div className='plan--card' id='plan--pro'>
                            <h2>Wordflow Pro</h2>
                            <div className='plan--label--wrapper'>
                              <span className='plan--label--pro'>Workspaces illimités</span>
                            </div>
                            <div className='horizontalSeparator'></div>
                            <ul>
                              {proFeatures.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  { item != "" ? (
                                    <Check className="mt-1" size={17} />
                                  ) : (
                                    <X className="mt-1" size={17} color='#ff8585'/>
                                  )}
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className='horizontalSeparator'></div>
                            <div className='price--display'>
                              <span className='price'>{isAnnual ? prices.yearly.pro : prices.monthly.pro}</span>
                              <span className='price--info'>{isAnnual ? "/an" : "/mois"}</span>
                              {isAnnual ? (
                                  <div className='price--info'>Au lieu de 419€</div>
                              ) : (
                                  <div>
                                      <div className='price--info'>Au lieu de 34,99€ <br /> pendant 3 mois avec le code HIGHFIVE <br /> uniquement sur le plan mensuel</div>
                                  </div> 
                              )}
                            </div>
                          </div>
                        </label>
                        <label htmlFor="plan-basic" id='plan--basic--display'>
                          { isAnnual ? (
                            <input type="radio" id='plan-basic' className='radio--hidden' value="light_annual" checked={field.value === "light_annual"} onChange={field.onChange}/>
                          ) :
                          (
                            <input type="radio" id='plan-basic' className='radio--hidden' value="light" checked={field.value === "light"} onChange={field.onChange}/>
                          )}
                          
                          <div className='plan--card' id='plan--basic'>
                            <h2>Wordflow Light</h2>
                            <div className='plan--label--wrapper'>
                              <span className='plan--label--basic'>1 Workspace</span>
                            </div>
                            <div className='horizontalSeparator'></div>
                            <ul>
                              {basicFeatures.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  { item != "" ? (
                                    <Check className="mt-1" size={17} />
                                  ) : (
                                    <X className="mt-1" size={17} color='#ff8585'/>
                                  )}
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className='horizontalSeparator'></div>
                            <div className='price--display'>
                              <span className='price'>{isAnnual ? prices.yearly.pro : prices.monthly.pro}</span>
                              <span className='price--info'>{isAnnual ? "/an" : "/mois"}</span>
                              {isAnnual ? (
                                  <div className='price--info'>Au lieu de 299€</div>
                              ) : (
                                  <div>
                                  </div> 
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
              )}/>
              <Button type="submit" className='choose--button' disabled={loading}>{loading ? <LoadingDots color='#fff' message=''/> : <div className='flex flex-center gap-2'><span>Suivant</span><ArrowRight size={20} /></div>}</Button>
          </form>
        </Form>
      </div>
    )
}

export default NewUserPlanSelection