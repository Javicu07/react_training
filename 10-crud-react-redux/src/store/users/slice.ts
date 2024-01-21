import { createSlice } from "@reduxjs/toolkit";

export interface User {
  name: string
  initialState: string
  github: string
}

export interface UserWithId extends User {
  id: string
}

// los 'slices' necesitan un 'name', un 'initialState' y los 'reducers'
export const usersSlice = createSlice({
  name: 'users',
  initialState: ???,
  reducers: {}
})