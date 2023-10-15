import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

// const CAT_ENDPOINT_IMAGE_URL = `https://catass.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // efecto para cargar cita al renderizar la página
  // el 'fetch' no se puede hacer fuera del 'useEffect' porque se hace un loop infinito
  useEffect(() => {
    getRandomFact().then(setFact) // --> es lo mismo que ".then(newFact => setFact(newFact))"
  }, []) // en '[]' se ponen las depencias que pueden variar, en este caso 'setFact' no es necesario

  /*
  // usando async-await, importante el useEffect siempre tiene que ser síncrono, la forma de hacerlo:
    useEffect(() => {
        async function getRandomFact () {
          const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
          const json = await res.json()
          setFact(json.fact)
        }

        getRandomFact()
    }, [])
  */

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

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main>
      <h1>App de Gatitos</h1>

      <button onClick={handleClick}>Get New Fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first word for ${fact}`} />}
      </section>
    </main>
  )
}
