import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document{
    clerkId: string;            // L'ID unique de l'utilisateur dans Clerk
    email: string;              // L'email de l'utilisateur
    planId: number;             // L'ID du plan d'abonnement de l'utilisateur
    isActive: boolean;
    hasBeenSuspended: boolean;
    isYearlyBilled: boolean;
    isCancelPlanned: boolean;
    stripeCustomerId: string;   // L'ID stripe de l'abonné
    stripeSubsriptionId: string; // L'ID stripe de l'abonnement pour switch d'abonnement (produit)
    creditBalance: number;      // Le solde de crédits de l'utilisateur
    creationDate: Date;         // La date de création du compte de l'utilisateur
}  

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    planId: { type: Number, default: 0 },
    isActive: {type: Boolean, default: false},
    hasBeenSuspended: {type: Boolean, default: false},
    isYearlyBilled: {type: Boolean, default: false},
    isCancelPlanned: {type: Boolean, default: false},
    stripeCustomerId: {type: String, default: ""},
    stripeSubsriptionId: {type: String, default: ""},
    creditBalance: { type: Number, default: 10 },
    creationDate: { type: Date, default: Date.now },
})
/* Plan Id 
Free trial: 0
Wordflow light: 1 (19,99€/m)
Wordflow plus: 2 (all features - 24,99€/m -> include e-comm features ?)
Wordflow commerce: 3 (product description -> 9,99€/m)
VIP: 100 (all features for free)
*/
const User = models?.User || model("User", UserSchema);

export default User;