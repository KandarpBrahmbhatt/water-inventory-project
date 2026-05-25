import express from 'express'
import { dashboard } from '../controller/aggregte.controoler.js'

const aggregateRouter = express.Router()

aggregateRouter.get("/dashboard",dashboard)

export default aggregateRouter