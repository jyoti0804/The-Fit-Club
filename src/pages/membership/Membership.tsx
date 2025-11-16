import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, clearToken } from "../../auth/Auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../footer/Footer";
import Logo from "../../assets/logo.png";
import { Card, CardContent } from "../../components/ui/card";
type MembershipData = {
  welcome?: string;
  plan?: string;
  expiresAt?: string;
  name?: string;
  email?: string;
  workoutsCompleted?: number;
  caloriesBurned?: number;
  streakDays?: number;
  nextPayment?: string;
};

const tipsB = [
  "Hydrate before, during and after your session.",
  "Include mobility work 2–3 times a week.",
  "Cold shower or contrast therapy can speed recovery.",
  "Foam roll tight areas after workouts.",
];

const perks = [
  { title: "Free PT Consultation", desc: "One free session for new members.", icon: "💪" },
  { title: "20% Shop Discount", desc: "Exclusive member pricing on merch.", icon: "🛍️" },
  { title: "Priority Class Booking", desc: "Book premium classes before public sale.", icon: "🏃‍♀️" },
  { title: "Nutrition Guide", desc: "Monthly meal plans from experts.", icon: "🥗" },
];

// Motion variants for stagger animation of main sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Membership: React.FC = () => {
  const [data, setData] = useState<MembershipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tipIndexB, setTipIndexB] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/member-login");
      return;
    }

    axios
      .get("http://localhost:4000/membership-data", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.ok) setData(res.data.membership);
        else {
          clearToken();
          navigate("/member-login");
        }
      })
      .catch((err) => {
        console.error("Membership fetch error:", err);
        // Fallback demo data so UI shows properly
        setData({
          welcome: "Push. Sweat. Grow — welcome back to FitClub!",
          plan: "Silver",
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
          name: undefined,
          email: "member@fitclub.com",
          workoutsCompleted: 12,
          caloriesBurned: 8450,
          streakDays: 6,
          nextPayment: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
        });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const logoutHandler = () => {
    clearToken();
    navigate("/");
  };

  // PR values
  const workouts = data?.workoutsCompleted ?? 0;
  const workoutsGoal = 20;
  const calories = data?.caloriesBurned ?? 0;
  const caloriesGoal = 12000;
  const timeMinutes = 120;
  const timeGoal = 300;
  const pct = (v: number, g: number) => Math.min(100, Math.round((v / g) * 100));
  const wPct = pct(workouts, workoutsGoal);
  const cPct = pct(calories, caloriesGoal);
  const tPct = pct(timeMinutes, timeGoal);

if (loading) {
  return (
        <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] p-6 animate-shimmer">
    {/* Header Shimmer */}
    <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-36 rounded bg-[#3a3a3a] shimmer" /> {/* logo placeholder */}
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-[#3a3a3a] shimmer" />
          <div className="h-4 w-28 rounded bg-[#3a3a3a] shimmer" />
        </div>
      </div>

      {/* Nav + User */}
      <div className="flex items-center gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-28 rounded bg-[#3a3a3a] shimmer" />
        ))}
        <div className="ml-4 flex items-center gap-2">
          <div className="h-6 w-16 rounded bg-[#3a3a3a] shimmer" /> {/* user name */}
          <div className="h-6 w-16 rounded bg-[#3a3a3a] shimmer" /> {/* logout button */}
        </div>
      </div>
    </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Shimmer */}
        <div className="space-y-6">
          {/* Hello Card */}
          <div className="rounded-2xl p-6 bg-[#2b2b2b]/60 border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)]">
            <div className="h-6 w-20 mb-4 rounded bg-[#3a3a3a] shimmer" />
            <div className="h-10 w-32 rounded bg-[#3a3a3a] shimmer mb-3" />
            <div className="h-4 w-28 rounded bg-[#3a3a3a] shimmer mb-6" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 rounded bg-[#3a3a3a] shimmer" />
              <div className="h-12 rounded bg-[#3a3a3a] shimmer" />
            </div>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 h-12 rounded bg-[#3a3a3a] shimmer" />
              <div className="w-28 h-12 rounded bg-[#3a3a3a] shimmer" />
            </div>
          </div>

          {/* Membership Card */}
          <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_12px_rgba(255,165,0,0.3)]">
            <div className="h-7 w-24 rounded bg-[#3a3a3a] shimmer mb-2" />
            <div className="h-4 w-40 rounded bg-[#3a3a3a] shimmer mb-5" />
            <div className="space-y-3">
              <div className="h-10 rounded bg-[#3a3a3a] shimmer" />
              <div className="h-10 rounded bg-[#3a3a3a] shimmer" />
            </div>
            <div className="mt-5 h-12 rounded bg-[#3a3a3a] shimmer" />
          </div>

          {/* Quick Links */}
          <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_12px_rgba(255,165,0,0.3)]">
            <div className="h-6 w-20 rounded bg-[#3a3a3a] shimmer mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 rounded bg-[#3a3a3a] shimmer" />
              ))}
            </div>
          </div>

          {/* Motivation Block below Quick Links */}
          <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_12px_rgba(255,165,0,0.3)]">
            <div className="h-6 w-28 rounded bg-[#3a3a3a] shimmer mb-3" />
            <div className="h-14 rounded bg-[#3a3a3a] shimmer mb-6" />
            <div className="h-20 rounded bg-[#3a3a3a] shimmer" />
          </div>
        </div>

        {/* Right Column Shimmer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero */}
          <div className="p-8 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)]">
            <div className="h-10 w-60 rounded bg-[#3a3a3a] shimmer mb-3" />
            <div className="h-5 w-96 rounded bg-[#3a3a3a] shimmer mb-7" />
            <div className="flex gap-4">
              <div className="h-12 w-36 rounded bg-[#3a3a3a] shimmer" />
              <div className="h-12 w-36 rounded bg-[#3a3a3a] shimmer" />
            </div>
          </div>

          {/* Workout Plan + Progress Rings */}
          <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)]">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Workout Plan */}
              <div className="flex-1 space-y-4">
                <div className="h-7 w-48 rounded bg-[#3a3a3a] shimmer" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#3a3a3a] p-3 rounded-lg shimmer" />
                ))}
              </div>

              {/* Progress Rings (simulate with circles) */}
              <div className="w-full lg:w-80 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-20 h-20 rounded-full bg-[#3a3a3a] shimmer" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)]"
              >
                <div className="h-5 w-20 rounded bg-[#3a3a3a] shimmer mb-3" />
                <div className="h-10 rounded bg-[#3a3a3a] shimmer" />
                <div className="h-4 w-28 rounded bg-[#3a3a3a] shimmer mt-3" />
              </div>
            ))}
          </div>

          {/* Member Perks */}
          <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)]">
            <div className="h-6 w-32 rounded bg-[#3a3a3a] shimmer mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded bg-[#3a3a3a] shimmer" />
              ))}
            </div>
          </div>

          {/* Tips Carousels */}
          <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)] space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-28 rounded bg-[#3a3a3a] shimmer" />
            ))}
          </div>

          {/* Bottom Mini Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/10 shadow-[0_0_15px_rgba(255,165,0,0.3)] h-40 shimmer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
  // helper routing click (use real navigate where appropriate)
  const handleNavigate = (path: string) => () => navigate(path);

  const expiresDate = data?.expiresAt ? new Date(data.expiresAt) : null;
  const isActive = expiresDate ? expiresDate > new Date() : true;

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]">
      {/* Subtle textured overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-[#141414]/80 to-[#1a1a1a]/100 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,138,0,0.06),transparent_25%),radial-gradient(ellipse_at_bottom_left,rgba(255,43,43,0.04),transparent_20%)] -z-20" />
      </div>

      {/* Header - glass + gradient accent */}
      <header className="text-sm font-medium text-gray-300 px-3 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white hover:scale-[1.05] cursor-pointer"
>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="FitClub" className="w-36 md:w-40 object-contain" />
            <div className="hidden md:block">
              <div className="text-lg md:text-xl font-extrabold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.8)] transition-shadow duration-300 hover:drop-shadow-[0_0_10px_rgba(255,165,0,1)] cursor-default">
                FitClub
              </div>
              <div className="text-xs text-gray-300 -mt-1">Premium Membership</div>
            </div>
          </div>
            <nav className="flex items-center gap-6">
  <button
    onClick={handleNavigate("/memberlist")}
    className="text-sm font-medium text-gray-300 px-3 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white hover:scale-[1.05] cursor-pointer"
  >
    Member’s Data
  </button>

  <button
    onClick={handleNavigate("/products")}
    className="text-sm font-medium text-gray-300 px-3 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white hover:scale-[1.05] cursor-pointer"
  >
    Our Products
  </button>

  <button
    onClick={handleNavigate("/stats")}
    className="text-sm font-medium text-gray-300 px-3 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white hover:scale-[1.05] cursor-pointer"
  >
    Stats
  </button>

            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{data?.name ? data.name : "Athlete"}</div>
                <div className="text-xs text-gray-300">Member</div>
              </div>

              <button
                onClick={logoutHandler}
                className="ml-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-md font-semibold shadow-[0_0_15px_rgba(255,165,0,0.6)] transition-transform duration-300 ease-in-out hover:scale-[1.05] cursor-pointer"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main container */}
      <motion.main
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left column */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Hello Card */}
          <motion.div
            className="rounded-2xl bg-[#2b2b2b]/60 border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] hover:cursor-pointer"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 backdrop-blur-sm shadow-[0_0_12px_rgba(255,90,0,0.25)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-300">Hello</div>
                  <div className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 hover:drop-shadow-[0_0_10px_rgba(255,165,0,1)] cursor-default">Athlete</div>
                  <div className="text-xs text-gray-300 mt-1">{data?.email ?? "—"}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-300">Plan</div>
                  <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                    {data?.plan ?? "Silver"}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-4">{data?.welcome ?? "Push. Sweat. Grow — welcome back to FitClub!"}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#242424]/60 rounded-lg border border-[#ffffff]/3">
                  <div className="text-xs text-gray-300">Status</div>
                  <div className={`mt-1 font-semibold ${isActive ? "text-green-500" : "text-red-400"}`}>
                    {isActive ? "Active ✅" : "Expired ❌"}
                  </div>
                </div>

                <div className="p-3 bg-[#242424]/60 rounded-lg border border-[#ffffff]/3">
                  <div className="text-xs text-gray-300">Next Payment</div>
                  <div className="mt-1 font-medium text-white">{data?.nextPayment ? new Date(data.nextPayment).toLocaleDateString() : "—"}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleNavigate("/plans")}
                  className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-lg font-semibold shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] cursor-pointer"
                >
                  View Plans
                </button>
                <button
                  onClick={handleNavigate("/profile")}
                  className="px-4 py-2 rounded-lg border border-[#ffffff]/6 text-gray-300 transition-transform duration-300 ease-in-out hover:scale-[1.05] cursor-pointer"
                >
                  Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* Membership Card */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.06 }}>
            <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] hover:cursor-pointer">
              <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 hover:drop-shadow-[0_0_10px_rgba(255,165,0,1)] cursor-default">
                Membership
              </h3>
              <p className="text-sm text-gray-300 mt-1">Plan details & renewal</p>

              <div className="mt-4 space-y-3">
                <div className="p-3 bg-[#242424]/60 rounded-lg border border-[#ffffff]/6">
                  <div className="text-xs text-gray-300">Plan</div>
                  <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mt-1">
                    {data?.plan ?? "Silver"}
                  </div>
                </div>

                <div className="p-3 bg-[#242424]/60 rounded-lg border border-[#ffffff]/6">
                  <div className="text-xs text-gray-300">Expires</div>
                  <div className="font-medium mt-1 text-white">{expiresDate ? expiresDate.toLocaleString() : "—"}</div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleNavigate("/renew")}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-lg font-semibold shadow-[0_0_15px_rgba(255,165,0,0.6)] transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,165,0,0.8)] cursor-pointer"
                >
                  Renew Membership
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.12 }}>
         <div className="mt-3 grid grid-cols-2 gap-3">
  {[
    { label: "Edit Profile", path: "/edit-profile" },
    { label: "Transactions", path: "/transactions" },
    { label: "Change Plan", path: "/plans" },
    { label: "Help & Support", path: "/support" },
  ].map(({ label, path }) => (
    <button
      key={label}
      onClick={handleNavigate(path)}
      className="p-3 rounded-lg bg-[#242424]/60 text-sm text-gray-300 border border-[#ffffff]/6 transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_10px_rgba(255,165,0,0.5)] cursor-pointer"
    >
      {label}
    </button>
  ))}
</div>

          </motion.div>

          {/* Additional block below Quick Links to fill space */}
          <motion.div
  variants={itemVariants}
  className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] hover:cursor-pointer"
  initial="hidden"
  animate="visible"
  transition={{ delay: 0.18 }}
>
  <h4 className="text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 hover:drop-shadow-[0_0_10px_rgba(255,165,0,1)] cursor-default">
    Motivation
  </h4>
  <blockquote className="text-gray-300 italic text-sm mt-1 mb-6">
    “The only bad workout is the one that didn’t happen.” Keep pushing your limits!
  </blockquote>

  {/* First image (strong man training) */}
  <img
    src="https://i0.wp.com/goldsgym.in/wp-content/uploads/2023/12/compress-strong-man-training-gym-min-scaled.jpg?resize=1536%2C1024&ssl=1"
    alt="Strong man training gym"
    className="rounded-lg w-full mb-6 object-cover"
  />

  {/* Second image (Planning to Install a Gym) */}
  <img
    src="https://www.fitness-world.in/wp-content/uploads/2022/01/Planning-to-Install-a-Gym-in-your-Society-Banner-1200x620.jpg"
    alt="Planning to Install a Gym in your Society"
    className="rounded-lg w-full object-cover"
  />
  <div className="mt-6 text-center">
    <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-[0_0_10px_rgba(255,127,17,0.9)] select-none cursor-default">
      FitClub
    </h2>
  </div>
</motion.div>
        </motion.div>
        {/* Right column (main) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Hero */}
          <motion.div initial="hidden" animate="visible" transition={{ duration: 0.6 }}>
            <div className="p-8 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] hover:cursor-default">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1
                    className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(255,127,17,0.75)] transition-shadow duration-300 hover:drop-shadow-[0_0_12px_rgba(255,127,17,1)] cursor-default"
                  >
                    Welcome to{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                      FitClub
                    </span>
                  </h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    {data?.welcome ?? "Consistency builds results. Keep showing up — we’ll handle the rest."}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleNavigate("/workouts")}
                      className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] cursor-pointer"
                    >
                      Start Workout
                    </button>
                    <button
                      onClick={handleNavigate("/classes")}
                      className="px-4 py-2 rounded-lg border border-[#ffffff]/6 text-gray-300 transition-transform duration-300 ease-in-out hover:scale-[1.05] cursor-pointer"
                    >
                      View Classes
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center p-4 rounded-2xl bg-[#242424]/60 border border-[#ffffff]/6 shadow-[0_0_10px_rgba(255,165,0,0.5)] w-36">
                    <div className="text-xs text-gray-300">Streak</div>
                    <div className="text-2xl font-bold mt-1 text-white">{data?.streakDays ?? 0}d</div>
                  </div>

                  <div className="text-center p-4 rounded-2xl bg-[#242424]/60 border border-[#ffffff]/6 shadow-[0_0_10px_rgba(255,165,0,0.5)] w-36">
                    <div className="text-xs text-gray-300">This Month</div>
                    <div className="text-2xl font-bold mt-1 text-white">{data?.workoutsCompleted ?? 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* DM6: Mini Workout Plan + Progress Rings (PR2 sporty) */}
          <motion.div initial="hidden" animate="visible" transition={{ delay: 0.06 }}>
            <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] hover:cursor-pointer">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Workout Plan (left) */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 hover:drop-shadow-[0_0_10px_rgba(255,165,0,1)] cursor-default">
                      Today's Workout Plan
                    </h3>
                    <div className="text-xs text-gray-300">Goal: {workoutsGoal} workouts</div>
                  </div>

                  <ul className="mt-4 space-y-3">
                    {[
                      { name: "Warm-up (10min)", done: true },
                      { name: "Squats 4x8", done: false },
                      { name: "Bench Press 4x8", done: false },
                      { name: "Cooldown + Stretch", done: false },
                    ].map((w, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 bg-[#242424]/60 p-3 rounded-lg border border-[#ffffff]/6"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            w.done ? "bg-green-500 text-white" : "bg-[#2b2b2b] text-gray-300"
                          }`}
                        >
                          {w.done ? "✓" : i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{w.name}</div>
                          <div className="text-xs text-gray-300">Rep / time guidance</div>
                        </div>
                        <button
                          onClick={handleNavigate("/workouts")}
                          className="px-3 py-1 rounded-md bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] cursor-pointer"
                        >
                          Start
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress Rings (right) */}
                <div className="w-full lg:w-80 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-6">
                    <ProgressRing size={88} stroke={10} percentage={wPct} label="Workouts" accent="#FF7F11" />
                    <ProgressRing size={88} stroke={10} percentage={cPct} label="Calories" accent="#FF7F11" />
                    <ProgressRing size={88} stroke={10} percentage={tPct} label="Time" accent="#FF7F11" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" animate="visible" transition={{ delay: 0.12 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                <div className="text-xs text-gray-300">Workouts</div>
                <div className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 cursor-default">
                  {workouts}
                </div>
                <div className="text-sm text-gray-300 mt-2">This month</div>
              </div>

              <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                <div className="text-xs text-gray-300">Calories</div>
                <div className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 cursor-default">
                  {calories.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300 mt-2">Estimated burned</div>
              </div>

              <div className="p-5 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                <div className="text-xs text-gray-300">Next Payment</div>
                <div className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 cursor-default">
                  {data?.nextPayment ? new Date(data.nextPayment).toLocaleDateString() : "—"}
                </div>
                <div className="text-sm text-gray-300 mt-2">{isActive ? "Auto-renews" : "Renew to continue"}</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom combined section */}
          <motion.div initial="hidden" animate="visible" transition={{ delay: 0.16 }} className="space-y-6">
            {/* Member Perks */}
            <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] transition-shadow duration-300 cursor-default">
                  Member Perks
                </h3>
                <div className="text-xs text-gray-300">Exclusive benefits</div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {perks.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#242424]/60 rounded-lg border border-[#ffffff]/6 flex gap-3 items-start transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(255,165,0,0.6)] cursor-pointer"
                  >
                    <div className="text-2xl">{p.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{p.title}</div>
                      <div className="text-sm text-gray-300">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Carousel A */}
<Card
  className="relative p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)]  transition-transform transform hover:scale-105"
>
  <CardContent className="relative p-6 text-black text-center z-10">
    <h3 className="text-lg font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] cursor-default">
      Wellness Tips
    </h3>

    {/* Rotating circles */}
    <div className="relative w-20 h-20 mx-auto mb-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 border-r-orange-500"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border-4 border-transparent border-b-yellow-300 border-l-orange-400"
      />
      <div className="absolute inset-4 rounded-full bg-opacity-30" />
    </div>

    {/* Tips list */}
    <ul className="text-sm text-gray-100 space-y-2">
      <li className="italic">• Take breaks and breathe deeply.</li>
      <li className="italic">• Maintain a balanced diet.</li>
      <li className="italic">• Prioritize sleep for recovery.</li>
      <li className="italic">• Include mindfulness exercises.</li>
    </ul>
  </CardContent>
</Card>


            {/* Tips Carousel B */}
            <div className="p-6 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white drop-shadow-[0_0_6px_rgba(255,165,0,0.75)] cursor-default">
                  Wellness Tips
                </h3>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setTipIndexB((i) => (i - 1 + tipsB.length) % tipsB.length)}
                    className="px-3 py-1 rounded-md border border-[#ffffff]/6 text-gray-300 cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setTipIndexB((i) => (i + 1) % tipsB.length)}
                    className="px-3 py-1 rounded-md border border-[#ffffff]/6 text-gray-300 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tipIndexB}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="text-gray-300 text-lg"
                  >
                    {tipsB[tipIndexB]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* 3 Mini Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] cursor-pointer">
                <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                  Tip of the Day
                </div>
                <div className="mt-2 text-white font-bold">Prioritise compound movements.</div>
                <div className="text-sm text-gray-300 mt-2">They give the biggest return on time invested.</div>
              </div>

              <div className="p-4 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] cursor-pointer">
                <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                  Stretch Routine
                </div>
                <div className="mt-2 text-white font-bold">5-minute full-body stretch</div>
                <div className="text-sm text-gray-300 mt-2">Neck → Shoulders → Hips → Hamstrings → Calves.</div>
              </div>

              <div className="p-4 bg-[#2b2b2b]/60 rounded-2xl border border-[#ffffff]/5 shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,165,0,0.7)] cursor-pointer">
                <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                  Hydration Reminder
                </div>
                <div className="mt-2 text-white font-bold">Drink 300–500ml now</div>
                <div className="text-sm text-gray-300 mt-2">Hydration helps performance & recovery.</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Membership;

/* ---------------------------
   ProgressRing Component (PR2 sporty)
   kept in same file for S1 single-file structure
   --------------------------- */

type PRProps = {
  size: number;
  stroke: number;
  percentage: number; // 0-100
  label?: string;
  accent?: string;
};

const ProgressRing: React.FC<PRProps> = ({
  size,
  stroke,
  percentage,
  label,
  accent = "#FF7F11",
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percentage / 100) * circumference;
  const dashOffset = circumference - dash;

  // safe id for gradient
  const gid = `g${accent.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <motion.linearGradient
            id={gid}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            animate={{ stopColor: ["#FF7F11", "#FF5500", "#FF7F11"] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
          >
            <motion.stop
              offset="0%"
              stopColor={accent}
              stopOpacity="1"
              animate={{ stopColor: ["#FF7F11", "#FF5500", "#FF7F11"] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.stop
              offset="100%"
              stopColor="#bf4e00"
              stopOpacity="1"
              animate={{ stopColor: ["#bf4e00", "#e04e00", "#bf4e00"] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            />
          </motion.linearGradient>
        </defs>

        {/* background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#242424"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* animated ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* inner small fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - stroke - 1}
          fill="rgba(0,0,0,0.15)"
        />
      </svg>

      <div className="text-center">
        <div className="text-sm font-semibold text-white">{percentage}%</div>
        <div className="text-xs text-gray-300">{label}</div>
      </div>
    </div>
  );
};




