"use client"
import React, { useState } from 'react'
import { LoadingDots } from './loadingdots';
import { Button } from './button';

const ConnectButton = (
{
  color = '#000',
  message = 'Appliquer',
  loadingMessage = 'En cours'
}: {
  color?: string,
  message?: string,
  loadingMessage?: string
}
) => {

    const [loading, setLoading] = useState(false);
    const startLoader = () => {
        setLoading(true);
    }
    
  return (
    <div className='outlineWhite'>{loading ? <LoadingDots color={color} message={loadingMessage}/> : message}</div>
  )
}

export default ConnectButton