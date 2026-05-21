// import mongoose from 'mongoose'

// const roleSchema = new mongoose.Schema({
//     role: {
//         type: String
//     }
// })

// const roles = mongoose.model("roles", roleSchema)

// export default roles

import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            unique: true,
            enum: [
                "Admin",
                "Manager",
                "Worker",
                "Delivery Person"
            ]
        }
    },
    {
        timestamps: true
    }
);

const roles = mongoose.model(
    "roles",
    roleSchema
);

export default roles;