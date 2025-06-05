"use client"
import React from 'react'
// Clerk
import { SignedIn, SignedOut, SignOutButton, useClerk, UserButton } from '@clerk/nextjs'
// Navigation
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
// HomeMade
import { useWorkspaces } from "@/context/WorkspacesContext";
import { navLinks1, navLinks2, navLinks3, navNotLogged } from '@/constants'
import { Button } from '../ui/button'
import { IUser } from '@/lib/database/models/user.model'
import { createWorkspace } from '@/lib/actions/workspace.actions'

const MainNav = ({ currentWorkspaceId, user }: { currentWorkspaceId: string, user: IUser }) => {

  const workspaces = useWorkspaces();
  //const currentWorkspace = workspaces.find(w => w._id == currentWorkspaceId); //params.workspaceId;
  const pathName = usePathname();
  const { signOut } = useClerk();

  async function addWorkspace(){
    let id = "no user";
    if(user._id){
      id = user._id.toString();
    }
    const workspace = {
      manager: id
    }
    const newWorkspace = await createWorkspace(workspace);
    console.log(newWorkspace._id);
    currentWorkspaceId = newWorkspace._id;
    window.location.replace('/app/'+newWorkspace._id);
  }

  return (
    <div className='nav--main'>
        <div className='nav--workspace--selector--wrapper'>
          <select
            className='nav--workspace--selector'
            value={currentWorkspaceId}
            onChange={(e) => {
              const selectedId = e.target.value;
              if (selectedId && selectedId !== currentWorkspaceId) {
                window.location.replace('/app/'+selectedId);
              }
            }}
          >
            {workspaces.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>
          { user.planId > 1 && (
            <Button type='button' className='btn--addWorkspace' onClick={addWorkspace}>+</Button>
          )}
        </div>
        <div className='nav--link--wrapper'>
          <div className='nav--links--col'>
            <SignedIn>
              {navLinks1(currentWorkspaceId).map((link) => {
                const isActive = link.route === pathName
                return (
                  <Link key={link.route} href={link.route} className={`${isActive ? 'nav--link--selected' : 'nav--link--regular'}`}>{isActive ? ">"+link.label : link.label}</Link>
                )
              })}
            </SignedIn>
            <SignedOut>
              {navNotLogged.map((link) => {
                const isActive = link.route === pathName
                return (
                  <Link key={link.route} href={link.route} className={`${isActive ? 'nav--link--selected' : 'nav--link--regular'}`}>{isActive ? ">"+link.label : link.label}</Link>
                )
              })}
            </SignedOut>
          </div>
          <div className='nav--links--col'>
            <SignedIn>
              {navLinks2(currentWorkspaceId).map((link) => {
                  const isActive = link.route === pathName
                  return (
                    <Link key={link.route} href={link.route} className={`${isActive ? 'nav--link--selected' : 'nav--link--regular'}`}>{isActive ? ">"+link.label : link.label}</Link>
                  )
                })}
            </SignedIn>
          </div>
          <div className='nav--links--col'>
            <SignedIn>
              {navLinks3.map((link) => {
                  const isActive = link.route === pathName
                  return (
                    <Link key={link.route} href={link.route} className={`${isActive ? 'nav--link--selected' : 'nav--link--regular'}`}>{isActive ? ">"+link.label : link.label}</Link>
                  )
                })}
            </SignedIn>
          </div>
          <SignedIn>
            <div className='nav--user--button'>
              <button onClick={() => signOut({ redirectUrl: '/' })} className='unselectedButton'>Se déconnecter</button>
            </div>
          </SignedIn>
        </div>
        
    </div>
  )
}

export default MainNav