import React, { useRef } from 'react'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

const Join: React.FC = () => {
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    emailjs
      .sendForm('service_d5mzw5p', 'template_sbp6j5g', form.current!, 'I4VcdbdLP-Xy9lHDc')
      .then(
        (result: EmailJSResponseStatus) => {
          console.log('Email sent:', result.text)
        },
        (error: EmailJSResponseStatus) => {
          console.error('Error:', error.text)
        }
      )
  }

  return (
    <section
      id="join-us"
      className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20 gap-12 text-white 
                 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] shadow-[0_0_25px_rgba(255,90,0,0.15)] overflow-hidden"
    >
      {/* Soft Glow Backgrounds (for theme consistency) */}
      <div className="absolute bottom-0 left-[15%] w-[22rem] h-[12rem] blur-[180px] bg-orange-500/40 -z-10"></div>
      <div className="absolute top-0 right-[15%] w-[22rem] h-[12rem] blur-[180px] bg-red-500/40 -z-10"></div>

      {/* LEFT SECTION */}
      <div className="relative text-center md:text-left text-3xl md:text-[3rem] font-bold uppercase flex flex-col gap-4 z-10">
        <hr className="absolute md:w-[10rem] w-[8rem] border-2 border-orange-500 rounded-lg -top-4 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0" />
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-100">
            READY TO
          </span>
          <span className="text-orange-500">LEVEL UP</span>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <span>YOUR BODY</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-100">
            WITH US?
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="z-10">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col md:flex-row gap-4 md:gap-6 bg-[#2b2b2b]/70 backdrop-blur-md border border-gray-700 
                     px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(255,90,0,0.2)] transition-all duration-300"
        >
          <input
            type="email"
            name="name"
            required
            placeholder="Enter your email address"
            className="bg-transparent border-b border-gray-500 focus:border-orange-500 outline-none text-gray-200 
                       placeholder-gray-400 px-2 py-2 w-full md:w-72 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-[#fa5042] text-white px-6 py-2 rounded-lg font-semibold 
                       shadow-md hover:shadow-[0_0_20px_rgba(250,80,66,0.5)] hover:scale-105 transition-all duration-300"
          >
            Join Now
          </button>
        </form>
      </div>
    </section>
  )
}

export default Join;
