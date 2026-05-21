
// stripe payment integration

import stripe from "../config/stripe.js"
import Order from "../models/order.model.js"

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
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        })

        return res.status(200).json({message:"stripe payment sucessfully",url:session.url})
    } catch (error) {
        console.log("createStripeSession error", error)
        return res.status(500).json({message:"Stripe payment error",error})
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

        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: "paid",
          status: "completed",
          stripeSessionId: session.id,
        });

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