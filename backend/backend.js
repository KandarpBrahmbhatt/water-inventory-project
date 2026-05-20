import express from 'express'
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import dotenv from 'dotenv'
import roleRouter from './routes/role.routes.js'
import userRouter from './routes/user.routes.js'
dotenv.config()

const app =express()

app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/role",roleRouter)
app.use("/api/user",userRouter)
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is started ${port}`)
    connectDb()
})