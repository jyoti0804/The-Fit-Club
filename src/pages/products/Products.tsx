'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../store/cartSlice'
import type{ RootState } from '../../store/store'
import { ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { gymProducts } from '../../data/dummyData'
import type{ Variants } from 'framer-motion'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 150, damping: 18 },
  },
}


const Products = () => {
  const [category, setCategory] = useState('All')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartCount = useSelector((state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
)


  const filteredProducts =
    category === 'All' ? gymProducts : gymProducts.filter((p) => p.category === category)

  const categories = ['All', ...Array.from(new Set(gymProducts.map((p) => p.category)))]

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product))
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white py-12 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 relative">
        <h1 className="text-4xl font-extrabold mb-6 sm:mb-0 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(255,90,0,0.3)]">
          🏋️ Gym Products
        </h1>

        {/* Category Select */}
        <div className="flex items-center gap-6">
          <Select onValueChange={(value) => setCategory(value)} defaultValue="All">
            <SelectTrigger className="w-[180px] bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-orange-500">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#202020] border border-white/10">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-white hover:bg-white/10">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 🛒 Cart Icon */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/cart')}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={28} className="text-white hover:text-orange-400 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              exit={{ opacity: 0, y: 40 }}
              className="flex"
            >
              <Card className="w-full h-[500px] bg-[#202020] border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(255,90,0,0.1)] hover:shadow-[0_8px_40px_rgba(255,90,0,0.25)] transition-all duration-500 group">
                {/* Full Image */}
                <div className="h-[260px] w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>





                {/* Text */}
                <CardHeader className="px-5 pt-4 pb-1">
                  <CardTitle className="text-lg font-semibold text-white truncate">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-[0_12px_30px_rgba(255,90,0,0.25)] transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Products;
