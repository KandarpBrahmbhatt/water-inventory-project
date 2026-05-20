import express from 'express'
import { sentOtpSignup, verifiedOtp } from '../controller/auth.controller.js'
import { loginValidator, signupValidator } from '../validator/auth.validator.js'

const authRouter = express.Router()

authRouter.post("/signup",signupValidator,sentOtpSignup)
authRouter.get("/login",loginValidator,verifiedOtp)

export default authRouter