// instalamos tanstack query para el manejo de estado asíncrono
// npm install @tanstack/react-query -E ('-E' para instalar la versión exacta)

import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type User } from './types.d'
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchUsers = async (page: number) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=javicu&page=${page}`)
    .then(async res => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => {
      const nextCursor = Number(res.info.page)
      return {
        users: res.results,
        nextCursor
      }
    })
}

function App () {
  // 'useQuery' necesita como mínimo 2 parámetros, 1ro sería la 'key' que se lo tenemos que decir en forma
  // de array y que nos va a permitir recuperar la información desde cualquier sitio, como 2do parámetro
  // tenemos que indicarle como tenemos que recuperar la información
  const {
    isLoading,
    isError,
    data,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery<{ nextCursor: number, users: User[] }>({
    queryKey: ['users'], // <-- la key no es una cadena de texto hay que ponerla como un array
    queryFn: async () => await fetchUsers(currentPage),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor
  })

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // para hacer la paginación necesitamos usar otro estado
  const [currentPage, setCurrentPage] = useState(1) // <-- empezamos con el '1'

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    await refetch() // vuelve a pedir los datos
    // setUsers(originalUsers.current)
  }

  // con 'useMemo' evitamos tener que ordenar y filtrar los países cada vez que se renderice el componente
  // solo se va a ejecutar cuando cambien las dependencias indicadas
  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => { // otra forma de hacerlo bien --> [...users].sort((a, b)
        return a.location.country.localeCompare(b.location.country)
      })
    }

    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => { // otra forma de hacerlo bien --> [...users].sort((a, b)
        return a.name.first.localeCompare(b.name.first)
      })
    }

    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => { // otra forma de hacerlo bien --> [...users].sort((a, b)
        return a.name.last.localeCompare(b.name.last)
      })
    }

    return filteredUsers
  }, [filteredUsers, sorting])

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear usuarios
        </button>
        < input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />
      </header>
      <main>
        {/* Ponemos este de primero para garabtizar que no desmonte el componente con los primeros usuarios
        cargados, evitamos problemas de experiencia de usuario y de rendimiento */}
        {users.length > 0 &&
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        }

        {isLoading && <strong>Cargando ...</strong>}

        {isError && <p>Ha ocurrido un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios que mostrar</p>}

        {!isLoading && !isError &&
          <button onClick={() => { setCurrentPage(currentPage + 1) }}>Cargar más</button>}
      </main>
    </>
  )
}

export default App
