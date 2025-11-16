import React from "react"
import Hero from "../hero/Hero"
import Join from "../join/Join"
import Reasons from "../reasons/Reasons"
import Programs from "../programs/Programs"
import Testimonials from "../testimonials/Testimonials"
import Footer from "../footer/Footer"
import Plans from "../plans/Plans"

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Programs />
      <Reasons />
      <Plans />
      <Testimonials />
      <Join />
      <Footer />
    </>
  )
}

export default Home
