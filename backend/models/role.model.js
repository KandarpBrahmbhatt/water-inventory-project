import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    role: {
        type: String
    }
})

const roles = mongoose.model("roles", roleSchema)

export default roles