import mongoose from "mongoose";
import dbConnect from '../lib/db';
import Category from '../lib/models/category';
import Product from '../lib/models/product';
import User from '../lib/models/users';
import Order from '../lib/models/order';
import Invoice from '../lib/models/invoice';

import { users, categories, products, orders, invoices } from '../lib/placeholder-data';

async function seedDatabase() {
    await dbConnect();
    console.log('Connected to the database.');

    try {
        await seedCategories();
        await seedProducts();
        await seedUsers();
        await seedOrders();
        await seedInvoices();
        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        process.exit(0); // Exit the script
    }
}

async function seedCategories() {
    try {
        await dbConnect();

        for (const category of categories) {
            const existingCategory = await Category.findOne({ name: category.name });
            if (!existingCategory) {
                await Category.create(category);
                console.log(`Category "${category.name}" added.`);
            } else {
                console.log(`Category "${category.name}" already exists. Skipping.`);
            }
        }

        console.log('Category seeding completed.');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
}

async function seedProducts() {
    const categoriesInDb = await Category.find({});
    const categoryMap = new Map();

    // Create a map of category names to IDs
    categoriesInDb.forEach((category) => {
        categoryMap.set(category.name, category._id);
    });

    // Assign category_id to each product based on category_name
    const updatedProducts = products.map((product) => {
        const categoryId = categoryMap.get(product.category_name);
        if (!categoryId) {
            console.error(`Category "${product.category_name}" not found in the database for product "${product.name}".`);
        }
        return {
            ...product,
            category_id: categoryId || null, // Assign null if category is not found
        };
    });

    // Separate valid products from those with missing categories
    const validProducts = updatedProducts.filter((product) => product.category_id);

    const operations = validProducts.map((product) => ({
        updateOne: {
            filter: { name: product.name },
            update: { $set: product },
            upsert: true, // Insert the product if it doesn't already exist
        },
    }));

    try {
        if (operations.length > 0) {
            const result = await Product.bulkWrite(operations);
            console.log(`Products seeded successfully. Matched: ${result.matchedCount}, Inserted: ${result.upsertedCount}.`);
        } else {
            console.log('No valid products to seed.');
        }
    } catch (error) {
        console.error('Error seeding products:', error);
    }
}


async function seedUsers() {
    for (const user of users) {
        const existing = await User.findOne({ username: user.username });
        if (!existing) {
            await User.create(user);
            console.log(`User "${user.username}" added.`);
        } else {
            console.log(`User "${user.username}" already exists.`);
        }
    }
}

async function seedOrders() {
    const productsInDb = await Product.find({});
    const productMap = new Map();

    // Create a map for products
    productsInDb.forEach((product) => {
        productMap.set(product.name, { price: product.price, id: product._id });
    });

    // Assign product_id to each order's order_details
    const updatedOrders = orders.map((order) => {
        const orderDetails = order.order_details.map((detail) => {
            const product = productMap.get(detail.product_name);
            if (!product) {
                console.error(`Product "${detail.product_name}" not found in the database for order "${order.customer_name}".`);
                return { ...detail, product_id: null, price: null };
            }
            return {
                ...detail,
                product_id: product.id,
                price: product.price, // Assign the correct price dynamically
            };
        });

        // Calculate the total amount for the order
        const totalAmount = orderDetails.reduce(
            (sum, detail) => sum + detail.price * detail.quantity,
            0
        );

        return {
            ...order,
            total_amount: totalAmount,
            order_details: orderDetails,
        };
    });

    const validOrders = updatedOrders.filter((order) =>
        order.order_details.every((detail) => detail.product_id && detail.price !== null)
    );

    for (const order of validOrders) {
        const existingOrder = await Order.findOne({
            phone_number: order.phone_number,
            total_amount: order.total_amount,
        });

        if (!existingOrder) {
            await Order.create(order);
            console.log(`Order for "${order.customer_name}" added.`);
        } else {
            console.log(`Order for "${order.customer_name}" already exists.`);
        }
    }
}



async function seedInvoices() {
    const ordersInDb = await Order.find({}); // Fetch all orders from the database
    const orderMap = new Map();

    // Map order IDs and their total amounts
    ordersInDb.forEach((order) => {
        orderMap.set(order._id.toString(), order.total_amount);
    });

    const updatedInvoices = invoices.map((invoice) => {
        const matchingOrder = Array.from(orderMap.entries()).find(
            ([orderId]) => invoice.order_id.toString() === orderId
        );

        if (!matchingOrder) {
            console.error(`No matching order found for invoice with order ID "${invoice.order_id}".`);
            return { ...invoice, order_id: null, total_amount: null };
        }

        return {
            ...invoice,
            order_id: matchingOrder[0], // Resolve the order ID dynamically
            total_amount: matchingOrder[1], // Fetch the total amount
        };
    });

    const validInvoices = updatedInvoices.filter(
        (invoice) => invoice.order_id && invoice.total_amount !== null
    );

    for (const invoice of validInvoices) {
        const existingInvoice = await Invoice.findOne({ order_id: invoice.order_id });
        if (!existingInvoice) {
            await Invoice.create(invoice);
            console.log(`Invoice for order ID "${invoice.order_id}" added.`);
        } else {
            console.log(`Invoice for order ID "${invoice.order_id}" already exists.`);
        }
    }
}


  


seedDatabase();
