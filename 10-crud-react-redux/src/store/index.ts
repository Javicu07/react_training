import { type Middleware, configureStore } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

// implementamos 'middleware', esta implementación nos permite llevar acciones justo antes de cambiar
// el estado y justo después, en este caso llevamos acciones después para guardar el estado
const persistenceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState())) // salva el estado
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action

  const previousState = store.getState()

  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove)
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
      } else {
        throw new Error('Error al eliminar el usuario')
      }
    }).catch(err => {
      toast.error(`Error deleting user ${userIdToRemove}`)
      if (userToRemove) {
        store.dispatch(rollbackUser(userToRemove))
      }
      console.log(err)
    })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => {
    return [persistenceLocalStorageMiddleware, syncWithDatabaseMiddleware]
  }
})

// tenemos que envolver nuestra aplicación en un Provider para poder usar la 'store' desde cualquier
// parte de nuestra aplicación, se importa en 'main.jsx'

// para tipar, obtenemos el tipo del estado de 'store' y lo aplicamos a 'RootState', lo mismo
// aplicamos para el 'dispatch'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
