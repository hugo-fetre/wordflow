// components/providers/WorkspacesProvider.tsx
'use client';

import { WorkspacesContext } from '@/context/WorkspacesContext';
import { IWorkspace } from '@/lib/database/models/workspace.model';
import React from 'react';

const WorkspacesProvider = ({
  workspaces,
  children,
}: {
  workspaces: IWorkspace[];
  children: React.ReactNode;
}) => {
  return (
    <WorkspacesContext.Provider value={workspaces}>
      {children}
    </WorkspacesContext.Provider>
  );
};

export default WorkspacesProvider;
