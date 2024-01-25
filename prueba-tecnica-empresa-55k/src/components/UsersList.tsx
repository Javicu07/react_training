import { type User } from '../types.d'

interface Props {
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
}

export function UsersList ({ deleteUser, showColors, users }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'

            return (
              <tr key={user.email} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail}/>
                </td>
                <td>
                  {user.name.first}
                </td>
                <td>
                  {user.name.last}
                </td>
                <td>
                  {user.location.country}
                </td>
                <td>
                  <button onClick={() => { deleteUser(user.email) }}>
                    Borrar
                  </button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

// table, thead, tbody <--- son la clave para hacer tablas
// table ----> la tabla entera
// thead ----> la parte de la cabecera
// tbody ----> la parte del cuerpo de la tabla

// tr ----> la fila que queremos hacer (row)
// th ----> las celdas de la cabecera (header)
// td ----> la celda (cell)
