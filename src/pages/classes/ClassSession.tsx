import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type Exercise = {
  name: string;
  duration: number; // in seconds
  description: string;
};

type GymClass = {
  id: number;
  name: string;
  instructor: string;
  duration: number;
  type: string;
  description: string;
  exercises: Exercise[];
};

const ClassSession: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { classInfo?: GymClass };
  const classInfo = state?.classInfo;

  // Redirect if no classInfo is passed
  useEffect(() => {
    if (!classInfo) {
      navigate("/classes"); // redirect back to classes page
    }
  }, [classInfo, navigate]);

  if (!classInfo) {
    // Show nothing while redirecting
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(classInfo.exercises[0].duration);
  const [isRunning, setIsRunning] = useState(true);

  const currentExercise = classInfo.exercises[currentIndex];

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const nextExercise = () => {
    if (currentIndex < classInfo.exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(classInfo.exercises[currentIndex + 1].duration);
      setIsRunning(true);
    } else {
      alert("Class Completed! Great job! 🎉");
      navigate("/classes");
    }
  };

  const prevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTimeLeft(classInfo.exercises[currentIndex - 1].duration);
      setIsRunning(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-8 py-12 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/classes")}
        className="flex items-center gap-2 mb-6 text-orange-400 hover:text-orange-300"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Classes
      </button>

      {/* Class Info */}
      <div className="max-w-3xl w-full bg-[#1a1a1a] rounded-2xl p-8 shadow-xl shadow-orange-500/20 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-orange-400">{classInfo.name}</h1>
        <p className="text-gray-400">{classInfo.description}</p>

        {/* Current Exercise */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-2">{currentExercise.name}</h2>
          <p className="text-gray-300 mb-4 text-center">{currentExercise.description}</p>

          <div className="text-5xl font-bold mb-4">{formatTime(timeLeft)}</div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2 rounded-xl font-semibold text-white hover:scale-105 transition-all"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              onClick={prevExercise}
              disabled={currentIndex === 0}
              className="bg-gray-700 px-6 py-2 rounded-xl font-semibold text-white disabled:opacity-50 hover:scale-105 transition-all"
            >
              Previous
            </button>
            <button
              onClick={nextExercise}
              className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2 rounded-xl font-semibold text-white hover:scale-105 transition-all"
            >
              Next
            </button>
          </div>
        </div>

        <div className="text-gray-400 text-sm mt-2 text-center">
          Exercise {currentIndex + 1} / {classInfo.exercises.length}
        </div>
      </div>
    </div>
  );
};

export default ClassSession;
