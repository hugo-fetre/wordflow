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

const MainNav = ({ currentWorkspaceId }: { currentWorkspaceId: string }) => {

  const workspaces = useWorkspaces();
  const currentWorkspace = workspaces.find(w => w._id == currentWorkspaceId); //params.workspaceId;
  console.log(workspaces);
  const pathName = usePathname();
  const { signOut } = useClerk();
  return (
    <div className='nav--main'>
        <div className='nav--workspace--selector--wrapper'>
        <select
          className='nav--workspace--selector'
          value={currentWorkspaceId}
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && selectedId !== currentWorkspaceId) {
              redirect('/app/'+selectedId);
            }
          }}
        >
          {workspaces.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>
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
              <button onClick={() => signOut({ redirectUrl: '/presentation' })}>Sign out</button>
            </div>
          </SignedIn>
        </div>
        
    </div>
  )
}

export default MainNav