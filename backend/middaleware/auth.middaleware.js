import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    let token = req.cookies.token

    if (!token) {
        return res.status(400).json({ message: "Not authenticated" })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log("invalid token error", error)
    }
}

//role base authentication  check

export const authorizeRole = (...roles)=>{
    return(req,res,next)=>{
        if (!req.user) {
            return res.status(401).json({message:"unauthorized"})
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message:"Forbiddn you are not admin"})
        }
        next()
    }
}

