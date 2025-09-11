"use client"

import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = "₹"
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  const [userData, setUserData] = useState(false)

  // Getting Doctors using API
  const getDoctosData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list")
      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } })
      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
        // If token is invalid, clear it
        if (data.message.includes("token") || data.message.includes("authorized")) {
          localStorage.removeItem("token")
          setToken("")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      // If there's an authentication error, clear the token
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        setToken("")
      }
    }
  }

  // OTP-related functions
  const sendOTP = async (email, name, password, type) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/send-otp", {
        email,
        name,
        password,
        type,
      })
      return data
    } catch (error) {
      throw error
    }
  }

  const verifyOTP = async (email, otp, type) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/verify-otp", {
        email,
        otp,
        type,
      })
      return data
    } catch (error) {
      throw error
    }
  }

  const resendOTP = async (email) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/resend-otp", {
        email,
      })
      return data
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getDoctosData()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token])

  const value = {
    doctors,
    getDoctosData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    sendOTP,
    verifyOTP,
    resendOTP,
  }

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

export default AppContextProvider
