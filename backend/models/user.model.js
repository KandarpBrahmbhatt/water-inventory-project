import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    providers: {
      google: {
        id: {
          type: String,
          index: true // fast lookup for Google login
        },
        email: String
      },
      facebook: {
        id: {
          type: String,
          index: true // fast lookup for Facebook login
        },
        email: String
      }
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        index: true // useful for admin/user filtering
    },
    resetOtp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    isOtpVerifed: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User
