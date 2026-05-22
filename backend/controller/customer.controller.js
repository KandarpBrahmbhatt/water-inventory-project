import Customer from "../models/customer.model.js"
import bcrypt from "bcryptjs"
// import User from "../models/user.model.js"
export const createCustomer = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All field are required" })
        }

        const existingcustomer = await Customer.findOne({ email })

        if (existingcustomer) {
            return res.status(400).json({ message: "email already existing" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const customer = await Customer.create({
            name,
            email,
            password: hashpassword
        })

        return res.status(200).json({ message: "created customer sucessfully", customer })
    } catch (error) {
        console.log("create customer error", error)
        return res.status(500).json({ message: "created customer error" })
    }
}

export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.find()

        return res.status(200).json({ message: "customer created sucessfully", customer })
    } catch (error) {
        console.log("customer create error", error)
        return res.status(500).json({ message: "getting customer error", error })
    }
}


