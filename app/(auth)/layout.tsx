import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <main className='auth'>
            <a href="."><div className="button--back">annuler</div></a>
            {children}
        </main>
    )
}

export default Layout