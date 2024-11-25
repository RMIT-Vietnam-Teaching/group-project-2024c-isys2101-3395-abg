// Users
const users = [
    {
        username: 'adminUser',
        password: 'Admin123!', // Use hashing in production
        role: 'admin',
        avatar: 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg',
    },
    {
        username: 'customerUser',
        password: 'Customer123!', // Use hashing in production
        role: 'customer',
        avatar: 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg',
    },
];

// Categories
const categories = [
    {
        name: 'Engine Parts',
        description: 'Parts and accessories for engines.',
    },
    {
        name: 'Motorbike Parts',
        description: 'Parts and accessories for motorbikes.',
    },
];

// Products
const products = [
    {
        name: 'Oil Filter',
        description: 'High-performance oil filter for motorcycles.',
        brand: 'MotorGuard',
        category_name: 'Engine Parts', // Use this to map to the actual category during seeding
        price: 25.99,
        stock_quantity: 100,
        image_base64: 'BASE64_IMAGE_STRING_FOR_OIL_FILTER',
        compatible_vehicles: [
            { make: 'Yamaha', model: 'YZF-R3', year: 2019 },
            { make: 'Honda', model: 'CB500F', year: 2020 },
        ],
    },
    {
        name: 'Brake Pads - Rear',
        description: 'Durable rear brake pads for enhanced stopping power.',
        brand: 'BrakeMax',
        category_name: 'Motorbike Parts', // Use this to map to the actual category during seeding
        price: 35.49,
        stock_quantity: 50,
        image_base64: 'BASE64_IMAGE_STRING_FOR_BRAKE_PADS',
        compatible_vehicles: [
            { make: 'Kawasaki', model: 'Ninja 650', year: 2021 },
            { make: 'Suzuki', model: 'GSX250R', year: 2018 },
        ],
    },
];



// Orders
const orders = [
    {
        customer_name: 'John Doe', // Map this to the actual customer in the database
        phone_number: '1234567890',
        address: '123 Main St, Springfield',
        email: 'johndoe@gmail.com',
        total_amount: 1045.98,
        order_status: 'Pending',
        payment_method: 'Cash',
        shipping_label: '12345-67890',
        order_details: [
            {
                product_name: 'Oil Filter', // Use product name to resolve `product_id`
                quantity: 1,
                price: 25.99,
            },
            {
                product_name: 'Brake Pads - Rear', // Use product name to resolve `product_id`
                quantity: 1,
                price: 35.49,
            },
        ],
    },
    {
        customer_name: 'Jane Smith', // Map this to the actual customer in the database
        phone_number: '9876543210',
        address: '456 Elm St, Metropolis',
        email: 'janesmith@gmail.com',
        total_amount: 45.99,
        order_status: 'Delivered',
        payment_method: 'PayPal',
        shipping_label: '09876-54321',
        order_details: [
            {
                product_name: 'Brake Pads - Rear', // Use product name to resolve `product_id`
                quantity: 1,
                price: 35.49,
            },
        ],
    },
];



// Invoices
const invoices = [
    {
        invoice_date: new Date('2023-11-01'),
        total_amount: 1045.98,
    },
    {
        invoice_date: new Date('2023-10-25'),
        total_amount: 45.99,
    },
];



export { users, categories, products, orders, invoices };
