import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'CART',
  initialState: [],
  reducers: {
    addItem: (state, action) =>{
        state.push({...action.payload, amount:1})
      },
      editItem: (state, action) => {
        const {id, itemAmount} = action.payload
        const foundItem = state.find(item => item.id === id)
        if(foundItem){
            foundItem.amount = itemAmount + 1
        }
      },
      dimissItem: (state, action) =>{
        const {id, amount} = action.payload
        const foundItem = state.find(item => item.id === id)
        if(foundItem.amount !== 1){
          if(foundItem){
            foundItem.amount = amount - 1
        }
        }
      },
      deleteItem: (state, action) =>{
        const itemFound = state.find(item => item.id === action.payload)
        if(itemFound){
          state.splice(state.indexOf(itemFound), 1)
        }
      },
      emptyCart: (state, action) => {
        state.length = 0
      }
  }
})
export const {addItem, deleteItem, editItem, dimissItem, emptyCart} = cartSlice.actions
export default cartSlice.reducer