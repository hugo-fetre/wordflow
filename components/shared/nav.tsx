"use client"
import { navLinks1, navLinks2, navLinks3, navNotLogged } from '@/constants'
import { SignedIn, SignedOut, SignOutButton, useClerk, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React from 'react'

const MainNav = () => {

  const pathName = usePathname();
  const { signOut } = useClerk();
  return (
    <div className='nav--main'>
        <div className='nav--link--wrapper'>
          <div className='nav--links--col'>
            <SignedIn>
              {navLinks1.map((link) => {
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
              {navLinks2.map((link) => {
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