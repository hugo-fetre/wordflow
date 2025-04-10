"use client";

import { IWorkspace } from "@/lib/database/models/workspace.model";
import { createContext, useContext } from "react";

export const WorkspacesContext = createContext<IWorkspace[] | null>(null);

export const useWorkspaces = () => {
  const context = useContext(WorkspacesContext);
  if (!context) {
    throw new Error("useWorkspaces must be used within a WorkspacesProvider");
  }
  return context;
};
