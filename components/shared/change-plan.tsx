"use client"
import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { basicFeatures, prices, proFeatures } from '@/constants'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { cancelUserSubscription, updateSelectedPlan } from '@/lib/actions/user.actions'
import { LoadingDots } from '../ui/loadingdots'
import { updateStripeSubscription } from '@/lib/actions/stripe.actions'


const ChangePlanForm = ({ userId, planId, stripeSubsriptionId, isCancelPlanned }:{ userId: string, planId: number, stripeSubsriptionId: string, isCancelPlanned: boolean }) => {
    
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
        const res = await updateStripeSubscription(stripeSubsriptionId, newPriceId)
        
        // Si ok on execute la suite
        const selectedPlan: updateUserSelectedPlanParams = {
            planId: plan_id
        };
        await updateSelectedPlan(userId, selectedPlan);

        redirect('/plan-updated');
        
    };

    const handleCancelSubscription = async (selected: 'pro' | 'light') => {
        setLoading(selected);
        
        // On planifie l'arrêt de l'abonnement à la fin du cycle
        const res = await fetch('/api/internal/cancel-stripe-sub', {
            method: 'POST',
            body: JSON.stringify({ subscriptionId: stripeSubsriptionId }),
            headers: {
            'Content-Type': 'application/json',
            },
        })

        if (!res.ok) {
            // Affiche une erreur ou déclenche un toast
            console.log("Problème avec l'appel annulation de l'API")
            return
        }

        // On dit en base que l'arrêt est prévu (pour avoir le bouton réactiver)
        const cancelUserSub: cancelUserSubscriptionParams = {
            isCancelPlanned: true
        };
        await cancelUserSubscription(userId, cancelUserSub);

        // On redirige pour confirmer que l'annulation est prise en compte
        redirect('/plan-canceled');
    };

    const handleReactivateSubscription = async (selected: 'pro' | 'light') => {
        setLoading(selected);

        // On Màj stripe pour annuler l'annulation
        const res = await fetch('/api/internal/reactivate-stripe-sub', {
            method: 'POST',
            body: JSON.stringify({ subscriptionId: stripeSubsriptionId }),
            headers: {
            'Content-Type': 'application/json',
            },
        })

        if (!res.ok) {
            // Affiche une erreur ou déclenche un toast
            console.log("problème avec la réactivation API")
            return
        }

        // On Màj la BDD pour mettre isCancelPlanned à false
        const cancelUserSub: cancelUserSubscriptionParams = {
            isCancelPlanned: false
        };
        await cancelUserSubscription(userId, cancelUserSub);
        
    }
  
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
                            onClick={() => planId === 2 ? 
                                isCancelPlanned ? handleReactivateSubscription('pro') : handleCancelSubscription('pro') 
                                : handleSelectPlan('pro')}
                            disabled={loading === 'pro'}
                            className={planId === 2 ? 
                                isCancelPlanned ? 'blueButton' : 'glassButton' 
                                : 'blueButton'}
                        >
                            {loading === 'pro' ? <LoadingDots color='#fff' message='' /> 
                                : planId === 2 ? 
                                    isCancelPlanned ? 'Réactiver l\'abonnement' : 'Annuler l’abonnement' 
                                : 'Choisir cet abonnement'}
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
                            onClick={() => planId === 1 ? 
                                isCancelPlanned ? handleReactivateSubscription('light') : handleCancelSubscription('light') 
                                : handleSelectPlan('light')}
                            disabled={loading === 'light'}
                            className={planId === 1 ? 
                                isCancelPlanned ? 'blueButton' : 'glassButton' 
                                : 'blueButton' }
                        >
                            {loading === 'light' ? <LoadingDots color='#fff' message='' /> :
                            planId === 1 ? 
                               isCancelPlanned ? 'Réactiver' : 'Annuler l’abonnement' 
                               : 'Choisir cet abonnement'}
                        </Button>
                    </div>
                </div>
            </label>
        </div>
      </div>
    )
}

export default ChangePlanForm