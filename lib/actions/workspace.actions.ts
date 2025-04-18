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

    const list = await Workspace.find({ manager: userId.toString() });

    if (!list) throw new Error("No workspace found");

    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateWorkspace(workspaceId: string, workspace: UpdateWorkspaceParams) {
  try {
    await connectToDatabase();

    const updatedWorkspace = await Workspace.findOneAndUpdate({ _id: workspaceId }, workspace, {
      new: true,
    });

    if (!updatedWorkspace) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedWorkspace));
  } catch (error) {
    handleError(error);
  }
}