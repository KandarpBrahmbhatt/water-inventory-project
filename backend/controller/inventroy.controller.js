import Inventory from "../models/inventory.model.js"


export const createInventory = async (req, res) => {
    try {
        // const { productName, sku, category, price, quantity, supplier, lowStockThreshold } = req.body
        const { productName, rawWaterQuantity, emptyBottleStock, filledBottleStock, capStock, labelStock, lowStockAlert } = req.body
        console.log(req.body)

        //default 0 value hoy to javascript 0 meaning false thase aetale aavadi coniditon pply kari hati.

        // if (
        //     !productName ||
        //     rawWaterQuantity === undefined ||
        //     emptyBottleStock === undefined ||
        //     filledBottleStock === undefined ||
        //     capStock === undefined ||
        //     labelStock === undefined ||
        //     lowStockAlert === undefined
        // ) {
        //     return res.status(400).json({
        //         message:
        //             "All fields are required"
        //     });
        // }
        const existingProduct = await Inventory.findOne({ productName })

        if (existingProduct) {
            return res.status(400).json({ message: "product alredy exist" })
        }

        const newInventory = await Inventory.create({
            productName,
            rawWaterQuantity,
            emptyBottleStock,
            filledBottleStock,
            capStock,
            labelStock,
            lowStockAlert
        })

        return res.status(200).json({ message: "create inventory sucessfully", newInventory })

    } catch (error) {
        console.log("createInventory error", error)
        return res.status(500).json({ message: "create inventory error", error: error.message })
    }
}


export const getAllInventroy = async (req, res) => {
    try {
        const newInventory = await Inventory.find()

        let query = {}

        if (!newInventory) {
            return res.status(400).json({ message: "Inventroy not found" })
        }

        const totalCount = await Inventory.countDocuments(query); // total count show karvama te lakhelu 6e.

        return res.status(200).json({ message: "Getting Inventory successfully", newInventory, totalCount })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Getting Inventory error" })
    }
}

export const singalInventory = async (req, res) => {
    try {
        const { id } = req.params
        const newInventroy = await Inventory.findById(id)

        if (!newInventroy) {
            return res.status(400).json({ message: "inventory id not found" })
        }

        return res.status(200).json({ message: "singalInventroy getting sucessfully", newInventroy })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "singalInventroy getting error", error })
    }
}


export const upldateInventory = async (req, res) => {
    try {
        const newUpdatedInverntory = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body
        )

        if (!newUpdatedInverntory) {
            return res.status(400).json({ message: "newUpdatedInventroy not found" })
        }

        return res.status(200).json({ message: "Updated Inventory sucessfully", newUpdatedInverntory })
    } catch (error) {
        console.log("updateInventory error", error)
        return res.status(500).json({ message: "Updated Inventory error", error })
    }
}

export const deletedInvetory = async (req, res) => {
    try {
        const deletedInventroy = await Inventory.findByIdAndDelete(
            req.params.id,
            req.body
        )
        return res.status(200).json({ message: "deletedInventory sucessfully", deletedInventroy })

    } catch (error) {
        console.log("deletedInventroy error", error)
    }
}