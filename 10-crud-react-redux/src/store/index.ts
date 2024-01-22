import { type Middleware, configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'

// implementamos 'middleware', esta implementación nos permite llevar acciones justo antes de cambiar
// el estado y justo después, en este caso llevamos acciones después para guardar el estado
const persistenceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState())) // salva el estado
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => {
    return [persistenceLocalStorageMiddleware]
  }
})

// tenemos que envolver nuestra aplicación en un Provider para poder usar la 'store' desde cualquier
// parte de nuestra aplicación, se importa en 'main.jsx'

// para tipar, obtenemos el tipo del estado de 'store' y lo aplicamos a 'RootState', lo mismo
// aplicamos para el 'dispatch'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
