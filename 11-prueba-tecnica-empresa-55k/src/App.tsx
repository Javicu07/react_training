import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])
  // 'useRef' lo usamos para guardar un valor que queremos que se compartan entre renderizados
  // pero que al cambiar no vuelva a renderizar el componente
  // 2 diferencias con useState:
  //   - cuando cambia el ref no vuelve a renderizar el componente
  //   - para acceder al valor de una referencia y cambiarla tienes que acceder al '.current'

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results// guardamos en los originalesUsers.current para emplear useRef
      })
      .catch(err => {
        console.error(err)
        console.log(users)
      })
  }, [])

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
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
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
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
