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

const initialState: UserWithId[] = [
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

// los 'slices' necesitan un 'name', un 'initialState' y los 'reducers'
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }
  }
})

export default usersSlice.reducer

export const { deleteUserById } = usersSlice.actions
