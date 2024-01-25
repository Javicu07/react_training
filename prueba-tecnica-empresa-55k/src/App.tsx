import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { type User } from './types'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

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
    setSortByCountry(prevState => !prevState)
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
      })
  }, [])

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => { // [...users].sort((a, b)
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear usuarios
        </button>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
    </>
  )
}

export default App
