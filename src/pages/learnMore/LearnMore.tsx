"use client"
import React from 'react';
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

const LearnMorePage: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.15 }}
      className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white p-8 space-y-16"
    >
      <motion.h1
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold border-b-4 border-orange-500 pb-2"
      >
        Welcome to Our Gym
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center text-lg font-light text-gray-300"
      >
        Discover everything we offer to help you get in the best shape of your life, from expert coaches to tailored fitness programs.
      </motion.p>

      {/* Features Section */}
      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-red-500 pb-1">
          Our Features
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-300">
          <motion.li variants={fadeUp} transition={{ duration: 0.8 }}>
            <h3 className="text-xl font-bold text-orange-400 mb-2">State-of-the-Art Equipment</h3>
            <p>Access to modern gym machines and tools to maximize your workout efficiency.</p>
          </motion.li>

          <motion.li variants={fadeUp} transition={{ duration: 0.8 }}>
            <h3 className="text-xl font-bold text-orange-400 mb-2">Personal Training</h3>
            <p>Work one-on-one with expert trainers who customize plans to your needs.</p>
          </motion.li>

          <motion.li variants={fadeUp} transition={{ duration: 0.8 }}>
            <h3 className="text-xl font-bold text-orange-400 mb-2">Nutrition Guidance</h3>
            <p>Get personalized diet plans that complement your fitness goals.</p>
          </motion.li>
        </ul>
      </motion.section>

      {/* Membership Plans Section */}
      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-red-500 pb-1">
          Membership Plans
        </h2>

        <div className="flex flex-col md:flex-row justify-around gap-8 text-gray-300">

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="bg-[#2b2b2b]/60 rounded-xl p-6 shadow-lg shadow-orange-600/40 flex-1"
          >
            <h3 className="text-2xl font-bold mb-2 text-orange-400">Basic</h3>
            <p className="mb-4">Access to all gym equipment and group classes.</p>
            <p className="text-lg font-semibold">$30 / month</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="bg-[#2b2b2b]/60 rounded-xl p-6 shadow-lg shadow-orange-600/40 flex-1"
          >
            <h3 className="text-2xl font-bold mb-2 text-orange-400">Premium</h3>
            <p className="mb-4">Includes basic features + personal training sessions.</p>
            <p className="text-lg font-semibold">$60 / month</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="bg-[#2b2b2b]/60 rounded-xl p-6 shadow-lg shadow-orange-600/40 flex-1"
          >
            <h3 className="text-2xl font-bold mb-2 text-orange-400">Elite</h3>
            <p className="mb-4">All premium benefits + nutrition coaching and wellness workshops.</p>
            <p className="text-lg font-semibold">$90 / month</p>
          </motion.div>

        </div>
      </motion.section>

      {/* Trainers Section */}
      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-red-500 pb-1">
          Meet Our Trainers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-300">

          {[
            { name: "Alice Johnson", specialty: "Strength Training", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Mark Evans", specialty: "Cardio & Endurance", img: "https://randomuser.me/api/portraits/men/49.jpg" },
            { name: "Sophia Lee", specialty: "Yoga & Flexibility", img: "https://randomuser.me/api/portraits/women/68.jpg" },
          ].map((trainer, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="bg-[#2b2b2b]/60 rounded-xl p-4 flex flex-col items-center shadow-md shadow-orange-600/40"
            >
              <img src={trainer.img} alt={trainer.name} className="w-28 h-28 rounded-full mb-4 object-cover" />
              <h3 className="text-xl font-semibold">{trainer.name}</h3>
              <p className="italic text-orange-400">{trainer.specialty}</p>
            </motion.div>
          ))}

        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-red-500 pb-1">What Our Members Say</h2>

        <div className="space-y-6 text-gray-300 max-w-3xl mx-auto">
          <motion.blockquote
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-orange-500 pl-4 italic"
          >
            "Joining this gym was the best decision I ever made. The trainers are supportive and the community is motivating!"
          </motion.blockquote>

          <motion.blockquote
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-orange-500 pl-4 italic"
          >
            "The facilities are top-notch and there is always a class that fits my schedule. Highly recommend!"
          </motion.blockquote>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default LearnMorePage;



