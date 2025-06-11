import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoComponent = () => {
  return (
    <Link href={"/"} className='link--logo'>
        <Image src={"/logo/rich-logo-full-black.png"} alt="Logo wordflow" width={100} height={10}></Image>
    </Link>
  )
}

export default LogoComponent