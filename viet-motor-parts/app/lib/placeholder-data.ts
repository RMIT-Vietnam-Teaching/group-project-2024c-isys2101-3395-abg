import mongoose from "mongoose";

// Users
const users = [
  {
    username: "adminUser",
    password: "$2y$10$OVQyG45s4BNJrTCGU5v.MO/D3EqdiQjtWs8f1O5gQUoJbkRMSaEgi", // Use hashing in production
    role: "admin",
    avatar:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg",
  },
  {
    username: "customerUser",
    password: "Customer123!", // Use hashing in production
    role: "customer",
    avatar:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg",
  },
];

// Categories
const categories = [
  {
    name: "Oil Filters",
    description: "Parts and accessories for oil filters.",
  },
  {
    name: "Suspension",
    description: "Shock absorbers, springs, and suspension kits.",
  },
  {
    name: "Brakes",
    description: "Brake pads, rotors, calipers, and brake fluids.",
  },
  {
    name: "Ignition System",
    description: "Spark plugs, ignition coils, and distributors.",
  },
  {
    name: "Exhaust System",
    description: "Mufflers, catalytic converters, and exhaust pipes.",
  },
  {
    name: "Cooling System",
    description: "Radiators, thermostats, and cooling fans.",
  },
  {
    name: "Lubricants and Fluids",
    description: "Engine oil, transmission fluid, and brake fluid.",
  },
  {
    name: "Tires and Wheels",
    description: "Motorbike tires, tubes, and alloy wheels.",
  },
  {
    name: "Transmission and Clutch",
    description: "Clutch plates, gearboxes, and shifters.",
  },
  {
    name: "Lighting",
    description: "Headlights, taillights, and indicators.",
  },
  {
    name: "Safety Gear and Accessories",
    description: "Riding gloves, protective jackets, and knee pads.",
  },
];

// Products
const products = [
  {
    name: "Oil Filter - Vespa",
    description: "High-performance oil filter for motorcycles.",
    brand: "Piaggio",
    category_name: "Oil Filters", // Use this to map to the actual category during seeding
    price: 95000,
    stock_quantity: 100,
    image_base64: "BASE64_IMAGE_STRING_FOR_OIL_FILTERS",
    compatible_vehicles: [
      { make: "Piaggio", vehicleModel: "Vespa LX", year: 2014 },
      { make: "Piaggio", vehicleModel: "Vespa Sprint", year: 1975 },
      { make: "Piaggio", vehicleModel: "Vespa Primavera", year: 2013 },
      { make: "Piaggio", vehicleModel: "Vespa GTS", year: 2016 },
    ],
  },
  {
    name: "CNC Brake Lever",
    description: "Durable brake lever for enhanced stopping power.",
    brand: "GH-Racing",
    category_name: "Brakes", // Use this to map to the actual category during seeding
    price: 800000,
    stock_quantity: 50,
    image_base64: "BASE64_IMAGE_STRING_FOR_BRAKE_LEVER",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Lead 125cc", year: 2024 },
    ],
  },
  {
    name: "Max Scoot 10W40 4T 0.8L Oil",
    description:
      "Nhớt Fuchs Silkolene Max Scoot 10W40 4T 0.8L dành riêng cho xe tay ga, mang lại trải nghiệm lái êm ái và thoải mái vượt trội, giúp động cơ được bảo vệ tối đa, tối ưu hiệu suất và tiết tiết kiệm nhiên liệu.",
    brand: "Fuchs Silkolene",
    category_name: "Lubricants and Fluids", // Use this to map to the actual category during seeding
    price: 119000,
    stock_quantity: 50,
    image_base64: "BASE64_IMAGE_STRING_FOR_OIL",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Lead 125cc", year: 2024 },
      { make: "Piaggio", vehicleModel: "Vespa LX", year: 2014 },
      { make: "Piaggio", vehicleModel: "Vespa Primavera", year: 2013 },
      { make: "Piaggio", vehicleModel: "Vespa GTS", year: 2016 },
    ],
  },
  {
    name: "Profender Max Series Shock Absorber",
    description:
      "Phuộc Profender Max Series cho Honda AB 150/160... và các dòng xe khác có kích thước tương tự.",
    brand: "Profender",
    category_name: "Suspension",
    price: 3250000,
    stock_quantity: 30,
    image_base64: "BASE64_IMAGE_STRING_FOR_SHOCK_ABSORBER",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Air Blade 125", year: 2020 },
      { make: "Honda", vehicleModel: "Air Blade 160", year: 2022 },
    ],
  },
  {
    name: "RCB Disc Rotor",
    description:
      "Đĩa thắng RCB (Racing Boy) chính hãng dành cho Vario, Click, thiết kế dạng bông vô cùng ấn tượng, chất liệu rất bền và giá cả vô cùng hợp lý.",
    brand: "Racing Boy",
    category_name: "Brakes",
    price: 370000,
    stock_quantity: 40,
    image_base64: "BASE64_IMAGE_STRING_FOR_DISC_ROTOR",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Vario 125", year: 2021 },
      { make: "Honda", vehicleModel: "Click 125", year: 2024 },
    ],
  },
  {
    name: "NGK Laser Iridium Spark Plugs",
    description: "Bugi NGK laser iridium cho xe 4val đời mới, chân siêu dài.",
    brand: "NGK",
    category_name: "Ignition System",
    price: 500000,
    stock_quantity: 200,
    image_base64: "BASE64_IMAGE_STRING_FOR_SPARK_PLUG",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Vario 160", year: 2022 },
      { make: "Honda", vehicleModel: "Click 160", year: 2022 },
      { make: "Honda", vehicleModel: "ADV 150", year: 2022 },
      { make: "Honda", vehicleModel: "SH Mode", year: 2024 },
    ],
  },
  {
    name: "Liqui Moly Coolant",
    description: "Nước làm mát Liqui Moly đỏ cao cấp cho hệ thống làm mát động cơ, máy móc. Giải nhiệt động cơ, chống đông, chống ăn mòn, chống hình thành rong rêu cặn bẩn trong hệ thống.",
    brand: "Liqui Moly",
    category_name: "Cooling System",
    price: 175000,
    stock_quantity: 15,
    image_base64: "BASE64_IMAGE_STRING_FOR_COOLANT",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Air Blade 160", year: 2022 },
      { make: "Honda", vehicleModel: "Air Blade 125", year: 2020 },
    ],
  },
  {
    name: "GoRacing Chain Cleaner",
    description: "Chai xịt vệ sinh sên GoRacing (chain cleaner) là dung dịch tẩy rửa, làm sạch bề mặt sên, khô nhanh, giúp cho bề mặt kim loại sáng bóng.",
    brand: "GoRacing",
    category_name: "Lubricants and Fluids",
    price: 85000,
    stock_quantity: 150,
    image_base64: "BASE64_IMAGE_STRING_FOR_CHAIN_CLEANER",
    compatible_vehicles: [
      { make: "Kawasaki", vehicleModel: "Kawasaki 1000", year: 2023 },
    ],
  },
  {
    name: "Michelin Motorcyle Drive Belt",
    description: "Dây curoa mẫu mới thương hiệu Michelin mặt trong viền Cacbon tăng 30% công suất.",
    brand: "Michelin",
    category_name: "Transmission and Clutch",
    price: 264000,
    stock_quantity: 75,
    image_base64: "BASE64_IMAGE_STRING_FOR_DRIVE_BELT",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Lead 110", year: 2021 },
      { make: "Honda", vehicleModel: "SCR 110", year: 2020 },
    ],
  },
  {
    name: "X1R Alloy Wheels",
    description: "Mâm X1R 8 cây chính hãng cho Wave, Dream, Future,... trước đĩa sau đùm, hàng khá hot trên thị trường.",
    brand: "X1R",
    category_name: "Tires and Wheels",
    price: 1750000,
    stock_quantity: 20,
    image_base64: "BASE64_IMAGE_STRING_FOR_ALLOY_WHEELS",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Wave Alpha", year: 2021 },
      { make: "Honda", vehicleModel: "Dream 50", year: 1977 },
    ],
  },
  {
    name: "ZHIPAT LED Headlight",
    description: "Đèn led 2 tầng cho LEAD 2022 - 2025 (Jack led) chính hãng ZHIPAT, thiết kế hiện đại, thời trang, thay đổi diện mạo hoàn toàn mới mẻ.",
    brand: "ZHIPAT",
    category_name: "Lighting",
    price: 1140000,
    stock_quantity: 60,
    image_base64: "BASE64_IMAGE_STRING_FOR_LED_HEADLIGHT",
    compatible_vehicles: [
      { make: "Honda", vehicleModel: "Lead 125cc", year: 2024 },
    ],
  },
];

// Orders
const orders = [
  {
    _id: new mongoose.Types.ObjectId(),
    customer_name: "John Doe", // Map this to the actual customer in the database
    phone_number: "1234567890",
    address: "123 Main St, Springfield",
    email: "johndoe@gmail.com",
    total_amount: 0,
    order_status: "Pending",
    payment_method: "Cash",
    shipping_label: "12345-67890",
    order_details: [
      {
        product_name: "Oil Filter - Vespa", // Use product name to resolve `product_id`
        quantity: 1,
      },
      {
        product_name: "CNC Brake Lever", // Use product name to resolve `product_id`
        quantity: 1,
      },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    customer_name: "Jane Smith", // Map this to the actual customer in the database
    phone_number: "9876543210",
    address: "456 Elm St, Metropolis",
    email: "janesmith@gmail.com",
    total_amount: 0,
    order_status: "Delivered",
    payment_method: "PayPal",
    shipping_label: "09876-54321",
    order_details: [
      {
        product_name: "GoRacing Chain Cleaner", // Use product name to resolve `product_id`
        quantity: 1,
      },
    ],
  },
];

// Invoices
const invoices = [
  {
    invoice_date: new Date("2023-11-01"),
    order_id: orders[0]._id, // Will be resolved dynamically
  },
  {
    invoice_date: new Date("2023-10-25"),
    order_id: orders[1]._id, // Will be resolved dynamically
  },
];

const compatibleVehicles = [
  { make: "Honda", vehicleModel: "Air Blade 125", year: 2020 },
  { make: "Honda", vehicleModel: "Air Blade 160", year: 2022 },
  { make: "Honda", vehicleModel: "SH Mode", year: 2024 },
  { make: "Piaggio", vehicleModel: "Vespa LX", year: 2014 },
  { make: "Piaggio", vehicleModel: "Vespa Sprint", year: 1975 },
  { make: "Piaggio", vehicleModel: "Vespa Primavera", year: 2013 },
  { make: "Piaggio", vehicleModel: "Vespa GTS", year: 2016 },
  { make: "Honda", vehicleModel: "Lead 125cc", year: 2024 },
  { make: "Honda", vehicleModel: "Vario 125", year: 2021 },
  { make: "Honda", vehicleModel: "Click 125", year: 2024 },
  { make: "Honda", vehicleModel: "Vario 160", year: 2022 },
  { make: "Honda", vehicleModel: "Click 160", year: 2022 },
  { make: "Honda", vehicleModel: "ADV 150", year: 2022 },
  { make: "Kawasaki", vehicleModel: "Kawasaki 1000", year: 2023 },
  { make: "Suzuki", vehicleModel: "Raider 150", year: 2019 },
  { make: "Suzuki", vehicleModel: "Satria F150", year: 2022 },
  { make: "Honda", vehicleModel: "Lead 110", year: 2021 },
  { make: "Honda", vehicleModel: "SCR 110", year: 2020 },
  { make: "Honda", vehicleModel: "Wave Alpha", year: 2021 },
  { make: "Honda", vehicleModel: "Dream 50", year: 1977 },
];

export { users, categories, products, orders, invoices, compatibleVehicles };
