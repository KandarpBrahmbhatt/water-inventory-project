import mongoose from 'mongoose'

const waterProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        enum: [
            "1L Bottle",
            "20L Jar",
            "Cold Water",
            "Mineral Water",
        ],
        required: true
    },
    price: {
        type: String,
        required: true,
        min: 0,
    },

    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },

    description: {
        type: String,
        default: "",
    },

    // status: {
    //     type: Boolean,
    //     default: true,
    // },
      status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
}, {
    timestamps: true
})

const WaterProduct = mongoose.model("WaterProduct", waterProductSchema)

export default WaterProduct