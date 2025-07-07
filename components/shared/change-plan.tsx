"use client"
import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { basicFeatures, prices, proFeatures } from '@/constants'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { cancelUserSubscription, updateSelectedPlan } from '@/lib/actions/user.actions'
import { LoadingDots } from '../ui/loadingdots'
import { updateStripeSubscription } from '@/lib/actions/stripe.actions'
import { keepOnlyOneWorkspace } from '@/lib/actions/workspace.actions'


const ChangePlanForm = ({ userId, planId, stripeSubsriptionId, isCancelPlanned, isYearlyBilled }:{ userId: string, planId: number, stripeSubsriptionId: string, isCancelPlanned: boolean, isYearlyBilled: boolean }) => {
    
    const [loading, setLoading] = useState<'pro' | 'light' | 'pro_annual' | 'light_annual' | null>(null);
    const [isAnnual, setIsAnnual] = useState(false);
    const router = useRouter();
    
    const handleSelectPlan = async (selected: 'pro' | 'light' | 'pro_annual' | 'light_annual') => {
        setLoading(selected);

        let newPriceId = prices[0].pro;
        const plan_id = (selected === 'pro' || selected === 'pro_annual') ? 2 : 1;
        const hasSelectedYearly = (selected === 'light_annual' || selected === 'pro_annual') ? true : false;

        // Already current plan, do nothing
        if (plan_id === planId && hasSelectedYearly === isYearlyBilled){
            return;
        } 
        // User has selected Light
        else if (plan_id === 1){
            if(plan_id !== planId){
                await keepOnlyOneWorkspace(userId);
            }

            // User has selected yearly billed
            if(hasSelectedYearly){
                newPriceId = prices[0].light_annual;
            } 
            // User has selected monthly billed
            else {
                newPriceId = prices[0].light;
            }  
        }
        // User has selected Pro
        else{

            // User has selected yearly billed
            if(hasSelectedYearly){
                newPriceId = prices[0].pro_annual;
            } 
            // User has selected monthly billed
            else {
                newPriceId = prices[0].pro;
            }  
        }

        // Appeler stripe update plan
        const res = await updateStripeSubscription(stripeSubsriptionId, newPriceId)
        
        // Si ok on execute la suite
        const selectedPlan: updateUserSelectedPlanParams = {
            planId: plan_id,
            isYearlyBilled: hasSelectedYearly
        };
        await updateSelectedPlan(userId, selectedPlan);

        // On Màj la base pour dire que le plan n'est plus en phase d'être annulé
        const cancelUserSub: cancelUserSubscriptionParams = {
            isCancelPlanned: false
        };
        await cancelUserSubscription(userId, cancelUserSub);

        redirect('/plan-updated');
    };

    const handleCancelSubscription = async (selected: 'pro' | 'light' | 'pro_annual' | 'light_annual') => {
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

    const handleReactivateSubscription = async (selected: 'pro' | 'light' | 'pro_annual' | 'light_annual') => {
        setLoading(selected);
        console.log("réactivation engagée");

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
        console.log("réactivation réussie");
        setLoading(null);
        isCancelPlanned = false;
        router.refresh();
    }
  
    return (
      <div className='plan--section'>
        <a href="/"><div className="button--back">retour</div></a>
        <h1>Modifier mon abonnement</h1>
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
        {!isAnnual ? 
        (
        <div className='plan--wrapper'>
            <label id='plan--pro--display'>
                <div className={(!isYearlyBilled && planId === 2) ? 'plan--card blueBorder' : 'plan--card'} id='plan--pro'>
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
                        <span className='price'>34,99€</span>
                        <span className='price--info'>/mois</span>
                    </div>
                    <div className='flex justify-center t20px'>
                        {isYearlyBilled ?
                        (
                            <p className='boringLines'>Vous possédez déjà un abonnement annuel, représentant un engagement sur un an. Pour transiter vers un abonnement mensuel, vous devez annuler votre abonnement annuel et attendre son échéance.</p>
                        )
                        :(
                        <Button
                            onClick={() => planId === 2 && isYearlyBilled === false ? 
                                isCancelPlanned ? handleReactivateSubscription('pro') : handleCancelSubscription('pro') 
                                : handleSelectPlan('pro')}
                            disabled={loading === 'pro'}
                            className={planId === 2 && isYearlyBilled === false ? 
                                isCancelPlanned ? 'blueButton' : 'glassButton' 
                                : 'blueButton'}
                        >
                            {loading === 'pro' ? <LoadingDots color='#fff' message='' /> 
                                : planId === 2 && isYearlyBilled === false ? 
                                    isCancelPlanned ? 'Réactiver l\'abonnement' : 'Annuler l’abonnement' 
                                : 'Choisir cet abonnement'}
                        </Button>
                        )}
                    </div>
                </div>
            </label>
            <label id='plan--basic--display'>
                <div className={(!isYearlyBilled && planId === 1) ? 'plan--card blueBorder' : 'plan--card'} id='plan--basic'>
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
                        <span className='price'>24,99€</span>
                        <span className='price--info'>/mois</span>
                    </div>
                    <div className='flex justify-center t20px'>
                        {isYearlyBilled ?
                        (
                            <p className='boringLines'>Vous possédez déjà un abonnement annuel, représentant un engagement sur un an. Pour transiter vers un abonnement mensuel, vous devez annuler votre abonnement annuel et attendre son échéance.</p>
                        )
                        :(
                        <Button
                            onClick={() => planId === 1 && isYearlyBilled === false ? 
                                isCancelPlanned ? handleReactivateSubscription('light') : handleCancelSubscription('light') 
                                : handleSelectPlan('light')}
                            disabled={loading === 'light'}
                            className={planId === 1 && isYearlyBilled === false ? 
                                isCancelPlanned ? 'blueButton' : 'glassButton' 
                                : 'blueButton' }
                        >
                            {loading === 'light' ? <LoadingDots color='#fff' message='' /> :
                            planId === 1 && isYearlyBilled === false ? 
                            isCancelPlanned ? 'Réactiver' : 'Annuler l’abonnement' 
                            : 'Choisir cet abonnement'}
                        </Button>
                        )}
                    </div>
                </div>
            </label>
        </div>
        )
        :
        (
        <div className='plan--wrapper'>
            <label id='plan--pro--display'>
                <div className={(isYearlyBilled && planId === 2) ? 'plan--card blueBorder' : 'plan--card'} id='plan--pro'>
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
                        <span className='price'>349€</span>
                        <span className='price--info'>/an</span>
                    </div>
                    <div className='flex justify-center t20px'>
                        <Button
                            onClick={() => planId === 2 && isYearlyBilled === true ? 
                                isCancelPlanned ? handleReactivateSubscription('pro_annual') : handleCancelSubscription('pro_annual') 
                                : handleSelectPlan('pro_annual')}
                            disabled={loading === 'pro_annual'}
                            className={planId === 2 && isYearlyBilled === true ? 
                                isCancelPlanned ? 'blueButton' : 'glassButton' 
                                : 'blueButton'}
                        >
                            {loading === 'pro' ? <LoadingDots color='#fff' message='' /> 
                                : planId === 2 && isYearlyBilled === true ? 
                                    isCancelPlanned ? 'Réactiver l\'abonnement' : 'Annuler l’abonnement' 
                                : 'Choisir cet abonnement'}
                        </Button>
                    </div>
                </div>
            </label>
            <label id='plan--basic--display'>
                <div className={(isYearlyBilled && planId === 1) ? 'plan--card blueBorder' : 'plan--card'} id='plan--basic'>
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
                        <span className='price'>249€</span>
                        <span className='price--info'>/an</span>
                    </div>
                    <div className='flex justify-center t20px'>
                        {(isYearlyBilled === true && planId === 2) ? 
                        (
                            <p className='boringLines'>Vous possédez actuellement un abonnement Pro engagé pour une durée d'un an (renouvelable selon vos souhaits). Pour transiter vers l'abonnement Light annuel, vous devez annuler votre abonnement actuel et attendre son échéance.</p>
                        )
                        :(
                        <Button
                            onClick={() => planId === 1 && isYearlyBilled === true ? 
                                isCancelPlanned ? handleReactivateSubscription('light_annual') : handleCancelSubscription('light_annual') 
                                : handleSelectPlan('light_annual')}
                            disabled={loading === 'light_annual'}
                            className={planId === 1 && isYearlyBilled === true ? 
                                isCancelPlanned ? 'blueButton' : 'glassButton' 
                                : 'blueButton' }
                        >
                            {loading === 'light' ? <LoadingDots color='#fff' message='' /> :
                            planId === 1 && isYearlyBilled === true ? 
                               isCancelPlanned ? 'Réactiver' : 'Annuler l’abonnement' 
                               : 'Choisir cet abonnement'}
                        </Button>
                        )}
                    </div>
                </div>
            </label>
        </div>
        )}
      </div>
    )
}

export default ChangePlanForm