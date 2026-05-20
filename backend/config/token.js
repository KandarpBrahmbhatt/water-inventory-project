import jwt from 'jsonwebtoken'

export const genToken = async(user)=>{
    try {
        const AccessToken = await jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET)
        const RefreshToken = await jwt.sign({userId:user._id,role:user.role},process.env.JWT_REFRESH_SECRET)

        return {AccessToken,RefreshToken}
    } catch (error) {
        console.log("genToken error",error)
    }
}

