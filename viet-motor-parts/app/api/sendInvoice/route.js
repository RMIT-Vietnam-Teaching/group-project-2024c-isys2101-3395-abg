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
            host: process.env.EMAIL_HOST || "smtp.gmail.com",
            port: process.env.EMAIL_PORT || 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
          
          const emailContent = generateEmail({
            orderId: order_id,
            customerName: customer_name,
            phoneNumber: phone_number || "N/A",
            address: address || "N/A",
            orderDetails: order_details || [],
            totalAmount: total_amount || 0,
            orderDate: order_date || new Date().toISOString(),
            additionalNotes: additional_notes || "No additional notes.",
            paymentMethod: payment_method || "N/A",
          });
          

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
