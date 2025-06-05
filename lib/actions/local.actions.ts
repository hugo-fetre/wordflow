"use client"

import { analyzeArticle } from "./ai.actions";

export async function analyzeArticleSEO(html: string, keywords: string[], aiEnabled: boolean){

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let score = 0;
    const warnings: string[] = [];

    // Word count
    const wordCount = doc.body.textContent?.split(/\s+/).length || 0;
    if(wordCount < 300){
        warnings.push("Article trop court");
    } else if(wordCount < 800){
        score += 5;
        warnings.push("Longueur de l'article à améliorer ("+wordCount+"/800)");
    }

    // Analyze keywords
    const textContent = doc.body.textContent?.toLowerCase() || "";
    const keywordOccurrences: Record<string, number> = {};
    let keyWordStuffed = false;
    let keyWordNotFound = false;
    if(keywords.length === 0){
        warnings.push("Aucun mot-clé repéré");
    } else {
        keywords.forEach((kw) => {
            const normalizedKeyword = kw.trim().toLowerCase().replace(/\s+/g, "\\s*"); // remplace tous les espaces par \s*
            const regex = new RegExp(`\\b${normalizedKeyword}\\b`, "g");
            const matches = textContent.match(regex);
            keywordOccurrences[kw] = matches ? matches.length : 0;
            if(keywordOccurrences[kw] === 0){
                keyWordNotFound = true;
                warnings.push("Le mot clé "+kw+" n'apparaît pas.");
            } else if(keywordOccurrences[kw]/wordCount > 0.02){
                keyWordStuffed = true;
                warnings.push("Le mot clé "+kw+" apparait trop de fois. Risque d'être repéré comme \"keyword stuffing\".");
            }
        });
        if(keyWordStuffed === false){
            score += 5;
        }
        if(keyWordNotFound === false){
            score += 5;
        }
    }
    // H1 count
    const h1Count = doc.querySelectorAll("h1").length;
    if (h1Count === 1) {
        score += 5;
        const h1 = doc.querySelector("h1")?.textContent || "";
        
        // Normalise le h1
        const normalizedH1 = h1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // enlève les accents
        let keywordInH1 = false;
        for (const kw of keywords) {
            const normalizedKeyword = kw
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "\\s*"); // tolère les espaces optionnels

            const regex = new RegExp(`\\b${normalizedKeyword}\\b`, "g");

            if (regex.test(normalizedH1)) {
                keywordInH1 = true;
                break;
            }
        }

        if (keywordInH1) {
            score += 5; // ou ce que tu veux
        } else {
            warnings.push("Aucun mot-clé trouvé dans la balise H1.");
        }
    } else if (h1Count === 0) {
        warnings.push("Aucune balise H1 trouvée.");
    } else {
        warnings.push("Plusieurs balises H1 détectées.");
    }

    // H2 compare - error check
    const h2Count = doc.querySelectorAll("h2").length;
    if(h2Count > 0 && h1Count === 0){
        warnings.push("Erreur de structure: Balise(s) H2 détectée(s) sans balise H1.");
    }

    // H3 compare - error check
    const h3Count = doc.querySelectorAll("h3").length;
    if(h3Count > 0 && h2Count === 0){
        warnings.push("Erreur de structure: Balise(s) H3 détectée(s) sans balise H2.");
    }

    // Good title structure: There are several H2 titles under an H1 - may have no h3, it's ok
    if(h2Count > 0 && h1Count === 1){
        score += 5;
    }

    const imgCount = doc.querySelectorAll("img").length;

    // Images with alt - doesn't affect score but show warning
    const images = doc.querySelectorAll("img");
    const imagesWithAlt = [...images].filter(img => img.hasAttribute("alt")).length;
    if (imagesWithAlt === images.length && images.length >= 0) {
        score += 0;
    } else {
        warnings.push("Certaines images n'ont pas de balise ALT.");
    }
    
    // Check if there are internal and external links
    const links = doc.querySelectorAll("a");
    const hasInternal = [...links].some(link => link.getAttribute("href")?.startsWith("/"));
    const hasExternal = [...links].some(link => link.getAttribute("href")?.startsWith("http"));
    if (hasInternal && hasExternal) {
        score += 5;
    } else {
        if (!hasInternal) warnings.push("Aucun lien interne trouvé.");
        if (!hasExternal) warnings.push("Aucun lien externe trouvé.");
    }

    // Check title meta
    const title = doc.querySelector("title")?.textContent || "";
    if(title === ""){
        warnings.push("Pas de balise title trouvée");
    } else {
        score += 5;
    }

    // Check meta description
    const metaDesc = doc.querySelector("meta[name='description']")?.getAttribute("content") || "";
    if(metaDesc === ""){
        warnings.push("Pas de balise meta description");
    } else {
        score += 5;
    }

    return {
        wordCount,
        score,
        warnings
    };
}