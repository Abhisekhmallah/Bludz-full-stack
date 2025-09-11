import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { SpinningText } from './magicui/spinning-text'
import { TextReveal } from "@/components/magicui/text-reveal"; // 👈 Import TextReveal

const Banner = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* ------- Banner Section ------- */}
      <div className="relative flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
        {/* ------- Spinning Text (Bigger & Slightly More Left) ------- */}
        <div className="absolute top-3 -left-10 w-32 h-32 md:w-40 md:h-40">
          <SpinningText>Bludz • Join Bludz • grow more •</SpinningText>
        </div>

        {/* ------- Left Side ------- */}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Book Appointment</p>
            <p className="mt-4">With 10+ Trusted Doctors</p>
          </div>

          <button
            onClick={() => {
              navigate('/login')
              scrollTo(0, 0)
            }}
            className="bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          >
            Create account
          </button>
        </div>

        {/* ------- Right Side ------- */}
        <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
          <img
            className="w-full absolute bottom-0 right-0 max-w-md"
            src={assets.doc9}
            alt=""
          />
        </div>
      </div>

      {/* ------- Text Reveal Below Banner ------- */}
      <div className="px-6 md:px-10 lg:px-20 mt-4">
        <TextReveal className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
          Experience a faster way to book lab tests and doctor appointments.
        </TextReveal>
      </div>
    </>
  )
}

export default Banner
