import Order from "../models/order.model.js"
import WaterProduct from "../models/waterProduct.model.js"

export const dashboard = async (req, res) => {
    try {

        const totalwaterProduct =await WaterProduct.countDocuments()

        const totalOrder =await Order.countDocuments()

        const revenue =await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$totalAmount"
                        }
                    }
                }
            ])

        const lowStock =await WaterProduct.aggregate([
                {
                    $match: {
                        quantity: { $lt: 10 }
                    }
                },
                {
                    $count: "lowStockProducts"
                }
            ])

        return res.status(200).json({
            message: "Dashboard fetched successfully",
            totalwaterProduct,
            totalOrder,
            totalRevenue:
                revenue[0]?.totalRevenue || 0,
            lowStockProducts:
                lowStock[0]?.lowStockProducts || 0
        })

    } catch (error) {
        console.log("dashboard error", error)

        return res.status(500).json({
            message: error.message
        })
    }
}