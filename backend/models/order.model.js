import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    productName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WaterProduct"
    },
    Qty: {
        type: String,
    },
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WaterProduct",
    },
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now //  correct
    },
    expiresAt: {
        type: Date,
        index: { expires: 3600 } //  TTL INDEX (auto delete after 1 hour)
    },
    paymentIntentId: String,
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    // pdf invoice pdf gereation mate
    invoicePdf: {
        type: String
    }
}, {
    timestamps: true
})

const Order = await mongoose.model("Order", orderSchema)

export default Order