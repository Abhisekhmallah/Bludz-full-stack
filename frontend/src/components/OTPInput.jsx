"use client"

import { useState, useRef, useEffect } from "react"

const OTPInput = ({ length = 6, onComplete, disabled = false }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""))
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && e.target.previousSibling) {
        e.target.previousSibling.focus()
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))])
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length)
    const pasteArray = pasteData.split("").slice(0, length)

    setOtp([...pasteArray, ...new Array(length - pasteArray.length).fill("")])

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pasteArray.length, length - 1)
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus()
    }
  }

  useEffect(() => {
    const otpValue = otp.join("")
    if (otpValue.length === length) {
      onComplete(otpValue)
    }
  }, [otp, length, onComplete])

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          disabled={disabled}
          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-semibold focus:border-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      ))}
    </div>
  )
}

export default OTPInput
