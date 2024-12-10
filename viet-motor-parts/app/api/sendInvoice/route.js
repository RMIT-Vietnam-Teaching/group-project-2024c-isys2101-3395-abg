import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, customer_name, order_id, order_date, total_amount, address, order_details } = body;

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
        const orderItems = order_details
            .map(
                (item) =>
                    `<li>${item.product_name} - Quantity: ${item.quantity}, Price: ${item.price}</li>`
            )
            .join("");

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Confirmation - ${order_id}`,
            html: `
                <h1>Thank you for your order, ${customer_name}!</h1>
                <p>Your order ID is: <strong>${order_id}</strong></p>
                <p>Order Date: ${new Date(order_date).toLocaleDateString()}</p>
                <p>Shipping Address: ${address}</p>
                <p>Total Amount: ${total_amount}</p>
                <h3>Order Details:</h3>
                <ul>${orderItems}</ul>
                <p>We appreciate your business and hope to serve you again soon!</p>
            `,
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
