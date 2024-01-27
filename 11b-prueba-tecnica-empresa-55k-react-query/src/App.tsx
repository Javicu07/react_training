// instalamos tanstack query para el manejo de estado asíncrono
// npm install @tanstack/react-query -E ('-E' para instalar la versión exacta)

import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type User } from './types.d'
import { useQuery } from '@tanstack/react-query'

function App () {
  // 'useQuery' necesita como mínimo 2 parámetros, 1ro sería la 'key' que se lo tenemos que decir en forma
  // de array y que nos va a permitir recuperar la información desde cualquier sitio, como 2do parámetro
  // tenemos que indicarle como tenemos que recuperar la información
  useQuery(
    ['users'], // <-- la key no es una cadena de texto hay que ponerla como un array
    async () => await fetchUsers(1)
  )

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const [loading, setLoading] = useState(false) // estado de carga
  const [error, setError] = useState(false) // estado de error

  // para hacer la paginación necesitamos usar otro estado
  const [currentPage, setCurrentPage] = useState(1) // <-- empezamos con el '1'

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
    setLoading(true) // justo antes de hacer el 'fetch' para manejar la carga
    setError(false) // inicializamos el error a 'false'

    // el concepto de 'seed' (semilla) se utiliza para gestionar la petición siempre desde una semilla
    // vamos a generar la misma petición desde manera aleatoria, es necesario en la petición poner
    // una semilla para hacer la paginación y que no varíen los primeros resultados, además en la documentación
    // de la API indican que hay que poner el Nº de la página
    fetch(`https://randomuser.me/api?results=10&seed=javicu&page=${currentPage}`)
      .then(async res => {
        console.log(res.ok, res.status, res.statusText) // <---datos de la respuesta
        if (!res.ok) throw new Error('Error en la petición') // manera correcta de manejar los errores
        return await res.json()
      }) // si se usa axios, este sí gestiona los errores en el catch
      .then(res => { // <--- se resulve la promesa
        setUsers(prevUsers => {
          const newUsers = prevUsers.concat(res.results)
          originalUsers.current = newUsers// guardamos en los originalesUsers.current para emplear useRef
          return newUsers
        })
      })
      .catch(err => { // <--- pillar los errores
        console.error(err)
        console.log(users)
      })
      .finally(() => { // ´<--- se ejecuta siempre (cuando termina la promesa cambiamos el 'loading' a false)
        setLoading(false)
      })
  }, [currentPage]) // <-- ejecutamos el useEffect cada vez que cambie la paginación

  // Variante de hacerlo con try - catch
  //  try {
  //    fetch('https://randomuser.me/api/?results=10')
  //
  //    }
  //  } catch (err) {
  //    console.log(err)
  //  } finally {
  //    setLoading(false)
  //  }

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

        {loading && <strong>Cargando ...</strong>}

        {error && <p>Ha ocurrido un error</p>}

        {!error && users.length === 0 && <p>No hay usuarios que mostrar</p>}

        {!loading && !error &&
          <button onClick={() => { setCurrentPage(currentPage + 1) }}>Cargar más</button>}
      </main>
    </>
  )
}

export default App
