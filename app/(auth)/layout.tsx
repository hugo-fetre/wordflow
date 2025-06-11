import React from 'react'
import Image from 'next/image'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <main className='auth'>
            <div className='auth--left'>
                <a href="."><div className="button--back">annuler</div></a>
                <Image src={"/logo/logo-full-white.png"} alt="Logo wordflow" width={200} height={32} className='auth--logo'></Image>
                <h1>Générer du contenu SEO n'aura jamais été aussi simple</h1>
            </div>
            <div className='auth--right'>
                {children}
            </div>
        </main>
    )
}

export default Layout