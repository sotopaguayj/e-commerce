import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: 'TOKEN',
  initialState: {token: false},
  reducers: {
    login: (state, action)=>{
      state.token = true
    },
    logout: (state, action) =>{
      state.token = false
    }
  }
})

export const {login, logout} = tokenSlice.actions
export default tokenSlice.reducer