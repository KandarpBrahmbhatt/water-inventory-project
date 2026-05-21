import WaterProduct from "../models/waterProduct.model.js"


export const createWaterProduct = async (req, res) => {
  try {
    const { productName, productType, price, stockQuantity, description, status } = req.body
    console.log(req.body)

    if (!productName || !productType || !price || !stockQuantity || !description) {
      return res.status(400).json({ message: "All field are required" })
    }

    const existingwaterProduct = await WaterProduct.findOne({ productName })

    if (existingwaterProduct) {
      return res.status(400).json({ message: "waterProduct already exist" })
    }

    const waterproduct = await WaterProduct.create({
      productName,
      productType,
      price,
      stockQuantity,
      description,
      status
    })

    return res.status(200).json({ message: "create waterproduct sucessfully", waterproduct })
  } catch (error) {
    console.log("createWaterProduct error", error)
    return res.status(500).json({ message: "create waterproduct error" })
  }
}

export const getAllWaterProduct = async (req, res) => {
  try {
    const waterProduct = await WaterProduct.find()

    return res.status(200).json({ message: "Water product getting sucessfully", waterProduct, total: waterProduct.length, })
  } catch (error) {
    console.log("getWaterProduct error", error)
    return res.status(500).json({ message: "Water product getting error", error: error.message })
  }
}

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params

    const waterProduct = await WaterProduct.findById(id)

    if (!waterProduct) {
      return res.status(400).json({ message: "waterprduct not found" })
    }

    return res.status(200).json({ message: "getting singeleProudct sucessfuly", waterProduct })
  } catch (error) {
    console.log("getSingleProduct error", error)
  }
}

export const updateWaterProduct = (req, res) => {
  try {
    const { id } = req.params

    const updatewater = WaterProduct.findById(id, req.body)

    if (!updatewater) {
      return res.status(400).json({ message: "Update water product error" })
    }

    return res.status(200).json({ message: "updatedWaterProdcut sucessfully", updatewater })
  } catch (error) {
    console.log("updateWaterProduct error", error)
    return res.status(500).json({ message: "updatedWaterProdcut error" })
  }
}