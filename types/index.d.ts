/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    isActive: boolean;
  };
  
  declare type UpdateUserParams = {
    email: string;
  };

  declare type  updateUserSubscriptionParams = {
    stripeCustomerId: string;   // L'ID stripe de l'abonné
    stripeSubsriptionId: string;
    isActive: boolean;
  };

  declare type cancelUserSubscriptionParams = {
    isCancelPlanned: boolean;
  }

  declare type blockUserAccessParams = {
    isActive: boolean;
    planId: number;
    isCancelPlanned: boolean;
  }

  declare type updateUserSelectedPlanParams = {
    planId: number;
    isYearlyBilled: boolean;
  }
  
  // ====== Workspace PARAMS
  declare type AddWorkspaceParams = {
    /*workspace: {
        publicId: string;
        name: string;
        description: string;
        website: string;
        keywords: string[];
        articlesIdeas: string[];
    };*/
    manager: string;
  };
  
  declare type UpdateWorkspaceParams = {
    name: string;
    description: string;
    website: string;
    keywords: string[];
    articlesIdeas: string[];
    //manager: string;
  };

 // ====== IA PARAMS
 declare type articlePrompt = {
   title: string;
   description: string;
   output_format: string;
   output_style: string;
 }
  
  declare type Transformations = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
      prompt: string;
      removeShadow?: boolean;
      multiple?: boolean;
    };
    recolor?: {
      prompt?: string;
      to: string;
      multiple?: boolean;
    };
    removeBackground?: boolean;
  };
  
  // ====== TRANSACTION PARAMS
  declare type CheckoutTransactionParams = {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
  };
  
  declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
  };
  
  declare type TransformationTypeKey =
    | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";
  
  // ====== URL QUERY PARAMS
  declare type FormUrlQueryParams = {
    searchParams: string;
    key: string;
    value: string | number | null;
  };
  
  declare type UrlQueryParams = {
    params: string;
    key: string;
    value: string | null;
  };
  
  declare type RemoveUrlQueryParams = {
    searchParams: string;
    keysToRemove: string[];
  };
  
  declare type SearchParamProps = {
    params:{
      workspaceId: string;
    }
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type TransformationFormProps = {
    action: "Add" | "Update";
    userId: string;
    type: TransformationTypeKey;
    creditBalance: number;
    data?: IImage | null;
    config?: Transformations | null;
  };

  declare type BusinessInfoFormProps = {
    data?: IWorkspace | null;
  };
  
  declare type TransformedImageProps = {
    image: any;
    type: string;
    title: string;
    transformationConfig: Transformations | null;
    isTransforming: boolean;
    hasDownload?: boolean;
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
  };