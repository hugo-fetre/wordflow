import React from 'react'
import Image from 'next/image'

const MarketingAngles = () => {
  return (
    <div className='maketingAngles'>
        <div className='marketing--col'>
            <div>
                <h3>Tout votre SEO, <br /> au même endroit</h3>
                <p>Retrouvez tous vos mots clés et idées d’articles dans votre workspace. Vous travaillez sur plusieurs projets ? Pas de soucis, Wordflow Pro vous permet de gérer un nombre illimité de workspaces</p>
            </div>
            <div className='colorTile'>
                <div className='flex justify-center items-center'>
                    <div className='flex-col items-center justify-center'>
                        <h4>5x</h4>
                        <div className='smallText'>plus rapide</div>
                    </div>
                    <span className='smallSeparator'></span>
                    <div className='flex-col items-center justify-center'>
                        <h4>10x</h4>
                        <div className='smallText'>moins cher</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='marketing--col'>
            <div id='curve--wrapper'>
                <Image width={250} height={250} src={'/curve.png'} alt='SEO progression with wordflow' id='marketingAnglesCurveImage'></Image>
                <h3>Gagnez en productivité</h3>
                <p>Votre site en top classement sans y passer des heures et sans être un expert SEO</p>
            </div>
        </div>
        <div className='marketing--col'>
            <div className='centered--text--tiles'>
                <div className='logosWrapper'>
                    <Image width={25} height={25} src={'/wordpress.png'} alt='Logo wordpress' className='-mr-2.5 z-50'></Image>
                    <Image width={25} height={25} src={'/wix.png'} alt='Logo wix' className='-mr-2.5 z-40'></Image>
                    <Image width={25} height={25} src={'/webflow.png'} alt='Logo webflow' className='-mr-2.5 z-30'></Image>
                    <Image width={25} height={25} src={'/squarespace.png'} alt='Logo squarespace' className='-mr-2.5 z-20'></Image>
                    <Image width={25} height={25} src={'/shopify.png'} alt='Logo shopify' className='-mr-2.5 z-10'></Image>
                </div>
                <p>Du contenu à intégrer directement dans vos éditeurs favoris en texte formaté ou en code html</p>
            </div>
            <div className='centered--text--tiles'>
                <span className='bigFigure'>+160%</span>
                <p>de trafic supplémentaire en moyenne sur 6 mois pour les sites optimisé SEO.</p>
            </div>
            <div className='left--text--tiles'>
                <p className='bigText'>Vos données ne seront pas utilisées pour alimenter les modèles d’IA</p>
            </div>
        </div>
    </div>
  )
}

export default MarketingAngles