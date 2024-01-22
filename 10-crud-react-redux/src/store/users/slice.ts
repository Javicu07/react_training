import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Peter Doe',
    email: 'pdoe@gmail.com',
    github: 'pdoe'
  },
  {
    id: '2',
    name: 'Lena Whitehouse',
    email: 'lwhite@gmail.com',
    github: 'lena'
  },
  {
    id: '3',
    name: 'Phil Less',
    email: 'pless@gmail.com',
    github: 'pless'
  }
]

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  if (persistedState != null) {
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()

// los 'slices' necesitan un 'name', un 'initialState' y los 'reducers'
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload }) // se puede mutar el estado con redux toolkit
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    }
  }
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
