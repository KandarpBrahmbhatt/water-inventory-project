import express from 'express'
import { createInventory, deletedInvetory, getAllInventroy, singalInventory, upldateInventory } from '../controller/inventroy.controller.js'
import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'

const InventoryRouter = express.Router()

InventoryRouter.post("/create", isAuth, authorizeRole("Admin","Manager"),createInventory)
InventoryRouter.get("/get", isAuth,getAllInventroy)
InventoryRouter.get("/:id",isAuth,singalInventory)
InventoryRouter.put("/:id",isAuth, authorizeRole("Admin","Manager"),upldateInventory)
InventoryRouter.delete("/:id",isAuth,authorizeRole("Admin"),deletedInvetory)
export default InventoryRouter