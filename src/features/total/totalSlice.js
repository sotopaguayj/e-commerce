import { createSlice } from "@reduxjs/toolkit";

export const totalSlice = createSlice({
  name: 'TOTAL',
  initialState: {
    value:0,
    items: 0
  },
  reducers: {
    updateTotal: (state, action) => {
      state.value = action.payload
    },
    delItem: (state, action) => {
      if(state.items !== 0 )state.items = state.items - 1
    },
    upItem: (state, actions) => {
      state.items = state.items + 1
    },
    emptyItems: (state, actions) => {
      state.items = 0
    }
  }
})

export const {updateTotal, delItem, upItem,emptyItems} = totalSlice.actions
export default totalSlice.reducer