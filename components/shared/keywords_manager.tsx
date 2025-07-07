"use client"
import React, { useEffect, useState, useRef } from 'react'
import { useWorkspaces } from '@/context/WorkspacesContext'
import Image from 'next/image'
import { updateWorkspace } from '@/lib/actions/workspace.actions'
import { useRouter } from "next/navigation"
import { generateArticleIdeas, generateKeywords } from '@/lib/actions/ai.actions'
import Link from 'next/link'
import { LoadingDots } from '../ui/loadingdots'

const KeywordsManager = ({ id }: { id: string }) => {

    const router = useRouter()
    const workspaces = useWorkspaces();
    const currentWorkspace = workspaces.find(w => w._id == id);
    
    const initialKeywordsRef = useRef<string[]>([]); // stocke la version de base
    const initialArticlesRef = useRef<string[]>([]); // stocke la version de base
    const [hasChanged, setHasChanged] = useState(false);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [articles, setArticles] = useState<string[]>([]);
    const [newKeyword, setNewKeyword] = useState("");

    const [loadingKeywords, setLoadingKeywords] = useState(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    // Set custom comparison function
    const isEqual = (a: string[], b: string[]) => JSON.stringify(a) === JSON.stringify(b);

    // Save initial keywords list and bind currentWorkspace.keywords with keywords
    useEffect(() => {
        if (currentWorkspace?.keywords) {
            setKeywords(currentWorkspace.keywords);
            initialKeywordsRef.current = currentWorkspace.keywords; // save initial version
        }
        if (currentWorkspace?.articlesIdeas){
            setArticles(currentWorkspace.articlesIdeas);
            initialArticlesRef.current = currentWorkspace.articlesIdeas;
        }
    }, [currentWorkspace]);

   // Analyse changes between initial keywords list and modified list
    useEffect(() => {
        setHasChanged(!isEqual(keywords, initialKeywordsRef.current) || !isEqual(articles, initialArticlesRef.current));
    }, [keywords, articles]);

    // Define delete keyword function
    const handleDeleteKeyword = (indexToDelete: number) => {
        setKeywords(prev => prev.filter((_, i) => i !== indexToDelete))
    }
    // Define add keyword function
    const handleAddKeyword = () => {
        const trimmed = newKeyword.trim();
        if (trimmed && !keywords.includes(trimmed)) {
            setKeywords((prev) => [...prev, trimmed]);
            setNewKeyword("");
        }
    };
    // Define update currentworkspace function
    const updateDatabase = () => {
        const w = {
            name: currentWorkspace?.name ?? "",
            description: currentWorkspace?.description ?? "",
            website: "",
            keywords: keywords ?? [""],
            articlesIdeas: articles ?? [""],
            //manager: string;
        };
        updateWorkspace(id, w).then(() => {
            router.refresh()  // 🔄 re-fetch les données côté serveur sans reload complet
        })
    };
    // Call AI for keyword completion
    const completeKeywords = async () => {
        if(currentWorkspace){
            setLoadingKeywords(true);
            const answer = await fetch('/api/internal/keywords', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workspace: currentWorkspace })
            });
              
            // const response = await generateKeywords(currentWorkspace);
            if(answer.ok){
                const raw = await answer.text();

                // Étape 1 : parser la réponse JSON contenant la chaîne markdown
                const { result } = JSON.parse(raw); // result est une string contenant ```json\n[...]\n```

                // Étape 2 : nettoyer la string pour enlever ```json et ```
                const withoutJsonTag = result.replace('```json', '').replace('```', '').trim();

                // Étape 3 : parser enfin la vraie liste JSON
                const keywordsList = JSON.parse(withoutJsonTag);

                setKeywords(keywordsList);

                // Database update
                const updatedWorkspace = {
                    name: currentWorkspace.name ?? "",
                    description: currentWorkspace.description ?? "",
                    website: "",
                    keywords: keywordsList,
                    articlesIdeas: currentWorkspace.articlesIdeas ?? [""],
                };
                await updateWorkspace(id, updatedWorkspace);
                router.refresh();
            } 
        }
    }

    // Define delete article function
    const handleDeleteArticle = (indexToDelete: number) => {
        setArticles(prev => prev.filter((_, i) => i !== indexToDelete))
    }

     // Call AI for keyword completion
    const completeArticleIdeas = async () => {
        if(currentWorkspace){
            setLoadingSuggestions(true);
            // USE Fetch to target Internal API Call to avoid 504 errors due to long IA response >10s
            // OLD WAY: const answer = await generateArticleIdeas(currentWorkspace);
            const answer = await fetch('/api/internal/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workspace: currentWorkspace })
            });

            if(answer.ok){
                const raw = await answer.text();

                // Étape 1 : parser la réponse JSON contenant la chaîne markdown
                const { result } = JSON.parse(raw); // result est une string contenant ```json\n[...]\n```

                // Étape 2 : nettoyer la string pour enlever ```json et ```
                const withoutJsonTag = result.replace('```json', '').replace('```', '').trim();

                // Étape 3 : parser enfin la vraie liste JSON
                const articlesList = JSON.parse(withoutJsonTag);

                setArticles(articlesList);

                // Database update
                const updatedWorkspace = {
                    name: currentWorkspace.name ?? "",
                    description: currentWorkspace.description ?? "",
                    website: "",
                    keywords: currentWorkspace.keywords ?? [""],
                    articlesIdeas: articlesList,
                };
                await updateWorkspace(id, updatedWorkspace);
                router.refresh();
            } 
        }
    }
    
    return (
    <div className='content--wrapper'>
        <div className="keyword--input">
            <h2>Mots clés principaux</h2>
            <input
                type="text"
                placeholder="Ajouter un mot-clé"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
                className='in--keyword'
            />
            <button onClick={handleAddKeyword} className='smallPrimaryButton'>+</button>
            <div className='smallSeparator'></div>
            <button onClick={completeKeywords} className='smallColorButton'>
                {loadingKeywords ? <LoadingDots color='#fff' message=''></LoadingDots> : "Générer" }
            </button>
            {hasChanged && (
                <button className='button--main--submit primaryButton' onClick={updateDatabase}>
                    Enregistrer
                </button>
            )}
        </div>
        <div className='keywords--wrapper'>
            {keywords.length > 0 ? 
                (keywords.map((k, i) => (
                    <span key={i} className='keyword--unit'>
                        {k}
                        <button className='keyword--delete--btn' onClick={() => handleDeleteKeyword(i)}><Image width={14} height={14} src={"/delete-icon.png"} alt='fermer'/></button>
                    </span>
                ))) 
                : ( <div>Aucun keyword</div>)
            }
        </div>
        <div className="keyword--input t40px">
            <h2>Suggestion d'articles</h2>
            <div className='smallSeparator'></div>
            <button onClick={completeArticleIdeas} className='smallColorButton'>
                {loadingSuggestions ? <LoadingDots color='#fff' message=''></LoadingDots> : "Générer" }
            </button>
        </div>
        <div className='articles--wrapper b40px'>
            {articles.length > 0 ? 
                (articles.map((k, i) => (
                    <span key={i} className='article--unit'>
                        {k}
                        <button className='article--delete--btn' onClick={() => handleDeleteArticle(i)}><Image width={14} height={14} src={"/delete-icon.png"} alt='fermer'/></button>
                        <Link href={'/app/'+currentWorkspace?._id+'/generate/'+k} className='article--suggest--btn'>
                            <Image width={20} height={20} src={"/chevron-right.png"} alt='Générer'/>
                        </Link>
                    </span>
                ))) 
                : ( <div>Aucune idée d'article</div>)
            }
        </div>
    </div>
    )
}

export default KeywordsManager