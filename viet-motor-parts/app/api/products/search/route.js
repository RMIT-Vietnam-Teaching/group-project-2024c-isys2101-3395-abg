import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return new Response(
      JSON.stringify({ success: false, error: 'Product name is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Case-insensitive search for the product name
    const products = await Product.find({
      name: { $regex: name, $options: 'i' }, // Case-insensitive regex search
    });

    if (products.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'No products found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: products }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error searching for product:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
