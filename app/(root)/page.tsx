import { Button } from '@/components/ui/button'
import ConnectButton from '@/components/ui/connectbutton'
import { LoadingDots } from '@/components/ui/loadingdots'
import { presentationFeatures } from '@/constants'
import { PricingTable, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
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
    
    /*var workspaces: IWorkspace[] = [];
    var currentWorkspace = undefined;
    if(userId){
        const user = await getUserById(userId);
        workspaces = await getWorkspacesList(user._id);
        currentWorkspace = workspaces[0]; //workspaces.find(w => w.publicId === params.workspaceId);
        console.log("Home page: workspaces loaded, try to redirect");
        window.location.replace('/app/'+currentWorkspace._id);
    }*/

    
    
    return (
    <div>
        <section className='landingPage'>
            <div id='landing--bloc1'>
                <header className="flex justify-between items-center p-4 gap-4 h-16" id='landing--header'>
                    <Image src={"/logo_cb.png"} alt="Logo wordflow" width={200} height={32}></Image>
                    <div className='nav--small'>
                        <span><a href='#fonctionnalités'>Fonctionnalités</a></span>
                        <div className='smallSeparator'></div>
                        <span>Tarifs</span>
                        <div className='smallSeparator'></div>
                        <span>Check-up SEO</span>
                        <div className='smallSeparator'></div>
                        <span>Parrainage</span>
                    </div>
                    <SignedOut>
                        <div className='flex gap-4'>
                            <SignInButton forceRedirectUrl={'/auth-redirect'}>
                                <button className='outlineBlack'>Se connecter</button>
                            </SignInButton>
                            <SignUpButton forceRedirectUrl={'/register-process'}>
                                <button className='outlineBlack'>S'inscrire</button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                </header>
                <div className='presentationContainer'>
                    <h1>Votre contenu SEO, optimisé avec l'IA</h1>
                    {/*<p className='mainSub'>Meilleurs mot-clés, meilleures idées, meilleurs articles. Générez du contenu SEO de pointe pour vos clients et augmentez votre productivité avec Wordflow.</p>*/}
                    <p className='mainSub'>Générez des articles SEO de pointe, améliorez vos performances sur Google et augmentez votre productivité avec Wordflow.</p>
                    <div className='mainCTA'><span>Essayer maintenant</span><ArrowRight size={20} /></div>
                </div>
            </div>
            <div id='fonctionnalités'>
                <h2>Votre référencement Google,<br/> boosté avec l'IA</h2>
                <p className='mainSub'>Plus d'articles. Plus performants. Plus rapidement. Tout simplement.</p>
                <div id='features--table'>
                    {presentationFeatures.map((item, idx) => (
                        <div className='featureCard' key={idx}>
                            <span>{item.title}</span>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home