"use client"

import { useState, useEffect } from "react"
import OTPInput from "./OTPInput"
import { toast } from "react-toastify"

const OTPVerification = ({ email, type, onVerifySuccess, onBack, onResendOTP, isLoading = false }) => {
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleOTPComplete = (otpValue) => {
    setOtp(otpValue)
  }

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter complete OTP")
      return
    }
    onVerifySuccess(otp)
  }

  const handleResend = () => {
    if (canResend) {
      onResendOTP()
      setTimer(60)
      setCanResend(false)
      setOtp("")
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-4 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 mb-6">We've sent a 6-digit verification code to</p>
          <p className="font-medium text-primary mb-6">{email}</p>
        </div>

        <div className="w-full">
          <OTPInput length={6} onComplete={handleOTPComplete} disabled={isLoading} />
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="bg-primary text-white w-full py-3 rounded-md text-base font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center">
          <p className="text-gray-600 mb-2">Didn't receive the code?</p>
          {canResend ? (
            <button onClick={handleResend} className="text-primary font-medium hover:underline">
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">Resend in {formatTime(timer)}</p>
          )}
        </div>

        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 font-medium">
          ← Back to {type === "register" ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  )
}

export default OTPVerification
