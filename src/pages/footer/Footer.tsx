"use client"
import React from "react"
import { motion } from "framer-motion"

import Github from "../../assets/github.png"
import Instagram from "../../assets/instagram.png"
import LinkedIn from "../../assets/linkedin.png"
import Logo from "../../assets/logo.png"

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative bg-gradient-to-b from-[#0d0d0d] via-[#141414] to-[#1a1a1a]
                 text-white overflow-hidden shadow-[0_-2px_25px_rgba(255,90,0,0.15)]"
    >
      {/* Divider Line */}
      <hr className="border-t border-gray-700/60" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 px-8 gap-10 relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.img
            src={Logo}
            alt="Logo"
            className="w-36 md:w-40"
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 250 }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed"
        >
          Empowering you to build strength, discipline, and confidence through fitness and community.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex gap-8 md:gap-12"
        >
          {[{ src: Github, alt: "GitHub" }, { src: Instagram, alt: "Instagram" }, { src: LinkedIn, alt: "LinkedIn" }].map(
            (icon, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 30px rgba(255,140,70,0.55)",
                  backgroundColor: "rgba(255,120,50,0.2)",
                }}
                transition={{ type: "spring", stiffness: 250 }}
                className="p-3 bg-[#2b2b2b]/70 rounded-full cursor-pointer
                           shadow-[0_0_15px_rgba(255,90,0,0.3)]
                           backdrop-blur-md border border-[#3a3a3a]"
              >
                <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
              </motion.div>
            )
          )}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-500 text-xs md:text-sm"
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-orange-400 font-semibold">FitClub</span>. All rights reserved.
        </motion.div>
      </motion.div>

      {/* Glow Orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 right-[18%] w-[22rem] h-[14rem] blur-[200px] bg-red-500/50 -z-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-[18%] w-[22rem] h-[14rem] blur-[200px] bg-orange-500/50 -z-10"
      />
    </motion.footer>
  )
}

export default Footer
