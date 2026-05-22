import Order from "../models/order.model.js"

export const createOrder = async (req, res) => {
  try {
    const { customerId, totalAmount, status ,productName,Qty,price} = req.body

    if (!customerId || !totalAmount) {
      return res.status(400).json({ messsage: "All field are required" })
    }

    const order = await Order.create({
      customerId,
      totalAmount,
      status: status || "pending",
      productName,
      Qty,
      price,
      expiresAt: new Date(Date.now() + 3600000)
    })

    return res.status(201).json({ message: "Order created succesfully", order })
  } catch (error) {
    console.log("create order error", error)
    return res.status(500).json({ message: "Order created error", error: error.messsage })
  }
}

export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    console.log(req.query)
    const orders = await Order.find({ status });

    res.json({
      success: true,
      data: orders
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};