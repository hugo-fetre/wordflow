import FaqPage from '@/components/shared/faq_page'
import LandingFooter from '@/components/shared/landing_footer'
import LandingPlanPresentation from '@/components/shared/landing_plan_presentation'
import MarketingAngles from '@/components/shared/marketing_angles'
import { presentationFeatures } from '@/constants'
import { SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import React from 'react'

const Home = async () => {    
    
    const { userId }= await auth();
    if(userId){
        redirect('/auth-redirect');
    }
  
    
    return (
    <div>
        <section className='landingPage'>
            <div id='landing--bloc1'>
                <header className="flex justify-center items-center p-4 gap-4 h-16" id='landing--header'>
                    <div className='topMenu'>
                        <span><a href='#fonctionnalités'>Fonctionnalités</a></span>
                        <div className='smallSeparator'></div>
                        <span><a href="#tarifs">Tarifs</a></span>
                        <div className='smallSeparator'></div>
                        <span><a href="/seo-checkup">Check-up SEO</a></span>
                        <div className='smallSeparator'></div>
                        <span><a href="#FAQ">FAQ</a> </span>
                    </div>
                </header>
                <SignedOut>
                    <div className='flex gap-4' id='landing-auth-row'>
                        <SignInButton forceRedirectUrl={'/auth-redirect'}>
                            <button className='outlineMain'>Se connecter</button>
                        </SignInButton>
                        <SignUpButton forceRedirectUrl={'/register-process'}>
                            <button className='mainButton'>S'inscrire</button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                <div className='presentationContainer'>
                    <Image src={"/logo/logo-gradient.png"} alt="Logo wordflow" width={200} height={32}></Image>
                    <h1>Votre contenu SEO, <br /> optimisé avec l'IA</h1>
                    {/*<p className='mainSub'>Meilleurs mot-clés, meilleures idées, meilleurs articles. Générez du contenu SEO de pointe pour vos clients et augmentez votre productivité avec Wordflow.</p>*/}
                    <p className='mainSub'>Générez des articles SEO de pointe, améliorez vos performances sur Google et augmentez votre productivité avec Wordflow.</p>
                    <div className='mainCTA'><span>Essayer maintenant</span><ArrowRight size={20} /></div>
                </div>
                <Image src={"/grid1.png"} alt="Logo wordflow" width={800} height={400} id='grid1'></Image>
            </div>
            <div id='fonctionnalités'>
                <h2>Votre référencement Google,<br/> boosté avec l'IA</h2>
                <p className='mainSub'>Plus d'articles. Plus performants. Plus rapidement. Tout simplement.</p>
                <div id='features--table'>
                    {presentationFeatures.map((item, idx) => (
                        <div className='featureCard' key={idx}>
                            {item.isInDevelopment && (
                                <div className='smallTag'>En développement</div>
                            )}
                            <div className='flex justify-center b15px'>
                                <Image src={item.image_url.toString()} alt="Logo wordflow" width={35} height={35}></Image>
                            </div>
                            <span>{item.title}</span>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div id="tarifs">
                <LandingPlanPresentation></LandingPlanPresentation>
                <div className='flex justify-center'>
                    <SignUpButton forceRedirectUrl={'/register-process'}>
                        <button className='mainCTA'>Souscrire à un abonnement</button>
                    </SignUpButton>
                </div>
            </div>
        </section>
        <section className='landingPage'>
            <div id='quelques-chiffres'>
                <h2>Pourquoi investir dans le SEO <br /> avec Wordflow ?</h2>
                <MarketingAngles></MarketingAngles>
            </div>
            <div id="FAQ">
                <h2>Questions fréquentes</h2>
                <FaqPage></FaqPage>
            </div>
            {/*}
            <div>
                <h2>Faites du Business avec Wordflow</h2>
                <h3>Devenez affilié et gagnez de l'argent en partageant Wordflow</h3>
                <p className='mainSub'>Vous aimez notre app ? Parlez-en autour de vous et gagnez 50% <br /> des ventes nettes réalisées grâce à votre lien.</p>
                <h3>Comment ça marche ?</h3>
            </div>
            */}
        </section>
        <LandingFooter></LandingFooter>
    </div>
  )
}

export default Home