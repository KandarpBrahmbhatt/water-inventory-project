// import express from 'express'
// import { createUser, login } from '../controller/user.controller.js'
// import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'


// const userRouter = express.Router()

// userRouter.post("/create",isAuth,authorizeRole("Admin"),createUser)
// userRouter.post("/login",isAuth,login)
// export default userRouter


import express from "express"
import {
  createUser,
  login
} from "../controller/user.controller.js"
import {
  authorizeRole,
  isAuth
} from "../middaleware/auth.middaleware.js"

const userRouter = express.Router()

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create new user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kandarp
 *               email:
 *                 type: string
 *                 example: kandarp@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: Staff
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
userRouter.post(
  "/create",
  isAuth,
  authorizeRole("Admin"),
  createUser
)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: kandarp@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
userRouter.post("/login", login)

export default userRouter