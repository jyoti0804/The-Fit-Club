'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'

const DiscountPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="relative z-0 flex flex-col items-center px-6 md:px-12 py-20 
        bg-gradient-to-b from-[#0d0d0d] via-[#141414] to-[#1a1a1a] text-white min-h-screen overflow-hidden">

      {/* Background Blur Image Layer */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-60 blur-2xl"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg')",
        }}
      ></div>

      {/* Glow Effects */}
      <div className="absolute top-[10%] left-[5%] w-[28rem] h-[20rem] 
          bg-gradient-to-r from-orange-500/30 via-transparent to-amber-400/10 
          blur-[200px] rounded-full -z-10"></div>

      <div className="absolute bottom-[5%] right-[8%] w-[26rem] h-[20rem] 
          bg-gradient-to-l from-red-500/30 via-transparent to-pink-400/10 
          blur-[200px] rounded-full -z-10"></div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-extrabold text-center italic tracking-wide uppercase">
        <span className="text-transparent bg-clip-text bg-gradient-to-r 
            from-orange-400 via-amber-300 to-orange-500">
          Exclusive
        </span>{' '}
        <span className="text-white">Discount</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-300 text-center max-w-2xl mt-4 leading-relaxed">
        Unlock premium fitness programs at unbeatable prices.
        This exclusive offer is available for a limited time only.
      </motion.p>

      {/* Discount Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
        className="mt-14"
      >
        <Card
          className="w-[22rem] md:w-[26rem] bg-[#2b2b2b]/70 border border-[#4a4a4a] 
            rounded-3xl backdrop-blur-lg shadow-lg overflow-hidden relative 
            hover:border-orange-400/70 hover:shadow-[0_0_40px_rgba(255,140,70,0.6)]
            transition-all duration-500"
        >
          {/* Glow Layer */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br
              from-orange-500/20 via-transparent to-amber-400/20 opacity-0 
              hover:opacity-100 transition-opacity duration-700 -z-10"></div>

          <CardHeader className="text-center py-6">
            <CardTitle className="text-2xl font-bold text-orange-300">
              Special Limited Offer
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4 pb-6 px-6">
            <p className="text-gray-300 text-center leading-relaxed">
              Get <span className="text-orange-400 font-bold">40% OFF</span> on your selected fitness program.
              Train smarter, go further, and level up your entire fitness journey.
            </p>

            <div className="text-center mt-2">
              <p className="text-lg line-through text-gray-400">$120</p>
              <p className="text-4xl font-extrabold text-orange-400">$72</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pb-8">
            <Button
              onClick={() => navigate('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Claim Discount
            </Button>
          </CardFooter>

          {/* Sweep Light Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              opacity-0 hover:opacity-100 translate-x-[-100%] hover:translate-x-[100%] 
              transition-all duration-[1.2s] ease-in-out rounded-3xl"></div>
        </Card>
      </motion.div>
    </section>
  )
}

export default DiscountPage
