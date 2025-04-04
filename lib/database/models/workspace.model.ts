import { Document, model, models, Schema } from "mongoose";

export interface IWorkspace extends Document{
    publicId: string;
    name: string;
    description: string;
    website: string;
    keywords?: string[];
    articlesIdeas?: string[];
    manager?: {
        _id: string;
    }
}

const WorkspaceSchema = new Schema({
    publicId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    keywords: { type: [String] },
    articlesIdeas: { type: [String] },
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Workspace = models?.Workspace || model('Workspace', WorkspaceSchema);

export default Workspace;