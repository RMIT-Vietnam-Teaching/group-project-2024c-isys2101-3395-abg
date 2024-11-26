import mongoose from 'mongoose';

// Users
const users = [
    {
        username: 'adminUser',
        password: '$2y$10$OVQyG45s4BNJrTCGU5v.MO/D3EqdiQjtWs8f1O5gQUoJbkRMSaEgi', // Use hashing in production
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
    {
        name: 'Suspension',
        description: 'Shock absorbers, springs, and suspension kits.',
    },
    {
        name: 'Brakes',
        description: 'Brake pads, rotors, calipers, and brake fluids.',
    },
    {
        name: 'Electrical Components',
        description: 'Batteries, alternators, and wiring harnesses.',
    },
    {
        name: 'Ignition System',
        description: 'Spark plugs, ignition coils, and distributors.',
    },
    {
        name: 'Exhaust System',
        description: 'Mufflers, catalytic converters, and exhaust pipes.',
    },
    {
        name: 'Cooling System',
        description: 'Radiators, thermostats, and cooling fans.',
    },
    {
        name: 'Lubricants and Fluids',
        description: 'Engine oil, transmission fluid, and brake fluid.',
    },
    {
        name: 'Tires and Wheels',
        description: 'Motorbike tires, tubes, and alloy wheels.',
    },
    {
        name: 'Transmission and Clutch',
        description: 'Clutch plates, gearboxes, and shifters.',
    },
    {
        name: 'Body Parts',
        description: 'Fenders, fairings, and body panels.',
    },
    {
        name: 'Lighting',
        description: 'Headlights, taillights, and indicators.',
    },
    {
        name: 'Accessories',
        description: 'Helmets, covers, and storage solutions.',
    },
    {
        name: 'Fuel System',
        description: 'Fuel pumps, injectors, and carburetors.',
    },
    {
        name: 'Steering and Controls',
        description: 'Handlebars, grips, and steering stabilizers.',
    },
    {
        name: 'Safety Gear',
        description: 'Riding gloves, protective jackets, and knee pads.',
    },
    {
        name: 'Performance Parts',
        description: 'Aftermarket performance upgrades and tuning kits.',
    },
    {
        name: 'Seats',
        description: 'Custom seats, seat covers, and cushions.',
    },
    {
        name: 'Navigation and Electronics',
        description: 'GPS systems, speedometers, and dashboards.',
    },
];

// Products
const products = [
    {
        name: 'Oil Filter',
        description: 'High-performance oil filter for motorcycles.',
        brand: 'MotorGuard',
        category_name: 'Engine Parts', // Use this to map to the actual category during seeding
        price: 260000,
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
        price: 360000,
        stock_quantity: 50,
        image_base64: 'BASE64_IMAGE_STRING_FOR_BRAKE_PADS',
        compatible_vehicles: [
            { make: 'Kawasaki', model: 'Ninja 650', year: 2021 },
            { make: 'Suzuki', model: 'GSX250R', year: 2018 },
        ],
    },
    {
        name: 'Shock Absorber',
        description: 'Premium shock absorber for smoother rides.',
        brand: 'SmoothRide',
        category_name: 'Suspension',
        price: 750000,
        stock_quantity: 30,
        image_base64: 'BASE64_IMAGE_STRING_FOR_SHOCK_ABSORBER',
        compatible_vehicles: [
            { make: 'BMW', model: 'G310R', year: 2020 },
            { make: 'Ducati', model: 'Scrambler', year: 2022 },
        ],
    },
    {
        name: 'Disc Rotor',
        description: 'High-quality disc rotor for reliable braking.',
        brand: 'BrakePro',
        category_name: 'Brakes',
        price: 600000,
        stock_quantity: 40,
        image_base64: 'BASE64_IMAGE_STRING_FOR_DISC_ROTOR',
        compatible_vehicles: [
            { make: 'Yamaha', model: 'MT-09', year: 2021 },
            { make: 'Kawasaki', model: 'Z650', year: 2022 },
        ],
    },
    {
        name: 'Spark Plug',
        description: 'Premium spark plug for efficient ignition.',
        brand: 'AutoSpark',
        category_name: 'Ignition System',
        price: 160000,
        stock_quantity: 200,
        image_base64: 'BASE64_IMAGE_STRING_FOR_SPARK_PLUG',
        compatible_vehicles: [
            { make: 'Honda', model: 'CBR500R', year: 2019 },
            { make: 'Suzuki', model: 'V-Strom 650', year: 2021 },
        ],
    },
    {
        name: 'Radiator',
        description: 'Durable radiator for improved engine cooling.',
        brand: 'CoolEngine',
        category_name: 'Cooling System',
        price: 121000,
        stock_quantity: 15,
        image_base64: 'BASE64_IMAGE_STRING_FOR_RADIATOR',
        compatible_vehicles: [
            { make: 'KTM', model: 'Duke 390', year: 2021 },
            { make: 'Yamaha', model: 'YZF-R15', year: 2020 },
        ],
    },
    {
        name: 'Chain Lubricant',
        description: 'High-quality chain lubricant for smoother performance.',
        brand: 'LuboMax',
        category_name: 'Lubricants and Fluids',
        price: 125000,
        stock_quantity: 150,
        image_base64: 'BASE64_IMAGE_STRING_FOR_CHAIN_LUBRICANT',
        compatible_vehicles: [],
    },
    {
        name: 'Clutch Cable',
        description: 'Durable clutch cable for smoother shifting.',
        brand: 'ShiftEase',
        category_name: 'Transmission and Clutch',
        price: 200000,
        stock_quantity: 75,
        image_base64: 'BASE64_IMAGE_STRING_FOR_CLUTCH_CABLE',
        compatible_vehicles: [
            { make: 'KTM', model: 'Duke 390', year: 2021 },
            { make: 'BMW', model: 'G310R', year: 2020 },
        ],
    },
    {
        name: 'Alloy Wheels',
        description: 'Stylish and durable alloy wheels for motorbikes.',
        brand: 'WheelPro',
        category_name: 'Tires and Wheels',
        price: 1500000,
        stock_quantity: 20,
        image_base64: 'BASE64_IMAGE_STRING_FOR_ALLOY_WHEELS',
        compatible_vehicles: [
            { make: 'Honda', model: 'Rebel 500', year: 2021 },
        ],
    },
    {
        name: 'LED Headlight',
        description: 'Bright and energy-efficient LED headlight.',
        brand: 'BrightPath',
        category_name: 'Lighting',
        price: 450000,
        stock_quantity: 60,
        image_base64: 'BASE64_IMAGE_STRING_FOR_LED_HEADLIGHT',
        compatible_vehicles: [
            { make: 'Yamaha', model: 'MT-03', year: 2020 },
        ],
    },
];



// Orders
const orders = [
    {
        _id: new mongoose.Types.ObjectId(),
        customer_name: 'John Doe', // Map this to the actual customer in the database
        phone_number: '1234567890',
        address: '123 Main St, Springfield',
        email: 'johndoe@gmail.com',
        total_amount: 0,
        order_status: 'Pending',
        payment_method: 'Cash',
        shipping_label: '12345-67890',
        order_details: [
            {
                product_name: 'Oil Filter', // Use product name to resolve `product_id`
                quantity: 1,
            },
            {
                product_name: 'Brake Pads - Rear', // Use product name to resolve `product_id`
                quantity: 1,
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        customer_name: 'Jane Smith', // Map this to the actual customer in the database
        phone_number: '9876543210',
        address: '456 Elm St, Metropolis',
        email: 'janesmith@gmail.com',
        total_amount: 0,
        order_status: 'Delivered',
        payment_method: 'PayPal',
        shipping_label: '09876-54321',
        order_details: [
            {
                product_name: 'Brake Pads - Rear', // Use product name to resolve `product_id`
                quantity: 1,
            },
        ],
    },
];



// Invoices
const invoices = [
    {
        invoice_date: new Date('2023-11-01'),
        order_id: orders[0]._id, // Will be resolved dynamically
    },
    {
        invoice_date: new Date('2023-10-25'),
        order_id: orders[1]._id, // Will be resolved dynamically
    },
];



export { users, categories, products, orders, invoices };
