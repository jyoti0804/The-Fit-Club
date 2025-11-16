import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Pause, Play, SkipForward } from "lucide-react";

type Exercise = {
  id: number;
  name: string;
  duration: number; // seconds
  description: string;
};

const exercises: Exercise[] = [
  { id: 1, name: "Jumping Jacks", duration: 30, description: "Warm-up cardio exercise" },
  { id: 2, name: "Push-ups", duration: 45, description: "Upper body strength" },
  { id: 3, name: "Squats", duration: 60, description: "Lower body strength" },
  { id: 4, name: "Mountain Climbers", duration: 40, description: "Full body cardio" },
  { id: 5, name: "Plank", duration: 50, description: "Core strengthening exercise" },
  { id: 6, name: "Lunges", duration: 45, description: "Legs & glutes" },
  { id: 7, name: "Burpees", duration: 30, description: "High intensity cardio" },
];

const WorkoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);

  const currentExercise = exercises[currentIndex];

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, currentIndex]);

  const togglePlay = () => setIsRunning(!isRunning);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(exercises[currentIndex + 1].duration);
      setIsRunning(false);
    } else {
      alert("Workout Completed! Great job 💪");
      navigate("/"); // Return to dashboard
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12 flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExercise.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-orange-400 drop-shadow-[0_0_20px_rgba(255,115,0,0.6)]">
            {currentExercise.name}
          </h1>
          <p className="text-gray-400 mt-2">{currentExercise.description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Timer Circle */}
      <div className="w-48 h-48 relative mb-6">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            className="stroke-gray-700"
            cx="50%"
            cy="50%"
            r="70"
            strokeWidth={10}
            fill="none"
          />
          <motion.circle
            className="stroke-orange-500"
            cx="50%"
            cy="50%"
            r="70"
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (timeLeft / currentExercise.duration)}
            animate={{ strokeDashoffset: 2 * Math.PI * 70 * (timeLeft / currentExercise.duration) }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{timeLeft}s</span>
          <span className="text-sm text-gray-400">remaining</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-6 mt-4">
        <button
          onClick={togglePlay}
          className="bg-orange-500 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button
          onClick={handleNext}
          className="bg-red-500 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          <SkipForward />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full max-w-md bg-gray-800 rounded-full h-3">
        <motion.div
          className="bg-orange-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="mt-2 text-gray-400 text-sm">
        Exercise {currentIndex + 1} of {exercises.length}
      </p>
    </div>
  );
};

export default WorkoutPage;


