import { genToken } from "../config/token.js"
import roles from "../models/role.model.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'


// admin sivay na normal user create karava mate api create kari 6e.

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        console.log(req.body)

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ messsage: "user already exit" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        //Find role document
        const roleData = await roles.findOne({ role });

        if (!roleData) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        const user = await User.create({
            name,
            email,
            password: hashpassword,
            role: roleData._id
        })
        const { AccessToken, RefreshToken } = genToken(user)

        res.cookie("AccessToken", AccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 16 * 60 * 1000 //15 min
        })

        res.cookie("RefreshToken", RefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        return res.status(200).json({ message: "user created sucessfully", user, AccessToken, RefreshToken })
    } catch (error) {
        console.log("created user error", error)
    }
}


// login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)

        if (!email || !password) {
            return res.status(400).json({ message: "all field are required" })
        }

        const user = await User.findOne({ email }).populate("role")

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const isMatch =await bcrypt.compare(password,user.password)

        if (!isMatch) {return res.status(400).json({message:"Invalid credentials"})}

        const { AccessToken, RefreshToken } = genToken(user)

        res.cookie("AccessToken", AccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 16 * 60 * 1000 //15 min
        })

        res.cookie("RefreshToken", RefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        return res.status(200).json({ message: "user Login successfully", user, AccessToken, RefreshToken })
    } catch (error) {
        console.log("login error", error)
        return res.status(500).json({ message: "user Login error", error })
    }
}