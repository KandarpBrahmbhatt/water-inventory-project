// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()

// export const genToken = async(user)=>{
//     try {
//         const AccessToken = await jwt.sign({userId:user._id,role:user.role.role},process.env.JWT_SECRET, { expiresIn: "15m" })
//         const RefreshToken = await jwt.sign({userId:user._id},process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" })

//         return {AccessToken,RefreshToken}
//     } catch (error) {
//         console.log("genToken error",error)
//     }
// }

import jwt from "jsonwebtoken";

export const genToken = (user) => {

    const AccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const RefreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    return { AccessToken, RefreshToken };
};

