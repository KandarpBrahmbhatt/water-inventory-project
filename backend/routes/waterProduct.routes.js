import express from 'express'
import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'
import { createWaterProduct, getAllWaterProduct, getSingleProduct, updateWaterProduct } from '../controller/waterProduct.controller.js'

const WaterProductRouter = express.Router()

WaterProductRouter.post("/create", isAuth, authorizeRole("Admin","Manager"),createWaterProduct)
WaterProductRouter.get("/get", isAuth,getAllWaterProduct)
WaterProductRouter.get("/:id",isAuth,getSingleProduct)
WaterProductRouter.put("/:id",isAuth,updateWaterProduct)
// WaterProductRouter.delete("/:id",dele)

export default WaterProductRouter