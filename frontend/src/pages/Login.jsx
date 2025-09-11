"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [state, setState] = useState("Sign Up")
  const [showOTP, setShowOTP] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentType, setCurrentType] = useState("")
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/send-otp", {
          name,
          email,
          password,
          type: "register",
        })

        if (data.success) {
          toast.success(data.message)
          setCurrentEmail(data.email)
          setCurrentType("register")
          setShowOTP(true)
          setOtpSent(true)
          setTimer(60)
          setCanResend(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/send-otp", {
          email,
          password,
          type: "login",
        })

        if (data.success) {
          toast.success(data.message)
          setCurrentEmail(data.email)
          setCurrentType("login")
          setShowOTP(true)
          setOtpSent(true)
          setTimer(60)
          setCanResend(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerification = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const { data } = await axios.post(backendUrl + "/api/user/verify-otp", {
        email: currentEmail,
        otp,
        type: currentType,
      })

      if (data.success) {
        toast.success(data.message)
        localStorage.setItem("token", data.token)
        setToken(data.token)
        setShowOTP(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/resend-otp", {
        email: currentEmail,
      })

      if (data.success) {
        toast.success(data.message)
        setTimer(60)
        setCanResend(false)
        setOtp("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP")
    }
  }

  const handleBackToLogin = () => {
    setShowOTP(false)
    setOtpSent(false)
    setCurrentEmail("")
    setCurrentType("")
    setOtp("")
    setTimer(60)
    setCanResend(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (timer > 0 && showOTP) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0) {
      setCanResend(true)
    }
  }, [timer, showOTP])

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  // OTP Verification Screen
  if (showOTP) {
    return (
      <form onSubmit={handleOTPVerification} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-4 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
            <p className="text-gray-600 mb-2">We've sent a 6-digit verification code to</p>
            <p className="font-medium text-primary mb-6">{currentEmail}</p>
          </div>

          <div className="w-full">
            <p className="mb-2">Enter OTP</p>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="border border-[#DADADA] rounded w-full p-3 mt-1 text-center text-lg tracking-widest"
              type="text"
              placeholder="000000"
              maxLength="6"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={otp.length !== 6 || isLoading}
            className="bg-primary text-white w-full py-3 rounded-md text-base font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center">
            <p className="text-gray-600 mb-2">Didn't receive the code?</p>
            {canResend ? (
              <button type="button" onClick={handleResendOTP} className="text-primary font-medium hover:underline">
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-500">Resend in {formatTime(timer)}</p>
            )}
          </div>

          <button type="button" onClick={handleBackToLogin} className="text-gray-600 hover:text-gray-800 font-medium">
            ← Back to {currentType === "register" ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    )
  }

  // Original Login/Signup Form
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment</p>

        {state === "Sign Up" && (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
              disabled={isLoading}
            />
          </div>
        )}

        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            disabled={isLoading}
          />
        </div>

        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white w-full py-2 my-2 rounded-md text-base disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {isLoading ? "Sending OTP..." : state === "Sign Up" ? "Send OTP" : "Send Login OTP"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?
            <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer ml-1">
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer ml-1">
              Click here
            </span>
          </p>
        )}

        <div className="w-full mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 font-medium mb-1">📧 Email Verification Required</p>
          <p className="text-xs text-blue-600">
            We'll send a 6-digit OTP to your email for verification. Please check your inbox and spam folder.
          </p>
        </div>
      </div>
    </form>
  )
}

export default Login
