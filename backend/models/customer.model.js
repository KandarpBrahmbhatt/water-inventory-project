import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{
    timestamps:true
})


const Customer = mongoose.model("Customer",customerSchema)

export default Customer