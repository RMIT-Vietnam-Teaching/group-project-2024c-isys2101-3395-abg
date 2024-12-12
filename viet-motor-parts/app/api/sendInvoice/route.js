import nodemailer from "nodemailer";
import { generateEmail } from "./generateEmail";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, customer_name, order_id, order_date, total_amount, address, order_details, additional_notes, phone_number, payment_method, installment_details } = body;

        // Validate the required fields
        if (!email || !customer_name || !order_id) {
            return new Response(
                JSON.stringify({ success: false, error: "Missing required fields" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password
            },
        });

        // Build order details for the email
        const emailContent = generateEmail({ orderId: order_id, customerName: customer_name, phoneNumber: phone_number, address: address, orderDetails: order_details, totalAmount: total_amount, orderDate: order_date, additionalNotes: additional_notes });


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Confirmation - ${order_id}`,
            html: emailContent,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Failed to send email" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
