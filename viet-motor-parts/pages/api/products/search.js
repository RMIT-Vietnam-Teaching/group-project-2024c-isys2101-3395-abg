import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }

  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ success: false, error: 'Product name is required' });
  }

  try {
    // Case-insensitive search for the product name
    const products = await Product.find({
      name: { $regex: name, $options: 'i' }, // Case-insensitive regex search
    });

    if (products.length === 0) {
      return res.status(404).json({ success: false, error: 'No products found' });
    }

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error searching for product:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
