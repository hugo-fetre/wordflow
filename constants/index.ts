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
    light: "price_1RXk5FPDeyXZlganbYsZoVrv"
  }]
  
  /*export const plans = [
    {
      _id: 1,
      name: "Free",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      credits: 20,
      inclusions: [
        {
          label: "20 Free Credits",
          isIncluded: true,
        },
        {
          label: "Basic Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: false,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 2,
      name: "Pro Package",
      icon: "/assets/icons/free-plan.svg",
      price: 40,
      credits: 120,
      inclusions: [
        {
          label: "120 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 3,
      name: "Premium Package",
      icon: "/assets/icons/free-plan.svg",
      price: 199,
      credits: 2000,
      inclusions: [
        {
          label: "2000 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: true,
        },
      ],
    },
  ];
  
  export const transformationTypes = {
    restore: {
      type: "restore",
      title: "Restore Image",
      subTitle: "Refine images by removing noise and imperfections",
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: "Background Remove",
      subTitle: "Removes the background of the image using AI",
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: "Generative Fill",
      subTitle: "Enhance an image's dimensions using AI outpainting",
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: "Object Remove",
      subTitle: "Identify and eliminate objects from images",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Identify and recolor objects from the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
  
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };*/
  
  export const defaultValues = {
    title: "Nouveau workspace",
    description: "",
    website: "",
  };
  
  export const creditFee = -1;