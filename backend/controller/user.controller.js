import roles from "../models/role.model.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'


// admin sivay na normal user create karava mate api create kari 6e.

export const createUser = async (req, res) => {
    try {
        const { name, email, password,role } = req.body
        console.log(req.body)

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ messsage: "user already exit" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        //Find role document
      const roleData = await roles.findOne({ role });

      if (!roleData) {
         return res.status(404).json({
            message: "Role not found"
         });
      }

        const user = await User.create({
            name,
            email,
            password: hashpassword,
            role: roleData._id
        })

        return res.status(200).json({ message: "user created sucessfully", user })
    } catch (error) {
        console.log("created user error", error)
    }
}