const API_KEY = 'fa4cfa58'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    // Importante no pasamos el estado al servicio, lo que hacemos es hacer un 'return' del fetch
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies') // estudiar como lanzar custom errors
  }
}
