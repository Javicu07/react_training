import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
})

// tenemos que envolver nuestra aplicación en un Provider para poder usar la 'store' desde cualquier
// parte de nuestra aplicación, se importa en 'main.jsx'
