import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  // Dummy initial user data
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [plan, setPlan] = useState("Monthly");
  const [success, setSuccess] = useState(false);

  const plans = ["Monthly", "Quarterly", "Yearly"];


 const handleSave = () => {
    // Normally, here you would send API request to save
    setSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-orange-400 hover:text-orange-300"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl font-extrabold text-orange-400 mb-8 drop-shadow-[0_0_20px_rgba(255,115,0,0.6)]">
        Edit Profile
      </h1>

      <Card className="w-full max-w-lg bg-[#1a1a1a] border border-orange-500/20 shadow-[0_0_20px_rgba(255,115,0,0.25)] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-orange-400">Update Your Info</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-gray-300">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-[#2b2b2b] border border-gray-700 text-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-[#2b2b2b] border border-gray-700 text-white"
            />
          </div>

          {/* Membership Plan */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Membership Plan</label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger className="bg-[#2b2b2b] border border-gray-700 text-white">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent className="bg-[#2b2b2b] border border-gray-700">
                {plans.map((p) => (
                  <SelectItem key={p} value={p} className="text-white hover:bg-white/10">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-lg font-semibold shadow-[0_0_15px_rgba(255,115,0,0.6)] hover:scale-105 transition-all"
          >
            Save Changes
          </button>
        </CardContent>
      </Card>
 {/* Success Message */}
     {success && (
       <div className="fixed top-10 bg-green-500/90 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeIn">
         Profile updated successfully! 
       </div>
     )}
    </div>
  );
};

export default EditProfile;


