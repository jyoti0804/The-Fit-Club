import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { User, Calendar, Dumbbell, Flame } from "lucide-react";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    membershipPlan: "Monthly",
    renewalDate: "2025-12-01",
    workoutsCompleted: 128,
    streakDays: 45,
    caloriesBurned: 15230,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-orange-400 mb-8 drop-shadow-[0_0_20px_rgba(255,115,0,0.6)]">
        My Profile
      </h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info */}
        <Card className="bg-[#1b1919] border border-orange-500/20 shadow-[0_0_20px_rgba(255,115,0,0.25)] rounded-2xl">
          <CardHeader className="flex items-center gap-4">
            <User className="w-8 h-8 text-orange-400" />
            <CardTitle className="text-lg text-orange-500 font-bold">{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-gray-300">
            <p>Email: {user.email}</p>
            <p>Plan: {user.membershipPlan}</p>
            <p>Renewal Date: {user.renewalDate}</p>
            <div className="flex gap-3 mt-4">
              <button
                  onClick={() => navigate("/edit-profile")}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold shadow-[0_0_15px_rgba(255,115,0,0.6)] hover:scale-105 transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/renew")}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold shadow-[0_0_15px_rgba(255,115,0,0.6)] hover:scale-105 transition-all"
              >
                Renew Membership
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-[#1a1a1a] border border-orange-500/20 shadow-[0_0_20px_rgba(255,115,0,0.25)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-orange-400">My Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 text-gray-300">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-orange-400" />
              <p>Workouts Completed: {user.workoutsCompleted}</p>
            </div>
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400" />
              <p>Streak Days: {user.streakDays}</p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-orange-400" />
              <p>Calories Burned: {user.caloriesBurned}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
