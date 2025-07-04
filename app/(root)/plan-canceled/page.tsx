import { CircleCheckBig } from 'lucide-react'
import React from 'react'

const PlanCanceledPage = () => {
  return (
    <div id='thanks--page'>
        <CircleCheckBig size={50} className='payment--confirmed--label'/>
        <h1>Nous sommes désolés de vous voir partir...</h1>
        <p className='mainSub'>Votre abonnement a été annulé avec succès. Vous pouvez continuer d'accéder aux fonctionnalités jusqu'à la fin de la période en cours.</p>
        <a href='/' className='mainCTA'>Continuer</a>
    </div>
  )
}

export default PlanCanceledPage