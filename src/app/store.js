import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../features/token/tokenSlice'
import totalReducer from '../features/total/totalSlice'
import cartReducer from '../features/cart/cartSlice'


export const store = configureStore({
  reducer:{
    token: tokenReducer,
    cart: cartReducer,
    total: totalReducer
  }
})