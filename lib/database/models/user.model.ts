import { Document, model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    planId: { type: Number, default: 0 },
    creditBalance: { type: Number, default: 10 },
    creationDate: { type: Date, default: Date.now },
})

const User = models?.User || model("User", UserSchema);

export default User;