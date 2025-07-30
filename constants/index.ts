export const navLinks1 = (workspaceId: string | null) => [
    {
      label: "Accueil",
      route: "/app/"+workspaceId,
    },
    {
      label: "Gestion des mots clés",
      route: "/app/"+workspaceId+"/keywords",
    },
    {
      label: "Générateur d'articles",
      route: "/app/"+workspaceId+"/generate",
    },
  ];

  export const navLinks2 = (workspaceId: string | null) => [
    {
      label: "Meta-descripteur",
      route: "/app/"+workspaceId+"/meta-generator",
    },
    {
      label: "SEO Check-up",
      route: "/seo-checkup",
    },
  ];

  export const navLinks2Light = () => [
    {
      label: "SEO Check-up",
      route: "/seo-checkup",
    },
  ];

  export const navLinks3 = [
    {
      label: "Profil",
      route: "/profile",
    },
    {
      label: "Mon abonnement",
      route: "/change-plan",
    },
  ];

  export const navNotLogged = [
     {
      label: "SEO Check-up",
      route: "/seo-checkup",
    },
    {
      label: "Tarifs",
      route: "/pricing",
    },
  ];

  export const proFeatures = [
    "Génération de mots clés",
    "Suggestion d'articles",
    "Génération d'articles",
    "Analyse d'articles approfondie",
    "Génération de méta-données",
    "De nouvelles fonctionnalités à venir"
  ];

  export const basicFeatures = [
    "Génération de mots clés",
    "Suggestion d'articles",
    "Génération d'articles",
    "",
    "",
    ""
  ];

  export const presentationFeatures = [
    {
      title: "Génération de mots clés",
      description: "Wordflow identifie pour vous les mots clés les plus pertinents sur lesquels se positionner selon votre niche",
      image_url: "/icons/search.png",
      isInDevelopment: false,
    },
    {
      title: "Génération d'articles SEO",
      description: "Des textes conçus pour plaire à vos lecteurs comme à Google",
      image_url: "/icons/blog.png",
      isInDevelopment: false,
    },
    {
      title: "Analyse d'articles SEO",
      description: "Lisibilité, structure, densité de mots-clés... améliorez vos articles pour des contenus plus performants",
      image_url: "/icons/seo_analysis.png",
      isInDevelopment: false,
    },
    {
      title: "Suggestion d'articles",
      description: "Wordflow identifie pour vous des idées de contenu à explorer pour captiver vos lecteurs et développer votre SEO",
      image_url: "/icons/suggest.png",
      isInDevelopment: false,
    },
    {
      title: "Analyse des tendances",
      description: "Détectez les sujets les plus tendances et les axes à fort potentiel grâce à notre IA de veille sémantique",
      image_url: "/icons/trends.png",
      isInDevelopment: true,
    },
    {
      title: "Meta-descriptions IA",
      description: "Une image à intégrer ? Wordflow génère pour vous toutes les balises meta (title, alt, etc.) à ne pas négliger.",
      image_url: "/icons/code.png",
      isInDevelopment: false,
    },
    {
      title: "Réseau Hyperlink",
      description: "Bénéficiez de backlinks pointant vers votre site grâce au contenu généré par les autres utilisateurs de la communauté Wordflow.",
      image_url: "/icons/network.png",
      isInDevelopment: true,
    },
    {
      title: "Générateur de FAQ",
      description: "Notre IA vous aide à identifier et comprendre les questionnements des internautes pour renforcer votre positionnement en ligne. ",
      image_url: "/icons/faq.png",
      isInDevelopment: true,
    },
    {
      title: "Confidentialité",
      description: "Vos données ne seront pas utilisées pour alimenter les modèles d'IA",
      image_url: "/icons/safe.png",
      isInDevelopment: false,
    },
  ];

  // !!!! Warning : currently test prices
  export const prices = [{
    pro: "price_1RXk4sPDeyXZlganJhk49AgS",
    light: "price_1RXk5FPDeyXZlganbYsZoVrv",
    pro_annual: "price_1RhAlGPDeyXZlganRGMdq8e5",
    light_annual: "price_1RhAkhPDeyXZlganBgls8m3S",
  }]
  
  export const defaultValues = {
    title: "Pas censé accéder à ça",
    description: "",
    website: "",
  };
  
  export const creditFee = -1;