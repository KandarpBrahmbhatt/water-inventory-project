import stripe from "../config/stripe.js"
// import Inventory from "../models/inventory.model.js"
import Order from "../models/order.model.js"
import WaterProduct from "../models/waterProduct.model.js"
import QRCode from "qrcode";

export const createOrder = async (req, res) => {
  try {
    const { customerId, totalAmount, status, productName, Qty, price } = req.body
    console.log(req.body)
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


    // Generate QR Data
    const qrData = JSON.stringify({
      orderId: order._id,
    })

    // Generate QR Base64
    const qrImage =
      await QRCode.toDataURL(qrData);

    order.qrCode = qrImage;

    await order.save();


    return res.status(201).json({ message: "Order created succesfully", order })
  } catch (error) {
    console.log("create order error", error)
    return res.status(500).json({ message: "Order created error", error: error.messsage })
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(400).json({ message: "Order not found" })
    }

    // if(order.status == 'cancelled'){
    //   return res.status(400).json({message:"Order already calcelled"})
    // }

    // if (order.status = 'delivered') {
    //   return res.status(400).json({message:"delivery order can not cancelled"})
    // }

    // restore stock

    const waterProdcutRestore = await WaterProduct.findById(order.productName)
    // waterProdcut.filledBottleStock += order.quantity
    // waterProdcut.capStock += order.quantity
    // waterProdcut.labelStock += order.quantity
    // waterProdcutRestore.stockQuantity += order.Qty
    // await waterProdcutRestore.save()

    waterProdcutRestore.stockQuantity += Number(order.Qty);

    await waterProdcutRestore.save()
    // stripe refund

    if (order.paymentStatus === "completed") {
      await stripe.refunds.create({
        payment_intent: order.paymentIntentId
      })

      order.paymentStatus = "refuned"
    }

    order.status = "cancelled",
      order.cancelReason = reason
    order.paymentStatus = "refuned"

    if (order.status = "cancelled") {
      const waterProdcutRestore = await WaterProduct.findOne()
      waterProdcutRestore.stockQuantity += order.Qty
      await waterProdcutRestore.save()

    }

    await order.save()

    return res.status(200).json({ message: "order cancelled sucessfully", order })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "order cancel errro", error })
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