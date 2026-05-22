
// stripe payment integration

import { sendInvoiceMail } from "../config/mail.js"
import stripe from "../config/stripe.js"
import Order from "../models/order.model.js"
import WaterProduct from "../models/waterProduct.model.js"
import generateInvoice from "../utils/generateinvoice.js"

export const createStripeSession = async (req, res) => {
  try {
    const { orderId } = req.body

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(400).json({ message: "order not found" })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "water jar"
            },
            unit_amount: order.totalAmount * 100,
          },
          quantity: 1,
        }
      ],
      // ADD THIS
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    })

    return res.status(200).json({ message: "stripe payment sucessfully", url: session.url })
  } catch (error) {
    console.log("createStripeSession error", error)
    return res.status(500).json({ message: "Stripe payment error", error })
  }
}


//webhook => for update status manly use


export const stripeWebhook = async (req, res) => {
  console.log("WEBHOOK HIT");
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body type:", typeof req.body, Buffer.isBuffer(req.body));

  const sig = req.headers["stripe-signature"];
  console.log(sig)
  if (!sig) {
    console.log(" Missing stripe-signature header");
    return res.status(400).send("Missing stripe-signature header");
  }

  let event;

  try {
    // req.body MUST be a Buffer (raw bytes), not a parsed object
    event = stripe.webhooks.constructEvent(
      req.body,          // Must be Buffer
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("EVENT TYPE:", event.type);

    // Handle events
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        // await Order.findByIdAndUpdate(orderId, {
        //   paymentStatus: "paid",
        //   status: "completed",
        //   stripeSessionId: session.id,
        // });


        // aa niche no code upervado code comment kari replace kariu 6e pdf invocie gerater karvamate payment sucessfully thai jay pachi pdf down load karvama te aa lakhiyu 6e.
        const order = await Order.findById(orderId).populate("customerId");

        if (!order) {
          return;
        }

        order.paymentStatus = "paid";
        order.status = "completed";
        order.stripeSessionId = session.id;

        //after payment stock update
        const product = await WaterProduct.findById(order.productName)

        console.log("ORDER:", order);
        console.log("PRODUCT:", product);
        console.log("QTY:", order.Qty);

        if (!product) {
          return
        }

        if (product.stockQuantity < order.Qty) {
          return res.status(400).json({ message: "out of stock" })
        }
        product.stockQuantity = product.stockQuantity - order.Qty
        await product.save()

        // Generate PDF
        const invoicePath = await generateInvoice(order); //aa generateInvoice ae utils file ma  thi lakhelu 6e

        // Save path in DB aa invoicePdf ae model nu name 6e
        order.invoicePdf = invoicePath;

        await order.save();

        // send email with pdf payment sccessfully send email
        await sendInvoiceMail(
          order.customerId.email,
          order._id,
          invoicePath
        );

        console.log("Invoice Email Sent");

        console.log("Invoice Generated");
        console.log(" Order updated:", orderId);
        break;

      default:
        console.log(`Unhandled event: ${event.type}`);
    }

  } catch (err) {
    console.log(" Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  return res.json({ received: true });
};


//pdf download api customer wants invoice
export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // invoicePdf model mathi lakhelu 6e
    if (!order.invoicePdf) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.download(order.invoicePdf); //now send pdf file

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};