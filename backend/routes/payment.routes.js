import express from 'express'

import { createStripeSession } from '../controller/payment.controller.js'

const paymentRouter = express.Router()

paymentRouter.post("/create-session",createStripeSession)

export default paymentRouter