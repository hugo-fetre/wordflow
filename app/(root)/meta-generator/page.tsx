import Image from 'next/image'
import React from 'react'

const MetaPage = () => {
  return (
    <div className='content--wrapper'>
      <h2>Générateur de méta-données</h2>
      <sub className='t10px'>Améliorez votre visibilité en décrivant avec précision vos images grâce aux méta-données</sub>
      <div className='image--submit--wrapper t40px'>
        <Image src={"/folder.png"} alt="Icône fichier pour méta-descripteur wordflow" width={100} height={60}></Image>
        <div className='primaryButton t10px'>Télécharger</div>
      </div>
    </div>
  )
}

export default MetaPage