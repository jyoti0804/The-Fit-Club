'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { X } from 'lucide-react'
import whiteTick from '../../assets/whiteTick.png'
import type { PlanDialogState } from '../../hooks/usePlanDialog'

const dropIn: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 160, damping: 20 } as any,
  },
  exit: { opacity: 0, y: 40, transition: { duration: 0.25 } },
}

interface PlanDialogProps {
  state: PlanDialogState
  onClose: () => void
}

const PlanDialog: React.FC<PlanDialogProps> = ({ state, onClose }) => {
  const { isOpen, selectedPlan } = state || {}
  const [step, setStep] = useState<'details' | 'form'>('details')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !selectedPlan) return null

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setStep('details')
      setFormData({ name: '', email: '', phone: '' })
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Dialog box */}
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="relative w-full max-w-md bg-[#181818] text-white rounded-2xl p-6 shadow-2xl border border-white/10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X size={22} />
              </button>

              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    {selectedPlan.name} Plan
                  </h2>
                  <p className="text-center text-gray-400 mt-1">
                    Unlock all benefits with the{' '}
                    <span className="text-white font-semibold">${selectedPlan.price}</span> package.
                  </p>

                  <div className="space-y-2 mt-6 text-sm">
                    <h3 className="font-semibold text-gray-200">Included Features:</h3>
                    <ul className="flex flex-col gap-2">
                      {selectedPlan.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <img src={whiteTick} alt="tick" className="w-4 opacity-95" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setStep('form')}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:shadow-[0_12px_30px_rgba(255,90,0,0.18)] transition"
                    >
                      Confirm & Join
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Join {selectedPlan.name} Plan
                  </h2>
                  <p className="text-center text-gray-400 text-sm mt-1">
                    Fill in your details and we’ll get you started.
                  </p>

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Full Name"
                        required
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Email Address"
                        required
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Phone Number"
                        required
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:shadow-[0_12px_30px_rgba(255,90,0,0.18)] transition"
                      >
                        Submit
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep('details')}
                        className="text-sm text-gray-400 hover:text-white transition mt-1"
                      >
                        ← Back to Plan Details
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-8 text-green-400 text-lg font-semibold">
                      ✅ You’re all set! We’ll contact you soon.
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PlanDialog
