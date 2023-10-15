import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL = `https://catass.com/cat/says/${firstWord}?size=50&color=red&json=true`

export function App () {
  const [fact, setFact] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json)
      .then(data => setFact(data.fact))
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
    </main>
  )
}
