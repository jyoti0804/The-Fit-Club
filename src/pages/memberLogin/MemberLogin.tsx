import React, { useState } from "react";
import { saveToken } from "../../auth/Auth"; 
import { useNavigate } from "react-router-dom";

const MemberLogin: React.FC = () => {
  const [username, setUsername] = useState("fitClub"); // prefilled demo username
  const [password, setPassword] = useState("fitClub1234"); // prefilled demo password
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    // Simulate server request with a delay
    setTimeout(() => {
      if (username === "fitClub" && password === "fitClub1234") {
        // Mock token
        const mockToken = "mock-jwt-token-1234567890";

        saveToken(mockToken); // save token like original flow
        console.log("TOKEN FROM SERVER:", { token: mockToken, username });

        navigate("/membership"); // redirect as in original code
      } else {
        setErr("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#070707] to-[#0f0f0f]">
      <div className="absolute inset-0 bg-[url('/assets/gym-bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="relative z-10 w-full max-w-3xl mx-4 md:mx-8 p-6 md:p-12 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left visual */}
          <div className="hidden lg:flex flex-col gap-4 justify-center items-start">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Member Login
            </h1>
            <p className="text-gray-300 max-w-md">
              Secure member area. Sign in using your FitClub credentials to access membership content.
            </p>
            <div className="mt-6 w-full h-[220px] rounded-xl bg-gradient-to-br from-[#111111]/60 via-[#161616]/40 to-[#000]/30 border border-orange-700/20 shadow-[0_10px_30px_rgba(255,90,0,0.06)] flex items-center justify-center">
              <div className="text-orange-400 text-6xl font-extrabold">FIT</div>
            </div>
          </div>

          {/* Right: login form */}
          <div className="w-full">
            <form
              onSubmit={submit}
              className="bg-[#0b0b0b]/70 backdrop-blur-md border border-[#ff7a2b]/20 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
              <p className="text-sm text-gray-300 mb-6">
                Login with FitClub username & password
              </p>

              <label className="block mb-3">
                <span className="text-xs text-gray-300">Username</span>
                <input
                  className="mt-1 w-full rounded-md border border-[#333] bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="fitClub"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="text-xs text-gray-300">Password</span>
                <input
                  type="password"
                  className="mt-1 w-full rounded-md border border-[#333] bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="fitClub1234"
                  required
                />
              </label>

              {err && <div className="text-sm text-red-400 mb-4">{err}</div>}

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-md border border-orange-500 text-orange-400 hover:shadow-[0_0_30px_rgba(255,120,40,0.14)] transition disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-4 py-3 rounded-md text-sm text-gray-300 border border-transparent hover:bg-white/2"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;
