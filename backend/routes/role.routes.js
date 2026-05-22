import express from 'express'

import { createRole } from '../controller/role.controller.js'
import { authorizeRole, isAuth } from '../middaleware/auth.middaleware.js'

const roleRouter = express.Router()

roleRouter.post("/create",isAuth,authorizeRole("Admin"),createRole)

export default roleRouter