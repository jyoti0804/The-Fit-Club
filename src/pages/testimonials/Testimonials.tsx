import React, { useState } from "react"
import { testimonialsData } from "../../data/testimonialsData"
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"
import { motion } from "framer-motion"

const Testimonials: React.FC = () => {
  const transition = { type: "spring" as const, duration: 3 }
  const [selected, setSelected] = useState<number>(0)
  const totalTestimonials: number = testimonialsData.length

  const handlePrevious = (): void => {
    setSelected(selected === 0 ? totalTestimonials - 1 : selected - 1)
  }

  const handleNext = (): void => {
    setSelected(selected === totalTestimonials - 1 ? 0 : selected + 1)
  }

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-col md:flex-row gap-8 px-8 md:px-24 py-16 text-white
                 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] overflow-hidden
                 shadow-[0_0_25px_rgba(255,90,0,0.15)]"
    >
      {/* Glow Background Accents */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-[10%] w-[22rem] h-[12rem] bg-orange-500/40 blur-[180px] -z-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-[10%] w-[22rem] h-[12rem] bg-red-500/40 blur-[180px] -z-10"
      />

      {/* LEFT CONTENT */}
      <motion.div
        className="flex flex-1 flex-col gap-8 uppercase z-10"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span className="text-orange-500 font-bold tracking-wide">Testimonials</span>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="font-bold text-4xl md:text-5xl block">What they</span>
          <span
            className="font-bold text-4xl md:text-5xl bg-clip-text text-transparent
                       bg-gradient-to-r from-gray-300 to-gray-100"
          >
            say about us
          </span>
        </motion.div>

        {/* Review Text */}
        <motion.p
          key={selected}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={transition}
          className="normal-case text-justify tracking-wider leading-8 md:leading-10 text-gray-300
                     bg-[#2b2b2b]/40 p-4 rounded-lg
                     shadow-[0_0_15px_rgba(255,90,0,0.1)]"
        >
          {testimonialsData[selected].review}
        </motion.p>

        {/* Reviewer Name & Status */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm md:text-base"
        >
          <span className="text-orange-500 font-semibold tracking-wide">
            {testimonialsData[selected].name}
          </span>{" "}
          - {testimonialsData[selected].status}
        </motion.span>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        className="flex-1 relative flex items-center justify-center mt-8 md:mt-0 z-10"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Decorative Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute w-68 h-80 right-32 top-4 rounded-md
                     border-2 border-orange-500 bg-transparent
                     shadow-[0_0_20px_rgba(255,90,0,0.2)]"
        />

        {/* Background Accent Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute w-68 h-80 right-28 top-16 rounded-md
                     bg-gradient-to-r from-orange-500/40 to-red-500/40 blur-[2px]"
        />

        {/* Testimonial Image */}
        <motion.img
          key={selected}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={transition}
          src={testimonialsData[selected].image}
          alt="Client testimonial"
          className="absolute w-68 h-80 object-cover right-32 top-8 rounded-md
                     shadow-[0_0_25px_rgba(255,90,0,0.25)]"
          whileHover={{ scale: 1.03 }}
        />

        {/* Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute flex gap-6 bottom-4 left-12"
        >
          <motion.img
            onClick={handlePrevious}
            src={leftArrow}
            alt="Previous testimonial"
            whileHover={{ scale: 1.15, rotate: -8 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="w-7 cursor-pointer hover:brightness-125"
          />

          <motion.img
            onClick={handleNext}
            src={rightArrow}
            alt="Next testimonial"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="w-7 cursor-pointer hover:brightness-125"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Testimonials
