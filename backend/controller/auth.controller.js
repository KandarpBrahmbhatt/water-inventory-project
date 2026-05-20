import sendMail from "../config/mail.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { genToken } from "../config/token.js";

export const sentOtpSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All field are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser && existingUser.isOtpVerifed) {
            return res.status(400).json({ message: "email aready exit" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const hashpassword = await bcrypt.hash(password, 10)

        //if user alredat exist but not verifed

        let user = existingUser
        if (user) {
            user.name = name;
            user.password = hashpassword,
                user.resetOtp = otp,
                user.otpExpires = Date.now() + 5 * 60 * 1000,//min expire
                user.isOtpVerifed = false
        } else {
            // create new user tem
            user = await User.create({
                name,
                email,
                resetOtp: otp,
                password: hashpassword,
                otpExpires: Date.now() + 5 * 60 * 1000,
                isOtpVerifed: false
            })
        }

        const {AccessToken,RefreshToken} =genToken(user) 

        await user.save()

        await sendMail(email, otp)
        return res.status(200).json({ message: "otp send succesfully in email", otp,AccessToken,RefreshToken })
    } catch (error) {
        console.log(`signup error ${error}`)
        return res.status(500).json({ message: "signup otp send error" })
    }
}


export const verifiedOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log(req.body);

        const user = await User.findOne({ email });

        // check user exists
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        // check otp exists
        if (!user.resetOtp) {
            return res.status(400).json({
                message: "OTP not found. Please request a new OTP",
            });
        }

        // check otp match
        if (user.resetOtp.toString() !== otp.toString()) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        // check otp expiry
        if (!user.otpExpires || user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP expired",
            });
        }

        // verify user
        user.isOtpVerifed = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();

        // generate token
        const { AccessToken, RefreshToken } = await genToken(user);

        res.cookie("AccessToken",AccessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:16*60*1000 //15 min
        })

        res.cookie("RefreshToken",RefreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
           maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        return res.status(200).json({
            message: "OTP verification and login successful",
            AccessToken,
            RefreshToken,
            user,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "OTP verification error",
        });
    }
};