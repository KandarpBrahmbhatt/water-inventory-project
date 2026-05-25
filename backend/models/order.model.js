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
        type: Number,
    },
    price: {
        type: Number,
    },
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: [
            "pending",
            "completed",
            "packed",
            "out_for_delivery",
            "delivered",
            "cancelled"
        ],
        default: "pending"
    },
    cancelReason: {
        type: String,
        default: null
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
        enum: ["pending", "paid", "failed","refuned"],
        default: "pending"
    },

    // pdf invoice pdf gereation mate
    invoicePdf: {
        type: String
    },


    qrCode: {
      type: String,
      default: "",
    },

    deliveryOTP: String,
}, {
    timestamps: true
})

const Order = await mongoose.model("Order", orderSchema)

export default Order