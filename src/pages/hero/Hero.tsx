import Header from "../header/Header"
import hero_image_back from '../../assets/hero_image_back.png'
import Heart from '../../assets/heart.png'
import Calories from '../../assets/calories.png'
import NumberCounter from 'number-counter'
import { motion, type Transition } from 'framer-motion'
import hero_image from "../../assets/hero_image.png"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"



const Hero: React.FC = () => {
    const navigate = useNavigate();
  const transition: Transition = { type: "spring", duration: 3 }
  const isMobile: boolean = window.innerWidth <= 768
  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row justify-center text-white overflow-hidden
                 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]
                 shadow-[0_0_25px_rgba(255,90,0,0.15)]"
    >
      {/* Glow Background Effects */}
      <div className="absolute left-[5%] top-[10%] w-[25rem] h-[25rem] bg-orange-500/40 blur-[180px] rounded-full -z-10"></div>
      <div className="absolute right-[5%] bottom-[10%] w-[25rem] h-[25rem] bg-red-500/40 blur-[180px] rounded-full -z-10"></div>

      {/* LEFT SECTION */}
      <div className="flex flex-col gap-8 p-8 pt-6 flex-[3] z-10 items-center md:items-start">
        <Header />

        {/* Tagline Banner */}
        <div className="relative flex items-center justify-start px-5 py-3 text-sm uppercase
                        bg-[#2b2b2b]/60 rounded-[4rem] mt-0 md:mt-16
                        shadow-[0_0_15px_rgba(255,90,0,0.15)] overflow-hidden">
          <motion.div
            initial={{ left: isMobile ? "165px" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
            className="absolute left-2 w-[5.4rem] h-[80%] bg-gradient-to-r from-orange-500 to-red-500 
                       rounded-[3rem] z-[1]"
          />
          <span className="font-semibold tracking-wide z-[2]">
            The best fitness club in town
          </span>
        </div>

        {/* HERO TEXT */}
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start
                        font-bold uppercase text-2xl md:text-[4.5rem]">
          <div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500
                             drop-shadow-[0_0_10px_rgba(255,90,0,0.3)]">
              Shape{" "}
            </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal Body</span>
          </div>
          <p className="w-[80%] md:w-[80%] mx-auto md:mx-0 text-sm md:text-base font-light tracking-wider
                        text-gray-300 bg-[#2b2b2b]/40 p-4 rounded-lg
                        shadow-[0_0_15px_rgba(255,90,0,0.1)] normal-case">
            In here we will help you to shape and build your ideal body and live up your life to the fullest.
          </p>
        </div>

        {/* Stats Figures */}
        <div className="flex gap-8 justify-center md:justify-start">
          {[
            { end: 140, start: 69, label: "expert coaches" },
            { end: 978, start: 779, label: "members" },
            { end: 50, start: 10, label: "fitness programs" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <span className="text-2xl md:text-4xl text-orange-400
                               drop-shadow-[0_0_8px_rgba(255,90,0,0.3)]">
                <NumberCounter end={item.end} start={item.start} delay={3} preFix="+" />
              </span>
              <span className="uppercase text-gray-400 text-sm md:text-base">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center md:justify-start font-normal">
            <button
        onClick={() => navigate("/classes")} // <-- navigate to Classes page
        className="w-32 py-2 text-white rounded
                   bg-gradient-to-r from-orange-500 to-red-500
                   shadow-[0_0_15px_rgba(255,90,0,0.25)]
                   hover:brightness-110 transition-all"
      >
        Get Started
      </button>
<button className="w-32 py-2 text-white rounded border-2 border-orange-500
  shadow-[0_0_10px_rgba(255,90,0,0.25)]
  hover:bg-orange-500 hover:text-white transition-all">
  <Link to="/learn-more" className="block w-full h-full text-center p-2">
    Learn More
  </Link>
</button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 relative mt-10 md:mt-0">
          <div className="absolute right-12 top-8 flex items-center gap-3">
    <SignedOut>
      <a
        href="/sign-in"
        className="px-4 py-2 text-white rounded
                   bg-gradient-to-r from-orange-500 to-red-500
                   shadow-[0_0_15px_rgba(255,90,0,0.25)]
                   hover:brightness-110 transition-all"
      >
        Login
      </a>
    </SignedOut>

    <SignedIn>
      <UserButton appearance={{ 
        elements: { 
          avatarBox: "w-10 h-10" 
        } 
      }} />
    </SignedIn>
  </div>

       
        <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          transition={transition}
          className="absolute top-28 right-16 flex flex-col gap-3 p-4 rounded-md items-start
                     bg-[#2b2b2b]/60 shadow-[0_0_20px_rgba(255,90,0,0.15)]"
        >
          <img src={Heart} alt="heart icon" className="w-8" />
          <span className="text-gray-400 text-sm">Heart Rate</span>
          <span className="text-orange-400 text-2xl">116 bpm</span>
        </motion.div>

       
        <img
          src={hero_image}
          alt="hero"
          className="absolute top-28 right-32 w-[23rem]
                     drop-shadow-[0_0_20px_rgba(255,90,0,0.25)]"
        />

        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          src={hero_image_back}
          alt="hero background"
          className="absolute top-16 right-[20rem] w-[15rem] opacity-80 -z-10"
        />

        <motion.div
          initial={{ right: "37rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          className="absolute top-[32rem] right-[28rem] flex gap-6 p-4 rounded-md w-fit
                     bg-[#2b2b2b]/60 shadow-[0_0_20px_rgba(255,90,0,0.15)]"
        >
          <img src={Calories} alt="calories icon" className="w-12 md:w-10" />
          <div className="flex flex-col justify-between">
            <span className="text-gray-400 text-sm">Calories Burned</span>
            <span className="text-orange-400 text-lg md:text-xl">220 kcal</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
