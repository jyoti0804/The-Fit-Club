'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { plansData } from '../../data/plansData'
import whiteTick from '../../assets/whiteTick.png'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../../components/ui/card'
import PlanDialog from '../planDialog/PlanDialog'
import usePlanDialog from '../../hooks/usePlanDialog'

const cardHover = {
  scale: 1.035,
  y: -6,
  transition: { type: 'spring' as const, stiffness: 200, damping: 22 },
}

const listVariants = {
  collapsed: { transition: { staggerChildren: 0 } },
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
}
const itemVariants = { collapsed: { opacity: 0, y: 6 }, open: { opacity: 1, y: 0 } }

const Plans: React.FC = () => {
  const { openDialog, dialogState, closeDialog } = usePlanDialog()
  const [expandedMap, setExpandedMap] = useState<boolean[]>(() => plansData.map(() => false))
  const showCount = 3
  const navigate = useNavigate()
 const location = useLocation();

  const toggleExpand = (index: number) => {
    setExpandedMap((prev) => {
      const copy = [...prev]
      copy[index] = !copy[index]
      return copy
    })
  }

  return (
    <section
      id="plans"
      className="relative flex flex-col gap-20 px-6 md:px-24 py-20 overflow-hidden text-white bg-gradient-to-b from-[#0d0d0d] to-[#1c1c1c]"
    >
   
    
{/* Back Button */}
{location.pathname !== '/' && (
  <div className="z-20 mb-6">
    <button
      onClick={() => navigate('/')}
      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-[0_0_12px_rgba(255,98,0,0.8)] hover:shadow-[0_0_20px_rgba(255,98,0,1)] transition-all duration-300"
    >
      ← Back to Home
    </button>
  </div>
)}

      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.guardian.in/cdn/shop/articles/The_Best_Gym_Workout_Plan_For_Gaining_Muscle.png?v=1749819970&width=1000')`,
          filter: 'blur(16px)',
          opacity: 0.38,
        }}
      />
      {/* Neon / Frosted Blobs */}
      <div className="pointer-events-none absolute -left-40 top-24 w-[36rem] h-[26rem] rounded-full bg-orange-500/12 blur-[120px] z-10" />
      <div className="pointer-events-none absolute -right-40 top-40 w-[36rem] h-[26rem] rounded-full bg-red-500/12 blur-[120px] z-10" />

      {/* Heading */}
      <header className="z-20 text-center">
        <h2 className="inline-flex items-center gap-3 uppercase font-extrabold text-3xl md:text-5xl tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Ready to Start
          </span>
          <span className="text-gray-100">Your Journey</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Now With Us
          </span>
        </h2>
        <p className="mt-4 text-sm text-gray-400 max-w-2xl mx-auto">
          Choose a plan that fits your lifestyle — we’ll guide the rest. Smooth
          onboarding and expert support included.
        </p>
      </header>

      {/* Cards */}
      <div className="z-20 flex flex-col md:flex-row items-stretch justify-center gap-8 mt-8">
        {plansData.map((plan, i) => {
          const isFeatured = i === 1
          const expanded = expandedMap[i]
          const hasExtra = plan.features.length > showCount

          const glassBase =
            'bg-white/10 border border-white/20 backdrop-blur-md shadow-xl rounded-2xl'
          const featuredBase =
            'bg-gradient-to-br from-orange-500/80 to-red-500/80 text-white shadow-2xl border-none rounded-2xl'

          return (
            <motion.div
              key={plan.name + i}
              whileHover={cardHover}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {isFeatured && (
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: '0 18px 60px rgba(255,90,0,0.18)',
                    borderRadius: '1rem',
                    zIndex: -1,
                  }}
                />
              )}

              <Card
                className={`relative flex flex-col justify-between w-[20rem] md:w-[22rem] p-6 transition-transform duration-350
                  ${isFeatured ? featuredBase : glassBase}
                  ${expanded ? 'ring-2 ring-orange-500/30' : ''}`}
                style={{ overflow: 'visible' }}
              >
                <CardHeader className="flex flex-col items-center gap-3">
                  <div className={`text-5xl ${isFeatured ? 'text-white' : 'text-white'}`}>
                    {React.isValidElement(plan.icon)
                      ? React.cloneElement(plan.icon as React.ReactElement<any>, {
                          color: isFeatured ? undefined : 'white',
                          size: 48,
                        })
                      : plan.icon}
                  </div>

                  <CardTitle
                    className={`text-center uppercase tracking-wide font-semibold ${
                      isFeatured ? 'text-white' : 'text-gray-100'
                    }`}
                  >
                    {plan.name}
                  </CardTitle>

                  <div className="text-4xl font-extrabold mt-1">
                    <span className={isFeatured ? 'text-white' : 'text-gray-100'}>
                      ${typeof plan.price === 'string' ? Number(plan.price) : plan.price}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="px-0 mt-3">
                  <ul className="flex flex-col gap-3 text-sm">
                    {plan.features.slice(0, showCount).map((f: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-200">
                        <img src={whiteTick} alt="tick" className="w-4 opacity-95" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <AnimatePresence initial={false}>
                    {expanded && hasExtra && (
                      <motion.div
                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: 'easeInOut' }}
                        className="overflow-hidden mt-3"
                      >
                        <motion.ul
                          variants={listVariants}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          className="flex flex-col gap-2 text-sm"
                        >
                          {plan.features.slice(showCount).map((f: string, k: number) => (
                            <motion.li
                              key={k}
                              variants={itemVariants}
                              className="flex items-center gap-3 text-gray-200"
                            >
                              <img src={whiteTick} alt="tick" className="w-4" />
                              <span>{f}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {hasExtra && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleExpand(i)}
                        className="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-orange-400 transition"
                      >
                        <span>{expanded ? 'Show less' : 'See more benefits'}</span>
                        <motion.span
                          animate={{ rotate: expanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.span>
                      </button>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-4">
                  <div className="w-full">
                    <button
                      onClick={() => openDialog({ ...plan, price: Number(plan.price) })}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md
                        ${
                          isFeatured
                            ? 'bg-white text-[#1c1c1c] hover:shadow-[0_12px_30px_rgba(255,255,255,0.18)]'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-[0_12px_30px_rgba(255,90,0,0.18)]'
                        }`}
                      aria-label={`Join ${plan.name}`}
                    >
                      Join Now
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Dialog controlled by hook */}
      <PlanDialog state={dialogState} onClose={closeDialog} />
    </section>
  )
}

export default Plans
