import { Button } from '@/components/ui/button'
import ConnectButton from '@/components/ui/connectbutton'
import { LoadingDots } from '@/components/ui/loadingdots'
import { PricingTable, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
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
            <header className="flex justify-between items-center p-4 gap-4 h-16">
                <Image src={"/logo.png"} alt="Logo wordflow" width={200} height={32}></Image>
                <SignedOut>
                    <div className='flex gap-4'>
                        <SignInButton forceRedirectUrl={'/auth-redirect'}>
                            <button className='outlineWhite'>Se connecter</button>
                        </SignInButton>
                        <SignUpButton forceRedirectUrl={'/register-process'}>
                            <button className='outlineWhite'>S'inscrire</button>
                        </SignUpButton>
                    </div>
                </SignedOut>
            </header>
            <div id='landing--bloc1'>
                <div className='presentationContainer'>
                    <h1>Vos articles de blog optimisés avec l'IA</h1>
                    <p className='mainSub'>Meilleurs mot-clés, meilleures idées, meilleurs articles. Générez du contenu SEO de pointe pour vos clients et augmentez votre productivité avec Wordflow.</p>
                    <div className='nav--small'>
                        <span>Découvrir</span>
                        <div className='smallSeparator'></div>
                        <span>Tarifs</span>
                    </div>
                </div>
            </div>
            <div id='landing--bloc2'>
                <h2>De nouveaux articles. Plus performants.<br/> Plus rapidement. Tout simplement.</h2>
                <div id='features--table'>
                    <div>
                        <ul>
                            <li>Gestion et génération de mot clés </li>
                            <li>Suggestion d'articles</li>
                            <li>Rédaction d'articles optimisés SEO</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Accès aux tendances de votre niche</li>
                            <li>Génération de méta données d'images</li>
                            <li>Analyse de score SEO</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home