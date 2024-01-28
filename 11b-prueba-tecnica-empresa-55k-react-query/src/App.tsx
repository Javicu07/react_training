// instalamos tanstack query para el manejo de estado asíncrono
// npm install @tanstack/react-query -E ('-E' para instalar la versión exacta)
// las developvers-tools de react query hay que instalarlas aparte:
// npm install @tanstack/react-query-devtools -E

import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { useUsers } from './hooks/useUsers.ts'
import { type User, SortBy } from './types.d'
import { Results } from './components/Results.tsx'

function App () {
  const {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useUsers()

  // 'flatMap' es un método de array que aplana los elementos de un array, es decir, pone todos los elementos
  // de un array en un mismo nivel, evita que tengamos varios arrays dentro de un array, poniendo todos
  // los elementos en 1 solo array.
  console.log(users)

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    void refetch() // vuelve a pedir los datos
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
      <Results />
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

        {!isLoading && !isError && hasNextPage &&
          <button onClick={ () => { void fetchNextPage() }}>Cargar más</button>}
      </main>
    </>
  )
}

export default App

// cuando se pone la palabra 'void' todo lo que esté a su derecha devolverá 'undefined', esto se suele
// emplear para indicar llamadas a funciones que no devuelvan nada (vacío), por ejemplo, si ejecutamos
// console.log(void 2), esto devolverá undefined por consola
