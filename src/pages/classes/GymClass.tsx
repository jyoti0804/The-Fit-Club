import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowRight } from "lucide-react";

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

// Expanded list of classes
const gymClasses: GymClass[] = [
  {
    id: 1,
    name: "Morning Cardio",
    instructor: "Alice",
    duration: 1800,
    type: "Cardio",
    description: "Boost your energy with high-intensity cardio.",
    exercises: [
      { name: "Jumping Jacks", duration: 60, description: "Warm-up exercise" },
      { name: "High Knees", duration: 60, description: "Increase heart rate" },
      { name: "Burpees", duration: 90, description: "Full-body exercise" },
    ],
  },
  {
    id: 2,
    name: "Strength Training",
    instructor: "Bob",
    duration: 3600,
    type: "Strength",
    description: "Build muscle and strength with targeted exercises.",
    exercises: [
      { name: "Push-ups", duration: 60, description: "Chest and triceps" },
      { name: "Squats", duration: 60, description: "Legs and glutes" },
      { name: "Plank", duration: 90, description: "Core stability" },
    ],
  },
  {
    id: 3,
    name: "HIIT Blast",
    instructor: "Charlie",
    duration: 1200,
    type: "HIIT",
    description: "Short, intense bursts to burn maximum calories.",
    exercises: [
      { name: "Sprint", duration: 30, description: "Max speed running" },
      { name: "Mountain Climbers", duration: 45, description: "Core & cardio" },
      { name: "Jump Squats", duration: 60, description: "Explosive legs" },
    ],
  },
  {
    id: 4,
    name: "Evening Yoga",
    instructor: "Diana",
    duration: 1800,
    type: "Yoga",
    description: "Relax your body and mind with gentle stretches and poses.",
    exercises: [
      { name: "Sun Salutation", duration: 120, description: "Warm-up sequence" },
      { name: "Downward Dog", duration: 60, description: "Stretch back and legs" },
      { name: "Tree Pose", duration: 90, description: "Balance exercise" },
    ],
  },
  {
    id: 5,
    name: "Core Crusher",
    instructor: "Evan",
    duration: 1500,
    type: "Core",
    description: "Strengthen your abs and lower back for a solid core.",
    exercises: [
      { name: "Plank", duration: 60, description: "Core stability" },
      { name: "Bicycle Crunches", duration: 60, description: "Oblique focus" },
      { name: "Leg Raises", duration: 90, description: "Lower abs" },
    ],
  },
  {
    id: 6,
    name: "Full Body HIIT",
    instructor: "Fiona",
    duration: 1800,
    type: "HIIT",
    description: "Engage all major muscle groups with high-intensity moves.",
    exercises: [
      { name: "Jump Squats", duration: 60, description: "Legs & glutes" },
      { name: "Push-ups", duration: 60, description: "Chest & arms" },
      { name: "Burpees", duration: 90, description: "Full body" },
    ],
  },
];

export const Classes: React.FC = () => {
  const navigate = useNavigate();

  const startClass = (gymClass: GymClass) => {
    navigate("/class-session", { state: { classInfo: gymClass } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-8 py-12">
      <h1 className="text-4xl font-extrabold text-orange-400 mb-12 text-center drop-shadow-[0_0_20px_rgba(255,115,0,0.6)]">
        💪 Available Classes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {gymClasses.map((c) => (
          <Card key={c.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl shadow-xl shadow-orange-500/10 overflow-hidden">
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="text-xl font-bold text-orange-400">{c.name}</CardTitle>
              <p className="text-gray-400 text-sm">{c.type} | Instructor: {c.instructor}</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex flex-col gap-4">
              <p className="text-gray-300 text-sm line-clamp-3">{c.description}</p>
              <button
                onClick={() => startClass(c)}
                className="mt-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2 justify-center hover:scale-105 transition-all"
              >
                Start Class <ArrowRight className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};



