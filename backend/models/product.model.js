import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{    // Mineral Water
        type:String,
    },
    category:{    // bottled, jar, cold water
        type:String,
    },
    description:{
        type:String
    },
    isActive:{
        type:Boolean

    }
},{
    timestamps:true
})

const Product = mongoose.model("Product",productSchema)

export default Product