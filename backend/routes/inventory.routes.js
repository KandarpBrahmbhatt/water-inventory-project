import express from 'express'
import { createInventory, deletedInvetory, getAllInventroy, singalInventory, upldateInventory } from '../controller/inventroy.controller.js'
import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'

const InventoryRouter = express.Router()

InventoryRouter.post("/create", isAuth, authorizeRole("Admin","Manager"),createInventory)
InventoryRouter.get("/get", getAllInventroy)
InventoryRouter.get("/:id",singalInventory)
InventoryRouter.put("/:id",upldateInventory)
InventoryRouter.delete("/:id",deletedInvetory)
export default InventoryRouter