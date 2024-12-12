import { formatCurrency } from "@/lib/utils";


export function generateEmail(data: {
    orderId: string;
    customerName: string;
    phoneNumber: string;
    orderDate: string;
    address: string;
    orderDetails: { product_name: string; quantity: number; price: string }[];
    totalAmount: string;
    additionalNotes?: string;
    payment_method: string;
    installment_details?: {
        down_payment: number;
        loan_term: number;
        monthly_payment: number;
        interest_rate: number;
    };
}): string {
    const { orderId, customerName, phoneNumber, address, orderDetails, totalAmount, orderDate, additionalNotes } = data;

    const orderItems = orderDetails
    .map(
        (item) => `
        <tr>
            <td style="padding: 10px; text-align: left; border: 1px solid #ddd;">${item.product_name}</td>
            <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${formatCurrency(Number(item.price))}</td>
        </tr>`
    )
    .join("");

return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div
            style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 16px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); color: black; overflow: hidden; border: 1px solid #ddd;">
            <div style="text-align: center; background-color: #852E4E; color: white; padding: 20px;">
                <h1 style="font-size: 24px; font-weight: bold; margin: 0;">Order Confirmation</h1>
                <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">Order ID: <span
                        style="font-weight: normal;">${orderId}</span></p>
                <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">Order Date: <span
                        style="font-weight: normal;">${new Date(orderDate).toLocaleDateString("en-GB")}</span></p>
            </div>
            <div style="padding: 10px 20px;">
                <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Thank you for your purchase!</h2>
                <p style="margin: 5px 0; font-size: 16px;">We are working hard to process your order. Please review your
                    details below.</p>
            </div>
            <div style="padding: 10px 20px;">
                <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Shipping Details</h2>
                <div style="display: table; width: 100%; margin-bottom: 10px;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; width: 50%; text-align: left; font-weight: bold; font-size: 16px;">
                            Name:</div>
                        <div style="display: table-cell; width: 50%; text-align: right; font-size: 16px;">${customerName}</div>
                    </div>
                </div>
                <div style="display: table; width: 100%; margin-bottom: 10px;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; width: 50%; text-align: left; font-weight: bold; font-size: 16px;">
                            Phone Number:</div>
                        <div style="display: table-cell; width: 50%; text-align: right; font-size: 16px;">${phoneNumber}</div>
                    </div>
                </div>
                <div style="display: table; width: 100%; margin-bottom: 10px;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; width: 50%; text-align: left; font-weight: bold; font-size: 16px;">
                            Address:</div>
                        <div style="display: table-cell; width: 50%; text-align: right; font-size: 16px;">${address}</div>
                    </div>
                </div>
                <div style="display: table; width: 100%; margin-bottom: 10px;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; width: 50%; text-align: left; font-weight: bold; font-size: 16px;">
                            Additional Notes:</div>
                        <div style="display: table-cell; width: 50%; text-align: right; font-size: 16px;">${additionalNotes || "None"}</div>
                    </div>
                </div>
            </div>
            <div style="padding: 10px 20px;">
                <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Order Details</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #852E4E; color: white;">
                            <th style="padding: 10px; text-align: left; font-weight: bold; border: 1px solid #ddd;">Product
                                Name</th>
                            <th style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">
                                Quantity</th>
                            <th style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orderItems}
                    </tbody>
                    <tfoot>
                        <tr style="background-color: #852E4E; color: white;">
                            <td style="padding: 10px; text-align: left; font-weight: bold; border: 1px solid #ddd;"
                                colspan="2">Total</td>
                            <td style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">${formatCurrency(Number(totalAmount))}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div style="padding: 10px 20px; text-align: center;">
                <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Track Your Order</h2>
                <p style="margin: 5px 0; font-size: 16px;">You can track the status of your order by clicking the button
                    below:</p>
                <a href="http://localhost:3000/orders"
                    style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #852E4E; color: white; border-radius: 25px; font-weight: bold; text-decoration: none;">Track
                    Order</a>
            </div>
            <div style="text-align: center; background-color: #852E4E; color: white; padding: 20px;">
                <p style="font-size: 16px; font-weight: bold; margin: 5px 0;">Thank you for shopping with us!</p>
                <p style="font-size: 14px; margin: 5px 0;">If you have any questions, feel free to <a
                        href="mailto:viet.motor24@gmail.com"
                        style="font-weight: bold; color: white; text-decoration: underline;">contact our support team</a>.
                </p>
                <p style="font-size: 12px; margin: 5px 0;">© 2023 ABG Group. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;
}
