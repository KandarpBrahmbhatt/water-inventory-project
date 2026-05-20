import Role from "../models/role.model.js"


// aa role create karva mate api banai 6e.

export const createRole = async(req,res)=>{
try {
    const {role} = req.body
    console.log(req.body)

    const existingRole = await Role.findOne({role})

    if (existingRole) {
        return res.status(400).json({message:"role already exist"})
    }
    const newRole = await Role.create({
        role
    })

    return res.status(200).json({message:"role create sucessfully",newRole})
} catch (error) {
    console.log("Create role error",error)
     return res.status(500).json({message:"role create error",error:error.message})
}
}