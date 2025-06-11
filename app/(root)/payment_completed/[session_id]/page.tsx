import { CircleCheckBig, Link } from 'lucide-react'
import React from 'react'

const PaymentCompleted = () => {
  return (
    <div id='thanks--page'>
        <CircleCheckBig size={50} className='payment--confirmed--label'/>
        <h1>Paiement confirmé</h1>
        <p className='mainSub'>Vous êtes prêts pour conquérir le web.</p>
        <a href='/' className='mainCTA'>Commencer</a>
    </div>
  )
}

export default PaymentCompleted