import { useUsers } from '../hooks/useUsers'

export const Results = () => {
  const { users } = useUsers()

  return <h3>{users.length}</h3>
}
