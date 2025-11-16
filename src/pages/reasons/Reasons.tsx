'use client'

import React from 'react'
import { motion } from 'framer-motion'
import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import nb from "../../assets/nb.png"
import adidas from "../../assets/adidas.png"
import tick from "../../assets/tick.png"
import nike from "../../assets/nike.png"

const Reasons: React.FC = () => {
  return (
    <section
      id="why-us"
      className="relative min-h-[80vh] bg-gradient-to-b from-[#0d0d0d] via-[#141414] to-[#1a1a1a]
      text-white overflow-hidden px-8 py-20 shadow-[0_0_25px_rgba(255,90,0,0.15)]"
    >
      {/* Background Blur Image Layer (Matching Theme) */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-60 blur-2xl"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg')",
        }}
      ></div>

      {/* Glow Orbs */}
      <div className="absolute top-[15%] left-[5%] w-[26rem] h-[18rem] 
        bg-gradient-to-r from-orange-500/30 via-transparent to-amber-400/10 
        blur-[200px] rounded-full -z-10"></div>

      <div className="absolute bottom-[10%] right-[10%] w-[24rem] h-[18rem] 
        bg-gradient-to-l from-red-500/30 via-transparent to-pink-400/10 
        blur-[200px] rounded-full -z-10"></div>

      {/* MAIN CONTENT */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }}
        className="flex flex-col md:flex-row gap-14 items-center relative z-10"
      >

        {/* Left Images Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -40 },
            show: { 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
          className="flex-1 grid grid-cols-3 gap-4 auto-rows-fr"
        >
          {[image1, image2, image3, image4].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              className="object-cover rounded-xl shadow-[0_0_20px_rgba(255,140,70,0.2)] backdrop-blur-md"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={
                i === 0
                  ? { width: "12rem", height: "28rem", gridRow: "span 2" }
                  : i === 1
                  ? { gridColumn: "span 2", height: "16rem" }
                  : i === 2
                  ? { width: "14rem", gridColumn: "span 1" }
                  : { width: "10rem", height: "11rem", gridColumn: "span 1" }
              }
            />
          ))}
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 40 },
            show: { 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
          className="flex-1 flex flex-col gap-6 uppercase"
        >
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-orange-400 tracking-wider"
          >
            Some Reasons
          </motion.span>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight italic"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
              Why
            </span>{" "}
            choose us?
          </motion.div>

          {/* Features List */}
          <div className="flex flex-col gap-4 mt-4">
            {[
              "OVER 140+ EXPERT COACHES",
              "TRAIN SMARTER AND FASTER THAN BEFORE",
              "1 FREE PROGRAM FOR NEW MEMBERS",
              "RELIABLE PARTNERS",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.5 }}
                className="flex items-center gap-4 text-gray-300 text-base hover:text-orange-300 
                transition-colors duration-300 tracking-wide"
              >
                <img src={tick} className="w-6 h-6 brightness-125" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Partners Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 font-normal mt-6 tracking-wide"
          >
            OUR PARTNERS
          </motion.span>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-6 mt-3"
          >
            {[nb, adidas, nike].map((logo, i) => (
              <motion.img
                key={i}
                src={logo}
                className="w-10 h-10 opacity-70 hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,140,70,0.3)]"
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  )
}

export default Reasons
