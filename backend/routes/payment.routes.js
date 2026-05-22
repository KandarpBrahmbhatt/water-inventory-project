import express from 'express'

import { createStripeSession, downloadInvoice } from '../controller/payment.controller.js'

const paymentRouter = express.Router()

paymentRouter.post("/create-session",createStripeSession)
paymentRouter.get("/invoice/:id",downloadInvoice);
export default paymentRouter