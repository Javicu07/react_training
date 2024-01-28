import { fetchUsers } from '../services/users.ts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type User } from '../types.d'

export const useUsers = () => {
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
  } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>({
    queryKey: ['users'], // <-- la key no es una cadena de texto hay que ponerla como un array
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10 // configuración de react-query-devtools para vigencia de los datos
  })

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap(page => page.users) ?? [],
    hasNextPage
  }
}
