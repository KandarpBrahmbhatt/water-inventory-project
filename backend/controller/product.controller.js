import Product from "../models/product.model"

export const createProduct = async(req,res)=>{
    try {
        const {name,category,description} = req.body
        console.log(req.body)

        const newProduct = await Product.create({
            name,description,category
        })

        return res.status(200).json({message:"created Product sucessfully",newProduct})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"created Product error"})
    }
}

export const getProduct = async(req,res)=>{
  try {
      const product = await Product.find()

    return res.status(200).json({message:"gettingProduct sccessfully",product})
  } catch (error) {
    return res.status(500).json({message:"geting product error"})
  }
}