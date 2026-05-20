import express from 'express'

import { createRole } from '../controller/role.controller.js'

const roleRouter = express.Router()

roleRouter.post("/create",createRole)

export default roleRouter