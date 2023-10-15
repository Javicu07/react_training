import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://catass.com/cat/says/${firstWord}?size=50&color=red&json=true`

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // el 'fetch' no se puede hacer fuera del 'useEffect' porque se hace un loop infinito
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        // Con '.slice' y '.join' se puede recoger el # de palabras que queramos, si queremos solamente
        // la primera palabra pudiera bastar con "fact.split(' ')[0]" y más directo sería usar
        // "fact.split(' ', 3).join(' ')" y nos quedamos con las 3 primeras palabras
        const firstWord = fact.split(' ').slice(0, 1).join(' ')
        console.log(firstWord)
      })
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

  return (
    <main>
      <h1>App de Gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first word from ${fact}`} />}
    </main>
  )
}
