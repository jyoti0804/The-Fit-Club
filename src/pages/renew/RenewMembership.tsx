import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const RenewMembership: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false);
  const [confettiWidth, setConfettiWidth] = useState(window.innerWidth);
  const [confettiHeight, setConfettiHeight] = useState(window.innerHeight);

  const plans = [
    { name: "Monthly", price: "$29.99" },
    { name: "Quarterly", price: "$79.99" },
    { name: "Yearly", price: "$299.99" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);

    // Auto redirect after 2.5 seconds
    setTimeout(() => {
      navigate("/membership");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-orange-400 mb-6 drop-shadow-[0_0_20px_rgba(255,115,0,0.6)]">
        Renew Membership
      </h1>
    
      <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl shadow-orange-500/20 w-full max-w-md">
        {/* Plan Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Choose a Plan</h2>
          <div className="flex gap-3">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`flex-1 py-2 rounded-lg font-semibold text-white transition-all ${
                  selectedPlan === plan.name
                    ? "bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_15px_rgba(255,165,0,0.6)]"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.name} <span className="ml-1 text-gray-300 text-sm">{plan.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-20 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(255,165,0,0.6)] hover:scale-[1.05] transition-all"
          >
            Renew Membership
          </button>
        </form>
      </div>

      {/* Success Overlay */}
      {success && (
        <>
          <Confetti width={confettiWidth} height={confettiHeight} recycle={false} numberOfPieces={200} />
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl shadow-orange-500/40 text-center max-w-sm">
              <h2 className="text-2xl font-bold text-orange-400 mb-3">Success!</h2>
              <p className="text-gray-300 mb-4">
                Your membership has been renewed for the {selectedPlan} plan.
              </p>
              <p className="text-gray-400 text-sm">Redirecting to your membership page...</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RenewMembership;
