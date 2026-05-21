import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
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
    }
}, {
    timestamps: true
})

const Order = await mongoose.model("Order", orderSchema)

export default Order