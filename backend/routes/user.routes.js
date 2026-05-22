import express from 'express'
import { createUser, login } from '../controller/user.controller.js'
import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'


const userRouter = express.Router()

userRouter.post("/create",isAuth,authorizeRole("Admin"),createUser)
userRouter.post("/login",isAuth,login)
export default userRouter