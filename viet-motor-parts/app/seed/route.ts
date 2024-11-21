import dbConnect from '../lib/db';
import Category from '../lib/models/category';
import Product from '../lib/models/product';
import User from '../lib/models/users';
import Customer from '../lib/models/customer';
import Order from '../lib/models/order';
import Invoice from '../lib/models/invoice';

import { categories, products, users, customers, orders, invoices } from '../lib/placeholder-data';

async function seedDatabase() {
    await dbConnect();
    console.log('Connected to the database.');

    try {
        await seedCategories();
        await seedProducts();
        await seedUsers();
        await seedCustomers();
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

async function seedCustomers() {
    for (const customer of customers) {
        const existing = await Customer.findOne({ name: customer.name });
        if (!existing) {
            await Customer.create(customer);
            console.log(`Customer "${customer.name}" added.`);
        } else {
            console.log(`Customer "${customer.name}" already exists.`);
        }
    }
}

async function seedOrders() {
    const customersInDb = await Customer.find({});
    const productsInDb = await Product.find({});
    const customerMap = new Map();
    const productMap = new Map();

    // Create a map for customers and products
    customersInDb.forEach((customer) => {
        customerMap.set(customer.name, customer._id);
    });
    productsInDb.forEach((product) => {
        productMap.set(product.name, product._id);
    });

    // Assign customer_id and product_id to each order
    const updatedOrders = orders.map((order) => ({
        ...order,
        customer_id: customerMap.get(order.customer_name),
        order_details: order.order_details.map((detail) => ({
            ...detail,
            product_id: productMap.get(detail.product_name),
        })),
    }));

    for (const order of updatedOrders) {
        const existing = await Order.findOne({ customer_id: order.customer_id, total_amount: order.total_amount });
        if (!existing) {
            await Order.create(order);
            console.log(`Order for "${order.customer_name}" added.`);
        } else {
            console.log(`Order for "${order.customer_name}" already exists.`);
        }
    }
}


async function seedInvoices() {
    // Fetch all orders from the database
    const ordersInDb = await Order.find({});
    const orderMap = new Map();

    // Map order details (e.g., customer name or total_amount) to their respective ObjectId
    ordersInDb.forEach((order) => {
        orderMap.set(order.total_amount, order._id); // Use a unique field like `total_amount` to map orders
    });

    // Dynamically assign `order_id` based on the mapped orders
    const updatedInvoices = invoices.map((invoice) => ({
        ...invoice,
        order_id: orderMap.get(invoice.total_amount), // Resolve order_id dynamically using total_amount
    }));

    // Insert invoices into the database
    for (const invoice of updatedInvoices) {
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
