import express from 'express'
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import dotenv from 'dotenv'
import roleRouter from './routes/role.routes.js'
import userRouter from './routes/user.routes.js'
import InventoryRouter from './routes/inventory.routes.js'
import cookieParser from 'cookie-parser';
import WaterProductRouter from './routes/waterProduct.routes.js'
import customerRouter from './routes/customer.routes.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
import { stripeWebhook } from './controller/payment.controller.js'
dotenv.config()

const app =express()
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/role",roleRouter)
app.use("/api/user",userRouter)
app.use("/api/inventory",InventoryRouter)
app.use("/api/product",WaterProductRouter)
app.use("/api/customer",customerRouter)
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is started ${port}`)
    connectDb()
})