import React from "react";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../auth/Auth";

const menuVariants: Variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
};

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMembershipClick = () => {
    const token = getToken();
    if (token) {
      navigate("/membership");
    } else {
      navigate("/member-login");
    }
    setMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    const offset = 80;
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const navItems = [
    { key: "membership", label: "Membership", action: "membership" },
    { key: "programs", label: "Programs", id: "programs" },
    { key: "why-us", label: "Why Us", id: "why-us" },
    { key: "plans", label: "Plans", id: "plans" },
    { key: "testimonials", label: "Testimonials", id: "testimonials" },
  ];

  return (
    <header className="relative w-full flex justify-between items-center py-5 px-6 md:px-16 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white z-30 overflow-hidden shadow-[0_2px_25px_rgba(255,90,0,0.15)]">
      {/* logo */}
      <motion.img
        src={Logo}
        alt="Logo"
        className="w-36 md:w-44 cursor-pointer transition-transform duration-300 hover:scale-105"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => navigate("/")}
      />

      {/* desktop nav */}
      <nav className="hidden md:flex items-center gap-8 font-medium tracking-wide">
        {navItems.map((item) => (
          <span
            key={item.key}
            onClick={() => {
              if (item.action === "membership") {
                handleMembershipClick();
              } else if (item.id) {
                scrollToSection(item.id);
              }
            }}
            className="relative cursor-pointer text-gray-200 hover:text-orange-400 transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-orange-400 to-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            {item.label}
          </span>
        ))}
      </nav>

      {/* mobile toggle */}
      <div
        className="flex md:hidden flex-col gap-[6px] cursor-pointer z-40"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block h-[2px] w-6 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}></span>
        <span className={`block h-[2px] w-6 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
        <span className={`block h-[2px] w-6 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
      </div>

      {/* mobile drawer */}
      <motion.div
        className="fixed top-0 right-0 h-screen w-[70%] bg-gradient-to-b from-[#0d0d0d]/95 to-[#1a1a1a]/95 flex flex-col items-center justify-center gap-8 text-lg font-medium shadow-[0_0_35px_rgba(255,90,0,0.3)] backdrop-blur-md md:hidden"
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      >
        {navItems.map((item) => (
          <span
            key={item.key}
            className="text-gray-200 hover:text-orange-400 transition-colors duration-300 cursor-pointer"
            onClick={() => {
              if (item.action === "membership") handleMembershipClick();
              else if (item.id) scrollToSection(item.id);
            }}
          >
            {item.label}
          </span>
        ))}

        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/sign-in");
          }}
          className="mt-2 px-4 py-2 rounded-md border border-orange-400 text-orange-400 hover:shadow-[0_0_20px_rgba(255,140,50,0.12)] transition"
        >
          Login
        </button>
      </motion.div>
    </header>
  );
};

export default Header;
