import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config()

const transpoter = nodemailer.createTransport({
    service:"Gmail",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

const sendMail = async(to,otp)=>{
    try {
        if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
            return resizeBy.status(400).json({message:"All field are required"})
        }

        return transpoter.sendMail({
            from:process.env.EMAIL,
            to:to,
            subject:"signup Account",
            html:`<p>Your otp for regestration${otp}</b>,is expire in 5 minutes`
        })
    } catch (error) {
        console.log(error)
    }
}

export default sendMail


// payment sucesssfully email send
export const sendInvoiceMail = async (to,orderId,invoicePath) => {

    try {

        await transpoter.sendMail({
            from: process.env.EMAIL,
            to,

            subject: "Payment Successful",

            html: `
                <h2>Payment Successful </h2>

                <p>
                    Your payment has been completed successfully.
                </p>

                <p>
                    Order ID:
                    <b>${orderId}</b>
                </p>

                <p>
                    Invoice attached below.
                </p>

                <h3>
                    Thank you for your order 
                </h3>
            `,

            attachments: [
                {
                    filename: "invoice.pdf",
                    path: invoicePath
                }
            ]
        })

        console.log("Invoice Email Sent")

    } catch (error) {
        console.log(error)
    }
}