import express from "express"
import { createOrder, getOrders } from "../controller/order.controller.js"

const orderRouter = express.Router()

orderRouter.post("/create",createOrder)
orderRouter.get("/get",getOrders)
export default orderRouter