"use client"
import React from 'react'
// Clerk
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useClerk, UserButton } from '@clerk/nextjs'
// Navigation
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// HomeMade
import { navLinks1, navLinks2, navLinks3, navNotLogged } from '@/constants'
import Image from 'next/image'


const SideNav = ({ currentWorkspaceId }: { currentWorkspaceId: string }) => {

  const pathName = usePathname();
  const { signOut } = useClerk();

  return (
    <div className='side--main'>
        <div className='sidenav--link--wrapper'>
          <Image src={"/logo.png"} alt="Logo wordflow" width={200} height={32} className="mainLogo"></Image>
          <div className='sidenav--links--col'>
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
          <div className='sidenav--links--col'>
            <SignedIn>
              {navLinks2(currentWorkspaceId).map((link) => {
                  const isActive = link.route === pathName
                  return (
                    <Link key={link.route} href={link.route} className={`${isActive ? 'nav--link--selected' : 'nav--link--regular'}`}>{isActive ? ">"+link.label : link.label}</Link>
                  )
                })}
            </SignedIn>
          </div>
          <SignedIn>
            <div className='sidenav--user--button'>
              <div className='sidenav--links--col'>
                  {navLinks3.map((link) => {
                      const isActive = link.route === pathName
                      return (
                        <Link key={link.route} href={link.route} className={`${isActive ? 'nav--link--selected' : 'nav--link--regular'}`}>{isActive ? ">"+link.label : link.label}</Link>
                      )
                    })}
              </div>
              
            </div>
          </SignedIn>
        </div>
        <SignedOut>
            <div className='sidenav--user--button'>
                <SignInButton forceRedirectUrl={'/auth-redirect'}>
                    <button className='outlineWhite'>Se connecter</button>
                </SignInButton>
                <SignUpButton forceRedirectUrl={'/register-process'}>
                    <button className='outlineWhite'>S'inscrire</button>
                </SignUpButton>
            </div>
        </SignedOut>
    </div>
  )
}
// <button onClick={() => signOut({ redirectUrl: '/' })} className='outlineWhite t40px'>Se déconnecter</button>
export default SideNav