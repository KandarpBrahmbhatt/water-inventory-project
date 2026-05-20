import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb is connected")
    } catch (error) {
        console.log("mongodb connection error")
    }
}

export default connectDb