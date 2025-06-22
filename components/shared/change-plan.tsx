"use client"
import React, { useState } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { basicFeatures, prices, proFeatures } from '@/constants'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { redirect } from 'next/navigation'
import { findUserByStripeCustomerId, updateSelectedPlan } from '@/lib/actions/user.actions'
import { LoadingDots } from '../ui/loadingdots'
import { cancelStripeSubscription, updateStripeSubscription } from '@/lib/actions/stripe.actions'


const ChangePlanForm = ({ userId, planId, stripeSubsriptionId }:{ userId: string, planId: number, stripeSubsriptionId: string }) => {
    
    const [loading, setLoading] = useState<'pro' | 'light' | null>(null);
    
    const handleSelectPlan = async (selected: 'pro' | 'light') => {
        setLoading(selected);
        const plan_id = selected === 'pro' ? 2 : 1;
        if (plan_id === planId) return; // Already current plan, do nothing

        let newPriceId = prices[0].pro;
        if(plan_id == 1){
            newPriceId = prices[0].light;
        }

        // Appeler stripe update plan
        updateStripeSubscription(stripeSubsriptionId, newPriceId)
        
        // Si ok on execute la suite
        const selectedPlan: updateUserSelectedPlanParams = {
            planId: plan_id
        };
        await updateSelectedPlan(userId, selectedPlan);

        // Redirect sur page "plan mis à jour avec succès"
        
    };

    const handleCancelSubscription = async () => {
        
        cancelStripeSubscription(stripeSubsriptionId); // Dit simplement à stripe d'annuler la session d'abonnement stripeSessionId

        // maj le user avec hook stripe -> oui car on màj en base seulement une fois qu'on sait que le client ne sera plus facturé
        // ou appeler user.actions ici -> non car si le user ou admin annule autrement qu'ici, le user peut continuer à utiliser sans payer

        // Ensuite rediriger vers page abonnement désactivé avec succès
    };
  
    return (
      <div className='plan--section'>
        <h1>Modifier mon abonnement</h1>
        <div className='plan--wrapper'>
            <label id='plan--pro--display'>
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
                        <span className='price'>24,99€</span>
                        <span className='price--info'>/mois</span>
                    </div>
                    <div className='flex justify-center t20px'>
                        <Button
                            onClick={() => planId === 2 ? handleCancelSubscription() : handleSelectPlan('pro')}
                            disabled={loading === 'pro'}
                            className={planId === 2 ? 'glassButton' : 'blueButton'}
                        >
                            {loading === 'pro' ? <LoadingDots color='#fff' message='' /> : planId === 2 ? 'Annuler l’abonnement' : 'Choisir cet abonnement'}
                        </Button>
                    </div>
                </div>
            </label>
            <label id='plan--basic--display'>
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
                        <span className='price'>19,99€</span>
                        <span className='price--info'>/mois</span>
                    </div>
                    <div className='flex justify-center t20px'>
                        <Button
                            onClick={() => planId === 1 ? handleCancelSubscription() : handleSelectPlan('light')}
                            disabled={loading === 'light'}
                            className={planId === 1 ? 'glassButton' : 'blueButton' }
                        >
                            {loading === 'light' ? <LoadingDots color='#fff' message='' /> :
                            planId === 1 ? 'Annuler l’abonnement' : 'Choisir cet abonnement'}
                        </Button>
                    </div>
                </div>
            </label>
        </div>
      </div>
    )
}

export default ChangePlanForm