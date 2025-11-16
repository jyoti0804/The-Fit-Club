import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  description?: string
  quantity?: number
}

interface CartState {
  items: Product[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const payloadId = Number(action.payload.id)
const itemIndex = state.items.findIndex(item => Number(item.id) === payloadId)


      if (itemIndex >= 0) {
        //  Item already in cart → increase quantity
        state.items[itemIndex].quantity = (state.items[itemIndex].quantity || 1) + 1
      } else {
        //  Add new item with quantity = 1
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})



export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
