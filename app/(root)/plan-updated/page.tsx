import { CircleCheckBig } from 'lucide-react'
import React from 'react'

const PlanUpdatedPage = () => {
  return (
    <div id='thanks--page'>
        <CircleCheckBig size={50} className='payment--confirmed--label'/>
        <h1>Votre abonnement a été mis à jour avec succès !</h1>
        <p className='mainSub'>Merci pour votre confiance !</p>
        <a href='/' className='mainCTA'>Continuer</a>
    </div>
  )
}

export default PlanUpdatedPage