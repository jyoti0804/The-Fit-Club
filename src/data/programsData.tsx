import { Dumbbell, HeartPulse, Flame, Activity } from "lucide-react";
import type{ ReactNode } from "react";

export interface ProgramType {
  image: ReactNode;
  heading: string;
  details: string;
}

export const programsData: ProgramType[] = [
  {
    image: <Dumbbell size={40} strokeWidth={1.5} />,
    heading: "Strength Training",
    details:
      "Improve your strength through structured exercises focusing on muscle building.",
  },
  {
    image: <HeartPulse size={40} strokeWidth={1.5} />,
    heading: "Cardio Training",
    details:
      "Boost your endurance, stamina, and cardiovascular health with 20–30 min sessions.",
  },
  {
    image: <Flame size={40} strokeWidth={1.5} />,
    heading: "Fat Burning",
    details:
      "A high-intensity program for reducing fat and achieving a lean body transformation.",
  },
  {
    image: <Activity size={40} strokeWidth={1.5} />,
    heading: "Health Fitness",
    details:
      "Maintain your body fitness, flexibility, and overall health with balanced workouts.",
  },
];
