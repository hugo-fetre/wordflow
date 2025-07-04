import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FaqPage = () => {
  return (
    <div className='faq--wrapper'>
        <div className='faq--card'>
            <div className='faq--left--side'>
            </div>
            <div className='faq--right--side'>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Que fait wordflow ?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>Wordflow vous permet, à partir des informations que vous renseignez, de générer des articles de qualité professionnelle pour améliorer votre SEO, en quelques clics. Tout est pensé pour vous: structure HTML, contenu, densité des mots et plus encore.</p>
                            <p>La plateforme vous aide également à accélérer et automatiser vos tâches ! Wordflow peut aussi vous suggérer des mots clés et des idées d'articles, analyser un article existant ou encore générer des balises meta pour mieux intégrer vos images.</p>
                            <p>D'autres fonctionnalités sont à venir ! Notre prochain objectif s'axera sur la création d'un réseau vous permettant d'obtenir des backlinks en étant cité par d'autres utilisateurs Wordflow lorsqu'ils génèrent un article.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Pour quel genre d'utilisateurs ?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>Wordflow vous propose différentes fonctionnalités selon vos besoins.</p>
                            <ul>
                                <li>Le plan Light est idéal pour les utilisateurs souhaitant améliorer le SEO de leur entreprise. Il permet de gérer du contenu pour un seul site web.</li>
                                <li>Le plan Pro est idéal pour les utilisateurs souhaitant améliorer le SEO de plusieurs sites. Si vous êtes Freelance, Professionnel du marketing ou Multipreneur, ce plan a été conçu pour vous !</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>Quelle différence entre Wordflow et les autres outils SEO ?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>Les autres outils SEO (Ahref, Semrush, Google Search Console, etc.) sont d'excellents outils d'analyse pour comprendre votre positionnement et le score global de votre site. Ils vous fourniront des détails essentiels pour améliorer votre positionnement.</p>
                            <p>Wordflow s'axe sur la génération de contenu SEO qui aidera votre site à se positionner sur de nombreux mots clés et requêtes.</p>
                            <p>Finalement, Wordflow est un outil complémentaire qui vous permet d'optimiser votre productivité en diminuant les coûts temporels et financiers de rédaction d'articles SEO.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Quelle différence entre Wordflow et ChatGPT ?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>ChatGPT nécessite un prompt pour chaque demande, qui peut être rigoureux à rédiger, surtout lorsque l'on souhaite obtenir un résultat optimisé. Cependant, vous ne disposez pas toujours de toutes les clés pour concevoir un prompt efficace.</p>
                            <p>Wordflow vous propose automatiquement tous les outils nécessaires pour vous aider à concevoir l'article parfait en quelques clics. Pensé par des professionnels Tech & Marketing, Wordflow intègre automatiquement tous les paramètres nécessaires pour obtenir des résultats optimisés et augmenter votre productivité.</p>
                            <p>Plus encore, Wordflow vous propose un suivi de vos mots-clés et de vos idées d'articles. Fini les fichiers annexes, app tierces et autres supports, ici, toutes les clés pour votre rédaction SEO sont réunies au même endroit !</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Mes données sont-elles sécurisées ?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>Notre politique impose que vos données ne soient jamais utilisées pour alimenter les modèles d'Intellgience Artificielle, ni à des fins publicitaires.</p>
                            <p>Par ailleurs, nous ne conservont aucune donnée après la suppression de votre compte, à l'exception des factures envoyées, conformément au RGPD Européen.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Puis-je changer ou annuler mon abonnement ?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>Vous pouvez changer de plan à tout moment. Cependant, veuillez noter qu'un abonnement annuel vous engage sur une année complète et ne peut pas être annulé avant son échéance.</p>
                            <ul>
                                <li>Abonnement mensuel: vous pouvez changer d'abonnement comme bon vous semble. Si vous souhaitez basculer sur une facturation annuelle, votre abonnement mensuel prendra fin et vous passerez en abonnement annuel.</li>
                                <li>Abonnement annuel: vous pouvez passer librement de l'abonnement Light à l'abonnement Pro. Dans ce cas, votre nouvel abonnement annuel se verra appliquer une remise du montant correspondant aux périodes non consommées de votre plan actuel. L'échéance de votre nouvel abonnement sera fixé à un an après la date du changement.</li>
                            </ul>
                            <p>Exceptions</p>
                            <ul>
                                <li>Vous ne pouvez pas transiter vers un abonnement annuel Light si votre abonnement actuel est annuel Pro.</li>
                                <li>Un abonnement annuel, vous angageant un an, ne peut être rompu pour un abonnement mensuel avant son échéance.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
  )
}

export default FaqPage