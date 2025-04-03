import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoComponent = () => {
  return (
    <Link href={"/"} className='link--logo'>
        <Image src={"/logo_black.png"} alt="Logo wordflow" width={200} height={32}></Image>
    </Link>
  )
}

export default LogoComponent