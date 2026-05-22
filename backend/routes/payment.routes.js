import express from 'express'

import { createStripeSession, downloadInvoice } from '../controller/payment.controller.js'
import { isAuth } from '../middaleware/auth.middaleware.js';

const paymentRouter = express.Router()

paymentRouter.post("/create-session",isAuth,createStripeSession)
paymentRouter.get("/invoice/:id",isAuth,downloadInvoice);
export default paymentRouter