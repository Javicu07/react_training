import { useState, useEffect } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // efecto para recuperar la imagen cada vez que tengamos una nueva cita
  useEffect(() => {
    if (!fact) return
    // Con '.slice' y '.join' se puede recoger el # de palabras que queramos, si queremos solamente
    // la primera palabra pudiera bastar con "fact.split(' ')[0]" y más directo sería usar
    // "fact.split(' ', 3).join(' ')" y nos quedamos con las 3 primeras palabras
    const firstWord = fact.split(' ', 1).join(' ')
    console.log(firstWord)

    fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
} // { imageUrl: "https://..." }
