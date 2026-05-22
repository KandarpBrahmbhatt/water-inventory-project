import express from "express"
import { cancelOrder, createOrder, getOrders } from "../controller/order.controller.js"
import { isAuth } from "../middaleware/auth.middaleware.js"

const orderRouter = express.Router()

orderRouter.post("/create",isAuth,createOrder)
orderRouter.get("/get",isAuth,getOrders)
orderRouter.put("/cancel/:id",isAuth,cancelOrder)

export default orderRouter