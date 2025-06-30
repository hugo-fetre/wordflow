"use client"
import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { basicFeatures, proFeatures } from '@/constants'

const LandingPlanPresentation = () => {
    const [isAnnual, setIsAnnual] = useState(false)

    // Tarifs mensuels et annuels
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
    return (
      <div className=''>
        <h2>Tarifs</h2>
        <div className='flex justify-center'>
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
        <div className='plan--wrapper'>
            <label id='plan--pro--display'>
                <div className='plan--card' id='plan--pro'>
                    <h3>Wordflow Pro</h3>
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
            <label id='plan--basic--display'>
                <div className='plan--card' id='plan--basic'>
                    <h3>Wordflow Light</h3>
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
                        <span className='price'>{isAnnual ? prices.yearly.basic : prices.monthly.basic}</span>
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
      </div>
    )
}

export default LandingPlanPresentation