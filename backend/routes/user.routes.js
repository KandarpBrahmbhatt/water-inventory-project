import express from 'express'
import { createUser } from '../controller/user.controller.js'
import { authorizeRole } from '../middaleware/auth.middaleware.js'


const userRouter = express.Router()

userRouter.post("/create",authorizeRole("Admin"),createUser)

export default userRouter