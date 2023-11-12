import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(setFact) // --> es lo mismo que ".then(newFact => setFact(newFact))"
  }

  // efecto para cargar cita al renderizar la página
  // el 'fetch' no se puede hacer fuera del 'useEffect' porque se hace un loop infinito
  useEffect(refreshFact, []) // en '[]' se ponen las depencias que pueden variar, en este caso 'setFact' no es necesario

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
  return { fact, refreshFact }
}
