import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';
import Category from '@/app/lib/models/category';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  await dbConnect();

  const DEFAULT_LIMIT = 9;
  const { searchParams } = new URL(request.url);
  const categoryIds = searchParams.get('category')?.split(',') || [];
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULT_LIMIT, 10);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'name';
  const order = searchParams.get('order') || 'asc';
  const priceFrom = parseInt(searchParams.get('priceFrom') || '0', 10);
  const priceTo = parseInt(searchParams.get('priceTo') || 'Infinity', 10);

  try {
    const validSortFields = ['name', 'price'];
    const validOrders = ['asc', 'desc'];

    if (!validSortFields.includes(sortBy) || !validOrders.includes(order)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid sortBy or order parameter. Use "name" or "price" for sortBy and "asc" or "desc" for order.',
        }),
        { status: 400 }
      );
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const categoryFilter = categoryIds.length ? { category_id: { $in: categoryIds } } : {};

    const priceFilter = {};
    if (priceFrom && !priceTo && !isNaN(priceFrom)) {
      priceFilter.$gte = parseInt(priceFrom, 10);
    } else if (!priceFrom && priceTo && !isNaN(priceTo)) {
      priceFilter.$lte = parseInt(priceFrom, 10);
    } else if (!isNaN(priceFrom) && !isNaN(priceTo) && priceFrom < priceTo) {
      priceFilter.$gte = parseInt(priceFrom, 10);
      priceFilter.$lte = parseInt(priceTo, 10);
    } else if (!isNaN(priceTo) && !isNaN(priceFrom) && priceFrom > priceTo) {
      priceFilter.$lte = parseInt(priceFrom, 10);
      priceFilter.$gte = parseInt(priceTo, 10);
    }

    const filter = {
      ...categoryFilter,
      name: { $regex: query, $options: 'i' }, // Case-insensitive regex search
    };

    if (Object.keys(priceFilter).length > 0) {
      filter.price = priceFilter;
    }

    // Fetch paginated products
    const products = await Product.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    // Total count for pagination metadata
    const totalCount = await Product.countDocuments(filter);

    return new Response(
      JSON.stringify({
        success: true,
        data: products,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          limit,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch products' }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();

  const authHeader = request.headers.get('authorization');

  // Check for authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized access' }),
      { status: 401 }
    );
  }

  try {
    // Verify JWT token
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Access denied' }),
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, description, brand, category_id, price, stock_quantity, image_base64 } = body;

    // Validate incoming product data
    if (!name || !description || !brand || !category_id || !price || !stock_quantity || !image_base64) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required product fields' }),
        { status: 400 }
      );
    }

    const discount_perc = Math.floor(Math.random() * (60 - 20 + 1)) + 20;

    // Create a new product
    const newProduct = await Product.create({
      ...body,
      discount_perc, // Include the generated discount_perc
    });

    return new Response(
      JSON.stringify({ success: true, data: newProduct }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessages = Object.values(error.errors || {}).map(err => err.message);

    return new Response(
      JSON.stringify({ success: false, error: errorMessages.join(', ') }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
