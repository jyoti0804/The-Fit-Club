'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card'
import { programsData } from '../../data/programsData'
import RightArrow from '../../assets/rightArrow.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Programs: React.FC = () => {
  const navigate = useNavigate()

  return (
   <section
  id="programs"
  className="relative z-0 flex flex-col gap-16 px-6 md:px-12 py-20 bg-gradient-to-b from-[#0d0d0d] via-[#141414] to-[#1a1a1a] text-white overflow-hidden"
>
      {/* Background Blur Layer with background-image */}
     <div
    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-60 blur-2xl"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg')",
    }}
  ></div>

      {/* Background Glow Effects */}
      <div className="absolute top-[10%] left-[5%] w-[30rem] h-[22rem] bg-gradient-to-r from-orange-500/30 via-transparent to-amber-400/10 blur-[200px] rounded-full -z-10"></div>
      <div className="absolute bottom-[5%] right-[8%] w-[28rem] h-[22rem] bg-gradient-to-l from-red-500/30 via-transparent to-pink-400/10 blur-[200px] rounded-full -z-10"></div>

      {/* Header Section */}
      <div className="flex flex-col justify-center items-center text-center gap-4 z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide italic"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
            Explore Our{' '}
          </span>
          <span className="text-white">Programs</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-800 text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Discover fitness programs designed to inspire, challenge, and transform your lifestyle.
          Whether you’re starting fresh or leveling up, our curated sessions fit every goal.
        </motion.p>
      </div>

      {/* Program Cards */}
      <div className="flex flex-wrap justify-center gap-10 mt-10 z-10 relative">
        {programsData.map((program, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
          >
            <Card
              className="relative w-[18rem] md:w-[20rem] bg-[#2b2b2b]/60 border border-[#4a4a4a]
                rounded-3xl backdrop-blur-lg shadow-lg transition-all duration-500
                hover:border-orange-400/75 hover:shadow-[0_0_40px_rgba(255,140,70,0.6)]
                hover:scale-105 hover:-translate-y-2 overflow-hidden group"
            >
              {/* Subtle Glow Layer */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/15 via-transparent to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

              <CardHeader className="flex flex-col items-center pt-6 space-y-2">
                <motion.div
                  whileHover={{ rotate: 7, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                  className="text-5xl text-orange-400 mb-3"
                >
                  {program.image}
                </motion.div>

                <CardTitle className="text-xl font-semibold tracking-wide text-orange-300 group-hover:text-white transition-colors duration-300 text-center">
                  {program.heading}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-8 py-4">
                <p className="text-sm text-gray-300 leading-relaxed text-center group-hover:text-gray-100 transition-colors duration-300">
                  {program.details}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center mt-5 pb-6">
  <motion.div
    onClick={() => navigate(`/discount/${i}`)}  //  Navigate to discount page
    whileHover={{ x: 8 }}
    className="flex items-center gap-3 text-orange-400 font-semibold cursor-pointer
               transition-all duration-300 group-hover:gap-6 group-hover:text-orange-300"
  >
    <span>See Discount</span>
    <img
      src={RightArrow}
      alt="Arrow"
      className="w-5 group-hover:translate-x-1 transition-transform"
    />
  </motion.div>
</CardFooter>


              {/* Light Sweep Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-[1.2s] ease-in-out rounded-3xl"></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Programs