import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
})

// tenemos que envolver nuestra aplicación en un Provider para poder usar la 'store' desde cualquier
// parte de nuestra aplicación, se importa en 'main.jsx'

// para tipar, obtenemos el tipo del estado de 'store' y lo aplicamos a 'RootState', lo mismo
// aplicamos para el 'dispatch'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
