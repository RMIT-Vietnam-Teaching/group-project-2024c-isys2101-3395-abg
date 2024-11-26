import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  await dbConnect();

  const DEFAULT_LIMIT = 10;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULT_LIMIT, 10);

  try {
    // Fetch paginated products
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    // Total count for pagination metadata
    const totalCount = await Product.countDocuments();

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

    // Create a new product
    const newProduct = await Product.create(body);

    return new Response(
      JSON.stringify({ success: true, data: newProduct }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create product' }),
      { status: 500 }
    );
  }
}
