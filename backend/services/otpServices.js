// Create new file for OTP generation and email sending
import nodemailer from 'nodemailer'

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const sendOTPEmail = async (email, otp) => {
    // Configure nodemailer and send OTP email
}

export { generateOTP, sendOTPEmail }