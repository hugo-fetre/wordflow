import React from 'react'

const GeneratePage = () => {

  return (
    <div className='content--wrapper'>
      <label htmlFor="article_title_input">Titre de votre article</label>
      <input type="text" name='article_title_input' id='article_title_input' className='in--text--title' placeholder='Nom de votre article'/>
      <label htmlFor="specification_input" className='t40px'>Consignes de rédaction (optionnel)</label>
      <textarea cols={50} rows={7} name="specification_input" id="specification_input" className='in--text--narrative' placeholder='Decrivez en précision ce que vous souhaitez voir dans votre article...'></textarea>
      <label htmlFor="">Format de sortie</label>
      <div className='t10px'>
        <input type="radio" id="html" name="output_format" value="html" className='radio--hidden'/>
        <label htmlFor="html" className='radio--label'>Code Html</label>
        <input type="radio" id="text" name="output_format" value="text"  className='radio--hidden'/>
        <label htmlFor="text" className='radio--label'>Texte formaté</label>
      </div>
    </div>
  )
}

export default GeneratePage