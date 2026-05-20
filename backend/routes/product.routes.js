import express from 'express'

import { createRole } from '../controller/role.controller.js'

const roleRouter = express.Router()

roleRouter.post("/create",authorizeRole("Admin"),createRole)

export default roleRouter