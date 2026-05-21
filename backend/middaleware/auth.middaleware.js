// import jwt from 'jsonwebtoken'

// export const isAuth = async (req, res, next) => {
//     try {
//         const token = req.cookies.AccessToken
    
//         if (!token) {
//             return res.status(400).json({ message: "Not authenticated" })
//         }
//         const decoded = await jwt.verify(token, process.env.JWT_SECRET)
//         req.user = decoded
//         next()
//     } catch (error) {
//         console.log("invalid token error", error)
//     }
// }

// //role base authentication  check

// export const authorizeRole = (...roles)=>{
//     return(req,res,next)=>{
//         if (!req.user) {
//             return res.status(401).json({message:"unauthorized"})
//         }

//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({message:"Forbiddn you are not admin Access denied"})
//         }
//         next()
//     }
// }



import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuth = async (req,res,next) => {
    try {const token =req.cookies.AccessToken;

        if (!token) {
            return res.status(401).json({message:"Not authenticated"});
        }

        // verify token
        const decoded =jwt.verify(token,process.env.JWT_SECRET);

        // fetch user + role
        const user =await User.findById(decoded.userId).populate("role");

        if (!user) {
            return res.status(404).json({message:"User not found"});
        }

        req.user = user;

        next();

    } catch (error) {

        console.log("Invalid token error",error);

        return res.status(401).json({message:"Invalid token"});
    }
};


export const authorizeRole =(...roles) => {
    return (req,res,next) => {

        if (!req.user) {
            return res.status(401).json({message:"Unauthorized"});
        }

        // get role name
        const userRole =req.user.role.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({message:"Forbiddn you are not admin Access denied"});
        }

        next();
    };
};