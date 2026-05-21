import express from 'express'
import { createCustomer } from '../controller/customer.controller.js'
import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'

const customerRouter = express.Router()

customerRouter.post("/create",isAuth,authorizeRole("Admin","Manager"),createCustomer)

export default customerRouter