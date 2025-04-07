"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Workspace from "../database/models/workspace.model";

// CREATE
export async function createWorkspace(workspace: AddWorkspaceParams) {
    try {
      await connectToDatabase();
  
      const newWorkspace = await Workspace.create(workspace);
  
      return JSON.parse(JSON.stringify(newWorkspace));
    } catch (error) {
      handleError(error);
    }
}

// READ
export async function getWorkspacesList(userId: string) {
  try {
    await connectToDatabase();

    const list = await Workspace.find({ manager: userId });

    if (!list) throw new Error("No workspace found");

    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    handleError(error);
  }
}