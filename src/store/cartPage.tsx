import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, addToCart } from './cartSlice'
import type { RootState } from './store'
import { Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
}

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )

  const increaseQuantity = (item: any) => dispatch(addToCart(item))
  const decreaseQuantity = (item: any) => {
    if ((item.quantity || 1) > 1) {
      dispatch({ type: 'cart/decreaseQuantity', payload: item.id })
    } else {
      dispatch(removeFromCart(item.id))
    }
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white py-10 px-6 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
        🛍️ Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center mt-32 text-lg">Your cart is empty 🛒</p>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {cartItems.map((item: any) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col sm:flex-row items-center justify-between bg-[#202020] border border-white/10 p-4 rounded-2xl shadow-lg hover:shadow-[0_8px_20px_rgba(255,90,0,0.3)] transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1 rounded-full">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-600 transition"
                    >
                      −
                    </button>
                    <span className="text-white font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Total section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-6 mt-6 text-white">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Checkout button */}
        <button
  onClick={() => navigate('/checkout')}
  className="w-full sm:w-auto mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:shadow-[0_8px_25px_rgba(255,90,0,0.4)] transition-all"
>
  Proceed to Checkout
</button>
        </div>
      )}
    </div>
  )
}

export default CartPage
