import express from "express"
import { cancelOrder, createOrder, getOrders } from "../controller/order.controller.js"

const orderRouter = express.Router()

orderRouter.post("/create",createOrder)
orderRouter.get("/get",getOrders)
orderRouter.put("/cancel/:id",cancelOrder)

export default orderRouter