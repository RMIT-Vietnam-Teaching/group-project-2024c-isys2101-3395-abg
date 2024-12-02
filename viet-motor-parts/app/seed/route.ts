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
    for (const category of categories) {
        const existing = await Category.findOne({ name: category.name });
        if (!existing) {
            await Category.create(category);
            console.log(`Category "${category.name}" added.`);
        } else {
            console.log(`Category "${category.name}" already exists.`);
        }
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
    const updatedProducts = products.map((product) => ({
        ...product,
        category_id: categoryMap.get(product.category_name),
    }));

    for (const product of updatedProducts) {
        const existing = await Product.findOne({ name: product.name });
        if (!existing) {
            await Product.create(product);
            console.log(`Product "${product.name}" added.`);
        } else {
            console.log(`Product "${product.name}" already exists.`);
        }
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
        productMap.set(product.name, product._id);
    });

    // Assign product_id to each order's order_details
    const updatedOrders = orders.map((order) => ({
        ...order,
        order_details: order.order_details.map((detail) => ({
            ...detail,
            product_id: productMap.get(detail.product_name), // Map product name to product_id
        })),
    }));

    for (const order of updatedOrders) {
        const existing = await Order.findOne({
            phone_number: order.phone_number,
            total_amount: order.total_amount,
        });
        if (!existing) {
            await Order.create(order);
            console.log(`Order for "${order.phone_number}" added.`);
        } else {
            console.log(`Order for "${order.phone_number}" already exists.`);
        }
    }
}



async function seedInvoices() {
    // Fetch all orders from the database
    const ordersInDb = await Order.find({});
    const orderMap = new Map();

    // Map orders by `total_amount` and `_id` (assuming `total_amount` is unique for this context)
    ordersInDb.forEach((order) => {
        orderMap.set(order.total_amount, order._id);
    });

    // Dynamically assign `order_id` based on `total_amount` from the `invoices` array
    const updatedInvoices = invoices.map((invoice) => {
        const orderId = orderMap.get(invoice.total_amount); // Resolve order_id by matching total_amount
        if (!orderId) {
            console.error(`No matching order found for invoice with total_amount: ${invoice.total_amount}`);
        }
        return {
            ...invoice,
            order_id: orderId, // Assign the resolved order_id
        };
    });

    // Insert invoices into the database
    for (const invoice of updatedInvoices) {
        if (!invoice.order_id) {
            console.error(`Skipping invoice creation due to missing order_id: ${JSON.stringify(invoice)}`);
            continue;
        }
        const existing = await Invoice.findOne({ order_id: invoice.order_id });
        if (!existing) {
            await Invoice.create(invoice);
            console.log(`Invoice for order ID "${invoice.order_id}" added.`);
        } else {
            console.log(`Invoice for order ID "${invoice.order_id}" already exists.`);
        }
    }
}



seedDatabase();
