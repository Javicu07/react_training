import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search) // --> guarda la busqueda anterior

  // 'useCallback' hace lo mismo que 'useMemo' pero especificamente para funciones
  // por debajo usa 'useMemo' pero solo se usa explicitamente para funciones
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search // la referencia evita hacer una busqueda del mismo valor
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // const getMovies = useMemo(() => {
  //  return async ({ search }) => {
  //    if (search === previousSearch.current) return
  //
  //    try {
  //      setLoading(true)
  //      setError(null)
  //      previousSearch.current = search // la referencia evita hacer una busqueda del mismo valor
  //      const newMovies = await searchMovies({ search })
  //      setMovies(newMovies)
  //    } catch (e) {
  //      setError(e.message)
  //    } finally {
  //      setLoading(false)
  //    }
  //  }
  // }, [])

  // const getSortedMovies = () => {
  //  const sortedMovies = sort
  //    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //    : movies
  //
  //  return sortedMovies
  // }

  // utilizando 'useMemo', memoriza calculos que hemos hecho y que no queremos que se renderice
  // a no ser que cambien las dependencias que hemos indicado

  const getSortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: getSortedMovies, loading, getMovies }
}
